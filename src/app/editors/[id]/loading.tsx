import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function EditorDetailLoading() {
  return (
    <div className="min-h-screen bg-muted flex flex-col font-body pb-24 pt-12 px-6">
      <div className="max-w-4xl mx-auto w-full space-y-8 animate-pulse">
        <div className="inline-flex items-center text-sm font-bold text-slate-400">
          <ArrowLeft size={16} className="mr-2" /> Back to Editors
        </div>

        {/* Profile Header Card */}
        <div className="bg-white border-4 border-slate-200 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-200 bg-slate-100 shrink-0"></div>
            
            <div className="flex-1 text-center md:text-left space-y-4 w-full">
              <div className="flex flex-col items-center md:items-start">
                <div className="h-10 md:h-12 bg-slate-200 rounded w-64 mb-2"></div>
                <div className="h-6 bg-slate-200 rounded w-40"></div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <div className="h-10 bg-slate-200 rounded-full w-32"></div>
                <div className="h-10 bg-slate-200 rounded-full w-40"></div>
                <div className="h-10 bg-slate-200 rounded-full w-36"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-6">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
              <div className="h-8 bg-slate-200 rounded w-32 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-11/12"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="h-8 bg-slate-200 rounded w-48"></div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="shadow-none border-2 border-slate-200 bg-white">
                    <CardContent className="p-6">
                      <div className="h-4 bg-slate-200 rounded w-32 mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card className="border-4 border-slate-200 shadow-none bg-white">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="h-8 bg-slate-200 rounded w-40"></div>
                <div className="h-14 bg-slate-200 rounded-md w-full"></div>
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
