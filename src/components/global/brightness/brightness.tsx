"use client";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  BRIGHTNESSPICKER_PARAMS,
  BrightnessPickerParams,
  useBrightnessPicker,
  useNoise,
} from "@funtech-inc/use-shader-fx";
import { shaderMaterial } from "@react-three/drei";
import GUI from "lil-gui";

const useGUI = (setGUI: (gui: GUI) => void) => {
  const gui = useMemo(() => new GUI({ closeFolders: true, width: 240 }), []);
  useEffect(() => {
    setGUI(gui);
    return () => {
      gui.destroy();
    };
  }, [gui, setGUI]);
  const updateDisplays = useCallback(() => {
    gui.folders.forEach((folder) =>
      folder.controllers.forEach((controller) => controller.updateDisplay())
    );
  }, [gui]);
  return updateDisplays;
};

interface FxMaterialProps {
  u_fx: THREE.Texture | null;
  /** Set it to 0.0 if you want it to be transparent. */
  u_alpha: number | null;
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    fxMaterial: Partial<THREE.ShaderMaterial & FxMaterialProps> & {
      ref?: React.RefObject<THREE.ShaderMaterial & FxMaterialProps>;
      key?: string;
    };
  }
}

const FxMaterial = shaderMaterial(
  {
    u_fx: null,
    u_alpha: 1.0,
  },
  `
   varying vec2 vUv;
   void main() {
     vUv = uv;
     gl_Position = vec4(position, 1.0);
   }
 `,
  `
   precision highp float;
   varying vec2 vUv;
   uniform sampler2D u_fx;
   uniform float u_alpha;

   void main() {
     vec2 uv = vUv;
     gl_FragColor = texture2D(u_fx, uv);
     if(u_alpha > 0.0){
       gl_FragColor.a = u_alpha;
     }
   }
 `
);

extend({ FxMaterial });

const CONFIG: BrightnessPickerParams = structuredClone(BRIGHTNESSPICKER_PARAMS);
const setGUI = (gui: GUI) => {
  if (CONFIG.brightness) {
    gui.add(CONFIG.brightness, "x", 0, 1, 0.01);
    gui.add(CONFIG.brightness, "y", 0, 1, 0.01);
    gui.add(CONFIG.brightness, "z", 0, 1, 0.01);
  }
  gui.add(CONFIG, "min", 0.3, 0.4, 0.01);
  gui.add(CONFIG, "max", 0.9, 0.99, 0.01);
};
const setConfig = () => {
  return {
    ...CONFIG,
  } as BrightnessPickerParams;
};

const BrightnessBase = () => {
  // const updateGUI = useGUI(setGUI);
  const fxRef = useRef<THREE.ShaderMaterial & FxMaterialProps>(null);
  const { size, dpr } = useThree((state) => {
    return { size: state.size, dpr: state.viewport.dpr };
  });

  const [updateNoise] = useNoise({
    size,
    dpr,
  });
  const [updateBrightnessPicker] = useBrightnessPicker({
    size,
    dpr,
  });

  useFrame((props) => {
    const noise = updateNoise(props);
    const fx = updateBrightnessPicker(props, {
      // ...setConfig(),
      texture: noise,
    });
    if (fxRef.current) {
      fxRef.current.u_fx = fx;
      fxRef.current.u_alpha = 0.0;
    }
    // updateGUI();
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <fxMaterial key={FxMaterial.key} ref={fxRef} />
    </mesh>
  );
};

export const Brightness = () => {
  return (
    <Canvas>
      <BrightnessBase />
    </Canvas>
  );
};
