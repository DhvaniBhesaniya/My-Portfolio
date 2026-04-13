import { Github, Linkedin, Facebook, Instagram } from "lucide-react"
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

const socialLinks = [
  { icon: Github, href: "https://github.com/DhvaniBhesaniya", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/dhvani-bhesaniya", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100069188478674", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/_d_patel06_?igsh=MWFraGIwcm9xbnJydQ==", label: "Instagram" },
]

export default function Footer() {
  const { scrollTo } = useScrollTo()

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
        </nav>

        {/* Social icons */}
        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-teal-400 hover:border-teal-400/40 hover:bg-white/10 transition-all duration-300"
            >
              <Icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright */}
        <p className="text-white/30 text-xs text-center font-medium tracking-widest uppercase">
          © 2025 Dhvani Bhesaniya. <br className="md:hidden mt-2"/> Crafted with precision.
        </p>
      </div>
    </footer>
  )
}
