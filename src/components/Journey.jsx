import { motion } from "motion/react"
import { MapPin, Mail, BookOpen, Briefcase, Code2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function Journey() {
  return (
    <section id="journey" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">Journey</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Professional <span className="text-sky-500">Timeline</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 gap-6"
        >
          {/* Card 1 — Summary */}
          <motion.div variants={fadeUp}>
            <Card className="h-full hover:border-sky-500/30 transition-colors duration-300">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-sky-400" />
                </div>
                <p className="text-white/70 leading-relaxed text-sm">
                  I am a backend developer with a strong foundation in IT Engineering. I
                  specialize in creating efficient backend code and excel in solving complex
                  problems through thorough research and analysis.
                </p>
                <div className="flex flex-col gap-1.5 mt-auto">
                  <span className="flex items-center gap-2 text-white/50 text-xs">
                    <MapPin size={13} className="text-sky-400" /> Gujarat, India
                  </span>
                  <span className="flex items-center gap-2 text-white/50 text-xs">
                    <Mail size={13} className="text-sky-400" /> dhvani612@gmail.com
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2 — Education */}
          <motion.div variants={fadeUp}>
            <Card className="h-full hover:border-sky-500/30 transition-colors duration-300">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Education</span>
                </div>
                <div className="border-l-2 border-sky-500/30 pl-4 space-y-1">
                  <p className="text-white font-bold text-base">Bachelor In Info. Tech.</p>
                  <p className="text-sky-500 text-sm font-medium">2020 – 2024</p>
                  <p className="text-white/60 text-sm">Rk University Rajkot, Gujarat</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs font-semibold border border-green-500/25">
                      CGPA: 8.56
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3 — Experience */}
          <motion.div variants={fadeUp}>
            <Card className="h-full hover:border-sky-500/30 transition-colors duration-300">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Experience</span>
                </div>
                <div className="border-l-2 border-orange-500/30 pl-4 space-y-1">
                  <p className="text-white font-bold text-base">Backend Developer Intern</p>
                  <p className="text-orange-400 text-sm font-medium">Dec 2023 – May 2024</p>
                  <p className="text-white/60 text-sm">Inventyv Software Services</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["Rust", "TiKV", "Elasticsearch"].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/8 text-white/60 text-xs border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 4 — Early Projects */}
          <motion.div variants={fadeUp}>
            <Card className="h-full hover:border-sky-500/30 transition-colors duration-300">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Early Projects</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "D's Estate Website", stack: "React", year: "2022" },
                    { title: "Twitter Clone", stack: "React", year: "2023" },
                  ].map((p) => (
                    <div
                      key={p.title}
                      className="flex items-center justify-between border border-white/8 rounded-xl px-4 py-3 bg-white/3 hover:border-purple-500/30 transition-colors"
                    >
                      <div>
                        <p className="text-white font-medium text-sm">{p.title}</p>
                        <p className="text-white/40 text-xs">{p.stack}</p>
                      </div>
                      <span className="text-purple-400 text-xs font-bold">{p.year}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
