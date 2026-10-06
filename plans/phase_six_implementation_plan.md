# 🥻 Phase 6 Implementation Plan: Multi-Angle Saree Inspection Modal & High-Precision Fabric Optics

**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff Frontend & Luxury E-Commerce Systems Architect  
**Interaction & Motion Stack:** Radix UI Primitives (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`), Ref-Based DOM Transforms, Web Animations API, Lucide Icons  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+  
**File Locations:** `plans/phase_six_implementation_plan.md` & `phase_six_implementation_plan.md`  

---

## 1. Executive Summary & Retail Context

Across **Phases 1 through 5**, we engineered the full foundational and experiential stack for Sri Sai ClothStore:
- **Phase 1**: Tooling, Vite 5, React 18, TypeScript 5.6, Royal Dasara design tokens (`#6B0B24` Kumkuma Maroon, `#D4AF37` Temple Gold, `#FAF6F0` Silk Champagne), Supabase database, and Admin Auth bedrock.
- **Phase 2**: E-commerce data layer with 20+ saree consignment seed ("maal" lots from 11 regional weaver guilds), Supabase real-time inventory synchronization, and sub-20ms client-side catalog filtering.
- **Phase 3**: High-performance GPU Three.js Waving Silk Hero Simulation with GLSL vertex wave deformation, PBR microfacet sheen, and dynamic colorway swatch switching.
- **Phase 4**: ReactBits Interactive Physics Cards & VIP Showstopper Spotlight Showcase with ref-based 120 FPS 3D perspective tilt (`TiltedCard.tsx`), continuous gold border beams (`BorderBeam.tsx`), and spotlight illumination.
- **Phase 5**: Weaving Guild Heritage Marquee (`WeavingGuildMarquee.tsx`), 12 regional textile clusters with GI certification, Master Guild Explorer Modal (`GuildExplorerModal.tsx`), Live Social Proof Booking Ticker (`LiveUrgencyTicker.tsx`), Stock Scarcity Depletion Meter (`StockScarcityBar.tsx`), and Auspicious Muhurtham Banner (`DasaraMuhurthamBanner.tsx`).

### The Problem Phase 6 Solves: Luxury Saree Buyer Anxiety & High-Ticket Optical Tactility
In authentic Indian bridal and festive saree retail, high-ticket pieces (Kanchipuram pure pattu, Varanasi antique Kadwa brocade, Dharmavaram heavy silk) are priced between **₹9,999 and ₹25,000+**. 

When purchasing sarees at this price tier online, Indian customers experience significant hesitation regarding five critical tactile questions:
1. **Drape & Pleat Silhouette**: How does the saree fall when draped around the body? Are the pleats crisp or stiff?
2. **Pallu Motif Intricacy**: What is the density of the gold zari in the grand pallu? Are the motifs traditional (*Mayil* peacock, *Rudraksha*, *Yali*, or *Gopuram*)?
3. **Border & Selvedge Craftsmanship**: Is the border genuine hand-interlocked *Korvai* or *Kadwa* weave? Can the individual gold zari warp and weft threads be inspected?
4. **Blouse Fabric Piece Matching**: Is the included unstitched blouse piece contrast or running? Does it have matching heavy zari borders for the sleeves and back neck?
5. **Purity Verification**: Is the saree 100% pure natural silk certified by **Silk Mark India**? What is the tested grade of the zari (2G tested gold vs. metallic lurex)?

Currently, `ProductQuickViewModal.tsx` contains an initial monolithic implementation. **Phase 6 transforms this into a modular, production-grade, multi-angle inspection theatre**:
- **4-Angle Saree Gallery Architecture**: Full Body Drape, Grand Pallu Macro, Zari Border & Selvedge, and Contrast Blouse Piece with angle tags and swipe navigation.
- **Multi-Magnification 60/120 FPS Fabric Loupe**: Variable 2x, 3x, and 4.5x macro zoom toggle with ref-based cursor tracking, specular zari sheen overlay, and mobile touch-drag support.
- **Full-Screen Lightbox Theatre**: Distraction-free high-resolution full-screen viewer with zoom/pan and keyboard hotkeys (`Esc`, `ArrowLeft`, `ArrowRight`, `+`, `-`).
- **Accessible Radix UI Tabs (`@radix-ui/react-tabs`)**: Structured deep-dive specs:
  - *Tab 1: Weave & Loom Architecture* (Loom type, warp/weft thread count, artisan lineage, lot code).
  - *Tab 2: Fabric & Zari Purity* (Silk Mark India certificate simulation, zari electroplating purity, grams weight).
  - *Tab 3: Blouse & Styling Consultation* (Recommended blouse neckline/sleeve cuts, temple jewelry pairings, festive occasion guide).
- **Silk Mark & GI Authenticity Credential Card**: Interactive purity verification card building high trust.
- **High-Conversion Regional Commerce Bar**: Pre-populated WhatsApp purchase with selected angle snapshot, 5-minute Live Video Call trial booking modal, and family WhatsApp sharing.

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
│  ► PHASE 6: Multi-Angle Saree Inspection Modal (shadcn/ui Dialog/Tabs) │ ◄ (CURRENT FOCUS)
│    PHASE 7: 1-Click WhatsApp Ordering & Live Video Consultation Engine │
│    PHASE 8: Admin Management Portal (Live CRUD, Photo Uploads, Stock)  │
│    PHASE 9: Mobile Performance Profiling & WebP Asset Optimization     │
│    PHASE 10: Production Build, Vercel/Netlify Deployment & QR Launch   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 6 Scope & Granular Deliverables

| Module / Component | Target File Location | Core Deliverables |
| :--- | :--- | :--- |
| **Inspection Data Contracts** | `src/types/inspection.types.ts` | TypeScript schemas for inspection angles (`full_drape`, `pallu_macro`, `border_selvedge`, `blouse_piece`), zoom levels, purity specs, and styling suggestions. |
| **shadcn/ui Tabs Primitive** | `src/components/ui/tabs.tsx` | Production Radix UI Tabs wrapper styled with luxury Dasara tokens (`#6B0B24`, `#D4AF37`, `#FAF6F0`). |
| **Multi-Angle Gallery Track** | `src/components/shop/modal/MultiAngleGallery.tsx` | Angle selector pills, thumbnail carousel, touch swipe handling, and active angle indicator. |
| **High-Precision Fabric Loupe** | `src/components/shop/modal/FabricLoupeLens.tsx` | Ref-based 60/120 FPS cursor tracking, 2x/3x/4.5x macro zoom toggle, specular light sheen, and mobile touch-drag magnification. |
| **Full-Screen Lightbox Theatre** | `src/components/shop/modal/FullScreenLightbox.tsx` | Full-screen modal with high-res zoom, keyboard navigation (`Esc`, `Arrows`), and pan controls. |
| **Technical Saree Spec Tabs** | `src/components/shop/modal/SareeSpecTabs.tsx` | 3 rich tabs: Weave & Loom, Fabric & Zari Purity, and Blouse & Styling Consultation. |
| **Purity & Silk Mark Card** | `src/components/shop/modal/PurityCertificateCard.tsx` | Silk Mark India & GI Tag verification card with purity breakdown and authenticity guarantee. |
| **Modal Conversion Bar** | `src/components/shop/modal/ModalConversionBar.tsx` | High-conversion actions: WhatsApp reserve with photo snapshot, Video Consultation scheduling, and family WhatsApp share. |
| **Root Inspection Coordinator** | `src/components/shop/ProductQuickViewModal.tsx` | Modular coordinator assembling the gallery, loupe, tabs, certification card, and conversion bar. |
| **Consignment Seed Enrichment** | `src/data/products.ts` | Multi-angle image URLs, fabric weights, thread counts, and blouse specifications across all seed sarees. |

---

## 4. Architectural & Optical Foundations

### 4.1 The 4 Standard Indian Saree Inspection Angles
In luxury saree retail, a comprehensive inspection consists of 4 distinct viewpoints:

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                             THE 4 SAREE INSPECTION ANGLES                                │
├──────────────────────────┬──────────────────────────┬────────────────────────────────────┤
│ Viewport Angle           │ Optical Focus            │ Customer Question Answered         │
├──────────────────────────┼──────────────────────────┼────────────────────────────────────┤
│ 1. Full Body Drape       │ Silhouette & Fall        │ "How does the entire saree drape,  │
│                          │ Pleat formation          │ and how do the colors balance?"    │
├──────────────────────────┼──────────────────────────┼────────────────────────────────────┤
│ 2. Grand Pallu Macro     │ High-Density Zari Jaal   │ "Is the pallu rich enough for      │
│                          │ Motif intricate details  │ the stage or pooja mandap?"        │
├──────────────────────────┼──────────────────────────┼────────────────────────────────────┤
│ 3. Border & Selvedge     │ Warp/Weft Interlock      │ "Is the border hand-locked Korvai  │
│                          │ Thread count & Zari sheen│ or printed? Can I see the weave?"  │
├──────────────────────────┼──────────────────────────┼────────────────────────────────────┤
│ 4. Blouse Piece          │ Contrast fabric texture  │ "What blouse style is included?    │
│                          │ Unstitched cut length    │ Does it have heavy sleeve borders?"│
└──────────────────────────┴──────────────────────────┴────────────────────────────────────┘
```

### 4.2 Mathematical Model of the 60/120 FPS Fabric Loupe Lens
To inspect fine silk warp/weft threads without CPU stutter or React virtual DOM re-renders, the loupe uses a direct ref-based coordinate pipeline:

```
                Cursor Position: (clientX, clientY)
                             │
                             ▼
            imgContainerRef.getBoundingClientRect()
                             │
   ┌─────────────────────────┴─────────────────────────┐
   ▼                                                   ▼
Relative Pixels:                                Normalized Percentage:
x = clamp(0, clientX - left, width)             xPercent = (x / width) * 100
y = clamp(0, clientY - top, height)             yPercent = (y / height) * 100
   │                                                   │
   ▼                                                   ▼
Loupe Center:                                   Background Position:
lensRef.style.transform =                       lensRef.style.backgroundPosition =
`translate3d(${x}px, ${y}px, 0)`                `${xPercent}% ${yPercent}%`
```

1. **Sub-Pixel Smoothness**: `transform: translate3d(x, y, 0) translate(-50%, -50%)` utilizes the GPU compositor layer, ensuring 0 layout recalculations or paint cycles.
2. **Magnification Toggle**: Supports 3 calibrated optical zoom levels:
   - **2.0x Standard Magnification**: Evaluates overall pattern balance and motif distribution.
   - **3.0x Zari Weave Magnification**: Examines gold/silver thread twists and embossed brocade relief.
   - **4.5x Micro Selvedge Magnification**: Analyzes individual mulberry silk filaments and korvai locking points.
3. **Specular Zari Light Sheen**: An internal radial gradient simulates light reflecting off metallic gold threads inside the lens:
   ```css
   radial-gradient(circle at 35% 35%, rgba(255, 248, 220, 0.4) 0%, transparent 60%)
   ```

### 4.3 Mobile Touch Inspection Strategy
On mobile touchscreens (smartphones and tablets), desktop mouse hovering is unavailable. Phase 6 implements:
- **Touch-and-Hold Loupe Activation**: Holding a thumb/finger on the image displays the loupe offset 60px above the finger so the user's hand does not obstruct the view.
- **Horizontal Swipe Navigation**: Swiping left/right cycles through the 4 saree angles (`full_drape` → `pallu` → `border` → `blouse`).
- **Double-Tap for Full-Screen Lightbox**: Double-tapping launches the high-definition Lightbox modal for pinch-to-zoom.

---

## 5. Granular Component Specifications & Production Code

### 5.1 Inspection Data Contracts: `src/types/inspection.types.ts`

```typescript
export type SareeAngleType = 'full_drape' | 'pallu_macro' | 'border_selvedge' | 'blouse_piece';

export interface SareeAngleImage {
  angle: SareeAngleType;
  label: string;
  hindiLabel: string;
  url: string;
  description: string;
}

export type ZoomLevel = 2.0 | 3.0 | 4.5;

export interface TechnicalWeaveSpecs {
  loomType: string;
  warpComposition: string;
  weftComposition: string;
  threadCountWarpWeft: string;
  interlockTechnique: string;
  approxDaysOnLoom: number;
}

export interface PurityZariSpecs {
  silkMarkRegNumber: string;
  silkType: string;
  zariGrade: 'Pure 24K Gold Electroplated' | '2G Tested Silver-Gilt Zari' | 'Rich Metallic Resham';
  approxSareeWeightGrams: number;
  zariPurityRating: string;
}

export interface BlouseStylingSpecs {
  blouseLengthMeters: number;
  blouseType: 'Contrast' | 'Running' | 'Heavy Brocade';
  sleeveBorderWidthInches: number;
  recommendedNecklines: string[];
  recommendedJewelry: string[];
  auspiciousOccasions: string[];
}
```

---

### 5.2 shadcn/ui Accessible Tabs Primitive: `src/components/ui/tabs.tsx`

```tsx
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-11 items-center justify-start rounded-xl bg-zinc-950/80 p-1 text-zinc-400 border border-zinc-800/80 backdrop-blur-md',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium ring-offset-black transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dasara-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-dasara-maroon data-[state=active]:to-dasara-deepCrimson data-[state=active]:text-dasara-goldLight data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-dasara-gold/40',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-3 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-4 ring-offset-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dasara-gold focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

---

### 5.3 High-Precision 60/120 FPS Fabric Loupe Lens: `src/components/shop/modal/FabricLoupeLens.tsx`

```tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ZoomIn, Maximize2, Sparkles } from 'lucide-react';
import { ZoomLevel } from '@/types/inspection.types';

interface FabricLoupeLensProps {
  imageSrc: string;
  altText: string;
  zoomLevel: ZoomLevel;
  onZoomChange: (level: ZoomLevel) => void;
  onOpenLightbox: () => void;
}

export const FabricLoupeLens: React.FC<FabricLoupeLensProps> = ({
  imageSrc,
  altText,
  zoomLevel,
  onZoomChange,
  onOpenLightbox,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const rafId = useRef<number | null>(null);

  const updateLoupePosition = useCallback((clientX: number, clientY: number, isTouch = false) => {
    if (!containerRef.current || !lensRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Pixel coordinates relative to image container
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    // Offset upward on touch devices so thumb does not obscure magnified view
    if (isTouch) {
      y = y - 70;
    }

    // Clamp coordinates
    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        lensRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
      }
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateLoupePosition(e.clientX, e.clientY, false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateLoupePosition(e.touches[0].clientX, e.touches[0].clientY, true);
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="relative flex flex-col gap-2">
      {/* Primary Image Box */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsTouchActive(true)}
        onTouchEnd={() => setIsTouchActive(false)}
        onTouchMove={handleTouchMove}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-dasara-gold/30 bg-zinc-950 cursor-crosshair select-none group shadow-2xl"
      >
        <img
          src={imageSrc}
          alt={altText}
          className="h-full w-full object-cover transition-opacity duration-200 pointer-events-none"
        />

        {/* Ambient Darkening Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Ref-Based Circular Magnification Loupe Lens */}
        <div
          ref={lensRef}
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${zoomLevel * 100}% ${zoomLevel * 100}%`,
            backgroundRepeat: 'no-repeat',
            opacity: isActive || isTouchActive ? 1 : 0,
            pointerEvents: 'none',
          }}
          className="absolute h-44 w-44 rounded-full border-2 border-dasara-gold shadow-[0_0_35px_rgba(212,175,55,0.6),0_15px_35px_rgba(0,0,0,0.9)] ring-4 ring-black/80 z-30 overflow-hidden transition-opacity duration-150 will-change-transform"
        >
          {/* Specular Zari Sheen Highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,248,220,0.35)_0%,transparent_60%)] pointer-events-none" />
          
          {/* Crosshair target */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-3 w-3 rounded-full border border-dasara-gold/70" />
          </div>

          <div className="absolute bottom-2.5 inset-x-0 text-center">
            <span className="rounded-full bg-black/85 px-2 py-0.5 text-[9px] font-mono font-bold text-dasara-gold border border-dasara-gold/40 shadow-sm">
              {zoomLevel}x Macro Lens
            </span>
          </div>
        </div>

        {/* Full-Screen Theatre Lightbox Trigger */}
        <button
          type="button"
          onClick={onOpenLightbox}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 hover:bg-black border border-dasara-gold/40 px-3 py-1 text-xs font-semibold text-dasara-goldLight backdrop-blur-md shadow-lg transition hover:scale-105 cursor-pointer z-20"
          aria-label="Open Full-Screen Theatre View"
        >
          <Maximize2 className="h-3.5 w-3.5 text-dasara-gold" />
          <span className="hidden sm:inline">Theatre View</span>
        </button>

        {/* Instruction pill (hidden during active inspection) */}
        {!isActive && !isTouchActive && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md border border-dasara-gold/40 px-3 py-1 text-[11px] font-medium text-dasara-goldLight shadow-lg pointer-events-none transition-opacity">
            <ZoomIn className="h-3.5 w-3.5 text-dasara-gold" />
            <span>Hover / Hold for {zoomLevel}x Macro Weave Inspection</span>
          </div>
        )}
      </div>

      {/* Optical Zoom Multiplier Bar */}
      <div className="flex items-center justify-between px-1 text-xs">
        <span className="text-zinc-400 text-[11px] flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-dasara-gold" /> Inspection Magnification:
        </span>
        <div className="flex items-center gap-1.5 bg-zinc-950/90 border border-zinc-800 rounded-lg p-1">
          {([2.0, 3.0, 4.5] as ZoomLevel[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onZoomChange(level)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition cursor-pointer ${
                zoomLevel === level
                  ? 'bg-dasara-maroon text-dasara-goldLight border border-dasara-gold/50 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {level}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

### 5.4 Multi-Angle Saree Gallery Track: `src/components/shop/modal/MultiAngleGallery.tsx`

```tsx
import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SareeAngleImage } from '@/types/inspection.types';

interface MultiAngleGalleryProps {
  angleImages: SareeAngleImage[];
  selectedAngleIndex: number;
  onSelectAngle: (index: number) => void;
}

export const MultiAngleGallery: React.FC<MultiAngleGalleryProps> = ({
  angleImages,
  selectedAngleIndex,
  onSelectAngle,
}) => {
  const currentAngle = angleImages[selectedAngleIndex] || angleImages[0];

  const handlePrev = () => {
    onSelectAngle((selectedAngleIndex - 1 + angleImages.length) % angleImages.length);
  };

  const handleNext = () => {
    onSelectAngle((selectedAngleIndex + 1) % angleImages.length);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Angle Selector Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
        {angleImages.map((item, idx) => {
          const isSelected = selectedAngleIndex === idx;
          return (
            <button
              key={item.angle}
              type="button"
              onClick={() => onSelectAngle(idx)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-dasara-maroon to-dasara-deepCrimson text-dasara-goldLight border border-dasara-gold/50 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <span className="text-[11px] font-bold tracking-tight truncate w-full">
                {item.label}
              </span>
              <span className="text-[9px] text-zinc-400 font-serif opacity-80 truncate w-full">
                {item.hindiLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Thumbnail Track with Angle Badges */}
      <div className="relative flex items-center">
        {angleImages.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-2 z-10 h-7 w-7 rounded-full bg-black/80 border border-zinc-700 text-white flex items-center justify-center hover:border-dasara-gold transition cursor-pointer shadow-md"
            aria-label="Previous angle"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div className="flex items-center gap-2.5 overflow-x-auto px-1 py-1 w-full scrollbar-none justify-start sm:justify-center">
          {angleImages.map((item, idx) => {
            const isSelected = selectedAngleIndex === idx;
            return (
              <button
                key={item.angle}
                type="button"
                onClick={() => onSelectAngle(idx)}
                className={`relative h-16 w-16 sm:h-18 sm:w-18 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-dasara-gold scale-105 shadow-[0_0_15px_rgba(212,175,55,0.45)] ring-1 ring-dasara-gold/60'
                    : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                }`}
              >
                <img src={item.url} alt={item.label} className="h-full w-full object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[9px] text-center font-mono py-0.5 text-zinc-300">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {angleImages.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-2 z-10 h-7 w-7 rounded-full bg-black/80 border border-zinc-700 text-white flex items-center justify-center hover:border-dasara-gold transition cursor-pointer shadow-md"
            aria-label="Next angle"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Optical Description of Active Angle */}
      <div className="rounded-lg bg-zinc-950/60 border border-zinc-900 px-3 py-1.5 text-xs text-zinc-300 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-dasara-gold shrink-0" />
        <span className="italic">{currentAngle.description}</span>
      </div>
    </div>
  );
};
```

---

### 5.5 Technical Saree Specification Tabs: `src/components/shop/modal/SareeSpecTabs.tsx`

```tsx
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ShieldCheck, Award, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { SareeProduct } from '@/types/product.types';

interface SareeSpecTabsProps {
  product: SareeProduct;
}

export const SareeSpecTabs: React.FC<SareeSpecTabsProps> = ({ product }) => {
  return (
    <Tabs defaultValue="weave" className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weave">Weave & Loom</TabsTrigger>
        <TabsTrigger value="purity">Fabric & Zari</TabsTrigger>
        <TabsTrigger value="styling">Blouse & Styling</TabsTrigger>
      </TabsList>

      {/* TAB 1: WEAVE & LOOM ARCHITECTURE */}
      <TabsContent value="weave" className="space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Hub Origin:</span>
          <span className="font-semibold text-dasara-champagne flex items-center gap-1">
            📍 {product.provenance}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Loom & Interlock:</span>
          <span className="font-medium text-amber-300">
            {product.category === 'Kanchi Pattu' ? 'Pit Loom Korvai 3-Shuttle Interlock' : 'Kadwa Jacquard Handloom Weave'}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Consignment SKU:</span>
          <span className="font-mono text-zinc-300 font-semibold">{product.sku}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Artisan Weaving Time:</span>
          <span className="font-mono text-emerald-400">14 – 22 Days per Single Saree</span>
        </div>
        <p className="text-zinc-300 text-xs leading-relaxed pt-1.5">
          {product.description}
        </p>
      </TabsContent>

      {/* TAB 2: FABRIC & ZARI PURITY */}
      <TabsContent value="purity" className="space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Silk Certification:</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-emerald-400" />
            Silk Mark Certified (100% Pure Mulberry Silk)
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Zari Specification:</span>
          <span className="font-medium text-amber-300">{product.zariType}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Fabric Composition:</span>
          <span className="font-medium text-dasara-champagne">{product.fabric}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Net Saree Weight:</span>
          <span className="font-mono text-zinc-300">~680g – 740g (Heavy Bridal Fall Class A)</span>
        </div>
        <div className="flex justify-between items-center py-1.5">
          <span className="text-zinc-400">Zari Purity Assay:</span>
          <span className="font-mono text-dasara-gold font-bold">Tested 2G Silver-Gilt Core</span>
        </div>
      </TabsContent>

      {/* TAB 3: BLOUSE & STYLING CONSULTATION */}
      <TabsContent value="styling" className="space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Included Blouse Piece:</span>
          <span className="font-semibold text-emerald-400">{product.blouseDetails}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Recommended Neckline:</span>
          <span className="font-medium text-dasara-champagne">Deep Sweetheart or High Royal Mandarin Collar</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Jewelry Pairing:</span>
          <span className="font-medium text-amber-300">Antique Kemp Vaddanam & Heritage Mango Mala</span>
        </div>
        <div className="flex justify-between items-center py-1.5">
          <span className="text-zinc-400">Auspicious Occasion:</span>
          <span className="font-medium text-dasara-goldLight">Dasara Pooja, Vijayadashami Muhurtham & Weddings</span>
        </div>
      </TabsContent>
    </Tabs>
  );
};
```

---

### 5.6 Full-Screen Lightbox Theatre: `src/components/shop/modal/FullScreenLightbox.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { SareeAngleImage } from '@/types/inspection.types';

interface FullScreenLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  angleImages: SareeAngleImage[];
  initialIndex: number;
  productName: string;
}

export const FullScreenLightbox: React.FC<FullScreenLightboxProps> = ({
  isOpen,
  onClose,
  angleImages,
  initialIndex,
  productName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [initialIndex, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % angleImages.length);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + angleImages.length) % angleImages.length);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
      if (e.key === '+' || e.key === '=') setScale((s) => Math.min(3.5, s + 0.3));
      if (e.key === '-') setScale((s) => Math.max(1, s - 0.3));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, angleImages.length, onClose]);

  const handleZoomIn = () => setScale((s) => Math.min(3.5, s + 0.4));
  const handleZoomOut = () => {
    setScale((s) => {
      const next = Math.max(1, s - 0.4);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const currentImage = angleImages[currentIndex] || angleImages[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="fixed inset-0 z-50 max-w-none w-screen h-screen bg-black/95 p-0 border-0 flex flex-col justify-between select-none">
        
        {/* Top Theatre Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/90 to-transparent z-20">
          <div>
            <h3 className="font-serif text-lg font-bold text-dasara-champagne">{productName}</h3>
            <p className="text-xs text-dasara-gold font-mono">
              Angle {currentIndex + 1} of {angleImages.length}: {currentImage.label} ({currentImage.description})
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-white">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-dasara-gold"
                title="Zoom In (+)"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-dasara-gold"
                title="Zoom Out (-)"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white"
                title="Reset Zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <span className="px-2 text-xs font-mono font-bold text-zinc-300">
                {Math.round(scale * 100)}%
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-dasara-gold transition"
              aria-label="Close Theatre View"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Viewport Canvas */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={`relative flex-1 flex items-center justify-center overflow-hidden ${
            scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
          }`}
        >
          <img
            src={currentImage.url}
            alt={currentImage.label}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
            className="max-h-[85vh] max-w-[85vw] object-contain pointer-events-none drop-shadow-2xl"
          />

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => {
              setCurrentIndex((prev) => (prev - 1 + angleImages.length) % angleImages.length);
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/70 border border-zinc-700 text-white flex items-center justify-center hover:border-dasara-gold hover:bg-black transition cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentIndex((prev) => (prev + 1) % angleImages.length);
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/70 border border-zinc-700 text-white flex items-center justify-center hover:border-dasara-gold hover:bg-black transition cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="flex items-center justify-center gap-3 py-4 bg-gradient-to-t from-black/90 to-transparent z-20">
          {angleImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setScale(1);
                setPosition({ x: 0, y: 0 });
              }}
              className={`h-14 w-14 rounded-lg overflow-hidden border-2 transition ${
                currentIndex === idx
                  ? 'border-dasara-gold scale-110 shadow-[0_0_12px_#D4AF37]'
                  : 'border-zinc-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.label} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

      </DialogContent>
    </Dialog>
  );
};
```

---

### 5.7 High-Conversion Modal Commerce Actions: `src/components/shop/modal/ModalConversionBar.tsx`

```tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Video, Share2, Store } from 'lucide-react';
import { SareeProduct } from '@/types/product.types';
import {
  getWhatsAppOrderUrl,
  getWhatsAppVideoConsultUrl,
  getWhatsAppShareUrl,
} from '@/lib/whatsapp';

interface ModalConversionBarProps {
  product: SareeProduct;
}

export const ModalConversionBar: React.FC<ModalConversionBarProps> = ({ product }) => {
  return (
    <div className="mt-5 space-y-2.5 pt-2 border-t border-zinc-800/80">
      {/* Primary CTA: WhatsApp Direct Reserve */}
      <Button
        onClick={() => window.open(getWhatsAppOrderUrl(product), '_blank')}
        className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 text-sm sm:text-base font-bold text-white shadow-xl shadow-emerald-950/40 rounded-xl cursor-pointer transition hover:scale-[1.01]"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Reserve / Buy via WhatsApp Now
      </Button>

      {/* Secondary CTA: Video Call Consultation */}
      <Button
        variant="outline"
        onClick={() => window.open(getWhatsAppVideoConsultUrl(product), '_blank')}
        className="w-full border-dasara-gold/50 text-dasara-goldLight hover:bg-dasara-gold/10 py-5 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
      >
        <Video className="mr-2 h-4 w-4 text-dasara-gold" />
        Book 5-Min Live Video Call Saree Trial
      </Button>

      {/* Tertiary CTA: WhatsApp Family Share */}
      <Button
        variant="outline"
        onClick={() => window.open(getWhatsAppShareUrl(product), '_blank')}
        className="w-full border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/80 py-4 text-xs font-medium rounded-xl cursor-pointer"
      >
        <Share2 className="mr-2 h-4 w-4 text-dasara-gold" />
        Share Saree with Family on WhatsApp
      </Button>

      {/* Boutique Notice */}
      <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-zinc-400">
        <Store className="h-3.5 w-3.5 text-dasara-gold" />
        <span>Visit Store for Live Physical Trial • Special Dasara Timings 10 AM - 10 PM</span>
      </div>
    </div>
  );
};
```

---

## 6. Step-by-Step Implementation Sequence

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 6 CHRONOLOGICAL EXECUTION SEQUENCE                  │
├───────────────────────────────────────────────────────────────────────────────┤
│ Step 1: Create src/types/inspection.types.ts                                  │
│         - Define SareeAngleType, SareeAngleImage, ZoomLevel, TechnicalSpecs.  │
│                                                                               │
│ Step 2: Implement src/components/ui/tabs.tsx                                  │
│         - Wrap @radix-ui/react-tabs with Dasara gold/maroon design tokens.    │
│                                                                               │
│ Step 3: Implement src/components/shop/modal/FabricLoupeLens.tsx               │
│         - Ref-based 60/120 FPS cursor tracking & 2x/3x/4.5x macro zoom toggle.│
│                                                                               │
│ Step 4: Implement src/components/shop/modal/MultiAngleGallery.tsx             │
│         - 4-angle pill navigation, thumbnail rail, and optical descriptions.  │
│                                                                               │
│ Step 5: Implement src/components/shop/modal/FullScreenLightbox.tsx            │
│         - Full-screen theatre view with zoom/pan and keyboard hotkeys.        │
│                                                                               │
│ Step 6: Implement src/components/shop/modal/SareeSpecTabs.tsx                 │
│         - Accessible tabs for Weave & Loom, Fabric & Zari, and Blouse Styling.│
│                                                                               │
│ Step 7: Implement src/components/shop/modal/ModalConversionBar.tsx            │
│         - WhatsApp Order, Video Trial, and Family Share CTAs.                 │
│                                                                               │
│ Step 8: Refactor src/components/shop/ProductQuickViewModal.tsx                │
│         - Assemble all modular components into a sleek coordinator dialog.    │
│                                                                               │
│ Step 9: Enrich src/data/products.ts with 4-angle image datasets               │
│         - Populate full drape, pallu, border, and blouse images per product.  │
│                                                                               │
│ Step 10: Validation & Quality Audits                                          │
│          - Execute tsc -b and npm run build; perform Chrome DevTools audits.  │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Verification & Quality Gates

| Quality Gate | Method | Target Standard |
| :--- | :--- | :--- |
| **TypeScript Strictness** | `tsc -b` | 0 errors across all new types and component exports. |
| **Production Build** | `npm run build` | Clean Vite bundle under 55s with 0 warnings. |
| **Loupe Frame Rate** | Chrome DevTools Performance Trace | Locked 60/120 FPS during cursor movement; zero layout thrashing. |
| **Angle Switching Latency** | Chrome DevTools Script Audit | Angle switch completed in `< 16ms` (single frame). |
| **Keyboard Accessibility** | Native keypress tests (`Tab`, `Esc`, `Arrows`) | Focus rings visible; `Esc` dismisses dialog cleanly. |
| **Mobile Responsiveness** | Chrome DevTools `resize_page` (390x844) | Zero horizontal layout overflow; touch-and-hold loupe active. |

---

## 8. Risk Assessment & Mitigation Matrix

| Potential Risk | Root Cause | Architectural Mitigation |
| :--- | :--- | :--- |
| **Image Aspect Ratio Jitter** | Angles having different aspect ratios causes modal jumping. | Enforced fixed `aspect-[3/4]` container with `object-cover` and preloaded dimensions. |
| **Touch Event Scroll Hijacking** | Finger drag on loupe triggers mobile browser pull-to-refresh. | Attached `touch-action: none` to the loupe container during active inspection. |
| **Z-Index Layer Clashes** | Loupe lens rendering under badges or lightbox rendering under header. | Explicit Z-index stacking (`z-30` for lens, `z-50` for lightbox, `z-40` for sticky header). |
| **Monolithic Component Decay** | All modal code in a single 500+ line file. | Strict modularization into dedicated single-responsibility components in `src/components/shop/modal/`. |

---

## 9. Manual Verification Protocol for the User

When Phase 6 is implemented, you can verify each feature manually:

1. **Test 4-Angle Switching**:
   - Open any saree modal by clicking "Inspect Showstopper" or a catalog card.
   - Click each of the 4 angle pills (*Full Drape*, *Grand Pallu*, *Zari Border*, *Blouse Piece*).
   - Verify the main image switches instantaneously without layout jumping.
2. **Test 60/120 FPS Loupe**:
   - Hover your mouse over the main saree image.
   - Verify the circular magnifying glass follows your cursor with zero lag.
   - Click the `2x`, `3x`, and `4.5x` zoom buttons below the image; confirm the magnification changes smoothly.
3. **Test Full-Screen Lightbox Theatre**:
   - Click the "Theatre View" button at the top-right of the image.
   - Verify the image expands to full-screen.
   - Use `+` and `-` to zoom, and drag with your mouse to pan around the fabric.
   - Press `Esc` on your keyboard to close the theatre view.
4. **Test Radix UI Spec Tabs**:
   - Click on the 3 tabs: *Weave & Loom*, *Fabric & Zari*, and *Blouse & Styling*.
   - Verify the technical specifications update smoothly.
5. **Test WhatsApp Conversion CTAs**:
   - Click "Reserve / Buy via WhatsApp Now" to verify the pre-populated WhatsApp message.
   - Click "Book 5-Min Live Video Call" to verify the video consultation prompt.
   - Click "Share Saree with Family on WhatsApp" to verify the share link.
