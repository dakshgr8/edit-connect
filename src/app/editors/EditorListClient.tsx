"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardFooter, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function EditorListClient({ initialEditors }: { initialEditors: any[] }) {
  const [editors, setEditors] = useState(initialEditors)
  const supabase = createClient()
  const searchParams = useSearchParams()
  const q = searchParams.get('q')?.toLowerCase() || ''

  useEffect(() => {
    const channel = supabase
      .channel('public:profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: "role=eq.editor" }, async (payload) => {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("*, projects!projects_editor_id_fkey(rating)")
          .eq("role", "editor")
        
        if (profiles) {
          const editors = profiles.map((editor) => {
            const ratedProjects = (editor.projects as any[] || []).filter((p) => p.rating !== null && p.rating !== undefined)
            const reviewCount = ratedProjects.length
            const avgRating = reviewCount > 0 ? (ratedProjects.reduce((acc, p) => acc + p.rating, 0) / reviewCount).toFixed(1) : null
            
            const { projects, ...editorData } = editor
            return { ...editorData, reviewCount, avgRating }
          })
          setEditors(editors)
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const filteredEditors = editors.filter(e => 
    !q || 
    (e.full_name && e.full_name.toLowerCase().includes(q)) || 
    (e.about && e.about.toLowerCase().includes(q)) ||
    (e.category && e.category.toLowerCase().includes(q)) ||
    (e.primary_software && e.primary_software.toLowerCase().includes(q))
  )

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold font-display">Top Rated Editors ({filteredEditors.length})</h2>
        <select className="h-10 rounded-lg border-2 border-foreground bg-white px-3 font-bold shadow-[2px_2px_0px_#1E293B] outline-none">
          <option>Sort by: Rating</option>
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Experience</option>
        </select>
      </div>

      {filteredEditors.length === 0 ? (
        <Card className="shadow-none border-dashed border-2">
          <CardContent className="p-12 text-center text-muted-foreground font-bold text-lg">
            No editors found matching your search. Try different keywords!
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredEditors.map((editor: any, i: number) => {
            const tilt = i % 2 === 0 ? "rotate-1" : "-rotate-1"
            const bgColors = ["bg-tertiary", "bg-secondary", "bg-quaternary", "bg-accent"]
            const color = bgColors[i % bgColors.length]
            
            const name = editor.full_name || 'Editor'
            
            return (
              <Card key={editor.id} className={`shadow-[var(--shadow-sticker)] transition-transform hover:scale-105 duration-300 ${tilt}`}>
                <CardAction>
                  <div className="bg-white border-2 border-foreground rounded-full px-2 py-1 shadow-[2px_2px_0px_#1E293B] flex items-center gap-1 font-bold text-xs -mt-3 -mr-3">
                    <Star size={12} className="text-tertiary fill-tertiary" /> {editor.avgRating || 'New'} {editor.reviewCount ? `(${editor.reviewCount})` : ''}
                  </div>
                </CardAction>
                <CardContent className="pt-8 flex flex-col items-center text-center space-y-4">
                  <div className={`w-24 h-24 rounded-full border-4 border-foreground ${color} flex items-center justify-center overflow-hidden`}>
                    {editor.avatar_url ? (
                      <img src={editor.avatar_url} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-white">{name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display flex items-center justify-center gap-1">
                      {name}
                      <CheckCircle size={16} className="text-quaternary" />
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground mt-1">{editor.category || 'Video Editor'}</p>
                  </div>

                  {editor.about && (
                    <p className="text-sm text-slate-600 font-medium line-clamp-3 px-2">
                      {editor.about}
                    </p>
                  )}
                  
                  <div className="w-full flex justify-between items-center pt-4 border-t-2 border-dashed border-border text-sm">
                    <span className="font-bold">{editor.primary_software || 'Premiere Pro'}</span>
                    <span className="font-black font-display text-accent">₹{editor.min_project_rate || '1000'} min.</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2 w-full">
                  <Button nativeButton={false} render={<Link href={`/editors/${editor.id}`} />} variant="outline" className="w-full font-bold shadow-[var(--shadow-pop)]">
                    View Profile
                  </Button>
                  <Button 
                    className="w-full bg-quaternary text-foreground hover:bg-tertiary"
                    onClick={async () => {
                      const { startChat } = await import('@/app/dashboard/messages/actions')
                      try {
                        await startChat(editor.id)
                        window.location.href = '/dashboard/messages'
                      } catch (e) {
                        console.error(e)
                        // Maybe they aren't logged in, redirect to login
                        window.location.href = '/login?next=/editors'
                      }
                    }}
                  >
                    Message
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </>
  )
}
