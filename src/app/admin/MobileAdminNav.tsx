"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldAlert, Menu, X, LayoutDashboard, Users, FileVideo, IndianRupee, Bell, LogOut } from "lucide-react"
import { logout } from "@/app/login/actions"
import { Button, buttonVariants } from "@/components/ui/button"

export function MobileAdminNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <header className="md:hidden bg-slate-950 border-b-2 border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="bg-red-500 text-white p-2 rounded-lg border-2 border-white shadow-[2px_2px_0px_white]">
            <ShieldAlert size={20} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">Admin Portal</span>
        </Link>
        <button onClick={toggleMenu} className="text-white p-2 bg-slate-800 rounded-lg border-2 border-slate-700 shadow-[var(--shadow-pop)]">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bottom-0 z-30 bg-slate-900 flex flex-col border-t-2 border-slate-950">
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <SidebarLink href="/admin" icon={<LayoutDashboard size={20} />} label="Overview" pathname={pathname} onClick={closeMenu} exact />
            <SidebarLink href="/admin/users" icon={<Users size={20} />} label="Manage Users" pathname={pathname} onClick={closeMenu} />
            <SidebarLink href="/admin/projects" icon={<FileVideo size={20} />} label="All Projects" pathname={pathname} onClick={closeMenu} />
            <SidebarLink href="/admin/revenue" icon={<IndianRupee size={20} />} label="Revenue" pathname={pathname} onClick={closeMenu} />
            <SidebarLink href="/admin/support" icon={<Bell size={20} />} label="Support Tickets" pathname={pathname} onClick={closeMenu} />
          </nav>
          
          <div className="p-4 pb-8 md:pb-4 border-t-2 border-slate-800 bg-slate-950 shrink-0">
            <form action={logout}>
              <button 
                type="submit"
                className={buttonVariants({ variant: "ghost", className: "w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-red-300 font-bold text-lg h-12" })}
              >
                <LogOut size={24} className="mr-2" />
                Logout
              </button>
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
          ? "bg-slate-800 text-white border-2 border-slate-700 shadow-[var(--shadow-pop)]" 
          : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}
