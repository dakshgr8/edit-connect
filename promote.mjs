import { createClient } from '@supabase/supabase-js'

import 'dotenv/config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function promote() {
  const { data: users, error: userError } = await supabase.auth.admin.listUsers()
  if (userError) {
    console.error('Error fetching users:', userError)
    return
  }
  
  const adminUser = users.users.find(u => u.email === 'admin@editconnect.com')
  
  if (!adminUser) {
    console.log('User admin@editconnect.com not found. Did they sign up?')
    return
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role: 'admin', membership_tier: 'premium' })
    .eq('id', adminUser.id)

  if (error) {
    console.error('Error promoting user:', error)
  } else {
    console.log('Successfully promoted admin@editconnect.com to admin role and premium membership!')
  }
}

promote()
