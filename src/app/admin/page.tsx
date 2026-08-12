import { Card, CardContent } from "@/components/ui/card"
import { Users, FileVideo, IndianRupee, TrendingUp } from "lucide-react"
import { createClient } from "@/utils/supabase/server"

export const revalidate = 0

export default async function AdminOverviewPage() {
  const supabase = await createClient()

  // Fetch Total Users
  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })

  // Fetch Active Projects
  const { count: activeProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_progress")

  // Fetch Recent Registrations
  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-slate-900">Platform Overview</h1>
        <p className="text-slate-600 mt-2 text-lg">High-level metrics for EditConnect.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={totalUsers?.toString() || "0"} icon={<Users size={24} />} trend="Live Data" />
        <StatCard title="Active Projects" value={activeProjects?.toString() || "0"} icon={<FileVideo size={24} />} trend="Live Data" />
        <StatCard title="Platform Revenue" value="₹0" icon={<IndianRupee size={24} />} trend="Not calculated yet" />
        <StatCard title="Conversion Rate" value="0%" icon={<TrendingUp size={24} />} trend="Not calculated yet" />
      </div>

      {/* Recent Users Table */}
      <div className="space-y-6 pt-8">
        <h2 className="text-2xl font-display font-bold border-b-4 border-slate-900 pb-2 inline-block">
          Recent Registrations
        </h2>
        <Card className="shadow-[var(--shadow-sticker)] bg-white">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-900 bg-slate-50">
                    <th className="p-4 font-bold text-sm uppercase">User</th>
                    <th className="p-4 font-bold text-sm uppercase">Role</th>
                    <th className="p-4 font-bold text-sm uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-dashed divide-slate-200">
                  {recentUsers?.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold">
                        {user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border-2 uppercase ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800 border-red-200' :
                          user.role === 'editor' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {(!recentUsers || recentUsers.length === 0) && (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-500 font-medium">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <Card className="hover:scale-[1.02] bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-slate-900 text-white rounded-lg shadow-[var(--shadow-pop)]">
            {icon}
          </div>
        </div>
        <h3 className="text-slate-500 font-bold uppercase tracking-wide text-xs mb-1">{title}</h3>
        <p className="text-4xl font-display font-black text-slate-900">{value}</p>
        <p className="text-xs font-bold text-green-600 mt-2">{trend}</p>
      </CardContent>
    </Card>
  )
}
