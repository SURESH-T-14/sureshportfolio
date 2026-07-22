import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi'
import WorldStage from './WorldStage'

const NODES = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/SURESH-T-14', external: true },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/suresh-t-/', external: true },
  { icon: FiDownload, label: 'Resume', href: '/resume/sureshresume1.pdf', external: false },
]

export default function GlobalNetworkStage() {
  return (
    <WorldStage id="global-network" heightVh={130} className="justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-data text-xs tracking-[0.4em] uppercase text-bio-aqua/70 mb-5">
          Global Network
        </p>
        <div className="flex items-center justify-center gap-4">
          {NODES.map(({ icon: Icon, label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
              className="flex flex-col items-center gap-2 px-4 py-3 border border-signal-white/15 hover:border-bio-aqua/60 bg-panel/60 hover:bg-panel text-signal-white/60 hover:text-bio-aqua transition-colors font-data text-[11px] tracking-wide uppercase"
            >
              <Icon size={18} />
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </WorldStage>
  )
}
