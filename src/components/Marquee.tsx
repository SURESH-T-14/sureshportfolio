interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

/**
 * Infinite horizontal ticker. The track is rendered twice back-to-back and
 * animated exactly -50% so the loop point is invisible. Reduced-motion is
 * handled by the site-wide override in index.css (same pattern as every
 * other looping animation in this codebase), not reimplemented here.
 */
const Marquee: React.FC<MarqueeProps> = ({ items, speed = 26, className = '' }) => {
  const track = (
    <div className="flex items-center shrink-0">
      {items.map((item, i) => (
        <span
          key={i}
          className="font-data text-sm md:text-base tracking-[0.15em] uppercase text-signal-white/50 whitespace-nowrap flex items-center"
        >
          {item}
          <span className="mx-8 text-bio-aqua">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="flex w-max animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {track}
        {track}
      </div>
    </div>
  );
};

export default Marquee;
