import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiPhone, FiGithub, FiLinkedin } from 'react-icons/fi'

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

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center"
        >
          Get In Touch
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-center mb-12"
        >
          Have a project in mind? Let's talk about it. I'm always interested in hearing about new opportunities.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg text-white focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={submitted}
            className="w-full px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-50 glow-effect"
          >
            {submitted ? 'Message Sent! ✓' : (
              <>
                Send Message <FiSend />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="flex items-center gap-4">
              <FiMail className="text-accent text-2xl" />
              <div>
                <h3 className="text-lg font-bold mb-1">Email</h3>
                <a href="mailto:suresh140105@gmail.com" className="text-gray-300 hover:text-accent transition-colors">
                  suresh140105@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FiPhone className="text-accent text-2xl" />
              <div>
                <h3 className="text-lg font-bold mb-1">Mobile</h3>
                <a href="tel:+919080236848" className="text-gray-300 hover:text-accent transition-colors">
                  +91 9080236848
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mt-8">
            <motion.a
              href="https://github.com/SURESH-T-14"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="flex items-center gap-2 px-6 py-3 bg-secondary/50 border border-accent/20 rounded-lg hover:border-accent transition-colors text-gray-300 hover:text-accent"
            >
              <FiGithub size={20} />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/suresh-t-/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="flex items-center gap-2 px-6 py-3 bg-secondary/50 border border-accent/20 rounded-lg hover:border-accent transition-colors text-gray-300 hover:text-accent"
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
