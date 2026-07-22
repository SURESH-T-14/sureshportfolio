export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  /** Screenshot of the project's actual UI, shown in the Hangar's hologram panel. */
  image: string;
  /** True when `github` falls back to the profile (no confirmed repo URL yet) rather than a specific repo. */
  githubIsProfileFallback?: boolean;
}

/** Single source of truth — used by both the Project Hangar's DOM content panel (Projects.tsx) and its 3D scene (ProjectsChapter.tsx) so links/order never drift apart. */
export const projects: Project[] = [
  {
    title: 'JARVIS AI',
    description:
      'Desktop AI assistant with wake-word detection, real-time hand-gesture mouse control (MediaPipe), voice commands, natural-language desktop automation, application/camera/file-manager control, and conversational AI — built end-to-end as a personal AI operating layer.',
    tags: ['Python', 'MediaPipe', 'Computer Vision', 'Speech Recognition', 'Desktop Automation'],
    github: 'https://github.com/SURESH-T-14/Jarvis',
    live: '#',
    image: '/photo/jarvis.png',
  },
  {
    title: 'Electron AI Assistant',
    description:
      'Local-first desktop AI assistant built with Electron during the Luna AI Hackathon — voice control, system commands, and security-aware application control. Received a Certificate of Appreciation for production-ready implementation.',
    tags: ['Electron', 'Local AI', 'Voice Assistant', 'Desktop Automation', 'JavaScript'],
    github: 'https://github.com/SURESH-T-14/Task-Management-App',
    live: '#',
    image: '/photo/electron-app.png',
  },
  {
    title: 'AccessAI',
    description:
      'Accessibility-focused multi-modal AI assistant supporting gesture, voice, image, and text search/interaction. Real-time hand gesture recognition via TensorFlow.js and MediaPipe (95% accuracy), Google Gemini API integration, Firebase auth with MFA, and Python OpenCV for visual processing at 30 FPS. Presented as a research paper at the National Conference on Artificial Intelligence and Data Science.',
    tags: ['React.js', 'Node.js', 'Python', 'TensorFlow.js', 'MediaPipe', 'OpenCV', 'Firebase', 'Google Gemini API'],
    github: 'https://github.com/SURESH-T-14/AccessAI',
    live: '#',
    image: '/photo/access-ai.png',
  },
  {
    title: 'AI-Based Money Mentor',
    description:
      'Full-stack AI-powered financial advisory platform. Integrated Google Gemini AI API for real-time conversational financial guidance, processing 100+ concurrent user queries. Implemented microservices backend with secure RESTful APIs and real-time data synchronization using WebSockets.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Django', 'Google Gemini API'],
    github: 'https://github.com/SURESH-T-14/ai-money-mentor',
    live: '#',
    image: '/photo/ai-money-mentor.png',
  },
  {
    title: 'BookMyShow Clone',
    description:
      'Full-stack movie ticket booking platform built with React.js and Node.js, supporting end-to-end booking flow with payment integration, responsive UI, and cross-browser compatibility.',
    tags: ['React.js', 'Node.js', 'Payment Integration', 'Full Stack'],
    github: 'https://github.com/SURESH-T-14/social-media',
    live: '#',
    image: '/photo/book-my-show.png',
  },
  {
    title: 'Student Management System',
    description:
      'Role-based Java full-stack application managing 500+ student records with separate dashboards for Admin, Faculty, and Students. Implemented JWT authentication, CRUD operations, and CI/CD pipeline using GitHub Actions for automated testing and deployment.',
    tags: ['Java', 'Spring Boot', 'MySQL', 'JWT', 'GitHub Actions', 'REST APIs'],
    github: 'https://github.com/SURESH-T-14/Student-Management-System-java',
    live: '#',
    image: '/photo/student-management.png',
  },
];
