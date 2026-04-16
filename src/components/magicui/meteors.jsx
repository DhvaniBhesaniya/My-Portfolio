import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

function Meteor({ delay = 0, duration = 3, angle = 215, className }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timeout)
  }, [delay])

  if (!isVisible) return null

  const radian = (angle * Math.PI) / 180
  const length = 200 + Math.random() * 300
  const velocity = 500 + Math.random() * 500

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        x: [0, Math.cos(radian) * length],
        y: [0, Math.sin(radian) * length],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className={cn("absolute w-1 h-[50px] rounded-full", className)}
      style={{
        background: "linear-gradient(to right, transparent, #14b8a6, transparent)",
        boxShadow: "0 0 20px 2px rgba(20, 184, 166, 0.6)",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  )
}

export function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}) {
  const [meteors, setMeteors] = useState([])

  useEffect(() => {
    const newMeteors = [...Array(number)].map((_, i) => ({
      id: i,
      delay: minDelay + Math.random() * (maxDelay - minDelay),
      duration: minDuration + Math.random() * (maxDuration - minDuration),
    }))
    setMeteors(newMeteors)
  }, [number, minDelay, maxDelay, minDuration, maxDuration])

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <AnimatePresence>
        {meteors.map((meteor) => (
          <Meteor
            key={meteor.id}
            delay={meteor.delay}
            duration={meteor.duration}
            angle={angle}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}