import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { updateProfile } from "./actions"

export default async function EditorProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profile?.role !== 'editor') {
    redirect("/dashboard")
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight">Public Profile</h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage how you appear to clients in the editor directory.</p>
      </div>

      <Card className="shadow-[var(--shadow-sticker)]">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-bold font-display border-b-2 border-border pb-4">Profile Details</h2>
          
          <form key={profile.updated_at || 'profile-form'} action={updateProfile} className="space-y-6 pt-2">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" name="full_name" defaultValue={profile.full_name || ""} placeholder="e.g. John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" defaultValue={profile.category || ""} placeholder="e.g. YouTube Video Editor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary_software">Primary Software</Label>
                <Input id="primary_software" name="primary_software" defaultValue={profile.primary_software || ""} placeholder="e.g. Premiere Pro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min_project_rate">Min. Project Rate (₹)</Label>
                <Input id="min_project_rate" name="min_project_rate" type="number" defaultValue={profile.min_project_rate || ""} placeholder="1000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio_url">Portfolio Link</Label>
                <Input id="portfolio_url" name="portfolio_url" type="url" defaultValue={profile.portfolio_url || ""} placeholder="https://..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About Me (Bio)</Label>
              <textarea 
                id="about" 
                name="about"
                defaultValue={profile.about || ""} 
                placeholder="Tell clients about your experience, editing style, and past projects..."
                className="w-full min-h-[160px] rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base font-medium text-foreground transition-all duration-300 outline-none shadow-[4px_4px_0px_transparent] focus-visible:border-accent focus-visible:shadow-[4px_4px_0px_var(--color-accent)] resize-y"
              />
            </div>
            <Button type="submit" size="lg" className="bg-tertiary text-foreground shadow-[var(--shadow-pop)] hover:bg-quaternary">
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
