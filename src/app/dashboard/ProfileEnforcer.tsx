"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProfileEnforcer({ isMissingName, children }: { isMissingName: boolean, children: React.ReactNode }) {
  const pathname = usePathname()
  
  if (isMissingName && pathname !== "/dashboard/settings") {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 bg-white border-4 border-foreground rounded-2xl shadow-[var(--shadow-sticker)] text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-extrabold font-display text-destructive">Profile Incomplete!</h2>
        <p className="text-lg font-bold text-slate-600">You must set your Full Name in your account settings before you can use the platform.</p>
        <Button nativeButton={false} render={<Link href="/dashboard/settings" />} size="lg" className="bg-tertiary text-foreground hover:bg-quaternary shadow-[var(--shadow-pop)] font-bold text-lg h-14 px-8">
          Go to Settings
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
