import { motion } from "motion/react"
import { ExternalLink, Github } from "lucide-react"
import MagicCard from "@/components/magicui/magic-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProjectCard({ project }) {
  const { title, description, image, tags, liveUrl, repoUrl } = project

  return (
    <MagicCard
      className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden h-full flex flex-col"
      gradientColor="#6366f1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://placehold.co/600x400/1e1e2e/6366f1?text=${encodeURIComponent(title)}`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-3 p-5">
        <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
        <p className="text-white/55 text-sm leading-relaxed flex-1">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          {liveUrl && (
            <Button size="sm" asChild className="flex-1">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={13} />
                Live Demo
              </a>
            </Button>
          )}
          {repoUrl && (
            <Button size="sm" variant="outline" asChild className="flex-1">
              <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                <Github size={13} />
                Source Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </MagicCard>
  )
}
