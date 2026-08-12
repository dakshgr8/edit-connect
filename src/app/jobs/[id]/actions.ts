"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function applyToJob(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("membership_tier")
    .eq("id", user.id)
    .single()

  if (!profile || profile.membership_tier === 'none') {
    throw new Error("Active membership required to apply to jobs.")
  }

  const projectId = formData.get("projectId") as string
  const coverLetter = formData.get("coverLetter") as string
  const proposedFee = formData.get("proposedFee") as string

  // Insert application
  const { error } = await supabase
    .from("applications")
    .insert({
      project_id: projectId,
      editor_id: user.id,
      cover_letter: coverLetter,
      proposed_fee: Number(proposedFee) || null,
      status: 'pending'
    })

  if (error) {
    console.error("Error applying to job:", error)
    redirect(`/jobs/${projectId}?error=true`)
  }

  // Create chat and send cover letter as first message
  try {
    const { startChat, sendMessage } = await import('@/app/dashboard/messages/actions')
    const chatId = await startChat(user.id, projectId)
    
    let messageContent = coverLetter
    if (proposedFee) {
      messageContent += `\n\nProposed Fee: ₹${proposedFee}`
    }
    
    await sendMessage(chatId, messageContent)
  } catch (chatError) {
    console.error("Error starting chat:", chatError)
  }

  revalidatePath(`/jobs/${projectId}`)
  redirect(`/dashboard/messages`)
}
