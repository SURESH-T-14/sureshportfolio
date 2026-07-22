import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiGithub, FiLinkedin, FiFolder, FiUser, FiMail } from 'react-icons/fi'
import WorldStage from './WorldStage'

const GREETING = "Hello, I'm Suresh's AI assistant. How can I help you explore this facility?"
const TYPE_SPEED_MS = 28

const COMMANDS = [
  { label: 'Open Resume', icon: FiDownload, href: '/resume/sureshresume1.pdf', download: true },
  { label: 'Open GitHub', icon: FiGithub, href: 'https://github.com/SURESH-T-14', external: true },
  { label: 'Open LinkedIn', icon: FiLinkedin, href: 'https://www.linkedin.com/in/suresh-t-/', external: true },
  { label: 'Show Projects', icon: FiFolder, href: '#projects' },
  { label: 'About Me', icon: FiUser, href: '#about' },
  { label: 'Contact', icon: FiMail, href: '#contact' },
]

/**
 * Scene — AI Assistant. A typed greeting (no TTS/audio pipeline yet — see
 * the "Robot voice" gap called out for this pass) plus a command menu that
 * actually does what it says: real links, real in-page scrolls.
 */
export default function AIAssistantStage() {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setTyped(GREETING.slice(0, i))
      if (i >= GREETING.length) clearInterval(interval)
    }, TYPE_SPEED_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <WorldStage id="ai-assistant" heightVh={130} className="justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg mx-auto px-6 text-center"
      >
        <p className="font-data text-xs tracking-[0.4em] uppercase text-bio-aqua/70 mb-6">AI Assistant</p>

        <p className="font-editorial text-signal-white/70 text-base md:text-lg min-h-[3.5rem]">
          {typed}
          <span className="hud-cursor" />
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
          {COMMANDS.map(({ label, icon: Icon, href, external, download }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(download ? { download: true } : {})}
              className="flex flex-col items-center gap-2 py-3 px-2 border border-signal-white/15 hover:border-bio-aqua/60 bg-panel/60 hover:bg-panel text-signal-white/60 hover:text-bio-aqua transition-colors font-data text-[11px] tracking-wide uppercase"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </WorldStage>
  )
}
