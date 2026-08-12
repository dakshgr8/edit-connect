import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors } from "lucide-react"
import { DashboardSidebar } from "./Sidebar"
import { ProfileEnforcer } from "./ProfileEnforcer"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single()

  const isMissingName = !profile?.full_name

  return (
    <div className="min-h-screen bg-muted flex font-body">
      {/* Sidebar Navigation */}
      <DashboardSidebar userRole={profile?.role || 'client'} />

      {/* Main Content Area */}
      <main className="flex-1 bg-dot-grid min-w-0 flex flex-col min-h-screen relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b-2 border-foreground p-4 flex items-center justify-between sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-2">
            <Scissors size={24} className="text-accent" />
            <span className="font-display font-bold text-xl tracking-tight">EditConnect</span>
          </Link>
          <Button variant="outline" size="sm">Menu</Button>
        </header>

        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full overflow-x-hidden">
          <ProfileEnforcer isMissingName={isMissingName}>
            {children}
          </ProfileEnforcer>
        </div>
      </main>
    </div>
  )
}
