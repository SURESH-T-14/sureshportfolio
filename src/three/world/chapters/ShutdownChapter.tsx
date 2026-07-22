import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, PointLight } from 'three';
import { IronManHelmetModel } from '../../models';
import { useWorldStore, chapterProgress, CHAPTERS } from '../../../stores/useWorldStore';

const SHUTDOWN_CHAPTER = CHAPTERS.find((c) => c.id === 'shutdown')!;
// Kept well clear of Observation Deck's skyline blocks (max reach ~z=-101,
// see ObservationDeckChapter.tsx) with extra headroom on top of that.
const SHUTDOWN_Z = -120;

// The eyes flicker to life one last time (ramping up over the first 12% of
// the chapter) before powering down for good over the rest of it — not a
// monotonic fade from already-lit, so the closing beat reads as a
// deliberate "one final activation" rather than just dimming out.
const FLICKER_ON_FRACTION = 0.12;

/**
 * Scene — Shutdown. The helmet returns one last time, its eyes flickering
 * on before fading out for good — a full "walk back and power down every
 * earlier room" sequence isn't wired here (each scene's lights live in
 * that scene's own chapter component, not a shared power-state store),
 * but this closing beat plus the fade-to-black DOM overlay (see
 * ShutdownStage.tsx) carries the same emotional close.
 */
const ShutdownChapter: React.FC = () => {
  const helmetRef = useRef<Group>(null);
  const lightRef = useRef<PointLight>(null);

  const progress = useWorldStore((s) => chapterProgress(s.globalProgress, SHUTDOWN_CHAPTER));

  useFrame((state, delta) => {
    if (helmetRef.current) {
      helmetRef.current.rotation.y += delta * 0.1;
    }
    if (lightRef.current) {
      const flicker = 1.4 + Math.sin(state.clock.elapsedTime * 9) * 0.4;
      const envelope =
        progress < FLICKER_ON_FRACTION
          ? progress / FLICKER_ON_FRACTION
          : Math.max(0, 1 - (progress - FLICKER_ON_FRACTION) / (1 - FLICKER_ON_FRACTION));
      lightRef.current.intensity = flicker * envelope;
    }
  });

  return (
    <group position={[0, 0.2, SHUTDOWN_Z]}>
      <group ref={helmetRef}>
        <IronManHelmetModel scale={1.4} />
      </group>
      <pointLight ref={lightRef} position={[0, 0, 0.35]} color="#6FF3C9" intensity={0} distance={2} />
    </group>
  );
};

export default ShutdownChapter;
