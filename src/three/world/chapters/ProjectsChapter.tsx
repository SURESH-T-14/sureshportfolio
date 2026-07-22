import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHologramMaterial } from '../../shaders/HologramMaterial';
import GPUParticleField from '../../particles/GPUParticleField';
import { HoloDisplayModel } from '../../models';
import { useWorldStore, chapterProgress, CHAPTERS } from '../../../stores/useWorldStore';
import { projects } from '../../../lib/projects';

const PROJECTS_CHAPTER = CHAPTERS.find((c) => c.id === 'projects')!;
const PROJECT_COUNT = projects.length;

interface ProjectAnchorProps {
  index: number;
  position: [number, number, number];
  color: string;
}

/**
 * One real-project "hologram terminal": the holo-display GLB plus a
 * glowing ring, scaling up and brightening when it's the scroll-active
 * project (see Projects.tsx for the matching DOM content panel) and
 * further on direct pointer hover. Clicking it opens the project's live
 * demo (falling back to its GitHub repo when there's no live link yet).
 */
const ProjectAnchor: React.FC<ProjectAnchorProps> = ({ index, position, color }) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const ringMaterial = useHologramMaterial({ color, fresnelPower: 0.6, scanlineFreq: 10, opacity: 1 });
  const project = projects[index];

  const isActive = useWorldStore((s) => {
    const local = chapterProgress(s.globalProgress, PROJECTS_CHAPTER);
    const activeIndex = Math.min(PROJECT_COUNT - 1, Math.floor(local * PROJECT_COUNT));
    return activeIndex === index;
  });

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (hovered ? 0.5 : 0.15);
    const targetScale = isActive ? (hovered ? 1.15 : 1.05) : 0.82;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        const url = project.live !== '#' ? project.live : project.github;
        window.open(url, '_blank', 'noopener,noreferrer');
      }}
    >
      <HoloDisplayModel />

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.32, 0]}>
        <torusGeometry args={[0.65, 0.03, 16, 64]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>
      {isActive && <pointLight color={color} intensity={hovered ? 2.2 : 1.4} distance={2.5} />}
      {isActive && <GPUParticleField count={70} radius={0.85} color={color} size={14} />}
    </group>
  );
};

// World-space anchors the camera flies to, one per project, evenly spread
// left-to-right — kept aligned with the lookX targets generated in
// CameraTimeline for the Projects chapter (same spacing formula).
const PROJECT_ANCHORS: { position: [number, number, number]; color: string }[] = projects.map((_, i) => {
  const spread = (i - (projects.length - 1) / 2) * 1.3;
  return {
    position: [spread, i % 2 === 0 ? 0 : -0.15, -0.3],
    color: i % 2 === 0 ? '#6FF3C9' : '#9B8CFF',
  };
});

const ProjectsChapter: React.FC = () => (
  <group position={[0, 0, -73]}>
    {PROJECT_ANCHORS.map((anchor, i) => (
      <ProjectAnchor key={i} index={i} position={anchor.position} color={anchor.color} />
    ))}
    <GPUParticleField count={220} radius={3.5} color="#6FF3C9" size={20} />
  </group>
);

export default ProjectsChapter;
