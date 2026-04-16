import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    const node = containerRef.current
    const updateWidth = () => setContainerWidth(node.scrollWidth / repeat)
    updateWidth()
    const ro = new ResizeObserver(updateWidth)
    ro.observe(node)
    return () => ro.disconnect()
  }, [repeat, children])

  return (
    <div
      ref={containerRef}
      className={cn("group relative flex overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      {...props}
    >
      <motion.div
        animate={{
          x: isHovered ? 0 : reverse ? [0, containerWidth] : [0, -containerWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        className="flex shrink-0 gap-4"
      >
        {[...Array(repeat)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}