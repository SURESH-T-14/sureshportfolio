import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CameraTimeline from './CameraTimeline';
import PostFX from './PostFX';
import VisibilityGate from './VisibilityGate';
import TunnelChapter from './chapters/TunnelChapter';
import ElevatorChapter from './chapters/ElevatorChapter';
import HelmetChamberChapter from './chapters/HelmetChamberChapter';
import ReactorChapter from './chapters/ReactorChapter';
import PillarHallChapter from './chapters/PillarHallChapter';
import BridgeChapter from './chapters/BridgeChapter';
import CommandCenterChapter from './chapters/CommandCenterChapter';
import LabChapter from './chapters/LabChapter';
import ServerCoreChapter from './chapters/ServerCoreChapter';
import ProjectsChapter from './chapters/ProjectsChapter';
import GlobalNetworkChapter from './chapters/GlobalNetworkChapter';
import AIAssistantChapter from './chapters/AIAssistantChapter';
import ObservationDeckChapter from './chapters/ObservationDeckChapter';
import ShutdownChapter from './chapters/ShutdownChapter';
import { preloadWorldModels } from '../models';

preloadWorldModels();

/**
 * One persistent, full-viewport canvas mounted once in page.tsx. All
 * chapter geometry coexists in the same world, each at its own well-
 * separated Z "slot" (see the per-chapter files) — CameraTimeline is what
 * makes it feel like a continuous journey between them rather than
 * separate scenes popping in and out. Each chapter is wrapped in
 * VisibilityGate so only the 1-2 scenes near the current scroll position
 * actually draw — with 14 scenes' worth of geometry otherwise coexisting,
 * rendering all of it every frame regardless of visibility was the single
 * biggest performance cost in this scene.
 */
const WorldCanvas: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#6FF3C9" />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color="#9B8CFF" />

      <Suspense fallback={null}>
        {/* Gives the GLB models' metallic/roughness materials something to
            reflect — without this they read flat no matter how many point
            lights are placed around them. background={false} (default)
            keeps our own abyss backdrop, only affects reflections/lighting. */}
        <Environment preset="night" />

        <VisibilityGate id="tunnel">
          <TunnelChapter />
        </VisibilityGate>
        <VisibilityGate id="elevator">
          <ElevatorChapter />
        </VisibilityGate>
        <VisibilityGate id="helmet">
          <HelmetChamberChapter />
        </VisibilityGate>
        <VisibilityGate id="reactor">
          <ReactorChapter />
        </VisibilityGate>
        <VisibilityGate id="pillar-hall">
          <PillarHallChapter />
        </VisibilityGate>
        <VisibilityGate id="bridge">
          <BridgeChapter />
        </VisibilityGate>
        <VisibilityGate id="command-center">
          <CommandCenterChapter />
        </VisibilityGate>
        <VisibilityGate id="lab">
          <LabChapter />
        </VisibilityGate>
        <VisibilityGate id="server-core">
          <ServerCoreChapter />
        </VisibilityGate>
        <VisibilityGate id="projects">
          <ProjectsChapter />
        </VisibilityGate>
        <VisibilityGate id="global-network">
          <GlobalNetworkChapter />
        </VisibilityGate>
        <VisibilityGate id="ai-assistant">
          <AIAssistantChapter />
        </VisibilityGate>
        <VisibilityGate id="observation-deck">
          <ObservationDeckChapter />
        </VisibilityGate>
        <VisibilityGate id="shutdown">
          <ShutdownChapter />
        </VisibilityGate>
      </Suspense>

      <CameraTimeline />
      <PostFX />
    </Canvas>
  );
};

export default WorldCanvas;
