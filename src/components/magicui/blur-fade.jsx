import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}) {
  const [isInView, setIsInView] = useState(false)
  const nodeRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    
    const node = nodeRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: inViewMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, inViewMargin])

  const directions = {
    up: { y: -offset, x: 0 },
    down: { y: offset, x: 0 },
    left: { x: -offset, y: 0 },
    right: { x: offset, y: 0 },
  }


  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, filter: `blur(${blur})`, ...directions[direction] }}
      animate={{
        opacity: inView && !isInView ? 0 : 1,
        filter: inView && !isInView ? `blur(${blur})` : "blur(0px)",
        y: inView && !isInView ? directions[direction].y : 0,
        x: inView && !isInView ? directions[direction].x : 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}

export { BlurFade }
export default BlurFade
