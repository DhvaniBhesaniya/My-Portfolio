import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"
import emailjs from "@emailjs/browser"
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const serviceID = "service_7580yj9"
const templateID = "template_kfi7w35"
const publicKey = "_4EsRjANtwBBAVH8X"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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
    <section id="contact" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">Contact Me</motion.span>
          <motion.h2 variants={fadeUp} className="section-heading">
            Get in <span className="text-sky-500">Touch</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-2xl font-bold text-white mb-2">Let's collaborate!</h3>
              <p className="text-white/55 leading-relaxed text-sm">
                I'm always open to discuss exciting projects and new opportunities.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-sm hover:text-sky-500 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-sky-500 hover:border-sky-400/40 hover:bg-sky-500/10 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              id="contact-form"
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Your Name</label>
                  <Input id="contact-name" name="name" placeholder="Dhvani Bhesaniya" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Your Email</label>
                  <Input id="contact-email" name="email" type="email" placeholder="hello@example.com" required />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Subject</label>
                <Input id="contact-subject" name="subject" placeholder="Project collaboration" required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Message</label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project..."
                  className="min-h-[140px]"
                  required
                />
              </div>

              <Button
                id="contact-submit"
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className={`mt-1 ${
                  status === "success"
                    ? "bg-green-500 hover:bg-green-600 shadow-green-500/25"
                    : status === "error"
                    ? "bg-red-500 hover:bg-red-600"
                    : ""
                }`}
              >
                {status === "idle" && <><Send size={16} /> Send Message</>}
                {status === "sending" && (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </span>
                )}
                {status === "success" && <><CheckCircle size={16} /> Message Sent!</>}
                {status === "error" && <><AlertCircle size={16} /> Failed — Try Again</>}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
