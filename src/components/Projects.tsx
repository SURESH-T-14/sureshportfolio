import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { useIsDesktopViewport } from '../hooks/useIsDesktopViewport'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useWorldStore, chapterProgress, CHAPTERS } from '../stores/useWorldStore'
import { projects } from '../lib/projects'
import HudFrame from './hud/HudFrame'

const PROJECTS_CHAPTER = CHAPTERS.find((c) => c.id === 'projects')!

const linkClass =
  'font-editorial text-sm text-signal-white/80 hover:text-bio-aqua flex items-center gap-2 border-b border-transparent hover:border-bio-aqua pb-0.5 transition-colors'

export default function Projects() {
  const isDesktop = useIsDesktopViewport()
  const reducedMotion = usePrefersReducedMotion()
  const showWorld = isDesktop && !reducedMotion

  const activeIndex = useWorldStore((s) => {
    const local = chapterProgress(s.globalProgress, PROJECTS_CHAPTER)
    return Math.min(projects.length - 1, Math.floor(local * projects.length))
  })

  if (!showWorld) {
    return (
      <section id="projects" className="py-24 px-6 bg-abyss text-signal-white">
        <div className="max-w-3xl mx-auto">
          <p className="font-data text-xs tracking-[0.3em] uppercase text-bio-aqua mb-4">Selected Work</p>
          <h2 className="font-kinetic font-semibold text-4xl md:text-5xl mb-14">Projects</h2>

          <div className="space-y-16">
            {projects.map((project, idx) => (
              <div key={idx} className="border-t border-signal-white/10 pt-8">
                <span className="font-data text-xs text-signal-white/40">
                  {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <h3 className="font-kinetic text-2xl md:text-3xl mt-2 mb-3">{project.title}</h3>
                <img
                  src={project.image}
                  alt={`${project.title} UI`}
                  loading="lazy"
                  className="w-full rounded-none border border-bio-aqua/20 mb-5 object-cover max-h-72"
                />
                <p className="font-editorial text-signal-white/60 leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="font-data text-[11px] text-bio-aqua border border-bio-aqua/30 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <FiGithub /> {project.githubIsProfileFallback ? 'GitHub Profile' : 'Code'}
                  </a>
                  {project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <FiExternalLink /> Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const active = projects[activeIndex]

  return (
    <section id="projects" className="relative h-[350vh] text-signal-white">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-16">
          <p className="font-data text-xs tracking-[0.3em] uppercase text-bio-aqua mb-4">Selected Work</p>

          <AnimatePresence>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, position: 'absolute' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              {/* Hologram panel — the project's actual UI */}
              <HudFrame accent="aqua" sweep className="p-2 order-2 md:order-1">
                <img
                  src={active.image}
                  alt={`${active.title} UI`}
                  loading="lazy"
                  className="w-full max-h-[50vh] object-cover"
                />
              </HudFrame>

              <div className="order-1 md:order-2">
                <span className="font-data text-xs text-signal-white/40">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <h3 className="font-kinetic font-semibold text-3xl md:text-4xl mt-2 mb-4">{active.title}</h3>
                <p className="font-editorial text-signal-white/60 leading-relaxed mb-6">{active.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {active.tags.slice(0, 5).map((tag, i) => (
                    <span key={i} className="font-data text-[11px] text-bio-aqua border border-bio-aqua/30 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <a href={active.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <FiGithub /> {active.githubIsProfileFallback ? 'GitHub Profile' : 'Code'}
                  </a>
                  {active.live !== '#' && (
                    <a href={active.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <FiExternalLink /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="font-data text-[10px] tracking-[0.2em] uppercase text-signal-white/30 mt-8">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  )
}
