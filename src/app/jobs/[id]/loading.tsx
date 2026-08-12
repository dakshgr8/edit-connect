import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function JobDetailLoading() {
  return (
    <div className="min-h-screen bg-muted flex flex-col font-body pb-24 pt-12 px-6">
      <div className="max-w-4xl mx-auto w-full space-y-8 animate-pulse">
        <div className="inline-flex items-center text-sm font-bold text-slate-400">
          <ArrowLeft size={16} className="mr-2" /> Back to Jobs
        </div>

        {/* Job Header Card */}
        <div className="bg-white border-4 border-slate-200 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-slate-200 rounded w-24"></div>
              <div className="h-10 md:h-12 bg-slate-200 rounded w-3/4"></div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="h-10 bg-slate-200 rounded-full w-32"></div>
                <div className="h-10 bg-slate-200 rounded-full w-40"></div>
                <div className="h-10 bg-slate-200 rounded-full w-24"></div>
              </div>
            </div>

            <div className="bg-slate-50 border-4 border-slate-200 rounded-2xl p-6 text-center min-w-[200px] shrink-0">
              <div className="h-4 bg-slate-200 rounded w-16 mx-auto mb-2"></div>
              <div className="h-10 bg-slate-200 rounded w-32 mx-auto mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-24 mx-auto"></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-6">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
              <div className="h-8 bg-slate-200 rounded w-48 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card className="border-4 border-slate-200 shadow-none bg-white">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="h-8 bg-slate-200 rounded w-32"></div>
                <div className="h-20 bg-slate-200 rounded-md w-full"></div>
                <div className="h-14 bg-slate-200 rounded-md w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-48 mx-auto"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
