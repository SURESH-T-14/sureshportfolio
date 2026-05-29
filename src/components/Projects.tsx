import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function Projects() {
  const projects = [
    {
      title: 'AI-Based Money Mentor',
      description: 'Full-stack AI-powered financial advisory platform. Integrated Google Gemini AI API for real-time conversational financial guidance, processing 100+ concurrent user queries. Implemented microservices backend with secure RESTful APIs and real-time data synchronization using WebSockets.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Django', 'Google Gemini API'],
      github: 'https://github.com/SURESH-T-14/ai-money-mentor',
      live: '#'
    },
    {
      title: 'Student Management System',
      description: 'Role-based Java full-stack application managing 500+ student records with separate dashboards for Admin, Faculty, and Students. Implemented JWT authentication, CRUD operations, and CI/CD pipeline using GitHub Actions for automated testing and deployment.',
      tags: ['Java', 'Spring Boot', 'MySQL', 'JWT', 'GitHub Actions', 'REST APIs'],
      github: 'https://github.com/SURESH-T-14/Student-Management-System-java',
      live: '#'
    },
    {
      title: 'AccessAI Bot',
      description: 'Accessibility-focused multi-modal AI assistant supporting gesture, voice, and text interactions. Implemented real-time hand gesture recognition using TensorFlow.js and MediaPipe (95% accuracy), integrated Google Gemini API, Firebase auth with MFA, and Python OpenCV for visual processing at 30 FPS.',
      tags: ['React.js', 'Node.js', 'Python', 'TensorFlow.js', 'MediaPipe', 'OpenCV', 'Firebase', 'MongoDB', 'Google Gemini API'],
      github: 'https://github.com/SURESH-T-14/AccessAI',
      live: '#'
    }
  ]

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 gradient-text text-center"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group bg-secondary/50 rounded-lg overflow-hidden border border-accent/20 hover:border-accent/50 transition-all duration-300 glow-effect"
            >
              <div className="bg-gradient-primary h-32 opacity-20 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-300 hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <FiGithub size={20} />
                    <span className="text-sm">Code</span>
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-300 hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <FiExternalLink size={20} />
                    <span className="text-sm">Live</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
