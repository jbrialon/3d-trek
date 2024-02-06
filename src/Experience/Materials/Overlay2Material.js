import * as THREE from "three";

import vertexShader from "../../shaders/overlay2/vertex.glsl";
import fragmentShader from "../../shaders/overlay2/fragment.glsl";

const overlay2Material = (options) => {
  return new THREE.ShaderMaterial({
    extensions: {
      derivatives: true,
    },
    transparent: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uAlpha: { value: options.uAlpha || 0 },
      // Visual
      uFill: { value: options.uFill },
      uStroke: { value: options.uStroke },
      uThickness: { value: options.uThickness },
      uSqueeze: { value: options.uSqueeze },
      uSqueezeMin: { value: options.uSqueezeMin },
      uSqueezeMax: { value: options.uSqueezeMax },
      // Dash
      uDashEnabled: { value: options.uDashEnabled },
      uDashRepeats: { value: options.uDashRepeats },
      uDashOverlap: { value: options.uDashOverlap },
      uDashLength: { value: options.uDashLength },
      uDashAnimate: { value: options.uDashAnimate },
      // Mask
      uNoiseIntensity: { value: 140 },
      uCircleRadius: {
        value: options.uCircleRadius,
      },
      uCirclePos: {
        value: options.uCirclePos,
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
};

export default overlay2Material;
