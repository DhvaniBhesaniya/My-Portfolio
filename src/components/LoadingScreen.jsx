import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect, useRef } from "react"

// Pre-computed floating particles (no Math.random during render)
const PARTICLES = [
  { left: 22, top: 18, dy: -12, dx: 6, dur: 3.5, delay: 0 },
  { left: 75, top: 22, dy: 10, dx: -8, dur: 4, delay: 0.5 },
  { left: 30, top: 72, dy: -8, dx: 10, dur: 3, delay: 1 },
  { left: 68, top: 76, dy: 14, dx: -5, dur: 4.5, delay: 0.3 },
  { left: 48, top: 12, dy: -6, dx: -10, dur: 3.8, delay: 0.8 },
  { left: 52, top: 85, dy: 8, dx: 7, dur: 3.2, delay: 1.2 },
  { left: 15, top: 50, dy: -10, dx: 4, dur: 4.2, delay: 0.6 },
  { left: 82, top: 55, dy: 6, dx: -6, dur: 3.6, delay: 0.9 },
]

const CODE_SNIPPETS = [
  { text: "fn compile() {", left: "5%", top: "14%" },
  { text: "model.predict(x)", left: "72%", top: "11%" },
  { text: "await deploy();", left: "3%", top: "80%" },
  { text: "cargo build --release", left: "68%", top: "82%" },
  { text: "impl Future for App", left: "8%", top: "45%" },
  { text: "git push origin main", left: "70%", top: "46%" },
  { text: "docker compose up", left: "18%", top: "90%" },
  { text: "SELECT * FROM skills", left: "58%", top: "92%" },
]

const BOOT_LINES = [
  "> Initializing neural core...",
  "> Loading modules ━━━━━━━━ ok",
  "> Compiling portfolio assets...",
  "> All systems ready ✓",
]

/** Matrix-style character decode effect */
function DecodeText({ text, startDelay = 0 }) {
  const [output, setOutput] = useState("")
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef0123456789@#$%<>{}[]"
    let iteration = 0

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setOutput(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " "
              if (i < iteration) return char
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        )
        iteration += 0.4
        if (iteration >= text.length) {
          setOutput(text)
          clearInterval(intervalRef.current)
        }
      }, 30)
    }, startDelay)

    return () => {
      clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return <span>{output || "\u00A0".repeat(text.length)}</span>
}

/** Terminal-style boot sequence with line-by-line reveal */
function BootTerminal() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), 500 + i * 280)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="font-mono text-[10px] sm:text-xs space-y-1.5 text-left w-56 sm:w-72">
      {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={
            i === BOOT_LINES.length - 1 && visibleLines === BOOT_LINES.length
              ? "text-emerald-400/70"
              : "text-teal-500/40"
          }
        >
          {line}
          {i === visibleLines - 1 && visibleLines < BOOT_LINES.length && (
            <span className="animate-pulse ml-0.5 text-teal-400/60">▌</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(20,184,166,0.07)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.04)_0%,transparent_50%)]" />

          {/* Horizontal scan line sweeping down */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/25 to-transparent pointer-events-none"
            initial={{ top: "-2%" }}
            animate={{ top: "102%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating code snippets (barely visible, atmospheric) */}
          {CODE_SNIPPETS.map((s, i) => (
            <motion.span
              key={i}
              className="absolute font-mono text-[9px] sm:text-[10px] text-teal-500/[0.07] select-none pointer-events-none whitespace-nowrap"
              style={{ left: s.left, top: s.top }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.2 + i * 0.12, duration: 0.5 },
                y: {
                  delay: 1,
                  duration: 5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              {s.text}
            </motion.span>
          ))}

          {/* ─── Center Composition ─── */}
          <div className="relative flex flex-col items-center gap-5 sm:gap-6">
            {/* Neural Orb Container */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52">
              {/* Floating ambient particles */}
              {PARTICLES.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-teal-400/40"
                  style={{ left: `${p.left}%`, top: `${p.top}%` }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    y: [0, p.dy, 0],
                    x: [0, p.dx, 0],
                  }}
                  transition={{
                    duration: p.dur,
                    delay: p.delay + 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* ── Outer Ring ── slow clockwise, teal */}
              <motion.div
                className="absolute inset-[2%] rounded-full"
                style={{ border: "1px dashed rgba(20, 184, 166, 0.18)" }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                transition={{
                  scale: {
                    delay: 0.55,
                    duration: 0.7,
                    type: "spring",
                    stiffness: 170,
                    damping: 18,
                  },
                  opacity: { delay: 0.55, duration: 0.3 },
                  rotate: { duration: 14, repeat: Infinity, ease: "linear" },
                }}
              >
                {/* Orbiting dot */}
                <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.9)]" />
                {/* Secondary dot */}
                <div className="absolute top-1/2 -right-[2px] -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-teal-400/40" />
                <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-teal-400/30" />
              </motion.div>

              {/* ── Middle Ring ── counter-clockwise, violet */}
              <motion.div
                className="absolute inset-[18%] rounded-full"
                style={{ border: "1px dashed rgba(139, 92, 246, 0.2)" }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: -360 }}
                transition={{
                  scale: {
                    delay: 0.35,
                    duration: 0.7,
                    type: "spring",
                    stiffness: 170,
                    damping: 18,
                  },
                  opacity: { delay: 0.35, duration: 0.3 },
                  rotate: { duration: 9, repeat: Infinity, ease: "linear" },
                }}
              >
                <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.9)]" />
                <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-violet-400/40" />
              </motion.div>

              {/* ── Inner Ring ── clockwise fast, emerald */}
              <motion.div
                className="absolute inset-[33%] rounded-full"
                style={{ border: "1px dashed rgba(16, 185, 129, 0.25)" }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                transition={{
                  scale: {
                    delay: 0.15,
                    duration: 0.7,
                    type: "spring",
                    stiffness: 170,
                    damping: 18,
                  },
                  opacity: { delay: 0.15, duration: 0.3 },
                  rotate: { duration: 5.5, repeat: Infinity, ease: "linear" },
                }}
              >
                <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              </motion.div>

              {/* ── Core ── pulsing AI brain */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.05,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                <div className="relative">
                  {/* Outer glow layer (slow pulse) */}
                  <div className="absolute -inset-7 rounded-full bg-teal-500/[0.04] loading-core-glow-outer" />
                  {/* Inner glow layer (faster pulse) */}
                  <div className="absolute -inset-4 rounded-full bg-teal-500/[0.08] loading-core-glow-inner" />
                  {/* Core orb */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-teal-500/15 via-violet-500/10 to-emerald-500/10 border border-teal-500/25 flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(20,184,166,0.15)]">
                    <motion.span
                      className="text-sm sm:text-base font-bold font-mono tracking-wider"
                      style={{
                        background:
                          "linear-gradient(135deg, #14b8a6 0%, #8b5cf6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                    >
                      DB
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Boot terminal output */}
            <BootTerminal />

            {/* Name with matrix decode effect */}
            <motion.h2
              className="text-lg sm:text-2xl font-bold font-[Montserrat] text-white tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.3 }}
            >
              <DecodeText text="DHVANI BHESANIYA" startDelay={1600} />
            </motion.h2>

            {/* Role subtitle */}
            <motion.p
              className="text-[10px] sm:text-xs text-white/20 tracking-[0.25em] uppercase font-light"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.4 }}
            >
              Developer · Engineer · Creator
            </motion.p>

            {/* Gradient progress bar */}
            <motion.div
              className="w-40 sm:w-48 h-[2px] rounded-full overflow-hidden mt-1"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #14b8a6, #8b5cf6, #10b981)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 0.1,
                  duration: 3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
