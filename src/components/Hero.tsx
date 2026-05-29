import { motion } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="hero" className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-dark opacity-40"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent2 opacity-10 rounded-full blur-3xl"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-accent font-semibold text-lg">Welcome to my portfolio</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Hi, I'm <span className="gradient-text">Suresh</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
        >
          Full-stack Software Engineer passionate about building scalable applications
          and solving complex problems with clean, efficient code.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-shadow glow-effect"
          >
            View My Work <FiArrowRight />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 text-2xl"
        >
          <motion.a
            href="https://github.com/SURESH-T-14"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#3b82f6' }}
            className="text-gray-400 hover:text-accent transition-colors"
          >
            <FiGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/suresh-t-/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#3b82f6' }}
            className="text-gray-400 hover:text-accent transition-colors"
          >
            <FiLinkedin />
          </motion.a>
          <motion.a
            href="mailto:suresh140105@gmail.com"
            whileHover={{ scale: 1.2, color: '#3b82f6' }}
            className="text-gray-400 hover:text-accent transition-colors"
          >
            <FiMail />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}
