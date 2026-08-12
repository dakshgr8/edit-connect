import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { AdminSidebar } from "./Sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // Authenticate user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  // Authorize Admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== 'admin') {
    // If they aren't an admin, kick them back to their regular dashboard
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-slate-100 flex font-body">
      {/* Client Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen relative overflow-hidden">
        {/* Subtle background pattern for admin */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 to-transparent opacity-50 pointer-events-none" />
        
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full overflow-x-hidden relative z-10">
          {children}
        </div>
      </main>
    </div>
  )
}
