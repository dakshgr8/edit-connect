import { Card, CardContent } from "@/components/ui/card"

export default function ProfileLoading() {
  return (
    <div className="max-w-4xl space-y-8 pb-12 animate-pulse font-body">
      <div>
        <div className="h-10 bg-slate-200 rounded-md w-64 mb-2"></div>
        <div className="h-6 bg-slate-200 rounded-md w-96"></div>
      </div>

      <Card className="shadow-none border-2 border-slate-200 bg-white">
        <CardContent className="p-8 space-y-6">
          <div className="h-8 bg-slate-200 rounded w-48 border-b-2 border-slate-100 pb-4 mb-6"></div>
          
          <div className="space-y-6 pt-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                  <div className="h-12 bg-slate-200 rounded-md w-full"></div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <div className="h-4 bg-slate-200 rounded w-32"></div>
              <div className="h-40 bg-slate-200 rounded-lg w-full"></div>
            </div>
            
            <div className="pt-2">
              <div className="h-12 bg-slate-200 rounded-md w-32"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
