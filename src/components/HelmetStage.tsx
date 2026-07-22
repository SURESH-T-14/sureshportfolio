import { motion } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import Marquee from './Marquee'
import WorldStage from './WorldStage'
import { useWorldStore, chapterProgress, CHAPTERS } from '../stores/useWorldStore'
import { profile } from '../lib/profile'

const HELMET_CHAPTER = CHAPTERS.find((c) => c.id === 'helmet')!

const TICKER_ITEMS = [
  'Full-Stack Engineer',
  'Java · Spring Boot',
  'React · Node.js',
  'AI-Integrated Apps',
  'MongoDB · MySQL',
  'Problem Solver',
]

/**
 * Scene — Helmet Chamber. The "Scanning Creator..." identity reveal —
 * a live "Synchronization" readout driven by scroll progress through this
 * chapter, then a structured scan card (name/education/status/mission)
 * instead of a generic tagline, plus the practical nav CTAs/social links.
 */
export default function HelmetStage() {
  const syncPercent = useWorldStore((s) => Math.round(chapterProgress(s.globalProgress, HELMET_CHAPTER) * 100))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/SURESH-T-14', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/suresh-t-/', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:suresh140105@gmail.com', label: 'Email' },
  ]

  return (
    <WorldStage id="helmet" heightVh={230} className="flex-col">
      <div className="absolute top-24 left-6 lg:left-10 z-10 font-data text-[11px] tracking-[0.25em] uppercase text-bio-aqua/80">
        <p>{syncPercent < 100 ? 'Scanning Creator...' : 'Neural Interface Synced'}</p>
        <p className="text-signal-white/50 mt-1">Synchronization {syncPercent}%</p>
      </div>

      <div className="relative z-10 flex-1 flex items-center pt-20 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl px-6 lg:px-10"
        >
          <motion.p variants={itemVariants} className="font-data text-xs tracking-[0.3em] uppercase text-bio-aqua mb-6">
            {profile.role} · {profile.roleSecondary}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-kinetic font-semibold leading-[0.92] tracking-tight text-[clamp(3.2rem,11vw,9rem)]"
          >
            {profile.name.split(' ')[0]}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-6 space-y-1.5 font-data text-sm text-signal-white/60 max-w-xl border-l border-bio-aqua/30 pl-4"
          >
            <p>
              <span className="text-signal-white/35">Education:</span> {profile.education}
            </p>
            <p>
              <span className="text-signal-white/35">Status:</span> {profile.status}
            </p>
            <p className="pt-1 text-signal-white/70 leading-relaxed font-editorial text-base">{profile.mission}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-8 mt-10">
            <a href="#projects" className="group inline-flex items-center gap-2 font-editorial text-base text-signal-white">
              <span className="border-b border-signal-white/30 group-hover:border-bio-aqua group-hover:text-bio-aqua transition-colors pb-0.5">
                View My Work
              </span>
              <FiArrowRight className="group-hover:translate-x-1 group-hover:text-bio-aqua transition-transform" />
            </a>
            <a
              href="#contact"
              className="font-editorial text-base text-signal-white/60 hover:text-bio-aqua transition-colors border-b border-transparent hover:border-bio-aqua pb-0.5"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 mt-12">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-signal-white/50 hover:text-bio-aqua transition-colors text-xl"
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-signal-white/10 py-5 w-full">
        <Marquee items={TICKER_ITEMS} speed={28} />
      </div>
    </WorldStage>
  )
}
