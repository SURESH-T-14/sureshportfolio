interface WorldStageProps {
  id: string;
  heightVh: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * DOM scroll anchor for a 'stage'-mode chapter (see useWorldStore's
 * CHAPTERS): a tall wrapper whose height sets how much scroll distance the
 * camera choreography for this scene gets, with a `sticky` inner
 * viewport-height frame so the WorldCanvas — and any HUD overlay content
 * passed as children — stays pinned in view while the user scrolls through it.
 */
const WorldStage: React.FC<WorldStageProps> = ({ id, heightVh, className = '', children }) => (
  <section id={id} style={{ height: `${heightVh}vh` }} className="relative text-signal-white">
    <div className={`sticky top-0 h-screen overflow-hidden flex items-center ${className}`}>
      {children}
    </div>
  </section>
);

export default WorldStage;
