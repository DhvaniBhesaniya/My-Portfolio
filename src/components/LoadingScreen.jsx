import { motion, AnimatePresence } from "motion/react"
import { Code, Globe, Server, Cpu } from "lucide-react"

export default function LoadingScreen({ isLoading }) {
  const bubbles = [
    { size: "w-20 h-20", pos: "top-[12%] left-[16%]", delay: 0.08 },
    { size: "w-16 h-16", pos: "top-[22%] right-[14%]", delay: 0.2 },
    { size: "w-12 h-12", pos: "bottom-[18%] left-[24%]", delay: 0.3 },
    { size: "w-14 h-14", pos: "bottom-[16%] right-[22%]", delay: 0.4 },
  ]

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {bubbles.map((bubble, index) => (
            <motion.span
              key={index}
              className={`loading-bubble ${bubble.size} ${bubble.pos}`}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: bubble.delay,
                duration: 0.7,
                type: "spring",
                stiffness: 180,
                damping: 16,
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.7, type: "spring" }}
            className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-sky-500/20 border border-sky-500/30"
          >
            <Code className="w-10 h-10 text-sky-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex gap-5"
          >
            {[Globe, Server, Cpu].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1 + i * 0.12,
                  duration: 0.55,
                  type: "spring",
                  stiffness: 190,
                  damping: 14,
                }}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <Icon className="w-5 h-5 text-sky-300" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.65, type: "spring", stiffness: 170, damping: 16 }}
            className="text-2xl font-bold font-[Montserrat] text-white"
          >
            Dhvani <span className="text-sky-400">Bhesaniya</span>
          </motion.h2>

          {/* Loading bar */}
          <motion.div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sky-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 3.1, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
