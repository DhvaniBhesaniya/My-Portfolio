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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 50
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled))
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 ${
        scrolled ? "top-4" : "top-6"
      }`}
    >
      <nav 
        className={`flex items-center justify-between transition-all duration-500 w-full max-w-5xl ${
          scrolled 
            ? "glass-panel rounded-full px-6 py-2" 
            : "bg-transparent px-2 py-2"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="font-[Montserrat] font-bold text-lg text-white cursor-pointer tracking-tight"
        >
          Dhvani<span className="text-teal-400">.</span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => handleNavClick(id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer relative
                  ${activeSection === id
                    ? "text-teal-400"
                    : "text-white/60 hover:text-white"
                  }`}
              >
                {label}
                {activeSection === id && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/5 rounded-full border border-white/10 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            id="mobile-menu-toggle"
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-4 right-4 mt-2 md:hidden glass-panel rounded-3xl p-3 flex flex-col gap-1 shadow-2xl"
          >
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`text-left px-5 py-3.5 rounded-2xl text-sm font-medium transition-all cursor-pointer
                  ${activeSection === id
                    ? "text-teal-400 bg-white/10 border border-white/5"
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
