import { motion } from 'framer-motion'
import WorldStage from './WorldStage'
import { strengths } from '../lib/profile'

/**
 * Scene — Arc Reactor Chamber. The story's first big "wow" moment
 * (ReactorChapter in the 3D world) — each energy ring reveals a core
 * strength as it powers up, echoing the reactor's own activation.
 */
export default function ReactorStage() {
  return (
    <WorldStage id="reactor" heightVh={170} className="justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 w-full max-w-sm mx-auto"
      >
        <p className="font-data text-xs tracking-[0.4em] uppercase text-bio-aqua/70 mb-2">
          Arc Reactor Chamber // Power Online
        </p>
        <p className="font-kinetic text-2xl md:text-3xl text-signal-white/80 mb-8">Welcome Back, Commander</p>

        <div className="space-y-3.5 text-left">
          {strengths.map((s, i) => (
            <div key={s.label}>
              <div className="flex justify-between mb-1 font-data text-[11px] text-signal-white/60 uppercase tracking-wide">
                <span>{s.label}</span>
                <span className="text-bio-aqua">{s.value}%</span>
              </div>
              <div className="h-1 bg-signal-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-bio-aqua to-bio-violet"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </WorldStage>
  )
}
