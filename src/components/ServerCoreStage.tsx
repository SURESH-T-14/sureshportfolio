import { motion } from 'framer-motion'
import WorldStage from './WorldStage'

export default function ServerCoreStage() {
  return (
    <WorldStage id="server-core" heightVh={130} className="justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-data text-xs tracking-[0.4em] uppercase text-bio-aqua/70 mb-2">
          Server Core
        </p>
        <p className="font-editorial text-signal-white/40 text-sm max-w-md mx-auto">
          Quantum racks, cooled and running
        </p>
      </motion.div>
    </WorldStage>
  )
}
