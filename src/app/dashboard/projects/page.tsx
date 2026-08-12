import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Clock, Video, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export const revalidate = 0

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  // Fetch client's projects
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role === 'editor') {
    redirect("/dashboard")
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-extrabold tracking-tight">Your Projects</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage active projects and review deliveries.</p>
        </div>
        <Link 
          href="/dashboard/projects/new"
          className={buttonVariants({ size: "lg", className: "bg-quaternary hover:bg-tertiary text-foreground w-full md:w-auto" })}
        >
          <Plus size={20} className="mr-2" />
          Post New Project
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input className="pl-9 h-12 shadow-[2px_2px_0px_transparent] focus-visible:shadow-[2px_2px_0px_var(--color-accent)]" placeholder="Search projects..." />
        </div>
        <Button variant="outline" className="h-12"><Filter className="mr-2" size={16} /> Filter</Button>
      </div>

      <div className="grid gap-6">
        {(!projects || projects.length === 0) ? (
          <Card className="shadow-none border-dashed border-2 p-12 text-center text-muted-foreground font-bold">
            You haven't posted any projects yet.
          </Card>
        ) : (
          projects.map((project: any, i) => {
            const bgColors = ["bg-tertiary", "bg-secondary", "bg-quaternary", "bg-accent"]
            const color = bgColors[i % bgColors.length]
            
            return (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="block">
                <Card className="hover:-translate-y-1 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl border-2 border-foreground ${color} flex items-center justify-center shrink-0`}>
                        <Video className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-display">{project.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground font-bold">
                          <span className="flex items-center gap-1"><Clock size={14} /> Recently</span>
                          <span>•</span>
                          <span className="uppercase text-xs">{project.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-1">
                      <span className="text-2xl font-black font-display text-accent">₹{project.budget}</span>
                      <span className="px-3 py-1 bg-muted rounded-full border-2 border-foreground font-bold text-xs uppercase">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
