import { Card, CardContent } from "@/components/ui/card"

export default function ProjectsLoading() {
  return (
    <div className="space-y-8 pb-12 animate-pulse font-body">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="h-10 bg-slate-200 rounded-md w-48 mb-2"></div>
          <div className="h-6 bg-slate-200 rounded-md w-72"></div>
        </div>
        <div className="h-12 bg-slate-200 rounded-lg w-full md:w-48"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-12 bg-slate-200 rounded-md"></div>
        <div className="h-12 bg-slate-200 rounded-md w-24"></div>
      </div>

      <div className="grid gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-none border-2 border-slate-200 bg-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
              <div className="flex items-start gap-4 w-full">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 shrink-0"></div>
                <div className="space-y-2 w-full">
                  <div className="h-6 bg-slate-200 rounded-md w-3/4 md:w-64"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-1/2 md:w-32"></div>
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-1 w-full md:w-auto">
                <div className="h-8 bg-slate-200 rounded-md w-20"></div>
                <div className="h-6 bg-slate-200 rounded-full w-24"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
