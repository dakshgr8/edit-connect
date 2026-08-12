import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Lock, Shield, User } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { updateProfile } from "./actions"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const isEditor = profile?.role === 'editor'

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage your account preferences and profile.</p>
      </div>

      <div className="max-w-2xl">
        <Card className="shadow-[var(--shadow-sticker)]">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold font-display border-b-2 border-border pb-4">Profile Information</h2>
            
            <form action={updateProfile} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" name="full_name" defaultValue={profile.full_name || ""} placeholder="Your full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue={user.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground mt-1 font-bold">Email address cannot be changed.</p>
                </div>
              </div>
              <Button type="submit" className="w-full sm:w-auto bg-tertiary text-foreground hover:bg-quaternary shadow-[var(--shadow-pop)] font-bold px-8">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
