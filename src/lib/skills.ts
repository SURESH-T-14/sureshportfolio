export interface SkillCategory {
  category: string;
  skills: string[];
}

/** Single source of truth — used by both the Lab's DOM content panel (Skills.tsx) and its 3D scene (LabChapter.tsx) so the active card and the active data cube always agree on count/order. */
export const skillCategories: SkillCategory[] = [
  { category: 'Languages', skills: ['Java', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'] },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion'],
  },
  {
    category: 'Backend',
    skills: ['Spring Boot', 'Spring REST', 'Spring Data JPA', 'Node.js', 'Express.js', 'REST APIs', 'Electron'],
  },
  { category: 'Databases', skills: ['MongoDB', 'MySQL', 'Firebase'] },
  {
    category: 'AI Stack',
    skills: [
      'OpenAI',
      'Google Gemini',
      'Claude',
      'Prompt Engineering',
      'Computer Vision',
      'MediaPipe',
      'OpenCV',
      'Speech Recognition',
      'NLP',
      'AI Automation',
    ],
  },
  { category: 'DevOps', skills: ['Git', 'GitHub', 'GitHub Actions', 'CI/CD', 'Specmatic'] },
  { category: 'Testing', skills: ['Selenium', 'JUnit', 'Manual Testing'] },
];

/** "System Analysis" skill bars in the Elevator — a representative subset with self-rated proficiency (same stylistic device as `strengths` in profile.ts), not the full stack list above. */
export const skillBars = [
  { label: 'Java', value: 95 },
  { label: 'React', value: 90 },
  { label: 'Spring Boot', value: 88 },
  { label: 'Python', value: 92 },
  { label: 'Three.js', value: 82 },
  { label: 'Generative AI', value: 90 },
];
