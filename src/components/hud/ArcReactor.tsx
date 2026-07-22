import React from 'react';

interface ArcReactorProps {
  size?: number;
  className?: string;
}

const ArcReactor: React.FC<ArcReactorProps> = ({ size = 64, className = '' }) => {
  const t = {
    outer: 'border-bio-aqua/50',
    middle: 'border-bio-violet/70',
    core: 'bg-gradient-to-br from-bio-aqua via-bio-violet to-bio-aqua shadow-[0_0_18px_rgba(111,243,201,0.8)]',
  };

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        className={`absolute inset-0 rounded-full border-2 animate-arcspin ${t.outer}`}
        style={{ borderStyle: 'dashed' }}
      />
      {/* Middle ring */}
      <div className={`absolute inset-[15%] rounded-full border animate-arcspinreverse ${t.middle}`} />
      {/* Core */}
      <div className={`absolute inset-[32%] rounded-full animate-arcpulse ${t.core}`} />
      <div className="absolute inset-[42%] rounded-full bg-ivory/90" />
    </div>
  );
};

export default ArcReactor;
