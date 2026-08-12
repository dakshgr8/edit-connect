import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const env = fs.readFileSync('.env.local', 'utf8')
const envVars = Object.fromEntries(env.split('\n').filter(Boolean).map(line => {
  const i = line.indexOf('=')
  return [line.slice(0, i), line.slice(i + 1)]
}))

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdmin() {
  console.log("Creating admin user for", supabaseUrl)
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@editconnect.com',
    password: 'adminpassword123',
    email_confirm: true,
    user_metadata: { full_name: 'Admin User', role: 'admin' }
  })
  
  if (error) {
    if (error.message.includes("already registered")) {
      console.log("Admin user already exists.")
    } else {
      console.error("Error creating user:", error.message)
    }
  }
  else console.log("Admin user created successfully! ID:", data.user.id)
}
createAdmin()
