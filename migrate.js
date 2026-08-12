const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new Client({
    connectionString: "postgres://postgres.lbbrpqdnkgqgohgjtasr:hH2zjEcOFJ6Waaxg@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
  });

  try {
    await client.connect();
    console.log('Connected to Supabase via IPv4 Pooler');
    
    await client.query(`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS editor_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 1 AND rating <= 5);
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS review_comment TEXT;
    `);
    
    console.log('Migration successful: Added rating columns.');
  } catch (err) {
    console.error('Migration failed via pooler. Trying default pg host...', err.message);
    
    try {
      const client2 = new Client({
        connectionString: "postgres://postgres:hH2zjEcOFJ6Waaxg@db.lbbrpqdnkgqgohgjtasr.supabase.co:5432/postgres"
      });
      await client2.connect();
      await client2.query(`
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS editor_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 1 AND rating <= 5);
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS review_comment TEXT;
      `);
      console.log('Migration successful via default host.');
    } catch (err2) {
      console.error('Migration failed via both methods:', err2.message);
    }
  } finally {
    process.exit(0);
  }
}

run();
