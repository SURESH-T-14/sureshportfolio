import { motion } from 'framer-motion'
import WorldStage from './WorldStage'
import { futureVision } from '../lib/profile'

export default function ObservationDeckStage() {
  return (
    <WorldStage id="observation-deck" heightVh={150} className="justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="relative z-10 text-center px-6 max-w-md mx-auto"
      >
        <p className="font-data text-xs tracking-[0.4em] uppercase text-signal-white/40 mb-2">
          Observation Deck
        </p>
        <p className="font-data text-[10px] tracking-[0.35em] uppercase text-bio-aqua/70 mb-5">
          Future Vision
        </p>
        <ul className="space-y-2.5">
          {futureVision.map((goal) => (
            <li key={goal} className="font-editorial text-signal-white/70 text-sm md:text-base leading-relaxed">
              {goal}
            </li>
          ))}
        </ul>
      </motion.div>
    </WorldStage>
  )
}
