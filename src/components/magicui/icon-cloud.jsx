import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"
const FALLBACK_ICON = "https://cdn.simpleicons.org/react/61dafb"

export function IconCloud({
  images = [],
  icons = [],
  className,
  iconSize = 44,
}) {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 45, stiffness: 320, mass: 1.15 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  const [items, setItems] = useState([])

  useEffect(() => {
    const target = images.length > 0 ? images : icons
    if (!target.length) {
      setItems([])
      return
    }
    const generatedItems = target.map((item, i) => {
      const angle = (i / target.length) * Math.PI * 2
      const ringOffset = [0, 16, 32][i % 3]
      const radius = 84 + ringOffset
      const depth = ((i % 5) - 2) * 12
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: depth,
        item,
      }
    })
    setItems(generatedItems)
  }, [images, icons])

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x / 14)
    mouseY.set(y / 14)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      className={cn(
        "relative flex items-center justify-center w-full max-w-[22rem] aspect-square cursor-default",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {items.map(({ x, y, z, item }, i) => (
          <motion.div
            key={`${typeof item === "string" ? item : "icon"}-${i}`}
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
            }}
            whileHover={{ scale: 1.1, z: z + 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          >
            {typeof item === "string" ? (
              <img
                src={item}
                className="w-6 h-6 object-contain"
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
        {icons.length > 0 && images.length === 0 && (
          <div className="sr-only">Icon cloud</div>
        )}
      </motion.div>
    </div>
  )
}
