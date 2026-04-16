import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

const defaultSpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
}

export function SmoothCursor({
  cursor,
  springConfig = defaultSpringConfig,
}) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)
  const [isVisible, setIsVisible] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)")
    const update = () => setIsFinePointer(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return
    const moveCursor = (e) => {
      const currentX = e.clientX
      const currentY = e.clientY
      
      const deltaX = currentX - lastPos.current.x
      const deltaY = currentY - lastPos.current.y

      rotateX.set(deltaY * 2)
      rotateY.set(-deltaX * 2)

      lastPos.current = { x: currentX, y: currentY }
      cursorX.set(currentX - 16)
      cursorY.set(currentY - 16)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleTouchStart = () => setIsVisible(false)

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchstart", handleTouchStart)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchstart", handleTouchStart)
    }
  }, [cursorX, cursorY, rotateX, rotateY, isFinePointer])

  if (!isFinePointer || !isVisible) return null

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        rotateX: rotateY,
        rotateY: rotateX,
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      {cursor || (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="drop-shadow-lg"
        >
          <circle cx="16" cy="16" r="8" fill="#14b8a6" opacity="0.8" />
          <circle cx="16" cy="16" r="4" fill="#fff" />
        </svg>
      )}
    </motion.div>
  )
}