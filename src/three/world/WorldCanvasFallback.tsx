/**
 * Shown instead of WorldCanvas on small viewports and when
 * prefers-reduced-motion is set — no WebGL context, just a soft ambient
 * glow in the same bioluminescent palette so mobile still feels intentional.
 */
const WorldCanvasFallback: React.FC = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-abyss" aria-hidden="true">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-xl max-h-xl rounded-full bg-bio-aqua/10 blur-[100px]" />
    <div className="absolute bottom-1/4 left-1/3 w-[40vw] h-[40vw] max-w-md max-h-md rounded-full bg-bio-violet/10 blur-[90px]" />
  </div>
);

export default WorldCanvasFallback;
