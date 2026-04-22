import { useEffect, useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

export default function TypingAnimation({
  words = [],
  className,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1800,
}) {
  const [displayText, setDisplayText] = useState("")
  const stateRef = useRef({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
  })
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!words.length) return

    const tick = () => {
      const { wordIndex, charIndex, isDeleting } = stateRef.current
      const currentWord = words[wordIndex % words.length]

      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          const nextIndex = charIndex + 1
          stateRef.current.charIndex = nextIndex
          setDisplayText(currentWord.slice(0, nextIndex))
          timeoutRef.current = setTimeout(tick, typingSpeed)
        } else {
          // Pause at end of word, then start deleting
          timeoutRef.current = setTimeout(() => {
            stateRef.current.isDeleting = true
            tick()
          }, pauseDuration)
        }
      } else {
        if (charIndex > 0) {
          const nextIndex = charIndex - 1
          stateRef.current.charIndex = nextIndex
          setDisplayText(currentWord.slice(0, nextIndex))
          timeoutRef.current = setTimeout(tick, deletingSpeed)
        } else {
          // Move to next word
          stateRef.current.isDeleting = false
          stateRef.current.wordIndex = (wordIndex + 1) % words.length
          timeoutRef.current = setTimeout(tick, typingSpeed)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timeoutRef.current)
  }, [words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <span className="animate-pulse text-sky-400">|</span>
    </span>
  )
}
