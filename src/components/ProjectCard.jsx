import { ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/magicui/border-beam"
import { motion } from "motion/react"

export default function ProjectCard({ project }) {
  const { title, description, image, tags, liveUrl, repoUrl } = project

  return (
    <motion.div
      className="group relative h-full"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden h-full flex flex-col relative">
        <BorderBeam 
          duration={6} 
          size={200} 
          className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          colorFrom="#14b8a6"
          colorTo="#8b5cf6"
        />
        
        <div className="relative h-56 overflow-hidden bg-white/5">
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-60 z-10" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `https://placehold.co/600x400/1e1e2e/6366f1?text=${encodeURIComponent(title)}`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="flex flex-col flex-1 gap-4 p-6 relative z-10 -mt-16 bg-gradient-to-t from-[#09090B] via-[#09090B]/95 to-transparent backdrop-blur-sm pt-20">
          <h3 className="text-white/90 font-semibold text-xl leading-tight group-hover:text-teal-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed flex-1 font-light line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 py-3 border-y border-white/5">
            {tags.slice(0, 4).map((tag) => (
              <span 
                key={tag} 
                className="px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-xs border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mt-1">
            {liveUrl && (
              <Button 
                size="sm" 
                asChild 
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white border-0 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300"
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              </Button>
            )}
            {repoUrl && (
              <Button 
                size="sm" 
                asChild 
                className="flex-1 bg-white/5 hover:bg-white/15 text-white/80 border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 group/btn"
              >
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <FaGithub size={15} className="group-hover/btn:scale-110 transition-transform text-white/70 group-hover/btn:text-white" />
                  Source
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
