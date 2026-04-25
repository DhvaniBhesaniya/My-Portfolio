import { lazy, Suspense } from "react"
import { motion } from "motion/react"
import { skillGroups } from "@/data/skills"
import { Marquee } from "@/components/magicui/marquee"


const IconCloud = lazy(() =>
  import("@/components/magicui/icon-cloud").then((module) => ({
    default: module.IconCloud,
  }))
)

const iconCloudImages = [
  "https://cdn.simpleicons.org/rust/dea584",
  "https://cdn.simpleicons.org/javascript/f7df1e",
  "https://cdn.simpleicons.org/react/61dafb",
  "https://cdn.simpleicons.org/nodedotjs/5fa04e",
  "https://cdn.simpleicons.org/express/ffffff",
  "https://cdn.simpleicons.org/mongodb/47a248",
  "https://cdn.simpleicons.org/postgresql/336791",
  "https://cdn.simpleicons.org/docker/2496ed",
  "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
  "https://cdn.simpleicons.org/elasticsearch/005571",
  "https://cdn.simpleicons.org/figma/f24e4e",
  "https://cdn.simpleicons.org/git/f05032",
]

function IconCloudFallback() {
  return (
    <div className="mx-auto relative flex items-center justify-center w-full max-w-[22rem] aspect-square">
      <div className="w-20 h-20 rounded-full glass-panel animate-pulse" />
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 relative z-10 overflow-hidden">

      <div className="max-w-7xl mx-auto">
        {/* Marquee */}
        <div 
          className="relative mb-20 overflow-hidden py-6"
          style={{ 
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", 
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
          }}
        >
          <Marquee pauseOnHover className="[--duration:25s]">
            {["Rust", "Axum", "Tokio", "Node.js", "React", "PostgreSQL", "Docker", "TiKV", "MongoDB", "Elasticsearch", "AWS", "Git"].map((tech) => (
              <span key={tech} className="mx-6 glass-panel px-6 py-3 rounded-full text-sm font-medium text-white/80 whitespace-nowrap">
                {tech}
              </span>
            ))}
          </Marquee>
        </div>

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
          {/* LEFT: IconCloud */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <Suspense fallback={<IconCloudFallback />}>
                <IconCloud className="mx-auto" images={iconCloudImages} />
              </Suspense>
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
