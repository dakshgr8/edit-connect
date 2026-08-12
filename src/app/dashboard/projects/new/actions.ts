"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function createProject(formData: FormData) {
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
    throw new Error("Active membership required to post projects.")
  }

  const title = formData.get("title") as string
  const category = formData.get("category") as string
  const budget = formData.get("budget") as string
  const description = formData.get("description") as string

  // Insert project
  const { error } = await supabase
    .from("projects")
    .insert({
      client_id: user.id,
      title,
      category,
      budget: Number(budget),
      description,
      status: 'open'
    })

  if (error) {
    console.error("Error creating project:", error)
    redirect("/dashboard/projects/new?error=true")
  }

  revalidatePath("/jobs")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/projects")
  redirect("/dashboard/projects")
}
