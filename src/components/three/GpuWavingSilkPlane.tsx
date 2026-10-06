import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SilkColorway } from '@/types/silk.types';

interface Props {
  colorway: SilkColorway;
  segments?: number;
}

export function GpuWavingSilkPlane({ colorway, segments = 64 }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  });

  const targetColorRef = useRef(new THREE.Color(colorway.baseColor));
  const targetSheenRef = useRef(new THREE.Color(colorway.sheenColor));

  // Update target colors on colorway change
  useEffect(() => {
    targetColorRef.current.set(colorway.baseColor);
    targetSheenRef.current.set(colorway.sheenColor);
  }, [colorway]);

  // Window pointer tracker
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      uniformsRef.current.uMouse.value.x = e.clientX / window.innerWidth;
      uniformsRef.current.uMouse.value.y = 1.0 - e.clientY / window.innerHeight;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Physically-Based Silk Material with GLSL wave injection
  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorway.baseColor),
      roughness: colorway.roughness,
      metalness: 0.18,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
      sheen: 1.0,                       // Crucial for natural pure silk microfacet luster
      sheenColor: new THREE.Color(colorway.sheenColor),
      sheenRoughness: 0.25,
      side: THREE.DoubleSide,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniformsRef.current.uTime;
      shader.uniforms.uMouse = uniformsRef.current.uMouse;

      shader.vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        ${shader.vertexShader}
      `;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        
        // Multi-frequency heavy silk wave simulation
        float wave1 = sin(transformed.x * 1.35 + uTime * 1.5) * 0.30;
        float wave2 = cos(transformed.y * 1.75 + uTime * 1.1) * 0.22;
        float wave3 = sin((transformed.x + transformed.y) * 1.05 + uTime * 0.85) * 0.15;
        
        // Interactive cursor ripple
        float dist = distance(uv, uMouse);
        float ripple = sin(dist * 11.0 - uTime * 2.2) * exp(-dist * 3.8) * 0.22;
        
        transformed.z += wave1 + wave2 + wave3 + ripple;
        `
      );
    };

    return mat;
  }, [colorway, segments]);

  // Animate frame loop: update time and smoothly interpolate material colors
  useFrame((_, delta) => {
    uniformsRef.current.uTime.value += delta * 1.3;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat.color) {
        mat.color.lerp(targetColorRef.current, 0.08);
      }
      if (mat.sheenColor) {
        mat.sheenColor.lerp(targetSheenRef.current, 0.08);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-0.32, 0.22, -0.06]}
      position={[0.8, -0.1, 0]}
      material={material}
    >
      <planeGeometry args={[7.2, 4.8, segments, segments]} />
    </mesh>
  );
}
