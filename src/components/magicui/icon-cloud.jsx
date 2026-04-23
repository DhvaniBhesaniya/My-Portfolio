import { useRef, useEffect, useState, useMemo, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"
const FALLBACK_ICON = "https://cdn.simpleicons.org/react/61dafb"

function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "dark"
  )
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => obs.disconnect()
  }, [])
  return theme
}

export function IconCloud({
  images = [],
  icons = [],
  className,
  iconSize = 48,
}) {
  const theme = useTheme()
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 45, stiffness: 320, mass: 1.15 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Stabilize the array references — only recompute when the actual content changes
  const stableImages = useMemo(() => images, [JSON.stringify(images)])
  const stableIcons = useMemo(() => icons, [JSON.stringify(icons)])

  const items = useMemo(() => {
    const target = stableImages.length > 0 ? stableImages : stableIcons
    if (!target.length) return []
    return target.map((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / target.length)
      const theta = Math.sqrt(target.length * Math.PI) * phi
      const radius = 110
      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        item,
      }
    })
  }, [stableImages, stableIcons])

  const autoRotateX = useRef(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let animationFrameId
    const animate = () => {
      autoRotateX.current -= 0.5 // Base rotation speed
      if (!isHovering) {
        mouseX.set(autoRotateX.current)
        mouseY.set(0)
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovering, mouseX, mouseY])

  const handleMouseMove = useCallback((e) => {
    setIsHovering(true)
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(autoRotateX.current + x / 4)
    mouseY.set(-y / 4)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative flex items-center justify-center w-full max-w-[22rem] aspect-square cursor-default",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateY: springX, rotateX: springY }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {items.map(({ x, y, z, item }, i) => (
          <motion.div
            key={`${typeof item === "string" ? item : "icon"}-${i}`}
            whileHover={{ scale: 1.15, z: z + 15 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center justify-center rounded-full backdrop-blur-md ${
              theme === "light"
                ? "border border-slate-200/60 shadow-sm"
                : "border border-white/15"
            }`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              x,
              y,
              z: z,
              marginLeft: -(iconSize / 2),
              marginTop: -(iconSize / 2),
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              background: theme === "light"
                ? "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9), rgba(255,255,255,0.6) 50%, rgba(200,210,220,0.4) 100%)"
                : "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12), rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.15) 100%)",
              boxShadow: theme === "light"
                ? "0 4px 12px rgba(15,23,42,0.08), inset 0 1px 2px rgba(255,255,255,0.6), 0 1px 4px rgba(20,184,166,0.06)"
                : "0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(20,184,166,0.08)",
            }}
          >
            {typeof item === "string" ? (
              <img
                src={item}
                className={`w-7 h-7 object-contain ${
                  theme === "light" ? "drop-shadow-[0_1px_2px_rgba(15,23,42,0.1)]" : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                }`}
                alt="Technology icon"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  if (event.currentTarget.dataset.fallbackApplied === "true") return
                  event.currentTarget.dataset.fallbackApplied = "true"
                  event.currentTarget.src = FALLBACK_ICON
                }}
              />
            ) : (
              item
            )}
          </motion.div>
        ))}
        {stableIcons.length > 0 && stableImages.length === 0 && (
          <div className="sr-only">Icon cloud</div>
        )}
      </motion.div>
    </div>
  )
}
