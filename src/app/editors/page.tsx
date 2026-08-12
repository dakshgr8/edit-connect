import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardAction } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star, Play, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import EditorListClient from "./EditorListClient"

export const revalidate = 0

export default async function SearchEditorsPage() {
  const supabase = await createClient()

  // Fetch all users with the 'editor' role
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*, projects!projects_editor_id_fkey(rating)")
    .eq("role", "editor")

  const editors = (profiles || []).map((editor) => {
    const ratedProjects = (editor.projects as any[] || []).filter((p) => p.rating !== null && p.rating !== undefined)
    const reviewCount = ratedProjects.length
    const avgRating = reviewCount > 0 ? (ratedProjects.reduce((acc, p) => acc + p.rating, 0) / reviewCount).toFixed(1) : null
    
    // Remove projects array to keep payload clean
    const { projects, ...editorData } = editor
    return {
      ...editorData,
      reviewCount,
      avgRating
    }
  })

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-muted flex flex-col font-body pb-24">
      {/* Header */}
      <div className="bg-white border-b-2 border-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
              <div className="bg-accent text-white p-1 rounded-md border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">
                <Play size={16} />
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
                  <Link href="/login?next=/editors">
                    <Button variant="outline" className="hidden sm:inline-flex font-bold">Log in</Button>
                  </Link>
                  <Link href="/signup?next=/editors">
                    <Button className="font-bold">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <h1 className="text-5xl font-display font-extrabold tracking-tight">Find Your Perfect Editor</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input className="pl-12 h-14 text-lg" placeholder="Search by software, category, or name..." />
            </div>
            <Button size="lg" className="h-14 bg-tertiary text-foreground hover:bg-quaternary">
              <Filter className="mr-2" /> Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-12 w-full">
        <EditorListClient initialEditors={editors || []} />
      </div>
    </div>
  )
}
