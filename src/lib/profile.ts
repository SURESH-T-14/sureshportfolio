/** Single source of truth for Suresh's identity/bio content — used across BootSequence, HelmetStage, ReactorStage, ObservationDeckStage, and Certificates. */
export const profile = {
  name: 'Suresh T',
  role: 'AI Software Engineer',
  roleSecondary: 'Full Stack Developer',
  location: 'Chennai, Tamil Nadu, India',
  education: 'B.E., Computer Science and Engineering',
  status: 'Engineering Graduate',
  mission:
    'Design intelligent software that combines Artificial Intelligence, automation, full-stack engineering, and immersive user experiences.',
  specializations: ['AI Engineering', 'Full Stack Development', 'Computer Vision', 'Automation'],
  personality: [
    'Curious',
    'Self-Learner',
    'Creative Problem Solver',
    'Analytical Thinker',
    'AI Enthusiast',
    'Builder',
    'Always Learning',
  ],
};

/** "Energy rings" in the Arc Reactor Chamber — self-rated strengths, same stylistic device the site already used for the old About diagnostic bars. */
export const strengths = [
  { label: 'Problem Solving', value: 96 },
  { label: 'AI Development', value: 94 },
  { label: 'System Design', value: 90 },
  { label: 'Full Stack Engineering', value: 95 },
  { label: 'Creative Engineering', value: 92 },
];

/** Real, verifiable facts only — no invented stats. */
export const achievements = [
  'Bachelor of Engineering — Computer Science and Engineering',
  '18+ Professional Certifications',
  '3 Internships — Java, MERN Stack, Full Stack Development',
  'Research Paper Presented — AccessAI, National Conference on Artificial Intelligence and Data Science',
  'Certificate of Appreciation — Luna AI Hackathon',
];

export const futureVision = [
  'Grow as an AI Software Engineer building products used at scale',
  'Contribute to cutting-edge AI systems and frontier AI research',
  'Long-term interest: Google, NVIDIA, OpenAI, Meta',
];
