import { motion } from 'framer-motion'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 gradient-text"
        >
          About Me
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate and motivated Computer Science Engineering graduate with strong expertise in Full Stack Development, Java, MERN Stack, Spring Boot, REST APIs, MySQL, MongoDB, and AI-integrated applications. I thrive on solving complex problems and developing scalable, user-friendly software solutions.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Throughout my career, I've completed multiple internships and built real-world projects including AI-powered platforms, student management systems, and accessibility-focused applications. I'm a quick learner, adaptable team player, and someone who is always eager to improve both technically and professionally.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              My goal is to grow as a software engineer by contributing to innovative projects while continuously expanding my knowledge in software development, cloud technologies, and AI. I'm dedicated to creating impactful solutions that make a difference.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-primary rounded-lg p-1 glow-effect"
            >
              <div className="bg-primary rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Let's Build</h3>
                <p className="text-gray-300">Something amazing together</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
