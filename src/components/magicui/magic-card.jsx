import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function MagicCard({ children, className, gradientColor = "#6366f1", gradientOpacity = 0.15 }) {
  const cardRef = useRef(null)
  const [gradientStyle, setGradientStyle] = useState({})
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setGradientStyle({
      background: `radial-gradient(400px circle at ${x}px ${y}px, ${gradientColor}26, transparent 70%)`,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
        style={{
          ...gradientStyle,
          opacity: isHovered ? 1 : 0,
        }}
      />
      {children}
    </div>
  )
}
