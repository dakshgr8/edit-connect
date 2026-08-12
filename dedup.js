const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data: chats } = await supabase.from('chats').select('*').order('created_at', { ascending: false });
  const seen = new Set();
  for (const chat of chats) {
    const key = `${chat.client_id}-${chat.editor_id}`;
    if (seen.has(key)) {
      console.log('Deleting duplicate chat:', chat.id);
      await supabase.from('chats').delete().eq('id', chat.id);
    } else {
      seen.add(key);
    }
  }
  console.log('Deduplication complete.');
}

run();
