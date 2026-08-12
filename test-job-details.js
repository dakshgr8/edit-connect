const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const id = "ed0979f9-eaa3-400f-a35f-8c34483222c0";
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*, client:profiles!projects_client_id_fkey(full_name, avatar_url)")
    .eq("id", id)
    .single();
    
  console.log("Project:", project);
  console.log("Error:", projectError);
}
test();
