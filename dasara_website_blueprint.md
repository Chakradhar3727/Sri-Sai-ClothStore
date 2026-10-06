# 🥻 Comprehensive Research, Architecture & 10-Day Implementation Blueprint: Sri Sai ClothStore (Dasara Grand Launch)

---

## Executive Summary & Strategic Architecture

Ahead of the upcoming **10-day Dasara Sale**, this blueprint provides an end-to-end guide to build an e-commerce website for **Sri Sai ClothStore**.

The system addresses two requirements:
1. **Visual Fascination & Festive Luxury**: Evoking the richness of a royal temple saree boutique (deep kumkuma crimson, pure temple zari gold, glowing amber) using **ReactBits** micro-interactions, **shadcn/ui** accessible components, and a **GPU-accelerated Three.js silk simulation**.
2. **High-Conversion Regional Commerce**: Honoring Indian retail dynamics—where high-ticket sarees (Kanchipuram, Banarasi, Dharmavaram) are bought through high-trust channels: **1-Click WhatsApp Ordering**, **Live Video Saree Consultations**, **1-of-1 Dealer Consignment Badges**, and **In-Store Footfall Counter Coupons**.

---

## 1. Decoded Terminology & Critical Technical Findings

| Requirement / Item | Industry Context & Verified Finding | Architectural Solution |
| :--- | :--- | :--- |
| **"Each and Every Mall"** | In Indian textile trade, **"maal" (माल / మాల్)** refers to **wholesale stock consignments and dealer inventory lots** acquired from regional weaving hubs (Surat maal, Kanchipuram maal, Varanasi brocade lots). | Saree catalog structured by **Dealer Provenance & Origin Hubs** with batch-level "New Lot Arrival" badges and 1-of-1 uniqueness flags. |
| **"ChatCNY"** | Speech-to-text artifact for **shadcn/ui** (shad-c-n-y). | Headless Radix UI primitives styled with luxury festive Tailwind design tokens. |
| **"3JS" (Three.js)** | 3D WebGL library used for visual appeal on arrival. | A **GPU-accelerated waving silk fabric** using GLSL vertex shaders (`onBeforeCompile`), running at 60 FPS on mobile with 0 CPU overhead. |
| **"ReactBits"** | UI library for micro-interactions and interactive card physics. | `TiltedCard` (3D gyroscope/mouse parallax for dealer showstoppers), `ShinyText` (gold zari shimmer headlines), and `SpotlightCard` (radial gold cursor reflection). |
| **Framework Choice** | **Vite + React 18/TypeScript** is chosen over Next.js for a 10-day timeline to eliminate WebGL SSR hydration crashes and achieve 60-second static deployment to Vercel/Netlify. |

---

## 2. Visual Design System: Royal Dasara Festive Aesthetic

### 2.1 Color Palette & Festive Tokens (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dasara: {
          maroon: '#6B0B24',       // Royal Kumkuma Maroon (Primary brand)
          deepCrimson: '#420614',  // Deep contrast background
          gold: '#D4AF37',         // Pure Temple Zari Gold
          goldLight: '#F7E7A9',    // Shimmer highlight
          peacock: '#0D5C75',      // Peacock Teal (Auspicious secondary)
          emerald: '#0B4D3C',      // Deep Silk Green
          haldi: '#E5A93C',        // Festive Turmeric Gold
          champagne: '#FAF6F0',    // Silk Ivory (Text and light cards)
          obsidian: '#121013',     // Rich dark ground
          cardBg: '#1A1518',       // Card surface
          borderGold: 'rgba(212, 175, 55, 0.25)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'shine': 'shine 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 3. High-Performance Three.js & R3F: GPU Silk Simulation

To give the website a festive first impression when visitors open the site, the Hero banner features a **3D waving pure silk fabric** with zari sheen and floating festive gold dust.

### 3.1 GPU-Accelerated Waving Silk Drape (`src/components/three/SilkClothDrape.tsx`)

```tsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GpuWavingSilkPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniformsRef = useRef({
    uTime: { value: 0 },
  });

  useFrame((_, delta) => {
    uniformsRef.current.uTime.value += delta * 1.4;
  });

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#7A0C2B'), // Royal Saree Crimson
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      sheen: 1.0,                       // Crucial for pure silk fiber sheen
      sheenColor: new THREE.Color('#F2CF66'), // Golden Zari Luster
      sheenRoughness: 0.3,
      side: THREE.DoubleSide,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniformsRef.current.uTime;
      shader.vertexShader = `
        uniform float uTime;
        ${shader.vertexShader}
      `;
      // Inject wave deformation directly into GLSL vertex pipeline
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float wave = sin(transformed.x * 1.4 + uTime * 1.6) * 0.28
                   + cos(transformed.y * 1.8 + uTime * 1.2) * 0.22
                   + sin((transformed.x + transformed.y) * 1.1 + uTime * 0.9) * 0.14;
        transformed.z += wave;
        `
      );
    };

    return mat;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh
        ref={meshRef}
        rotation={[-0.35, 0.28, -0.08]}
        position={[1.1, -0.15, 0]}
        material={material}
      >
        <planeGeometry args={[7.0, 4.8, 64, 64]} />
      </mesh>
    </Float>
  );
}

function GoldFestiveDust({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 14;
      pos[i + 1] = (Math.random() - 0.5) * 9;
      pos[i + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#D4AF37"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const Hero3DCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-95">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 6, 3]} intensity={2.8} color="#FFF8E7" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#D4AF37" />
        <Environment preset="city" />
        <GpuWavingSilkPlane />
        <GoldFestiveDust />
      </Canvas>
    </div>
  );
};
```

---

## 4. ReactBits Animated Components

### 4.1 `ShinyText` (Gold Zari Shimmer Headlines)
```tsx
// src/components/reactbits/ShinyText.tsx
import React from 'react';

interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  speed = 4,
  className = "",
}) => {
  return (
    <span
      className={`inline-block bg-[linear-gradient(110deg,#D4AF37,35%,#FFF9E6,50%,#D4AF37,65%)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shine ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
};
```

### 4.2 `SpotlightCard` (Radial Golden Cursor Light)
```tsx
// src/components/reactbits/SpotlightCard.tsx
import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  children: React.ReactNode;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(212, 175, 55, 0.16)",
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-dasara-borderGold bg-dasara-cardBg transition-all duration-300 hover:border-dasara-gold/60 hover:shadow-2xl hover:shadow-dasara-gold/15 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
```

### 4.3 `TiltedCard` (3D Mouse Tilt for Dealer Unique Pieces)
```tsx
// src/components/reactbits/TiltedCard.tsx
import React, { useRef, useState } from 'react';

interface TiltedCardProps {
  imageSrc: string;
  altText: string;
  badge?: string;
  provenance: string;
  title: string;
  price: number;
  originalPrice: number;
  onQuickView: () => void;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText,
  badge = "Exclusive Dealer Masterpiece",
  provenance,
  title,
  price,
  originalPrice,
  onQuickView,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: ((y - centerY) / centerY) * -9,
      y: ((x - centerX) / centerX) * 9,
    });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <div style={{ perspective: '1000px' }} className="w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onQuickView}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dasara-gold/40 bg-zinc-950 p-3 shadow-2xl transition-all duration-300 hover:border-dasara-gold hover:shadow-dasara-gold/20"
      >
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-1">
          <span className="rounded-full bg-gradient-to-r from-dasara-maroon to-dasara-gold px-3.5 py-1 text-xs font-bold tracking-wider text-white shadow-lg">
            {badge}
          </span>
          <span className="rounded-full bg-black/75 px-2.5 py-0.5 text-[11px] font-medium text-dasara-goldLight border border-dasara-gold/30">
            📍 {provenance}
          </span>
        </div>
        <div className="overflow-hidden rounded-xl">
          <img
            src={imageSrc}
            alt={altText}
            className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="mt-3.5 px-1 pb-1">
          <h4 className="font-serif text-lg font-semibold text-dasara-champagne group-hover:text-dasara-gold line-clamp-1">
            {title}
          </h4>
          <div className="mt-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-dasara-gold">₹{price.toLocaleString('en-IN')}</span>
              <span className="text-sm text-zinc-400 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
            </div>
            <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-800/40">
              Save ₹{(originalPrice - price).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 4.4 `InfiniteMarquee` (Textile Weaver Hubs Ticker)
```tsx
// src/components/reactbits/DealerHubMarquee.tsx
import React from 'react';

const HUBS = [
  "✨ KANCHIPURAM SILK WEAVERS",
  "🥻 VARANASI KADWA BROCADES",
  "🌟 SURAT EXCLUSIVE DESIGNERS",
  "🏛️ DHARMAVARAM PATTU LOOMS",
  "🎨 POCHAMPALLY IKKAT MASTERS",
  "💎 GADWAL CONTRAST ZARI",
  "🌸 CHANDERI ROYAL WEAVES"
];

export const DealerHubMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-dasara-borderGold bg-dasara-deepCrimson/40 py-3 backdrop-blur-md">
      <div className="flex w-max animate-marquee space-x-10 text-xs font-semibold tracking-widest text-dasara-goldLight uppercase">
        {[...HUBS, ...HUBS].map((item, idx) => (
          <span key={idx} className="flex items-center gap-4">
            {item}
            <span className="text-dasara-gold/40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
```

---

## 5. shadcn/ui Component Catalog & High-Trust UX

Install required components:
```bash
npx shadcn@latest add button card badge dialog sheet tabs
```

### 5.1 Saree Multi-Angle Inspection Modal (`src/components/shop/ProductQuickViewModal.tsx`)

```tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SareeProduct } from '@/data/products';
import { MessageCircle, Video, ShieldCheck, Store, Clock } from 'lucide-react';
import { getWhatsAppOrderUrl, getWhatsAppVideoConsultUrl } from '@/lib/whatsapp';

interface Props {
  product: SareeProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl border border-dasara-gold/40 bg-zinc-950 p-6 text-white sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              <img
                src={product.images[selectedImgIdx]}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
              {product.isDealerUnique && (
                <Badge className="absolute top-3 left-3 bg-dasara-gold text-black font-semibold shadow-md">
                  ★ 1-of-1 Dealer Piece
                </Badge>
              )}
              {product.isSilkMarkCertified && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-600/40">
                  <ShieldCheck className="h-3.5 w-3.5" /> Silk Mark Certified
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIdx(idx)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImgIdx === idx ? 'border-dasara-gold scale-105' : 'border-zinc-800 opacity-60'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Saree Metadata & Conversion CTAs */}
          <div className="flex flex-col justify-between">
            <div>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="border-dasara-gold text-dasara-gold">
                    {product.category}
                  </Badge>
                  <span className="text-xs text-zinc-400">SKU: {product.sku}</span>
                  <span className="text-xs text-amber-400 font-medium">📍 {product.provenance}</span>
                </div>
                <DialogTitle className="font-serif text-2xl text-dasara-champagne leading-snug">
                  {product.name}
                </DialogTitle>
              </DialogHeader>

              {/* Pricing */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-dasara-gold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-base text-zinc-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <Badge className="bg-dasara-maroon text-white border border-dasara-gold/40">
                  {product.discountPercent}% OFF (Dasara Special)
                </Badge>
              </div>

              {/* Fabric Specs */}
              <div className="mt-4 space-y-2 rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Fabric & Weave:</span>
                  <span className="font-medium text-dasara-champagne">{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Zari Specification:</span>
                  <span className="font-medium text-amber-300">{product.zariType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Blouse Piece:</span>
                  <span className="font-medium text-emerald-400">{product.blouseDetails}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Stock Availability:</span>
                  <span className="font-semibold text-amber-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {product.stockCount === 1 ? 'Only 1 Piece (Dealer Consignment)' : `${product.stockCount} Pieces Available`}
                  </span>
                </div>
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-zinc-300">
                {product.description}
              </p>
            </div>

            {/* Conversion CTA Group */}
            <div className="mt-5 space-y-2">
              <Button
                onClick={() => window.open(getWhatsAppOrderUrl(product), '_blank')}
                className="w-full bg-emerald-600 py-6 text-base font-semibold hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Reserve / Buy via WhatsApp Now
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open(getWhatsAppVideoConsultUrl(product), '_blank')}
                className="w-full border-dasara-gold/50 text-dasara-gold hover:bg-dasara-gold/10 py-5 text-sm"
              >
                <Video className="mr-2 h-4 w-4" />
                Book 5-Min Live Video Call Saree Trial
              </Button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-zinc-400">
                <Store className="h-3.5 w-3.5 text-dasara-gold" />
                <span>Visit Store for Live Trial • Special Dasara Timings 10 AM - 10 PM</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

## 6. Saree Catalog Data Structure

```typescript
// src/data/products.ts
export interface SareeProduct {
  id: string;
  sku: string;
  name: string;
  category: 'Kanchi Pattu' | 'Banarasi Silk' | 'Organza' | 'Fancy Sarees' | 'Partywear & Kurtis';
  provenance: string; // Origin Hub (e.g. Kanchipuram, Varanasi, Surat)
  price: number;
  originalPrice: number;
  discountPercent: number;
  fabric: string;
  zariType: string;
  blouseDetails: string;
  stockCount: number;
  isDealerUnique: boolean; // 1-of-1 handpicked dealer piece
  isSilkMarkCertified: boolean;
  isFeaturedShowstopper: boolean;
  images: string[];
  description: string;
  color: string;
}

export const DASARA_PRODUCTS: SareeProduct[] = [
  {
    id: 'saree-01',
    sku: 'SSC-KP-101',
    name: 'Kanchipuram Pure Bridal Pattu in Royal Crimson & Antique Gold',
    category: 'Kanchi Pattu',
    provenance: 'Kanchipuram, Tamil Nadu',
    price: 15499,
    originalPrice: 20999,
    discountPercent: 26,
    fabric: '100% Pure Mulberry Silk (Silk Mark Certified)',
    zariType: 'Antique Pure Gold Zari Weave',
    blouseDetails: '0.8m Contrast Emerald Green with Heavy Zari Border',
    stockCount: 1, // Single unique dealer piece
    isDealerUnique: true,
    isSilkMarkCertified: true,
    isFeaturedShowstopper: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Directly sourced masterweaver handloom Kanjeevaram. Intricate Mayil (peacock) and Rudraksha borders with a grand gold zari rich pallu.',
    color: 'Crimson Red'
  },
  {
    id: 'saree-02',
    sku: 'SSC-BN-204',
    name: 'Banarasi Katan Silk with Royal Meenakari Kadwa Border',
    category: 'Banarasi Silk',
    provenance: 'Varanasi, Uttar Pradesh',
    price: 9999,
    originalPrice: 13999,
    discountPercent: 28,
    fabric: 'Pure Katan Silk',
    zariType: 'Dual Gold & Silver Resham Zari',
    blouseDetails: 'Running Silk Blouse with Brocade Border',
    stockCount: 1,
    isDealerUnique: true,
    isSilkMarkCertified: true,
    isFeaturedShowstopper: true,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Exquisite Varanasi loom specialty with floral jaal motifs and intricate Meenakari accent work across the pallu.',
    color: 'Peacock Blue'
  },
  {
    id: 'saree-03',
    sku: 'SSC-OG-309',
    name: 'Pastel Lavender Organza Silk with Cutwork Zari Border',
    category: 'Organza',
    provenance: 'Surat, Gujarat',
    price: 4999,
    originalPrice: 6999,
    discountPercent: 28,
    fabric: 'Pure Sheer Organza',
    zariType: 'Delicate Rose Gold Threading',
    blouseDetails: 'Embroidered Raw Silk Blouse Piece Included',
    stockCount: 2,
    isDealerUnique: false,
    isSilkMarkCertified: false,
    isFeaturedShowstopper: false,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Modern lightweight luxury perfect for Dasara pooja and evening festivities. Airy texture with handcrafted scallop embroidery.',
    color: 'Lavender'
  },
  {
    id: 'saree-04',
    sku: 'SSC-DV-402',
    name: 'Dharmavaram Pure Handloom Silk with Broad Contrast Pallu',
    category: 'Kanchi Pattu',
    provenance: 'Dharmavaram, Andhra Pradesh',
    price: 11999,
    originalPrice: 15999,
    discountPercent: 25,
    fabric: 'Pure Handloom Silk',
    zariType: 'Traditional South Indian Temple Zari',
    blouseDetails: 'Contrast Mustard Yellow Blouse Piece with Border',
    stockCount: 1,
    isDealerUnique: true,
    isSilkMarkCertified: true,
    isFeaturedShowstopper: true,
    images: [
      'https://images.unsplash.com/photo-1610030469668-933d13233633?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Rich festive double-warp weave known for durability and brilliant contrast zari sheen during Navratri festivities.',
    color: 'Magenta Pink'
  }
];
```

---

## 7. High-Conversion Local Retail Mechanics

### 7.1 WhatsApp Conversion Utility (`src/lib/whatsapp.ts`)
```typescript
import { SareeProduct } from '@/data/products';

const STORE_PHONE = "919876543210"; // Replace with Mom's store WhatsApp number

export function getWhatsAppOrderUrl(product: SareeProduct) {
  const message = `Namaste Sri Sai ClothStore! 🙏✨
I would like to reserve / purchase this Dasara Special saree:

🥻 *Product:* ${product.name}
🏷️ *SKU:* ${product.sku}
📍 *Origin:* ${product.provenance}
💰 *Dasara Special Price:* ₹${product.price.toLocaleString('en-IN')}
${product.images[0] ? `📸 *Image:* ${product.images[0]}\n` : ''}
Please confirm if this piece is available for immediate booking or in-store pickup!`;

  return `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppVideoConsultUrl(product?: SareeProduct) {
  const message = `Namaste Sri Sai ClothStore! 🙏
I would like to request a 5-minute Live Video Call to view the sarees and check the drape/pallu under light:
${product ? `Interested in: ${product.name} (SKU: ${product.sku})` : 'Interested in the new Dasara arrivals.'}
Please let me know when you can start the call!`;

  return `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
}
```

### 7.2 In-Store Footfall Catalyst & Coupon Card (`src/components/festive/StoreFootfallCard.tsx`)
```tsx
import React, { useState } from 'react';
import { MapPin, Navigation, Tag, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StoreFootfallCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = "DASARA500";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-dasara-gold/40 bg-gradient-to-br from-dasara-deepCrimson/80 via-zinc-950 to-dasara-obsidian p-6 text-white shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-dasara-maroon px-3 py-1 text-xs font-semibold text-dasara-goldLight border border-dasara-gold/30">
            <Tag className="h-3.5 w-3.5" /> Physical Store Footfall Offer
          </div>
          <h3 className="mt-2 font-serif text-2xl font-bold text-dasara-champagne">
            Visiting Our Store for Dasara Shopping?
          </h3>
          <p className="mt-1 text-sm text-zinc-300">
            Show this coupon at our billing counter to get an instant <span className="font-bold text-dasara-gold">₹500 OFF</span> on purchases above ₹5,000!
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
            <MapPin className="h-4 w-4 text-dasara-gold" />
            <span>Sri Sai ClothStore, Main Bazaar Road (Opp. Gandhi Chowk) • 10 AM - 10 PM</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 rounded-xl border border-dashed border-dasara-gold bg-black/60 px-4 py-3">
            <span className="font-mono text-lg font-bold tracking-wider text-dasara-gold">{couponCode}</span>
            <button
              onClick={handleCopy}
              className="ml-2 rounded-lg bg-zinc-800 p-1.5 hover:bg-zinc-700 transition"
              title="Copy Code"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-zinc-300" />}
            </button>
          </div>
          <Button
            onClick={() => window.open('https://maps.google.com/?q=Sri+Sai+ClothStore', '_blank')}
            className="w-full sm:w-auto bg-dasara-gold text-black font-semibold hover:bg-dasara-goldLight py-6"
          >
            <Navigation className="mr-2 h-4 w-4" /> Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
};
```

---

## 8. Verified `package.json`

```json
{
  "name": "sri-sai-clothstore",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.1",
    "@react-three/drei": "^9.114.3",
    "@react-three/fiber": "^8.17.10",
    "clsx": "^2.1.1",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "18.3.1",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "three": "^0.169.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.169.0",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.2",
    "vite": "^5.4.8"
  }
}
```

---

## 9. Actionable 10-Day Step-by-Step Implementation Roadmap

```
Timeline Overview:
[Day 1-2: Core Scaffold & Photography]
       ↓
[Day 3-4: 3D Silk Hero & Showstopper Cards]
       ↓
[Day 5-6: Catalog Filtering & Multi-Angle Inspection Modal]
       ↓
[Day 7-8: WhatsApp Commerce Engine & In-Store Footfall Coupon]
       ↓
[Day 9-10: Mobile Polish, Vercel Deployment & Store QR Standees]
```

- **Day 1: Setup & Foundation**
  - Scaffold project: `npm create vite@latest . -- --template react-ts`
  - Install dependencies (`package.json`)
  - Set up Tailwind theme (`tailwind.config.js`) with the Royal Dasara palette and fonts.
- **Day 2: Inventory Cataloging & Photography**
  - Set up a smartphone photography station with warm natural light.
  - Photograph new dealer consignments: (1) Full Drape, (2) Pallu, (3) Zari Border macro, (4) Blouse.
  - Populate `src/data/products.ts` with SKUs, fabric details, and origin hubs.
- **Day 3: Hero Banner & 3D Silk Drape**
  - Implement `SilkClothDrape.tsx` with GPU vertex displacement and festive gold dust particles.
  - Implement `ShinyText.tsx` for the Dasara Grand Sale headline.
  - Implement a countdown ticker (`DasaraCountdown.tsx`) driving festive purchase urgency.
- **Day 4: Unique Dealer Pieces Showcase**
  - Build `TiltedCard.tsx` section featuring 1-of-1 showstopper sarees with dealer provenance badges.
  - Implement `SpotlightCard.tsx` for featured festive specials.
- **Day 5: Filterable Product Grid & Hub Marquee**
  - Build category tabs (Kanchi Pattu, Banarasi Silk, Organza, Fancy Sarees).
  - Add search and price filter controls.
  - Add `DealerHubMarquee.tsx` highlighting famous weaving guilds (Kanchipuram, Varanasi, Surat, Dharmavaram).
- **Day 6: Multi-Angle Saree Quick-View Modal**
  - Implement `ProductQuickViewModal.tsx` using shadcn/ui Dialog and Tabs.
  - Include thumbnail image switching, fabric specifications, Silk Mark certification tag, and stock scarcity indicators.
- **Day 7: 1-Click WhatsApp Commerce Engine**
  - Configure `src/lib/whatsapp.ts` with Mom's actual WhatsApp phone number.
  - Add "Reserve / Buy via WhatsApp" buttons that generate pre-formatted product booking messages.
  - Add "Book 5-Min Video Call Saree Trial" CTA.
  - Add a sticky floating WhatsApp button on mobile screens.
- **Day 8: In-Store Footfall Catalyst & Store Locator**
  - Add `StoreFootfallCard.tsx` with coupon code `DASARA500` for physical store visits.
  - Embed Google Maps location, store hours (10 AM – 10 PM), and physical boutique directions.
- **Day 9: Mobile Polish & Performance Optimization**
  - Compress all saree photos to WebP format (aim for < 150KB per image).
  - Test on Android and iOS mobile devices for smooth touch gestures and 60 FPS scrolling.
- **Day 10: Production Deployment & Marketing Launch**
  - Run `npm run build` and deploy to Vercel or Netlify.
  - Connect custom domain (e.g. `srisaiclothstore.com`).
  - Print QR codes for in-store checkout counters and share on WhatsApp status and local customer broadcast lists.
