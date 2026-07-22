import { useMemo } from 'react';
import GPUParticleField from '../../particles/GPUParticleField';

const DECK_Z = -97;
const BUILDING_COUNT = 16;

/** A grounded, evenly-spaced skyline silhouette — building height/width varies, but position doesn't scatter randomly through 3D space the way it used to (which read as noise, not a skyline). */
const SkylineBlocks: React.FC = () => {
  const blocks = useMemo(
    () =>
      Array.from({ length: BUILDING_COUNT }, (_, i) => {
        const spread = 13;
        const x = -spread / 2 + (i / (BUILDING_COUNT - 1)) * spread + (Math.random() - 0.5) * 0.35;
        const h = 0.6 + Math.random() * 2.4;
        const w = 0.3 + Math.random() * 0.25;
        return {
          x,
          y: -1 + h / 2, // grounded on a common horizon line, rising upward
          z: DECK_Z - 3 + (Math.random() - 0.5) * 1.2,
          w,
          h,
          color: i % 3 === 0 ? '#9B8CFF' : '#6FF3C9',
        };
      }),
    []
  );

  return (
    <>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshBasicMaterial color={b.color} transparent opacity={0.55} />
        </mesh>
      ))}
    </>
  );
};

/**
 * Scene — Observation Deck. Stand-in for a full cyberpunk city environment
 * (no city/skybox asset exists yet): a grounded skyline silhouette plus the
 * existing GPU-shader particle field sell a calm panoramic-window moment
 * without a literal city model.
 */
const ObservationDeckChapter: React.FC = () => (
  <group>
    <SkylineBlocks />
    <pointLight position={[0, 1, DECK_Z]} intensity={0.6} color="#6FF3C9" distance={8} />
    <GPUParticleField count={220} radius={5} color="#9B8CFF" size={10} />
  </group>
);

export default ObservationDeckChapter;
