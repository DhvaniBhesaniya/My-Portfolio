import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"

export function WordRotate({
  className,
  duration = 2500,
  words = [],
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length === 0) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [duration, words.length])

  if (words.length === 0) return null

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}