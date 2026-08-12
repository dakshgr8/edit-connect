import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Play, MessageCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { notFound, redirect } from "next/navigation"
import { hireEditor, createChat } from "./actions"

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: project } = await supabase
    .from("projects")
    .select("*, applications(*, editor:profiles(*))")
    .eq("id", id)
    .single()

  if (!project) {
    notFound()
  }

  // Fetch applicants
  const { data: applications } = await supabase
    .from("applications")
    .select("*, editor:profiles(id, full_name, avatar_url)")
    .eq("project_id", project.id)

  const isOpen = project.status === 'open'

  return (
    <div className="space-y-8 pb-12">
      <Link href="/dashboard/projects" className="inline-flex items-center text-sm font-bold hover:text-accent transition-colors">
        &larr; Back to Projects
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-extrabold tracking-tight">{project.title}</h1>
          <div className="flex gap-3 mt-3">
            <span className={`px-3 py-1 rounded-full border-2 border-foreground font-bold text-sm uppercase ${isOpen ? 'bg-muted' : 'bg-tertiary text-foreground'}`}>
              Status: {project.status}
            </span>
            <span className="px-3 py-1 bg-quaternary/20 text-quaternary rounded-full border-2 border-quaternary font-bold text-sm">Budget: ₹{project.budget}</span>
          </div>
        </div>
        {isOpen && <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">Cancel Project</Button>}
      </div>

      <div className="space-y-6 pt-8">
        <h2 className="text-2xl font-display font-bold border-b-4 border-foreground pb-2 inline-block">
          Review Applicants ({applications?.length || 0})
        </h2>
        
        {(!applications || applications.length === 0) ? (
          <Card className="shadow-none border-dashed border-2">
            <CardContent className="p-12 text-center text-muted-foreground font-bold text-lg">
              No editors have applied to this project yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app: any, i) => {
              const tilt = i % 2 === 0 ? "rotate-1" : "-rotate-1"
              const bgColors = ["bg-tertiary", "bg-secondary", "bg-quaternary", "bg-accent"]
              const color = bgColors[i % bgColors.length]
              const isAccepted = app.status === 'accepted'
              
              const editorName = app.editor?.full_name || 'Editor'

              return (
                <Card key={app.id} className={`shadow-[var(--shadow-sticker)] transition-transform hover:scale-105 duration-300 ${tilt} ${isAccepted ? 'border-4 border-tertiary' : ''}`}>
                  <CardContent className="p-6">
                    {isAccepted && (
                      <div className="absolute -top-4 -right-4 bg-tertiary text-white font-bold px-3 py-1 rounded-full border-2 border-foreground shadow-[var(--shadow-pop)] z-10 rotate-12">
                        HIRED!
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full border-2 border-foreground ${color} flex items-center justify-center shrink-0 relative overflow-hidden`}>
                          {app.editor?.avatar_url ? (
                            <img src={app.editor.avatar_url} alt={editorName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white font-bold">{editorName.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold font-display text-lg flex items-center gap-1">
                            {editorName} <CheckCircle size={14} className="text-quaternary" />
                          </h3>
                          <p className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                            ⭐ 5.0 • Bid: ₹{app.proposed_fee || project.budget}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-xl border-2 border-dashed border-border text-sm italic mb-6">
                      "{app.cover_letter}"
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <form action={createChat} className="flex-1">
                        <input type="hidden" name="editorId" value={app.editor?.id} />
                        <input type="hidden" name="projectId" value={project.id} />
                        <Button type="submit" variant="outline" className="w-full bg-white shadow-[var(--shadow-pop)]"><MessageCircle size={16} className="mr-2" /> Message</Button>
                      </form>
                      {isOpen && (
                        <form action={hireEditor} className="flex-1">
                          <input type="hidden" name="applicationId" value={app.id} />
                          <input type="hidden" name="projectId" value={project.id} />
                          <Button type="submit" className="w-full bg-tertiary text-foreground hover:bg-quaternary shadow-[var(--shadow-pop)]">
                            <Play size={16} className="mr-2" /> Hire Editor
                          </Button>
                        </form>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
