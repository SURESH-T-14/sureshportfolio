import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useBootStore } from '../../stores/useBootStore';
import { profile } from '../../lib/profile';

const SESSION_KEY = 'portfolio-booted';
const COUNT_DURATION = 2.2;

const BootSequence: React.FC = () => {
  const complete = useBootStore((s) => s.complete);
  const skip = useBootStore((s) => s.skip);

  // null = not yet decided. Stays null through the server render and the
  // client's first paint (no window there either) so hydration output
  // matches exactly, then resolves in the mount effect below — the only
  // place it's safe to touch matchMedia/sessionStorage.
  const [shouldBoot, setShouldBoot] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const skipIntro = () => {
    timelineRef.current?.kill();
    const container = containerRef.current;
    if (!container) {
      skip();
      return;
    }
    gsap.to(container, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setVisible(false);
        skip();
      },
    });
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const boot = !reducedMotion && !sessionStorage.getItem(SESSION_KEY);
    setShouldBoot(boot);
    setVisible(boot);
  }, []);

  useEffect(() => {
    if (shouldBoot === null) return;
    if (!shouldBoot) {
      complete();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, '1');

    const skipTimer = setTimeout(() => setCanSkip(true), 900);
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        complete();
      },
    });
    timelineRef.current = tl;

    if (progressRef.current) {
      tl.to(progressRef.current, { width: '100%', duration: COUNT_DURATION, ease: 'power2.inOut' }, 0);
    }
    tl.to(
      counter,
      {
        value: 100,
        duration: COUNT_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(counter.value)),
      },
      0
    );
    if (wordmarkRef.current) {
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        COUNT_DURATION - 0.5
      );
    }
    if (identityRef.current) {
      tl.fromTo(
        identityRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        COUNT_DURATION - 0.05
      );
    }
    tl.to({}, { duration: 1.2 });
    if (containerRef.current) {
      tl.to(containerRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' });
    }

    return () => {
      clearTimeout(skipTimer);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldBoot]);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') skipIntro();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-abyss flex flex-col items-center justify-center gap-10"
      onClick={() => canSkip && skipIntro()}
      role="button"
      tabIndex={-1}
      aria-label="Loading screen, click to skip"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          skipIntro();
        }}
        className="absolute top-8 right-8 font-data text-[11px] tracking-[0.2em] uppercase text-signal-white/50 hover:text-bio-aqua transition-colors"
      >
        Skip →
      </button>

      <div ref={wordmarkRef} className="opacity-0">
        <p className="font-kinetic font-semibold text-4xl md:text-6xl text-signal-white tracking-tight">Suresh</p>
      </div>

      <p className="font-kinetic font-semibold text-[18vw] md:text-[12rem] leading-none text-signal-white tabular-nums">
        {count}
        <span className="text-bio-aqua">%</span>
      </p>

      <div className="w-64 md:w-96">
        <div className="h-px w-full bg-signal-white/15 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-bio-aqua to-bio-violet"
            style={{ width: '0%' }}
          />
        </div>
      </div>

      <div
        ref={identityRef}
        className="opacity-0 font-data text-xs md:text-sm text-signal-white/70 text-center space-y-1.5"
      >
        <p className="text-bio-aqua tracking-[0.35em] uppercase text-[10px] mb-2">AI Personal Database</p>
        <p>
          <span className="text-signal-white/40">Name:</span> {profile.name}
        </p>
        <p>
          <span className="text-signal-white/40">Role:</span> {profile.role}
        </p>
        <p>
          <span className="text-signal-white/40">Location:</span> {profile.location}
        </p>
        <p>
          <span className="text-signal-white/40">Status:</span> <span className="text-bio-aqua">Online</span>
        </p>
      </div>

      {canSkip && (
        <p className="absolute bottom-8 font-data text-[10px] tracking-[0.2em] uppercase text-signal-white/30">
          Click anywhere or press Esc to skip
        </p>
      )}
    </div>
  );
};

export default BootSequence;
