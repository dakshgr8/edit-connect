import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Plus, Video, MessageCircle, CheckCircle, Eye, Briefcase, Star, Clock } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export const revalidate = 0

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role === 'admin') {
    redirect("/admin")
  }

  const isEditor = profile?.role === 'editor'
  
  let recentActivity = []
  let stats = {
    appliedJobs: 0,
    activeProjects: 0,
    portfolioViews: 0,
    totalEarnings: 0,
    totalSpent: 0,
    pendingReview: 0,
    unreadMessages: 0,
  }

  if (isEditor) {
    // Editor Data
    const { data: apps } = await supabase
      .from('applications')
      .select('*, project:projects(*)')
      .eq('editor_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)
      
    recentActivity = apps || []
    
    const { count: appliedCount } = await supabase
      .from('applications')
      .select('id', { count: 'exact', head: true })
      .eq('editor_id', user.id)
      
    stats.appliedJobs = appliedCount || 0
    
    // Active projects are accepted applications
    const { count: activeCount } = await supabase
      .from('applications')
      .select('id', { count: 'exact', head: true })
      .eq('editor_id', user.id)
      .eq('status', 'accepted')
      
    stats.activeProjects = activeCount || 0
  } else {
    // Client Data
    const { data: projects } = await supabase
      .from('projects')
      .select('*, applications(*)')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)
      
    recentActivity = projects || []
    
    const { count: activeCount } = await supabase
      .from('projects')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', user.id)
      .eq('status', 'in_progress')
      
    stats.activeProjects = activeCount || 0
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-extrabold tracking-tight">Welcome Back! 👋</h1>
          <p className="text-muted-foreground mt-1 text-lg">
            {isEditor ? "Here's how your portfolio and applications are performing." : "Here's what's happening with your projects today."}
          </p>
        </div>
        {!isEditor && (
          <Link 
            href="/dashboard/projects/new"
            className={buttonVariants({ size: "lg", className: "bg-quaternary hover:bg-tertiary text-foreground w-full md:w-auto" })}
          >
            <Plus size={20} className="mr-2" />
            Post New Project
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isEditor ? (
          <>
            <StatCard title="Applied Jobs" value={stats.appliedJobs.toString()} icon={<Briefcase size={24} />} color="bg-accent" />
            <StatCard title="Active Projects" value={stats.activeProjects.toString()} icon={<Video size={24} />} color="bg-tertiary" />
            <StatCard title="Portfolio Views" value={stats.portfolioViews.toString()} icon={<Eye size={24} />} color="bg-secondary" />
            <StatCard title="Total Earnings" value="₹0" icon={<span className="text-xl font-black">₹</span>} color="bg-quaternary" />
          </>
        ) : (
          <>
            <StatCard title="Active Projects" value={stats.activeProjects.toString()} icon={<Video size={24} />} color="bg-accent" />
            <StatCard title="Pending Review" value="0" icon={<CheckCircle size={24} />} color="bg-tertiary" />
            <StatCard title="Unread Messages" value="0" icon={<MessageCircle size={24} />} color="bg-secondary" />
            <StatCard title="Total Spent" value="₹0" icon={<span className="text-xl font-black">₹</span>} color="bg-quaternary" />
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-display font-bold border-b-4 border-foreground pb-2 inline-block">
            {isEditor ? "Recent Applications" : "Recent Projects"}
          </h2>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-300 rounded-xl bg-white/50 text-slate-500 font-bold">
                {isEditor ? "You haven't applied to any jobs yet." : "You haven't posted any projects yet."}
              </div>
            ) : (
              recentActivity.map((item: any) => (
                <Link key={item.id} href={isEditor ? `/jobs/${item.project_id}` : `/dashboard/projects/${item.id}`} className="block">
                  <Card className="hover:-translate-y-1 hover:rotate-0 transition-transform cursor-pointer h-full">
                    <CardHeader className="flex flex-row justify-between items-start pb-2">
                      <div>
                        <CardTitle className="text-xl truncate max-w-[250px] md:max-w-md">
                          {isEditor ? item.project?.title || 'Unknown Project' : item.title}
                        </CardTitle>
                        <p className="text-sm font-bold text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock size={14} /> 
                          {new Date(item.created_at).toLocaleDateString()} • ₹{isEditor ? (item.proposed_fee || item.project?.budget || 0) : item.budget}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full border-2 border-foreground font-bold text-xs uppercase ${
                        item.status === 'accepted' || item.status === 'in_progress' ? 'bg-green-300' :
                        item.status === 'rejected' ? 'bg-red-300' :
                        'bg-tertiary'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t-2 border-dashed border-border">
                        <div className="w-8 h-8 rounded-full bg-secondary border-2 border-foreground flex items-center justify-center font-bold text-white text-xs">
                          {isEditor ? "CLI" : "APP"}
                        </div>
                        <span className="text-sm font-bold">
                          {isEditor ? `Applied for Project` : `${item.applications?.length || 0} Applicants`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold border-b-4 border-foreground pb-2 inline-block">
            Quick Actions
          </h2>
          <Card className="bg-tertiary/20 shadow-none border-dashed border-tertiary">
            <CardContent className="pt-6 space-y-4">
              {isEditor ? (
                <>
                  <Link href="/jobs" className={buttonVariants({ variant: "outline", className: "w-full justify-start text-left" })}><Briefcase size={16} className="mr-2"/> Browse Jobs</Link>
                  <Button className="w-full justify-start text-left" variant="outline"><Star size={16} className="mr-2"/> Update Portfolio</Button>
                  <Button className="w-full justify-start text-left" variant="outline">Withdraw Funds</Button>
                </>
              ) : (
                <>
                  <Link href="/editors" className={buttonVariants({ variant: "outline", className: "w-full justify-start text-left" })}>Browse Editors</Link>
                  <Button className="w-full justify-start text-left" variant="outline">Upgrade Membership</Button>
                  <Link href="/dashboard/billing" className={buttonVariants({ variant: "outline", className: "w-full justify-start text-left" })}>View Invoices</Link>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <Card className="hover:scale-[1.02]">
      <CardAction>
        <div className={`${color} text-white p-3 rounded-full border-2 border-foreground shadow-[var(--shadow-pop)] -mr-2 -mt-2 rotate-6`}>
          {icon}
        </div>
      </CardAction>
      <CardContent className="p-6">
        <h3 className="text-muted-foreground font-bold uppercase tracking-wide text-xs mb-2">{title}</h3>
        <p className="text-4xl font-display font-black">{value}</p>
      </CardContent>
    </Card>
  )
}
