import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CreditCard, Download, CheckCircle, ArrowRight } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight">Billing & Membership</h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage your subscription plan and view past invoices.</p>
      </div>

      <div className="max-w-4xl space-y-12">
        {/* Current Plan */}
        <div className="space-y-6">
          <Card className="bg-accent text-white shadow-[var(--shadow-sticker)] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 font-bold uppercase tracking-wider text-sm mb-1">Current Plan</p>
                  <h2 className="text-3xl font-display font-bold text-tertiary">Pro Client</h2>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black font-display">₹999</span>
                  <span className="text-white/80 font-bold">/mo</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-3 font-medium">
                <p className="flex items-center gap-2"><CheckCircle size={18} className="text-tertiary" /> Unlimited Projects</p>
                <p className="flex items-center gap-2"><CheckCircle size={18} className="text-tertiary" /> Priority Support</p>
                <p className="flex items-center gap-2"><CheckCircle size={18} className="text-tertiary" /> Featured Listings</p>
              </div>

              <div className="mt-8 flex gap-4">
                <Button className="bg-tertiary text-foreground hover:bg-white border-none shadow-none">Manage Plan</Button>
                <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          <div className="pt-8 space-y-6">
            <h2 className="text-2xl font-display font-bold border-b-4 border-foreground pb-2 inline-block">
              Invoices
            </h2>
            <Card className="shadow-none border-dashed border-border bg-white">
              <CardContent className="p-0">
                <div className="divide-y-2 divide-dashed divide-border">
                  {[
                    { date: "Aug 12, 2026", amount: "₹999", plan: "Pro Client - Monthly" },
                    { date: "Jul 12, 2026", amount: "₹999", plan: "Pro Client - Monthly" },
                    { date: "Jun 12, 2026", amount: "₹299", plan: "Basic Client - Monthly" },
                  ].map((inv, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer">
                      <div>
                        <p className="font-bold">{inv.plan}</p>
                        <p className="text-sm text-muted-foreground">{inv.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold font-display">{inv.amount}</span>
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Download size={16} /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
