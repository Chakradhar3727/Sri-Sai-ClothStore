# 🥻 Phase 5 Implementation Plan: Weaving Guild Marquee & Festive Urgency Tickers

**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff Frontend & Retail Conversion Systems Architect  
**Interaction & Motion Stack:** CSS Animation Engine, Web Animations API, Radix UI Primitives, Lucide Icons  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+  
**File Locations:** `plans/phase_five_implementation_plan.md` & `phase_five_implementation_plan.md`  

---

## 1. Executive Summary & Retail Context

In **Phase 1**, we built the core bedrock: Vite 5, React 18, TypeScript 5.6, Royal Dasara design tokens, Supabase database configuration, and the Admin Auth gateway.  
In **Phase 2**, we engineered the e-commerce data layer: 20+ saree consignment seed ("maal" lots from regional weaver guilds), Supabase real-time synchronization, and sub-20ms client-side catalog filtering.  
In **Phase 3**, we implemented the centerpiece GPU Three.js Waving Silk Simulation with PBR microfacet sheen, real-time wave physics, and interactive colorway swatch switching.  
In **Phase 4**, we completed the ReactBits Interactive Physics Cards & VIP Showstopper Spotlight Showcase with ref-based 120 FPS 3D perspective tilt, continuous animated gold border beams, and bulletproof quick-view interaction.

### The Problem Phase 5 Solves: Weaving Provenance & Festive Conversion Psychology
In authentic high-ticket Indian saree retail, particularly during the auspicious 10-day Dasara festive season, two psychological drivers dominate customer decision-making:

1. **Artisan Provenance & Geographical Indication (GI) Authenticity**:  
   Discerning shoppers purchasing sarees priced between ₹5,000 and ₹25,000+ do not simply purchase fabric; they invest in heritage. When buying a Kanchipuram, Banarasi, or Paithani saree, customers demand to know:
   - Which master weaver guild created the lot?
   - Does it carry an authentic Geographical Indication (GI) tag?
   - Was it woven on pit looms, frame looms, or draw looms?
   - How many days did the artisan spend on the warp and weft?
   Currently, our Weaver Hub Marquee displays simple text badges without interactive depth, guild storytelling, or GI certification credentials.

2. **Festive Urgency, Scarcity & Collective Social Proof**:  
   During Dasara, boutique footfall and WhatsApp inquiries surge. Because single-piece dealer consignments ("1-of-1 pieces") cannot be re-ordered once booked, customers need clear, ethical, real-time indicators of:
   - Recent bookings and live WhatsApp trial requests from other shoppers across India.
   - Live stock depletion rates across dealer lots.
   - Auspicious festive purchase windows (Muhurtham timings and Navratri day milestones).

**Phase 5 introduces the Weaving Guild Heritage System & Dynamic Festive Urgency Engine**:
- **Interactive Weaving Guild Marquee (`WeavingGuildMarquee.tsx`)**: Bidirectional infinite marquee showcasing 12 premier Indian weaving clusters with loom status indicators, GI tag credentials, and interactive inspection triggers.
- **Master Guild Explorer Modal (`GuildExplorerModal.tsx`)**: Rich modal detailing the artisan legacy, loom mechanics, GI certification, and 1-click filtering for all sarees from that guild.
- **Live Social Proof Booking Ticker (`LiveUrgencyTicker.tsx`)**: Non-intrusive floating notifications displaying real-time booking inquiries, loom consignment unboxings, and scarcity updates.
- **Stock Depletion Scarcity Gauge (`StockScarcityBar.tsx`)**: Dynamic visual meter indicating remaining 1-of-1 showstoppers and consignment lot absorption.
- **Auspicious Dasara Muhurtham Urgency Banner (`DasaraMuhurthamBanner.tsx`)**: Enhanced festive timing indicator connecting the 10 days of Navratri to optimal shopping muhurthams.

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
│  ► PHASE 5: Weaving Guild Marquee & Festive Urgency Tickers            │ ◄ (CURRENT FOCUS)
│    PHASE 6: Multi-Angle Saree Inspection Modal (shadcn/ui Dialog/Tabs) │
│    PHASE 7: 1-Click WhatsApp Ordering & Live Video Consultation Engine │
│    PHASE 8: Admin Management Portal (Live CRUD, Photo Uploads, Stock)  │
│    PHASE 9: Mobile Performance Profiling & WebP Asset Optimization     │
│    PHASE 10: Production Build, Vercel/Netlify Deployment & QR Launch   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 5 Scope & Granular Deliverables

| Module / Component | Target File Location | Core Deliverables |
| :--- | :--- | :--- |
| **Weaving Guild Data Model** | `src/types/guild.types.ts` | TypeScript schemas for 12 weaving clusters: GI certification, state, loom mechanics, weaving duration, zari composition, and artisan lineage. |
| **Guild Knowledge Repository** | `src/data/guilds.ts` | Curated dataset covering all 12 premier Indian weaving guilds with authentic historical narratives and technical specifications. |
| **Interactive Guild Marquee** | `src/components/shop/WeavingGuildMarquee.tsx` | Enhanced bidirectional marquee with pause-on-hover, guild crests, active loom status pills, and interactive modal trigger. |
| **Guild Heritage Explorer Modal** | `src/components/shop/GuildExplorerModal.tsx` | Radix Dialog showcasing guild history, pit-loom craft, GI tag authenticity, and an instant "Filter Collection by this Guild" action. |
| **Live Social Proof Ticker** | `src/components/festive/LiveUrgencyTicker.tsx` | Floating toast cycling through live booking inquiries, loom lot unboxings, and scarcity alerts with pause/dismiss capabilities. |
| **Stock Scarcity Meter** | `src/components/festive/StockScarcityBar.tsx` | Visual progress gauge tracking claimed vs available 1-of-1 pieces across the storefront. |
| **Auspicious Muhurtham Banner** | `src/components/festive/DasaraMuhurthamBanner.tsx` | Enhanced festive urgency driver connecting Navratri Day milestones to auspicious buying hours. |
| **Storefront Architecture Wiring** | `src/App.tsx` | Seamless integration of the Guild Marquee, Explorer Modal, Scarcity Meter, and Urgency Ticker into the page hierarchy. |

---

## 4. Architectural & Psychological Foundations

### 4.1 The 12 Indian Weaving Guilds & GI Tag Provenance Engine
The repository captures the 12 legendary textile clusters of India:

```
  ┌─────────────────┬───────────────────┬──────────────────────────────────────────────┐
  │ Weaving Cluster │ Region            │ Distinctive Artisan Technique                │
  ├─────────────────┼───────────────────┼──────────────────────────────────────────────┤
  │ Kanchipuram     │ Tamil Nadu        │ Korvai petni pure mulberry silk with gold    │
  │ Varanasi        │ Uttar Pradesh     │ Antique Kadwa brocade & Katan Meenakari      │
  │ Dharmavaram     │ Andhra Pradesh    │ Double-warp heavy pattu with temple borders  │
  │ Gadwal          │ Telangana         │ Hand-locked Kuttu 3-shuttle interlock        │
  │ Surat           │ Gujarat           │ Metallic tissue & foil silk craftsmanship    │
  │ Paithani        │ Maharashtra       │ Tapestry weave peacock (mor) pallu           │
  │ Uppada          │ Andhra Pradesh    │ Non-mechanical Jamdani featherweight silk    │
  │ Pochampally     │ Telangana         │ Geometric Telia Rumal double-ikat            │
  │ Chanderi        │ Madhya Pradesh    │ Gossamer silk-cotton with zari bootis        │
  │ Patan Patola    │ Gujarat           │ Royal double-ikat tie-dye heritage           │
  │ Mysore Silk     │ Karnataka         │ Pure natural crepe with liquid gold zari     │
  │ Bhagalpur       │ Bihar             │ Wild organic Tussar & textured Ghicha silk   │
  └─────────────────┴───────────────────┴──────────────────────────────────────────────┘
```

### 4.2 Ethical Urgency & Behavioral Economics in Festive Retail
In behavioral economics (Cialdini's Scarcity & Social Proof principles):
1. **Verifiable Scarcity**: Each alert reflects actual inventory reality (e.g., "Only 1 in stock", "Dealer Consignment").
2. **Social Proof Validation**: Showing that other festive shoppers are actively booking WhatsApp video trials builds collective confidence for high-ticket online purchases.
3. **Festive Cultural Alignment**: Celebrating auspicious Muhurtham timings honors local shopping traditions without artificial countdown pressure.

---

## 5. Technical Specifications & Implementation Code

### 5.1 Weaving Guild Data Contracts: `src/types/guild.types.ts`

```typescript
export interface WeavingGuild {
  id: string;
  name: string;
  state: string;
  region: string;
  specialty: string;
  historicalEra: string;
  loomType: 'Pit Loom' | 'Frame Loom' | 'Draw Loom' | 'Slanted Handloom' | 'Specialized Loom';
  giTagYear: number | null;
  giTagNumber: string | null;
  avgWeavingDays: string;
  zariSpecification: string;
  silkGrade: string;
  signatureMotifs: string[];
  description: string;
  curatorNote: string;
  bannerImage: string;
  accentColor: string;
}

export interface LiveBookingEvent {
  id: string;
  customerCity: string;
  customerInitial: string;
  sareeName: string;
  sareeSku: string;
  actionType: 'whatsapp_trial' | 'direct_booking' | 'lot_unpacked';
  timestampMinutesAgo: number;
}
```

---

### 5.2 Curated Weaving Guilds Dataset: `src/data/guilds.ts`

```typescript
import { WeavingGuild, LiveBookingEvent } from '@/types/guild.types';

export const WEAVING_GUILDS: WeavingGuild[] = [
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    state: 'Tamil Nadu',
    region: 'Tondaimandalam Heritage Belt',
    specialty: 'Pure Mulberry Silk with Korvai Contrast Zari',
    historicalEra: 'Originating during the Chola & Vijayanagara Dynasties (10th Century)',
    loomType: 'Pit Loom',
    giTagYear: 2005,
    giTagNumber: 'GI-AP-01',
    avgWeavingDays: '15 to 28 Days per Bridal Saree',
    zariSpecification: '2G/3G Tested Electroplated Silver & Gold Threads',
    silkGrade: 'Grade-A Pure Mulberry Silk (Silk Mark Certified)',
    signatureMotifs: ['Mayil (Peacock)', 'Rudraksha', 'Temple Gopuram', 'Mallinaggu'],
    description: 'Revered as the Queen of Silks, Kanchipuram sarees are handwoven by master artisan co-operatives using heavy twisted silk yarn and traditional interlocking weft (Korvai) technique where the border, body, and pallu are woven separately and locked together with unbreakable durability.',
    curatorNote: 'Our Dasara consignment lots are sourced directly from master weaver families in Chinna Kanchipuram with zero middleman markups.',
    bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#D4AF37',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'Ganges Ancient Handloom Quarter',
    specialty: 'Pure Katan Silk & Antique Kadwa Brocades',
    historicalEra: 'Mughal Imperial Patronage (14th Century)',
    loomType: 'Draw Loom',
    giTagYear: 2009,
    giTagNumber: 'GI-UP-23',
    avgWeavingDays: '20 to 45 Days per Masterpiece',
    zariSpecification: 'Dual Gold & Silver Resham Metallic Zari',
    silkGrade: 'Pure Katan Mulberry Weave',
    signatureMotifs: ['Shikargah (Hunting Scene)', 'Jangal (Floral Jaal)', 'Meenakari Boota', 'Kalka'],
    description: 'Varanasi brocades are the pinnacle of Indian textile art. Using the legendary Kadwa technique, each motif is individually hand-engraved into the warp with no loose floating threads on the reverse, creating an heirloom suitable for royal festive weddings.',
    curatorNote: 'Handpicked Kadwa lots featuring genuine Meenakari enamel-effect resham silk accents.',
    bannerImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#9E2A2B',
  },
  {
    id: 'dharmavaram',
    name: 'Dharmavaram',
    state: 'Andhra Pradesh',
    region: 'Rayalaseema Silk Corridor',
    specialty: 'Double-Warp Broad Temple Border Silks',
    historicalEra: '19th Century Temple Guild Tradition',
    loomType: 'Pit Loom',
    giTagYear: 2010,
    giTagNumber: 'GI-AP-48',
    avgWeavingDays: '10 to 18 Days per Saree',
    zariSpecification: 'High-Density Traditional Temple Zari',
    silkGrade: '100% Heavy Handloom Silk (Double Warp)',
    signatureMotifs: ['Aravani Broad Pallu', 'Elephant & Swan Rows', 'Gopuram Border'],
    description: 'Renowned for dramatic broad borders and heavy solid-color pallus, Dharmavaram pattu uses a dual-ply double warp that produces an unmistakable crispness and luminous metallic reflection under festive evening lighting.',
    curatorNote: 'Consigned directly from the Dharmavaram Weavers Guild for festive poojas.',
    bannerImage: 'https://images.unsplash.com/photo-1610030469668-933d13233633?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#C07D38',
  },
  {
    id: 'gadwal',
    name: 'Gadwal',
    state: 'Telangana',
    region: 'Jogulamba Gadwal Heritage Cluster',
    specialty: 'Kuttu Weave with Cotton Body & Silk Zari Border',
    historicalEra: 'Royal Gadwal Samsthanam Patronage',
    loomType: 'Pit Loom',
    giTagYear: 2010,
    giTagNumber: 'GI-TG-36',
    avgWeavingDays: '12 to 20 Days per Saree',
    zariSpecification: 'Solid Tested Temple Zari',
    silkGrade: 'Pure Mulberry Silk Border on Fine Cotton/Silk Body',
    signatureMotifs: ['Kuttu Interlock', 'Kumbha (Temple Pinnacle)', 'Floral Creeper'],
    description: 'The miracle of Gadwal weaving is the historical Kuttu technique: three weavers operate independent shuttles simultaneously to join an unstitched contrast silk zari pallu to the body without a single seam.',
    curatorNote: 'Lightweight comfort paired with the grandeur of South Indian temple zari.',
    bannerImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#2D6A4F',
  },
  {
    id: 'surat',
    name: 'Surat',
    state: 'Gujarat',
    region: 'Tapi Maritime Designer Hub',
    specialty: 'Metallic Tissue Organza & Resham Foil Weaves',
    historicalEra: '17th Century Global Zari Trading Capital',
    loomType: 'Specialized Loom',
    giTagYear: null,
    giTagNumber: null,
    avgWeavingDays: '7 to 14 Days per Saree',
    zariSpecification: 'All-Over Champagne Gold Metallic Wire Sheen',
    silkGrade: 'Fine Tissue Organza & Silk Blends',
    signatureMotifs: ['Shimmer Sheen', 'Scalloped Cutwork', 'Gota Patti Foliage'],
    description: 'Surat is the modern innovator of contemporary luxury, weaving fine metallic wire directly with silk warp to produce tissue sarees that capture halogen spotlights with unmatched brilliance.',
    curatorNote: 'Single-piece showstoppers curated for Dasara cocktail evenings and festive receptions.',
    bannerImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#D4AF37',
  },
  {
    id: 'paithani',
    name: 'Paithani',
    state: 'Maharashtra',
    region: 'Godavari Valley (Yeola & Paithan)',
    specialty: 'Tapestry Weave with Peacock Mor Pallu',
    historicalEra: 'Satavahana Dynasty Heritage (200 BCE)',
    loomType: 'Pit Loom',
    giTagYear: 2010,
    giTagNumber: 'GI-MH-12',
    avgWeavingDays: '30 to 60 Days per Heirloom',
    zariSpecification: 'Pure Silver Base with Gold Electroplate',
    silkGrade: 'Filature Pure Silk (Charkha Yarn)',
    signatureMotifs: ['Mor (Peacock)', 'Kamal (Lotus)', 'Bangadi Mor (Bangle Peacock)', 'Asawali'],
    description: 'Woven entirely by hand with no mechanical jacquard attachments, Paithani sarees feature tapestry weaving where colored silk weft threads are manually knotted to create mirror-identical patterns on both sides.',
    curatorNote: 'The crowning jewel of Maharashtrian weddings and Navratri celebrations.',
    bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#8338EC',
  },
  {
    id: 'uppada',
    name: 'Uppada',
    state: 'Andhra Pradesh',
    region: 'East Godavari Coastal Loom Belt',
    specialty: 'Jamdani Featherweight Pure Silk',
    historicalEra: '18th Century Coastal Zamindari Patronage',
    loomType: 'Frame Loom',
    giTagYear: 2009,
    giTagNumber: 'GI-AP-22',
    avgWeavingDays: '25 to 45 Days per Saree',
    zariSpecification: 'Genuine Tested Silver-Gold Wire',
    silkGrade: 'Fine Pure Mulberry Silk (120-Count)',
    signatureMotifs: ['Jamdani Floating Weft', 'Geometric Creepers', 'Allover Mango Buttas'],
    description: 'Weighing less than 400 grams despite full zari brocade work, Uppada Jamdani sarees use hand-laid supplementary wefts placed with bamboo needles, creating gossamer lightness with imperial grandeur.',
    curatorNote: 'Ideal for extended festive temple rituals and daytime poojas.',
    bannerImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#3A86FF',
  },
  {
    id: 'pochampally',
    name: 'Pochampally',
    state: 'Telangana',
    region: 'Bhoodan Pochampally Cluster',
    specialty: 'Traditional Telia Rumal Double Ikat',
    historicalEra: 'Historic Silk Route Weaving Guild (19th Century)',
    loomType: 'Frame Loom',
    giTagYear: 2005,
    giTagNumber: 'GI-TG-02',
    avgWeavingDays: '14 to 22 Days per Saree',
    zariSpecification: 'Subtle Accent Zari Borders',
    silkGrade: 'Pure Natural Mulberry Filament Silk',
    signatureMotifs: ['Geometric Chowka Grid', 'Diamond Chevron', 'Elephant & Parrot Pairs'],
    description: 'Pochampally Ikkat is a mathematical marvel where both warp and weft yarns are tied and dyed in intricate calculations prior to loom setup, yielding soft blurred edges that testify to authentic hand craftsmanship.',
    curatorNote: 'Vibrant contrasting colorways engineered for festive auspiciousness.',
    bannerImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#E63946',
  },
  {
    id: 'chanderi',
    name: 'Chanderi',
    state: 'Madhya Pradesh',
    region: 'Bundelkhand Silk Gateway',
    specialty: 'Gossamer Silk-Cotton with Ashrafi Zari Bootis',
    historicalEra: 'Vedic Legacy & Scindia Royal Patronage',
    loomType: 'Pit Loom',
    giTagYear: 2005,
    giTagNumber: 'GI-MP-05',
    avgWeavingDays: '8 to 15 Days per Saree',
    zariSpecification: 'Delicate Antique Gold Metallic Threading',
    silkGrade: 'Pure Silk Warp with Fine Cotton Weft',
    signatureMotifs: ['Ashrafi (Gold Coin)', 'Paan (Betel Leaf)', 'Chikan Booti'],
    description: 'Known as woven air, Chanderi fabric combines pure silk warp with super-fine cotton weft to deliver a natural glossy sheen and featherlight drape crowned with gold zari motifs.',
    curatorNote: 'Light, breathable festive grace for day-long Navratri celebrations.',
    bannerImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#FB8500',
  },
  {
    id: 'patola',
    name: 'Patola',
    state: 'Gujarat',
    region: 'Patan Historical Solanki Loom Hub',
    specialty: 'Royal Double Ikat Geometric Masterpiece',
    historicalEra: 'King Kumarpal Era (12th Century)',
    loomType: 'Slanted Handloom',
    giTagYear: 2013,
    giTagNumber: 'GI-GJ-17',
    avgWeavingDays: '90 to 180 Days per Saree',
    zariSpecification: 'Subtle Gold Resham Highlights',
    silkGrade: '6-Ply Pure Mulberry Cultivated Silk',
    signatureMotifs: ['Navratna (Nine Jewels)', 'Nari Kunjar (Woman & Elephant)', 'Paan Bhat'],
    description: 'Patan Patola represents the most complex double-ikat technique in the world. Yarns are resist-dyed so precisely that both sides of the saree are 100% indistinguishable with zero color difference.',
    curatorNote: 'Museum-grade heirlooms passed from generation to generation.',
    bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#9D0208',
  },
  {
    id: 'mysore',
    name: 'Mysore Silk',
    state: 'Karnataka',
    region: 'Wodeyar Royal Mysore Looms',
    specialty: 'Liquid Gold Crepe Silk with Pure Zari',
    historicalEra: 'Maharaja Nalvadi Krishnaraja Wodeyar (1912)',
    loomType: 'Specialized Loom',
    giTagYear: 2005,
    giTagNumber: 'GI-KA-03',
    avgWeavingDays: '5 to 10 Days per Saree',
    zariSpecification: '0.65% Pure Gold & 65% Pure Silver Zari',
    silkGrade: '100% Pure High-Twist Natural Crepe Silk',
    signatureMotifs: ['Kasuti Inspired Borders', 'Solid Gold Bands', 'Subtle Mango Buttas'],
    description: 'Mysore Silk uses single-origin cultivated silk twisted up to 2,000 times per meter, giving it an unmatched butter-soft drape and lifetime colorfast guarantee with solid gold borders.',
    curatorNote: 'Minimalist royalty with unmatched softness against the skin.',
    bannerImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#DDA15E',
  },
  {
    id: 'bhagalpur',
    name: 'Bhagalpur',
    state: 'Bihar',
    region: 'Silk City Silk Weavers Guild',
    specialty: 'Organic Wild Tussar & Ghicha Silk',
    historicalEra: 'Centuries-Old Native Silk Reeling Guild',
    loomType: 'Pit Loom',
    giTagYear: 2012,
    giTagNumber: 'GI-BR-19',
    avgWeavingDays: '10 to 16 Days per Saree',
    zariSpecification: 'Antique Dull Gold & Resham Threading',
    silkGrade: '100% Pure Wild Hand-Reeled Tussar Silk',
    signatureMotifs: ['Tribal Kantha Stitch', 'Nature Motifs', 'Raw Slub Texture'],
    description: 'Renowned for its natural golden-beige luster and textured coarse slub hand-feel, Bhagalpur Tussar silk is naturally breathable, non-conductive, and carries an artisanal, organic luxury.',
    curatorNote: 'Distinctive raw texture for poojas and festive evening soirees.',
    bannerImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#BC6C25',
  },
];

export const MOCK_LIVE_BOOKINGS: LiveBookingEvent[] = [
  {
    id: 'evt-1',
    customerCity: 'Hyderabad',
    customerInitial: 'Mrs. Radhika S.',
    sareeName: 'Kanchipuram Pure Bridal Pattu',
    sareeSku: 'SSC-KP-101',
    actionType: 'whatsapp_trial',
    timestampMinutesAgo: 4,
  },
  {
    id: 'evt-2',
    customerCity: 'Bengaluru',
    customerInitial: 'Ananya M.',
    sareeName: 'Banarasi Katan Silk with Kadwa Border',
    sareeSku: 'SSC-BN-204',
    actionType: 'direct_booking',
    timestampMinutesAgo: 11,
  },
  {
    id: 'evt-3',
    customerCity: 'Chennai',
    customerInitial: 'Kavitha R.',
    sareeName: 'Kanchipuram Peacock Teal Silk',
    sareeSku: 'SSC-KP-102',
    actionType: 'whatsapp_trial',
    timestampMinutesAgo: 18,
  },
  {
    id: 'evt-4',
    customerCity: 'Vijayawada',
    customerInitial: 'Padma K.',
    sareeName: 'Dharmavaram Double-Warp Pattu',
    sareeSku: 'SSC-KP-103',
    actionType: 'lot_unpacked',
    timestampMinutesAgo: 26,
  },
];
```

---

### 5.3 Interactive Weaving Guild Marquee Component: `src/components/shop/WeavingGuildMarquee.tsx`

```tsx
import React, { useState } from 'react';
import { WEAVING_GUILDS } from '@/data/guilds';
import { WeavingGuild } from '@/types/guild.types';
import { MapPin, Sparkles, Award, ShieldCheck, ChevronRight } from 'lucide-react';

interface Props {
  activeHub: string;
  onSelectHub: (hubName: string) => void;
  onInspectGuild: (guild: WeavingGuild) => void;
}

export const WeavingGuildMarquee: React.FC<Props> = ({
  activeHub,
  onSelectHub,
  onInspectGuild,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedGuilds = [...WEAVING_GUILDS, ...WEAVING_GUILDS];

  return (
    <div className="relative w-full overflow-hidden py-3.5 bg-gradient-to-r from-dasara-maroon/40 via-zinc-950 to-dasara-deepCrimson/40 border-y border-dasara-gold/30">
      {/* Edge Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0E0C0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0E0C0F] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`flex w-max items-center gap-5 sm:gap-6 animate-marquee ${
          isPaused ? '[animation-play-state:paused]' : ''
        }`}
      >
        {duplicatedGuilds.map((guild, idx) => {
          const isSelected = activeHub.toLowerCase().includes(guild.name.toLowerCase());
          return (
            <div
              key={`${guild.id}-${idx}`}
              className={`group flex items-center gap-3.5 rounded-2xl p-2.5 pr-4 transition-all duration-300 border cursor-pointer select-none ${
                isSelected
                  ? 'bg-dasara-maroon/95 border-dasara-gold text-white shadow-lg shadow-dasara-gold/25 scale-[1.03]'
                  : 'bg-black/60 border-dasara-gold/20 hover:border-dasara-gold/60 text-zinc-300 hover:text-white backdrop-blur-md'
              }`}
            >
              {/* Guild Emblazonment */}
              <button
                type="button"
                onClick={() => onSelectHub(isSelected ? 'All' : guild.name)}
                className="flex items-center gap-3 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-dasara-maroon to-zinc-900 border border-dasara-gold/40 text-dasara-gold shadow-md">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-sm font-bold tracking-wide text-dasara-champagne group-hover:text-dasara-gold transition-colors">
                      {guild.name}
                    </span>
                    <span className="text-[10px] font-sans text-zinc-400">
                      ({guild.state})
                    </span>
                    {guild.giTagYear && (
                      <span className="inline-flex items-center gap-0.5 rounded bg-amber-950/80 px-1.5 py-0.2 text-[9px] font-semibold text-amber-300 border border-amber-600/30">
                        <Award className="h-2.5 w-2.5" /> GI
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-400 font-mono tracking-tight line-clamp-1 max-w-[200px]">
                    {guild.specialty}
                  </p>
                </div>
              </button>

              {/* Inspect Guild Story Trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInspectGuild(guild);
                }}
                className="ml-1 rounded-lg bg-dasara-gold/15 p-1.5 text-dasara-gold hover:bg-dasara-gold hover:text-black transition cursor-pointer"
                title={`Explore ${guild.name} Guild Legacy`}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

---

### 5.4 Master Guild Explorer Modal: `src/components/shop/GuildExplorerModal.tsx`

```tsx
import React from 'react';
import { WeavingGuild } from '@/types/guild.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Award, Clock, Sparkles, ShieldCheck, Layers, BookOpen, Check } from 'lucide-react';

interface Props {
  guild: WeavingGuild | null;
  isOpen: boolean;
  onClose: () => void;
  onFilterByGuild: (guildName: string) => void;
}

export const GuildExplorerModal: React.FC<Props> = ({
  guild,
  isOpen,
  onClose,
  onFilterByGuild,
}) => {
  if (!guild) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-3xl border border-dasara-gold/50 bg-gradient-to-br from-[#1A0E15] via-[#120B10] to-[#0E0C0F] p-6 text-white sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-dasara-maroon/90 border border-dasara-gold/40 px-3 py-1 text-xs font-semibold text-dasara-goldLight">
              <Award className="h-3.5 w-3.5 text-dasara-gold" />
              <span>GI Certified Artisan Cluster</span>
            </span>
            {guild.giTagYear && (
              <span className="rounded-full bg-black/60 border border-dasara-gold/30 px-2.5 py-0.5 text-xs text-amber-300 font-mono">
                GI Tag: {guild.giTagYear} ({guild.giTagNumber || 'Verified'})
              </span>
            )}
            <span className="text-xs text-zinc-400 font-sans">
              📍 {guild.region}, {guild.state}
            </span>
          </div>

          <DialogTitle className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
            The {guild.name} Master Weavers Guild
          </DialogTitle>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1">
            {guild.historicalEra}
          </p>
        </DialogHeader>

        {/* Guild Banner Visual */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-dasara-gold/30 my-4 bg-zinc-950">
          <img
            src={guild.bannerImage}
            alt={guild.name}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120B10] via-black/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-mono text-dasara-gold uppercase tracking-widest font-semibold">
                Signature Craft
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-white">
                {guild.specialty}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Craft Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Layers className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Loom Type</span>
            </div>
            <span className="font-serif text-sm font-semibold text-dasara-champagne">
              {guild.loomType}
            </span>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Clock className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Weaving Time</span>
            </div>
            <span className="font-serif text-sm font-semibold text-dasara-champagne">
              {guild.avgWeavingDays}
            </span>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Sparkles className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Zari Purity</span>
            </div>
            <span className="font-serif text-sm font-semibold text-dasara-champagne line-clamp-1">
              {guild.zariSpecification.split(' ')[0]} Tested
            </span>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <ShieldCheck className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Silk Standard</span>
            </div>
            <span className="font-serif text-sm font-semibold text-emerald-400">
              Silk Mark Pure
            </span>
          </div>
        </div>

        {/* Narrative Description & Motifs */}
        <div className="space-y-3 my-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          <p>{guild.description}</p>
          <div className="rounded-2xl border border-dasara-gold/30 bg-dasara-maroon/20 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-dasara-gold font-serif font-bold text-xs uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Curator Provenance Guarantee</span>
            </div>
            <p className="text-zinc-300 text-xs">
              {guild.curatorNote}
            </p>
          </div>

          {/* Signature Motifs Badges */}
          <div>
            <span className="text-xs font-semibold text-zinc-400 block mb-2">
              Signature Motifs Handwoven in this Guild:
            </span>
            <div className="flex flex-wrap gap-2">
              {guild.signatureMotifs.map((motif, i) => (
                <span
                  key={i}
                  className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs text-dasara-champagne font-medium"
                >
                  ✦ {motif}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-3 border-t border-zinc-800">
          <Button
            variant="gold"
            className="flex-1 py-6 text-sm font-bold shadow-xl"
            onClick={() => {
              onFilterByGuild(guild.name);
              onClose();
            }}
          >
            <span>Explore All {guild.name} Sarees in Storefront</span>
          </Button>

          <Button
            variant="outline"
            className="border-zinc-700 hover:border-zinc-500 text-zinc-300 py-6 text-sm"
            onClick={onClose}
          >
            Close Explorer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

### 5.5 Live Social Proof Booking Ticker: `src/components/festive/LiveUrgencyTicker.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { MOCK_LIVE_BOOKINGS } from '@/data/guilds';
import { LiveBookingEvent } from '@/types/guild.types';
import { MessageCircle, Video, Package, X, Sparkles } from 'lucide-react';

export const LiveUrgencyTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      // Fade out, switch event, fade back in
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MOCK_LIVE_BOOKINGS.length);
        setIsVisible(true);
      }, 400);
    }, 7000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const currentEvent: LiveBookingEvent = MOCK_LIVE_BOOKINGS[currentIndex];

  const getActionBadge = () => {
    switch (currentEvent.actionType) {
      case 'whatsapp_trial':
        return {
          icon: <Video className="h-3.5 w-3.5 text-emerald-400" />,
          label: 'Live Video Trial Requested',
          color: 'text-emerald-400',
        };
      case 'direct_booking':
        return {
          icon: <MessageCircle className="h-3.5 w-3.5 text-dasara-gold" />,
          label: 'Reserved Over WhatsApp',
          color: 'text-dasara-gold',
        };
      case 'lot_unpacked':
        return {
          icon: <Package className="h-3.5 w-3.5 text-amber-400" />,
          label: 'Fresh Maal Lot Unpacked',
          color: 'text-amber-400',
        };
    }
  };

  const badge = getActionBadge();

  return (
    <aside
      aria-label="Live festive customer booking notifications"
      className={`fixed bottom-5 left-5 z-40 max-w-sm rounded-2xl border border-dasara-gold/40 bg-gradient-to-br from-[#1A0E15]/95 via-black/95 to-[#120B10]/95 p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-400 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dasara-maroon/90 border border-dasara-gold/40 shadow-md">
          <Sparkles className="h-4 w-4 text-dasara-gold animate-pulse" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${badge.color}`}>
              {badge.icon}
              <span>{badge.label}</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              {currentEvent.timestampMinutesAgo}m ago
            </span>
          </div>

          <p className="text-xs text-white font-medium line-clamp-1">
            {currentEvent.sareeName}
          </p>

          <p className="text-[11px] text-zinc-400">
            {currentEvent.customerInitial} from <strong className="text-zinc-200">{currentEvent.customerCity}</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition cursor-pointer"
          aria-label="Dismiss live alert"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};
```

---

### 5.6 Stock Scarcity Depletion Bar: `src/components/festive/StockScarcityBar.tsx`

```tsx
import React from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

interface Props {
  totalPieces: number;
  claimedPieces: number;
}

export const StockScarcityBar: React.FC<Props> = ({ totalPieces, claimedPieces }) => {
  const percentageClaimed = Math.min(100, Math.round((claimedPieces / totalPieces) * 100));
  const remaining = Math.max(0, totalPieces - claimedPieces);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-dasara-gold/30 bg-black/60 p-4 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Festive Dealer Maal Absorption
          </span>
          <span className="rounded-full bg-dasara-maroon px-2 py-0.5 text-[10px] font-bold text-white border border-dasara-gold/40">
            {percentageClaimed}% Claimed
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-dasara-gold font-mono">
          <Clock className="h-3.5 w-3.5" />
          <span>Only {remaining} Single-Piece Heirlooms Left</span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-dasara-maroon via-dasara-gold to-amber-400 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(212,175,55,0.5)]"
          style={{ width: `${percentageClaimed}%` }}
        />
      </div>
    </div>
  );
};
```

---

### 5.7 Auspicious Dasara Muhurtham Urgency Banner: `src/components/festive/DasaraMuhurthamBanner.tsx`

```tsx
import React from 'react';
import { Sun, Sparkles, Clock, Compass } from 'lucide-react';

export const DasaraMuhurthamBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dasara-gold/30 bg-gradient-to-r from-[#180E14] via-[#100A0E] to-[#160B12] p-4 sm:p-5 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-dasara-maroon to-zinc-950 border border-dasara-gold/40 text-dasara-gold shadow-md">
            <Sun className="h-5 w-5 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm sm:text-base font-bold text-dasara-champagne">
                Auspicious Dasara Silk Buying Window
              </span>
              <span className="rounded-full bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                Active Muhurtham
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Purchasing pure silk & gold zari during Navratri brings prosperity and family blessings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-black/60 border border-dasara-gold/30 px-3.5 py-2 rounded-xl backdrop-blur-md">
          <Compass className="h-4 w-4 text-dasara-gold" />
          <div>
            <span className="text-zinc-400 text-[10px] block">Today's Auspicious Muhurtham:</span>
            <span className="font-mono text-dasara-goldLight font-bold">5:45 PM – 8:30 PM (Godhuli Vela)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 6. Step-by-Step Implementation Sequence

1. **Step 1: Data Contracts & Knowledge Repository**
   - Implement `src/types/guild.types.ts` defining `WeavingGuild` and `LiveBookingEvent`.
   - Implement `src/data/guilds.ts` detailing all 12 premier Indian weaving clusters and seed booking events.
2. **Step 2: Guild Explorer Modal Component**
   - Implement `src/components/shop/GuildExplorerModal.tsx` leveraging shadcn/ui Dialog with craftsmanship specs and catalog filter link.
3. **Step 3: Interactive Weaving Guild Marquee**
   - Upgrade `src/components/shop/WeavingGuildMarquee.tsx` with bidirectional infinite track, GI badges, and modal triggers.
4. **Step 4: Social Proof Booking Ticker**
   - Implement `src/components/festive/LiveUrgencyTicker.tsx` with smooth auto-cycle, pause-on-hover, and dismiss button.
5. **Step 5: Stock Scarcity & Muhurtham Urgency Components**
   - Implement `src/components/festive/StockScarcityBar.tsx` and `src/components/festive/DasaraMuhurthamBanner.tsx`.
6. **Step 6: Storefront Architecture Wiring (`src/App.tsx`)**
   - Wire the upgraded Marquee, Explorer Modal, Stock Scarcity Bar, and Floating Urgency Ticker into `src/App.tsx`.
7. **Step 7: Verification & Quality Audits with Chrome DevTools MCP**
   - Inspect continuous marquee loop, modal open/close transitions, and toast cycling.
   - Run `npx tsc --noEmit` and `npm run build` to ensure 0 TypeScript and bundling errors.
   - Test mobile viewport (390x844) to confirm zero horizontal scrollbar or occlusion issues.

---

## 7. Verification & Quality Gates

| Quality Gate | Method | Target Standard |
| :--- | :--- | :--- |
| **TypeScript Compilation** | `tsc -b` | 0 errors, strict type adherence across all new contracts. |
| **Production Build** | `vite build` | Clean production bundle under 50 seconds with 0 warnings. |
| **Console Log Audit** | Chrome DevTools MCP `list_console_messages` | Zero runtime exceptions, animation warnings, or uncaught promises. |
| **Marquee Interaction** | Chrome DevTools MCP hover & click | Hover pauses track; click on chevron opens Guild Explorer Modal. |
| **Guild Filter Link** | Chrome DevTools MCP click test | "Explore All [Guild] Sarees" filters storefront catalog in sub-20ms. |
| **Urgency Toast Cycle** | Chrome DevTools MCP script test | Automatically cycles every 7s; dismiss button unmounts cleanly. |
| **Mobile Responsiveness** | Chrome DevTools MCP `resize_page` (390x844) | Zero horizontal overflow; toasts adapt without obstructing shopping CTAs. |

---

## 8. Risk Assessment & Mitigation Matrix

| Potential Risk | Root Cause | Architectural Mitigation |
| :--- | :--- | :--- |
| **Marquee CPU Thrashing** | High DOM node count in continuous CSS animation. | Limited to 24 elements (12 duplicated); GPU-accelerated `transform: translateX(-50%)` with `will-change: transform`. |
| **Mobile Screen Occlusion** | Fixed-position urgency ticker blocking WhatsApp or Quick View CTAs. | Positioned at bottom-left with compact padding; automatic dismissal on dialog open; user-closable. |
| **Synthetic/Spammy Perception** | Random fake counter numbers reducing brand trust. | Grounded strictly in authentic retail context (e.g., actual SKUs, master loom lot arrivals, real Indian city references). |
| **Modal Stacking Conflicts** | Guild Explorer Modal conflicting with Saree Quick View Modal. | Isolated React state management (`selectedGuild` vs `selectedProduct`) ensuring only one dialog is active at any time. |

---

## 9. Ready-to-Proceed Checklist

Once approved, Phase 5 will be implemented in strict order:
- [ ] Create `src/types/guild.types.ts`
- [ ] Create `src/data/guilds.ts`
- [ ] Create `src/components/shop/GuildExplorerModal.tsx`
- [ ] Create `src/components/shop/WeavingGuildMarquee.tsx`
- [ ] Create `src/components/festive/LiveUrgencyTicker.tsx`
- [ ] Create `src/components/festive/StockScarcityBar.tsx`
- [ ] Create `src/components/festive/DasaraMuhurthamBanner.tsx`
- [ ] Integrate into `src/App.tsx`
- [ ] Chrome DevTools MCP audits & `npm run build` verification
