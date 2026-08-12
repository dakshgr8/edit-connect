import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  const { createClient } = require("@/utils/supabase/server")
  const supabase = await createClient()
  const { data, error } = await supabase.from("projects").select("*, client:profiles(full_name, avatar_url)").eq("id", "ed0979f9-eaa3-400f-a35f-8c34483222c0").single()
  return NextResponse.json({ data, error })
}
