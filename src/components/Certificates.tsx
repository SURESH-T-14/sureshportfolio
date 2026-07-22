import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { FileText, Download, X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import SectionHeading from './hud/SectionHeading';
import { achievements } from '../lib/profile';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  fileUrl: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Java Programming Internship",
    issuer: "Professional Development",
    date: "2024",
    description: "Comprehensive Java programming internship certificate",
    fileUrl: "/certificates/JAVA_PROGRAMMING_INTERNSHIP-suresh_.T.pdf"
  },
  {
    id: 2,
    title: "8 Queens Certificate",
    issuer: "Algorithm Challenge",
    date: "2024",
    description: "Algorithm implementation challenge completion",
    fileUrl: "/certificates/8queens certificate.pdf"
  },
  {
    id: 3,
    title: "AlgoExpert Certificate",
    issuer: "AlgoExpert",
    date: "2024",
    description: "Advanced algorithms and data structures course",
    fileUrl: "/certificates/AlgoExpert_Certificate.pdf"
  },
  {
    id: 4,
    title: "AWS Cloud Fundamentals",
    issuer: "Amazon Web Services",
    date: "2024",
    description: "AWS cloud solutions and best practices",
    fileUrl: "/certificates/aws.pdf"
  },
  {
    id: 5,
    title: "GitHub Actions",
    issuer: "Practical GitHub Actions",
    date: "2024",
    description: "CI/CD and GitHub Actions workflow automation",
    fileUrl: "/certificates/CertificateOfCompletion_Practical GitHub Actions.pdf"
  },
  {
    id: 6,
    title: "Experience Based Learning",
    issuer: "Professional Training",
    date: "2024",
    description: "Real-world experience and learning achievements",
    fileUrl: "/certificates/exprience based learining.pdf"
  },
  {
    id: 7,
    title: "EY Participation Certificate",
    issuer: "Ernst & Young",
    date: "2024",
    description: "EY professional development program",
    fileUrl: "/certificates/EY participation certificate.pdf"
  },
  {
    id: 8,
    title: "Forage AI Job Simulation",
    issuer: "Forage - JP Morgan",
    date: "2024",
    description: "AI and machine learning job simulation",
    fileUrl: "/certificates/forage AI job simulation certifcate.pdf"
  },
  {
    id: 9,
    title: "GeeksforGeeks Java",
    issuer: "GeeksforGeeks",
    date: "2024",
    description: "Java programming comprehensive course",
    fileUrl: "/certificates/geeks for geeks java.pdf"
  },
  {
    id: 10,
    title: "IBM AI Fundamentals",
    issuer: "IBM",
    date: "2024",
    description: "Artificial Intelligence fundamentals and applications",
    fileUrl: "/certificates/IBM AI fundamentals.png"
  },
  {
    id: 11,
    title: "IBM Customer Engagement",
    issuer: "IBM",
    date: "2024",
    description: "Customer engagement strategies and best practices",
    fileUrl: "/certificates/IBM costumer engagement.png"
  },
  {
    id: 12,
    title: "Microsoft Office Certification",
    issuer: "Microsoft",
    date: "2024",
    description: "Microsoft Office suite proficiency certification",
    fileUrl: "/certificates/ms office.pdf"
  },
  {
    id: 13,
    title: "Spring Boot Fundamentals",
    issuer: "Spring Framework",
    date: "2024",
    description: "Spring Boot framework and microservices",
    fileUrl: "/certificates/spring boot 1.pdf"
  },
  {
    id: 14,
    title: "Spring Data",
    issuer: "Spring Framework",
    date: "2024",
    description: "Spring Data and database management",
    fileUrl: "/certificates/spring data 2.pdf"
  },
  {
    id: 15,
    title: "Spring REST APIs",
    issuer: "Spring Framework",
    date: "2024",
    description: "RESTful API development with Spring",
    fileUrl: "/certificates/spring rest 3.pdf"
  },
  {
    id: 16,
    title: "Unity Game Development",
    issuer: "Unity Technologies",
    date: "2024",
    description: "Game development with Unity engine",
    fileUrl: "/certificates/unity.pdf"
  },
  {
    id: 17,
    title: "WSA Internship Certificate",
    issuer: "WSA",
    date: "2024",
    description: "Professional internship completion certificate",
    fileUrl: "/certificates/wsa_internship_certificate_SureshT.pdf"
  },
  {
    id: 18,
    title: "Selenium WebDriver with Java & Frameworks",
    issuer: "Professional Development",
    date: "2024",
    description: "Selenium WebDriver automation testing with Java and frameworks",
    fileUrl: "/certificates/Selenium WebDriver with Java & Frameworks.pdf"
  }
];

const AUTOPLAY_MS = 5000;

const isImage = (fileUrl: string) => /\.(png|jpg|jpeg|gif|webp)$/i.test(fileUrl);
const isPDF = (fileUrl: string) => /\.pdf$/i.test(fileUrl);

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 25 : -25
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? -25 : 25
  })
};

const Certificates: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<{ url: string; type: 'pdf' | 'image' } | null>(null);
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = certificates.length;
  const current = certificates[index];

  const paginate = useCallback((newDirection: number) => {
    setIndexState(([prevIndex]) => {
      const nextIndex = (prevIndex + newDirection + total) % total;
      return [nextIndex, newDirection];
    });
    setProgressKey((k) => k + 1);
  }, [total]);

  const goTo = useCallback((targetIndex: number) => {
    setIndexState(([prevIndex]) => [targetIndex, targetIndex > prevIndex ? 1 : -1]);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!isPlaying || selectedFile) return;
    timerRef.current = setTimeout(() => paginate(1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, isPlaying, selectedFile, paginate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedFile) return;
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [paginate, selectedFile]);

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 60;
    if (info.offset.x < -swipeThreshold) paginate(1);
    else if (info.offset.x > swipeThreshold) paginate(-1);
  };

  return (
    <section id="certificates" className="relative py-20 px-4 overflow-hidden">
      <div className="relative max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="ACHIEVEMENT VAULT"
          title="Certificates & Credentials"
          subtitle="Professional certifications and credentials that demonstrate my expertise and commitment to continuous learning."
        />

        <div className="flex flex-wrap justify-center gap-2.5 mb-14 -mt-6">
          {achievements.map((item) => (
            <span
              key={item}
              className="font-data text-[11px] text-signal-white/60 border border-signal-white/15 px-3 py-1.5"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Carousel */}
        <div
          className="relative flex items-center justify-center gap-3 sm:gap-6"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Left Arrow */}
          <motion.button
            aria-label="Previous certificate"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => paginate(-1)}
            className="clip-hud-sm shrink-0 z-20 w-11 h-11 sm:w-14 sm:h-14 bg-panel border border-steel hover:border-stark-gold hover:bg-stark-gold/10 text-stark-gold flex items-center justify-center shadow-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Card Stage */}
          <div className="relative w-full max-w-xl" style={{ perspective: 1200 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                className="group relative cursor-grab active:cursor-grabbing"
              >
                <div className="group/hud relative hud-panel clip-hud border border-stark-red/40 hover:border-stark-red transition-colors duration-300 shadow-2xl flex flex-col overflow-hidden">
                  {/* Corner brackets */}
                  <span className="pointer-events-none absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-stark-gold opacity-80" />
                  <span className="pointer-events-none absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-stark-gold opacity-80" />
                  <span className="pointer-events-none absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-stark-gold opacity-80" />
                  <span className="pointer-events-none absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-stark-gold opacity-80" />

                  {/* Scanline flicker sweep on transition */}
                  <motion.div
                    key={`sweep-${current.id}`}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-transparent via-stark-gold/20 to-transparent"
                  />

                  {/* Index badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-void/70 border border-stark-gold/40 font-mono text-xs text-stark-gold tracking-widest">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </div>
                  <div className="absolute top-4 right-4 z-10 text-2xl select-none">🏆</div>

                  {/* Preview */}
                  <div
                    className="relative w-full h-72 bg-void flex items-center justify-center overflow-hidden border-b border-steel cursor-pointer"
                    onClick={() => setSelectedFile({ url: current.fileUrl, type: isImage(current.fileUrl) ? 'image' : 'pdf' })}
                  >
                    {isImage(current.fileUrl) ? (
                      <img
                        src={current.fileUrl}
                        alt={current.title}
                        draggable={false}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : isPDF(current.fileUrl) ? (
                      <div className="flex flex-col items-center justify-center text-stark-red gap-2 group-hover:scale-105 transition-transform duration-500">
                        <FileText size={56} />
                        <span className="text-sm text-muted font-mono tracking-wide">Click to Preview PDF</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-muted group-hover:scale-105 transition-transform duration-500">
                        <FileText size={56} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative p-6 flex flex-col gap-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-ivory mb-1 group-hover:text-stark-gold transition-colors">
                        {current.title}
                      </h3>
                      <p className="text-stark-red font-semibold text-sm font-mono">{current.issuer}</p>
                      <p className="text-muted text-xs mb-2 font-mono">{current.date}</p>
                      <p className="text-muted text-sm leading-relaxed">{current.description}</p>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-steel">
                      <button
                        onClick={() => setSelectedFile({ url: current.fileUrl, type: isImage(current.fileUrl) ? 'image' : 'pdf' })}
                        className="clip-hud-sm flex-1 flex items-center justify-center gap-2 bg-gradient-primary text-void px-4 py-2.5 transition-all duration-300 transform hover:scale-[1.02] text-sm font-bold font-mono tracking-wide uppercase"
                      >
                        <FileText size={16} />
                        <span>Preview</span>
                      </button>
                      <a
                        href={current.fileUrl}
                        download
                        className="clip-hud-sm flex-1 flex items-center justify-center gap-2 border border-stark-gold text-stark-gold hover:bg-stark-gold/10 px-4 py-2.5 transition-all duration-300 text-sm font-bold font-mono tracking-wide uppercase"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <motion.button
            aria-label="Next certificate"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => paginate(1)}
            className="clip-hud-sm shrink-0 z-20 w-11 h-11 sm:w-14 sm:h-14 bg-panel border border-steel hover:border-stark-gold hover:bg-stark-gold/10 text-stark-gold flex items-center justify-center shadow-lg transition-colors"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Autoplay progress bar ("reactor charge") */}
        <div className="max-w-xl mx-auto mt-6 h-1 bg-steel overflow-hidden">
          {isPlaying && !selectedFile && (
            <motion.div
              key={progressKey}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
              className="h-full bg-gradient-primary"
            />
          )}
        </div>

        {/* Dots + Play/Pause */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            onClick={() => setIsPlaying((p) => !p)}
            className="clip-hud-sm w-8 h-8 flex items-center justify-center text-muted hover:text-stark-gold border border-steel hover:border-stark-gold transition-colors"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-md">
            {certificates.map((cert, i) => (
              <button
                key={cert.id}
                aria-label={`Go to certificate ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rotate-45 transition-all duration-300 ${
                  i === index ? 'bg-stark-gold scale-125 shadow-[0_0_6px_rgba(111,243,201,0.8)]' : 'bg-steel hover:bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-void/95 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl max-h-[90vh] hud-panel overflow-hidden shadow-2xl border border-stark-red/40"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFile(null)}
                className="clip-hud-sm absolute top-4 right-4 bg-stark-red hover:bg-stark-redglow text-ivory p-3 transition-colors z-[10000] shadow-lg"
              >
                <X size={24} />
              </motion.button>

              <div className="w-full h-[90vh] flex items-center justify-center bg-void">
                {selectedFile.type === 'pdf' && (
                  <iframe
                    src={`${selectedFile.url}#toolbar=0&navpanes=0`}
                    className="w-full h-full border-none"
                    title="PDF Preview"
                  />
                )}

                {selectedFile.type === 'image' && (
                  <img
                    src={selectedFile.url}
                    alt="Certificate preview"
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
