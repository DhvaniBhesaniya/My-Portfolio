import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects } from "@/data/projects"
import ProjectCard from "@/components/ProjectCard"

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const filters = [
  { label: "All", value: "all" },
  { label: "Rust", value: "rust" },
  { label: "React", value: "react" },
  { label: "AI", value: "ai" },
  { label: "Web", value: "web" },
  { label: "API", value: "api" },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter))

  return (
    <section id="projects" className="py-32 px-6 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">Portfolio</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">Work</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 mt-4 max-w-xl mx-auto text-base font-light">
            A curated selection of my recent projects demonstrating expertise in full-stack architecture and backend systems.
          </motion.p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {filters.map(({ label, value }) => (
            <button
              key={value}
              id={`filter-${value}`}
              onClick={() => setActiveFilter(value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer relative overflow-hidden ${
                activeFilter === value
                  ? "text-teal-900 shadow-lg shadow-teal-500/20"
                  : "glass-panel text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {activeFilter === value && (
                <motion.span
                  layoutId="active-filter"
                  className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-emerald-300"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
