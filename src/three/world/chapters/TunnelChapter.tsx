import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { useHologramMaterial } from '../../shaders/HologramMaterial';
import GPUParticleField from '../../particles/GPUParticleField';
import { CorridorModel, EnergyPillarModel } from '../../models';

const PILLAR_Z_POSITIONS = [3, 0.5, -2, -4.5];

/**
 * Scene 1 — Energy Tunnel. The camera flies forward through this corridor
 * (CameraTimeline's 0 -> 0.10 keyframes); looping light-strip rods and
 * drifting particles sell the sense of forward motion.
 */
const TunnelChapter: React.FC = () => {
  const stripsRef = useRef<Group>(null);
  const stripMaterial = useHologramMaterial({
    color: '#6FF3C9',
    fresnelPower: 0.5,
    scanlineFreq: 26,
    opacity: 0.9,
  });

  useFrame((_, delta) => {
    if (!stripsRef.current) return;
    stripsRef.current.position.z += delta * 0.8;
    if (stripsRef.current.position.z > 4) stripsRef.current.position.z -= 8;
  });

  return (
    <group position={[0, -0.2, -1]}>
      <CorridorModel position={[0, -0.3, 0]} />

      {/* Energy pillars planted along the flight path, flanking both walls */}
      {PILLAR_Z_POSITIONS.map((z) => (
        <group key={z}>
          <EnergyPillarModel position={[-1.3, -0.3, z]} scale={2.2} />
          <EnergyPillarModel position={[1.3, -0.3, z]} scale={2.2} />
        </group>
      ))}

      {/* Looping light-strip rods along both walls */}
      <group ref={stripsRef}>
        {[-1.05, 1.05].map((x) => (
          <mesh key={x} position={[x, 0.15, 0]}>
            <boxGeometry args={[0.035, 0.035, 8]} />
            <primitive object={stripMaterial} attach="material" />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 0.4, 3]} intensity={1.2} color="#6FF3C9" distance={6} />
      <GPUParticleField count={200} radius={2.4} color="#6FF3C9" size={16} />
    </group>
  );
};

export default TunnelChapter;
