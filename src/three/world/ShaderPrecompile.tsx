import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * VisibilityGate skips a chapter's geometry from the render list while
 * invisible, but that means its materials' shader programs are still
 * uncompiled the first time it flips visible — and WebGL shader
 * compilation is a synchronous, main-thread-blocking call. Left alone,
 * that compile cost lands exactly when the user scrolls into a new
 * chapter, as a multi-second stutter (measured: >1s frame times on a
 * throttled mobile CPU). Mounted last inside <Suspense>, once every GLB
 * is loaded, this walks the whole scene via gl.compileAsync — which
 * compiles materials regardless of `visible` — so that cost is paid once
 * up front instead of mid-scroll.
 */
const ShaderPrecompile: React.FC = () => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    gl.compileAsync(scene, camera);
  }, [gl, scene, camera]);

  return null;
};

export default ShaderPrecompile;
