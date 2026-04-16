import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}) {
  return (
    <motion.span
      className={cn(
        "relative inline-block whitespace-nowrap bg-clip-text text-transparent",
        className
      )}
      initial={{ backgroundPosition: "0% 50%" }}
      whileHover={{ backgroundPosition: "100% 50%" }}
      transition={{ 
        backgroundPosition: {
          duration: 1.5,
          ease: "ease-in-out",
          repeat: Infinity,
          repeatType: "mirror"
        }
      }}
      style={{
        backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)`,
        backgroundSize: "200% 100%",
        color: "transparent",
      }}
    >
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
        {children}
      </span>
    </motion.span>
  )
}