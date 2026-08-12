import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Briefcase, IndianRupee, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import JobListClient from "./JobListClient"

export const revalidate = 0 // always fetch live data

export default async function JobsPage() {
  const supabase = await createClient()
  
  // Fetch all open projects from DB
  const { data: projects } = await supabase
    .from("projects")
    .select("*, client:profiles!projects_client_id_fkey(full_name, avatar_url)")
    .eq("status", "open")
    .order("created_at", { ascending: false })

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-muted flex flex-col font-body pb-24">
      {/* Header */}
      <div className="bg-white border-b-2 border-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
              <div className="bg-quaternary text-white p-1 rounded-md border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">
                <Briefcase size={16} />
              </div>
              EditConnect
            </Link>
            
            <div className="flex items-center gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button className="font-bold bg-tertiary text-foreground hover:bg-quaternary shadow-[var(--shadow-pop)]">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login?next=/jobs">
                    <Button variant="outline" className="hidden sm:inline-flex font-bold">Log in</Button>
                  </Link>
                  <Link href="/signup?next=/jobs">
                    <Button className="font-bold">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <h1 className="text-5xl font-display font-extrabold tracking-tight">Find Editing Work</h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-bold">
            Browse high-quality projects posted by top clients and creators.
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input className="pl-12 h-14 text-lg" placeholder="Search by keyword, category..." />
            </div>
            <Button size="lg" className="h-14 bg-accent text-white hover:bg-slate-800">
              <Filter className="mr-2" /> Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-12 w-full space-y-8">
        <JobListClient initialProjects={projects || []} />
      </div>
    </div>
  )
}
