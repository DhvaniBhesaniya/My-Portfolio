import { cn } from "@/lib/utils"
import { useId } from "react"

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}) {
  const patternId = useId().replace(/:/g, "")
  const glowId = `${patternId}-glow`
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full text-white/20",
        className
      )}
      {...props}
    >
      <defs>
        {glow && (
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
        )}
        <pattern
          id={patternId}
          x={x}
          y={y}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={cx}
            cy={cy}
            r={cr}
            fill={glow ? `url(#${glowId})` : "currentColor"}
            opacity={glow ? 0.9 : 0.35}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}