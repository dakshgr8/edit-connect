import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-base font-medium text-foreground transition-all duration-300 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground",
        "shadow-[4px_4px_0px_transparent]",
        "focus-visible:border-accent focus-visible:shadow-[4px_4px_0px_var(--color-accent)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:shadow-[4px_4px_0px_var(--color-destructive)]",
        "md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
