"use client"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useTransition, useState, useEffect } from "react"

export function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (query) {
        params.set('q', query)
      } else {
        params.delete('q')
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      })
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query, pathname, router, searchParams])

  return (
    <div className="flex-1 relative">
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isPending ? 'text-accent animate-pulse' : 'text-muted-foreground'}`} size={20} />
      <Input 
        className="pl-12 h-14 text-lg" 
        placeholder={placeholder} 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
