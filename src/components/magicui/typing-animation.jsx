import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

export default function TypingAnimation({
  words = [],
  className,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1800,
}) {
  const [displayText, setDisplayText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!words.length) return
    const currentWord = words[wordIndex % words.length]

    const tick = () => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
          timeoutRef.current = setTimeout(tick, typingSpeed)
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          timeoutRef.current = setTimeout(tick, deletingSpeed)
        } else {
          setIsDeleting(false)
          setWordIndex((i) => (i + 1) % words.length)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timeoutRef.current)
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <span className="animate-pulse text-sky-400">|</span>
    </span>
  )
}
