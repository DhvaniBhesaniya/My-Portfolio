import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaMedium } from "react-icons/fa6"
import { motion } from "motion/react"
import { useScrollTo } from "@/hooks/useLenis"
import { useNavigate } from "react-router-dom"

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Journey", id: "journey" },
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
]

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/DhvaniBhesaniya", label: "GitHub", hoverColor: "hover:text-white hover:border-white/40" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/dhvani-bhesaniya", label: "LinkedIn", hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
  { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=100069188478674", label: "Facebook", hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/40" },
  { icon: FaInstagram, href: "https://www.instagram.com/_d_patel06_?igsh=MWFraGIwcm9xbnJydQ==", label: "Instagram", hoverColor: "hover:text-[#E4405F] hover:border-[#E4405F]/40" },
  { icon: FaMedium, href: "https://medium.com/@dhvani612", label: "Medium", hoverColor: "hover:text-black hover:bg-white hover:border-white/40 shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" }
]

export default function Footer() {
  const { scrollTo } = useScrollTo()
  const navigate = useNavigate()

  return (
    <footer className="relative z-10 border-t border-white/5 py-16 px-6 mt-12 overflow-hidden backdrop-blur-2xl bg-white/5">
      {/* Subtle top glare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">

        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-[Montserrat] font-bold text-2xl text-white cursor-pointer tracking-tight"
        >
          Dhvani<span className="text-teal-400">.</span>
        </button>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-white/60 text-sm font-medium hover:text-teal-400 transition-colors cursor-pointer tracking-wide"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => navigate("/blog")}
            className="text-white/60 text-sm font-medium hover:text-teal-400 transition-colors cursor-pointer tracking-wide"
          >
            Blog
          </button>
        </nav>

        {/* Social icons */}
        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/50 hover:bg-white/10 transition-colors duration-300 ${hoverColor}`}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright */}
        <p className="text-white/30 text-xs text-center font-medium tracking-widest uppercase">
          © {new Date().getFullYear()} Dhvani Bhesaniya. <br className="md:hidden mt-2" /> Crafted with precision.
        </p>
      </div>
    </footer>
  )
}
