import { Card, CardContent } from "@/components/ui/card"

export default function AdminOverviewLoading() {
  return (
    <div className="space-y-8 pb-12 animate-pulse font-body">
      <div>
        <div className="h-10 bg-slate-200 rounded-md w-64 mb-2"></div>
        <div className="h-6 bg-slate-200 rounded-md w-72"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="hover:scale-[1.02] bg-white border-2 border-slate-200 shadow-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded-md w-24 mb-2"></div>
              <div className="h-10 bg-slate-200 rounded-md w-16 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded-md w-20 mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Users Table */}
      <div className="space-y-6 pt-8">
        <div className="h-8 bg-slate-200 rounded-md w-48 mb-2"></div>
        <Card className="shadow-none border-2 border-slate-200 bg-white">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50">
                    <th className="p-4"><div className="h-4 bg-slate-200 rounded-md w-16"></div></th>
                    <th className="p-4"><div className="h-4 bg-slate-200 rounded-md w-12"></div></th>
                    <th className="p-4"><div className="h-4 bg-slate-200 rounded-md w-20"></div></th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-dashed divide-slate-100">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td className="p-4"><div className="h-5 bg-slate-200 rounded-md w-32"></div></td>
                      <td className="p-4"><div className="h-6 bg-slate-200 rounded-full w-20"></div></td>
                      <td className="p-4"><div className="h-5 bg-slate-200 rounded-md w-24"></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
