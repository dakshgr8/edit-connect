import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createProject } from "./actions"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function NewProjectPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, membership_tier")
    .eq("id", user.id)
    .single()

  if (profile?.role === 'editor') {
    redirect("/dashboard")
  }

  const hasMembership = profile?.membership_tier && profile.membership_tier !== 'none'

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-bold hover:text-accent transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Link>
      
      <div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight">Post a New Project</h1>
        <p className="text-muted-foreground mt-2 text-lg">Fill out the details below to find the perfect editor.</p>
      </div>

      <Card className="shadow-[var(--shadow-sticker-featured)] -rotate-1 border-tertiary">
        <CardContent className="p-8">
          {!hasMembership ? (
            <div className="text-center space-y-4 py-8">
              <h2 className="text-2xl font-bold font-display text-slate-800">Membership Required</h2>
              <p className="text-slate-600 font-medium">You need an active Client membership to post projects.</p>
              <Link href="/pricing" className="block max-w-xs mx-auto">
                <Button className="w-full bg-quaternary text-foreground hover:bg-tertiary shadow-[var(--shadow-pop)] h-12 font-bold text-lg">
                  Upgrade Membership
                </Button>
              </Link>
            </div>
          ) : (
            <form action={createProject} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" required placeholder="e.g. YouTube Vlog - Bali Travel" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="category">Editing Category</Label>
                  <select id="category" name="category" required className="h-12 w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-base font-medium text-foreground transition-all duration-300 outline-none shadow-[4px_4px_0px_transparent] focus-visible:border-accent focus-visible:shadow-[4px_4px_0px_var(--color-accent)]">
                    <option value="YouTube Long Form">YouTube Long Form</option>
                    <option value="Instagram Reels / TikTok">Instagram Reels / TikTok</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Commercial / Ad">Commercial / Ad</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (₹)</Label>
                  <Input id="budget" name="budget" required type="number" placeholder="5000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="references">Reference Videos (URLs)</Label>
                <Input id="references" name="references" placeholder="https://youtube.com/..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <textarea 
                  id="description" 
                  name="description"
                  required
                  rows={5}
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base font-medium text-foreground transition-all duration-300 outline-none shadow-[4px_4px_0px_transparent] focus-visible:border-accent focus-visible:shadow-[4px_4px_0px_var(--color-accent)] resize-none"
                  placeholder="Describe your vision, pacing, required graphics, and any specific instructions..."
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-4">
                <Button type="button" variant="ghost">Save as Draft</Button>
                <Button type="submit" className="bg-tertiary text-foreground hover:bg-quaternary">Publish Project</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
