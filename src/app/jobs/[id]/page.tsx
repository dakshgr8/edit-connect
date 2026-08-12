import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, IndianRupee, Video, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { applyToJob } from "./actions"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch project details
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*, client:profiles!projects_client_id_fkey(full_name, avatar_url)")
    .eq("id", id)
    .single()

  if (!project) {
    notFound()
  }

  // Check if current user has already applied
  const { data: { user } } = await supabase.auth.getUser()
  let hasApplied = false
  let membershipTier = 'none'
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("membership_tier")
      .eq("id", user.id)
      .single()
      
    if (profile) membershipTier = profile.membership_tier

    const { data: application } = await supabase
      .from("applications")
      .select("id")
      .eq("project_id", project.id)
      .eq("editor_id", user.id)
      .single()
    
    if (application) hasApplied = true
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col font-body pb-24 pt-12 px-6">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <Link href="/jobs" className="inline-flex items-center text-sm font-bold hover:text-accent transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Job Board
        </Link>

        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-tertiary/20 text-tertiary rounded-full border-2 border-tertiary font-bold text-xs uppercase">
              {project.category}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full border-2 border-green-300 font-bold text-xs uppercase flex items-center gap-1">
              <CheckCircle size={12}/> Verified Client
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">{project.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 mt-4 text-base font-bold text-slate-600 bg-white p-4 rounded-xl border-2 border-slate-300 shadow-[var(--shadow-sticker)]">
            <span className="flex items-center gap-2"><IndianRupee size={20} className="text-accent" /> Budget: ₹{project.budget}</span>
            <span className="flex items-center gap-2"><Clock size={20} /> Status: {project.status}</span>
            <span className="flex items-center gap-2"><Video size={20} /> Client: {project.client?.full_name || 'A Client'}</span>
          </div>
        </div>

        <div className="space-y-12 pt-6">
          <div className="bg-white border-2 border-foreground rounded-2xl p-8 shadow-[var(--shadow-sticker)]">
            <h2 className="text-2xl font-bold font-display border-b-4 border-foreground pb-2 inline-block mb-6">
              Project Description
            </h2>
            <div className="prose prose-lg text-slate-700 whitespace-pre-wrap font-medium max-w-none">
              {project.description}
            </div>
          </div>

          <div>
            <Card className="shadow-[12px_12px_0px_var(--color-tertiary)] border-4 border-foreground bg-accent text-white">
              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="text-center space-y-2">
                  <h3 className="font-display font-extrabold text-4xl">Ready to Edit?</h3>
                  <p className="text-white/80 font-bold text-lg">Submit your proposal and pitch why you're the best editor for the job.</p>
                </div>
                
                {hasApplied ? (
                  <div className="bg-green-100 border-2 border-green-400 p-8 rounded-xl text-center font-bold text-green-800 shadow-[var(--shadow-pop)] max-w-2xl mx-auto">
                    <CheckCircle className="mx-auto mb-4" size={48} />
                    <span className="text-2xl font-display">You have successfully applied!</span>
                    <p className="mt-2 font-medium text-green-700">The client will review your application and message you if it's a match.</p>
                  </div>
                ) : !user ? (
                  <div className="text-center space-y-6 bg-white/10 p-12 rounded-2xl border-2 border-white/20 max-w-2xl mx-auto">
                    <p className="font-medium text-xl">You need an account to apply for projects.</p>
                    <Button nativeButton={false} render={<Link href={`/login?next=/jobs/${id}`} className="block w-full h-full text-center flex items-center justify-center" />} className="w-full max-w-md mx-auto bg-white text-foreground hover:bg-tertiary shadow-[var(--shadow-pop)] h-14 font-bold text-xl">
                      Log in to Apply
                    </Button>
                  </div>
                ) : membershipTier === 'none' ? (
                  <div className="text-center space-y-6 bg-white/10 p-12 rounded-2xl border-2 border-white/20 max-w-2xl mx-auto">
                    <p className="font-medium text-xl">You need an active Editor membership to apply for projects.</p>
                    <Button nativeButton={false} render={<Link href="/pricing" className="block w-full h-full text-center flex items-center justify-center" />} className="w-full max-w-md mx-auto bg-tertiary text-foreground hover:bg-quaternary shadow-[var(--shadow-pop)] h-14 font-bold text-xl">
                      Upgrade Membership
                    </Button>
                  </div>
                ) : (
                  <form action={applyToJob} className="space-y-8 bg-white text-foreground p-8 md:p-12 rounded-2xl border-4 border-foreground shadow-[var(--shadow-pop)] max-w-4xl mx-auto">
                    <input type="hidden" name="projectId" value={project.id} />
                    <div className="space-y-4">
                      <Label htmlFor="coverLetter" className="text-xl font-bold font-display flex items-center gap-2">
                        <span className="bg-tertiary text-white w-8 h-8 flex items-center justify-center rounded-full border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">1</span>
                        Your Cover Letter & Pitch
                      </Label>
                      <p className="text-sm text-slate-500 font-bold mb-2">Explain why your editing style matches this project and include relevant portfolio links.</p>
                      <textarea 
                        id="coverLetter" 
                        name="coverLetter"
                        required
                        rows={8}
                        className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 px-6 py-4 text-base font-medium text-foreground transition-all duration-300 outline-none shadow-[4px_4px_0px_transparent] focus-visible:border-accent focus-visible:bg-white focus-visible:shadow-[4px_4px_0px_var(--color-accent)] resize-y"
                        placeholder="Hi! I have 3 years of experience editing exactly this type of video..."
                      />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="proposedFee" className="text-xl font-bold font-display flex items-center gap-2">
                        <span className="bg-secondary text-white w-8 h-8 flex items-center justify-center rounded-full border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">2</span>
                        Your Proposed Fee (₹)
                      </Label>
                      <p className="text-sm text-slate-500 font-bold mb-2">The client has set a budget of ₹{project.budget}, but you can negotiate your fee.</p>
                      <div className="relative max-w-md">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xl">₹</span>
                        <input 
                          type="number"
                          id="proposedFee" 
                          name="proposedFee"
                          required
                          className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 pl-10 pr-6 py-4 text-xl font-black text-foreground transition-all duration-300 outline-none shadow-[4px_4px_0px_transparent] focus-visible:border-accent focus-visible:bg-white focus-visible:shadow-[4px_4px_0px_var(--color-accent)]"
                          placeholder="e.g. 8000"
                          defaultValue={project.budget}
                        />
                      </div>
                    </div>
                    <div className="pt-6 border-t-2 border-dashed border-slate-300">
                      <Button type="submit" size="lg" className="w-full bg-quaternary text-foreground hover:bg-tertiary shadow-[var(--shadow-pop)] h-16 font-black text-2xl uppercase tracking-wide">
                        Submit Application
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
