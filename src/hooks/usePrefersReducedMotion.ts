import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  // Starts false on both server and client's first render (no window on
  // the server) to keep hydration output identical, then corrects itself
  // client-side — same pattern as useIsDesktopViewport.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}
