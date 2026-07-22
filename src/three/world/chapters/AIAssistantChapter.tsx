import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHologramMaterial } from '../../shaders/HologramMaterial';
import GPUParticleField from '../../particles/GPUParticleField';

const ASSISTANT_Z = -89;

/**
 * Scene — AI Assistant. A procedural floating orb (no dedicated GLB —
 * built from the same hologram shader as everything else) with an
 * orbiting ring standing in for a voice waveform. The actual
 * "conversation" — greeting + command buttons — is a DOM overlay, see
 * AIAssistantStage.tsx.
 */
const AIAssistantChapter: React.FC = () => {
  const orbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const orbMaterial = useHologramMaterial({ color: '#6FF3C9', fresnelPower: 1.8, scanlineFreq: 20, opacity: 0.9 });
  const ringMaterial = useHologramMaterial({ color: '#9B8CFF', fresnelPower: 0.5, scanlineFreq: 6, opacity: 0.6 });

  useFrame((state, delta) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.4;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
      orbRef.current.scale.setScalar(pulse);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group position={[0, 0.4, ASSISTANT_Z]}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <primitive object={orbMaterial} attach="material" />
      </mesh>
      <pointLight color="#6FF3C9" intensity={2.5} distance={3.5} />

      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.012, 8, 64]} />
          <primitive object={ringMaterial} attach="material" />
        </mesh>
      </group>

      <GPUParticleField count={120} radius={1.6} color="#9B8CFF" size={12} />
    </group>
  );
};

export default AIAssistantChapter;
