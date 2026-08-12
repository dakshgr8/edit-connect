"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Scissors, Menu, X, LayoutDashboard, Briefcase, MessageSquare, CreditCard, Settings, LogOut, User } from "lucide-react"
import { logout } from "@/app/login/actions"

export function MobileNav({ userRole }: { userRole: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isEditor = userRole === 'editor'

  const toggleMenu = () => setIsOpen(!isOpen)

  // Close menu on navigation
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header className="md:hidden bg-white border-b-2 border-foreground p-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <Scissors size={24} className="text-accent" />
          <span className="font-display font-bold text-xl tracking-tight">EditConnect</span>
        </Link>
        <Button variant="outline" size="sm" onClick={toggleMenu} className="shadow-[var(--shadow-pop)]">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bottom-0 z-30 bg-white flex flex-col border-t-2 border-foreground">
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <SidebarLink href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" pathname={pathname} onClick={closeMenu} exact />
            
            {isEditor && (
              <>
                <SidebarLink href="/dashboard/profile" icon={<User size={20} />} label="My Profile" pathname={pathname} onClick={closeMenu} />
                <SidebarLink href="/jobs" icon={<Briefcase size={20} />} label="Find Work" pathname={pathname} onClick={closeMenu} />
              </>
            )}
            
            {!isEditor && (
              <>
                <SidebarLink href="/dashboard/projects" icon={<Briefcase size={20} />} label="My Projects" pathname={pathname} onClick={closeMenu} />
                <SidebarLink href="/editors" icon={<User size={20} />} label="Hire Editor" pathname={pathname} onClick={closeMenu} />
              </>
            )}
            
            <SidebarLink href="/dashboard/messages" icon={<MessageSquare size={20} />} label="Messages" pathname={pathname} onClick={closeMenu} />
            <SidebarLink href="/dashboard/billing" icon={<CreditCard size={20} />} label="Billing & Membership" pathname={pathname} onClick={closeMenu} />
            <SidebarLink href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" pathname={pathname} onClick={closeMenu} />
          </nav>
          
          <div className="p-4 pb-8 md:pb-4 border-t-2 border-foreground bg-white shrink-0">
            <form action={logout}>
              <Button type="submit" variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive font-bold text-lg h-12">
                <LogOut size={24} className="mr-2" />
                Log Out
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function SidebarLink({ href, icon, label, pathname, onClick, exact = false }: { href: string, icon: React.ReactNode, label: string, pathname: string, onClick: () => void, exact?: boolean }) {
  const active = exact ? pathname === href : pathname.startsWith(href)
  
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-4 rounded-xl font-bold transition-all duration-300 text-lg ${
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
