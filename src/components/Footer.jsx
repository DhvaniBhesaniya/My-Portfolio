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
    <footer className="border-t border-white/10 bg-black/30 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-[Montserrat] font-bold text-xl text-white cursor-pointer"
        >
          Dhvani <span className="text-sky-500">Bhesaniya</span>
        </button>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-4">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-white/50 text-sm hover:text-sky-500 transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-sky-500 hover:border-sky-400/40 hover:bg-sky-500/10 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright */}
        <p className="text-white/30 text-xs text-center">
          © 2025 Dhvani Bhesaniya. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
