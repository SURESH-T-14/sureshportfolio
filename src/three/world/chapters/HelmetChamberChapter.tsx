import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { IronManHelmetModel } from '../../models';
import { useWorldStore, chapterProgress, CHAPTERS } from '../../../stores/useWorldStore';

const HELMET_CHAPTER = CHAPTERS.find((c) => c.id === 'helmet')!;
const EYE_COLOR_DIM = '#6FF3C9'; // aqua
const EYE_COLOR_BRIGHT = '#F3F1FF'; // white

/**
 * Scene — Helmet Chamber. The helmet itself is static (no rotation/bob —
 * the camera does the work, dollying straight in per CameraTimeline's
 * 'helmet' block). The eyes shift from a dim aqua to a bright white glow
 * as the chapter's scroll progress rises, i.e. as the camera gets closer.
 */
const HelmetChamberChapter: React.FC = () => {
  const eyeLightRef = useRef<THREE.PointLight>(null);
  const power = useRef(0);
  const colorDim = useMemo(() => new THREE.Color(EYE_COLOR_DIM), []);
  const colorBright = useMemo(() => new THREE.Color(EYE_COLOR_BRIGHT), []);
  const eyeColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const local = chapterProgress(useWorldStore.getState().globalProgress, HELMET_CHAPTER);
    power.current += (local - power.current) * Math.min(1, delta * 2.5);

    if (eyeLightRef.current) {
      eyeLightRef.current.intensity = 0.4 + power.current * 2.4;
      eyeColor.lerpColors(colorDim, colorBright, power.current);
      eyeLightRef.current.color.copy(eyeColor);
    }
  });

  return (
    <group position={[0, -0.4, -17]}>
      <group position={[0, 0.9, 0]}>
        <IronManHelmetModel />
        <pointLight ref={eyeLightRef} position={[0, 0, 0.35]} color={EYE_COLOR_DIM} intensity={0.4} distance={2.2} />
      </group>

      {/* Dialed back from 4 — at full brightness it washed out the eye glow
          entirely, since a bright white spotlight flooding the whole
          helmet drowns out a much smaller, dimmer point light. */}
      <spotLight
        position={[0, 3, 0.5]}
        target-position={[0, 0.9, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        color="#F3F1FF"
        distance={5}
      />
    </group>
  );
};

export default HelmetChamberChapter;
