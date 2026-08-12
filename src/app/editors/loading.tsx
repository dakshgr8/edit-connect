import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EditorsLoading() {
  return (
    <div className="min-h-screen bg-muted flex flex-col font-body pb-24">
      {/* Header Skeleton */}
      <div className="bg-white border-b-2 border-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
              <div className="bg-accent text-white p-1 rounded-md border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">
                <Play size={16} />
              </div>
              EditConnect
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-24 h-10 bg-slate-200 animate-pulse rounded-md"></div>
              <div className="w-24 h-10 bg-slate-200 animate-pulse rounded-md"></div>
            </div>
          </div>
          <h1 className="text-5xl font-display font-extrabold tracking-tight text-slate-800">Find Your Perfect Editor</h1>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input className="pl-12 h-14 text-lg bg-slate-100 border-slate-200" placeholder="Loading editors..." disabled />
            </div>
            <Button size="lg" className="h-14 bg-slate-200 text-slate-400 border-slate-300 pointer-events-none shadow-none" disabled>
              <Filter className="mr-2" /> Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-6 pt-12 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse flex flex-col h-full border-4 border-slate-200 shadow-none bg-white">
              <CardContent className="p-8 flex-1 flex flex-col items-center text-center space-y-4">
                <div className="w-28 h-28 rounded-full bg-slate-200"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                
                <div className="w-full space-y-2 mt-6">
                  <div className="h-8 bg-slate-200 rounded-full w-full"></div>
                  <div className="h-8 bg-slate-200 rounded-full w-full"></div>
                  <div className="h-8 bg-slate-200 rounded-full w-full"></div>
                </div>
              </CardContent>
              <div className="p-6 border-t-2 border-slate-200">
                <div className="h-12 bg-slate-200 rounded-md w-full"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
