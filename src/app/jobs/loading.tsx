import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Briefcase } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function JobsLoading() {
  return (
    <div className="min-h-screen bg-muted flex flex-col font-body pb-24">
      {/* Header Skeleton */}
      <div className="bg-white border-b-2 border-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
              <div className="bg-quaternary text-white p-1 rounded-md border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">
                <Briefcase size={16} />
              </div>
              EditConnect
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-24 h-10 bg-slate-200 animate-pulse rounded-md"></div>
              <div className="w-24 h-10 bg-slate-200 animate-pulse rounded-md"></div>
            </div>
          </div>
          <h1 className="text-5xl font-display font-extrabold tracking-tight text-slate-800">Find Editing Work</h1>
          <p className="text-xl text-slate-400 max-w-2xl font-bold">
            Browse high-quality projects posted by top clients and creators.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input className="pl-12 h-14 text-lg bg-slate-100 border-slate-200" placeholder="Loading projects..." disabled />
            </div>
            <Button size="lg" className="h-14 bg-slate-200 text-slate-400 border-slate-300 pointer-events-none shadow-none" disabled>
              <Filter className="mr-2" /> Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-6 pt-12 w-full space-y-8">
        <div className="grid gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse shadow-none border-2 border-slate-200 bg-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 gap-6">
                <div className="flex items-start gap-4 w-full">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 shrink-0"></div>
                  <div className="space-y-3 w-full">
                    <div className="h-6 bg-slate-200 rounded w-3/4 md:w-64"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2 md:w-32"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3 md:w-40 mt-4"></div>
                  </div>
                </div>
                <div className="flex items-center md:flex-col md:items-end gap-4 w-full md:w-auto">
                  <div className="h-8 bg-slate-200 rounded w-24"></div>
                  <div className="h-12 bg-slate-200 rounded-lg w-full md:w-32 mt-2"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
