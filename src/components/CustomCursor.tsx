import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor: a tight dot that tracks the pointer exactly, and a
 * lagging ring (rAF-damped) that grows and shifts color over interactive
 * elements. Desktop-only (pointer: fine) — never replaces the native
 * cursor on touch devices.
 */
const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotRef.current?.style.setProperty('transform', `translate3d(${mouseX}px, ${mouseY}px, 0)`);

      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest('a, button, [role="button"]'));
    };

    let rafId: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ringRef.current?.style.setProperty('transform', `translate3d(${ringX}px, ${ringY}px, 0)`);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const handleDown = () => setClicked(true);
    const handleUp = () => setClicked(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.body.classList.add('cursor-none');

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.body.classList.remove('cursor-none');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* No mix-blend-mode: it forces expensive compositing against the
          actively-redrawing WebGL canvas underneath, which read as cursor
          lag on a scene this GPU-heavy. Solid colors instead — same look
          against the dark world, just without the compositing cost. */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10001] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-bio-aqua pointer-events-none"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[10001] rounded-full border pointer-events-none transition-[width,height,border-color] duration-200 ${
          isPointer ? 'w-12 h-12 -ml-6 -mt-6 border-bio-violet' : 'w-8 h-8 -ml-4 -mt-4 border-bio-aqua/70'
        } ${clicked ? 'scale-75' : 'scale-100'}`}
      />
    </>
  );
};

export default CustomCursor;
