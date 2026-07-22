import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import ArcReactor from './hud/ArcReactor'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FiGithub, link: 'https://github.com/SURESH-T-14', label: 'GitHub' },
    { icon: FiLinkedin, link: 'https://www.linkedin.com/in/suresh-t-/', label: 'LinkedIn' },
    { icon: FiMail, link: 'mailto:suresh140105@gmail.com', label: 'Email' }
  ]

  return (
    <footer className="relative bg-void border-t border-steel py-12 px-4">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-hud opacity-60" />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-3"
          >
            <ArcReactor size={32} />
            <div>
              <h3 className="font-display font-bold text-xl gradient-text tracking-wide mb-1">SURESH</h3>
              <p className="text-muted font-mono text-xs tracking-wider uppercase">Full-stack Software Engineer</p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="hud-label mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted font-body">
              <li><a href="#about" className="hover:text-stark-gold transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-stark-gold transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-stark-gold transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="hud-label mb-4">Follow Me</h4>
            <div className="flex gap-4 text-xl">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="text-muted hover:text-stark-gold transition-colors"
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
        <div className="border-t border-steel mb-8"></div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted font-mono text-xs tracking-wider"
        >
          <p>© {currentYear} AI-OS // SURESH. ALL RIGHTS RESERVED.</p>
          <p className="mt-2">Designed &amp; built with <span className="text-bio-aqua">❤</span> using React, Three.js &amp; Tailwind CSS</p>
        </motion.div>
      </div>
    </footer>
  )
}
