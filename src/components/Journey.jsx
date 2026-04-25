import { motion } from "motion/react"
import { MapPin, BookOpen, Briefcase, Code2, Award, Zap } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { NumberTicker } from "@/components/magicui/number-ticker"


const timelineItems = [
  {
    type: "education",
    title: "Bachelor in Information Technology",
    institution: "RK University",
    location: "Rajkot, Gujarat",
    period: "2020 - 2024",
    highlights: ["CGPA: 8.56", "Specialized in Backend Systems"],
    icon: BookOpen,
    color: "violet",
  },
  {
    type: "experience",
    title: "Backend Developer Intern",
    company: "Inventyv Software Services",
    location: "Remote",
    period: "Dec 2023 - May 2024",
    highlights: ["Rust", "TiKV", "Elasticsearch"],
    icon: Briefcase,
    color: "emerald",
  },
  {
    type: "project",
    title: "Ledger Core",
    description: "Production-ready ledger system with RBAC, API key management, and real-time transaction processing",
    period: "2024",
    highlights: ["Rust", "PostgreSQL", "Docker"],
    icon: Code2,
    color: "amber",
  },
  {
    type: "project",
    title: "Documind",
    description: "AI-powered platform to chat with documents using Gemini AI and Pinecone",
    period: "2024",
    highlights: ["React", "Node.js", "MongoDB"],
    icon: Zap,
    color: "cyan",
  },
]

const colorMap = {
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", glow: "shadow-violet-500/20" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", glow: "shadow-amber-500/20" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
}

export default function Journey() {
  return (
    <section id="journey" className="py-32 px-6 relative z-10 overflow-hidden">

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <BlurFade delay={0.1} inView>
            <span className="section-label">Experience</span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 className="section-heading">
              My Professional <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">Journey</span>
            </h2>
          </BlurFade>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-teal-500/30 to-transparent hidden lg:block" />
          
          <div className="grid lg:grid-cols-2 gap-8 relative">
            {timelineItems.map((item, index) => {
              const colors = colorMap[item.color]
              const Icon = item.icon
              const isLeft = index % 2 === 0
              
              return (
                <BlurFade 
                  key={item.title} 
                  delay={0.1 + index * 0.1} 
                  inView 
                  direction={isLeft ? "left" : "right"}
                  className={`relative ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-panel glass-panel-hover rounded-3xl p-8 relative overflow-hidden group"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} strokeWidth={1.5} />
                        </div>
                        <span className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-medium border ${colors.border}`}>
                          {item.period}
                        </span>
                      </div>

                      <h3 className="text-white/90 font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-sm mb-3">
                        {item.institution || item.company}
                      </p>
                      {item.description && (
                        <p className="text-white/40 text-sm mb-3">{item.description}</p>
                      )}
                      {item.location && (
                        <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
                          <MapPin size={12} />
                          {item.location}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {(item.highlights || []).map((highlight) => (
                          <span 
                            key={highlight}
                            className={`px-3 py-1.5 rounded-full ${colors.bg} text-white/70 text-xs border ${colors.border}`}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </BlurFade>
              )
            })}
          </div>
        </div>

        <BlurFade delay={0.6} inView>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid sm:grid-cols-3 gap-6"
          >
            <div className="glass-panel rounded-2xl p-6 text-center">
              <Code2 className="w-8 h-8 text-teal-400 mx-auto mb-3" strokeWidth={1.5} />
              <NumberTicker value={10} className="text-3xl font-bold text-white" />
              <p className="text-white/40 text-sm mt-1">Major Projects</p>
            </div>
            <div className="glass-panel rounded-2xl p-6 text-center">
              <Award className="w-8 h-8 text-violet-400 mx-auto mb-3" strokeWidth={1.5} />
              <NumberTicker value={6} className="text-3xl font-bold text-white" />
              <p className="text-white/40 text-sm mt-1">Certifications</p>
            </div>
            <div className="glass-panel rounded-2xl p-6 text-center">
              <Zap className="w-8 h-8 text-amber-400 mx-auto mb-3" strokeWidth={1.5} />
              <NumberTicker value={2.5} className="text-3xl font-bold text-white" />
              <p className="text-white/40 text-sm mt-1">Years Experience</p>
            </div>
          </motion.div>
        </BlurFade>
      </div>
    </section>
  )
}
