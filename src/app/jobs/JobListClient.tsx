"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IndianRupee, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function JobListClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects)
  const supabase = createClient()
  const searchParams = useSearchParams()
  const q = searchParams.get('q')?.toLowerCase() || ''

  useEffect(() => {
    const channel = supabase
      .channel('public:projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, async (payload) => {
        // Refetch fully so we get joined relations (like client info)
        const { data } = await supabase
          .from("projects")
          .select("*, client:profiles!projects_client_id_fkey(full_name, avatar_url)")
          .eq("status", "open")
          .order("created_at", { ascending: false })
        
        if (data) setProjects(data)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const filteredProjects = projects.filter(p => 
    !q || 
    p.title.toLowerCase().includes(q) || 
    (p.description && p.description.toLowerCase().includes(q)) ||
    (p.category && p.category.toLowerCase().includes(q))
  )

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-display">Latest Open Projects</h2>
        <span className="font-bold text-muted-foreground">{filteredProjects.length} jobs found</span>
      </div>

      <div className="space-y-6">
        {filteredProjects.length === 0 ? (
          <Card className="shadow-none border-dashed border-2">
            <CardContent className="p-12 text-center text-muted-foreground font-bold text-lg">
              No projects found matching your search. Try different keywords!
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project: any) => (
            <Card key={project.id} className="shadow-[var(--shadow-sticker)] transition-transform hover:-translate-y-1 hover:scale-[1.01] duration-300">
              <div className="flex flex-col md:flex-row p-6 gap-6 justify-between items-start">
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="flex gap-3 mb-2">
                      <span className="px-3 py-1 bg-tertiary/20 text-tertiary rounded-full border-2 border-tertiary font-bold text-xs uppercase">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full border-2 border-green-300 font-bold text-xs uppercase flex items-center gap-1">
                        <CheckCircle size={12}/> Verified Client
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-display">{project.title}</h3>
                  </div>
                  
                  <p className="text-slate-600 font-medium line-clamp-3 max-w-3xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mt-4 text-sm font-bold text-slate-500">
                    <span className="flex items-center gap-1"><IndianRupee size={16} className="text-accent" /> Budget: ₹{project.budget}</span>
                    <span className="flex items-center gap-1"><Clock size={16} /> Posted recently</span>
                    <span>Client: {project.client?.full_name || 'A Client'}</span>
                  </div>
                </div>
                
                <div className="shrink-0 w-full md:w-48 pt-4 md:pt-0">
                  <Link href={`/jobs/${project.id}`}>
                    <Button size="lg" className="w-full bg-quaternary text-foreground hover:bg-tertiary shadow-[var(--shadow-pop)] font-bold text-lg h-14">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
