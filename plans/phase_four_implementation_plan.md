# 🥻 Phase 4 Implementation Plan: ReactBits Interactive Physics Cards & Showstopper Spotlight Showcase

**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff Frontend & Interaction Design Architect  
**Interaction Libraries:** ReactBits Physics Primitives, Custom CSS 3D Transforms, Web Animations API  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+  
**File Location:** `plans/phase_four_implementation_plan.md` & `phase_four_implementation_plan.md`  

---

## 1. Executive Summary & Retail Context

In **Phase 1**, we engineered the core architecture: Vite 5, React 18, TypeScript 5.6, the Royal Dasara design tokens, Supabase database configuration, and the Admin Auth gateway.  
In **Phase 2**, we built the e-commerce data layer: the 20+ saree consignment seed ("maal" lots from 11 regional weaver guilds), real-time inventory synchronization, and sub-20ms client-side filtering.  
In **Phase 3**, we implemented the centerpiece GPU Three.js Waving Silk Simulation with PBR microfacet sheen, real-time wave physics, and interactive colorway swatch switching.

### The Problem Phase 4 Solves: High-Ticket Saree Differentiation
In an authentic Indian saree boutique during Dasara, inventory falls into two distinct commercial tiers:
1. **Standard Festive Catalog**: High-volume sarees (Organza, Fancy sarees, everyday festive kurtis) priced between ₹3,000 and ₹7,000.
2. **"Showstoppers" (1-of-1 Dealer Masterpieces)**: High-ticket bridal Kanchipuram, heirloom Banarasi Kadwa, and double-warp Dharmavaram pattu priced between ₹9,999 and ₹25,000+.

Displaying these high-ticket masterpieces in a standard flat product grid diminishes their perceived value. Discerning bridal and festive shoppers expect an **exclusive VIP presentation** that highlights their rarity, 3-ply gold zari density, and single-piece consignment status.

**Phase 4 introduces ReactBits Interactive Physics Cards & the VIP Showstopper Spotlight Showcase**:
- **3D Perspective Tilt Physics (`TiltedCard.tsx`)**: Realistic mouse/touch parallax where card contents (images, 1-of-1 badges, price tags) float at distinct Z-depths (`transform-style: preserve-3d`), creating physical depth as the card responds to mouse movement.
- **Dynamic Specular Glare Tracking**: Simulates the gleam of pure gold zari catching boutique halogen spotlights as the card tilts.
- **Animated Gold Border Beam (`BorderBeam.tsx`)**: A continuous, high-precision luminous gold light ray tracing along card perimeters to command visual attention.
- **Dedicated VIP Showstopper Showcase (`ShowstopperShowcase.tsx`)**: A curated horizontal presentation featuring the top 4 handpicked dealer showstoppers with instant 1-click WhatsApp VIP video trial requests.
- **Ambient Cursor Spotlight (`SpotlightCard.tsx`)**: Subtle cursor-following radial gold glow across standard catalog cards.

---

## 2. Master 10-Phase Roadmap Context

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SRI SAI CLOTHSTORE 10-PHASE ROADMAP               │
├────────────────────────────────────────────────────────────────────────┤
│  ✓ PHASE 1: Tooling, Design Tokens, Supabase MCP & Admin Auth Bedrock  │ (COMPLETED)
│  ✓ PHASE 2: "Maal" Data Architecture, Live Inventory & Catalog Grid    │ (COMPLETED)
│  ✓ PHASE 3: High-Performance GPU Three.js Waving Silk Hero Simulation  │ (COMPLETED)
│  ► PHASE 4: ReactBits Interactive Physics Cards & Showstopper Showcase │ ◄ (CURRENT FOCUS)
│    PHASE 5: Weaving Guild Marquee & Festive Urgency Tickers            │
│    PHASE 6: Multi-Angle Saree Inspection Modal (shadcn/ui Dialog/Tabs) │
│    PHASE 7: 1-Click WhatsApp Ordering & Live Video Consultation Engine │
│    PHASE 8: Admin Management Portal (Live CRUD, Photo Uploads, Stock)  │
│    PHASE 9: Mobile Performance Profiling & WebP Asset Optimization     │
│    PHASE 10: Production Build, Vercel/Netlify Deployment & QR Launch   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 4 Scope & Granular Deliverables

| Module / Component | Target File Location | Core Deliverables |
| :--- | :--- | :--- |
| **Advanced 3D Multi-Layer Tilt Card** | `src/components/reactbits/TiltedCard.tsx` | True 3D perspective tilt (`perspective: 1200px`, `rotateX`, `rotateY`) with dynamic Z-axis depth layering (`translateZ(30px)` for badges, `translateZ(20px)` for titles) and specular glare tracking. |
| **Luminous Gold Border Beam** | `src/components/reactbits/BorderBeam.tsx` | Pure CSS / SVG GPU-accelerated animated beam that traces the contour of showstopper cards with pure `#D4AF37` temple zari illumination. |
| **Ambient Radial Spotlight Card** | `src/components/reactbits/SpotlightCard.tsx` | Cursor-following radial light layer illuminating card borders and surface background with configurable gold hues. |
| **VIP Showstopper Showcase Container** | `src/components/shop/ShowstopperShowcase.tsx` | Curated VIP showcase section positioned right beneath the Hero marquee, presenting the top 4 dealer 1-of-1 consignments with exclusive badges and WhatsApp trial CTAs. |
| **Upgraded ProductCard Integration** | `src/components/shop/ProductCard.tsx` | Refined card layout integrating multi-layer 3D tilt, subtle hover zoom, and fluid touch interactions for mobile devices. |
| **Storefront Architecture Wiring** | `src/App.tsx` | Placement of the Showstopper Showcase directly between the Weaver Hub Marquee and the Countdown Timer, establishing a high-converting hierarchy. |

---

## 4. Interaction Physics & Mathematical Formulation

### 4.1 3D Perspective Euler Tilt Physics
Given a card of dimensions $W \times H$ and a pointer position $(x, y)$ relative to the card's top-left corner:
1. **Normalized Pointer Coordinates**:
   $$u = \frac{x - \frac{W}{2}}{\frac{W}{2}} \in [-1, 1], \quad v = \frac{y - \frac{H}{2}}{\frac{H}{2}} \in [-1, 1]$$
2. **Rotation Euler Angles**:
   $$\theta_x = -v \cdot \theta_{\max}, \quad \theta_y = u \cdot \theta_{\max}$$
   Where $\theta_{\max} = 10^\circ$ prevents extreme distortion while providing tangible physical tilt.
3. **Compound 3D Transform**:
   $$\mathbf{T} = \text{perspective}(1200\text{px}) \cdot \text{rotateX}(\theta_x) \cdot \text{rotateY}(\theta_y) \cdot \text{scale3d}(1.025, 1.025, 1.025)$$

### 4.2 Multi-Layer Spatial Parallax (True Z-Depth)
By applying `transform-style: preserve-3d` to the card container, child elements float at different physical elevations above the card plane:
- **Background Fabric & Vignette**: `translateZ(0px)`
- **Saree Image Plate**: `translateZ(10px)`
- **Weave Origin & Provenance Pill**: `translateZ(22px)`
- **1-of-1 Dealer Exclusive Badge**: `translateZ(36px)` (maximum pop-out)
- **Title & Pricing Badge**: `translateZ(28px)`

This multi-layer elevation creates authentic visual depth as the user tilts the card.

### 4.3 Specular Glare Reflection Dynamics
To simulate light bouncing off metallic zari threads, a radial gradient overlay tracks the inverted angle of incidence:
$$\text{GlarePosition} = (50 + u \cdot 35\%, \ 50 + v \cdot 35\%)$$
$$\text{Opacity} = \alpha_{\text{base}} \cdot \sqrt{u^2 + v^2}$$
As the card tilts towards light, the gold specular highlight intensifies naturally.

---

## 5. Technical Specifications & Implementation Code

### 5.1 Advanced Multi-Layer Tilt Card: `src/components/reactbits/TiltedCard.tsx`

```tsx
import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  glareOpacity?: number;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  perspective = 1200,
  glareOpacity = 0.22,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      setRotateX(tiltX);
      setRotateY(tiltY);
      setGlarePosition({
        x: 50 + ((x - centerX) / centerX) * 35,
        y: 50 + ((y - centerY) / centerY) * 35,
      });
    },
    [maxTilt]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative will-change-transform', className)}
      style={{
        perspective: `${perspective}px`,
      }}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {children}

        {/* Specular Glare Overlay */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-40 rounded-[inherit] overflow-hidden transition-opacity duration-300"
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(245, 208, 110, 0.45) 0%, rgba(245, 208, 110, 0) 65%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
```

---

### 5.2 Animated Gold Border Beam: `src/components/reactbits/BorderBeam.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 180,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = '#D4AF37',
  colorTo = '#F7E7A9',
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width))_solid_transparent]',
        '![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
        'after:absolute after:aspect-square after:w-[calc(var(--size))] after:animate-border-beam after:[animation-delay:var(--delay)]',
        'after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]',
        'after:[offset-anchor:calc(var(--size)/2)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)))]',
        className
      )}
    />
  );
};
```

---

### 5.3 Dedicated VIP Showstopper Showcase: `src/components/shop/ShowstopperShowcase.tsx`

```tsx
import React from 'react';
import { SareeProduct } from '@/types/product.types';
import { TiltedCard } from '@/components/reactbits/TiltedCard';
import { BorderBeam } from '@/components/reactbits/BorderBeam';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { Crown, Sparkles, MessageCircle, Eye, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppVideoConsultUrl } from '@/lib/whatsapp';

interface Props {
  showstoppers: SareeProduct[];
  onQuickView: (product: SareeProduct) => void;
}

export const ShowstopperShowcase: React.FC<Props> = ({ showstoppers, onQuickView }) => {
  if (!showstoppers || showstoppers.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-dasara-gold/40 bg-gradient-to-br from-[#1C0F17] via-[#120B10] to-[#0E0C0F] p-6 sm:p-10 shadow-2xl">
      {/* Ambient Lighting Accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-dasara-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-dasara-maroon/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-dasara-gold/20 pb-6 mb-8">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 rounded-full bg-dasara-maroon/90 border border-dasara-gold/40 px-3.5 py-1 text-xs font-semibold text-dasara-goldLight shadow-md">
            <Crown className="h-3.5 w-3.5 text-dasara-gold" />
            <span>Grand Festive Curated Masterpieces</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
            VIP 1-of-1 Showstoppers{' '}
            <span className="block sm:inline">
              <ShinyText text="Direct Dealer Consignments" speed={3.5} className="font-serif font-black" />
            </span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-2xl">
            Single-piece heirloom creations handpicked from master weaver looms. Once booked, these pieces cannot be re-ordered for Dasara 2026.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-300 font-mono bg-black/60 border border-dasara-gold/30 px-3.5 py-2 rounded-xl backdrop-blur-md self-start md:self-auto">
          <Sparkles className="h-3.5 w-3.5 text-dasara-gold animate-pulse" />
          <span>{showstoppers.length} Heirloom Pieces Available</span>
        </div>
      </div>

      {/* Grid of Showstoppers with 3D Tilt & Border Beam */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {showstoppers.map((saree) => (
          <TiltedCard
            key={saree.id}
            maxTilt={9}
            scale={1.03}
            glareOpacity={0.25}
            className="h-full"
          >
            <div className="relative flex flex-col h-full rounded-2xl bg-gradient-to-b from-[#1E141B] to-[#120D11] border border-dasara-gold/40 shadow-xl overflow-hidden group">
              {/* Animated Gold Border Beam */}
              <BorderBeam size={160} duration={7} colorFrom="#D4AF37" colorTo="#FFE58F" />

              {/* Saree Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                <img
                  src={saree.images[0]}
                  alt={saree.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#120D11] via-transparent to-black/40 opacity-80 group-hover:opacity-50 transition-opacity duration-300" />

                {/* Floating 3D Badges */}
                <div
                  className="absolute top-3 left-3 right-3 flex justify-between items-start z-20"
                  style={{ transform: 'translateZ(36px)' }}
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-dasara-maroon to-dasara-gold px-3 py-1 text-[11px] font-bold text-white shadow-xl border border-dasara-gold/50 backdrop-blur-md">
                    <Crown className="h-3 w-3 text-dasara-goldLight" /> 1-of-1 Piece
                  </span>
                  <span className="rounded-full bg-dasara-maroon px-2.5 py-1 text-[11px] font-bold text-white shadow-lg border border-dasara-gold/40">
                    {saree.discountPercent}% OFF
                  </span>
                </div>

                <div
                  className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs z-20"
                  style={{ transform: 'translateZ(24px)' }}
                >
                  <span className="inline-flex items-center gap-1 rounded-lg bg-black/85 px-2.5 py-1 text-[11px] text-zinc-200 backdrop-blur-md border border-white/10 font-medium">
                    <MapPin className="h-3 w-3 text-dasara-gold" />
                    {saree.provenance.split(',')[0]}
                  </span>
                  {saree.isSilkMarkCertified && (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-950/90 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-md">
                      <ShieldCheck className="h-3.5 w-3.5" /> Silk Mark
                    </span>
                  )}
                </div>

                {/* Quick View Overlay Button */}
                <button
                  onClick={() => onQuickView(saree)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30 cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2 rounded-xl bg-dasara-gold px-5 py-2.5 text-xs font-bold text-black shadow-2xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 hover:bg-dasara-goldLight">
                    <Eye className="h-4 w-4" /> Inspect Showstopper
                  </span>
                </button>
              </div>

              {/* Saree Info */}
              <div
                className="flex flex-1 flex-col justify-between p-4 space-y-3"
                style={{ transform: 'translateZ(26px)' }}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1 font-mono">
                    <span>{saree.sku}</span>
                    <span className="text-amber-400 font-sans font-bold">Only 1 in stock</span>
                  </div>
                  <h3
                    onClick={() => onQuickView(saree)}
                    className="cursor-pointer font-serif text-base font-bold text-dasara-champagne leading-snug line-clamp-1 group-hover:text-dasara-gold transition-colors"
                  >
                    {saree.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-1 font-sans">
                    {saree.fabric} • {saree.zariType}
                  </p>
                </div>

                {/* Pricing & CTAs */}
                <div className="pt-3 border-t border-zinc-800">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-black text-dasara-gold">
                        ₹{saree.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-zinc-500 line-through">
                        ₹{saree.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="rounded-md bg-emerald-950/80 border border-emerald-600/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                      Save ₹{(saree.originalPrice - saree.price).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onQuickView(saree)}
                      className="w-full text-xs border-dasara-gold/40 hover:bg-dasara-gold/10 hover:text-dasara-gold"
                    >
                      Details
                    </Button>
                    <Button
                      variant="whatsapp"
                      size="sm"
                      onClick={() => window.open(getWhatsAppVideoConsultUrl(saree), '_blank')}
                      className="w-full text-xs font-semibold shadow-md shadow-emerald-950/40"
                    >
                      <MessageCircle className="h-3.5 w-3.5 mr-1" />
                      Video Trial
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TiltedCard>
        ))}
      </div>
    </section>
  );
};
```

---

## 6. Step-by-Step Implementation Sequence

1. **Step 1: Implement Keyframe Animation in `tailwind.config.js` and `src/index.css`**
   - Add `@keyframes border-beam` and `animate-border-beam` configuration to support continuous gold light ray tracing.
2. **Step 2: Create `BorderBeam.tsx` Component**
   - Implement `src/components/reactbits/BorderBeam.tsx` with customizable beam size, color gradient, and rotation duration.
3. **Step 3: Upgrade `TiltedCard.tsx` with Multi-Layer 3D Depth**
   - Enhance `src/components/reactbits/TiltedCard.tsx` with `transform-style: preserve-3d` and dynamic glare positioning.
4. **Step 4: Create `ShowstopperShowcase.tsx` VIP Showcase**
   - Implement `src/components/shop/ShowstopperShowcase.tsx` filtering `products.filter(p => p.isFeaturedShowstopper)`.
5. **Step 5: Integrate Showcase into Storefront (`src/App.tsx`)**
   - Wire `ShowstopperShowcase` right beneath the Weaver Hub Marquee and above the countdown timer.
6. **Step 6: Verification & Quality Audits with Chrome DevTools MCP**
   - Test 3D hover tilt physics and specular glare response.
   - Verify continuous border beam animation.
   - Run `npm run build` to ensure 0 TypeScript errors.
   - Inspect console logs and mobile viewport (390x844).

---

## 7. Verification & Quality Gates

| Quality Gate | Method | Target Standard |
| :--- | :--- | :--- |
| **TypeScript Compilation** | `tsc -b` | 0 errors, strict type safety, zero unused imports. |
| **Production Build** | `vite build` | Complete clean build; assets bundled without warnings. |
| **Console Log Audit** | Chrome DevTools MCP `list_console_messages` | Zero runtime errors or animation warnings. |
| **Tilt Physics Response** | Chrome DevTools MCP cursor hover test | Smooth 3D perspective tilt with specular gold glare. |
| **Border Beam Animation** | Chrome DevTools MCP visual inspection | Continuous smooth luminous ray along showstopper card borders. |
| **Mobile Responsiveness** | Chrome DevTools MCP `emulate` (390x844) | Clean single-column stacking with zero horizontal overflow. |

---

## 8. Risk Assessment & Mitigation Matrix

| Potential Risk | Root Cause | Architectural Mitigation |
| :--- | :--- | :--- |
| **GPU Lag from Multiple 3D Transforms** | Overlapping 3D card perspectives on low-end laptops. | Apply `will-change: transform` and limit `maxTilt` to 9 degrees; reset transforms on mouse leave. |
| **Touch Event Distortion on Mobile** | Touch drags inadvertently triggering 3D tilt while scrolling. | Disable 3D tilt on touch devices via media query `(hover: hover)` so mobile users enjoy smooth touch scrolling without card wobble. |
| **Border Beam Mask Incompatibility** | Older browser engines failing SVG mask composites. | Fallback to a solid subtle gold border (`border border-dasara-gold/40`) when CSS masks are unsupported. |
| **Z-Index Layer Clipping** | `overflow: hidden` on parent cards flattening `translateZ`. | Isolate 3D layers inside the `preserve-3d` wrapper; apply Z-depth to text and badges while keeping card edges cleanly rounded. |

---

## 9. Ready-to-Proceed Checklist

Once approved, Phase 4 will be implemented in strict order:
- [ ] Add `@keyframes border-beam` to Tailwind / CSS
- [ ] Create `src/components/reactbits/BorderBeam.tsx`
- [ ] Upgrade `src/components/reactbits/TiltedCard.tsx`
- [ ] Create `src/components/shop/ShowstopperShowcase.tsx`
- [ ] Wire `ShowstopperShowcase` in `src/App.tsx`
- [ ] Chrome DevTools MCP inspection & `npm run build` verification
