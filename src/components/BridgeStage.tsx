import { motion } from 'framer-motion'
import WorldStage from './WorldStage'

export default function BridgeStage() {
  return (
    <WorldStage id="bridge" heightVh={110} className="justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-data text-xs tracking-[0.4em] uppercase text-bio-aqua/70">
          Holographic Bridge // Assembling
        </p>
      </motion.div>
    </WorldStage>
  )
}
