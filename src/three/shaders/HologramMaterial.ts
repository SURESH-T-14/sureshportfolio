import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    float displacement = sin(pos.y * 6.0 + uTime * 1.5) * 0.015;
    pos += normal * displacement;
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uFresnelPower;
  uniform float uScanlineFreq;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uFresnelPower);

    float scan = sin((vPosition.y * uScanlineFreq) - uTime * 2.0) * 0.5 + 0.5;
    scan = smoothstep(0.85, 1.0, scan);

    float flicker = 0.92 + 0.08 * sin(uTime * 30.0);

    vec3 color = uColor * (0.4 + fresnel * 1.6 + scan * 0.6) * flicker;
    float alpha = clamp(fresnel * 1.2 + scan * 0.4, 0.08, 1.0) * uOpacity;

    gl_FragColor = vec4(color, alpha);
  }
`;

interface HologramMaterialOptions {
  color?: string;
  fresnelPower?: number;
  scanlineFreq?: number;
  opacity?: number;
}

/**
 * Original hand-authored hologram material: fresnel rim glow + moving
 * scanline bands + subtle vertex breathing, all time-driven. Returns a
 * memoized THREE.ShaderMaterial to attach via `<primitive object={...} attach="material" />`.
 */
export function useHologramMaterial({
  color = '#6FF3C9',
  fresnelPower = 2.0,
  scanlineFreq = 18.0,
  opacity = 0.85,
}: HologramMaterialOptions = {}) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
          uFresnelPower: { value: fresnelPower },
          uScanlineFreq: { value: scanlineFreq },
          uOpacity: { value: opacity },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [color, fresnelPower, scanlineFreq, opacity]
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return material;
}
