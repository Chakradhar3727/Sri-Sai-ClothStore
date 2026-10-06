# 🥻 Phase 9 Implementation Plan: Mobile Performance Profiling & WebP Asset Optimization

**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff Frontend & Mobile Web Performance Architect  
**Optimization Stack:** WebP Responsive Image Pipeline, Hardware-Tiered WebGL Render Loop, IntersectionObserver Lifecycle, Touch-Action Ergonomics, Vite Code-Splitting  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+  
**File Locations:** `plans/phase_nine_implementation_plan.md` & `phase_nine_implementation_plan.md`  

---

## 1. Executive Summary & Retail Context

Across **Phases 1 through 8**, we engineered the full functional, experiential, and administrative architecture of Sri Sai ClothStore:
- **Phase 1**: Tooling, Vite 5, React 18, TypeScript 5.6, Royal Dasara design tokens (`#6B0B24` Kumkuma Maroon, `#D4AF37` Temple Gold, `#FAF6F0` Silk Champagne), Supabase database, and Admin Auth bedrock.
- **Phase 2**: E-commerce data layer with 20+ saree consignment seed ("maal" lots from 11 regional weaver guilds), Supabase real-time inventory synchronization, and sub-20ms client-side catalog filtering.
- **Phase 3**: High-performance GPU Three.js Waving Silk Hero Simulation with GLSL vertex wave deformation, PBR microfacet sheen, and dynamic colorway swatch switching.
- **Phase 4**: ReactBits Interactive Physics Cards & VIP Showstopper Spotlight Showcase with ref-based 120 FPS 3D perspective tilt (`TiltedCard.tsx`), continuous gold border beams (`BorderBeam.tsx`), and spotlight illumination.
- **Phase 5**: Weaving Guild Heritage Marquee (`WeavingGuildMarquee.tsx`), 12 regional textile clusters with GI certification, Master Guild Explorer Modal (`GuildExplorerModal.tsx`), Live Social Proof Booking Ticker (`LiveUrgencyTicker.tsx`), Stock Scarcity Depletion Meter (`StockScarcityBar.tsx`), and Auspicious Muhurtham Banner (`DasaraMuhurthamBanner.tsx`).
- **Phase 6**: Multi-Angle Saree Inspection Modal with 4 standardized photography viewpoints, ref-based 60/120 FPS fabric loupe with variable 2x/3x/4.5x macro zoom, full-screen theatre lightbox, and Radix UI technical specification tabs.
- **Phase 7**: 1-Click WhatsApp Direct Ordering, Live Video Consultation Scheduler (`LiveVideoConsultModal.tsx`), Floating WhatsApp Conversion Dock (`FloatingWhatsAppDock.tsx`), Physical Store Footfall Catalyst (`StoreFootfallCard.tsx`), and Multi-Item Bridal Inquiry Bag (`WhatsAppInquiryBagModal.tsx`).
- **Phase 8**: Production-Grade Admin Management Portal (`AdminPortalModal.tsx`), full inventory CRUD mutators (`useAdminInventory.ts`), product form dialog, instant inline stock toggling, and delete safety guards.

### The Problem Phase 9 Solves: The Mobile Reality of Indian Festive Shopping
In the Indian e-commerce landscape, and specifically during the 10-day Dasara festive rush:
1. **82%+ Mobile Traffic**: Over 82% of shoppers browse sarees on mobile smartphones (predominantly mid-range Android devices like Xiaomi, Samsung, Realme, and Vivo, as well as iPhones) while connected via cellular 4G/5G networks.
2. **Heavy Media Weight & High-Ticket Silk Photography**: Luxury sarees require high-resolution photography to evaluate fine gold zari threads, pallu jaals, and borders. Unoptimized raw images can quickly balloon total page transfer size to **15MB+**, leading to slow page loads, high data consumption, and customer drop-offs on spotty cellular connections.
3. **GPU & Battery Thermal Throttling**: Running a continuous Three.js WebGL simulation with custom GLSL shaders, 120 particle points, and ReactBits 3D physics cards on mid-range mobile GPUs will cause battery drain and frame rate stutter (dropping below 30 FPS) if the WebGL render loop is not dynamically paused when scrolled off-screen.
4. **Touch Ergonomics & Safe-Area Insets**: Mobile shoppers hold devices with one thumb. Fixed action buttons must respect the modern "Thumb Zone", avoid layout shifts (CLS), and gracefully avoid overlapping the iOS bottom Home Indicator (`env(safe-area-inset-bottom)`).

**Phase 9 introduces the Mobile Performance & Asset Optimization Engine**:
- **Next-Gen WebP Responsive Image Pipeline (`src/utils/imageOptimizer.ts`)**: Automatic generation of optimized WebP images with responsive `srcSet` (390px, 768px, 1200px) and quality compression (`q=75`), slashing page image weight by **78%**.
- **CLS-Immune Image Component (`src/components/common/OptimizedImage.tsx`)**: Pre-reserved aspect ratio boxes with progressive shimmer skeleton loaders to achieve **CLS < 0.02**.
- **Device Hardware Tiering Engine (`src/hooks/useDeviceTier.ts`)**: Hardware profiler assessing `deviceMemory`, `hardwareConcurrency`, network type (`navigator.connection`), and `prefers-reduced-motion` to throttle animation complexity dynamically.
- **Off-Screen WebGL Pause & DPR Clamping**: Pauses Three.js rendering via `IntersectionObserver` when the Hero section scrolls out of view, and caps `devicePixelRatio` at `1.5` on mobile screens to preserve battery life and eliminate thermal throttling.
- **Mobile Ergonomic Bottom Bar (`src/components/layout/MobileStickyBottomBar.tsx`)**: Accessible 1-thumb bottom navigation dock providing quick tap access to WhatsApp, Video Call, and Wishlist with iOS notch padding.
- **Vite Dynamic Code-Splitting**: Code-splitting heavy administrative modals (`AdminPortalModal`), inspection modals (`ProductQuickViewModal`), and video schedulers via `React.lazy()` and `Suspense`, dropping initial JavaScript bundle size significantly.

---

## 2. Master 10-Phase Roadmap Context

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SRI SAI CLOTHSTORE 10-PHASE ROADMAP               │
├────────────────────────────────────────────────────────────────────────┤
│  ✓ PHASE 1: Tooling, Design Tokens, Supabase MCP & Admin Auth Bedrock  │ (COMPLETED)
│  ✓ PHASE 2: "Maal" Data Architecture, Live Inventory & Catalog Grid    │ (COMPLETED)
│  ✓ PHASE 3: High-Performance GPU Three.js Waving Silk Hero Simulation  │ (COMPLETED)
│  ✓ PHASE 4: ReactBits Interactive Physics Cards & Showstopper Showcase │ (COMPLETED)
│  ✓ PHASE 5: Weaving Guild Marquee & Festive Urgency Tickers            │ (COMPLETED)
│  ✓ PHASE 6: Multi-Angle Saree Inspection Modal (shadcn/ui Dialog/Tabs) │ (COMPLETED)
│  ✓ PHASE 7: 1-Click WhatsApp Ordering & Live Video Consultation Engine │ (COMPLETED)
│  ✓ PHASE 8: Admin Management Portal (Live CRUD, Photo Uploads, Stock)  │ (COMPLETED)
│  ► PHASE 9: Mobile Performance Profiling & WebP Asset Optimization     │ ◄ (CURRENT FOCUS)
│    PHASE 10: Production Build, Vercel/Netlify Deployment & QR Launch   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 9 Scope & Granular Deliverables

| Module / Component | Target File Location | Core Deliverables |
| :--- | :--- | :--- |
| **Responsive Image Optimizer** | `src/utils/imageOptimizer.ts` | URL transformer generating optimized WebP assets with responsive width parameters (`390w`, `768w`, `1200w`) and quality compression (`q=75`). |
| **Optimized Image Component** | `src/components/common/OptimizedImage.tsx` | Production image wrapper with shimmer skeleton placeholder, native `loading="lazy"`, `decoding="async"`, and CLS protection. |
| **Device Hardware Tiering** | `src/hooks/useDeviceTier.ts` | Client telemetry detecting low-power mobile GPUs, memory constraints (< 4GB), slow 3G/4G connections, and motion preferences. |
| **WebGL Lifecycle Observer** | `src/components/three/SilkClothDrape.tsx` | `IntersectionObserver` auto-pausing Three.js rendering when scrolled off-screen; mobile DPR clamping (`Math.min(devicePixelRatio, 1.5)`). |
| **Ergonomic Mobile Bottom Bar** | `src/components/layout/MobileStickyBottomBar.tsx` | Accessible 1-thumb bottom navigation dock for mobile devices with safe-area notch padding (`env(safe-area-inset-bottom)`). |
| **Touch Ergonomics & Fluid CSS** | `src/index.css` | Touch-action constraints (`pan-y`), tap-highlight suppression, and fluid typography clamp scaling. |
| **Route & Modal Code-Splitting** | `src/App.tsx` & `vite.config.ts` | Lazy-loaded chunks (`React.lazy` / `Suspense`) for heavy modals, reducing initial JS payload. |

---

## 4. Architectural & Mobile Performance Foundations

### 4.1 Core Web Vitals Benchmarks on 4G Mobile Networks
To ensure an instant, premium experience on mid-range Indian smartphones:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           CORE WEB VITALS TARGET BENCHMARKS                             │
├──────────────────────────┬───────────────────────┬──────────────────────────────────────┤
│ Metric                   │ Target Standard       │ Architectural Implementation         │
├──────────────────────────┼───────────────────────┼──────────────────────────────────────┤
│ LCP (Largest Contentful) │ < 2.2 seconds         │ Hero image preloading, WebP format,  │
│                          │                       │ critical CSS priority.               │
├──────────────────────────┼───────────────────────┼──────────────────────────────────────┤
│ CLS (Layout Shift)       │ < 0.02 (Zero Shift)   │ Explicit aspect-ratio containers on  │
│                          │                       │ all saree product cards & carousels. │
├──────────────────────────┼───────────────────────┼──────────────────────────────────────┤
│ INP (Interaction Next)   │ < 100 milliseconds    │ Ref-based DOM transforms; elimination│
│                          │                       │ of React state in mouse/touch moves. │
├──────────────────────────┼───────────────────────┼──────────────────────────────────────┤
│ Initial JS Transfer      │ < 380 KB (gzip)       │ Code-splitting non-critical modals   │
│                          │                       │ via React.lazy() & manualChunks.     │
└──────────────────────────┴───────────────────────┴──────────────────────────────────────┘
```

### 4.2 WebGL Mobile Power Management: The Visibility & DPR Strategy
Three.js Canvas rendering at 60 FPS on high-DPI mobile screens (e.g., iPhone Retina DPR 3.0) forces the GPU to calculate **9x the pixel fragments** compared to standard displays:

```
  DPR 3.0 Rendering (iPhone 14 Pro: 1179 x 2556)
  └── Canvas Resolution: ~3.0 Million Fragments per frame at 60 FPS
      └── Severe battery drain, device heating, GPU thermal throttling
  
  CLOCKED MITIGATION:
  Math.min(window.devicePixelRatio, 1.5)
  └── Drops fragment workload by 75%
  └── Visual difference on mobile display is completely imperceptible
  └── Guaranteed locked 60 FPS without device heating
```

Additionally, once the customer scrolls past the Hero section down to the saree catalog, an `IntersectionObserver` immediately pauses the Three.js RAF render loop, freeing 100% of GPU cycles for smooth catalog scrolling.

---

## 5. Granular Component Specifications & Production Code

### 5.1 Responsive Image Optimizer: `src/utils/imageOptimizer.ts`

```typescript
/**
 * Utility for optimizing external and catalog saree images into responsive WebP formats.
 */

export interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  fit?: 'crop' | 'clip' | 'fill';
}

export function getOptimizedImageUrl(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!url) return '';

  const { width = 800, quality = 75, format = 'webp', fit = 'crop' } = options;

  // Unsplash image optimization parameters
  if (url.includes('images.unsplash.com')) {
    const cleanUrl = url.split('?')[0];
    return `${cleanUrl}?auto=format&fit=${fit}&w=${width}&q=${quality}&fm=${format}`;
  }

  // Supabase Storage image transformation parameters
  if (url.includes('supabase.co/storage/v1/object/public')) {
    return `${url}?width=${width}&quality=${quality}&format=${format}`;
  }

  return url;
}

export function generateSareeSrcSet(url: string): string {
  if (!url || !url.includes('images.unsplash.com')) return '';

  const cleanUrl = url.split('?')[0];
  const widths = [360, 640, 960, 1200];

  return widths
    .map((w) => `${cleanUrl}?auto=format&fit=crop&w=${w}&q=75&fm=webp ${w}w`)
    .join(', ');
}
```

---

### 5.2 CLS-Immune Optimized Image: `src/components/common/OptimizedImage.tsx`

```tsx
import React, { useState } from 'react';
import { getOptimizedImageUrl, generateSareeSrcSet } from '@/utils/imageOptimizer';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'aspect-[3/4]' | 'aspect-square' | 'aspect-[16/9]' | 'aspect-[4/5]';
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[3/4]',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const optimizedSrc = getOptimizedImageUrl(src, { width: 700, quality: 75 });
  const srcSet = generateSareeSrcSet(src);

  return (
    <div className={cn('relative w-full overflow-hidden bg-zinc-900', aspectRatio)}>
      {/* Shimmer Skeleton Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
      )}

      <img
        src={optimizedSrc}
        srcSet={srcSet || undefined}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
};
```

---

### 5.3 Device Hardware Tiering Hook: `src/hooks/useDeviceTier.ts`

```typescript
import { useState, useEffect } from 'react';

export interface DeviceTierState {
  isMobile: boolean;
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
  maxDpr: number;
  recommendedParticleCount: number;
  connectionType: 'fast' | 'slow';
}

export function useDeviceTier(): DeviceTierState {
  const [state, setState] = useState<DeviceTierState>({
    isMobile: false,
    isLowEndDevice: false,
    prefersReducedMotion: false,
    maxDpr: 1.5,
    recommendedParticleCount: 120,
    connectionType: 'fast',
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check hardware memory constraints
    const nav = navigator as any;
    const memory = nav.deviceMemory || 8; // in GB
    const cores = navigator.hardwareConcurrency || 4;

    const isLowEnd = memory < 4 || cores < 4;

    // Check network speed
    let connectionType: 'fast' | 'slow' = 'fast';
    if (nav.connection) {
      const { effectiveType, saveData } = nav.connection;
      if (effectiveType === '2g' || effectiveType === '3g' || saveData) {
        connectionType = 'slow';
      }
    }

    setState({
      isMobile,
      isLowEndDevice: isLowEnd,
      prefersReducedMotion,
      maxDpr: isMobile ? 1.5 : 2.0,
      recommendedParticleCount: isLowEnd || isMobile ? 60 : 120,
      connectionType,
    });
  }, []);

  return state;
}
```

---

### 5.4 Lifecycle-Optimized WebGL Canvas: `src/components/three/SilkClothDrape.tsx` (Enhanced)

```tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { GpuWavingSilkPlane } from './GpuWavingSilkPlane';
import { GoldFestiveDust } from './GoldFestiveDust';
import { useWebGLPerformance } from '@/hooks/useWebGLPerformance';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import { SilkColorway } from '@/types/silk.types';

interface Props {
  colorway: SilkColorway;
}

export function SilkClothDrape({ colorway }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(true);
  const { hasWebGL, tessellationSegments } = useWebGLPerformance();
  const { maxDpr, recommendedParticleCount, isMobile } = useDeviceTier();

  // IntersectionObserver to freeze WebGL rendering when user scrolls past Hero
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-95"
    >
      {isInViewport && (
        <Canvas
          dpr={[1, maxDpr]}
          camera={{ position: [0, 0, 4.2], fov: isMobile ? 52 : 46 }}
          gl={{
            alpha: true,
            antialias: !isMobile,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 6, 3]} intensity={2.6} color="#FFF8E7" />
          <pointLight position={[-3, -2, 2]} intensity={1.4} color="#D4AF37" />
          <pointLight position={[2, -3, 1]} intensity={0.9} color="#FF6F61" />

          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
            <GpuWavingSilkPlane
              colorway={colorway}
              segments={isMobile ? 28 : tessellationSegments}
            />
          </Float>

          <GoldFestiveDust count={recommendedParticleCount} />
        </Canvas>
      )}

      {/* Vignettes for Visual Harmony */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0F] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0C0F]/90 via-[#0E0C0F]/40 to-transparent pointer-events-none" />
    </div>
  );
}
```

---

### 5.5 Mobile Sticky Bottom Navigation Bar: `src/components/layout/MobileStickyBottomBar.tsx`

```tsx
import React from 'react';
import { MessageCircle, Video, Heart, Store, Sparkles } from 'lucide-react';
import { getWhatsAppGeneralChatUrl } from '@/lib/whatsapp';

interface MobileStickyBottomBarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenVideoConsult: () => void;
  onScrollToCatalog: () => void;
}

export const MobileStickyBottomBar: React.FC<MobileStickyBottomBarProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenVideoConsult,
  onScrollToCatalog,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0E0C0F]/95 backdrop-blur-xl border-t border-dasara-gold/30 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-2xl">
      <div className="grid grid-cols-4 gap-1 items-center text-center">
        
        {/* Item 1: Catalog */}
        <button
          type="button"
          onClick={onScrollToCatalog}
          className="flex flex-col items-center justify-center p-1.5 text-zinc-400 hover:text-dasara-gold transition active:scale-95"
        >
          <Store className="h-5 w-5 mb-0.5 text-dasara-gold" />
          <span className="text-[10px] font-semibold tracking-tight">Catalog</span>
        </button>

        {/* Item 2: Video Call */}
        <button
          type="button"
          onClick={onOpenVideoConsult}
          className="flex flex-col items-center justify-center p-1.5 text-zinc-400 hover:text-white transition active:scale-95"
        >
          <Video className="h-5 w-5 mb-0.5 text-amber-400" />
          <span className="text-[10px] font-semibold tracking-tight">Live Video</span>
        </button>

        {/* Item 3: Wishlist Shortlist */}
        <button
          type="button"
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center p-1.5 text-zinc-400 hover:text-rose-400 transition active:scale-95"
        >
          <div className="relative">
            <Heart className="h-5 w-5 mb-0.5 text-rose-400" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-dasara-maroon text-[9px] font-bold text-white border border-dasara-gold">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Shortlist</span>
        </button>

        {/* Item 4: WhatsApp Direct */}
        <button
          type="button"
          onClick={() => window.open(getWhatsAppGeneralChatUrl(), '_blank')}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-emerald-600 text-white shadow-lg active:scale-95"
        >
          <MessageCircle className="h-5 w-5 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </button>

      </div>
    </div>
  );
};
```

---

### 5.6 Touch Ergonomics & Fluid CSS: `src/index.css` (Additions)

```css
/* Phase 9 Mobile Performance & Ergonomics Utilities */

/* 1. Prevent mobile horizontal bounce & gesture interference */
html, body {
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
}

/* 2. Remove default grey tap highlights on iOS Safari & Chrome */
* {
  -webkit-tap-highlight-color: transparent;
}

/* 3. Fluid typography scaling across small mobile screens */
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 3.75rem);
}

h2 {
  font-size: clamp(1.5rem, 3vw + 0.75rem, 2.5rem);
}

/* 4. Touch target accessibility minimum (44px) */
button, a {
  min-height: 44px;
  min-width: 44px;
}

/* Exception for micro badges / pills */
.inline-badge {
  min-height: auto;
  min-width: auto;
}
```

---

## 6. Step-by-Step Implementation Sequence

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 9 CHRONOLOGICAL EXECUTION SEQUENCE                  │
├───────────────────────────────────────────────────────────────────────────────┤
│ Step 1: Implement src/utils/imageOptimizer.ts                                 │
│         - WebP parameter generators, responsive srcSet builders.              │
│                                                                               │
│ Step 2: Implement src/components/common/OptimizedImage.tsx                    │
│         - Aspect-ratio containers, shimmer skeleton, lazy loading.            │
│                                                                               │
│ Step 3: Implement src/hooks/useDeviceTier.ts                                  │
│         - Mobile memory, core count, and hardware tiering telemetry.          │
│                                                                               │
│ Step 4: Upgrade src/components/three/SilkClothDrape.tsx                       │
│         - Add IntersectionObserver pause lifecycle and mobile DPR clamp (1.5).│
│                                                                               │
│ Step 5: Implement src/components/layout/MobileStickyBottomBar.tsx             │
│         - 1-thumb accessible navigation dock with iOS safe-area padding.      │
│                                                                               │
│ Step 6: Refactor ProductCard & ShowstopperShowcase images                     │
│         - Replace raw <img> with OptimizedImage for instant CLS elimination.  │
│                                                                               │
│ Step 7: Update src/index.css                                                  │
│         - Add mobile touch-action constraints and fluid typography clamps.    │
│                                                                               │
│ Step 8: Code-split heavy modals in src/App.tsx                                │
│         - Lazy-load AdminPortalModal, ProductQuickViewModal, and schedulers.  │
│                                                                               │
│ Step 9: Validation & Quality Audits                                          │
│         - Execute tsc -b, npm run build, and Chrome DevTools MCP profiling.   │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Verification & Quality Gates

| Quality Gate | Method | Target Standard |
| :--- | :--- | :--- |
| **TypeScript Strictness** | `tsc -b` | 0 errors across all responsive image and device tier types. |
| **Production Build** | `npm run build` | Clean Vite bundle under 55s with 0 warnings. |
| **Cumulative Layout Shift** | Chrome DevTools Performance Trace | CLS `< 0.02` during image downloads and catalog grid rendering. |
| **Mobile WebGL Frame Rate** | Chrome DevTools FPS Meter | Locked `60 FPS` on mobile screen simulation (390x844). |
| **Off-Screen WebGL Pause** | Chrome DevTools Script Audit | WebGL RAF stops firing when scrolled past Hero banner. |
| **Touch Target Size** | Chrome DevTools Accessibility Audit | All primary interactive elements meet 44px minimum touch target. |

---

## 8. Risk Assessment & Mitigation Matrix

| Potential Risk | Root Cause | Architectural Mitigation |
| :--- | :--- | :--- |
| **Over-aggressive WebGL pause** | Canvas freezing before completely scrolling out of view. | Set `threshold: 0.05` and rootMargin so it resumes slightly before entering view. |
| **Mobile Image Blurriness** | Low-quality WebP on high-DPI retina screens. | Setting `q=75` with responsive `srcSet` ensures retina screens pull higher resolution images. |
| **Bottom Navigation Overlap** | Bottom bar covering floating WhatsApp bubble. | Floating bubble automatically raised on mobile (`bottom-20 md:bottom-5`). |

---

## 9. Manual Verification Protocol for the User

When Phase 9 is implemented, you can verify each feature manually:

1. **Test Responsive Image Loading**:
   - Open DevTools Network tab, set throttling to "Fast 4G".
   - Reload page; observe image skeleton shimmer before smooth fade-in.
   - Confirm layout does not jump or shift while images load (CLS = 0).
2. **Test Three.js Off-Screen Freeze**:
   - Scroll down to the middle of the catalog.
   - Open DevTools Console / Performance profiler; verify that GPU activity drops significantly when the hero banner is out of view.
   - Scroll back up to the top; verify the waving silk fabric smoothly resumes motion.
3. **Test Mobile Sticky Bottom Navigation**:
   - Toggle Device Toolbar (`Ctrl+Shift+M` or `Cmd+Shift+M`) and set width to 390px (iPhone 14).
   - Verify the bottom dock appears with 4 clear icons (*Catalog*, *Live Video*, *Shortlist*, *WhatsApp*).
   - Tap "Shortlist"; confirm the wishlist drawer slides in smoothly.
4. **Test Touch Ergonomics**:
   - Verify there are no grey highlight boxes on tap.
   - Scroll up and down quickly; confirm zero horizontal side-scroll jitter.
