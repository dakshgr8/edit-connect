import { Card, CardContent } from "@/components/ui/card"

export default function AdminSupportPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-slate-900">Support Tickets</h1>
        <p className="text-slate-600 mt-2 text-lg">Respond to user inquiries and disputes.</p>
      </div>
      <Card className="shadow-[var(--shadow-sticker)] bg-white border-dashed">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center text-slate-500">
          <p className="font-bold text-xl">Support inbox coming soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
