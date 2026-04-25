import { motion } from "motion/react"
import { cn } from "@/lib/utils"

function BorderBeam({
  className,
  size = 50,
  duration = 6,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 1,
  anchor = 90,
  borderRadius = 28,
  style,
}) {
  const beamStart = Math.max(6, Math.min(size / 8, 22))
  const beamMid = beamStart + 6
  const beamEnd = beamStart + 14

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        className
      )}
      style={{
        ...style,
        borderRadius: borderRadius,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `conic-gradient(from ${anchor - 90}deg at 50% 50%, transparent 0%, ${colorFrom} ${beamStart}%, ${colorTo} ${beamMid}%, transparent ${beamEnd}%)`,
          borderRadius: borderRadius,
          padding: `${borderWidth}px`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          delay: delay,
        }}
      />
    </div>
  )
}

export { BorderBeam }
export default BorderBeam
