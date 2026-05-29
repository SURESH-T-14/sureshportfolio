import { motion } from 'framer-motion'

export default function Experience() {
  const experiences = [
    {
      title: 'MERN Stack Developer Intern',
      company: 'Web Stack Academy',
      period: 'Sep 2025 – Nov 2025',
      description: 'Built and deployed a full-stack AI-powered financial mentoring web application using MongoDB, Express.js, React.js, and Node.js. Developed RESTful APIs, implemented JWT authentication, and collaborated in Agile development workflows using Git and GitHub. Improved application performance and user experience through scalable backend integration and responsive frontend design.'
    },
    {
      title: 'Web Development Intern',
      company: '8Queens Software Technologies',
      period: 'Jun 2025 – Sep 2025',
      description: 'Developed a full-stack BookMyShow clone with React.js and Node.js, supporting end-to-end ticket booking functionality with payment integration. Enhanced UI/UX design, optimized frontend performance, and implemented responsive web design for cross-browser compatibility.'
    },
    {
      title: 'Full Stack Java Developer Intern',
      company: 'Vaishnav Technologies',
      period: 'Apr 2025 – Jul 2025',
      description: 'Developed a Student Management System using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript. Implemented REST APIs, JWT authentication, CRUD operations, and CI/CD pipelines using GitHub Actions. Worked on secure backend development and database integration for efficient student record management.'
    }
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 gradient-text text-center"
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-secondary/50 rounded-lg p-8 border-l-4 border-accent hover:border-accent2 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                  <p className="text-accent font-semibold">{exp.company}</p>
                </div>
                <span className="text-gray-400 font-semibold mt-2 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
