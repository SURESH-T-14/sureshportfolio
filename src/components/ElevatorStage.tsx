import { AnimatePresence, motion } from 'framer-motion'
import WorldStage from './WorldStage'
import { useWorldStore, chapterProgress, CHAPTERS } from '../stores/useWorldStore'
import { skillBars } from '../lib/skills'

const ELEVATOR_CHAPTER = CHAPTERS.find((c) => c.id === 'elevator')!

export default function ElevatorStage() {
  const beatIndex = useWorldStore((s) => {
    const local = chapterProgress(s.globalProgress, ELEVATOR_CHAPTER)
    return Math.min(1, Math.floor(local * 2))
  })

  return (
    <WorldStage id="elevator" heightVh={130} className="justify-center">
      <AnimatePresence>
        {beatIndex === 0 ? (
          <motion.div
            key="destination"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: 'absolute' }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-center px-6"
          >
            <p className="font-data text-[10px] tracking-[0.3em] uppercase text-signal-white/40 mb-1">Destination</p>
            <p className="font-kinetic font-semibold text-2xl md:text-3xl text-bio-violet tracking-wide">
              Aegis Command Center
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, position: 'absolute' }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-sm px-6 mx-auto"
          >
            <p className="font-data text-[10px] tracking-[0.35em] uppercase text-bio-aqua/70 mb-4 text-center">
              System Analysis
            </p>
            <div className="space-y-3">
              {skillBars.map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between mb-1 font-data text-[11px] text-signal-white/60 uppercase tracking-wide">
                    <span>{skill.label}</span>
                    <span className="text-bio-aqua">{skill.value}%</span>
                  </div>
                  <div className="h-1 bg-signal-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-bio-aqua to-bio-violet"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WorldStage>
  )
}
