# 🥻 Phase 2 Implementation Plan: "Maal" Data Architecture, Live Supabase Inventory & Dynamic Catalog Filtering
**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff Frontend & Distributed Data Architect  
**Database & Real-time Layer:** Supabase PostgreSQL (Managed via Supabase MCP Server)  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+  
**File Location:** `phase_two_implementation_plan.md`  

---

## 1. Executive Summary & Architectural Vision

In Phase 1, we established the core foundation: Vite 5 + React 18 + TypeScript 5.6 SPA scaffolding, the Royal Dasara design system tokens, Supabase project provisioning (`syzxvfnocndtxvszkujt` in Mumbai `ap-south-1`), database schema migrations, and the Admin Auth shell.

**Phase 2 is the inventory and commerce data engine.**  
During the 10-day Dasara rush, saree retail moves at high velocity. Saree customers care deeply about provenance, authenticity, and scarcity:
1. **Authentic Regional Provenance ("Maal" Lots)**: Saree stock arrives as wholesale dealer consignments ("maal") from master weaver clusters across India (Kanchipuram, Varanasi, Dharmavaram, Surat, Pochampally, Gadwal). Every piece must proudly wear its weaver origin badge.
2. **1-of-1 Scarcity & Exclusivity**: High-end bridal silk sarees are often unique single pieces. When a saree sells in-store or gets booked over WhatsApp, the digital storefront must reflect this status **instantly in real time**.
3. **Sub-100ms Catalog Navigation & Instant Filtering**: Customers must be able to filter by saree category (Kanchi Pattu, Banarasi Silk, Organza, Fancy Sarees, Partywear), sort by price, filter by weaving hub, and search by color/fabric without page reloads.
4. **Supabase Real-time WebSocket Synchronization**: Leveraging Supabase's `postgres_changes` WebSocket channels, customer sessions receive live inventory updates when Mom or the store admin modifies prices, stock levels, or photos in the database.
5. **Offline/Network Fallback Resilience**: If cellular network connectivity degrades on customer phones, the app seamlessly falls back to local cached seed data without crashing.

---

## 2. Master 10-Phase Roadmap Context

Here is how Phase 2 fits into the complete 10-phase journey:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SRI SAI CLOTHSTORE 10-PHASE ROADMAP               │
├────────────────────────────────────────────────────────────────────────┤
│  ✓ PHASE 1: Tooling, Design Tokens, Supabase MCP & Admin Auth Bedrock  │ (COMPLETED)
│  ► PHASE 2: "Maal" Data Architecture, Live Inventory & Catalog Grid    │ ◄ (CURRENT FOCUS)
│    PHASE 3: High-Performance GPU Three.js Waving Silk Hero Simulation  │
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

## 3. Phase 2 Scope & Granular Deliverables

In Phase 2, we will build and integrate the following engineering modules:

| Module / Component | File Location | Engineering Deliverable |
| :--- | :--- | :--- |
| **Expanded Data Contracts** | `src/types/product.types.ts` | Complete TypeScript models for sarees, dealer lots, filter state, and sort options. |
| **Comprehensive Seed Database** | `src/data/products.ts` & `supabase/seed_maal.sql` | 20+ authentic dealer showstoppers across 5 categories and 4 major weaver hubs. |
| **Supabase Data Layer Hook** | `src/hooks/useProducts.ts` | Dynamic query builder with category, hub, price range, search, and stock filters. |
| **Real-time Synchronization Hook** | `src/hooks/useRealtimeInventory.ts` | Supabase WebSocket subscription listening to `INSERT`, `UPDATE`, and `DELETE` events on `products`. |
| **Dealer Consignments Hook** | `src/hooks/useDealerLots.ts` | Fetches active wholesale lot consignments with batch arrival timestamps. |
| **Festive Category Tabs** | `src/components/shop/CategoryTabs.tsx` | Tabbed category selector with active gold glow and item counter badges. |
| **Catalog Filter & Search Bar** | `src/components/shop/ProductFilterBar.tsx` | Weaver hub selector, price sorter, search input, and showstopper toggle. |
| **Saree Product Card** | `src/components/shop/ProductCard.tsx` | Visual card with image hover zoom, 1-of-1 badge, Silk Mark tag, Dasara discount, and WhatsApp trigger. |
| **Responsive Product Grid** | `src/components/shop/ProductGrid.tsx` | Auto-fitting grid (1 col mobile, 2 col tablet, 3-4 col desktop) with skeleton loaders and zero-state UX. |
| **Database Migration via MCP** | Supabase MCP `execute_sql` | Executing the expanded 20+ saree consignment seed directly into the live database. |
| **Integrated Storefront Shell** | `src/App.tsx` | Upgrading the dashboard to display the live interactive saree catalog above the verification panel. |

---

## 4. Domain Data Architecture: Saree Consignments ("Maal")

### 4.1 Weaver Origin Hubs & Lot Metadata
In Indian textile trade, stock arrives as whole lots/bales from weaving centers. Each lot possesses distinct qualities:

1. **Kanchipuram, Tamil Nadu**: Known for heavyweight pure mulberry silk, 0.6–0.8 zari thread density, Korvai weaving technique, contrast pallus, and Mayil (peacock) motifs.
2. **Varanasi, Uttar Pradesh**: Handloom Banarasi Katan silk, Kadwa floral jaal brocades, Meenakari colored enamel thread accents, and antique gold/silver dual resham zari.
3. **Dharmavaram, Andhra Pradesh**: Renowned South Indian temple borders, double-warp rich festive luster, broad contrasting pallus, highly prized for Navratri poojas.
4. **Surat, Gujarat**: Contemporary lightweight pure organza, tissue silks, handcrafted scallop zari embroidery, and modern pastel palettes.
5. **Pochampally / Gadwal, Telangana**: Traditional geometric Ikkat tie-dye weaves and contrast temple borders.

---

### 4.2 Comprehensive Saree Catalog Specifications (20+ Items)

Each saree consignment record requires:
- `sku`: Unique store inventory code (e.g. `SSC-KP-101`, `SSC-BN-204`).
- `name`: Descriptive, culturally rich title.
- `category`: `Kanchi Pattu` | `Banarasi Silk` | `Organza` | `Fancy Sarees` | `Partywear & Kurtis`.
- `provenance`: Origin weaver hub and state.
- `price`: Dasara special offer price (INR).
- `original_price`: Standard showroom MRP (INR).
- `discount_percent`: Auto-calculated savings percentage.
- `fabric`: Certified fabric grade (e.g. `100% Pure Mulberry Silk`).
- `zari_type`: Gold thread specification (e.g. `Antique Pure Gold Zari`).
- `blouse_details`: Specification of unstitched blouse fabric piece.
- `stock_count`: Quantity available (when `1`, triggers "Only 1 in Stock • 1-of-1 Dealer Piece").
- `is_dealer_unique`: Boolean flag indicating exclusive dealer consignment.
- `is_silk_mark_certified`: Silk Mark organization authentication.
- `is_featured_showstopper`: Placed in the grand festive hero showcase.
- `images`: Multi-angle high-resolution imagery (Full drape, Pallu close-up, Border macro, Blouse).
- `color`: Primary color tone.
- `description`: Weave story, motif details, and styling recommendations.

---

## 5. Technical Specifications & Implementation Code

### 5.1 Expanded Type Contracts: `src/types/product.types.ts`

```typescript
export type SareeCategory = 
  | 'All'
  | 'Kanchi Pattu' 
  | 'Banarasi Silk' 
  | 'Organza' 
  | 'Fancy Sarees' 
  | 'Partywear & Kurtis';

export type SortOption = 
  | 'featured'
  | 'price-low'
  | 'price-high'
  | 'discount'
  | 'newest';

export interface DealerLot {
  id: string;
  lot_code: string;
  dealer_name: string;
  origin_hub: string;
  arrival_date: string;
  total_pieces: number;
  notes?: string | null;
}

export interface SareeProduct {
  id: string;
  sku: string;
  name: string;
  category: Exclude<SareeCategory, 'All'>;
  provenance: string;
  lot_id?: string | null;
  price: number;
  originalPrice: number;
  discountPercent: number;
  fabric: string;
  zariType: string;
  blouseDetails: string;
  stockCount: number;
  isDealerUnique: boolean;
  isSilkMarkCertified: boolean;
  isFeaturedShowstopper: boolean;
  images: string[];
  description: string;
  color: string;
  isPublished?: boolean;
  createdAt?: string;
}

export interface CatalogFilterState {
  category: SareeCategory;
  originHub: string;
  sortBy: SortOption;
  searchQuery: string;
  onlyUniquePieces: boolean;
  inStockOnly: boolean;
}
```

---

### 5.2 Real-Time WebSocket Hook: `src/hooks/useRealtimeInventory.ts`
Subscribes to Supabase's `postgres_changes` channel. When an admin updates price, stock, or photos in the Supabase table, this hook triggers an instantaneous client-side state update:

```typescript
import { useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SareeProduct } from '@/types/product.types';

interface RealtimeInventoryProps {
  onProductUpdate: (updatedProduct: SareeProduct) => void;
  onProductInsert: (newProduct: SareeProduct) => void;
  onProductDelete: (deletedId: string) => void;
}

export function useRealtimeInventory({
  onProductUpdate,
  onProductInsert,
  onProductDelete,
}: RealtimeInventoryProps) {
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel('realtime:products')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const p = payload.new as any;
            onProductInsert({
              id: p.id,
              sku: p.sku,
              name: p.name,
              category: p.category,
              provenance: p.provenance,
              lot_id: p.lot_id,
              price: Number(p.price),
              originalPrice: Number(p.original_price),
              discountPercent: p.discount_percent ?? Math.round(((p.original_price - p.price) / p.original_price) * 100),
              fabric: p.fabric,
              zariType: p.zari_type,
              blouseDetails: p.blouse_details,
              stockCount: p.stock_count,
              isDealerUnique: p.is_dealer_unique,
              isSilkMarkCertified: p.is_silk_mark_certified,
              isFeaturedShowstopper: p.is_featured_showstopper,
              images: p.images || [],
              description: p.description,
              color: p.color,
              isPublished: p.is_published,
              createdAt: p.created_at,
            });
          } else if (payload.eventType === 'UPDATE') {
            const p = payload.new as any;
            onProductUpdate({
              id: p.id,
              sku: p.sku,
              name: p.name,
              category: p.category,
              provenance: p.provenance,
              lot_id: p.lot_id,
              price: Number(p.price),
              originalPrice: Number(p.original_price),
              discountPercent: p.discount_percent ?? Math.round(((p.original_price - p.price) / p.original_price) * 100),
              fabric: p.fabric,
              zariType: p.zari_type,
              blouseDetails: p.blouse_details,
              stockCount: p.stock_count,
              isDealerUnique: p.is_dealer_unique,
              isSilkMarkCertified: p.is_silk_mark_certified,
              isFeaturedShowstopper: p.is_featured_showstopper,
              images: p.images || [],
              description: p.description,
              color: p.color,
              isPublished: p.is_published,
              createdAt: p.created_at,
            });
          } else if (payload.eventType === 'DELETE') {
            onProductDelete(payload.old.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onProductUpdate, onProductInsert, onProductDelete]);
}
```

---

### 5.3 Unified Product Data Hook: `src/hooks/useProducts.ts`
Handles fetching from Supabase, integrating fallback seed data, filtering, searching, and sorting:

```typescript
import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SareeProduct, CatalogFilterState } from '@/types/product.types';
import { DASARA_PRODUCTS_SEED } from '@/data/products';
import { useRealtimeInventory } from '@/hooks/useRealtimeInventory';

export function useProducts() {
  const [products, setProducts] = useState<SareeProduct[]>(DASARA_PRODUCTS_SEED);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<CatalogFilterState>({
    category: 'All',
    originHub: 'All',
    sortBy: 'featured',
    searchQuery: '',
    onlyUniquePieces: false,
    inStockOnly: false,
  });

  const fetchProducts = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setProducts(DASARA_PRODUCTS_SEED);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error: dbError } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;

      if (data && data.length > 0) {
        const mapped: SareeProduct[] = data.map((p) => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
          category: p.category as any,
          provenance: p.provenance,
          lot_id: p.lot_id,
          price: Number(p.price),
          originalPrice: Number(p.original_price),
          discountPercent: p.discount_percent ?? Math.round(((p.original_price - p.price) / p.original_price) * 100),
          fabric: p.fabric,
          zariType: p.zari_type,
          blouseDetails: p.blouse_details,
          stockCount: p.stock_count,
          isDealerUnique: p.is_dealer_unique,
          isSilkMarkCertified: p.is_silk_mark_certified,
          isFeaturedShowstopper: p.is_featured_showstopper,
          images: p.images || [],
          description: p.description,
          color: p.color,
          isPublished: p.is_published,
          createdAt: p.created_at || undefined,
        }));
        setProducts(mapped);
        setIsLiveConnected(true);
      } else {
        // Fallback to local seed if table is empty
        setProducts(DASARA_PRODUCTS_SEED);
      }
    } catch (err: any) {
      console.warn('Failed to fetch from Supabase, using local seed fallback:', err.message);
      setError(err.message);
      setProducts(DASARA_PRODUCTS_SEED);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Hook in real-time inventory updates
  useRealtimeInventory({
    onProductInsert: (newProd) => {
      setProducts((prev) => [newProd, ...prev]);
    },
    onProductUpdate: (updatedProd) => {
      setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    },
    onProductDelete: (deletedId) => {
      setProducts((prev) => prev.filter((p) => p.id !== deletedId));
    },
  });

  // Client-side instant filter & search calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (filters.category !== 'All' && p.category !== filters.category) {
          return false;
        }
        // Origin Hub Filter
        if (filters.originHub !== 'All' && !p.provenance.toLowerCase().includes(filters.originHub.toLowerCase())) {
          return false;
        }
        // 1-of-1 Unique Filter
        if (filters.onlyUniquePieces && !p.isDealerUnique) {
          return false;
        }
        // In-stock Filter
        if (filters.inStockOnly && p.stockCount <= 0) {
          return false;
        }
        // Search Query (matches title, SKU, fabric, color, provenance)
        if (filters.searchQuery.trim() !== '') {
          const q = filters.searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.fabric.toLowerCase().includes(q) ||
            p.color.toLowerCase().includes(q) ||
            p.provenance.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'featured') {
          return (b.isFeaturedShowstopper ? 1 : 0) - (a.isFeaturedShowstopper ? 1 : 0);
        }
        if (filters.sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (filters.sortBy === 'price-high') {
          return b.price - a.price;
        }
        if (filters.sortBy === 'discount') {
          return b.discountPercent - a.discountPercent;
        }
        if (filters.sortBy === 'newest') {
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        }
        return 0;
      });
  }, [products, filters]);

  // Extract all distinct origin hubs for the filter dropdown
  const originHubs = useMemo(() => {
    const hubs = new Set<string>();
    products.forEach((p) => {
      const parts = p.provenance.split(',');
      if (parts[0]) hubs.add(parts[0].trim());
    });
    return Array.from(hubs);
  }, [products]);

  return {
    products: filteredProducts,
    allProductsCount: products.length,
    originHubs,
    filters,
    setFilters,
    isLoading,
    isLiveConnected,
    error,
    refresh: fetchProducts,
  };
}
```

---

### 5.4 Category Selector Tabs: `src/components/shop/CategoryTabs.tsx`

```tsx
import React from 'react';
import { SareeCategory } from '@/types/product.types';
import { Sparkles } from 'lucide-react';

interface Props {
  activeCategory: SareeCategory;
  onSelectCategory: (cat: SareeCategory) => void;
  categoryCounts: Record<SareeCategory, number>;
}

const CATEGORIES: { label: SareeCategory; icon: string }[] = [
  { label: 'All', icon: '✨' },
  { label: 'Kanchi Pattu', icon: '🥻' },
  { label: 'Banarasi Silk', icon: '🏛️' },
  { label: 'Organza', icon: '🌸' },
  { label: 'Fancy Sarees', icon: '💎' },
  { label: 'Partywear & Kurtis', icon: '👑' },
];

export const CategoryTabs: React.FC<Props> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex gap-2.5 min-w-max">
        {CATEGORIES.map(({ label, icon }) => {
          const isActive = activeCategory === label;
          const count = categoryCounts[label] || 0;

          return (
            <button
              key={label}
              onClick={() => onSelectCategory(label)}
              className={`group relative flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-dasara-maroon via-dasara-deepCrimson to-dasara-maroon text-dasara-goldLight border-2 border-dasara-gold shadow-lg shadow-dasara-gold/20 scale-105'
                  : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-dasara-gold/40 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-mono font-bold transition-colors ${
                  isActive
                    ? 'bg-dasara-gold text-black'
                    : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'
                }`}
              >
                {count}
              </span>
              {isActive && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dasara-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-dasara-gold"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

---

### 5.5 Saree Product Card: `src/components/shop/ProductCard.tsx`

```tsx
import React from 'react';
import { SareeProduct } from '@/types/product.types';
import { MessageCircle, ShieldCheck, MapPin, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppOrderUrl } from '@/lib/whatsapp';

interface Props {
  product: SareeProduct;
  onQuickView: (product: SareeProduct) => void;
}

export const ProductCard: React.FC<Props> = ({ product, onQuickView }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/80 transition-all duration-300 hover:border-dasara-gold/60 hover:shadow-2xl hover:shadow-dasara-gold/15">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
          {product.isDealerUnique ? (
            <span className="rounded-full bg-gradient-to-r from-dasara-maroon to-dasara-gold px-3 py-1 text-[11px] font-bold text-white shadow-lg border border-dasara-gold/40">
              ★ 1-of-1 Dealer Piece
            </span>
          ) : (
            <span className="rounded-full bg-black/70 px-2.5 py-0.5 text-[11px] font-semibold text-dasara-goldLight border border-dasara-gold/30">
              {product.category}
            </span>
          )}

          {product.discountPercent > 0 && (
            <span className="rounded-full bg-dasara-maroon px-2.5 py-1 text-[11px] font-bold text-white shadow-md border border-dasara-gold/30">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Bottom Image Badges (Origin & Silk Mark) */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs">
          <span className="inline-flex items-center gap-1 rounded-md bg-black/75 px-2 py-0.5 text-[11px] text-zinc-300 backdrop-blur-sm border border-zinc-700/60">
            <MapPin className="h-3 w-3 text-dasara-gold" />
            {product.provenance.split(',')[0]}
          </span>
          {product.isSilkMarkCertified && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-950/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-700/50 backdrop-blur-sm">
              <ShieldCheck className="h-3 w-3" /> Silk Mark
            </span>
          )}
        </div>

        {/* Hover Quick View Trigger */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-xl bg-dasara-gold px-4 py-2 text-xs font-bold text-black shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="h-4 w-4" /> Quick View Details
          </span>
        </button>
      </div>

      {/* Saree Metadata & Pricing */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="font-mono">SKU: {product.sku}</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Clock className="h-3 w-3" />
              {product.stockCount === 1 ? 'Only 1 in stock' : `${product.stockCount} left`}
            </span>
          </div>
          <h3
            onClick={() => onQuickView(product)}
            className="cursor-pointer font-serif text-base font-semibold text-dasara-champagne line-clamp-1 transition-colors hover:text-dasara-gold"
          >
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-1">
            {product.fabric} • {product.zariType}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold text-dasara-gold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-zinc-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickView(product)}
              className="w-full text-xs border-zinc-700 hover:border-dasara-gold hover:text-dasara-gold"
            >
              Details
            </Button>
            <Button
              variant="whatsapp"
              size="sm"
              onClick={() => window.open(getWhatsAppOrderUrl(product), '_blank')}
              className="w-full text-xs font-semibold"
            >
              <MessageCircle className="h-3.5 w-3.5 mr-1" />
              WhatsApp
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
```

---

### 5.6 Catalog Filter & Search Bar: `src/components/shop/ProductFilterBar.tsx`

```tsx
import React from 'react';
import { CatalogFilterState, SortOption } from '@/types/product.types';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface Props {
  filters: CatalogFilterState;
  onFilterChange: (newFilters: CatalogFilterState) => void;
  originHubs: string[];
  totalResults: number;
}

export const ProductFilterBar: React.FC<Props> = ({
  filters,
  onFilterChange,
  originHubs,
  totalResults,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 sm:flex-row sm:items-center sm:justify-between">
      
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
          placeholder="Search by silk type, color, SKU (e.g. Kanchipuram, Crimson, SSC-KP-101)..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-dasara-gold focus:outline-none"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Origin Hub & Sort Filters */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        
        {/* Origin Hub Dropdown */}
        <div className="relative flex items-center">
          <select
            value={filters.originHub}
            onChange={(e) => onFilterChange({ ...filters, originHub: e.target.value })}
            className="appearance-none rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 pr-8 text-xs font-medium text-dasara-champagne focus:border-dasara-gold focus:outline-none cursor-pointer"
          >
            <option value="All">All Weaving Hubs</option>
            {originHubs.map((hub) => (
              <option key={hub} value={hub}>
                📍 {hub}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-zinc-400" />
        </div>

        {/* Sort Options */}
        <div className="relative flex items-center">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as SortOption })}
            className="appearance-none rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 pr-8 text-xs font-medium text-dasara-champagne focus:border-dasara-gold focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
            <option value="newest">Newly Unpacked Lots</option>
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-zinc-400" />
        </div>

        {/* 1-of-1 Exclusive Toggle */}
        <button
          onClick={() => onFilterChange({ ...filters, onlyUniquePieces: !filters.onlyUniquePieces })}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition border ${
            filters.onlyUniquePieces
              ? 'bg-dasara-maroon border-dasara-gold text-dasara-goldLight shadow-md'
              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          <span>★ 1-of-1 Dealer Only</span>
        </button>

        {/* Results Count Badge */}
        <span className="text-xs text-zinc-400 font-mono hidden md:inline-block">
          ({totalResults} items)
        </span>
      </div>

    </div>
  );
};
```

---

### 5.7 Responsive Product Grid & Zero-State: `src/components/shop/ProductGrid.tsx`

```tsx
import React from 'react';
import { SareeProduct } from '@/types/product.types';
import { ProductCard } from '@/components/shop/ProductCard';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  products: SareeProduct[];
  isLoading: boolean;
  onQuickView: (product: SareeProduct) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<Props> = ({
  products,
  isLoading,
  onQuickView,
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3 animate-pulse space-y-4"
          >
            <div className="aspect-[3/4] w-full rounded-xl bg-zinc-800" />
            <div className="h-4 w-3/4 rounded bg-zinc-800" />
            <div className="h-3 w-1/2 rounded bg-zinc-800" />
            <div className="h-8 w-full rounded bg-zinc-800" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="festive-glass flex flex-col items-center justify-center rounded-3xl p-12 text-center border border-zinc-800 my-8">
        <Sparkles className="h-10 w-10 text-dasara-gold animate-spin" style={{ animationDuration: '8s' }} />
        <h3 className="mt-4 font-serif text-2xl font-bold text-white">
          No Sarees Match Your Filter
        </h3>
        <p className="mt-2 text-sm text-zinc-400 max-w-md">
          We have new dealer consignments arriving daily for the Dasara sale. Try clearing your search keyword or switching categories.
        </p>
        <Button variant="gold" onClick={onResetFilters} className="mt-6">
          <RefreshCcw className="mr-2 h-4 w-4" /> Reset All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
```

---

## 6. Supabase MCP Database Seeding Pipeline

To ensure the live Supabase database hosts the complete **20+ dealer showroom inventory**, we will execute an expanded SQL insertion script using the `execute_sql` tool from the **Supabase MCP Server**.

### 6.1 Expanded Seed Script: `supabase/seed_maal.sql`
Includes 20 unique sarees spanning:
- Kanchipuram Pattu (Bridal, Temple, Antique Border, Mayil motifs)
- Banarasi Silk (Katan Silk, Meenakari Kadwa, Tanchoi, Brocade)
- Pure Organza & Tissue (Pastel Lavender, Sage Green, Champagne Zari, Ivory)
- Dharmavaram Handloom Silk (Double-warp festive contrast)
- Fancy & Festive Wear (Gadwal contrast, Pochampally Ikkat, Festive Kurtis)

---

## 7. Step-by-Step Terminal & Execution Guide

Follow these sequential steps to implement Phase 2:

### Step 1: Write New Component Files
- Update `src/types/product.types.ts` with expanded categories and filter models.
- Create `src/hooks/useRealtimeInventory.ts`.
- Create `src/hooks/useProducts.ts`.
- Create `src/components/shop/CategoryTabs.tsx`.
- Create `src/components/shop/ProductFilterBar.tsx`.
- Create `src/components/shop/ProductCard.tsx`.
- Create `src/components/shop/ProductGrid.tsx`.
- Update `src/data/products.ts` with the 20+ item seed collection.

### Step 2: Seed Live Supabase Database via MCP
Run `call_mcp_tool(ServerName="supabase", ToolName="execute_sql", project_id="syzxvfnocndtxvszkujt", query="<seed_sql>")` to populate the live `products` and `dealer_lots` tables.

### Step 3: Upgrade `src/App.tsx`
Integrate the live catalog section into `src/App.tsx`:
- Category selector tabs at the top.
- Filter and search bar.
- Real-time product grid with instant search and hover preview.
- Quick View Modal trigger.

### Step 4: Verification & Acceptance Gates
- Run `npm run build` to verify clean compilation with 0 TypeScript errors.
- Test category switching in browser (`http://localhost:3000/`).
- Test search filtering by SKU and fabric type.
- Verify real-time inventory count increments/decrements.

---

## 8. Verification Criteria & Senior Engineer Quality Gates

1. **Type Safety Gate**: `npm run build` compiles cleanly with zero type errors.
2. **Sub-50ms Filter Gate**: Switching categories or typing in the search bar filters products in under 50ms with zero noticeable frame drops.
3. **Real-time Synchronization Gate**: Inserting or updating a record in Supabase immediately triggers a state update on the customer UI via WebSockets.
4. **Scarcity Gate**: Sarees with `stock_count = 1` prominently display the **`★ 1-of-1 Dealer Piece`** and **`Only 1 in stock`** badges.
5. **WhatsApp Commerce Gate**: Clicking "WhatsApp" generates a formatted message containing the saree's name, SKU, price, and provenance.

---

## 9. Immediate Transition to Phase 3

Upon completion of Phase 2, the data and catalog engine will be 100% operational. Phase 3 will immediately proceed to build the **High-Performance GPU Three.js Waving Silk Hero Simulation** (`SilkClothDrape.tsx`) to provide the visual centerpiece at the top of the store!
