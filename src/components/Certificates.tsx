import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, X } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  fileUrl: string;
  description: string;
}

const Certificates: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<{ url: string; type: 'pdf' | 'image' } | null>(null);
  const [certificates] = useState<Certificate[]>([
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
    }
  ]);

  // Helper function to detect file type
  const isImage = (fileUrl: string) => {
    return /\.(png|jpg|jpeg|gif|webp)$/i.test(fileUrl);
  };

  const isPDF = (fileUrl: string) => {
    return /\.pdf$/i.test(fileUrl);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="certificates" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
            Certificates & Credentials
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional certifications and credentials that demonstrate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Certificate Card */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 h-full flex flex-col">
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex flex-col h-full">
                  {/* Image/PDF Preview Section */}
                  <div className="relative w-full h-48 bg-slate-900 flex items-center justify-center overflow-hidden border-b border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => setSelectedFile({ url: cert.fileUrl, type: isImage(cert.fileUrl) ? 'image' : 'pdf' })}>
                    {isImage(cert.fileUrl) ? (
                      // Image Preview
                      <motion.img
                        src={cert.fileUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                      />
                    ) : isPDF(cert.fileUrl) ? (
                      // PDF Icon
                      <div className="flex flex-col items-center justify-center text-red-500 gap-2 group-hover:scale-110 transition-transform duration-300">
                        <FileText size={48} />
                        <span className="text-sm text-gray-400">Click to Preview PDF</span>
                      </div>
                    ) : (
                      // Generic file icon
                      <div className="flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform duration-300">
                        <FileText size={48} />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                            {cert.title}
                          </h3>
                          <p className="text-blue-400 font-semibold text-sm">{cert.issuer}</p>
                          <p className="text-gray-500 text-xs">{cert.date}</p>
                        </div>
                        <div className="text-2xl ml-2">🏆</div>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                        {cert.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-slate-700">
                      <button
                        onClick={() => setSelectedFile({ url: cert.fileUrl, type: isImage(cert.fileUrl) ? 'image' : 'pdf' })}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
                      >
                        <FileText size={16} />
                        <span>Preview</span>
                      </button>
                      <a
                        href={cert.fileUrl}
                        download
                        className="flex-1 flex items-center justify-center gap-1 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Preview Modal */}
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFile(null)}
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors z-[10000] shadow-lg"
              >
                <X size={24} />
              </motion.button>

              {/* Content Container */}
              <div className="w-full h-[90vh] flex items-center justify-center bg-slate-800">
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
      </div>
    </section>
  );
};

export default Certificates;
