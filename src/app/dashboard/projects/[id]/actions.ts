"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function hireEditor(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  const applicationId = formData.get("applicationId") as string
  const projectId = formData.get("projectId") as string

  // 1. Verify the project belongs to the user
  const { data: project } = await supabase
    .from("projects")
    .select("client_id")
    .eq("id", projectId)
    .single()
    
  if (project?.client_id !== user.id) {
    throw new Error("Unauthorized")
  }

  // 2. Mark this application as accepted
  await supabase
    .from("applications")
    .update({ status: "accepted" })
    .eq("id", applicationId)

  // 3. Mark all other applications as rejected
  await supabase
    .from("applications")
    .update({ status: "rejected" })
    .eq("project_id", projectId)
    .neq("id", applicationId)

  // 4. Mark project as in_progress
  await supabase
    .from("projects")
    .update({ status: "in_progress" })
    .eq("id", projectId)

  revalidatePath(`/dashboard/projects/${projectId}`)
  revalidatePath("/dashboard")
  redirect("/dashboard/projects")
}

export async function createChat(formData: FormData) {
  const supabase = await createClient()
  const editorId = formData.get("editorId") as string
  const projectId = formData.get("projectId") as string
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Check if chat exists
  let { data: chat } = await supabase
    .from("chats")
    .select("id")
    .eq("client_id", user.id)
    .eq("editor_id", editorId)
    .eq("project_id", projectId)
    .single()

  if (!chat) {
    const { data: newChat, error } = await supabase
      .from("chats")
      .insert({
        client_id: user.id,
        editor_id: editorId,
        project_id: projectId
      })
      .select("id")
      .single()
      
    if (!error) chat = newChat
  }
  
  redirect(`/dashboard/messages`)
}
