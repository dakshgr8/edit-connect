import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { ChatUI } from "./ChatUI"

export const revalidate = 0

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!profile) redirect("/login")
  
  // Fetch chats for this user
  const roleField = profile.role === 'client' ? 'client_id' : 'editor_id'
  
  const { data: chats } = await supabase
    .from('chats')
    .select(`
      id,
      client_id,
      editor_id,
      project_id,
      client:profiles!chats_client_id_fkey(full_name, role),
      editor:profiles!chats_editor_id_fkey(full_name, role),
      project:projects(title, status, rating)
    `)
    .eq(roleField, user.id)
    .order('updated_at', { ascending: false })

  return (
    <ChatUI 
      initialChats={chats || []} 
      userId={user.id} 
      userRole={profile.role} 
    />
  )
}
