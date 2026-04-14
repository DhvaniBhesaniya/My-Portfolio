import { motion, AnimatePresence } from "motion/react"
import { Code, Globe, Server, Cpu } from "lucide-react"

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-bold tracking-[0.3em] text-sky-400 uppercase"
          >
            MY PROFILE
          </motion.p> */}

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <Icon className="w-5 h-5 text-sky-300" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
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
              transition={{ delay: 0.3, duration: 3.2, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
