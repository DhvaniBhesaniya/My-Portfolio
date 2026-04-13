import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects } from "@/data/projects"
import ProjectCard from "@/components/ProjectCard"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const filters = [
  { label: "All", value: "all" },
  { label: "Rust-Project", value: "rust" },
  { label: "React-Projects", value: "react" },
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
    <section id="projects" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="section-label">Portfolio</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Featured <span className="text-sky-500">Work</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 mt-3 max-w-xl mx-auto text-sm">
            A showcase of my recent projects demonstrating expertise in full-stack development.
          </motion.p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map(({ label, value }) => (
            <button
              key={value}
              id={`filter-${value}`}
              onClick={() => setActiveFilter(value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === value
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-700/30"
                  : "bg-white/8 text-white/60 border border-white/10 hover:bg-white/15 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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
