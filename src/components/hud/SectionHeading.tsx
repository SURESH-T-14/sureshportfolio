import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-14 ${isCenter ? 'text-center' : 'text-left'}`}>
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`hud-label mb-3 ${isCenter ? 'flex items-center justify-center gap-2' : 'flex items-center gap-2'}`}
      >
        <span className="text-bio-aqua">{'//'}</span>
        <span className="hud-cursor">{eyebrow}</span>
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, x: -12, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="font-display font-bold text-4xl md:text-5xl gradient-text text-glow-red tracking-wide uppercase"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className={`h-px bg-gradient-hud mt-5 ${isCenter ? 'mx-auto w-40' : 'w-40'}`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className={`text-muted text-lg mt-5 ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
