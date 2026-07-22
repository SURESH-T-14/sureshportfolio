import { AnimatePresence, motion } from 'framer-motion'
import { useIsDesktopViewport } from '../hooks/useIsDesktopViewport'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useWorldStore, chapterProgress, CHAPTERS } from '../stores/useWorldStore'
import { skillCategories } from '../lib/skills'
import HudFrame from './hud/HudFrame'

const LAB_CHAPTER = CHAPTERS.find((c) => c.id === 'lab')!

/**
 * Scene — AI Research Lab. Same one-card-at-a-time pattern as Projects:
 * a pinned sticky frame, the active category driven by scroll progress
 * through this chapter, with a quick crossfade between cards — and the
 * active data cube in the 3D scene behind it highlights in sync (see
 * LabChapter.tsx).
 */
export default function Skills() {
  const isDesktop = useIsDesktopViewport()
  const reducedMotion = usePrefersReducedMotion()
  const showWorld = isDesktop && !reducedMotion

  const activeIndex = useWorldStore((s) => {
    const local = chapterProgress(s.globalProgress, LAB_CHAPTER)
    return Math.min(skillCategories.length - 1, Math.floor(local * skillCategories.length))
  })

  if (!showWorld) {
    return (
      <section id="lab" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="font-data text-xs tracking-[0.3em] uppercase text-bio-aqua mb-4">AI Research Lab</p>
          <h2 className="font-kinetic font-semibold text-4xl md:text-5xl mb-14">Tech Arsenal</h2>

          <div className="space-y-5">
            {skillCategories.map((cat) => (
              <HudFrame key={cat.category} accent="violet" className="p-6">
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-ivory mb-4 pb-3 border-b border-steel">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="text-muted text-sm border border-steel/60 px-2.5 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </HudFrame>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const active = skillCategories[activeIndex]

  return (
    <section id="lab" className="relative h-[300vh] text-signal-white">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="relative z-10 w-full max-w-xl px-6 lg:px-16 mx-auto">
          <p className="font-data text-xs tracking-[0.3em] uppercase text-bio-aqua mb-4">AI Research Lab</p>

          <AnimatePresence>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, position: 'absolute' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <span className="font-data text-xs text-signal-white/40">
                {String(activeIndex + 1).padStart(2, '0')} / {String(skillCategories.length).padStart(2, '0')}
              </span>
              <h3 className="font-kinetic font-semibold text-3xl md:text-5xl mt-2 mb-6">{active.category}</h3>

              <div className="flex flex-wrap gap-2">
                {active.skills.map((skill) => (
                  <span key={skill} className="font-data text-[11px] text-bio-aqua border border-bio-aqua/30 px-2.5 py-1.5">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="font-data text-[10px] tracking-[0.2em] uppercase text-signal-white/30 mt-14">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  )
}
