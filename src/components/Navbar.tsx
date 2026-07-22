import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('hero')

  // 'Skills' and 'Projects' point at the 'lab' and 'projects' chapter ids —
  // that's where their content actually lives now, not a same-named section.
  const menuItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'lab' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'Contact', id: 'contact' },
  ]

  useEffect(() => {
    const ids = ['tunnel', ...menuItems.map((m) => m.id)]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-paper/95 backdrop-blur-md z-50 border-b border-line"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="#tunnel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-kinetic font-semibold text-xl tracking-tight text-ink"
          >
            Suresh
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-9">
            {menuItems.map((item, index) => {
              const isActive = active === item.id
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * (index + 1) }}
                  className="relative py-1 font-editorial text-sm tracking-wide"
                >
                  <span className={isActive ? 'text-signal' : 'text-ink-soft hover:text-ink transition-colors'}>
                    {item.label}
                  </span>
                  <span
                    className={`absolute left-0 -bottom-0.5 h-px w-full bg-signal origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </motion.a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="md:hidden fixed top-20 right-0 bottom-0 w-64 bg-paper border-l border-line py-6"
          >
            {menuItems.map((item) => {
              const isActive = active === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block px-6 py-3 font-editorial text-sm tracking-wide ${
                    isActive ? 'text-signal' : 'text-ink-soft hover:text-ink transition-colors'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
