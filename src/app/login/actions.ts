"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/login?message=Could not authenticate user")
  }

  // Check role for smart redirect
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", authData.user.id)
    .single()

  revalidatePath("/", "layout")
  
  const next = formData.get("next") as string
  if (next && next.startsWith("/")) {
    redirect(next)
  }
  
  if (profile?.role === 'admin') {
    redirect("/admin")
  } else {
    redirect("/dashboard")
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect("/signup?message=Could not create user")
  }

  revalidatePath("/", "layout")
  
  const next = formData.get("next") as string
  if (next && next.startsWith("/")) {
    redirect(next)
  }
  
  redirect("/dashboard")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}
