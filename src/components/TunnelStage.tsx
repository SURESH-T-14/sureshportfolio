import { AnimatePresence, motion } from 'framer-motion'
import WorldStage from './WorldStage'
import { useWorldStore, chapterProgress, CHAPTERS } from '../stores/useWorldStore'
import { profile } from '../lib/profile'

const TUNNEL_CHAPTER = CHAPTERS.find((c) => c.id === 'tunnel')!

const BEATS = [
  { kind: 'label' as const, text: 'Entering Neural Corridor' },
  { kind: 'mission' as const },
  { kind: 'specializations' as const },
]

/**
 * Scene 1 — Energy Tunnel / Security Corridor. Three scroll-driven beats
 * projected onto the corridor walls as the camera flies through: an entry
 * label, the mission statement, then core specializations — instead of a
 * single static caption for the whole scene.
 */
export default function TunnelStage() {
  const beatIndex = useWorldStore((s) => {
    const local = chapterProgress(s.globalProgress, TUNNEL_CHAPTER)
    return Math.min(BEATS.length - 1, Math.floor(local * BEATS.length))
  })
  const beat = BEATS[beatIndex]

  return (
    <WorldStage id="tunnel" heightVh={170} className="justify-center">
      <AnimatePresence>
        <motion.div
          key={beatIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, position: 'absolute' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative z-10 text-center px-6 max-w-lg mx-auto"
        >
          {beat.kind === 'label' && (
            <p className="font-data text-xs tracking-[0.4em] uppercase text-bio-aqua/70">{beat.text}</p>
          )}

          {beat.kind === 'mission' && (
            <>
              <p className="font-data text-[10px] tracking-[0.35em] uppercase text-bio-aqua/60 mb-3">Mission</p>
              <p className="font-editorial text-lg md:text-xl text-signal-white/80 leading-relaxed">
                {profile.mission}
              </p>
            </>
          )}

          {beat.kind === 'specializations' && (
            <>
              <p className="font-data text-[10px] tracking-[0.35em] uppercase text-bio-aqua/60 mb-4">
                Core Specializations
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {profile.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="font-data text-xs text-signal-white/70 border border-signal-white/15 px-3 py-1.5"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </WorldStage>
  )
}
