import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GPUParticleField from '../../particles/GPUParticleField';
import { LabModuleModel, EnergyPillarModel, DataCubeModel } from '../../models';
import { useWorldStore, chapterProgress, CHAPTERS } from '../../../stores/useWorldStore';
import { skillCategories } from '../../../lib/skills';

const LAB_CHAPTER = CHAPTERS.find((c) => c.id === 'lab')!;

// One position per skill category, generated (not hardcoded) so the cube
// count always matches skillCategories.length — cube[i] corresponds to
// Skills.tsx's active card i, and the two can never drift out of sync.
function generateCubePositions(count: number): [number, number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const radius = 1.1 + (i % 2) * 0.35;
    return [Math.cos(angle) * radius, 0.9 + (i % 3) * 0.3, Math.sin(angle) * radius * 0.6];
  });
}

interface DataCubeProps {
  position: [number, number, number];
  active: boolean;
}

const DataCube: React.FC<DataCubeProps> = ({ position, active }) => {
  const ref = useRef<THREE.Group>(null);
  const speed = 0.35 + Math.abs(position[0]) * 0.15;

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (active ? speed * 2.5 : speed);
    ref.current.rotation.x += delta * speed * 0.4;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.08;
    const targetScale = active ? 1.6 : 0.85;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
  });

  return (
    <group ref={ref} position={position}>
      <DataCubeModel scale={0.45} />
      <pointLight color="#6FF3C9" intensity={active ? 1.8 : 0.35} distance={active ? 2.5 : 1.2} />
    </group>
  );
};

/**
 * Scene — AI Research Lab. One floating data cube per skill category —
 * the active one (in sync with Skills.tsx's active card, both
 * driven by the same chapterProgress calculation) brightens, spins faster,
 * and grows; the rest sit dim in the background. Camera holds a vantage
 * per active cube per CameraTimeline's 'lab' block.
 */
const LabChapter: React.FC = () => {
  const activeIndex = useWorldStore((s) => {
    const local = chapterProgress(s.globalProgress, LAB_CHAPTER);
    return Math.min(skillCategories.length - 1, Math.floor(local * skillCategories.length));
  });
  const cubePositions = useMemo(() => generateCubePositions(skillCategories.length), []);

  return (
    <group position={[0, -0.6, -57]}>
      <LabModuleModel position={[0, 0, 0]} />

      {cubePositions.map((position, i) => (
        <DataCube key={i} position={position} active={i === activeIndex} />
      ))}

      <EnergyPillarModel position={[-1.6, 0, -0.6]} />
      <EnergyPillarModel position={[1.6, 0, -0.6]} />

      <pointLight position={[0, 1.6, -1.2]} intensity={1.2} color="#6FF3C9" distance={5} />
      <GPUParticleField count={160} radius={3} color="#9B8CFF" size={16} />
    </group>
  );
};

export default LabChapter;
