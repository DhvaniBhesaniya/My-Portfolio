import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-slate-300/30 bg-slate-500/10 px-4 py-2 text-sm text-primary placeholder:text-primary/45 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
