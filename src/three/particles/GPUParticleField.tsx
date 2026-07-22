import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GPUParticleFieldProps {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aScale;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * aSpeed + aPhase) * 0.4;
    pos.x += cos(uTime * aSpeed * 0.7 + aPhase) * 0.3;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * uSize / -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * aSpeed + aPhase));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    float glow = smoothstep(0.5, 0.0, dist);
    gl_FragColor = vec4(uColor, glow * vAlpha);
  }
`;

/**
 * Original GPU-driven particle field: motion, size falloff, and twinkle are
 * all computed on the GPU inside the vertex/fragment shaders from a single
 * uTime uniform and per-particle attributes — not a JS per-frame position loop.
 */
const GPUParticleField: React.FC<GPUParticleFieldProps> = ({
  count = 400,
  radius = 4,
  color = '#9B8CFF',
  size = 28,
}) => {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.2 + Math.random() * 0.5;
      scales[i] = 0.5 + Math.random() * 1.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    return geo;
  }, [count, radius]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
          uSize: { value: size },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color, size]
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <points geometry={geometry} material={material} />;
};

export default GPUParticleField;
