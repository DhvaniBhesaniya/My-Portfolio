import { useEffect, useState } from "react"
import { motion } from "motion/react"

export function NumberTicker({
  value = 0,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  startValue = 0,
  className,
}) {
  const [displayValue, setDisplayValue] = useState(startValue)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const increment = (value - startValue) / steps

    let current = startValue
    let intervalId = null

    const timer = setTimeout(() => {
      intervalId = setInterval(() => {
        current += increment
        if (
          (direction === "up" && current >= value) ||
          (direction === "down" && current <= value)
        ) {
          setDisplayValue(value)
          clearInterval(intervalId)
        } else {
          setDisplayValue(current)
        }
      }, stepDuration)
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      if (intervalId) clearInterval(intervalId)
    }
  }, [value, direction, delay, startValue])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={value}
    >
      {typeof displayValue === "number"
        ? displayValue.toFixed(decimalPlaces)
        : displayValue}
    </motion.span>
  )
}