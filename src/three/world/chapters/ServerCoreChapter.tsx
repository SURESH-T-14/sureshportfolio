import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import GPUParticleField from '../../particles/GPUParticleField';
import { ServerRackModel, DroneModel } from '../../models';

const RACK_POSITIONS: [number, number, number][] = [
  [-2.2, 0, -66],
  [-0.75, 0, -66],
  [0.75, 0, -66],
  [2.2, 0, -66],
];

/**
 * Scene — Server Core. A row of quantum server racks with a drone doing a
 * slow inspection pass along the row; cabling glow implied by the pulsing
 * point lights rather than a literal cable mesh.
 */
const ServerCoreChapter: React.FC = () => {
  const droneRef = useRef<Group>(null);

  useFrame((state) => {
    if (droneRef.current) {
      const t = state.clock.elapsedTime * 0.15;
      droneRef.current.position.x = Math.sin(t) * 3;
      droneRef.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
      droneRef.current.rotation.y = Math.cos(t) * 0.3;
    }
  });

  return (
    <group>
      {RACK_POSITIONS.map((pos, i) => (
        <group key={i}>
          <ServerRackModel position={pos} />
          <pointLight position={[pos[0], 1, pos[2]]} intensity={0.7} color="#6FF3C9" distance={2} />
        </group>
      ))}

      <group ref={droneRef} position={[0, 1.2, -65]}>
        <DroneModel />
        <pointLight color="#9B8CFF" intensity={1} distance={2} />
      </group>

      <pointLight position={[0, 1.5, -65]} intensity={1.2} color="#9B8CFF" distance={6} />
      <GPUParticleField count={140} radius={3.5} color="#6FF3C9" size={14} />
    </group>
  );
};

export default ServerCoreChapter;
