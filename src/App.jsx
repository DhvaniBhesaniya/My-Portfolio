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

  // Loading screen: hide after 4s
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  // Track scroll for back-to-top button
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
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
            transition={{ duration: 0.5 }}
            className="app-shell min-h-screen"
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Journey />
              <Projects />
              <Services />
              <Contact />
            </main>
            <Footer />

            {/* Back to top */}
            <motion.button
              onClick={() => window.lenis?.scrollTo(0)}
              initial={{ opacity: 0 }}
              animate={{ opacity: scrollY > 500 ? 1 : 0 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              id="back-to-top"
              aria-label="Back to top"
              className="fixed bottom-8 right-6 w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center z-50 shadow-lg shadow-sky-700/35 cursor-pointer"
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
