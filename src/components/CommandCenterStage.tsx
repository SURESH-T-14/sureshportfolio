import { motion } from 'framer-motion'
import WorldStage from './WorldStage'

/**
 * Scene 3 — Command Center. The console/server/drone/robot-arm set-dressing
 * (CommandCenterChapter in the 3D world) is the visual focus; this stays a
 * light HUD label, same treatment as TunnelStage.
 */
export default function CommandCenterStage() {
  return (
    <WorldStage id="command-center" heightVh={170} className="justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-data text-xs tracking-[0.4em] uppercase text-bio-aqua/70 mb-2">
          Command Center // Systems Online
        </p>
        <p className="font-editorial text-signal-white/40 text-sm max-w-md mx-auto">
          Consoles, server racks, and field units running live
        </p>
      </motion.div>
    </WorldStage>
  )
}
