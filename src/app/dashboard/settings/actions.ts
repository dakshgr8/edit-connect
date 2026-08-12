"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const full_name = formData.get("full_name") as string

  if (full_name) {
    await supabase
      .from("profiles")
      .update({ full_name })
      .eq("id", user.id)
  }

  revalidatePath("/dashboard/settings")
  revalidatePath("/editors")
}
