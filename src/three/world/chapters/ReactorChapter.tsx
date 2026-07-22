import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHologramMaterial } from '../../shaders/HologramMaterial';
import GPUParticleField from '../../particles/GPUParticleField';
import { ArcReactorModel, AICoreModel } from '../../models';

const NODE_COUNT = 14;

function generateNodes(count: number, radius: number) {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.6 + Math.random() * 0.4);
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.6 + 0.5,
        r * Math.cos(phi)
      )
    );
  }
  return nodes;
}

function buildConnections(nodes: THREE.Vector3[], maxDist: number) {
  const positions: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < maxDist) {
        positions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }
  return new Float32Array(positions);
}

/**
 * Scene — Arc Reactor Chamber. The story's first big "wow" moment: the
 * real reactor + core GLBs as centerpiece, camera circling around them
 * (see CameraTimeline's 'reactor' block). The neural-node cluster is kept
 * as an energy-field accent around the reactor, not the centerpiece itself.
 */
const ReactorChapter: React.FC = () => {
  const nodesGroupRef = useRef<THREE.Group>(null);
  const reactorRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => generateNodes(NODE_COUNT, 1.7), []);
  const linePositions = useMemo(() => buildConnections(nodes, 1.4), [nodes]);

  const nodeMaterial = useHologramMaterial({
    color: '#6FF3C9',
    fresnelPower: 1.6,
    scanlineFreq: 10,
    opacity: 0.95,
  });

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  useFrame((state, delta) => {
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y += delta * 0.1;
    }
    if (reactorRef.current) {
      reactorRef.current.rotation.y += delta * 0.18;
      reactorRef.current.position.y = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group position={[0, -0.3, -25]}>
      <AICoreModel position={[0, -0.4, 0]} />

      <group ref={reactorRef} position={[0, 0.15, 0]}>
        <ArcReactorModel />
        <pointLight color="#6FF3C9" intensity={3} distance={4.5} decay={2} />
      </group>

      <group ref={nodesGroupRef}>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <icosahedronGeometry args={[0.045, 1]} />
            <primitive object={nodeMaterial} attach="material" />
          </mesh>
        ))}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#9B8CFF" transparent opacity={0.25} />
        </lineSegments>
      </group>

      <GPUParticleField count={220} radius={3} color="#9B8CFF" size={22} />
    </group>
  );
};

export default ReactorChapter;
