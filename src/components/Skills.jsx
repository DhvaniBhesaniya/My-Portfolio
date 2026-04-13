import { motion } from "motion/react"
import { Code } from "lucide-react"
import { skillGroups } from "@/data/skills"

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

// Orbit planets config
const orbit1 = [
  { label: "Node", color: "#68A063", bg: "rgba(104,160,99,0.1)" },
  { label: "React", color: "#61DAFB", bg: "rgba(97,218,251,0.1)" },
]
const orbit2 = [
  { label: "Mongo", color: "#4DB33D", bg: "rgba(77,179,61,0.1)" },
  { label: "Express", color: "#ffffff", bg: "rgba(255,255,255,0.05)" },
  { label: "AWS", color: "#FF9900", bg: "rgba(255,153,0,0.1)" },
]
const orbit3 = [
  { label: "Rust", color: "#CE4A28", bg: "rgba(206,74,40,0.1)" },
  { label: "Figma", color: "#A259FF", bg: "rgba(162,89,255,0.1)" },
  { label: "Python", color: "#FFD43B", bg: "rgba(255,212,59,0.1)" },
  { label: "CSS", color: "#264DE4", bg: "rgba(38,77,228,0.1)" },
]

function OrbitPlanet({ label, color, bg, style, counterClass }) {
  return (
    <div className="absolute" style={style}>
      <span
        className={`glass-panel ${counterClass} flex items-center justify-center w-11 h-11 rounded-full text-[10px] font-semibold`}
        style={{ color, boxShadow: `0 4px 20px ${bg}` }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} className="section-label">Core Skills</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Technical <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">Expertise</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT: Solar system */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Center sun */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.3)]">
                  <Code className="w-8 h-8 text-white/80" strokeWidth={1.5} />
                </div>
              </div>

              {/* Orbit 1 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full border border-dashed border-white/10 orbit-ring-1">
                  {orbit1.map((p, i) => (
                    <OrbitPlanet
                      key={p.label}
                      {...p}
                      counterClass="counter-rotate-icon"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 180}deg) translateX(64px) translateY(-50%)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Orbit 2 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-56 h-56 rounded-full border border-dashed border-white/10 orbit-ring-2">
                  {orbit2.map((p, i) => (
                    <OrbitPlanet
                      key={p.label}
                      {...p}
                      counterClass="counter-rotate-icon-2"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 120}deg) translateX(112px) translateY(-50%)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Orbit 3 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] rounded-full border border-dashed border-white/10 orbit-ring-3">
                  {orbit3.map((p, i) => (
                    <OrbitPlanet
                      key={p.label}
                      {...p}
                      counterClass="counter-rotate-icon-3"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 90}deg) translateX(150px) translateY(-50%)`,
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
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-10"
          >
            {skillGroups.map((group) => (
              <motion.div key={group.label} variants={fadeUp} className="space-y-4">
                <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                  {group.label}
                  <span className="flex-1 h-[1px] bg-white/5" />
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`glass-panel px-4 py-2 rounded-full text-sm transition-all hover:bg-white/10 cursor-default ${
                        group.variant === "primary" ? "text-teal-300 font-medium" : "text-white/70"
                      }`}
                    >
                      {skill}
                    </span>
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
