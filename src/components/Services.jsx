import { motion } from "motion/react"
import * as LucideIcons from "lucide-react"
import { services } from "@/data/services"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">What I Do</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Features & <span className="text-sky-500">Services</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => {
            const Icon = LucideIcons[service.icon] || LucideIcons.Star
            return (
              <motion.div key={service.id} variants={fadeUp}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4 hover:border-sky-500/30 hover:bg-sky-500/5 transition-colors duration-300 cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg">{service.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{service.description}</p>

                  {/* Decorative line */}
                  <div className="mt-auto pt-3 border-t border-white/8">
                    <div className="w-8 h-0.5 bg-sky-500 rounded-full" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
