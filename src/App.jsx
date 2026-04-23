import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronUp } from "lucide-react"

import LoadingScreen from "./components/LoadingScreen"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
const About = lazy(() => import("./components/About"))
const Skills = lazy(() => import("./components/Skills"))
const Journey = lazy(() => import("./components/Journey"))
const Projects = lazy(() => import("./components/Projects"))
const Services = lazy(() => import("./components/Services"))
const Contact = lazy(() => import("./components/Contact"))
const Footer = lazy(() => import("./components/Footer"))
const SmoothCursor = lazy(() =>
  import("./components/magicui/smooth-cursor").then((module) => ({
    default: module.SmoothCursor,
  }))
)
function SectionFallback() {
  return <div className="py-20" aria-hidden="true" />
}

export default function App() {
  const hasLoadedBefore = sessionStorage.getItem("portfolio-loaded") === "true"
  const [isLoading, setIsLoading] = useState(!hasLoadedBefore)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const scrollYRef = useRef(0)

  useEffect(() => {
    if (hasLoadedBefore) return
    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem("portfolio-loaded", "true")
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        scrollYRef.current = window.scrollY
        const shouldShow = window.scrollY > 500
        setShowBackToTop((prev) => (prev !== shouldShow ? shouldShow : prev))
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
      <Suspense fallback={null}>
        <SmoothCursor />
      </Suspense>

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
              <Suspense fallback={<SectionFallback />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Skills />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Journey />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Services />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>

            <motion.button
              onClick={() => {
                if (window.lenis?.scrollTo) {
                  window.lenis.scrollTo(0)
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showBackToTop ? 1 : 0 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              id="back-to-top"
              aria-label="Back to top"
              className={`fixed bottom-8 right-6 w-12 h-12 rounded-full glass-panel text-white flex items-center justify-center z-50 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer ${
                showBackToTop ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <ChevronUp size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
