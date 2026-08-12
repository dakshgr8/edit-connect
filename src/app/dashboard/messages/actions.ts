"use server"

import { createClient } from "@/utils/supabase/server"

export async function sendMessage(chatId: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase
    .from("messages")
    .insert({
      chat_id: chatId,
      sender_id: user.id,
      content,
    })

  if (error) {
    console.error("Error sending message:", error)
    throw new Error("Failed to send message")
  }
}

export async function startChat(editorId: string, projectId?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  let clientId = user.id

  // If there's a project, the client is the owner of the project
  if (projectId) {
    const { data: project } = await supabase.from('projects').select('client_id').eq('id', projectId).single()
    if (project) {
      clientId = project.client_id
    }
  } else {
    // If no project, we assume the current user is the client reaching out to an editor
    clientId = user.id
  }

  // Check if chat exists (ignoring project_id to keep 1 chat per client-editor pair)
  const { data: existingChats } = await supabase
    .from("chats")
    .select("id, project_id")
    .eq("client_id", clientId)
    .eq("editor_id", editorId)
    .order("created_at", { ascending: false })
    .limit(1)

  let chat = existingChats?.[0]

  if (!chat) {
    const { data: newChat, error } = await supabase
      .from("chats")
      .insert({
        client_id: clientId,
        editor_id: editorId,
        project_id: projectId || null
      })
      .select("id")
      .single()
      
    if (error) throw error
    chat = newChat
  } else if (projectId && chat.project_id !== projectId) {
    // If they apply to a new project, update the chat to reference the new project
    await supabase
      .from("chats")
      .update({ project_id: projectId })
      .eq("id", chat.id)
  }

  return chat.id
}

export async function acceptProject(projectId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase
    .from("projects")
    .update({ status: 'in_progress' })
    .eq("id", projectId)
    .eq("client_id", user.id) // Ensure only the client can accept

  if (error) {
    console.error("Error accepting project:", error)
    throw new Error("Failed to accept project")
  }

  const { revalidatePath } = await import("next/cache")
  revalidatePath("/jobs")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/projects")

  return { success: true }
}

export async function completeProject(projectId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase
    .from("projects")
    .update({ status: 'completed' })
    .eq("id", projectId)
    .eq("client_id", user.id) // Ensure only the client can complete

  if (error) {
    console.error("Error completing project:", error)
    throw new Error("Failed to complete project")
  }

  const { revalidatePath } = await import("next/cache")
  revalidatePath("/jobs")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/projects")

  return { success: true }
}

export async function rateProject(projectId: string, rating: number, comment: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase
    .from("projects")
    .update({ rating, review_comment: comment })
    .eq("id", projectId)
    .eq("client_id", user.id) // Ensure only the client can rate

  if (error) {
    console.error("Error rating project:", error)
    throw new Error("Failed to rate project")
  }

  const { revalidatePath } = await import("next/cache")
  revalidatePath("/jobs")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/projects")
  revalidatePath("/dashboard/messages")

  return { success: true }
}
