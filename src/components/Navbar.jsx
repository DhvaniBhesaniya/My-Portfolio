import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useScrollTo } from "@/hooks/useLenis"

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Journey", id: "journey" },
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark")
  const { scrollTo } = useScrollTo()
  const isLight = theme === "light"

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // IntersectionObserver for active section
  useEffect(() => {
    const observers = []
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (id) => {
    scrollTo(id)
    setMobileOpen(false)
  }

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? (isLight ? "rgba(255,255,255,0.82)" : "rgba(2,6,23,0.72)") : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        borderBottomColor: scrolled ? (isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.08)") : "transparent",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      }}
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className={`font-[Montserrat] font-bold text-lg cursor-pointer ${isLight ? "text-slate-900" : "text-white"}`}
        >
          Dhvani <span className="text-sky-500">Bhesaniya</span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => handleNavClick(id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer relative
                  ${activeSection === id
                    ? "text-sky-500"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-white/60 hover:text-white"
                  }`}
              >
                {label}
                {activeSection === id && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: Theme toggle + hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            id="theme-toggle"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              isLight
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-900/10"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            id="mobile-menu-toggle"
            className={`md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              isLight
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-900/10"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden backdrop-blur-xl px-6 py-4 flex flex-col gap-1 ${
              isLight ? "bg-white/95 border-b border-slate-900/10" : "bg-black/90 border-b border-white/10"
            }`}
          >
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${activeSection === id
                    ? "text-sky-500 bg-sky-500/10"
                    : isLight
                    ? "text-slate-700 hover:text-slate-900 hover:bg-slate-900/5"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
