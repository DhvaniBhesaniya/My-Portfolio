import { motion } from "motion/react"
import { Code, GraduationCap, FolderOpen } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const driveCards = [
  {
    icon: Code,
    title: "Technologies",
    value: "Rust, Node.js, React",
  },
  {
    icon: GraduationCap,
    title: "Education",
    value: "B.Tech IT",
  },
  {
    icon: FolderOpen,
    title: "Projects",
    value: "5+ Major Projects",
  },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} className="section-label">Discover</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Building Meaningful <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">Digital Experiences</span>
          </motion.h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative p-2 glass-panel rounded-3xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 max-w-md w-full">
              <img
                src="/images/img2.jpg"
                alt="Dhvani Bhesaniya"
                className="w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed font-light">
              I'm a Web & Backend Developer passionate about building innovative and secure
              backend solutions. My journey began with a strong foundation in IT Engineering
              and evolved into a deep expertise in backend architecture, problem-solving, and
              crafting elegant systems.
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed font-light">
              When I'm not writing code, I enjoy exploring new technologies that push the boundaries 
              of performance. I focus on finding better ways to make applications faster, more secure, 
              and universally accessible.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-4">
              {["Rust", "Node.js", "React", "PostgreSQL", "Docker", "TiKV", "Elasticsearch"].map((tech) => (
                <span
                  key={tech}
                  className="glass-panel px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-white/80 border-white/5"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* What Drives Me Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-3 gap-6"
        >
          {driveCards.map(({ icon: Icon, title, value }) => (
            <motion.div key={title} variants={fadeUp} className="h-full">
              <div className="glass-panel glass-panel-hover h-full text-center p-8 rounded-3xl flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                  <Icon className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
                </div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{title}</p>
                <p className="text-white/90 font-medium text-lg">{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
