import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

export const revalidate = 0

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  // Fetch all projects with client details
  const { data: projects } = await supabase
    .from("projects")
    .select("*, client:profiles!projects_client_id_fkey(first_name, last_name, full_name)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-slate-900">All Projects</h1>
        <p className="text-slate-600 mt-2 text-lg">Monitor platform activity and view project statuses.</p>
      </div>

      <Card className="shadow-[var(--shadow-sticker)] bg-white border-dashed">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-slate-50">
                  <th className="p-4 font-bold text-sm uppercase">Title</th>
                  <th className="p-4 font-bold text-sm uppercase">Client</th>
                  <th className="p-4 font-bold text-sm uppercase">Budget</th>
                  <th className="p-4 font-bold text-sm uppercase">Status</th>
                  <th className="p-4 font-bold text-sm uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-dashed divide-slate-200">
                {projects?.map((project: any) => {
                  const clientName = project.client?.full_name || `${project.client?.first_name || ''} ${project.client?.last_name || ''}`.trim() || 'Unknown'
                  
                  return (
                    <tr key={project.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold max-w-[250px] truncate">
                        <Link href={`/jobs/${project.id}`} className="hover:underline hover:text-accent">
                          {project.title}
                        </Link>
                      </td>
                      <td className="p-4 text-sm text-slate-700">
                        {clientName}
                      </td>
                      <td className="p-4 font-black font-display text-slate-800">
                        ₹{project.budget}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border-2 uppercase ${
                          project.status === 'open' ? 'bg-green-100 text-green-800 border-green-200' :
                          project.status === 'in_progress' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-slate-100 text-slate-800 border-slate-200'
                        }`}>
                          {project.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 text-sm">
                        {new Date(project.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                })}
                {(!projects || projects.length === 0) && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">No projects posted yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
