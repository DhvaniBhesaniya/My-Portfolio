import { motion } from "motion/react"
import { cn } from "@/lib/utils"

function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  borderRadius = "100px",
  shimmerDuration = "3s",
  background = "rgba(0, 0, 0, 1)",
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden whitespace-pre-wrap rounded-[var(--border-radius)] bg-[var(--background)] px-8 py-3 text-sm font-medium leading-none tracking-tight text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
      disabled={disabled}
      style={{
        "--border-radius": borderRadius,
        "--background": background,
        "--shimmer-color": shimmerColor,
        "--shimmer-size": shimmerSize,
        "--shimmer-duration": shimmerDuration,
      }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute inset-0 -translate-x-full"
          style={{
            background: `linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)`,
            transform: "skewX(-20deg)",
          }}
          animate={{
            x: disabled ? "0%" : ["200%", "-200%"],
          }}
          transition={{
            duration: disabled ? 0 : 2,
            repeat: disabled ? 0 : Infinity,
            repeatDelay: disabled ? 0 : 1,
            ease: "easeInOut",
          }}
        />
      </div>
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export { ShimmerButton }
export default ShimmerButton
