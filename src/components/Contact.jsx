import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import emailjs from "@emailjs/browser"
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram, Send, CheckCircle, AlertCircle } from "lucide-react"

const serviceID = "service_7580yj9"
const templateID = "template_kfi7w35"
const publicKey = "_4EsRjANtwBBAVH8X"

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "dhvani612@gmail.com", href: "mailto:dhvani612@gmail.com" },
  { icon: Phone, label: "Phone", value: "(+91) 9316590044", href: "tel:+919316590044" },
  { icon: MapPin, label: "Location", value: "Gujarat, India", href: null },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/DhvaniBhesaniya", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/dhvani-bhesaniya", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100069188478674", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/_d_patel06_?igsh=MWFraGIwcm9xbnJydQ==", label: "Instagram" },
]

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState("idle") // idle | sending | success | error

  useEffect(() => {
    emailjs.init(publicKey)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      await emailjs.sendForm(serviceID, templateID, formRef.current)
      setStatus("success")
      formRef.current.reset()
      setTimeout(() => setStatus("idle"), 3000)
    } catch (err) {
      console.error(err)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <section id="contact" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} className="section-label">Connect</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Get in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">Touch</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-10"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-3xl font-medium text-white/90 mb-4 tracking-tight">Let's build something elegant.</h3>
              <p className="text-white/50 leading-relaxed text-base font-light">
                I'm always open to discuss exciting projects, elegant solutions, and new opportunities. Drop a message or connect via socials.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-6 glass-panel rounded-full p-3 pr-6 w-fit">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                    <Icon className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-semibold mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white/80 text-sm hover:text-teal-400 transition-colors font-medium">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/80 text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4 pt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-teal-400 hover:border-teal-400/40 hover:bg-white/10 transition-all duration-300 shadow-xl"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              id="contact-form"
              className="flex flex-col gap-6 glass-panel rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle glare effect */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[11px] font-semibold uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    id="contact-name" name="name" required 
                    placeholder="Jane Doe"
                    className="h-12 w-full rounded-2xl bg-white/5 border border-white/10 px-5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[11px] font-semibold uppercase tracking-widest ml-1">Your Email</label>
                  <input 
                    id="contact-email" name="email" type="email" required 
                     placeholder="hello@example.com"
                    className="h-12 w-full rounded-2xl bg-white/5 border border-white/10 px-5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-[11px] font-semibold uppercase tracking-widest ml-1">Subject</label>
                <input 
                  id="contact-subject" name="subject" required 
                  placeholder="Project inquiry"
                  className="h-12 w-full rounded-2xl bg-white/5 border border-white/10 px-5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-[11px] font-semibold uppercase tracking-widest ml-1">Message</label>
                <textarea
                  id="contact-message" name="message" required
                  placeholder="Tell me about your vision..."
                  className="min-h-[160px] w-full rounded-2xl bg-white/5 border border-white/10 p-5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-colors resize-none"
                />
              </div>

              <button
                id="contact-submit"
                type="submit"
                disabled={status === "sending"}
                className={`mt-4 h-14 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden ${
                  status === "success"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : status === "error"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : "bg-white text-[#09090b] hover:bg-white/90 shadow-xl shadow-white/5"
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span key="idle" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center gap-2">
                      <Send size={16} strokeWidth={2} /> Send Message
                    </motion.span>
                  )}
                  {status === "sending" && (
                     <motion.span key="sending" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center gap-2">
                     <motion.span
                       animate={{ rotate: 360 }}
                       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                       className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                     />
                     Sending gracefully...
                   </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span key="success" initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="flex items-center gap-2">
                      <CheckCircle size={16} /> Delivered successfully
                    </motion.span>
                  )}
                   {status === "error" && (
                     <motion.span key="error" initial={{opacity:0}} animate={{opacity:1}} className="flex items-center gap-2">
                      <AlertCircle size={16} /> Failed to send
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
