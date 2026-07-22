import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';

// DepthOfField (bokeh blur) was here but is one of the most expensive
// effects in the postprocessing library — with 14 GLB-heavy scenes now
// coexisting in the world, it was a meaningful chunk of the frame cost for
// a purely cosmetic blur. Dropped rather than tuned down further.
/** Shared post-processing stack for the persistent world canvas. */
const PostFX: React.FC = () => (
  <EffectComposer multisampling={0}>
    <Bloom intensity={0.7} luminanceThreshold={0.18} luminanceSmoothing={0.4} mipmapBlur />
    <Vignette eskil={false} offset={0.25} darkness={0.9} />
    <Noise opacity={0.02} />
  </EffectComposer>
);

export default PostFX;
