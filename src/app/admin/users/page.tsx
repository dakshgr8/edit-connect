import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"

export const revalidate = 0

export default async function AdminUsersPage() {
  const supabase = await createClient()

  // Fetch all users
  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-slate-900">Manage Users</h1>
        <p className="text-slate-600 mt-2 text-lg">View all registered editors, clients, and admins.</p>
      </div>

      <Card className="shadow-[var(--shadow-sticker)] bg-white border-dashed">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-slate-50">
                  <th className="p-4 font-bold text-sm uppercase">User</th>
                  <th className="p-4 font-bold text-sm uppercase">Role</th>
                  <th className="p-4 font-bold text-sm uppercase">Joined</th>
                  <th className="p-4 font-bold text-sm uppercase">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-dashed divide-slate-200">
                {users?.map((user) => {
                  const name = user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown'
                  
                  return (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold">
                        {name}
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
                      <td className="p-4 text-sm">
                        {user.role === 'editor' ? (
                          <span className="text-slate-500 italic text-xs">
                            {user.category || 'No category'} • ₹{user.min_project_rate || 0}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {(!users || users.length === 0) && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">No users found on the platform.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
