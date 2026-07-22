import { motion } from 'framer-motion'
import SectionHeading from './hud/SectionHeading'
import HudFrame from './hud/HudFrame'

export default function Experience() {
  const experiences = [
    {
      title: 'MERN Stack Developer Intern',
      company: 'Web Stack Academy',
      period: 'Sep 2025 – Nov 2025',
      status: 'LATEST',
      description: 'Built and deployed a full-stack AI-powered financial mentoring web application using MongoDB, Express.js, React.js, and Node.js. Developed RESTful APIs, implemented JWT authentication, and collaborated in Agile development workflows using Git and GitHub. Improved application performance and user experience through scalable backend integration and responsive frontend design.'
    },
    {
      title: 'Web Development Intern',
      company: '8Queens Software Technologies',
      period: 'Jun 2025 – Sep 2025',
      status: 'ARCHIVED',
      description: 'Developed a full-stack BookMyShow clone with React.js and Node.js, supporting end-to-end ticket booking functionality with payment integration. Enhanced UI/UX design, optimized frontend performance, and implemented responsive web design for cross-browser compatibility.'
    },
    {
      title: 'Full Stack Java Developer Intern',
      company: 'Vaishnav Technologies',
      period: 'Apr 2025 – Jul 2025',
      status: 'ARCHIVED',
      description: 'Developed a Student Management System using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript. Implemented REST APIs, JWT authentication, CRUD operations, and CI/CD pipelines using GitHub Actions. Worked on secure backend development and database integration for efficient student record management.'
    }
  ]

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="MISSION TIMELINE"
          title="Timeline Walk"
          subtitle="Every milestone on the way to here."
        />

        <div className="relative pl-10 md:pl-14">
          {/* Vertical spine */}
          <div className="absolute left-2.5 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-stark-red via-stark-gold to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Node */}
                <span className="absolute -left-10 md:-left-14 top-6 w-4 h-4 rotate-45 bg-void border-2 border-stark-gold shadow-[0_0_10px_rgba(111,243,201,0.7)]" />

                <HudFrame accent={idx === 0 ? 'aqua' : 'violet'} className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-ivory tracking-wide">{exp.title}</h3>
                        <span
                          className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border ${
                            exp.status === 'LATEST'
                              ? 'text-stark-gold border-stark-gold animate-arcpulse'
                              : 'text-muted border-steel'
                          }`}
                        >
                          {exp.status}
                        </span>
                      </div>
                      <p className="text-stark-red font-semibold font-mono text-sm tracking-wide">{exp.company}</p>
                    </div>
                    <span className="font-mono text-xs text-muted tracking-wider whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-muted leading-relaxed">{exp.description}</p>
                </HudFrame>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
