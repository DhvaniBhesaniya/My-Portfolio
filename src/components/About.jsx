import { motion } from "motion/react"
import { Code, GraduationCap, FolderOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">About Me</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Building Meaningful{" "}
            <span className="text-sky-500">Digital Experiences</span>
          </motion.h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Default illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-md mx-auto rounded-2xl border border-slate-300/20 bg-slate-900/70 p-6 overflow-hidden">
              <motion.div
                className="absolute -top-10 -right-10 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <img
                src="/images/app.svg"
                alt="Developer illustration"
                className="relative z-10 w-full h-64 object-contain"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-col gap-5"
          >
            <motion.p variants={fadeUp} className="text-primary/70 text-base leading-relaxed">
              I'm a Web & Backend Developer passionate about building innovative and secure
              backend solutions. My journey began with a strong foundation in IT Engineering
              and evolved into a deep expertise in backend development, problem-solving, and
              creating efficient systems.
            </motion.p>
            <motion.p variants={fadeUp} className="text-primary/70 text-base leading-relaxed">
              When I'm not coding, I enjoy learning new technologies, improving my projects,
              and exploring better ways to make applications faster, more secure, and scalable.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-2">
              {["Rust", "Node.js", "React", "PostgreSQL", "Docker", "TiKV", "Elasticsearch"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-200 border border-sky-500/25"
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
          className="grid sm:grid-cols-3 gap-5"
        >
          {driveCards.map(({ icon: Icon, title, value }) => (
            <motion.div key={title} variants={fadeUp}>
              <Card className="text-center p-2 hover:border-sky-500/30 transition-colors duration-300">
                <CardContent className="flex flex-col items-center gap-3 pt-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">{title}</p>
                  <p className="text-white font-bold text-base">{value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
