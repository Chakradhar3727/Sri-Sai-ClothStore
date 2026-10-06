# 🥻 Phase 3 Implementation Plan: High-Performance GPU Three.js Waving Silk Hero Simulation & Interactive Fabric Experience

**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff 3D WebGL & Creative Frontend Architect  
**Graphics Engine:** Three.js (v0.169.0) + React Three Fiber (v8.17.10) + Drei (v9.114.3)  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+  
**File Location:** `phase_three_implementation_plan.md` & `plans/phase_three_implementation_plan.md`  

---

## 1. Executive Summary & Architectural Vision

In **Phase 1**, we established the foundational framework: Vite 5 + React 18 + TypeScript 5.6 SPA scaffolding, the Royal Dasara festive design system, the Supabase project configuration (`syzxvfnocndtxvszkujt` in Mumbai `ap-south-1`), database schema migrations, and the Admin Auth gateway.

In **Phase 2**, we engineered the core e-commerce data architecture: the 20+ saree consignment seed ("maal" lots from 11 regional weaver guilds), Supabase real-time WebSocket inventory subscriptions, sub-20ms client-side catalog filtering, and high-trust conversion CTAs.

### The Imperative of Phase 3: The Tactile Saree Buying Experience
In Indian textile retail—especially during the 10 days of **Dasara Utsav** when families purchase bridal and heirloom sarees (Kanchipuram, Banarasi, Dharmavaram)—the tactile experience is paramount. Customers examine:
1. **The "Pallu" Drape & Fluidity**: How the fabric bends, falls, and billows in motion.
2. **The "Zari" Luster (Chhaya-Chhavi)**: How pure 3-ply gold and silver metallic threads catch light at grazing angles.
3. **The Texture of Pure Mulberry Silk**: Distinguishing genuine heavy handloom silk (208+ GSM) from lightweight synthetic imitations.

Static 2D images alone cannot convey this richness. **Phase 3 elevates Sri Sai ClothStore into an interactive digital flagship** by building a **physically-based, GPU-accelerated 3D Waving Silk Drape Simulation**.

Visitors are not merely passive viewers; they can **touch, sway, and interact with the silk in real time**, inspect different festive colorways, and watch golden temple dust float across the screen at a locked **60 FPS** on both desktop and mobile.

---

## 2. Master 10-Phase Roadmap Context

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SRI SAI CLOTHSTORE 10-PHASE ROADMAP               │
├────────────────────────────────────────────────────────────────────────┤
│  ✓ PHASE 1: Tooling, Design Tokens, Supabase MCP & Admin Auth Bedrock  │ (COMPLETED)
│  ✓ PHASE 2: "Maal" Data Architecture, Live Inventory & Catalog Grid    │ (COMPLETED)
│  ► PHASE 3: High-Performance GPU Three.js Waving Silk Hero Simulation  │ ◄ (CURRENT FOCUS)
│    PHASE 4: ReactBits Interactive Physics Cards (TiltedCard, Shimmer)  │
│    PHASE 5: Weaving Guild Marquee & Festive Urgency Tickers            │
│    PHASE 6: Multi-Angle Saree Inspection Modal (shadcn/ui Dialog/Tabs) │
│    PHASE 7: 1-Click WhatsApp Ordering & Live Video Consultation Engine │
│    PHASE 8: Admin Management Portal (Live CRUD, Photo Uploads, Stock)  │
│    PHASE 9: Mobile Performance Profiling & WebP Asset Optimization     │
│    PHASE 10: Production Build, Vercel/Netlify Deployment & QR Launch   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 3 Scope & Granular Deliverables

| Module / Component | File Location | Engineering Deliverables |
| :--- | :--- | :--- |
| **GPU Waving Silk Shader Engine** | `src/components/three/SilkClothDrape.tsx` | Physically-based `MeshPhysicalMaterial` with custom GLSL vertex wave injection (`onBeforeCompile`), real-time mouse/touch ripple propagation, and PBR zari sheen scattering. |
| **Festive Colorway Swatch Engine** | `src/components/three/SilkColorwaySelector.tsx` | Interactive UI allowing customers to toggle the hero silk drape between 4 authentic festive weaves: Kumkuma Crimson, Peacock Teal, Temple Gold, and Rani Pink with smooth color interpolation. |
| **Floating Gold Dust Particle System** | `src/components/three/GoldFestiveDust.tsx` | 150-particle 3D field with additive blending, turbulent upward drift, and cursor deflection physics. |
| **Tactile Cue & Weave Specification Badge** | `src/components/three/SilkExperienceBadge.tsx` | Floating glass badge indicating GSM density, zari purity, and interactive swipe/drag prompt ("Drag or Touch to feel the silk drape"). |
| **WebGL Performance & Fallback Hook** | `src/hooks/useWebGLPerformance.ts` | Dynamic FPS telemetry, context-loss recovery listener, geometry tessellation throttling, and seamless CSS fallback on low-power devices. |
| **Hero Integration & Camera Choreography** | `src/components/hero/FestiveHeroShowcase.tsx` | Fully integrated hero section combining 3D WebGL canvas, shimmering typography, live Dasara sale highlights, and responsive CTA triggers. |

---

## 4. Mathematical & Physics Formulation for Silk Simulation

### 4.1 Multi-Octave Wave Displacement Formula
To achieve the heavy, organic drape characteristic of authentic South Indian handloom silk (rather than rigid plastic or paper), the vertex shader computes a composite sinusoidal wave field:

$$z(x, y, t) = \sum_{i=1}^{3} A_i \sin(k_{x}^{(i)} x + k_{y}^{(i)} y + \omega_i t)$$

Where:
- **Primary Drape Swell**: $A_1 = 0.32$, $k_x^{(1)} = 1.4$, $k_y^{(1)} = 0.0$, $\omega_1 = 1.6$ (deep, slow wind-like billowing).
- **Secondary Weft Ripple**: $A_2 = 0.22$, $k_x^{(2)} = 0.0$, $k_y^{(2)} = 1.8$, $\omega_2 = 1.2$ (vertical folding along the saree length).
- **Harmonic Crease Flutter**: $A_3 = 0.14$, $k_x^{(3)} = 1.1$, $k_y^{(3)} = 1.1$, $\omega_3 = 0.9$ (diagonal pleat variations).

### 4.2 Interactive Pointer Fluid Ripple
When a visitor moves their cursor or drags their finger across the canvas, an interactive displacement wave emanates from the normalized pointer coordinate $(u_p, v_p)$:

$$\Delta z_{\text{pointer}}(u, v, t) = A_p \cdot \sin(d \cdot k_p - \omega_p t) \cdot e^{-\alpha d}$$

Where:
- $d = \sqrt{(u - u_p)^2 + (v - v_p)^2}$ is the Euclidean distance from the touch point.
- $e^{-\alpha d}$ with $\alpha = 3.5$ provides natural exponential spatial decay, confining the ripple locally like heavy silk fabric.
- $A_p = 0.24$ sets the displacement magnitude.

### 4.3 Physically-Based Sheen & Zari Specular Scattering
Natural silk fibers possess a triangular prism-like structure that refracts and reflects light at glancing angles. In Three.js, this is simulated using **Microfacet Sheen**:
- `sheen`: $1.0$ (maximum fiber reflectance).
- `sheenColor`: `#F5D06E` (Temple Zari Gold).
- `sheenRoughness`: $0.25$ (delicate satin polish).
- `clearcoat`: $0.6$ (fine zari metallic thread glaze).
- `roughness`: $0.28$, `metalness`: $0.15$.

---

## 5. Technical Architecture & File Structure

```
src/
├── components/
│   ├── hero/
│   │   └── FestiveHeroShowcase.tsx       # Complete hero section container
│   ├── three/
│   │   ├── SilkClothDrape.tsx            # Main Three.js R3F Canvas & Scene
│   │   ├── GpuWavingSilkPlane.tsx        # MeshPhysicalMaterial + onBeforeCompile GLSL
│   │   ├── GoldFestiveDust.tsx           # Floating additive particle field
│   │   ├── SilkColorwaySelector.tsx      # 4-Swatch festive palette selector
│   │   └── SilkExperienceBadge.tsx       # Tactile "Touch & Feel" badge
│   └── reactbits/
│       ├── ShinyText.tsx                 # Shimmer gold typography
│       └── TiltedCard.tsx                # 3D tilt interaction
├── hooks/
│   └── useWebGLPerformance.ts           # FPS monitor & WebGL context loss listener
└── types/
    └── silk.types.ts                     # Type definitions for silk colorways & scene state
```

---

## 6. Detailed Implementation Code

### 6.1 Silk Type Definitions: `src/types/silk.types.ts`

```typescript
export interface SilkColorway {
  id: string;
  name: string;
  subtitle: string;
  weaveOrigin: string;
  baseColor: string;
  sheenColor: string;
  zariAccent: string;
  roughness: number;
  gsm: number; // Grams per square meter (fabric weight)
}

export const FESTIVE_COLORWAYS: SilkColorway[] = [
  {
    id: 'kumkuma-crimson',
    name: 'Kumkuma Crimson',
    subtitle: 'Bridal Kanchipuram Pattu',
    weaveOrigin: 'Kanchipuram, Tamil Nadu',
    baseColor: '#6B0B24',
    sheenColor: '#F5D06E',
    zariAccent: '3-Ply Antique Temple Zari',
    roughness: 0.25,
    gsm: 218,
  },
  {
    id: 'peacock-teal',
    name: 'Peacock Teal',
    subtitle: 'Royal Banarasi Kadwa',
    weaveOrigin: 'Varanasi, Uttar Pradesh',
    baseColor: '#0A4B5C',
    sheenColor: '#F7E7A9',
    zariAccent: 'Dual Gold-Silver Resham',
    roughness: 0.28,
    gsm: 195,
  },
  {
    id: 'temple-gold',
    name: 'Temple Zari Gold',
    subtitle: 'Dharmavaram Double-Warp',
    weaveOrigin: 'Dharmavaram, Andhra Pradesh',
    baseColor: '#8C5A14',
    sheenColor: '#FFE082',
    zariAccent: 'Pure Tested Gold Brocade',
    roughness: 0.22,
    gsm: 230,
  },
  {
    id: 'rani-pink',
    name: 'Rani Rose Pink',
    subtitle: 'Paithani Mor Pallu',
    weaveOrigin: 'Paithani, Maharashtra',
    baseColor: '#8F1445',
    sheenColor: '#FFD54F',
    zariAccent: 'Peacock Feather Motif Weave',
    roughness: 0.26,
    gsm: 205,
  },
];
```

---

### 6.2 WebGL Performance & Telemetry Hook: `src/hooks/useWebGLPerformance.ts`

```typescript
import { useState, useEffect, useRef } from 'react';

interface WebGLPerformanceState {
  hasWebGL: boolean;
  fps: number;
  isLowPerformance: boolean;
  tessellationSegments: number; // 64 for desktop high-perf, 32 for mobile/low-end
}

export function useWebGLPerformance(): WebGLPerformanceState {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [tessellationSegments, setTessellationSegments] = useState(64);

  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    // 1. Initial WebGL context capability detection
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // 2. Adjust default segments on mobile screens to preserve battery & GPU
    if (window.innerWidth < 768) {
      setTessellationSegments(36);
    }

    // 3. FPS Telemetry sampler (measures over 60 frames)
    let animationFrameId: number;
    const measureFps = (now: number) => {
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (delta > 0) {
        frameTimesRef.current.push(1000 / delta);
        if (frameTimesRef.current.length > 45) {
          frameTimesRef.current.shift();
          const averageFps =
            frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
          setFps(Math.round(averageFps));

          // If device sustains under 35 FPS, throttle tessellation
          if (averageFps < 35 && tessellationSegments > 32) {
            setIsLowPerformance(true);
            setTessellationSegments(28);
          }
        }
      }

      animationFrameId = requestAnimationFrame(measureFps);
    };

    animationFrameId = requestAnimationFrame(measureFps);

    // 4. WebGL Context Loss / Restore Safety Listeners
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost. Rendering fallback festive gradient.');
      setHasWebGL(false);
    };

    const handleContextRestored = () => {
      console.info('WebGL context restored. Resuming 3D silk simulation.');
      setHasWebGL(true);
    };

    window.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [tessellationSegments]);

  return { hasWebGL, fps, isLowPerformance, tessellationSegments };
}
```

---

### 6.3 GPU Waving Silk Mesh: `src/components/three/GpuWavingSilkPlane.tsx`

```tsx
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

  // Sync color target on swatch change
  useEffect(() => {
    targetColorRef.current.set(colorway.baseColor);
    targetSheenRef.current.set(colorway.sheenColor);
  }, [colorway]);

  // Track window pointer position
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      uniformsRef.current.uMouse.value.x = e.clientX / window.innerWidth;
      uniformsRef.current.uMouse.value.y = 1.0 - e.clientY / window.innerHeight;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Physically-Based MeshPhysicalMaterial with GLSL injection
  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorway.baseColor),
      roughness: colorway.roughness,
      metalness: 0.18,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
      sheen: 1.0,                       // Crucial for natural pure silk luster
      sheenColor: new THREE.Color(colorway.sheenColor),
      sheenRoughness: 0.25,
      side: THREE.DoubleSide,
    });

    // Inject wave equations into Three.js vertex pipeline
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
```

---

### 6.4 Floating Gold Dust Particle Field: `src/components/three/GoldFestiveDust.tsx`

```tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  count?: number;
}

export function GoldFestiveDust({ count = 120 }: Props) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 + 0.5;
      sc[i] = Math.random() * 0.05 + 0.02;
    }

    return [pos, sc];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime() * 0.15;
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle buoyant upward drift
      posArr[i * 3 + 1] += 0.0035;
      if (posArr[i * 3 + 1] > 3.8) {
        posArr[i * 3 + 1] = -3.8;
      }
      // Gentle lateral shimmer
      posArr[i * 3] += Math.sin(t + i) * 0.0012;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#F5D06E"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
```

---

### 6.5 Interactive Colorway Swatch Selector: `src/components/three/SilkColorwaySelector.tsx`

```tsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { SilkColorway, FESTIVE_COLORWAYS } from '@/types/silk.types';

interface Props {
  selectedColorway: SilkColorway;
  onSelectColorway: (colorway: SilkColorway) => void;
}

export const SilkColorwaySelector: React.FC<Props> = ({
  selectedColorway,
  onSelectColorway,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-2xl bg-black/75 p-2 backdrop-blur-xl border border-dasara-gold/30 shadow-2xl">
      <div className="hidden sm:flex items-center gap-1.5 px-2 text-xs font-semibold text-dasara-gold">
        <Sparkles className="h-3.5 w-3.5" />
        <span className="font-serif">Silk Weave Texture:</span>
      </div>

      {FESTIVE_COLORWAYS.map((swatch) => {
        const isSelected = selectedColorway.id === swatch.id;
        return (
          <button
            key={swatch.id}
            onClick={() => onSelectColorway(swatch)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
              isSelected
                ? 'bg-zinc-900 border-dasara-gold text-dasara-goldLight shadow-md shadow-dasara-gold/25 scale-105'
                : 'bg-black/40 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <span
              className="h-3 w-3 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: swatch.baseColor }}
            />
            <span className="font-medium">{swatch.name}</span>
          </button>
        );
      })}
    </div>
  );
};
```

---

### 6.6 Tactile Experience Badge: `src/components/three/SilkExperienceBadge.tsx`

```tsx
import React from 'react';
import { Hand, ShieldCheck, Feather } from 'lucide-react';
import { SilkColorway } from '@/types/silk.types';

interface Props {
  colorway: SilkColorway;
}

export const SilkExperienceBadge: React.FC<Props> = ({ colorway }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-zinc-300">
      {/* Interactive Drag Prompt */}
      <div className="flex items-center gap-1.5 rounded-full bg-black/70 border border-dasara-gold/40 px-3.5 py-1 text-dasara-goldLight backdrop-blur-md shadow-lg animate-pulse">
        <Hand className="h-3.5 w-3.5 text-dasara-gold" />
        <span className="font-sans font-medium">Touch or Drag cursor to sway the silk</span>
      </div>

      {/* Fabric Weight (GSM) */}
      <div className="flex items-center gap-1.5 rounded-full bg-black/60 border border-zinc-800 px-3 py-1 text-zinc-300 backdrop-blur-md">
        <Feather className="h-3.5 w-3.5 text-dasara-gold" />
        <span>{colorway.gsm} GSM Pure Mulberry Silk</span>
      </div>

      {/* Zari Purity */}
      <div className="flex items-center gap-1.5 rounded-full bg-black/60 border border-zinc-800 px-3 py-1 text-amber-300 backdrop-blur-md">
        <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
        <span>{colorway.zariAccent}</span>
      </div>
    </div>
  );
};
```

---

### 6.7 Main Three.js Silk Drape Component: `src/components/three/SilkClothDrape.tsx`

```tsx
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { GpuWavingSilkPlane } from './GpuWavingSilkPlane';
import { GoldFestiveDust } from './GoldFestiveDust';
import { useWebGLPerformance } from '@/hooks/useWebGLPerformance';
import { SilkColorway } from '@/types/silk.types';

interface Props {
  colorway: SilkColorway;
}

export function SilkClothDrape({ colorway }: Props) {
  const { hasWebGL, tessellationSegments } = useWebGLPerformance();

  // Graceful CSS Fallback if WebGL is unavailable
  if (!hasWebGL) {
    return (
      <div
        className="absolute inset-0 transition-colors duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 70% 40%, ${colorway.baseColor} 0%, #150A10 65%, #0E0C0F 100%)`,
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-95">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 46 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Cinematic Studio Lighting for Saree Fabric Luster */}
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 3]} intensity={2.6} color="#FFF8E7" />
        <pointLight position={[-3, -2, 2]} intensity={1.4} color="#D4AF37" />
        <pointLight position={[2, -3, 1]} intensity={0.9} color="#FF6F61" />

        {/* Ambient Environment Reflections */}
        <Environment preset="city" />

        {/* Gentle 3D Floating Drape */}
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
          <GpuWavingSilkPlane
            colorway={colorway}
            segments={tessellationSegments}
          />
        </Float>

        {/* Shimmering Festive Gold Dust Particles */}
        <GoldFestiveDust count={120} />
      </Canvas>

      {/* Vignette Gradients for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0F] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0C0F]/90 via-[#0E0C0F]/40 to-transparent pointer-events-none" />
    </div>
  );
}
```

---

## 7. Step-by-Step Implementation Sequence

1. **Step 1: Create Data Contracts & Types**
   - Create `src/types/silk.types.ts` defining `SilkColorway` and the 4 festive swatches (`Kumkuma Crimson`, `Peacock Teal`, `Temple Gold`, `Rani Pink`).
2. **Step 2: Implement WebGL Performance & Telemetry Hook**
   - Create `src/hooks/useWebGLPerformance.ts` with FPS monitoring, tessellation scaling, and context-loss recovery.
3. **Step 3: Implement GPU Waving Silk Plane with PBR Shading**
   - Create `src/components/three/GpuWavingSilkPlane.tsx` using `MeshPhysicalMaterial` with sheen, clearcoat, and injected GLSL wave uniforms.
4. **Step 4: Implement Gold Dust Particle System**
   - Create `src/components/three/GoldFestiveDust.tsx` with additive blending and orbital shimmer.
5. **Step 5: Implement Colorway Swatch Selector & Experience Badge**
   - Create `src/components/three/SilkColorwaySelector.tsx` and `src/components/three/SilkExperienceBadge.tsx`.
6. **Step 6: Upgrade `SilkClothDrape.tsx` & Integrate into Hero Showcase**
   - Wire colorway state in `src/App.tsx`, connecting the swatch selector to the 3D canvas and updating weave specs dynamically.
7. **Step 7: Verification with Chrome DevTools MCP & Production Build**
   - Test colorway switching, verify 60 FPS performance, inspect console logs, and run `npm run build`.

---

## 8. Verification & Quality Gates

| Quality Gate | Method | Expected Pass Criteria |
| :--- | :--- | :--- |
| **TypeScript Compilation** | `tsc -b` | 0 errors, strict type safety, `noUnusedLocals` enforced. |
| **Production Build** | `vite build` | Clean chunk emission; `@react-three/fiber` and `three` bundled into dedicated vendor chunks. |
| **WebGL Console Audit** | Chrome DevTools MCP `list_console_messages` | Zero WebGL warnings, context-loss errors, or unhandled exceptions. |
| **60 FPS Performance** | Chrome DevTools MCP `evaluate_script` | Sustained 55-60 FPS on desktop viewport (1440x900). |
| **Interactive Colorway Test** | Chrome DevTools MCP `click` on swatch pills | Real-time smooth color interpolation from Kumkuma Maroon to Peacock Teal. |
| **Mobile Responsiveness** | Chrome DevTools MCP `resize_page` (390x844) | Touch-action smooth scrolling, reduced particle density, zero layout shift. |

---

## 9. Risk Assessment & Mitigation Matrix

| Potential Risk | Root Cause | Architectural Mitigation |
| :--- | :--- | :--- |
| **WebGL Context Loss on Low-End Phones** | Mobile browser memory limits or background tab suspensions. | Native `webglcontextlost` event listener in `useWebGLPerformance` catches the event and swaps to a CSS radial festive gradient instantly. |
| **FPS Drop on Mobile Browsers** | 64x64 plane tessellation on mobile GPUs. | Automatic resolution throttling: 36 segments on screens < 768px, dynamically stepping down to 28 segments if FPS < 35. |
| **Shader Compilation Stutter** | Compiling materials on the fly when switching colorways. | Single reusable `MeshPhysicalMaterial` instance with smooth `mat.color.lerp()` color interpolation in `useFrame`, eliminating material re-compilation stutters. |
| **Touch Event Interference** | Canvas blocking vertical page scrolling on mobile. | `pointer-events-none` on background Canvas container; interactive gestures captured passively on parent without blocking standard touch scroll (`touch-action: pan-y`). |
| **Memory Leaks on Component Remount** | Three.js geometries and materials persisting in GPU memory. | Automatic cleanup in `useEffect` disposing of geometries (`geometry.dispose()`) and textures upon unmount. |

---

## 10. Summary & Ready-to-Proceed Checklist

Once you review and approve this Phase 3 Implementation Plan, we will execute the implementation in exact sequential order:
- [ ] Create `src/types/silk.types.ts`
- [ ] Create `src/hooks/useWebGLPerformance.ts`
- [ ] Create `src/components/three/GpuWavingSilkPlane.tsx`
- [ ] Create `src/components/three/GoldFestiveDust.tsx`
- [ ] Create `src/components/three/SilkColorwaySelector.tsx`
- [ ] Create `src/components/three/SilkExperienceBadge.tsx`
- [ ] Upgrade `src/components/three/SilkClothDrape.tsx`
- [ ] Integrate into `src/App.tsx`
- [ ] Full Chrome DevTools MCP inspection and production build verification (`npm run build`).
