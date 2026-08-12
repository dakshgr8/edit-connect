const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: apps, error } = await supabase
    .from('applications')
    .select('*, project:projects(*)')
    .limit(1);
    
  console.log("Apps Data:", JSON.stringify(apps, null, 2));
  console.log("Error:", error);
}

test();
