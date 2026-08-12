import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="space-y-8 pb-12 animate-pulse font-body">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="h-10 bg-slate-200 rounded-md w-64 mb-2"></div>
          <div className="h-6 bg-slate-200 rounded-md w-72 md:w-96"></div>
        </div>
        <div className="h-12 bg-slate-200 rounded-lg w-full md:w-48"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-none border-2 border-slate-200 bg-white">
            <CardContent className="p-6 space-y-4 relative">
              <div className="absolute top-4 right-4 w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="h-4 bg-slate-200 rounded-md w-24"></div>
              <div className="h-10 bg-slate-200 rounded-md w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-8 bg-slate-200 rounded-md w-48 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-none border-2 border-slate-200 bg-white">
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div className="space-y-2 w-full">
                    <div className="h-6 bg-slate-200 rounded-md w-3/4 md:w-64"></div>
                    <div className="h-4 bg-slate-200 rounded-md w-1/2 md:w-32"></div>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full w-20 shrink-0 ml-4"></div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t-2 border-dashed border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div className="h-4 bg-slate-200 rounded-md w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-8 bg-slate-200 rounded-md w-32 mb-4"></div>
          <Card className="shadow-none border-dashed border-2 border-slate-200 bg-white/50">
            <CardContent className="pt-6 space-y-4">
              <div className="h-10 bg-slate-200 rounded-md w-full"></div>
              <div className="h-10 bg-slate-200 rounded-md w-full"></div>
              <div className="h-10 bg-slate-200 rounded-md w-full"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
