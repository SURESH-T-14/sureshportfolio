import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { useWorldStore } from '../../stores/useWorldStore';
import { skillCategories } from '../../lib/skills';
import { projects } from '../../lib/projects';

interface CameraKeyframeState {
  x: number;
  y: number;
  z: number;
  lookX: number;
  lookY: number;
  lookZ: number;
  fov: number;
}

// Higher = snappier/less floaty follow. Used as an exponential-decay rate
// (frame-rate independent), not a flat per-frame lerp fraction.
const CAMERA_FOLLOW_SPEED = 4.5;

/**
 * Cinematic camera choreography for the whole world. A GSAP timeline
 * (duration 1 == full page) defines position/lookAt/fov keyframes; instead
 * of letting GSAP/ScrollTrigger own the scroll listener, it's scrubbed
 * manually via timeline.progress(globalProgress) inside useFrame — avoiding
 * two systems fighting over the same scroll — then damped onto the live
 * camera for extra smoothness on top of Lenis's own easing.
 *
 * Keyframe timing mirrors useWorldStore's CHAPTERS array; each scene's
 * geometry lives at a fixed, well-separated Z "slot" (see the per-chapter
 * files under three/world/chapters/) so keyframes here just move the
 * camera between those slots. Positions are a first pass — expect to nudge
 * them once you've actually seen the render.
 */
const CameraTimeline: React.FC = () => {
  const { camera } = useThree();
  const target = useRef<CameraKeyframeState>({
    x: 0,
    y: 0.4,
    z: 9,
    lookX: 0,
    lookY: 0.2,
    lookZ: -4,
    fov: 55,
  });

  const timeline = useMemo(() => {
    const tl = gsap.timeline({ paused: true });
    const s = target.current;
    const ease = 'power1.inOut';

    // --- Tunnel (0 -> 0.055) — Security Corridor flythrough ---
    tl.to(s, { x: 0, y: 0.3, z: 5.5, lookX: 0, lookY: 0.15, lookZ: -3, fov: 50, duration: 0.0275, ease }, 0);
    tl.to(s, { x: 0, y: 0.2, z: 2, lookX: 0, lookY: 0.1, lookZ: -6, fov: 42, duration: 0.0275, ease }, 0.0275);

    // --- Elevator (0.055 -> 0.10) — enclosed lift; shake applied in useFrame below ---
    tl.to(s, { x: 0, y: 0.3, z: -7.3, lookX: 0, lookY: 0.5, lookZ: -9, fov: 45, duration: 0.023, ease }, 0.055);
    tl.to(s, { x: 0.15, y: 0.5, z: -9, lookX: 0, lookY: 0.6, lookZ: -9.6, fov: 40, duration: 0.022, ease }, 0.078);

    // --- Helmet Chamber (0.10 -> 0.16) — one continuous straight dolly-in,
    // not an orbit (fromTo so it doesn't inherit whatever state the
    // Elevator block left behind, giving a fully deterministic, slow,
    // single move rather than several quick arcing keyframes) ---
    tl.fromTo(
      s,
      { x: 0, y: 0.65, z: -12, lookX: 0, lookY: 0.5, lookZ: -17, fov: 48 },
      { x: 0, y: 0.5, z: -15, lookX: 0, lookY: 0.5, lookZ: -17, fov: 36, duration: 0.06, ease: 'power1.inOut' },
      0.1
    );

    // --- About (0.16 -> 0.205) — flow content, gentle drift toward the
    // Reactor. Kept in the clear gap between Helmet (z=-17) and Reactor
    // (z=-25) — this used to sit close enough to the helmet's own geometry
    // (z=-19) to read as an ugly extreme close-up on it mid-transition ---
    tl.to(s, { x: 0.6, y: 0.5, z: -20, lookX: 0, lookY: 0.3, lookZ: -21.5, fov: 46, duration: 0.023, ease }, 0.16);
    tl.to(s, { x: -0.6, y: 0.4, z: -22, lookX: 0, lookY: 0.3, lookZ: -23, fov: 46, duration: 0.022, ease }, 0.183);

    // --- Arc Reactor Chamber (0.205 -> 0.275) — the first big "wow" ---
    tl.to(s, { x: 1.6, y: 0.5, z: -23.8, lookX: 0, lookY: 0, lookZ: -25, fov: 40, duration: 0.023, ease }, 0.205);
    tl.to(s, { x: -1.6, y: 0.4, z: -23.6, lookX: 0, lookY: 0, lookZ: -25, fov: 40, duration: 0.024, ease }, 0.228);
    tl.to(s, { x: 0, y: 0.6, z: -22.8, lookX: 0, lookY: 0.1, lookZ: -25, fov: 38, duration: 0.023, ease }, 0.252);

    // --- Energy Pillar Hall (0.275 -> 0.335) — pillars light up in sequence ---
    tl.to(s, { x: 2, y: 0.5, z: -31.5, lookX: 0, lookY: 0.3, lookZ: -33, fov: 44, duration: 0.02, ease }, 0.275);
    tl.to(s, { x: 0, y: 0.9, z: -30.5, lookX: 0, lookY: 0.4, lookZ: -33, fov: 40, duration: 0.02, ease }, 0.295);
    tl.to(s, { x: -2, y: 0.5, z: -31.5, lookX: 0, lookY: 0.3, lookZ: -33, fov: 44, duration: 0.02, ease }, 0.315);

    // --- Holographic Bridge (0.335 -> 0.385) — self-assembles, camera crosses ---
    tl.to(s, { x: 0, y: 0.3, z: -39, lookX: 0, lookY: -0.5, lookZ: -41, fov: 44, duration: 0.017, ease }, 0.335);
    tl.to(s, { x: 0.3, y: 0.15, z: -41, lookX: 0, lookY: -0.8, lookZ: -42, fov: 40, duration: 0.017, ease }, 0.352);
    tl.to(s, { x: -0.3, y: 0.2, z: -42.7, lookX: 0, lookY: -1, lookZ: -44, fov: 40, duration: 0.016, ease }, 0.369);

    // --- Command Center (0.385 -> 0.455) — pan across the room ---
    tl.to(s, { x: -2.4, y: 0.5, z: -46.8, lookX: -2, lookY: 0.2, lookZ: -50, fov: 42, duration: 0.023, ease }, 0.385);
    tl.to(s, { x: 0, y: 0.8, z: -46, lookX: 0, lookY: 0.1, lookZ: -50, fov: 44, duration: 0.024, ease }, 0.408);
    tl.to(s, { x: 2.4, y: 0.4, z: -46.8, lookX: 2, lookY: 0.1, lookZ: -50, fov: 42, duration: 0.023, ease }, 0.432);

    // --- AI Research Lab (0.455 -> 0.525) — one vantage per skill card,
    // matching the active data cube (see LabChapter.tsx / Skills.tsx,
    // which compute the same activeIndex from the same chapter range) ---
    {
      const labStart = 0.455;
      const labSpan = 0.525 - 0.455;
      const dur = labSpan / skillCategories.length;
      for (let i = 0; i < skillCategories.length; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        tl.to(
          s,
          {
            x: side * (0.9 + (i % 3) * 0.25),
            y: 0.55 + (i % 4) * 0.18,
            z: -54.4,
            lookX: 0,
            lookY: 0.9,
            lookZ: -57,
            fov: 37,
            duration: dur,
            ease,
          },
          labStart + i * dur
        );
      }
    }

    // --- Server Core (0.525 -> 0.575) — the row of racks ---
    tl.to(s, { x: -3, y: 0.6, z: -63, lookX: -2.2, lookY: 0.8, lookZ: -66, fov: 42, duration: 0.017, ease }, 0.525);
    tl.to(s, { x: 0, y: 0.9, z: -62, lookX: 0, lookY: 0.8, lookZ: -66, fov: 40, duration: 0.017, ease }, 0.542);
    tl.to(s, { x: 3, y: 0.6, z: -63, lookX: 2.2, lookY: 0.8, lookZ: -66, fov: 42, duration: 0.016, ease }, 0.559);

    // --- Project Hangar (0.575 -> 0.675) — one vantage per project, x
    // spread matching ProjectsChapter's PROJECT_ANCHORS formula ---
    {
      const hangarStart = 0.575;
      const hangarSpan = 0.675 - 0.575;
      const dur = hangarSpan / projects.length;
      for (let i = 0; i < projects.length; i++) {
        const spread = (i - (projects.length - 1) / 2) * 1.3;
        tl.to(
          s,
          {
            x: spread * 1.4,
            y: i % 2 === 0 ? 0.15 : -0.2,
            z: -68.8,
            lookX: spread,
            lookY: 0,
            lookZ: -73.3,
            fov: 40,
            duration: dur,
            ease,
          },
          hangarStart + i * dur
        );
      }
    }

    // --- Global Network (0.675 -> 0.725) — orbiting nodes ---
    tl.to(s, { x: 2, y: 0.6, z: -78, lookX: 0, lookY: 0.3, lookZ: -81, fov: 42, duration: 0.017, ease }, 0.675);
    tl.to(s, { x: 0, y: 0.9, z: -77, lookX: 0, lookY: 0.4, lookZ: -81, fov: 38, duration: 0.017, ease }, 0.692);
    tl.to(s, { x: -2, y: 0.6, z: -78, lookX: 0, lookY: 0.3, lookZ: -81, fov: 42, duration: 0.016, ease }, 0.709);

    // --- AI Assistant (0.725 -> 0.775) — the orb ---
    tl.to(s, { x: 1.2, y: 0.6, z: -86.4, lookX: 0, lookY: 0.4, lookZ: -89, fov: 38, duration: 0.017, ease }, 0.725);
    tl.to(s, { x: 0, y: 0.8, z: -86, lookX: 0, lookY: 0.4, lookZ: -89, fov: 34, duration: 0.017, ease }, 0.742);
    tl.to(s, { x: -1.2, y: 0.6, z: -86.4, lookX: 0, lookY: 0.4, lookZ: -89, fov: 38, duration: 0.016, ease }, 0.759);

    // --- Experience/Certificates/Contact (0.775 -> 0.91) — flow content, ambient drift ---
    tl.to(s, { x: -1, y: 0.5, z: -91, lookX: 0, lookY: 0.2, lookZ: -93, fov: 46, duration: 0.045, ease }, 0.775);
    tl.to(s, { x: 1, y: 0.4, z: -93, lookX: 0, lookY: 0.2, lookZ: -95, fov: 46, duration: 0.045, ease }, 0.82);
    tl.to(s, { x: -0.5, y: 0.6, z: -95, lookX: 0, lookY: 0.2, lookZ: -97, fov: 46, duration: 0.045, ease }, 0.865);

    // --- Observation Deck (0.91 -> 0.96) — panoramic window (skyline
    // blocks reach to about z=-101, see ObservationDeckChapter.tsx) ---
    tl.to(s, { x: 0, y: 0.6, z: -95, lookX: 0, lookY: 0.3, lookZ: -100, fov: 58, duration: 0.025, ease }, 0.91);
    tl.to(s, { x: 0.5, y: 0.7, z: -95.5, lookX: 0, lookY: 0.35, lookZ: -100, fov: 60, duration: 0.025, ease }, 0.935);

    // --- Shutdown (0.96 -> 1.0) — the helmet returns at z=-120, camera
    // walks back, fade to black ---
    tl.to(s, { x: 0, y: 0.5, z: -118.5, lookX: 0, lookY: 0.2, lookZ: -120, fov: 36, duration: 0.02, ease }, 0.96);
    tl.to(s, { x: 0, y: 0.5, z: -115, lookX: 0, lookY: 0.2, lookZ: -120, fov: 40, duration: 0.02, ease }, 0.98);

    return tl;
  }, []);

  useFrame((_, delta) => {
    const progress = useWorldStore.getState().globalProgress;
    timeline.progress(progress);

    const s = target.current;
    // Exponential-decay smoothing driven by delta time, not a flat
    // per-frame fraction — a fixed `* 0.08` moves a different actual
    // distance depending on the frame rate at that instant, which reads as
    // bouncy/inconsistent motion whenever the frame rate isn't perfectly
    // steady (exactly the case in a scene this GPU-heavy). This converges
    // at the same *rate* regardless of how choppy the frame timing is.
    const t = 1 - Math.exp(-CAMERA_FOLLOW_SPEED * delta);
    camera.position.x += (s.x - camera.position.x) * t;
    camera.position.y += (s.y - camera.position.y) * t;
    camera.position.z += (s.z - camera.position.z) * t;

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov += (s.fov - camera.fov) * t;
      camera.updateProjectionMatrix();
    }

    camera.lookAt(s.lookX, s.lookY, s.lookZ);
  });

  return null;
};

export default CameraTimeline;
