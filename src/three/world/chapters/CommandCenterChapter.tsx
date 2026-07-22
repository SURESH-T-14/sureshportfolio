import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { useHologramMaterial } from '../../shaders/HologramMaterial';
import GPUParticleField from '../../particles/GPUParticleField';
import { CommandCenterModel, ConsoleModel, DroneModel, RobotArmModel, DataCubeModel } from '../../models';

interface HoloPanelProps {
  position: [number, number, number];
  rotationY?: number;
  color: string;
}

const HoloPanel: React.FC<HoloPanelProps> = ({ position, rotationY = 0, color }) => {
  const material = useHologramMaterial({ color, fresnelPower: 1.1, scanlineFreq: 14, opacity: 0.85 });
  return (
    <mesh position={position} rotation={[0, rotationY, 0]}>
      <planeGeometry args={[0.9, 0.55]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

/**
 * Scene — AI Command Center. Set-dressing (console, drone, robot arm)
 * arranged inside the command-center shell; the camera pans across it per
 * CameraTimeline's 'command-center' block. Server racks have their own
 * dedicated Server Core scene further along.
 */
const CommandCenterChapter: React.FC = () => {
  const droneRef = useRef<Group>(null);
  const armRef = useRef<Group>(null);
  const cubeRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (droneRef.current) {
      droneRef.current.position.y = 1.05 + Math.sin(state.clock.elapsedTime * 0.6) * 0.07;
      droneRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.25 - Math.PI / 4;
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta * 0.4;
      cubeRef.current.rotation.x += delta * 0.15;
      cubeRef.current.position.y = 0.9 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    }
  });

  return (
    <group position={[0, -0.6, -49]}>
      <CommandCenterModel position={[0, 0, 0]} />
      <ConsoleModel position={[0, 0, 1]} rotation={[0, Math.PI, 0]} />

      <group ref={armRef} position={[2.6, 0, -0.6]}>
        <RobotArmModel />
      </group>

      <group ref={droneRef} position={[0.4, 1.05, -0.4]}>
        <DroneModel />
        <pointLight color="#9B8CFF" intensity={0.8} distance={2.5} />
      </group>

      {/* Live data cache — a floating crystal data cube on the console */}
      <group ref={cubeRef} position={[0, 0.9, 1.15]}>
        <DataCubeModel scale={0.4} />
        <pointLight color="#6FF3C9" intensity={0.6} distance={1.5} />
      </group>

      <HoloPanel position={[-1.1, 1.25, 0.7]} rotationY={Math.PI / 8} color="#6FF3C9" />
      <HoloPanel position={[1.1, 1.35, 0.5]} rotationY={-Math.PI / 8} color="#9B8CFF" />

      <pointLight position={[0, 1.7, 1.2]} intensity={1.5} color="#6FF3C9" distance={5.5} />
      <GPUParticleField count={180} radius={3.6} color="#9B8CFF" size={18} />
    </group>
  );
};

export default CommandCenterChapter;
