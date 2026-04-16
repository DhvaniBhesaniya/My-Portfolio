import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function Particles({
  className,
  quantity = 150,
  color = "#14b8a6",
  refresh = false,
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 20, g: 184, b: 166 }
    }
    const rgb = hexToRgb(color)

    const initParticles = () => {
      particlesRef.current = Array.from({ length: quantity }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        size: Math.random() * 2.8 + 1.2,
        opacity: Math.random() * 0.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.012,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = "lighter"
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed
        
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const glowSize = p.size * 3 + Math.sin(p.pulse) * 0.8
        const currentOpacity = Math.min(1, p.opacity * (0.9 + Math.sin(p.pulse) * 0.25))

        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize)
        gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(1, currentOpacity + 0.12)})`)
        gradient.addColorStop(0.35, `rgba(${rgb.r},${rgb.g},${rgb.b},${currentOpacity * 0.65})`)
        gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`)
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${currentOpacity})`
        ctx.fill()
      })
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [quantity, color, refresh])

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 w-full h-full", className)}
    />
  )
}
