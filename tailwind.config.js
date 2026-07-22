/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Every token below is repointed onto the single AI-OS
        // bioluminescent palette (abyss/bio-aqua/bio-violet/signal-white —
        // the source of truth, unchanged). Old token *names* (stark.*,
        // paper/ink/signal/line, glow.*) are kept so components not yet
        // rewritten to reference bio-* directly (About/Skills/Experience/
        // Certificates/Contact/Footer/Navbar) reskin for free with no
        // per-file edits. New/rewritten components should reference
        // abyss/mist/bio-*/signal-white directly instead of these aliases.
        void: '#07060B',
        panel: '#12111A',
        steel: '#262838',
        stark: {
          red: '#9B8CFF',
          redglow: '#B9AEFF',
          gold: '#6FF3C9',
          goldglow: '#9FFAE0',
        },
        ivory: '#F3F1FF',
        muted: '#8B92B0',
        aivoid: '#020304',
        glow: {
          primary: '#6FF3C9',
          secondary: '#9B8CFF',
          accent: '#9FFAE0',
        },
        warning: '#FF5C5C',

        paper: '#07060B',
        ink: {
          DEFAULT: '#F3F1FF',
          soft: '#8B92B0',
        },
        signal: '#6FF3C9',
        line: '#262838',

        // AI-OS bioluminescent system — source of truth for the world
        // engine (Boot/world chapters) and for all newly-written components.
        abyss: '#07060B',
        mist: '#12111A',
        bio: {
          aqua: '#6FF3C9',
          violet: '#9B8CFF',
        },
        'signal-white': '#F3F1FF',
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Titillium Web"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],

        // Editorial identity type
        kinetic: ['"Clash Display"', 'sans-serif'],
        editorial: ['"General Sans"', 'sans-serif'],
        data: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #9B8CFF 0%, #6FF3C9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #12111A 0%, #07060B 100%)',
        'gradient-hud': 'linear-gradient(90deg, transparent 0%, #6FF3C9 50%, transparent 100%)',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        gridpulse: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.6' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.6' },
          '97%': { opacity: '1' },
        },
        arcpulse: {
          '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.4)' },
        },
        arcspin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        arcspinreverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        driftfloat: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(12px, -18px)' },
        },
        blinkcursor: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        radarsweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        scanline: 'scanline 6s linear infinite',
        gridpulse: 'gridpulse 5s ease-in-out infinite',
        flicker: 'flicker 6s linear infinite',
        arcpulse: 'arcpulse 2.4s ease-in-out infinite',
        arcspin: 'arcspin 10s linear infinite',
        arcspinreverse: 'arcspinreverse 14s linear infinite',
        driftfloat: 'driftfloat 8s ease-in-out infinite',
        blinkcursor: 'blinkcursor 1s step-end infinite',
        radarsweep: 'radarsweep 4s linear infinite',
      },
    },
  },
  plugins: [],
}
