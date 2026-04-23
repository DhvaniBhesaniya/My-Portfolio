import { useRef, useCallback } from "react"
import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"

const CLIP_PATHS = {
  circle: (r) => `circle(${r}px at var(--x) var(--y))`,
}

export function AnimatedThemeToggler({
  theme,
  onToggle,
  variant = "circle",
  duration = 500,
  fromCenter = false,
  className = "",
}) {
  const btnRef = useRef(null)
  const isLight = theme === "light"

  const handleToggle = useCallback(
    async (e) => {
      // If View Transitions API is not supported, fallback to instant toggle
      if (!document.startViewTransition) {
        onToggle()
        return
      }

      // Calculate origin for the clip-path
      let x, y
      if (fromCenter) {
        x = window.innerWidth / 2
        y = window.innerHeight / 2
      } else {
        const rect = btnRef.current.getBoundingClientRect()
        x = rect.left + rect.width / 2
        y = rect.top + rect.height / 2
      }

      // Calculate the maximum radius needed to cover the entire viewport
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      // Set CSS custom properties for the clip-path origin
      document.documentElement.style.setProperty("--x", `${x}px`)
      document.documentElement.style.setProperty("--y", `${y}px`)

      const transition = document.startViewTransition(() => {
        onToggle()
      })

      try {
        await transition.ready

        const clipFn = CLIP_PATHS[variant] || CLIP_PATHS.circle

        // Determine animation direction: dark->light expands new, light->dark contracts new
        const startClip = clipFn(0)
        const endClip = clipFn(maxRadius)

        document.documentElement.animate(
          {
            clipPath: isLight
              ? [endClip, startClip]  // light to dark: contract
              : [startClip, endClip], // dark to light: expand
          },
          {
            duration,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            pseudoElement: isLight
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          }
        )
      } catch {
        // View transition was skipped — toggle already applied
      }
    },
    [onToggle, variant, duration, fromCenter, isLight]
  )

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      className={`group relative h-10 w-10 rounded-full border border-white/10 bg-white/5 p-0 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 ${className}`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isLight ? 180 : 0,
          scale: isLight ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute inset-0 rounded-full bg-linear-to-br from-teal-400/20 via-emerald-500/10 to-violet-500/20 opacity-80 transition-opacity group-hover:opacity-100"
      />

      <motion.span
        initial={false}
        animate={{
          rotate: isLight ? 35 : 0,
          scale: isLight ? 0.92 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="absolute inset-1 z-10 flex items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-emerald-500 text-white shadow-lg shadow-teal-500/30"
      >
        {isLight ? <Moon size={15} strokeWidth={1.8} /> : <Sun size={15} strokeWidth={1.8} />}
      </motion.span>

      <motion.span
        initial={false}
        animate={{ opacity: isLight ? 0.18 : 0.26, scale: isLight ? 1.08 : 1 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute -inset-1 rounded-full bg-teal-400/40 blur-md"
      />
    </button>
  )
}
