import React from 'react';

interface HudFrameProps {
  children: React.ReactNode;
  accent?: 'aqua' | 'violet';
  className?: string;
  clipSize?: 'sm' | 'md' | 'lg';
  sweep?: boolean;
}

const accentMap = {
  aqua: {
    border: 'border-bio-aqua/40 hover:border-bio-aqua',
    corner: 'border-bio-aqua',
    shadow: 'hover:shadow-[0_0_28px_rgba(111,243,201,0.25)]',
  },
  violet: {
    border: 'border-bio-violet/40 hover:border-bio-violet',
    corner: 'border-bio-violet',
    shadow: 'hover:shadow-[0_0_28px_rgba(155,140,255,0.25)]',
  },
};

const clipMap = {
  sm: 'clip-hud-sm',
  md: '',
  lg: 'clip-hud-lg',
};

const HudFrame: React.FC<HudFrameProps> = ({
  children,
  accent = 'aqua',
  className = '',
  clipSize = 'md',
  sweep = false,
}) => {
  const a = accentMap[accent];

  return (
    <div
      className={`group/hud relative hud-panel clip-hud ${clipMap[clipSize]} border transition-all duration-300 ${a.border} ${a.shadow} ${className}`}
    >
      {/* Corner brackets */}
      <span className={`pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${a.corner} opacity-70 group-hover/hud:opacity-100 transition-opacity`} />
      <span className={`pointer-events-none absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 ${a.corner} opacity-70 group-hover/hud:opacity-100 transition-opacity`} />
      <span className={`pointer-events-none absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 ${a.corner} opacity-70 group-hover/hud:opacity-100 transition-opacity`} />
      <span className={`pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${a.corner} opacity-70 group-hover/hud:opacity-100 transition-opacity`} />

      {sweep && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden clip-hud">
          <span className="absolute inset-x-0 -top-full h-1/2 bg-gradient-to-b from-transparent via-bio-aqua/10 to-transparent opacity-0 group-hover/hud:opacity-100 group-hover/hud:animate-scanline transition-opacity" />
        </span>
      )}

      {children}
    </div>
  );
};

export default HudFrame;
