import { motion } from "motion/react"
import { Server, Layers, Database, Plug, Star } from "lucide-react"
import { services } from "@/data/services"

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const serviceIcons = {
  Server,
  Layers,
  Database,
  Plug,
}

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} className="section-label">Capabilities</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Features & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">Services</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.icon] || Star
            return (
              <motion.div key={service.id} variants={fadeUp} className="h-full">
                <div className="glass-panel glass-panel-hover h-full rounded-3xl p-8 flex flex-col gap-6 cursor-default relative overflow-hidden group">
                  {/* Subtle hover gradient background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-transparent to-violet-500/0 group-hover:from-teal-500/5 group-hover:to-violet-500/5 transition-colors duration-500 pointer-events-none" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative z-10">
                    <Icon className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-white/90 font-medium text-xl leading-tight relative z-10">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light relative z-10">{service.description}</p>

                  {/* Decorative subtle dot */}
                  <div className="mt-auto pt-4 border-t border-white/5 relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500/50" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
