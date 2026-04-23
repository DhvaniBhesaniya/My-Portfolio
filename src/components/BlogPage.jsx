import { useState, useEffect, lazy, Suspense } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ExternalLink, Clock, Calendar, Tag } from "lucide-react"
import { FaMedium } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

const SmoothCursor = lazy(() =>
  import("./magicui/smooth-cursor").then((module) => ({
    default: module.SmoothCursor,
  }))
)

const MEDIUM_RSS_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dhvani612"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/** Extract first image from HTML content */
function extractImage(html) {
  const match = html?.match(/<img[^>]+src="([^"]+)"/)
  return match ? match[1] : null
}

/** Strip HTML tags and truncate */
function stripHtml(html, maxLength = 160) {
  const text = html?.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ") || ""
  return text.length > maxLength ? text.slice(0, maxLength).trim() + "…" : text
}

/** Extract reading time estimate */
function readingTime(html) {
  const words = html?.replace(/<[^>]+>/g, "").split(/\s+/).length || 0
  return Math.max(1, Math.ceil(words / 250))
}

/** Format date nicely */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function BlogCard({ blog, index }) {
  const thumbnail = extractImage(blog.content) || blog.thumbnail
  const summary = stripHtml(blog.description || blog.content)
  const minutes = readingTime(blog.content)
  const categories = blog.categories?.slice(0, 3) || []

  return (
    <motion.a
      href={blog.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="group glass-panel rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-teal-500/20"
    >
      {/* Thumbnail */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-white/5">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={blog.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500/10 to-violet-500/10">
            <FaMedium size={48} className="text-white/10" />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Reading time badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-white/70 font-medium">
          <Clock size={10} />
          {minutes} min read
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-white/30 text-[11px] font-medium">
          <Calendar size={11} />
          {formatDate(blog.pubDate)}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-white/90 leading-snug line-clamp-2 group-hover:text-teal-400 transition-colors">
          {blog.title}
        </h3>

        {/* Summary */}
        <p className="text-white/40 text-sm leading-relaxed line-clamp-3 flex-1">
          {summary}
        </p>

        {/* Tags */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {categories.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-teal-400/60 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more */}
        <div className="flex items-center gap-1.5 text-teal-400/70 text-xs font-medium pt-2 group-hover:text-teal-400 transition-colors">
          Read on Medium
          <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.a>
  )
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)

    const fetchBlogs = async () => {
      try {
        const res = await fetch(MEDIUM_RSS_URL)
        const data = await res.json()
        if (data.status === "ok") {
          setBlogs(data.items || [])
        } else {
          setError("Failed to load articles.")
        }
      } catch (err) {
        console.error("Blog fetch error:", err)
        setError("Unable to connect. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <SmoothCursor />
      </Suspense>
    <div className="text-white min-h-screen relative selection:bg-teal-500/30">
      {/* Aurora background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-teal-500/10 blur-[100px] mix-blend-screen aurora-orb-1" />
        <div className="absolute top-[40%] right-[-10%] w-[52vw] h-[52vw] rounded-full bg-violet-500/10 blur-[105px] mix-blend-screen aurora-orb-2" />
        <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/10 blur-[100px] mix-blend-screen aurora-orb-3" />
      </div>

      {/* Fixed header */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="glass-panel rounded-full px-6 py-2.5 flex items-center justify-between w-full max-w-5xl">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="font-[Montserrat] font-bold text-lg text-white tracking-tight">
              Dhvani<span className="text-teal-400">.</span>
            </span>
          </button>

          <a
            href="https://medium.com/@dhvani612"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
          >
            <FaMedium size={18} />
            <span className="hidden sm:inline">Follow on Medium</span>
          </a>
        </nav>
      </header>

      {/* Content */}
      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center mb-14 sm:mb-20"
          >
            <motion.span
              variants={fadeUp}
              className="section-label"
            >
              Blog
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="section-heading"
            >
              Thoughts &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">
                Articles
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base sm:text-lg font-light max-w-lg mx-auto mt-4"
            >
              Deep dives into Rust, backend engineering, async programming, and
              systems design.
            </motion.p>
          </motion.div>

          {/* Loading state */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-teal-400/30 border-t-teal-400 rounded-full"
                />
                <p className="text-white/30 text-sm">Loading articles...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error state */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-white/40 text-base mb-4">{error}</p>
              <a
                href="https://medium.com/@dhvani612"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium hover:bg-teal-500/20 transition-colors"
              >
                <FaMedium size={16} />
                Visit Medium Profile
              </a>
            </motion.div>
          )}

          {/* Blog grid */}
          {!loading && !error && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {blogs.map((blog, i) => (
                <BlogCard key={blog.guid || i} blog={blog} index={i} />
              ))}
            </motion.div>
          )}

          {/* Bottom CTA */}
          {!loading && !error && blogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <a
                href="https://medium.com/@dhvani612"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-teal-500/10 to-violet-500/10 border border-white/10 text-white/70 text-sm font-medium hover:border-teal-500/30 hover:text-white transition-all duration-300"
              >
                <FaMedium size={18} />
                View all articles on Medium
                <ExternalLink size={14} />
              </a>
            </motion.div>
          )}
        </div>
      </main>

      {/* Simple footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-white/40 text-sm hover:text-teal-400 transition-colors cursor-pointer"
          >
            ← Back to Portfolio
          </button>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Dhvani Bhesaniya
          </p>
        </div>
      </footer>
    </div>
    </>
  )
}
