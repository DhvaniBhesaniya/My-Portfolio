import { motion } from "motion/react"
import { Github, Linkedin, Facebook, Instagram, MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollTo } from "@/hooks/useLenis"

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
  },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const socialLinks = [
  { icon: Github, href: "https://github.com/DhvaniBhesaniya", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/dhvani-bhesaniya", label: "LinkedIn" },
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=100069188478674",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/_d_patel06_?igsh=MWFraGIwcm9xbnJydQ==",
    label: "Instagram",
  },
]

export default function Hero() {
  const { scrollTo } = useScrollTo()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3">
             <span className="w-10 h-[1px] bg-teal-500/50" />
             <p className="text-teal-400 font-medium text-xs tracking-[0.3em] uppercase">
               Welcome to my portfolio
             </p>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-[Montserrat] font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
          >
            Hi, I'm <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">
              Dhvani Bhesaniya
            </span>
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="text-xl md:text-2xl font-medium text-white/70"
          >
            Crafting elegant backend systems and <br className="hidden md:block"/>
            scalable full-stack experiences.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/50 text-base leading-relaxed max-w-lg font-light"
          >
            I thrive in challenging environments that encourage continuous learning.
            Dedicated to building innovative, secure, and highly performant solutions.
          </motion.p>

          {/* Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
            <span className="glass-panel inline-flex items-center gap-2 px-4 py-2 rounded-full text-white/70 text-sm font-medium">
              <MapPin size={14} className="text-teal-400" /> Ahmedabad, India
            </span>
            <span className="glass-panel inline-flex items-center gap-2 px-4 py-2 rounded-full text-emerald-400 text-sm font-medium border-emerald-500/20 bg-emerald-500/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 available-dot shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              Available Now
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-4">
            <Button
              id="hire-me-btn"
              size="lg"
              onClick={() => scrollTo("contact")}
              className="bg-white text-[#09090b] light:text-[#ffffff] rounded-full px-8 shadow-xl shadow-white/10"
              style={{ color: "var(--color-inverse, #09090b)" }}
            >
              Hire Me
            </Button>
            <Button
              id="download-resume-btn"
              size="lg"
              variant="outline"
              asChild
              className="rounded-full glass-panel hover:bg-white/10"
            >
              <a href="/assets/resume/Dhvani_Bhesaniya.pdf" download>
                <Download size={16} />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mt-6">
            <span className="text-white/40 text-sm uppercase tracking-widest font-semibold text-xs">Connect</span>
            <div className="w-8 h-[1px] bg-white/10" />
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-teal-400 hover:border-teal-400/40 hover:bg-teal-500/10 transition-all duration-300"
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center relative"
        >
          {/* Subtle slow floating motion applied to the entire photo container */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }} 
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            className="relative w-80 h-80 md:w-96 md:h-96"
          >
            {/* Soft inner aura, completely replacing the hard glowing ring */}
            <div className="absolute inset-4 rounded-full hero-photo-ring mix-blend-screen" />
            
            {/* The photo itself */}
            <img
              src="/images/img.jpg"
              alt="Dhvani Bhesaniya"
              className="w-full h-full rounded-full object-cover border border-white/20 shadow-2xl glass-panel relative z-10 p-1"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
