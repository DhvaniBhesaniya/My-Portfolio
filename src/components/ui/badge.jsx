import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-sky-500/20 text-sky-200 border border-sky-500/30",
        secondary: "bg-slate-500/12 text-primary/75 border border-slate-300/20 hover:bg-slate-500/18",
        primary: "bg-sky-600 text-white",
        outline: "border border-slate-300/30 text-primary/75",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
