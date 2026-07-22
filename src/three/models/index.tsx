import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import type { ThreeElements } from '@react-three/fiber';

const DRACO_DECODER_PATH = '/draco/';

type GroupProps = ThreeElements['group'];

interface GLBModelProps extends GroupProps {
  url: string;
}

/**
 * Generic GLTF loader wired to the self-hosted Draco decoder (see
 * public/draco/ — copied from three/examples so decompression doesn't
 * depend on a CDN). The loaded scene is cloned per mount: useGLTF caches
 * and shares one parsed Object3D graph across every call for the same
 * url, so placing the same asset twice (or remounting) without cloning
 * would have both instances fight over one shared transform.
 */
const GLBModel: React.FC<GLBModelProps> = ({ url, ...groupProps }) => {
  const { scene } = useGLTF(url, DRACO_DECODER_PATH);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} {...groupProps} />;
};

/** Thin named wrapper per asset — a fixed url + a sensible default scale (every source GLB is normalized to roughly a 1-unit bounding box), with all group props (position/rotation/scale/...) still overridable at the call site. */
function defineModel(url: string, defaultScale: number) {
  const Component: React.FC<GroupProps> = (props) => (
    <GLBModel url={url} scale={defaultScale} {...props} />
  );
  return Component;
}

export const ArcReactorModel = defineModel('/models/arc-reactor.glb', 2.2);
export const AICoreModel = defineModel('/models/ai-core.glb', 5);
export const CommandCenterModel = defineModel('/models/command-center.glb', 9);
export const CorridorModel = defineModel('/models/corridor.glb', 9);
export const ConsoleModel = defineModel('/models/console.glb', 2.5);
export const ServerRackModel = defineModel('/models/server-rack.glb', 2.5);
export const DroneModel = defineModel('/models/drone.glb', 1.8);
export const RobotArmModel = defineModel('/models/robot-arm.glb', 2.2);
export const HoloDisplayModel = defineModel('/models/holo-display.glb', 2.4);
export const DataCubeModel = defineModel('/models/data-cube.glb', 1);
export const BridgeModel = defineModel('/models/bridge.glb', 6);
export const ElevatorPlatformModel = defineModel('/models/elevator-platform.glb', 5.5);
export const EnergyPillarModel = defineModel('/models/energy-pillar.glb', 3);
export const LabModuleModel = defineModel('/models/lab-module.glb', 8);
export const IronManHelmetModel = defineModel('/models/iron-man-helmet.glb', 1.4);

const ALL_MODEL_URLS = [
  '/models/arc-reactor.glb',
  '/models/ai-core.glb',
  '/models/command-center.glb',
  '/models/corridor.glb',
  '/models/console.glb',
  '/models/server-rack.glb',
  '/models/drone.glb',
  '/models/robot-arm.glb',
  '/models/holo-display.glb',
  '/models/data-cube.glb',
  '/models/bridge.glb',
  '/models/elevator-platform.glb',
  '/models/energy-pillar.glb',
  '/models/lab-module.glb',
  '/models/iron-man-helmet.glb',
];

/** Kicks off all scene-1-4 model downloads ahead of the chapters that use them, so the first cinematic scene doesn't stall on a cold fetch. Call once (e.g. from WorldCanvas). */
export function preloadWorldModels() {
  ALL_MODEL_URLS.forEach((url) => useGLTF.preload(url, DRACO_DECODER_PATH));
}
