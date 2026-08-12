"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, LayoutDashboard, Briefcase, MessageSquare, CreditCard, Settings, LogOut, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { logout } from "@/app/login/actions"

export function DashboardSidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname()
  const isEditor = userRole === 'editor'

  return (
    <aside className="w-64 bg-white border-r-2 border-foreground hidden md:flex flex-col sticky top-0 h-screen">
      <div className="p-6 border-b-2 border-foreground">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-accent text-white p-2 rounded-lg border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">
            <Scissors size={20} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">EditConnect</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <SidebarLink href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" pathname={pathname} exact />
        
        {isEditor && (
          <>
            <SidebarLink href="/dashboard/profile" icon={<User size={20} />} label="My Profile" pathname={pathname} />
            <SidebarLink href="/jobs" icon={<Briefcase size={20} />} label="Find Work" pathname={pathname} />
          </>
        )}
        
        {!isEditor && (
          <>
            <SidebarLink href="/dashboard/projects" icon={<Briefcase size={20} />} label="My Projects" pathname={pathname} />
            <SidebarLink href="/editors" icon={<User size={20} />} label="Hire Editor" pathname={pathname} />
          </>
        )}
        
        <SidebarLink href="/dashboard/messages" icon={<MessageSquare size={20} />} label="Messages" pathname={pathname} />
        <SidebarLink href="/dashboard/billing" icon={<CreditCard size={20} />} label="Billing & Membership" pathname={pathname} />
        <SidebarLink href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" pathname={pathname} />
      </nav>

      <div className="p-4 border-t-2 border-foreground">
        <form action={logout}>
          <Button type="submit" variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
            <LogOut size={20} className="mr-2" />
            Log Out
          </Button>
        </form>
      </div>
    </aside>
  )
}

function SidebarLink({ href, icon, label, pathname, exact = false }: { href: string, icon: React.ReactNode, label: string, pathname: string, exact?: boolean }) {
  const active = exact ? pathname === href : pathname.startsWith(href)
  
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
        active 
          ? "bg-tertiary text-foreground border-2 border-foreground shadow-[var(--shadow-pop)]" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}
