import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Star, CheckCircle, Video, IndianRupee, Link as LinkIcon, MessageCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { notFound, redirect } from "next/navigation"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch editor profile
  const { data: editor, error } = await supabase
    .from("profiles")
    .select("*, projects!projects_editor_id_fkey(rating, review_comment, client:profiles!projects_client_id_fkey(full_name, avatar_url))")
    .eq("id", id)
    .eq("role", "editor")
    .single()

  if (!editor || error) {
    notFound()
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    if (profile?.role === 'editor') {
      redirect("/dashboard")
    }
  }

  // Calculate ratings
  const ratedProjects = (editor.projects as any[] || []).filter((p) => p.rating !== null && p.rating !== undefined)
  const reviewCount = ratedProjects.length
  const avgRating = reviewCount > 0 ? (ratedProjects.reduce((acc, p) => acc + p.rating, 0) / reviewCount).toFixed(1) : null

  return (
    <div className="min-h-screen bg-muted flex flex-col font-body pb-24 pt-12 px-6">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <Link href="/editors" className="inline-flex items-center text-sm font-bold hover:text-accent transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Editors
        </Link>

        {/* Profile Header Card */}
        <div className="bg-white border-4 border-foreground rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_var(--color-secondary)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-foreground bg-tertiary flex items-center justify-center overflow-hidden shrink-0 shadow-[var(--shadow-pop)]">
              {editor.avatar_url ? (
                <img src={editor.avatar_url} alt={editor.full_name || 'Editor'} className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl font-bold text-white">{(editor.full_name || 'E').charAt(0).toUpperCase()}</span>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-extrabold flex items-center justify-center md:justify-start gap-2">
                  {editor.full_name || 'Anonymous Editor'}
                  <CheckCircle size={28} className="text-quaternary" />
                </h1>
                <p className="text-xl font-bold text-muted-foreground mt-2">{editor.category || 'Video Editor'}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="bg-white border-2 border-foreground rounded-full px-4 py-2 shadow-[2px_2px_0px_#1E293B] flex items-center gap-2 font-bold text-sm">
                  <Star size={16} className="text-tertiary fill-tertiary" /> {avgRating || 'New'} {reviewCount ? `(${reviewCount} Reviews)` : ''}
                </div>
                <div className="bg-white border-2 border-foreground rounded-full px-4 py-2 shadow-[2px_2px_0px_#1E293B] flex items-center gap-2 font-bold text-sm">
                  <IndianRupee size={16} className="text-accent" /> Starts at ₹{editor.min_project_rate || '1000'}
                </div>
                <div className="bg-white border-2 border-foreground rounded-full px-4 py-2 shadow-[2px_2px_0px_#1E293B] flex items-center gap-2 font-bold text-sm">
                  <Video size={16} className="text-secondary" /> {editor.primary_software || 'Premiere Pro'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-6">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border-2 border-foreground rounded-2xl p-8 shadow-[var(--shadow-sticker)]">
              <h2 className="text-2xl font-bold font-display border-b-4 border-foreground pb-2 inline-block mb-6">
                About Me
              </h2>
              <div className="prose prose-lg text-slate-700 whitespace-pre-wrap font-medium max-w-none">
                {editor.bio || "This editor hasn't written an about me section yet."}
              </div>
            </div>

            {reviewCount > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-display border-b-4 border-foreground pb-2 inline-block">
                  Recent Reviews
                </h2>
                <div className="space-y-4">
                  {ratedProjects.map((project, i) => (
                    <Card key={i} className="shadow-[var(--shadow-sticker)]">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Star size={16} className="text-tertiary fill-tertiary" />
                          <span className="font-bold">{project.rating}.0</span>
                          <span className="text-muted-foreground font-medium text-sm ml-2">- {project.client?.full_name || 'Client'}</span>
                        </div>
                        {project.review_comment && (
                          <p className="italic text-slate-600 font-medium">"{project.review_comment}"</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-[8px_8px_0px_var(--color-quaternary)] border-4 border-foreground sticky top-24">
              <CardContent className="p-6 md:p-8 space-y-6">
                <h3 className="font-display font-bold text-2xl">Work with Me</h3>
                
                {editor.portfolio_url ? (
                  <Button nativeButton={false} render={<a href={editor.portfolio_url} target="_blank" rel="noopener noreferrer" />} variant="outline" className="w-full h-14 font-bold text-lg">
                    <LinkIcon size={18} className="mr-2" /> View Portfolio
                  </Button>
                ) : (
                  <Button disabled variant="outline" className="w-full h-14 font-bold text-lg">
                    No Portfolio Provided
                  </Button>
                )}
                
                <form action={async () => {
                  "use server"
                  const { startChat } = await import('@/app/dashboard/messages/actions')
                  try {
                    await startChat(id)
                    redirect('/dashboard/messages')
                  } catch (e: any) {
                    if (e.message === 'NEXT_REDIRECT') throw e;
                    redirect(`/login?next=/editors/${id}`)
                  }
                }}>
                  <Button type="submit" className="w-full bg-quaternary text-foreground hover:bg-tertiary shadow-[var(--shadow-pop)] h-14 font-black text-xl uppercase tracking-wide">
                    <MessageCircle size={20} className="mr-2" /> Message Me
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-xs font-bold text-muted-foreground mt-4">Average response time: 2 hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
