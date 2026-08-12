import { createClient } from '@supabase/supabase-js'

import 'dotenv/config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTestUsers() {
  const usersToCreate = [
    { email: 'adminclient@editconnect.com', password: 'adminpassword123', role: 'client' },
    { email: 'admineditor@editconnect.com', password: 'adminpassword123', role: 'editor' }
  ]

  for (const u of usersToCreate) {
    console.log(`Creating user ${u.email}...`)
    
    // 1. Create the Auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true // bypass email confirmation
    })

    if (authError) {
      if (authError.message.includes('already been registered')) {
        console.log(`${u.email} already exists. We will just update their profile.`)
      } else {
        console.error(`Failed to create ${u.email}:`, authError)
        continue
      }
    }

    // Give the database trigger a second to create the profile row
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 2. Fetch the user's ID
    const { data: allUsers } = await supabase.auth.admin.listUsers()
    const targetUser = allUsers.users.find(user => user.email === u.email)

    if (targetUser) {
      // 3. Update the profile role and membership
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: u.role, 
          membership_tier: 'premium'
        })
        .eq('id', targetUser.id)

      if (profileError) {
        console.error(`Failed to update profile for ${u.email}:`, profileError)
      } else {
        console.log(`Successfully set up ${u.email} as a ${u.role}!`)
      }
    }
  }
}

createTestUsers()
