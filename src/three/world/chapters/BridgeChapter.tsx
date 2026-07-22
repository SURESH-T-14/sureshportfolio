import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { useHologramMaterial } from '../../shaders/HologramMaterial';
import GPUParticleField from '../../particles/GPUParticleField';
import { BridgeModel } from '../../models';
import { useWorldStore, chapterProgress, CHAPTERS } from '../../../stores/useWorldStore';

const BRIDGE_CHAPTER = CHAPTERS.find((c) => c.id === 'bridge')!;
const BRIDGE_Z = -41;

/**
 * Scene — Holographic Bridge. The bridge doesn't exist until the camera
 * approaches: it scales up from nothing as chapter-local progress rises,
 * with a particle field standing in for a glowing chasm below (rather than
 * reusing a full reactor model at this scale/distance).
 */
const BridgeChapter: React.FC = () => {
  const bridgeRef = useRef<Group>(null);
  const glowMaterial = useHologramMaterial({ color: '#6FF3C9', fresnelPower: 1, scanlineFreq: 6, opacity: 0.5 });

  const assembly = useWorldStore((s) => chapterProgress(s.globalProgress, BRIDGE_CHAPTER));

  useFrame(() => {
    if (bridgeRef.current) {
      const scale = 0.05 + Math.min(1, assembly * 1.4) * 0.95;
      bridgeRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, -1.2, BRIDGE_Z]}>
      <group ref={bridgeRef}>
        <BridgeModel />
      </group>

      {/* Glowing chasm floor, far below */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 32]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      <pointLight position={[0, -1, 0]} intensity={2} color="#6FF3C9" distance={5} />
      <pointLight position={[0, 1.2, 0]} intensity={1} color="#9B8CFF" distance={4} />
      <GPUParticleField count={180} radius={2.5} color="#9B8CFF" size={16} />
    </group>
  );
};

export default BridgeChapter;
