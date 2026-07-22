import { motion } from 'framer-motion'
import WorldStage from './WorldStage'
import { useWorldStore, chapterProgress, CHAPTERS } from '../stores/useWorldStore'

const SHUTDOWN_CHAPTER = CHAPTERS.find((c) => c.id === 'shutdown')!

export default function ShutdownStage() {
  const progress = useWorldStore((s) => chapterProgress(s.globalProgress, SHUTDOWN_CHAPTER))
  const blackout = Math.min(1, progress * 1.4)
  const showText = progress > 0.55

  return (
    <WorldStage id="shutdown" heightVh={120} className="justify-center">
      <div
        className="absolute inset-0 bg-abyss pointer-events-none transition-none"
        style={{ opacity: blackout }}
      />

      {showText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-6"
        >
          <p className="font-data text-xs tracking-[0.4em] uppercase text-bio-aqua/60 mb-3">
            Mission Complete
          </p>
          <p className="font-kinetic font-semibold text-3xl md:text-5xl text-signal-white mb-3">
            Thank You
          </p>
          <p className="font-kinetic text-xl md:text-2xl text-bio-aqua mb-6">Suresh</p>
          <p className="font-data text-[10px] tracking-[0.3em] uppercase text-signal-white/30">
            System Offline
          </p>
        </motion.div>
      )}
    </WorldStage>
  )
}
