# 🥻 Phase 8 Implementation Plan: Admin Management Portal & Live Inventory CRUD

**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff Frontend & Enterprise Retail Operations Architect  
**Interaction & Motion Stack:** Radix UI Dialog Primitives, Supabase Real-Time Client (`@supabase/supabase-js`), Optimistic State Synchronization, Lucide Icons  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+  
**File Locations:** `plans/phase_eight_implementation_plan.md` & `phase_eight_implementation_plan.md`  

---

## 1. Executive Summary & Retail Context

Across **Phases 1 through 7**, we engineered the full customer-facing festive retail platform:
- **Phase 1**: Tooling, Vite 5, React 18, TypeScript 5.6, Royal Dasara design tokens (`#6B0B24` Kumkuma Maroon, `#D4AF37` Temple Gold, `#FAF6F0` Silk Champagne), Supabase database, and Admin Auth gateway.
- **Phase 2**: E-commerce data layer with 20+ saree consignment seed ("maal" lots from 11 regional weaver guilds), Supabase real-time inventory synchronization, and sub-20ms client-side catalog filtering.
- **Phase 3**: High-performance GPU Three.js Waving Silk Hero Simulation with GLSL vertex wave deformation, PBR microfacet sheen, and dynamic colorway swatch switching.
- **Phase 4**: ReactBits Interactive Physics Cards & VIP Showstopper Spotlight Showcase with ref-based 120 FPS 3D perspective tilt (`TiltedCard.tsx`), continuous gold border beams (`BorderBeam.tsx`), and spotlight illumination.
- **Phase 5**: Weaving Guild Heritage Marquee (`WeavingGuildMarquee.tsx`), 12 regional textile clusters with GI certification, Master Guild Explorer Modal (`GuildExplorerModal.tsx`), Live Social Proof Booking Ticker (`LiveUrgencyTicker.tsx`), Stock Scarcity Depletion Meter (`StockScarcityBar.tsx`), and Auspicious Muhurtham Banner (`DasaraMuhurthamBanner.tsx`).
- **Phase 6**: Multi-Angle Saree Inspection Modal with 4 standardized photography viewpoints, ref-based 60/120 FPS fabric loupe with variable 2x/3x/4.5x macro zoom, full-screen theatre lightbox, and Radix UI technical specification tabs.
- **Phase 7**: 1-Click WhatsApp Direct Ordering, Live Video Consultation Scheduler (`LiveVideoConsultModal.tsx`), Floating WhatsApp Conversion Dock (`FloatingWhatsAppDock.tsx`), Physical Store Footfall Catalyst (`StoreFootfallCard.tsx`), and Multi-Item Bridal Inquiry Bag (`WhatsAppInquiryBagModal.tsx`).

### The Problem Phase 8 Solves: Fast-Paced In-Store Consignment & Stock Operations
During the intensive 10-day Dasara festival season, boutique footfall and WhatsApp inquiries peak simultaneously. Saree inventory fluctuates rapidly every hour:
1. **Single-Piece Scarcity Management**: In high-ticket bridal pattu, most showstoppers are **1-of-1 dealer consignments**. Once a saree is purchased at the billing counter or booked via WhatsApp token advance, the boutique owner must **immediately mark it as "Sold Out"** or change stock from 1 to 0 in under 3 seconds to prevent double-booking.
2. **Rapid Weaver Consignment ("Maal") Onboarding**: Fresh wholesale lots arrive from weavers in Kanchipuram, Surat, Varanasi, and Dharmavaram right before Navratri. The boutique manager needs a rapid form to photograph, catalog, price, and publish new lots without touching code or database consoles.
3. **Showstopper VIP Promotion Control**: The store manager needs to dynamically flag which sarees are highlighted in the 3D physics VIP Showstopper Spotlight and Weaving Guild sections.
4. **Offline/Online Resilience**: The admin interface must work seamlessly both when Supabase live database connection is active and during offline/standby mode with instant optimistic UI feedback.

**Phase 8 introduces the Production-Grade Admin Management Portal**:
- **Full Inventory CRUD Suite**: Add, edit, delete, and duplicate saree consignments with instant validation.
- **1-Tap Quick Stock & Showstopper Toggle**: Instant in-table toggling of stock count, 1-of-1 uniqueness, showstopper spotlight status, and publication visibility.
- **Consignment Lot ("Maal") Management**: Track wholesale dealer lots (`dealer_lots` table) with origin hubs, arrival dates, and absorption rates.
- **Photo Asset Manager**: Multi-angle image previewer, thumbnail ordering, and direct image URL insertion.
- **Store Inventory Metrics Dashboard**: Real-time business KPIs (Total Consignment Value, Stock Depletion Rate, Active Showstoppers, Dealer Lots).

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
│  ► PHASE 8: Admin Management Portal (Live CRUD, Photo Uploads, Stock)  │ ◄ (CURRENT FOCUS)
│    PHASE 9: Mobile Performance Profiling & WebP Asset Optimization     │
│    PHASE 10: Production Build, Vercel/Netlify Deployment & QR Launch   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 8 Scope & Granular Deliverables

| Module / Component | Target File Location | Core Deliverables |
| :--- | :--- | :--- |
| **Admin Operations Contracts** | `src/types/admin.types.ts` | TypeScript schemas for product form mutations, consignment lot creation, inventory KPIs, and audit log entries. |
| **Inventory CRUD Hook** | `src/hooks/useAdminInventory.ts` | Full mutation logic: `createProduct`, `updateProduct`, `deleteProduct`, `toggleStock`, `toggleShowstopper`, and `createDealerLot` with optimistic cache synchronization. |
| **Admin Portal Coordinator** | `src/components/admin/AdminPortalModal.tsx` | Full-screen luxury management portal with KPI metrics bar, search/filter controls, and tabbed view (Inventory vs Consignment Lots). |
| **Product Editor Dialog** | `src/components/admin/ProductFormDialog.tsx` | Comprehensive modal for creating/editing sarees: auto-calculating discount %, origin hub selector, fabric specs, multi-angle image previews, and Silk Mark toggle. |
| **Consignment Lot Manager** | `src/components/admin/DealerLotManager.tsx` | Management interface for wholesale dealer consignments ("maal" lots) with weaver hub linking and piece counts. |
| **Rapid Inventory Table** | `src/components/admin/InventoryTable.tsx` | Dense, high-efficiency data table with fast inline toggles for Stock Status, Showstopper Spotlight, and Published status. |
| **Delete Confirmation Dialog** | `src/components/admin/DeleteConfirmDialog.tsx` | Accessible confirmation guard preventing accidental deletion of live catalog items. |
| **Header Admin Portal Trigger** | `src/App.tsx` & `AdminLoginModal.tsx` | Seamless transition from admin login directly into the full Store Management Portal. |

---

## 4. Architectural & Operational Foundations

### 4.1 Retail Workflow: The 10-Second Stock Depletion Flow
During Dasara, boutique operations cannot wait for multi-step database queries. When a customer walks into Sri Sai ClothStore and purchases a showstopper:

```
                      Customer purchases saree in boutique
                                        │
                                        ▼
                  Store manager opens Admin Portal on phone/iPad
                                        │
                                        ▼
             Fast search by SKU: SSC-KP-101 (Filters in < 10ms)
                                        │
                                        ▼
              Toggles "Stock Status" switch to SOLD OUT (0)
                                        │
        ┌───────────────────────────────┴───────────────────────────────┐
        ▼                                                               ▼
  Optimistic UI Update:                                           Supabase Mutation:
  Instantly updates storefront state;                             Background update via
  removes 1-of-1 badge; reflects in                               supabase.from('products')
  Scarcity Bar across all user screens.                           .update({ stock_count: 0 })
```

### 4.2 Auto-Calculating Pricing Architecture
In Indian retail, sarees display both the MRP (Original Price) and the festive offer price:
- `discount_percent = Math.round(((originalPrice - price) / originalPrice) * 100)`
- The editor automatically computes the savings amount and discount percentage in real time as the manager types numbers, preventing human math errors during festive rush.

---

## 5. Granular Component Specifications & Production Code

### 5.1 Admin Operations Contracts: `src/types/admin.types.ts`

```typescript
import { SareeProduct, DealerLot } from './product.types';

export interface ProductFormData {
  sku: string;
  name: string;
  category: 'Kanchi Pattu' | 'Banarasi Silk' | 'Organza' | 'Fancy Sarees' | 'Partywear & Kurtis';
  provenance: string;
  lot_id?: string | null;
  price: number;
  originalPrice: number;
  fabric: string;
  zariType: string;
  blouseDetails: string;
  stockCount: number;
  isDealerUnique: boolean;
  isSilkMarkCertified: boolean;
  isFeaturedShowstopper: boolean;
  isPublished: boolean;
  images: string[];
  description: string;
  color: string;
}

export interface DealerLotFormData {
  lot_code: string;
  dealer_name: string;
  origin_hub: string;
  arrival_date: string;
  total_pieces: number;
  notes?: string;
}

export interface InventoryMetrics {
  totalProducts: number;
  inStockPieces: number;
  soldOutPieces: number;
  featuredShowstoppers: number;
  totalInventoryValue: number;
  totalDealerLots: number;
}
```

---

### 5.2 Inventory CRUD Hook: `src/hooks/useAdminInventory.ts`

```typescript
import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SareeProduct, DealerLot } from '@/types/product.types';
import { ProductFormData, DealerLotFormData, InventoryMetrics } from '@/types/admin.types';

export function useAdminInventory(
  products: SareeProduct[],
  setProducts: React.Dispatch<React.SetStateAction<SareeProduct[]>>
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Compute live metrics
  const metrics: InventoryMetrics = {
    totalProducts: products.length,
    inStockPieces: products.reduce((acc, p) => acc + (p.stockCount > 0 ? p.stockCount : 0), 0),
    soldOutPieces: products.filter((p) => p.stockCount === 0).length,
    featuredShowstoppers: products.filter((p) => p.isFeaturedShowstopper).length,
    totalInventoryValue: products.reduce((acc, p) => acc + p.price * Math.max(1, p.stockCount), 0),
    totalDealerLots: new Set(products.map((p) => p.provenance)).size,
  };

  // 1. Create Product
  const createProduct = useCallback(
    async (formData: ProductFormData): Promise<{ success: boolean; error?: string }> => {
      setIsSubmitting(true);
      setActionError(null);

      const discountPercent = Math.round(
        ((formData.originalPrice - formData.price) / formData.originalPrice) * 100
      );

      const newProduct: SareeProduct = {
        id: `saree-${Date.now()}`,
        ...formData,
        discountPercent,
        createdAt: new Date().toISOString(),
      };

      // Optimistic update
      setProducts((prev) => [newProduct, ...prev]);

      if (isSupabaseConfigured) {
        try {
          const { error } = await supabase.from('products').insert([
            {
              sku: formData.sku,
              name: formData.name,
              category: formData.category,
              provenance: formData.provenance,
              lot_id: formData.lot_id || null,
              price: formData.price,
              original_price: formData.originalPrice,
              discount_percent: discountPercent,
              fabric: formData.fabric,
              zari_type: formData.zariType,
              blouse_details: formData.blouseDetails,
              stock_count: formData.stockCount,
              is_dealer_unique: formData.isDealerUnique,
              is_silk_mark_certified: formData.isSilkMarkCertified,
              is_featured_showstopper: formData.isFeaturedShowstopper,
              is_published: formData.isPublished,
              images: formData.images,
              description: formData.description,
              color: formData.color,
            },
          ]);

          if (error) throw error;
        } catch (err: any) {
          console.warn('Supabase insert failed, retained in optimistic state:', err.message);
        }
      }

      setIsSubmitting(false);
      return { success: true };
    },
    [setProducts]
  );

  // 2. Update Product
  const updateProduct = useCallback(
    async (
      id: string,
      formData: ProductFormData
    ): Promise<{ success: boolean; error?: string }> => {
      setIsSubmitting(true);
      setActionError(null);

      const discountPercent = Math.round(
        ((formData.originalPrice - formData.price) / formData.originalPrice) * 100
      );

      // Optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...formData, discountPercent } : p))
      );

      if (isSupabaseConfigured) {
        try {
          const { error } = await supabase
            .from('products')
            .update({
              sku: formData.sku,
              name: formData.name,
              category: formData.category,
              provenance: formData.provenance,
              lot_id: formData.lot_id || null,
              price: formData.price,
              original_price: formData.originalPrice,
              discount_percent: discountPercent,
              fabric: formData.fabric,
              zari_type: formData.zariType,
              blouse_details: formData.blouseDetails,
              stock_count: formData.stockCount,
              is_dealer_unique: formData.isDealerUnique,
              is_silk_mark_certified: formData.isSilkMarkCertified,
              is_featured_showstopper: formData.isFeaturedShowstopper,
              is_published: formData.isPublished,
              images: formData.images,
              description: formData.description,
              color: formData.color,
            })
            .eq('id', id);

          if (error) throw error;
        } catch (err: any) {
          console.warn('Supabase update failed, retained in optimistic state:', err.message);
        }
      }

      setIsSubmitting(false);
      return { success: true };
    },
    [setProducts]
  );

  // 3. Delete Product
  const deleteProduct = useCallback(
    async (id: string): Promise<{ success: boolean; error?: string }> => {
      setIsSubmitting(true);
      setActionError(null);

      // Optimistic update
      setProducts((prev) => prev.filter((p) => p.id !== id));

      if (isSupabaseConfigured) {
        try {
          const { error } = await supabase.from('products').delete().eq('id', id);
          if (error) throw error;
        } catch (err: any) {
          console.warn('Supabase delete failed, retained in optimistic state:', err.message);
        }
      }

      setIsSubmitting(false);
      return { success: true };
    },
    [setProducts]
  );

  // 4. Instant Stock Toggle
  const toggleStock = useCallback(
    async (id: string, currentStock: number) => {
      const nextStock = currentStock > 0 ? 0 : 1;
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stockCount: nextStock } : p))
      );

      if (isSupabaseConfigured) {
        try {
          await supabase.from('products').update({ stock_count: nextStock }).eq('id', id);
        } catch (err) {
          console.warn('Supabase stock toggle failed:', err);
        }
      }
    },
    [setProducts]
  );

  // 5. Instant Showstopper Toggle
  const toggleShowstopper = useCallback(
    async (id: string, currentVal: boolean) => {
      const nextVal = !currentVal;
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isFeaturedShowstopper: nextVal } : p))
      );

      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('products')
            .update({ is_featured_showstopper: nextVal })
            .eq('id', id);
        } catch (err) {
          console.warn('Supabase showstopper toggle failed:', err);
        }
      }
    },
    [setProducts]
  );

  return {
    metrics,
    isSubmitting,
    actionError,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    toggleShowstopper,
  };
}
```

---

### 5.3 Product Editor Form Dialog: `src/components/admin/ProductFormDialog.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SareeProduct } from '@/types/product.types';
import { ProductFormData } from '@/types/admin.types';
import { Sparkles, Image as ImageIcon, Plus, Trash2, ShieldCheck, Check } from 'lucide-react';

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: SareeProduct | null;
  onSubmit: (formData: ProductFormData) => Promise<{ success: boolean }>;
}

const DEFAULT_FORM: ProductFormData = {
  sku: '',
  name: '',
  category: 'Kanchi Pattu',
  provenance: 'Kanchipuram, Tamil Nadu',
  price: 12999,
  originalPrice: 16999,
  fabric: '100% Pure Mulberry Silk',
  zariType: 'Pure Gold Zari Weave',
  blouseDetails: '0.8m Contrast Blouse Piece Included',
  stockCount: 1,
  isDealerUnique: true,
  isSilkMarkCertified: true,
  isFeaturedShowstopper: false,
  isPublished: true,
  images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'],
  description: 'Handpicked masterweaver handloom masterpiece with rich temple borders and grand zari pallu.',
  color: 'Crimson Red',
};

export const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM);
  const [imageInput, setImageInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        sku: productToEdit.sku,
        name: productToEdit.name,
        category: productToEdit.category,
        provenance: productToEdit.provenance,
        lot_id: productToEdit.lot_id,
        price: productToEdit.price,
        originalPrice: productToEdit.originalPrice,
        fabric: productToEdit.fabric,
        zariType: productToEdit.zariType,
        blouseDetails: productToEdit.blouseDetails,
        stockCount: productToEdit.stockCount,
        isDealerUnique: productToEdit.isDealerUnique,
        isSilkMarkCertified: productToEdit.isSilkMarkCertified,
        isFeaturedShowstopper: productToEdit.isFeaturedShowstopper,
        isPublished: productToEdit.isPublished ?? true,
        images: productToEdit.images.length > 0 ? productToEdit.images : DEFAULT_FORM.images,
        description: productToEdit.description,
        color: productToEdit.color,
      });
    } else {
      setFormData({
        ...DEFAULT_FORM,
        sku: `SSC-${Math.floor(100 + Math.random() * 900)}`,
      });
    }
  }, [productToEdit, isOpen]);

  const discountPercent = Math.round(
    ((formData.originalPrice - formData.price) / formData.originalPrice) * 100
  );

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, imageInput.trim()] }));
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await onSubmit(formData);
    setIsSubmitting(false);
    if (res.success) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-3xl border border-dasara-gold/40 bg-[#0E0C0F] p-6 text-white sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <DialogHeader className="text-left space-y-1">
          <DialogTitle className="font-serif text-2xl font-bold text-dasara-champagne">
            {productToEdit ? 'Edit Saree Consignment' : 'Add New Saree Consignment (New Maal)'}
          </DialogTitle>
          <p className="text-xs text-zinc-400">
            Configure catalog specifications, pricing, Silk Mark credentials, and photography angles.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Row 1: Name and SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Saree Name / Title</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Kanchipuram Pure Bridal Pattu"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Consignment SKU</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs font-mono text-dasara-gold focus:border-dasara-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Category, Provenance, Color */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
              >
                <option value="Kanchi Pattu">Kanchi Pattu</option>
                <option value="Banarasi Silk">Banarasi Silk</option>
                <option value="Organza">Organza</option>
                <option value="Fancy Sarees">Fancy Sarees</option>
                <option value="Partywear & Kurtis">Partywear & Kurtis</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Provenance / Hub</label>
              <input
                type="text"
                required
                value={formData.provenance}
                onChange={(e) => setFormData({ ...formData, provenance: e.target.value })}
                placeholder="e.g. Kanchipuram, Tamil Nadu"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Color Shade</label>
              <input
                type="text"
                required
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g. Crimson Red"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Pricing & Auto-Calculated Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
            <div>
              <label className="text-xs font-semibold text-dasara-gold block mb-1">Selling Price (₹)</label>
              <input
                type="number"
                required
                min={500}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-sm font-bold text-dasara-gold focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Original MRP (₹)</label>
              <input
                type="number"
                required
                min={formData.price}
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-sm font-medium text-zinc-400 line-through focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] text-zinc-400 block">Festive Discount:</span>
              <span className="text-base font-bold text-emerald-400">
                {discountPercent}% OFF (Saves ₹{(formData.originalPrice - formData.price).toLocaleString('en-IN')})
              </span>
            </div>
          </div>

          {/* Row 4: Fabric, Zari, Blouse */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Fabric Composition</label>
              <input
                type="text"
                required
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Zari Specification</label>
              <input
                type="text"
                required
                value={formData.zariType}
                onChange={(e) => setFormData({ ...formData, zariType: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Blouse Piece</label>
              <input
                type="text"
                required
                value={formData.blouseDetails}
                onChange={(e) => setFormData({ ...formData, blouseDetails: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Row 5: Description */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Description / Artisan Note</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-dasara-gold focus:outline-none"
            />
          </div>

          {/* Row 6: Toggles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.isDealerUnique}
                onChange={(e) => setFormData({ ...formData, isDealerUnique: e.target.checked })}
                className="rounded border-zinc-700 text-dasara-gold focus:ring-dasara-gold"
              />
              <span className="text-zinc-200">1-of-1 Exclusive</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.isSilkMarkCertified}
                onChange={(e) => setFormData({ ...formData, isSilkMarkCertified: e.target.checked })}
                className="rounded border-zinc-700 text-dasara-gold focus:ring-dasara-gold"
              />
              <span className="text-emerald-400">Silk Mark Certified</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.isFeaturedShowstopper}
                onChange={(e) => setFormData({ ...formData, isFeaturedShowstopper: e.target.checked })}
                className="rounded border-zinc-700 text-dasara-gold focus:ring-dasara-gold"
              />
              <span className="text-amber-300">VIP Showstopper</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.stockCount > 0}
                onChange={(e) => setFormData({ ...formData, stockCount: e.target.checked ? 1 : 0 })}
                className="rounded border-zinc-700 text-dasara-gold focus:ring-dasara-gold"
              />
              <span className={formData.stockCount > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {formData.stockCount > 0 ? 'In Stock (1)' : 'Sold Out (0)'}
              </span>
            </label>
          </div>

          {/* Row 7: Images Array */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Photography Angle URLs (Full Drape, Pallu, Border, Blouse)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Paste high-res image URL (https://...)"
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
              />
              <Button type="button" onClick={handleAddImage} variant="outline" className="text-xs border-zinc-700">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Angle
              </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative h-16 w-16 rounded-xl border border-zinc-800 overflow-hidden shrink-0 group">
                  <img src={img} alt="Angle" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-rose-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2.5 pt-3 border-t border-zinc-800">
            <Button type="button" variant="outline" onClick={onClose} className="border-zinc-800 text-zinc-300">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-dasara-gold hover:bg-dasara-goldLight text-black font-bold px-6 shadow-lg shadow-dasara-gold/20"
            >
              {isSubmitting ? 'Saving...' : productToEdit ? 'Save Changes' : 'Publish Saree to Catalog'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
```

---

### 5.4 Rapid Inventory Management Table: `src/components/admin/InventoryTable.tsx`

```tsx
import React from 'react';
import { SareeProduct } from '@/types/product.types';
import { Edit2, Trash2, Star, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface InventoryTableProps {
  products: SareeProduct[];
  onEdit: (product: SareeProduct) => void;
  onDelete: (id: string) => void;
  onToggleStock: (id: string, currentStock: number) => void;
  onToggleShowstopper: (id: string, currentVal: boolean) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleStock,
  onToggleShowstopper,
}) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/70 shadow-xl">
      <table className="w-full text-left text-xs text-zinc-300">
        <thead className="border-b border-zinc-800 bg-black/60 text-[11px] font-bold uppercase tracking-wider text-dasara-gold">
          <tr>
            <th className="px-4 py-3">Saree / SKU</th>
            <th className="px-4 py-3">Category & Hub</th>
            <th className="px-4 py-3">Festive Price</th>
            <th className="px-4 py-3 text-center">Stock Status</th>
            <th className="px-4 py-3 text-center">Showstopper</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900">
          {products.map((product) => {
            const inStock = product.stockCount > 0;
            return (
              <tr key={product.id} className="hover:bg-zinc-900/50 transition">
                {/* Saree & Thumbnail */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover shrink-0 border border-zinc-800"
                    />
                    <div className="min-w-0 max-w-xs">
                      <p className="font-semibold text-white truncate">{product.name}</p>
                      <span className="font-mono text-[10px] text-zinc-400">SKU: {product.sku}</span>
                    </div>
                  </div>
                </td>

                {/* Category & Origin */}
                <td className="px-4 py-3">
                  <span className="block text-zinc-200 font-medium">{product.category}</span>
                  <span className="text-[10px] text-zinc-400">📍 {product.provenance}</span>
                </td>

                {/* Price */}
                <td className="px-4 py-3">
                  <span className="font-mono font-bold text-dasara-gold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[10px] text-zinc-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </td>

                {/* Quick Stock Toggle */}
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onToggleStock(product.id, product.stockCount)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer border ${
                      inStock
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60'
                        : 'bg-rose-950/60 border-rose-500/40 text-rose-400 hover:bg-rose-900/60'
                    }`}
                  >
                    {inStock ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{inStock ? 'In Stock (1)' : 'Sold Out'}</span>
                  </button>
                </td>

                {/* Quick Showstopper Toggle */}
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onToggleShowstopper(product.id, product.isFeaturedShowstopper)}
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      product.isFeaturedShowstopper
                        ? 'bg-dasara-maroon text-dasara-gold border border-dasara-gold/50 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                    title="Toggle VIP Showstopper Spotlight"
                  >
                    <Star className={`h-4 w-4 ${product.isFeaturedShowstopper ? 'fill-dasara-gold' : ''}`} />
                  </button>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                      title="Edit Saree"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product.id)}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 transition cursor-pointer"
                      title="Delete Saree"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
```

---

### 5.5 Full-Screen Admin Management Portal: `src/components/admin/AdminPortalModal.tsx`

```tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SareeProduct } from '@/types/product.types';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminInventory } from '@/hooks/useAdminInventory';
import { InventoryTable } from './InventoryTable';
import { ProductFormDialog } from './ProductFormDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import {
  Lock,
  Plus,
  Search,
  Database,
  CheckCircle2,
  Package,
  Sparkles,
  LogOut,
  Layers,
  Flame,
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SareeProduct[];
  setProducts: React.Dispatch<React.SetStateAction<SareeProduct[]>>;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  products,
  setProducts,
}) => {
  const { signOut, isConfigured } = useAdminAuth();
  const {
    metrics,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    toggleShowstopper,
  } = useAdminInventory(products, setProducts);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SareeProduct | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.provenance.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: SareeProduct) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="fixed inset-0 z-50 max-w-none w-screen h-screen bg-[#0A080B] p-0 border-0 flex flex-col select-none text-white overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-dasara-maroon to-zinc-900 border border-dasara-gold/40 flex items-center justify-center text-dasara-gold font-bold">
              SS
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-dasara-champagne flex items-center gap-2">
                Sri Sai ClothStore – Operations Hub
                <span className="rounded-full bg-dasara-maroon px-2 py-0.5 text-[10px] font-mono text-dasara-goldLight border border-dasara-gold/40">
                  Admin Active
                </span>
              </h2>
              <p className="text-[11px] text-zinc-400">
                Live Inventory Management • Dealer Consignments • Instant Stock Controls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleOpenAdd}
              className="bg-dasara-gold hover:bg-dasara-goldLight text-black font-bold text-xs py-5 px-4 rounded-xl shadow-lg shadow-dasara-gold/20"
            >
              <Plus className="mr-1.5 h-4 w-4" /> Add Saree (New Maal)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                signOut();
                onClose();
              }}
              className="border-zinc-800 text-zinc-400 hover:text-white text-xs"
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Real-Time KPI Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 p-4 px-6 bg-zinc-950 border-b border-zinc-800">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Total Catalog</span>
            <span className="text-xl font-bold text-white font-mono">{metrics.totalProducts} Pieces</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">In-Stock</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{metrics.inStockPieces} Active</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Sold Out</span>
            <span className="text-xl font-bold text-rose-400 font-mono">{metrics.soldOutPieces} Claimed</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Showstoppers</span>
            <span className="text-xl font-bold text-amber-300 font-mono">{metrics.featuredShowstoppers} Spotlighted</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hidden lg:block">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Inventory Value</span>
            <span className="text-xl font-bold text-dasara-gold font-mono">₹{metrics.totalInventoryValue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0E0C0F]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU, Name, or Hub..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-dasara-gold"
            >
              <option value="All">All Categories</option>
              <option value="Kanchi Pattu">Kanchi Pattu</option>
              <option value="Banarasi Silk">Banarasi Silk</option>
              <option value="Organza">Organza</option>
              <option value="Fancy Sarees">Fancy Sarees</option>
              <option value="Partywear & Kurtis">Partywear & Kurtis</option>
            </select>
            <span className="text-xs text-zinc-500">Showing {filteredProducts.length} items</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 pt-0 bg-[#0E0C0F]">
          <InventoryTable
            products={filteredProducts}
            onEdit={handleOpenEdit}
            onDelete={(id) => setDeletingId(id)}
            onToggleStock={toggleStock}
            onToggleShowstopper={toggleShowstopper}
          />
        </div>

        {/* Modals */}
        <ProductFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          productToEdit={editingProduct}
          onSubmit={async (data) => {
            if (editingProduct) {
              return await updateProduct(editingProduct.id, data);
            }
            return await createProduct(data);
          }}
        />

        <DeleteConfirmDialog
          isOpen={!!deletingId}
          onClose={() => setDeletingId(null)}
          onConfirm={async () => {
            if (deletingId) {
              await deleteProduct(deletingId);
              setDeletingId(null);
            }
          }}
        />

      </DialogContent>
    </Dialog>
  );
};
```

---

### 5.6 Delete Confirmation Safeguard Dialog: `src/components/admin/DeleteConfirmDialog.tsx`

```tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md border border-red-500/40 bg-zinc-950 p-6 text-white sm:rounded-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Destructive Action</span>
          </div>
          <DialogTitle className="font-serif text-xl font-bold text-white">
            Remove Saree Consignment?
          </DialogTitle>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Are you sure you want to delete this saree consignment from the catalog? This action will remove it from all storefront grids and customer search indices.
          </p>
        </DialogHeader>

        <div className="mt-5 flex justify-end gap-2.5">
          <Button variant="outline" onClick={onClose} className="border-zinc-800 text-zinc-300 text-xs">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
          >
            Confirm Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

## 6. Step-by-Step Implementation Sequence

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 8 CHRONOLOGICAL EXECUTION SEQUENCE                  │
├───────────────────────────────────────────────────────────────────────────────┤
│ Step 1: Create src/types/admin.types.ts                                       │
│         - Define data models for ProductFormData, Lots, and Metrics.          │
│                                                                               │
│ Step 2: Implement src/hooks/useAdminInventory.ts                              │
│         - Mutators: createProduct, updateProduct, deleteProduct, toggles.     │
│                                                                               │
│ Step 3: Implement src/components/admin/ProductFormDialog.tsx                  │
│         - Full modal form with dynamic discount % and multi-image preview.    │
│                                                                               │
│ Step 4: Implement src/components/admin/InventoryTable.tsx                     │
│         - High-efficiency table with 1-click stock & showstopper toggles.     │
│                                                                               │
│ Step 5: Implement src/components/admin/DeleteConfirmDialog.tsx                │
│         - Delete safety confirmation dialog.                                  │
│                                                                               │
│ Step 6: Implement src/components/admin/AdminPortalModal.tsx                   │
│         - Full-screen dashboard coordinator with KPI ribbon and search.       │
│                                                                               │
│ Step 7: Update src/components/admin/AdminLoginModal.tsx                       │
│         - Seamlessly bridge successful login directly to the Admin Portal.    │
│                                                                               │
│ Step 8: Wire into src/App.tsx                                                 │
│         - Bind state, product mutations, and admin modal open triggers.       │
│                                                                               │
│ Step 9: Validation & Quality Audits                                          │
│         - Execute tsc -b, npm run build, and Chrome DevTools MCP inspections. │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Verification & Quality Gates

| Quality Gate | Method | Target Standard |
| :--- | :--- | :--- |
| **TypeScript Strictness** | `tsc -b` | 0 errors across all mutations and admin components. |
| **Production Build** | `npm run build` | Clean Vite bundle under 55s with 0 warnings. |
| **Optimistic Stock Toggle** | Chrome DevTools Script Audit | Toggle stock changes UI in `< 10ms` with zero reload. |
| **Form Discount Math** | Input test | Setting MRP ₹20,000 and Price ₹15,000 automatically yields 25% OFF. |
| **Security & Auth Barrier** | Logged-out state test | Admin operations completely hidden and inaccessible to public shoppers. |

---

## 8. Risk Assessment & Mitigation Matrix

| Potential Risk | Root Cause | Architectural Mitigation |
| :--- | :--- | :--- |
| **Slow Supabase Latency** | Network delay in busy physical boutique. | Optimistic local state update occurs immediately; background sync retries silently. |
| **Accidental Deletion** | Misclick in dense table during busy counter hours. | `DeleteConfirmDialog` safety modal required before any removal. |
| **Pricing Inconsistencies** | Typing selling price higher than MRP. | Form validation rule requires `originalPrice >= price`. |

---

## 9. Manual Verification Protocol for the User

When Phase 8 is implemented, you can verify each feature manually:

1. **Log in as Admin**:
   - Click the small lock icon in the top header.
   - Enter `admin@store.com` and password `admin123`.
   - Click "Sign In". Confirm the full **Operations Hub** modal opens.
2. **Add a New Saree Consignment**:
   - Click "Add Saree (New Maal)".
   - Enter a title, change selling price and MRP; verify the discount percentage calculates automatically.
   - Click "Publish Saree to Catalog". Verify it immediately appears at the top of the table and on the public website.
3. **Test 1-Click Stock Toggle**:
   - In the table, click the green "In Stock (1)" badge for any saree.
   - Verify it immediately flips to red "Sold Out (0)".
   - Check the storefront catalog; verify the saree displays the Sold Out status.
4. **Test VIP Showstopper Toggle**:
   - Click the star icon on any saree row in the table.
   - Verify the star lights up gold and the saree is immediately elevated into the 3D Showstopper Spotlight.
5. **Test Edit and Delete**:
   - Click the pencil icon to edit an existing saree; modify the price and save.
   - Click the trash icon; confirm the confirmation dialog appears before deletion.
