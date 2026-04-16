import { motion } from "motion/react"
import { MapPin, Download } from "lucide-react"
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { useScrollTo } from "@/hooks/useLenis"
import { BlurFade } from "@/components/magicui/blur-fade"
import Particles from "@/components/magicui/particles"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { WordRotate } from "@/components/magicui/word-rotate"
import { Meteors } from "@/components/magicui/meteors"

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/DhvaniBhesaniya", label: "GitHub", hoverColor: "hover:text-white" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/dhvani-bhesaniya", label: "LinkedIn", hoverColor: "hover:text-[#0A66C2]" },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/profile.php?id=100069188478674",
    label: "Facebook",
    hoverColor: "hover:text-[#1877F2]"
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/_d_patel06_?igsh=MWFraGIwcm9xbnJydQ==",
    label: "Instagram",
    hoverColor: "hover:text-[#E4405F]"
  },
]


export default function Hero() {
  const { scrollTo } = useScrollTo()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-12 md:pt-24"
    >
      <Meteors number={24} className="opacity-45" />
      <Particles 
        quantity={140}
        color="#14b8a6" 
        className="absolute inset-0 z-0 opacity-70"
        refresh={false}
      />
      <DotPattern 
        className="absolute inset-0 z-0 opacity-50"
        glow={true}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090B] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="flex flex-col gap-8">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-3">
              <span className="w-12 h-[1px] bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0" />
              <span className="text-teal-400 font-medium text-xs tracking-[0.35em] uppercase">
                Available for Work
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="font-[Montserrat] font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight">
              <span className="block text-white/60 text-2xl md:text-3xl font-light tracking-wide">
                Hello, I'm
              </span>
              <span className="block mt-2">
                Dhvani<span className="text-teal-400">.</span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 text-4xl md:text-5xl mt-2">
                Building the future with
              </span>
              <span className="block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">
                  <WordRotate 
                    words={["Rust & Elégance", "Backend Systems", "Full-Stack Apps"]} 
                    duration={3000}
                    className="inline"
                  />
                </span>
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl font-light">
              Senior backend engineer specializing in high-performance systems. 
              I craft elegant solutions with Rust, Node.js, and modern architecture 
              that scale to millions of users.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="flex flex-wrap gap-4">
              <Button
                id="hire-me-btn"
                size="lg"
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full px-8 shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-105 transition-all duration-300"
              >
                Let's Build Together
              </Button>
              <Button
                id="download-resume-btn"
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto rounded-full glass-panel hover:bg-white/10 border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <a href={`${import.meta.env.BASE_URL}assets/resume/Dhvani_Bhesaniya.pdf`} download>
                  <Download size={16} />
                  Download Resume
                </a>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="text-white/40 text-sm uppercase tracking-widest font-semibold text-xs">Connect</span>
              <div className="w-12 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/50 hover:bg-teal-500/10 transition-colors duration-300 ${hoverColor}`}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="glass-panel inline-flex items-center gap-2 px-4 py-2 rounded-full text-white/70 text-sm font-medium">
                <MapPin size={14} className="text-teal-400" /> Ahmedabad, India
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full text-emerald-400 text-sm font-medium bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                Open to opportunities
              </span>
            </div>
          </BlurFade>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center relative hidden md:flex"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/20 via-transparent to-violet-500/20 blur-3xl" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-white/5 to-white/0 border border-white/10" />
            <motion.div 
              animate={{ y: [-8, 8, -8] }} 
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="relative z-10"
            >
              <div className="absolute inset-0 rounded-full hero-glow opacity-60" />
              <img
                src={`${import.meta.env.BASE_URL}images/img.jpg`}
                alt="Dhvani Bhesaniya"
                className="w-full h-full rounded-full object-cover border-2 border-white/20 shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -right-4 glass-panel rounded-2xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Primary Stack</div>
              <div className="flex gap-2">
                {["Rust", "Node", "React"].map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded-lg bg-white/10 text-white/80 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
