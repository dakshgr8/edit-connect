"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const about = formData.get("about") as string
  const full_name = formData.get("full_name") as string
  const category = formData.get("category") as string
  const primary_software = formData.get("primary_software") as string
  const min_project_rate = formData.get("min_project_rate") as string
  const portfolio_url = formData.get("portfolio_url") as string

  const { error } = await supabase
    .from("profiles")
    .update({ 
      about,
      full_name: full_name || null,
      category: category || null,
      primary_software: primary_software || null,
      min_project_rate: min_project_rate ? parseFloat(min_project_rate) : null,
      portfolio_url: portfolio_url || null,
      updated_at: new Date().toISOString()
    })
    .eq("id", user.id)

  if (error) {
    console.error("Profile update error:", error)
  }

  revalidatePath("/dashboard/profile")
  revalidatePath("/editors")
}
