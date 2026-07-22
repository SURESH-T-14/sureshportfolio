import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiPhone, FiGithub, FiLinkedin } from 'react-icons/fi'
import SectionHeading from './hud/SectionHeading'
import HudFrame from './hud/HudFrame'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const inputClass =
    'w-full px-4 py-3 bg-panel border border-steel text-ivory placeholder:text-muted/60 focus:outline-none focus:border-stark-gold focus:shadow-[0_0_16px_rgba(111,243,201,0.25)] transition-all font-body'

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="COMMUNICATION CENTER"
          title="Send a Transmission"
          subtitle="Have a project in mind? Let's talk about it. I'm always interested in hearing about new opportunities."
        />

        <HudFrame accent="violet" className="p-6 md:p-10">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="hud-label block mb-2">Name</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Your name"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="hud-label block mb-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="your.email@example.com"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div>
              <label className="hud-label block mb-2">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project..."
                suppressHydrationWarning
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitted}
              className="group relative w-full clip-hud px-8 py-3.5 bg-gradient-primary text-void font-bold font-mono tracking-[0.2em] uppercase flex items-center justify-center gap-2 overflow-hidden disabled:opacity-70 glow-effect transition-shadow"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              {submitted ? (
                <span className="relative animate-flicker">Message Transmitted ✓</span>
              ) : (
                <span className="relative flex items-center gap-2">
                  Transmit <FiSend />
                </span>
              )}
            </motion.button>
          </motion.form>
        </HudFrame>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="flex items-center gap-4">
              <span className="clip-hud-sm w-12 h-12 flex items-center justify-center border border-steel text-stark-gold">
                <FiMail size={20} />
              </span>
              <div>
                <h3 className="hud-label mb-1">Email</h3>
                <a href="mailto:suresh140105@gmail.com" className="text-ivory hover:text-stark-gold transition-colors font-body">
                  suresh140105@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="clip-hud-sm w-12 h-12 flex items-center justify-center border border-steel text-stark-gold">
                <FiPhone size={20} />
              </span>
              <div>
                <h3 className="hud-label mb-1">Mobile</h3>
                <a href="tel:+919080236848" className="text-ivory hover:text-stark-gold transition-colors font-body">
                  +91 9080236848
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-8">
            <motion.a
              href="https://github.com/SURESH-T-14"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="clip-hud-sm flex items-center gap-2 px-6 py-3 border border-steel hover:border-stark-gold transition-colors text-muted hover:text-stark-gold font-mono text-sm tracking-wider uppercase"
            >
              <FiGithub size={20} />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/suresh-t-/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="clip-hud-sm flex items-center gap-2 px-6 py-3 border border-steel hover:border-stark-gold transition-colors text-muted hover:text-stark-gold font-mono text-sm tracking-wider uppercase"
            >
              <FiLinkedin size={20} />
              <span>LinkedIn</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
