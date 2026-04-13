import { motion } from "motion/react"
import { Github, Linkedin, Facebook, Instagram, MapPin, Download, CircleUserRound } from "lucide-react"
import Particles from "@/components/magicui/particles"
import TypingAnimation from "@/components/magicui/typing-animation"
import { Button } from "@/components/ui/button"
import { useScrollTo } from "@/hooks/useLenis"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Particle background */}
      <Particles quantity={80} color="#0ea5e9" className="z-0" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-[#0b1220]/55 to-[#020817]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
        {/* LEFT COLUMN */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          <motion.p
            variants={fadeUp}
            className="text-sky-400 font-semibold text-sm tracking-widest uppercase"
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-[Montserrat] font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight"
          >
            Hi, I'm{" "}
            <span className="text-sky-400">Dhvani Bhesaniya</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="text-xl md:text-2xl font-semibold text-primary/80 h-8"
          >
            <TypingAnimation
              words={[
                "Web & Backend Developer",
                "Node.js Developer",
                "Rust Developer",
                "Full-Stack Developer",
              ]}
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-primary/65 text-base leading-relaxed max-w-lg"
          >
            As a backend developer, I thrive in challenging environments that encourage
            continuous learning and creativity. I am dedicated to utilizing my skills to
            build innovative and secure solutions.
          </motion.p>

          {/* Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-400/20 text-primary/70 text-sm">
              <MapPin size={14} className="text-sky-400" /> Ahmedabad, India
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 available-dot" />
              Available Now
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Button
              id="hire-me-btn"
              size="lg"
              onClick={() => scrollTo("contact")}
              className="bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-700/35"
            >
              Hire Me
            </Button>
            <Button
              id="download-resume-btn"
              size="lg"
              variant="outline"
              asChild
            >
              <a href="/assets/resume/Dhvani_Bhesaniya.pdf" download>
                <Download size={16} />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="text-primary/45 text-sm">Follow me:</span>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-slate-300/20 flex items-center justify-center text-primary/55 hover:text-sky-400 hover:border-sky-400/40 hover:bg-sky-500/10 transition-all duration-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Default animated profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full">
            <motion.div
              className="absolute inset-4 rounded-full bg-linear-to-br from-sky-500/25 via-cyan-500/20 to-teal-500/20 blur-2xl"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-sky-400/35 hero-photo-ring"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-7 rounded-full bg-slate-900/80 border border-slate-300/20 flex items-center justify-center z-10">
              <CircleUserRound className="w-28 h-28 md:w-32 md:h-32 text-sky-300" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-500 shadow-lg shadow-sky-500/60" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-primary/35 text-xs tracking-widest">SCROLL</span>
        <motion.div
          className="w-0.5 h-8 bg-linear-to-b from-sky-500 to-transparent rounded-full"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
