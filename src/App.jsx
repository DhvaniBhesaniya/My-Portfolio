import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronUp } from "lucide-react"

import LoadingScreen from "./components/LoadingScreen"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Journey from "./components/Journey"
import Projects from "./components/Projects"
import Services from "./components/Services"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white min-h-screen relative selection:bg-teal-500/30"
          >
            {/* Global Aurora Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-teal-500/10 blur-[100px] mix-blend-screen aurora-orb-1" />
              <div className="absolute top-[40%] right-[-10%] w-[52vw] h-[52vw] rounded-full bg-violet-500/10 blur-[105px] mix-blend-screen aurora-orb-2" />
              <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/10 blur-[100px] mix-blend-screen aurora-orb-3" />
            </div>

            <Navbar />
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Journey />
              <Projects />
              <Services />
              <Contact />
            </main>
            <Footer />

            <motion.button
              onClick={() => window.lenis?.scrollTo(0)}
              initial={{ opacity: 0 }}
              animate={{ opacity: scrollY > 500 ? 1 : 0 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              id="back-to-top"
              aria-label="Back to top"
              className="fixed bottom-8 right-6 w-12 h-12 rounded-full glass-panel text-white flex items-center justify-center z-50 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              style={{ pointerEvents: scrollY > 500 ? "auto" : "none" }}
            >
              <ChevronUp size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
