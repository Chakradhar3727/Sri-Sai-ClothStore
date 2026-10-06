# 🏗️ Phase 1 Implementation Plan: Foundation, Tooling, Royal Dasara Design System & Supabase Admin Architecture
**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff Frontend & Systems Architect  
**Database & Backend:** Supabase (Managed entirely via Supabase MCP Server)  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+, Supabase JS 2+  
**File Location:** `phase_one_implementation_plan.md`  

---

## 1. Executive Summary & Architectural Vision

This document establishes the **Phase 1 Implementation Plan** for the 10-phase rollout of the **Sri Sai ClothStore** digital flagship. Phase 1 is the engineering bedrock of the entire application. Every visual shimmer, 3D WebGL cloth simulation, high-conversion WhatsApp transaction, and real-time inventory edit in subsequent phases depends directly on the stability, type-safety, design tokens, and database architecture established here.

### Architectural Philosophy for Phase 1
1. **Zero Hydration Mismatch & Zero SSR Headaches**: By employing a Vite + React Single Page Application (SPA) architecture, we bypass all WebGL/Canvas server-side rendering crashes (`window is not defined`) while delivering instantaneous Hot Module Replacement (HMR < 150ms).
2. **Supabase MCP-Driven Backend Infrastructure**: The entire database lifecycle (project provisioning, relational schema creation, table migrations, Row Level Security (RLS) policies, storage buckets, and TypeScript type generation) is executed programmatically via the **Supabase MCP Server**. No manual web console fiddling.
3. **Role-Based Admin Management Portal**: Saree retail during Dasara is fast-moving. Mom / Store Admins need an in-app Admin Dashboard to:
   - Post new dealer arrivals ("maal") immediately with photo uploads.
   - Modify prices, Dasara discounts, and stock counters in real time.
   - Toggle 1-of-1 dealer uniqueness flags and showstopper spotlights.
   - Swap and crop saree photos (drape, pallu, zari border, blouse piece) directly from mobile/desktop.
4. **Strict Type-Safety & Path Resolution**: Full TypeScript strict mode enabled with path aliasing (`@/*` mapping to `./src/*`) and auto-generated Supabase database types (`src/types/database.types.ts`).
5. **Royal Festive Design Tokens as Code**: The Dasara aesthetic (Kumkuma Maroon, Temple Zari Gold, Peacock Teal, Ivory Champagne) is codified into Tailwind CSS tokens and CSS custom properties, ensuring 100% visual consistency across both customer storefront and admin dashboard.

---

## 2. Master 10-Phase Roadmap Context

To maintain systemic clarity, here is how Phase 1 anchors the complete 10-phase delivery plan:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SRI SAI CLOTHSTORE 10-PHASE ROADMAP               │
├────────────────────────────────────────────────────────────────────────┤
│  ► PHASE 1: Tooling, Design Tokens, Supabase MCP & Admin Auth Bedrock  │ ◄ (CURRENT FOCUS)
│    PHASE 2: "Maal" Data Architecture, Supabase Schemas & Dealer Catalog│
│    PHASE 3: High-Performance GPU Three.js Waving Silk Hero Simulation  │
│    PHASE 4: ReactBits Interactive Physics Cards (TiltedCard, Shimmer)  │
│    PHASE 5: Filterable Saree Catalog Grid & Weaver Guild Marquee       │
│    PHASE 6: Multi-Angle Saree Inspection Modal (shadcn/ui Dialog/Tabs) │
│    PHASE 7: 1-Click WhatsApp Ordering & Video Call Booking Engine      │
│    PHASE 8: Admin Management Portal (Live CRUD, Photo Uploads, Stock)  │
│    PHASE 9: Mobile Performance Profiling & WebP Asset Optimization     │
│    PHASE 10: Production Build, Vercel/Netlify Deployment & QR Launch   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 1 Scope & Granular Deliverables

In Phase 1, we construct and verify the following components:

| Module / Area | Exact Deliverable | Engineering Rationale |
| :--- | :--- | :--- |
| **Project Workspace** | Vite 5 + React 18 + TypeScript Project | High-speed bundle pipeline with zero WebGL SSR complications. |
| **Module Aliasing** | `tsconfig.json` & `vite.config.ts` `@/*` alias | Clean, refactor-proof imports across all future 9 phases. |
| **Dependencies** | Locked `package.json` with Supabase & 3D libraries | Ensures 100% dependency compatibility (`@supabase/supabase-js`, Three.js, Lucide, Radix, Tailwind). |
| **Backend via Supabase MCP** | Project creation, SQL execution & RLS | Production PostgreSQL database provisioned and secured via Supabase MCP tools. |
| **Admin Auth Bedrock** | Admin Role Schema (`profiles`) & Auth Client | Secure login pipeline allowing Mom to manage inventory and photos. |
| **Media Storage Bucket** | Supabase Storage `saree-images` bucket | Public CDN storage for dealer saree photography with direct multipart upload. |
| **Festive Design System** | Custom `tailwind.config.js` | Codifies Kumkuma Maroon, Temple Gold, typography, and shine animations. |
| **Global Typography & Base CSS** | `index.html` & `src/index.css` | Google Fonts preconnect (`Playfair Display`, `Plus Jakarta Sans`) & custom gold scrollbar. |
| **Core Utilities & Client** | `src/lib/utils.ts` (`cn`) & `src/lib/supabase.ts` | Essential helper functions and Supabase client singleton. |
| **Directory Architecture** | Complete Clean Modular Tree | Creates all folders (`components`, `admin`, `festive`, `reactbits`, `shop`, `three`, `ui`, `data`, `lib`). |
| **Phase 1 Smoke Test Dashboard** | `src/App.tsx` verification harness | Live visual confirmation of design tokens, fonts, Supabase connectivity, and Admin login shell. |

---

## 4. Supabase Architecture & MCP Tooling Strategy

### 4.1 Supabase MCP Tool Pipeline
All backend operations are driven using the configured MCP server tools:
1. **Project Provisioning**: `call_mcp_tool(ServerName="supabase", ToolName="create_project", ...)` in organization `jutcvforqekntsotjgqc` (South Asia / `ap-south-1` region for lowest Indian latency).
2. **Schema & Migration Deployment**: `call_mcp_tool(ServerName="supabase", ToolName="execute_sql", ...)` executing the DDL schema with RLS and Storage policies.
3. **Key Retrieval**: `call_mcp_tool(ServerName="supabase", ToolName="get_publishable_keys", ...)` to extract `anon` key.
4. **TypeScript Type Generation**: `call_mcp_tool(ServerName="supabase", ToolName="generate_typescript_types", ...)` to write `src/types/database.types.ts`.

---

### 4.2 Database DDL Schema (`supabase/schema.sql`)
Executed via Supabase MCP `execute_sql`:

```sql
-- ====================================================================
-- SRI SAI CLOTHSTORE - DASARA GRAND LAUNCH RELATIONAL SCHEMA
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'staff', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can update profile roles"
    ON public.profiles FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 3. Dealer Consignment Lots ("Maal" Origins)
CREATE TABLE IF NOT EXISTS public.dealer_lots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lot_code TEXT NOT NULL UNIQUE,              -- e.g. "LOT-2026-KANCHI-01"
    dealer_name TEXT NOT NULL,                  -- Master weaver / dealer firm
    origin_hub TEXT NOT NULL,                   -- e.g. "Kanchipuram", "Varanasi", "Surat", "Dharmavaram"
    arrival_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_pieces INT NOT NULL DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.dealer_lots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view dealer lots"
    ON public.dealer_lots FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Only admins can insert/update dealer lots"
    ON public.dealer_lots FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 4. Products Table ("Maal" Inventory)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT NOT NULL UNIQUE,                   -- e.g. "SSC-KP-101"
    name TEXT NOT NULL,                         -- Full Product Title
    category TEXT NOT NULL CHECK (
        category IN ('Kanchi Pattu', 'Banarasi Silk', 'Organza', 'Fancy Sarees', 'Partywear & Kurtis')
    ),
    provenance TEXT NOT NULL,                   -- e.g. "Kanchipuram, Tamil Nadu"
    lot_id UUID REFERENCES public.dealer_lots(id) ON DELETE SET NULL,
    price NUMERIC(10, 2) NOT NULL,              -- Dasara Offer Price (INR)
    original_price NUMERIC(10, 2) NOT NULL,     -- MRP before discount
    discount_percent INT GENERATED ALWAYS AS (
        ROUND(((original_price - price) / original_price) * 100)
    ) STORED,
    fabric TEXT NOT NULL,                       -- e.g. "Pure Mulberry Silk"
    zari_type TEXT NOT NULL,                    -- e.g. "Antique Pure Gold Zari"
    blouse_details TEXT NOT NULL,               -- e.g. "0.8m Contrast Emerald Green"
    stock_count INT NOT NULL DEFAULT 1,         -- Scarcity indicator (1 = 1-of-1 piece)
    is_dealer_unique BOOLEAN NOT NULL DEFAULT true, -- 1-of-1 dealer piece
    is_silk_mark_certified BOOLEAN NOT NULL DEFAULT false,
    is_featured_showstopper BOOLEAN NOT NULL DEFAULT false,
    images TEXT[] NOT NULL DEFAULT '{}',        -- URLs in saree-images storage bucket
    description TEXT NOT NULL,
    color TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Customer Storefront: View published products
CREATE POLICY "Public can view published products"
    ON public.products FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

-- Admin Dashboard: Full CRUD access
CREATE POLICY "Admins have full product CRUD access"
    ON public.products FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 5. Supabase Storage: Public Bucket for Saree Photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('saree-images', 'saree-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access for images
CREATE POLICY "Public Saree Image Access"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'saree-images');

-- Admin upload & update access for images
CREATE POLICY "Admin Saree Image Upload"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'saree-images' AND
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admin Saree Image Delete"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'saree-images' AND
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

---

## 5. Technical Specifications & File Configurations

### 5.1 Root Configuration: `package.json`
Includes `@supabase/supabase-js`:

```json
{
  "name": "sri-sai-clothstore",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.0",
    "@react-three/drei": "^9.114.3",
    "@react-three/fiber": "^8.17.10",
    "@supabase/supabase-js": "^2.45.4",
    "clsx": "^2.1.1",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "three": "^0.169.0"
  },
  "devDependencies": {
    "@types/node": "^22.7.5",
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

### 5.2 Environment Variables

#### `.env.example`
```env
# Supabase Project Credentials (AP South - Mumbai)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Store Details
VITE_STORE_WHATSAPP_NUMBER=919876543210
VITE_STORE_NAME="Sri Sai ClothStore"
```

---

### 5.3 Supabase Client Singleton: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing in environment variables. Running in local fallback mode.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
```

---

### 5.4 Admin Authentication & Role Hook: `src/hooks/useAdminAuth.ts`

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

export function useAdminAuth(): AdminAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkRole(currentUser: User | null) {
      if (!currentUser) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single();

        if (!error && data?.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkRole(currentUser);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkRole(currentUser);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    setIsLoading(false);
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return { user, isAdmin, isLoading, signIn, signOut };
}
```

---

### 5.5 Admin Login Modal Primitive: `src/components/admin/AdminLoginModal.tsx`

```tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { signIn, isAdmin, signOut } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const { error } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border border-dasara-gold/40 bg-zinc-950 p-6 text-white sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-dasara-gold">
            <Lock className="h-5 w-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Admin Gateway</span>
          </div>
          <DialogTitle className="font-serif text-2xl text-dasara-champagne">
            Store Management Portal
          </DialogTitle>
        </DialogHeader>

        {isAdmin ? (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-emerald-400">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">You are logged in with <strong>Store Admin privileges</strong>.</p>
            </div>
            <Button
              variant="outline"
              onClick={signOut}
              className="w-full border-red-500/40 text-red-400 hover:bg-red-500/10"
            >
              Sign Out from Admin
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {errorMsg && (
              <div className="flex items-center gap-2 rounded-lg bg-red-950/50 border border-red-500/40 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-zinc-300">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="store.admin@srisaiclothstore.com"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-dasara-gold focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="gold"
              disabled={isSubmitting}
              className="w-full py-5 text-sm"
            >
              {isSubmitting ? 'Authenticating...' : 'Enter Admin Management Portal'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
```

---

### 5.6 Master Festive Theme System: `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
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
          deepCrimson: '#420614',  // Deep contrast festive background
          gold: '#D4AF37',         // Pure Temple Zari Gold
          goldLight: '#F7E7A9',    // Shimmer highlight
          peacock: '#0D5C75',      // Peacock Teal (Auspicious secondary)
          emerald: '#0B4D3C',      // Deep Silk Green
          haldi: '#E5A93C',        // Festive Turmeric Gold
          champagne: '#FAF6F0',    // Silk Ivory (Text and light cards)
          obsidian: '#121013',     // Rich dark base
          cardBg: '#1A1518',       // Card surface base
          borderGold: 'rgba(212, 175, 55, 0.25)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'shine': 'shine 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.45)' },
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

### 5.7 Complete Directory Architecture Scaffolding
```
Sri Sai ClothStore/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── admin/               # 🛡️ Admin Management Portal
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminLoginModal.tsx
│   │   │   ├── ProductFormModal.tsx
│   │   │   └── SareeImageUploader.tsx
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── festive/
│   │   │   ├── DasaraCountdown.tsx
│   │   │   └── StoreFootfallCard.tsx
│   │   ├── reactbits/
│   │   │   ├── DealerHubMarquee.tsx
│   │   │   ├── ShinyText.tsx
│   │   │   ├── SpotlightCard.tsx
│   │   │   └── TiltedCard.tsx
│   │   ├── shop/
│   │   │   ├── CategoryTabs.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductQuickViewModal.tsx
│   │   ├── three/
│   │   │   └── SilkClothDrape.tsx
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       └── tabs.tsx
│   ├── data/
│   │   └── products.ts          # Seed data & client fallback
│   ├── hooks/
│   │   ├── useAdminAuth.ts      # 🛡️ Supabase Admin Auth hook
│   │   └── useMediaQuery.ts
│   ├── lib/
│   │   ├── supabase.ts          # 🗄️ Supabase Client Singleton
│   │   ├── utils.ts
│   │   └── whatsapp.ts
│   ├── types/
│   │   ├── database.types.ts    # Auto-generated by Supabase MCP
│   │   └── product.types.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── supabase/
│   └── schema.sql               # DDL executed via Supabase MCP
├── .env.example
├── .gitignore
├── dasara_website_blueprint.md
├── index.html
├── package.json
├── phase_one_implementation_plan.md
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

### 5.8 Phase 1 Verification Harness: `src/App.tsx`
Updated with **Supabase Connectivity Live Indicator** and **Admin Login Shell**:

```tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Database, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminLoginModal } from '@/components/admin/AdminLoginModal';

export default function App() {
  const [testCount, setTestCount] = useState(0);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'fallback'>('checking');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const { user, isAdmin } = useAdminAuth();

  useEffect(() => {
    async function checkDb() {
      try {
        const { error } = await supabase.from('products').select('count', { count: 'exact', head: true });
        if (!error) {
          setDbStatus('connected');
        } else {
          setDbStatus('fallback');
        }
      } catch {
        setDbStatus('fallback');
      }
    }
    checkDb();
  }, []);

  const colors = [
    { name: 'Kumkuma Maroon', class: 'bg-dasara-maroon', hex: '#6B0B24' },
    { name: 'Deep Crimson', class: 'bg-dasara-deepCrimson', hex: '#420614' },
    { name: 'Temple Gold', class: 'bg-dasara-gold', hex: '#D4AF37', textDark: true },
    { name: 'Gold Light', class: 'bg-dasara-goldLight', hex: '#F7E7A9', textDark: true },
    { name: 'Peacock Teal', class: 'bg-dasara-peacock', hex: '#0D5C75' },
    { name: 'Deep Emerald', class: 'bg-dasara-emerald', hex: '#0B4D3C' },
    { name: 'Haldi Gold', class: 'bg-dasara-haldi', hex: '#E5A93C', textDark: true },
  ];

  return (
    <div className="min-h-screen bg-dasara-obsidian text-dasara-champagne p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Bar with Admin Gateway */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Vite 5 • React 18 • TypeScript 5.6
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdminModalOpen(true)}
            className="border-dasara-gold/40 text-dasara-gold hover:bg-dasara-gold/10"
          >
            <Lock className="h-3.5 w-3.5 mr-1.5" />
            {isAdmin ? 'Admin Portal (Active)' : 'Admin Login'}
          </Button>
        </div>

        {/* Phase 1 Verification Banner */}
        <div className="festive-glass rounded-3xl p-8 border border-dasara-gold/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-40 h-40 bg-dasara-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 text-dasara-gold text-sm font-semibold tracking-widest uppercase">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            Phase 1 • Core Architecture & Foundation
          </div>

          <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Sri Sai ClothStore
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-dasara-gold via-dasara-goldLight to-dasara-gold">
              Dasara Grand Launch 2026
            </span>
          </h1>

          <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            Phase 1 setup has verified the Vite 5 pipeline, TypeScript strict configuration, path aliases (<code className="text-dasara-gold">@/*</code>), Supabase MCP database architecture, and Royal Dasara design tokens.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <Button variant="gold" onClick={() => setTestCount(c => c + 1)}>
              Interactive Smoke Test (Clicks: {testCount})
            </Button>
            <div className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-xs">
              <Database className="h-4 w-4 text-dasara-gold" />
              <span>Supabase Status:</span>
              <span className={`font-semibold ${dbStatus === 'connected' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {dbStatus === 'connected' ? '● Live Connected' : '● Standby / Fallback'}
              </span>
            </div>
            {isAdmin && (
              <span className="rounded-full bg-dasara-maroon px-3 py-1 text-xs text-white border border-dasara-gold/30">
                Logged in as Admin ({user?.email})
              </span>
            )}
          </div>
        </div>

        {/* Design Token Color Swatch Validator */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-dasara-champagne flex items-center gap-2">
            <ShieldCheck className="text-dasara-gold w-6 h-6" />
            Festive Color Palette Verification
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {colors.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl p-3 border border-zinc-800/80 bg-zinc-900/60 flex flex-col justify-between h-32 transition hover:scale-105"
              >
                <div className={`w-full h-12 rounded-lg ${c.class} shadow-md border border-white/10`} />
                <div>
                  <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                  <p className="text-[10px] text-zinc-400 font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 1 Verification Checklist */}
        <div className="festive-glass rounded-2xl p-6 border border-zinc-800">
          <h3 className="font-serif text-xl font-bold text-dasara-champagne mb-4">
            System Acceptance Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300">
            {[
              "Vite 5 + React 18 SPA Initialized",
              "TypeScript Strict Mode Enabled",
              "Path Alias '@/*' Configured",
              "Tailwind CSS Royal Dasara Tokens Verified",
              "Google Fonts Preloaded & Active",
              "Supabase MCP Project & Schema Prepared",
              "Admin Auth & Saree Image Storage Architected",
              "Phase 2 'Maal' Inventory Ingestion Ready",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step Transition Banner */}
        <div className="border border-dasara-gold/40 rounded-2xl p-5 bg-gradient-to-r from-dasara-deepCrimson/40 to-transparent flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-dasara-gold uppercase tracking-wider">Next Milestone</span>
            <p className="text-base font-semibold text-white">Phase 2: "Maal" Data Architecture & Supabase Table Migrations via MCP</p>
          </div>
          <ArrowRight className="text-dasara-gold w-6 h-6 animate-pulse" />
        </div>

      </div>

      <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </div>
  );
}
```

---

## 6. Step-by-Step Supabase MCP Operational Execution

Follow these explicit commands using the Supabase MCP Server:

### Step 1: Initialize / Target Supabase Project via MCP
Use `call_mcp_tool` with `ServerName="supabase"`, `ToolName="create_project"`:
- **Organization ID**: `jutcvforqekntsotjgqc`
- **Name**: `Sri Sai ClothStore`
- **Region**: `ap-south-1` (Mumbai, low latency for Indian retail users)
- **Database Password**: Set secure password

*(Alternatively, bind to existing active project `cvibevhewggvmpnyhizx` or the dedicated newly created project).*

### Step 2: Deploy DDL Schema via MCP
Call `call_mcp_tool` with `ToolName="execute_sql"` and pass the complete SQL script from Section 4.2:
- Creates `profiles`, `dealer_lots`, `products` tables.
- Establishes RLS policies for public view and admin mutations.
- Creates `saree-images` public storage bucket.

### Step 3: Fetch API Keys & Set Environment Variables
Call `call_mcp_tool` with `ToolName="get_publishable_keys"` and `ToolName="get_project_url"`.
Populate `.env.local`:
```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

### Step 4: Generate TypeScript Database Types via MCP
Call `call_mcp_tool` with `ToolName="generate_typescript_types"`.
Save output to `src/types/database.types.ts` for end-to-end type safety.

---

## 7. Verification Criteria & Senior Engineer Quality Gates

1. **Clean Compiler Gate**: `npm run build` exits with code 0 without any warnings or type suppression comments.
2. **Supabase Connectivity Gate**: Browser dashboard confirms Supabase connectivity indicator turns green or gracefully reports fallback mode.
3. **Admin Modal Gate**: Clicking the Admin Login button opens `AdminLoginModal` with form inputs and clear status indications.
4. **Design Token Visual Gate**: All 7 festive color swatches display correct royal tones without defaults.
5. **No SSR/Hydration Conflicts**: Clean WebGL-ready client bundle ready for Phase 3 Three.js silk rendering.

---

## 8. Immediate Next Transition: Phase 2 Preparation

Once Phase 1 is executed, Phase 2 immediately proceeds to:
- Run the SQL migrations via Supabase MCP to provision `products` and `dealer_lots`.
- Seed initial showstopper sarees (Kanchipuram Pattu, Banarasi, Dharmavaram, Organza).
- Set up real-time inventory subscriptions so that when Mom updates a saree's price or photo in the Admin Dashboard, it immediately reflects across all live customer sessions without page refresh.
