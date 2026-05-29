import { motion } from 'framer-motion'

export default function Skills() {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: ['Java', 'JavaScript (ES6+)', 'Python', 'SQL', 'C']
    },
    {
      category: 'Frontend',
      skills: ['React.js', 'HTML5', 'CSS3', 'TailwindCSS', 'Responsive Web Design']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'Spring Boot', 'RESTful APIs']
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'MongoDB', 'Firebase Realtime DB', 'JDBC']
    },
    {
      category: 'AI / ML',
      skills: ['TensorFlow.js', 'MediaPipe', 'OpenCV', 'Google Gemini API']
    },
    {
      category: 'Cloud & DevOps',
      skills: ['AWS (EC2, S3)', 'Git', 'GitHub', 'GitHub Actions', 'CI/CD Pipelines']
    },
    {
      category: 'Security',
      skills: ['JWT Authentication', 'OAuth 2.0', 'RBAC', 'Multi-Factor Authentication']
    },
    {
      category: 'Tools & Methodologies',
      skills: ['Figma', 'Postman', 'Agile']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 gradient-text text-center"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-secondary/50 rounded-lg p-6 border border-accent/20 hover:border-accent/50 transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 text-accent">{category.category}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-gray-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
