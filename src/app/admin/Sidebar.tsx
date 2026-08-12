"use client"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { ShieldAlert, Users, LayoutDashboard, FileVideo, IndianRupee, Bell, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { logout } from "@/app/login/actions"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-900 text-white border-r-2 border-slate-950 hidden md:flex flex-col sticky top-0 h-screen z-50">
      <div className="p-6 border-b-2 border-slate-800 bg-slate-950">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="bg-red-500 text-white p-2 rounded-lg border-2 border-white shadow-[2px_2px_0px_white]">
            <ShieldAlert size={20} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Admin Portal</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <SidebarLink href="/admin" icon={<LayoutDashboard size={20} />} label="Overview" pathname={pathname} exact />
        <SidebarLink href="/admin/users" icon={<Users size={20} />} label="Manage Users" pathname={pathname} />
        <SidebarLink href="/admin/projects" icon={<FileVideo size={20} />} label="All Projects" pathname={pathname} />
        <SidebarLink href="/admin/revenue" icon={<IndianRupee size={20} />} label="Revenue" pathname={pathname} />
        <SidebarLink href="/admin/support" icon={<Bell size={20} />} label="Support Tickets" pathname={pathname} />
      </nav>

      <div className="p-4 border-t-2 border-slate-800">
        <form action={logout}>
          <button 
            type="submit"
            className={buttonVariants({ variant: "ghost", className: "w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-red-300" })}
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
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
          ? "bg-slate-800 text-white border-2 border-slate-700 shadow-[var(--shadow-pop)]" 
          : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}
