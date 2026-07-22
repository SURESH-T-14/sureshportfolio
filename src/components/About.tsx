import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import SectionHeading from './hud/SectionHeading'
import HudFrame from './hud/HudFrame'
import { profile } from '../lib/profile'

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="SYS_MODULE: ABOUT_ME" title="System Profile" align="left" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <HudFrame accent="violet" className="p-8 space-y-6">
            <div className="flex items-center gap-5">
              <img
                src="/photo/suresh-pic.jpg"
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-bio-aqua/50 shadow-[0_0_18px_rgba(111,243,201,0.35)]"
              />
              <div>
                <p className="hud-label text-bio-aqua mb-1">Dossier // Personnel File</p>
                <a
                  href="/resume/sureshresume1.pdf"
                  download
                  className="inline-flex items-center gap-2 font-data text-xs text-signal-white/70 hover:text-bio-aqua transition-colors border-b border-transparent hover:border-bio-aqua pb-0.5"
                >
                  <FiDownload /> Download Resume
                </a>
              </div>
            </div>

            <p className="text-muted text-lg leading-relaxed">
              I'm a passionate and motivated Computer Science Engineering graduate with strong expertise in Full Stack Development, Java, MERN Stack, Spring Boot, REST APIs, MySQL, MongoDB, and AI-integrated applications. I thrive on solving complex problems and developing scalable, user-friendly software solutions.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              Throughout my career, I've completed multiple internships and built real-world projects including AI-powered platforms, student management systems, and accessibility-focused applications. I'm a quick learner, adaptable team player, and someone who is always eager to improve both technically and professionally.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              My goal is to grow as a software engineer by contributing to innovative projects while continuously expanding my knowledge in software development, cloud technologies, and AI. I'm dedicated to creating impactful solutions that make a difference.
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-steel">
              {profile.personality.map((trait) => (
                <span key={trait} className="font-data text-[11px] text-bio-aqua/80 border border-bio-aqua/25 px-2.5 py-1">
                  {trait}
                </span>
              ))}
            </div>
          </HudFrame>
        </motion.div>
      </div>
    </section>
  )
}
