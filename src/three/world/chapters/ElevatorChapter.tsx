import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { useHologramMaterial } from '../../shaders/HologramMaterial';
import GPUParticleField from '../../particles/GPUParticleField';
import { ElevatorPlatformModel } from '../../models';

/**
 * Scene — AI Elevator. A small enclosed lift: the platform plus three
 * hologram-lit "walls" (there's no dedicated elevator-shaft GLB, so the
 * enclosure is procedural) and a destination readout. The wall facing the
 * exit direction (-Z, toward the Helmet Chamber next) is deliberately left
 * open — "the doors open" — since the camera flies straight through that
 * point on its way there; leaving a solid panel there meant it had to fly
 * through a big translucent quad, which read as clipping into a glowing box.
 */
const ElevatorChapter: React.FC = () => {
  const readoutRef = useRef<Mesh>(null);
  const wallMaterial = useHologramMaterial({ color: '#6FF3C9', fresnelPower: 1.4, scanlineFreq: 22, opacity: 0.35 });
  const readoutMaterial = useHologramMaterial({ color: '#9B8CFF', fresnelPower: 0.8, scanlineFreq: 12, opacity: 0.95 });

  useFrame((state) => {
    if (readoutRef.current) {
      readoutRef.current.position.y = 0.9 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
    }
  });

  return (
    <group position={[0, -0.3, -9]}>
      <ElevatorPlatformModel position={[0, -0.4, 0]} />

      {/* Three enclosing wall panels — back + left + right. The fourth
          (exit-facing, -Z) is intentionally omitted — see comment above. */}
      {[
        { pos: [0, 0.6, 0.9] as [number, number, number], rot: [0, Math.PI, 0] as [number, number, number] },
        { pos: [-0.9, 0.6, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number] },
        { pos: [0.9, 0.6, 0] as [number, number, number], rot: [0, -Math.PI / 2, 0] as [number, number, number] },
      ].map((wall, i) => (
        <mesh key={i} position={wall.pos} rotation={wall.rot}>
          <planeGeometry args={[1.8, 2.2]} />
          <primitive object={wallMaterial} attach="material" />
        </mesh>
      ))}

      {/* Destination readout */}
      <mesh ref={readoutRef} position={[0, 0.9, 0.85]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1, 0.4]} />
        <primitive object={readoutMaterial} attach="material" />
      </mesh>

      <pointLight position={[0, 1.4, 0]} intensity={1.4} color="#9B8CFF" distance={3} />
      <GPUParticleField count={70} radius={1} color="#6FF3C9" size={12} />
    </group>
  );
};

export default ElevatorChapter;
