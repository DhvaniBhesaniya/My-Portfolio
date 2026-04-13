import { motion } from "motion/react"
import { Code, Atom, Server, Database, Cloud, Cog, Figma, FileCode2, Palette } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { skillGroups } from "@/data/skills"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// Orbit planets config
const orbit1 = [
  { icon: Server, color: "#22c55e", bg: "#22c55e20" },
  { icon: Atom, color: "#38bdf8", bg: "#38bdf820" },
]
const orbit2 = [
  { icon: Database, color: "#16a34a", bg: "#16a34a20" },
  { icon: FileCode2, color: "#e2e8f0", bg: "#e2e8f015" },
  { icon: Cloud, color: "#f59e0b", bg: "#f59e0b20" },
]
const orbit3 = [
  { icon: Cog, color: "#f97316", bg: "#f9731620" },
  { icon: Figma, color: "#a855f7", bg: "#a855f720" },
  { icon: Code, color: "#facc15", bg: "#facc1520" },
  { icon: Palette, color: "#2563eb", bg: "#2563eb20" },
]

function OrbitPlanet({ icon: Icon, color, bg, style, counterClass }) {
  return (
    <div className="absolute" style={style}>
      <span
        className={`${counterClass} flex items-center justify-center w-9 h-9 rounded-full border`}
        style={{ background: bg, color, borderColor: color + "60" }}
      >
        <Icon size={14} />
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-white/2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">Skills</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Technical <span className="text-sky-500">Expertise</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT: Solar system */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Center sun */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 rounded-full bg-sky-500/20 border-2 border-sky-500/60 flex items-center justify-center sun-glow">
                  <Code className="w-8 h-8 text-sky-400" />
                </div>
              </div>

              {/* Orbit 1 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-28 h-28 rounded-full border border-sky-500/25 orbit-ring-1">
                  {orbit1.map((p, i) => (
                    <OrbitPlanet
                      key={p.label}
                      {...p}
                      counterClass="counter-rotate-icon"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 180}deg) translateX(56px) translateY(-50%)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Orbit 2 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 rounded-full border border-cyan-400/20 orbit-ring-2">
                  {orbit2.map((p, i) => (
                    <OrbitPlanet
                      key={p.label}
                      {...p}
                      counterClass="counter-rotate-icon-2"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 120}deg) translateX(96px) translateY(-50%)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Orbit 3 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-full border border-slate-300/15 orbit-ring-3">
                  {orbit3.map((p, i) => (
                    <OrbitPlanet
                      key={p.label}
                      {...p}
                      counterClass="counter-rotate-icon-3"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 90}deg) translateX(128px) translateY(-50%)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Badge groups */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            {skillGroups.map((group) => (
              <motion.div key={group.label} variants={fadeUp} className="space-y-3">
                <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={group.variant === "primary" ? "default" : "secondary"}
                      className={group.variant === "primary" ? "text-sm px-3 py-1" : "text-sm px-3 py-1"}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
