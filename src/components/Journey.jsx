import { motion } from "motion/react"
import { MapPin, Mail, BookOpen, Briefcase, Code2 } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function Journey() {
  return (
    <section id="journey" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} className="section-label">Timeline</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Professional <br className=""/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">Journey</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 gap-8"
        >
          {/* Card 1 — Summary */}
          <motion.div variants={fadeUp}>
            <div className="glass-panel glass-panel-hover h-full rounded-3xl p-8 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
              </div>
              <p className="text-white/70 leading-relaxed text-base font-light">
                I am a backend developer with a strong foundation in IT Engineering. I
                specialize in creating elegant backend code and excel in solving complex
                problems through thorough research and analysis.
              </p>
              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-white/5">
                <span className="flex items-center gap-3 text-white/50 text-sm">
                  <MapPin size={16} className="text-teal-400" strokeWidth={1.5} /> Gujarat, India
                </span>
                <span className="flex items-center gap-3 text-white/50 text-sm">
                  <Mail size={16} className="text-teal-400" strokeWidth={1.5} /> dhvani612@gmail.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Education */}
          <motion.div variants={fadeUp}>
            <div className="glass-panel glass-panel-hover h-full rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-violet-400" strokeWidth={1.5} />
                </div>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Education</span>
              </div>
              <div className="border-l border-white/10 pl-6 space-y-3 py-2 ml-6">
                <div>
                  <p className="text-white/90 font-medium text-lg leading-tight">Bachelor In Info. Tech.</p>
                  <p className="text-violet-400 text-sm mt-1 font-medium tracking-wide">2020 – 2024</p>
                </div>
                <p className="text-white/50 text-sm">Rk University Rajkot, Gujarat</p>
                <div className="pt-2">
                  <span className="glass-panel px-3 py-1.5 rounded-full text-violet-300 text-xs font-medium border-violet-500/20 bg-violet-500/5">
                    CGPA: 8.56
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — Experience */}
          <motion.div variants={fadeUp}>
            <div className="glass-panel glass-panel-hover h-full rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                </div>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Experience</span>
              </div>
              <div className="border-l border-white/10 pl-6 space-y-3 py-2 ml-6">
                <div>
                  <p className="text-white/90 font-medium text-lg leading-tight">Backend Developer Intern</p>
                  <p className="text-emerald-400 text-sm mt-1 font-medium tracking-wide">Dec 2023 – May 2024</p>
                </div>
                <p className="text-white/50 text-sm">Inventyv Software Services</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Rust", "TiKV", "Elasticsearch"].map((t) => (
                    <span key={t} className="glass-panel px-3 py-1.5 rounded-full text-white/70 text-xs border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4 — Early Projects */}
          <motion.div variants={fadeUp}>
            <div className="glass-panel glass-panel-hover h-full rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-amber-400" strokeWidth={1.5} />
                </div>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Early Projects</span>
              </div>
              <div className="space-y-4">
                {[
                  { title: "D's Estate Website", stack: "React", year: "2022" },
                  { title: "Twitter Clone", stack: "React", year: "2023" },
                ].map((p, i) => (
                  <div
                    key={p.title}
                    className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-white/90 font-medium text-base">{p.title}</p>
                      <span className="text-amber-400/80 text-xs font-bold tracking-wider">{p.year}</span>
                    </div>
                    <p className="text-white/40 text-sm">{p.stack}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
