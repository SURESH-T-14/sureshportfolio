'use client';

import dynamic from 'next/dynamic';
import { ReactLenis } from 'lenis/react';
import Navbar from '../components/Navbar';
import TunnelStage from '../components/TunnelStage';
import ElevatorStage from '../components/ElevatorStage';
import HelmetStage from '../components/HelmetStage';
import About from '../components/About';
import ReactorStage from '../components/ReactorStage';
import PillarHallStage from '../components/PillarHallStage';
import BridgeStage from '../components/BridgeStage';
import CommandCenterStage from '../components/CommandCenterStage';
import Skills from '../components/Skills';
import ServerCoreStage from '../components/ServerCoreStage';
import Projects from '../components/Projects';
import GlobalNetworkStage from '../components/GlobalNetworkStage';
import AIAssistantStage from '../components/AIAssistantStage';
import Experience from '../components/Experience';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import ObservationDeckStage from '../components/ObservationDeckStage';
import ShutdownStage from '../components/ShutdownStage';
import Footer from '../components/Footer';
import BootSequence from '../components/boot/BootSequence';
import CustomCursor from '../components/CustomCursor';
import WorldCanvasFallback from '../three/world/WorldCanvasFallback';
import { useWorldTimeline } from '../hooks/useWorldTimeline';
import { useIsDesktopViewport } from '../hooks/useIsDesktopViewport';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// ssr:false so the three.js/R3F/postprocessing chunk never touches the
// server render, and only ever downloads client-side on desktop viewports
// with motion enabled — mobile/reduced motion never fetches it.
const WorldCanvas = dynamic(() => import('../three/world/WorldCanvas'), {
  ssr: false,
  loading: () => <WorldCanvasFallback />,
});

/**
 * Child of <ReactLenis root> — useWorldTimeline (via useLenis) needs to be
 * called from a descendant of the Lenis context provider, not the same
 * component that renders it.
 *
 * Render order here MUST match useWorldStore's CHAPTERS order — each
 * chapter's scroll progress is measured from its own DOM anchor's actual
 * position on the page.
 */
function AppContent() {
  useWorldTimeline();

  const isDesktop = useIsDesktopViewport();
  const reducedMotion = usePrefersReducedMotion();
  const showWorld = isDesktop && !reducedMotion;

  return (
    <div className="dark">
      <BootSequence />
      <CustomCursor />
      {showWorld ? <WorldCanvas /> : <WorldCanvasFallback />}
      <div className="relative z-10">
        <Navbar />
        {/* Act I — The Arrival */}
        <TunnelStage />
        <ElevatorStage />
        {/* Act II — Discovering the Facility */}
        <HelmetStage />
        <About />
        <ReactorStage />
        <PillarHallStage />
        <BridgeStage />
        {/* Act III — Command Center */}
        <CommandCenterStage />
        <Skills />
        <ServerCoreStage />
        {/* Act IV — Your Work */}
        <Projects />
        <GlobalNetworkStage />
        <AIAssistantStage />
        {/* Act V — Your Journey */}
        <Experience />
        <Certificates />
        <Contact />
        {/* Act VI — The End */}
        <ObservationDeckStage />
        <ShutdownStage />
        <Footer />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <AppContent />
    </ReactLenis>
  );
}
