const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:hH2zjEcOFJ6Waaxg@db.lbbrpqdnkgqgohgjtasr.supabase.co:5432/postgres'
});

async function main() {
  try {
    await client.connect();
    console.log('Connected!');

    // Create messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        sender_id UUID REFERENCES profiles(id) NOT NULL,
        receiver_id UUID REFERENCES profiles(id) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        read BOOLEAN DEFAULT FALSE
      );
    `);
    console.log('Table messages created!');

    // RLS Policies
    await client.query(`ALTER TABLE messages ENABLE ROW LEVEL SECURITY;`);
    
    await client.query(`
      CREATE POLICY "Users can insert their own messages" 
      ON messages FOR INSERT 
      WITH CHECK (auth.uid() = sender_id);
    `);

    await client.query(`
      CREATE POLICY "Users can view messages they sent or received" 
      ON messages FOR SELECT 
      USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
    `);
    
    await client.query(`
      CREATE POLICY "Users can update messages they received (to mark read)" 
      ON messages FOR UPDATE 
      USING (auth.uid() = receiver_id)
      WITH CHECK (auth.uid() = receiver_id);
    `);

    // Setup realtime for messages table
    await client.query(`
      ALTER PUBLICATION supabase_realtime ADD TABLE messages;
    `);

    console.log('Policies and realtime configured!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
