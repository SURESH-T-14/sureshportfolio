import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHologramMaterial } from '../../shaders/HologramMaterial';
import GPUParticleField from '../../particles/GPUParticleField';
import { DataCubeModel } from '../../models';

const NODE_COUNT = 8;
const NETWORK_Z = -81;

/**
 * Scene — Global Network. Stand-in for a holographic globe (no dedicated
 * globe GLB exists yet): repo nodes as small data cubes orbiting a central
 * hologram core in a ring, connected by lines — reads as "a live network,"
 * not a literal planet.
 */
const GlobalNetworkChapter: React.FC = () => {
  const ringRef = useRef<THREE.Group>(null);
  const coreMaterial = useHologramMaterial({ color: '#6FF3C9', fresnelPower: 1.2, scanlineFreq: 10, opacity: 0.9 });

  const nodeAngles = useMemo(() => Array.from({ length: NODE_COUNT }, (_, i) => (i / NODE_COUNT) * Math.PI * 2), []);

  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const a = nodeAngles[i];
      const b = nodeAngles[(i + 2) % NODE_COUNT];
      positions.push(Math.cos(a) * 1.8, 0, Math.sin(a) * 1.8, Math.cos(b) * 1.8, 0, Math.sin(b) * 1.8);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geo;
  }, [nodeAngles]);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group position={[0, 0.3, NETWORK_Z]}>
      {/* Central core */}
      <mesh>
        <icosahedronGeometry args={[0.4, 2]} />
        <primitive object={coreMaterial} attach="material" />
      </mesh>
      <pointLight color="#6FF3C9" intensity={2} distance={4} />

      <group ref={ringRef}>
        {nodeAngles.map((angle, i) => (
          <group key={i} position={[Math.cos(angle) * 1.8, 0, Math.sin(angle) * 1.8]}>
            <DataCubeModel scale={0.25} />
          </group>
        ))}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#9B8CFF" transparent opacity={0.35} />
        </lineSegments>
      </group>

      <GPUParticleField count={180} radius={3} color="#9B8CFF" size={16} />
    </group>
  );
};

export default GlobalNetworkChapter;
