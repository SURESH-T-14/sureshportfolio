import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FiGithub, link: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, link: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, link: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, link: 'mailto:suresh@example.com', label: 'Email' }
  ]

  return (
    <footer className="bg-primary border-t border-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Suresh</h3>
            <p className="text-gray-400">Full-stack Software Engineer</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-accent transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4 text-2xl">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: '#3b82f6' }}
                    className="text-gray-400 hover:text-accent transition-colors"
                    title={social.label}
                  >
                    <Icon />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary mb-8"></div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-gray-400"
        >
          <p>© {currentYear} Suresh. All rights reserved.</p>
          <p className="text-sm mt-2">Designed and built with <span className="text-red-500">❤</span> using React & Tailwind CSS</p>
        </motion.div>
      </div>
    </footer>
  )
}
