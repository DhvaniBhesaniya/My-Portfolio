import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectCard({ project }) {
  const { title, description, image, tags, liveUrl, repoUrl } = project

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden h-full flex flex-col group/card relative">
      {/* Subtle border glow driven by group hover */}
      <div className="absolute inset-0 rounded-3xl border 2 border-white/0 group-hover/card:border-white/20 transition-colors duration-500 pointer-events-none z-20" />
      
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-white/5">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-110"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://placehold.co/600x400/1e1e2e/6366f1?text=${encodeURIComponent(title)}`
          }}
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-inverse)] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-4 p-6 relative z-10 -mt-10 bg-gradient-to-t from-white/10 via-transparent backdrop-blur-sm rounded-t-3xl pt-8">
        <h3 className="text-white/90 font-medium text-xl leading-tight">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed flex-1 font-light">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 py-2 border-y border-white/5">
          {tags.map((tag) => (
            <span key={tag} className="text-white/40 text-xs tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-1">
          {liveUrl && (
            <Button size="sm" asChild className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/5 rounded-xl">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                Live Demo
              </a>
            </Button>
          )}
          {repoUrl && (
            <Button size="sm" asChild className="flex-1 bg-transparent hover:bg-white/5 text-white/70 border border-white/10 rounded-xl">
              <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                <Github size={14} />
                Source
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
