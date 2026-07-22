import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore, chapterProgress, CHAPTERS } from '../../../stores/useWorldStore';
import { EnergyPillarModel } from '../../models';

const PILLAR_HALL_CHAPTER = CHAPTERS.find((c) => c.id === 'pillar-hall')!;
const PILLAR_COUNT = 6;
const RADIUS = 2.6;

interface PillarProps {
  index: number;
  position: [number, number, number];
}

/** One pillar — its point light and emissive glow ramp in once scroll progress passes its activation threshold. */
const Pillar: React.FC<PillarProps> = ({ index, position }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const threshold = index / PILLAR_COUNT;

  const activation = useWorldStore((s) => {
    const local = chapterProgress(s.globalProgress, PILLAR_HALL_CHAPTER);
    return Math.min(1, Math.max(0, (local - threshold) * PILLAR_COUNT * 1.5));
  });

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.intensity = activation * 2.2;
    }
  });

  return (
    <group position={position}>
      <EnergyPillarModel />
      <pointLight ref={lightRef} position={[0, 1, 0]} color="#6FF3C9" distance={3} />
    </group>
  );
};

/**
 * Scene — Energy Pillar Hall. Six pillars arranged in a ring, each
 * activating in sequence as the chapter scrolls by; once all are lit, arcs
 * connect them and a beam fires off toward the Reactor Chamber behind.
 */
const PillarHallChapter: React.FC = () => {
  const arcMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  const pillarPositions = useMemo<[number, number, number][]>(() => {
    return Array.from({ length: PILLAR_COUNT }, (_, i) => {
      const angle = (i / PILLAR_COUNT) * Math.PI * 2;
      return [Math.cos(angle) * RADIUS, -0.4, Math.sin(angle) * RADIUS - 33];
    });
  }, []);

  const arcGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < PILLAR_COUNT; i++) {
      const a = pillarPositions[i];
      const b = pillarPositions[(i + 1) % PILLAR_COUNT];
      positions.push(a[0], a[1] + 1, a[2], b[0], b[1] + 1, b[2]);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geo;
  }, [pillarPositions]);

  const allLitOpacity = useWorldStore((s) => chapterProgress(s.globalProgress, PILLAR_HALL_CHAPTER));

  useFrame(() => {
    if (arcMaterialRef.current) {
      arcMaterialRef.current.opacity = Math.max(0, (allLitOpacity - 0.7) * 3);
    }
  });

  return (
    <group>
      {pillarPositions.map((pos, i) => (
        <Pillar key={i} index={i} position={pos} />
      ))}

      <lineSegments geometry={arcGeometry}>
        <lineBasicMaterial ref={arcMaterialRef} color="#9B8CFF" transparent opacity={0} />
      </lineSegments>

      <pointLight position={[0, 1.5, -33]} intensity={1} color="#6FF3C9" distance={6} />
    </group>
  );
};

export default PillarHallChapter;
