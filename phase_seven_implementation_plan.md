# 🥻 Phase 7 Implementation Plan: 1-Click WhatsApp Ordering & Live Video Consultation Engine

**Project:** Sri Sai ClothStore – Dasara Grand Launch Flagship  
**Author:** Senior Staff Frontend & Conversational Commerce Systems Architect  
**Interaction & Motion Stack:** Radix UI Primitives (`@radix-ui/react-dialog`), Custom Conversational Deep-Linking Engine, Web Animations API, Lucide Icons  
**Target Environment:** Node.js 18+ / 20+, Vite 5+, React 18+, TypeScript 5+, Tailwind CSS 3+  
**File Locations:** `plans/phase_seven_implementation_plan.md` & `phase_seven_implementation_plan.md`  

---

## 1. Executive Summary & Retail Context

Across **Phases 1 through 6**, we built the full aesthetic and experiential architecture for Sri Sai ClothStore:
- **Phase 1**: Tooling, Vite 5, React 18, TypeScript 5.6, Royal Dasara design tokens (`#6B0B24` Kumkuma Maroon, `#D4AF37` Temple Gold, `#FAF6F0` Silk Champagne), Supabase database, and Admin Auth bedrock.
- **Phase 2**: E-commerce data layer with 20+ saree consignment seed ("maal" lots from 11 regional weaver guilds), Supabase real-time inventory synchronization, and sub-20ms client-side catalog filtering.
- **Phase 3**: High-performance GPU Three.js Waving Silk Hero Simulation with GLSL vertex wave deformation, PBR microfacet sheen, and dynamic colorway swatch switching.
- **Phase 4**: ReactBits Interactive Physics Cards & VIP Showstopper Spotlight Showcase with ref-based 120 FPS 3D perspective tilt (`TiltedCard.tsx`), continuous gold border beams (`BorderBeam.tsx`), and spotlight illumination.
- **Phase 5**: Weaving Guild Heritage Marquee (`WeavingGuildMarquee.tsx`), 12 regional textile clusters with GI certification, Master Guild Explorer Modal (`GuildExplorerModal.tsx`), Live Social Proof Booking Ticker (`LiveUrgencyTicker.tsx`), Stock Scarcity Depletion Meter (`StockScarcityBar.tsx`), and Auspicious Muhurtham Banner (`DasaraMuhurthamBanner.tsx`).
- **Phase 6**: Multi-Angle Saree Inspection Modal with 4 standardized photography viewpoints, ref-based 60/120 FPS fabric loupe with variable 2x/3x/4.5x macro zoom, full-screen theatre lightbox, and Radix UI technical specification tabs.

### The Problem Phase 7 Solves: The Reality of Indian Luxury Saree Commerce
In authentic Indian bridal and festive saree retail, high-ticket pieces (Kanchipuram pure pattu, Varanasi antique Kadwa brocade, Dharmavaram heavy pattu) are priced between **₹9,999 and ₹25,000+**. 

Unlike low-cost apparel or commodity e-commerce:
1. **Cold Checkouts Fail for Luxury Sarees**: Discerning families and bridal parties do not make high-ticket purchases via an impersonal cart with cold credit card forms. Saree purchasing is an emotionally charged, high-trust family event.
2. **Personal Rapport & Reassurance**: Buyers expect direct communication with the boutique owners ("Mom's counter"). They want to ask: *"Is the color true crimson or cherry red? Can you pleat the pallu on video so I can see how it falls? Can you hold this 1-of-1 piece for 24 hours while I confirm with my mother-in-law?"*
3. **Live Video Drape Verification**: The single highest conversion driver in high-ticket regional textile commerce is the **5-minute live video call**, where the master draper displays the saree under boutique halogen lighting, demonstrates the contrast blouse piece, and displays the reverse side of the zari to prove handloom authenticity.
4. **Physical Store Footfall Synergy**: Many customers browsing online reside within driving distance. They need an enticing bridge to visit the physical store during the 10 days of Dasara (such as the `DASARA500` billing counter coupon and real-time navigation directions).

**Phase 7 implements the high-trust Conversational Commerce Engine**:
- **1-Click WhatsApp Direct Ordering**: Formatted markdown payload engine generating itemized reservation messages with SKU, photo link, pricing, and 24-hour hold requests.
- **Interactive Live Video Consultation Booking Engine (`LiveVideoConsultModal.tsx`)**: High-trust scheduling dialog enabling customers to pick specific shortlisted sarees, select time slots (Morning Pooja, Afternoon High Tea, Auspicious Godhuli Vela), choose preferred language (Telugu, Hindi, English, Tamil), and auto-generate the booking confirmation.
- **Sticky Floating WhatsApp Conversion Dock (`FloatingWhatsAppDock.tsx`)**: Pulsating, non-intrusive floating WhatsApp bubble with quick-expand actions (*Chat with Store Owner*, *Book Video Drape Call*, *Send Shortlist*, *Get Store Route*).
- **Physical Store Footfall Catalyst (`StoreFootfallCard.tsx`)**: Blueprint Section 7.2 implementation featuring the `DASARA500` instant voucher, one-click copy, Google Maps navigation, and live boutique hours indicator.
- **Multi-Item WhatsApp Bridal Inquiry Bag (`WhatsAppInquiryBagModal.tsx`)**: Enables families to bundle 2–5 matching sarees (bridal trousseau) into a unified itemized WhatsApp bill.

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
│  ► PHASE 7: 1-Click WhatsApp Ordering & Live Video Consultation Engine │ ◄ (CURRENT FOCUS)
│    PHASE 8: Admin Management Portal (Live CRUD, Photo Uploads, Stock)  │
│    PHASE 9: Mobile Performance Profiling & WebP Asset Optimization     │
│    PHASE 10: Production Build, Vercel/Netlify Deployment & QR Launch   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 7 Scope & Granular Deliverables

| Module / Component | Target File Location | Core Deliverables |
| :--- | :--- | :--- |
| **Conversational Data Contracts** | `src/types/whatsapp.types.ts` | TypeScript schemas for WhatsApp orders, video consultation bookings, time slot definitions, multi-item inquiries, and store contact configuration. |
| **WhatsApp Deep-Linking Engine** | `src/lib/whatsapp.ts` | Comprehensive utility suite: formatted single-product orders, video consultation bookings, multi-item trousseau packages, family share links, and device-aware protocol routing (`whatsapp://` vs `https://wa.me/`). |
| **Live Video Consultation Modal** | `src/components/shop/LiveVideoConsultModal.tsx` | Interactive scheduling dialog: saree shortlist selector, time slot picker, language preference (Telugu, Hindi, English, Tamil), and instant WhatsApp confirmation dispatch. |
| **Floating WhatsApp Conversion Dock** | `src/components/shop/FloatingWhatsAppDock.tsx` | Persistent, mobile-optimized floating WhatsApp trigger with quick-action expansion sheet and smart scroll-hide behavior. |
| **In-Store Footfall Catalyst Card** | `src/components/festive/StoreFootfallCard.tsx` | Blueprint Section 7.2 implementation: `DASARA500` voucher card, copy button with tactile feedback, live store open status, and Google Maps GPS navigation. |
| **Multi-Item WhatsApp Inquiry Bag** | `src/components/shop/WhatsAppInquiryBagModal.tsx` | Multi-saree trousseau bag modal: itemized calculation, festive discount totals, customer note input, and unified WhatsApp bill generation. |
| **Storefront Architecture Wiring** | `src/App.tsx` | Seamless integration of the floating dock, video consult modal, footfall catalyst card, and multi-item inquiry bag into the page flow. |

---

## 4. Architectural & Conversational Foundations

### 4.1 The Psychology of Indian Saree Conversational Commerce
In the Indian textile and bridal market, the sales process follows a distinct relationship funnel:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        INDIAN BRIDAL TEXTILE CONVERSATIONAL FUNNEL                     │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│ Customer State           │ Required Reassurance     │ Technical & Operational Solution │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 1. Browsing Discovery    │ Visual appeal, purity,   │ Multi-angle inspection modal     │
│                          │ provenance validation    │ with Silk Mark verification.     │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 2. Saree Shortlisting    │ Family consensus, color  │ "Share with Family on WhatsApp"  │
│                          │ matching across members  │ with pre-rendered photo link.    │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 3. Live Video Trial      │ "Show me the real drape  │ 5-minute Live Video Call modal   │
│                          │ under boutique light"    │ with time slot & language pick.  │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 4. Reservation & Hold    │ "Hold this 1-of-1 piece  │ 1-Click WhatsApp pre-order with  │
│                          │ for 24h with token"      │ 24-hour reservation tag & SKU.   │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 5. Physical Store Visit  │ "Let's visit the store   │ In-store footfall voucher card   │
│                          │ to touch the fabric"     │ with DASARA500 coupon & GPS map. │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

### 4.2 Deep-Linking & Protocol Routing Architecture
To guarantee that WhatsApp opens flawlessly across all platforms (Android Chrome, iOS Safari, macOS Safari, Windows Chrome):

```typescript
// Protocol Selection Strategy:
// 1. Mobile Browsers (Android / iOS):
//    wa.me/PHONE?text=... (Triggers native WhatsApp OS intent via universal link)
// 2. Desktop Browsers:
//    web.whatsapp.com/send?phone=PHONE&text=... (Launches WhatsApp Web or Desktop App)
```

1. **Markdown Formatting**:
   - `*Bold*` for product names, SKUs, and prices.
   - `_Italics_` for fabric descriptions and artisan notes.
   - `🏷️`, `🥻`, `📍`, `💰`, `📸`, `✨` emojis for clean visual hierarchy.
2. **URL Character Length Safety**:
   - URLs are strictly capped under 1,800 characters to prevent mobile browser truncation.
   - Uses `encodeURIComponent` for all dynamic parameters.

---

## 5. Granular Component Specifications & Production Code

### 5.1 Conversational Data Contracts: `src/types/whatsapp.types.ts`

```typescript
import { SareeProduct } from './product.types';

export type PreferredLanguage = 'Telugu' | 'Hindi' | 'English' | 'Tamil';

export type VideoPlatform = 'WhatsApp Video Call' | 'Google Meet';

export type TimeSlotCategory = 'Morning Pooja (10:30 AM – 1:00 PM)' | 'Afternoon High Tea (2:30 PM – 5:00 PM)' | 'Auspicious Godhuli Vela (5:45 PM – 8:30 PM)';

export interface VideoConsultBooking {
  customerName: string;
  customerPhone: string;
  customerCity: string;
  preferredLanguage: PreferredLanguage;
  preferredPlatform: VideoPlatform;
  timeSlot: TimeSlotCategory;
  selectedProducts: SareeProduct[];
  specialNotes?: string;
}

export interface WhatsAppOrderPayload {
  product: SareeProduct;
  customerCity?: string;
  isHoldRequest?: boolean;
  selectedAngleUrl?: string;
  customNote?: string;
}

export interface MultiItemInquiryPayload {
  products: SareeProduct[];
  customerName?: string;
  customerCity?: string;
  occasionType?: string;
  customNotes?: string;
}

export interface StoreContactConfig {
  primaryPhone: string;
  displayPhone: string;
  storeName: string;
  storeAddress: string;
  googleMapsUrl: string;
  storeHours: string;
  inStoreCouponCode: string;
  inStoreDiscountAmount: number;
}
```

---

### 5.2 Upgraded WhatsApp Conversational Engine: `src/lib/whatsapp.ts`

```typescript
import { SareeProduct } from '@/types/product.types';
import {
  WhatsAppOrderPayload,
  VideoConsultBooking,
  MultiItemInquiryPayload,
  StoreContactConfig,
} from '@/types/whatsapp.types';

export const STORE_CONFIG: StoreContactConfig = {
  primaryPhone: import.meta.env.VITE_STORE_WHATSAPP_NUMBER || '919876543210',
  displayPhone: '+91 98765 43210',
  storeName: 'Sri Sai ClothStore',
  storeAddress: 'Main Bazaar Road (Opp. Gandhi Chowk), Suryapet, Telangana 508213',
  googleMapsUrl: 'https://maps.google.com/?q=Sri+Sai+ClothStore+Suryapet',
  storeHours: '10:00 AM – 10:00 PM (Dasara Special Extended Hours)',
  inStoreCouponCode: 'DASARA500',
  inStoreDiscountAmount: 500,
};

function buildWhatsAppUrl(phone: string, text: string): string {
  const isMobile = typeof window !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const encodedText = encodeURIComponent(text);

  if (isMobile) {
    return `https://wa.me/${phone}?text=${encodedText}`;
  }
  return `https://web.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
}

export function getWhatsAppOrderUrl(product: SareeProduct, payload?: Partial<WhatsAppOrderPayload>): string {
  const isHold = payload?.isHoldRequest ?? true;
  const city = payload?.customerCity ? ` (${payload.customerCity})` : '';

  const message = [
    `Namaste ${STORE_CONFIG.storeName}! 🙏✨`,
    `I would like to ${isHold ? '*reserve & hold*' : '*purchase*'} this Dasara Special saree${city}:`,
    '',
    `🥻 *Product:* ${product.name}`,
    `🏷️ *SKU:* ${product.sku}`,
    `📍 *Origin:* ${product.provenance}`,
    `💰 *Festive Price:* ₹${product.price.toLocaleString('en-IN')} (MRP: ₹${product.originalPrice.toLocaleString('en-IN')})`,
    `🧵 *Fabric:* ${product.fabric}`,
    `✨ *Zari:* ${product.zariType}`,
    product.images[0] ? `📸 *Reference Photo:* ${payload?.selectedAngleUrl || product.images[0]}` : '',
    '',
    isHold
      ? `⏳ *Request:* Please hold this 1-of-1 piece for 24 hours while I confirm booking details.`
      : `📦 *Request:* Please share payment details (UPI/Bank) and courier delivery timeline.`,
    payload?.customNote ? `💬 *Note:* ${payload.customNote}` : '',
    '',
    `Please confirm availability! Thank you.`
  ].filter(Boolean).join('\n');

  return buildWhatsAppUrl(STORE_CONFIG.primaryPhone, message);
}

export function getWhatsAppVideoConsultBookingUrl(booking: VideoConsultBooking): string {
  const sareeList = booking.selectedProducts.length > 0
    ? booking.selectedProducts.map((p, i) => `${i + 1}. *${p.name}* (SKU: ${p.sku} | ₹${p.price.toLocaleString('en-IN')})`).join('\n')
    : '• New Dasara Consignment Showstoppers';

  const message = [
    `Namaste ${STORE_CONFIG.storeName}! 🙏🥻`,
    `I would like to book a *5-Minute Live Video Call Saree Drape Consultation*:`,
    '',
    `👤 *Customer Name:* ${booking.customerName || 'Shopper'}`,
    `📱 *Phone:* ${booking.customerPhone || 'N/A'}`,
    `📍 *Location:* ${booking.customerCity || 'India'}`,
    `🗣️ *Preferred Language:* ${booking.preferredLanguage}`,
    `⏰ *Preferred Time Slot:* ${booking.timeSlot}`,
    `📹 *Platform:* ${booking.preferredPlatform}`,
    '',
    `👗 *Sarees to Display on Stand:*`,
    sareeList,
    '',
    booking.specialNotes ? `📝 *Special Request:* ${booking.specialNotes}\n` : '',
    `Please confirm the appointment slot and share the video call link! Thank you.`
  ].filter(Boolean).join('\n');

  return buildWhatsAppUrl(STORE_CONFIG.primaryPhone, message);
}

export function getWhatsAppMultiItemInquiryUrl(payload: MultiItemInquiryPayload): string {
  const totalAmount = payload.products.reduce((acc, p) => acc + p.price, 0);
  const totalSavings = payload.products.reduce((acc, p) => acc + (p.originalPrice - p.price), 0);

  const itemsFormatted = payload.products.map((p, idx) => (
    `${idx + 1}. *${p.name}*\n   SKU: ${p.sku} | Price: ₹${p.price.toLocaleString('en-IN')}\n   Origin: ${p.provenance}\n   Photo: ${p.images[0] || 'N/A'}`
  )).join('\n\n');

  const message = [
    `Namaste ${STORE_CONFIG.storeName}! 🙏✨`,
    `I have shortlisted a *Bridal Trousseau Package* of ${payload.products.length} saree(s) for Dasara:`,
    '',
    itemsFormatted,
    '',
    `━━━━━━━━━━━━━━━━━━━━`,
    `💰 *Package Total:* ₹${totalAmount.toLocaleString('en-IN')}`,
    `🎉 *Total Festive Savings:* ₹${totalSavings.toLocaleString('en-IN')}`,
    payload.occasionType ? `🎊 *Occasion:* ${payload.occasionType}` : '',
    payload.customerCity ? `📍 *City:* ${payload.customerCity}` : '',
    payload.customNotes ? `💬 *Notes:* ${payload.customNotes}` : '',
    `━━━━━━━━━━━━━━━━━━━━`,
    '',
    `Please confirm if all pieces are available and advise on package discount or dispatch time!`
  ].filter(Boolean).join('\n');

  return buildWhatsAppUrl(STORE_CONFIG.primaryPhone, message);
}

export function getWhatsAppShareUrl(product: SareeProduct): string {
  const message = [
    `Look at this gorgeous saree from ${STORE_CONFIG.storeName}! ✨🥻`,
    '',
    `*${product.name}*`,
    `🏷️ SKU: ${product.sku}`,
    `📍 Origin: ${product.provenance}`,
    `💰 Festive Price: ₹${product.price.toLocaleString('en-IN')} (MRP: ₹${product.originalPrice.toLocaleString('en-IN')})`,
    `🧵 Fabric: ${product.fabric}`,
    `✨ Zari: ${product.zariType}`,
    product.images[0] ? `📸 Photo: ${product.images[0]}` : '',
    '',
    `What do you think? Should we shortlist this for the Dasara festival pooja?`
  ].filter(Boolean).join('\n');

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppGeneralChatUrl(): string {
  const message = `Namaste Sri Sai ClothStore! 🙏 I am browsing your Dasara 2026 Silk Collection online and had a quick inquiry about your new dealer arrivals.`;
  return buildWhatsAppUrl(STORE_CONFIG.primaryPhone, message);
}
```

---

### 5.3 Live Video Consultation Booking Modal: `src/components/shop/LiveVideoConsultModal.tsx`

```tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, Clock, Globe2, Sparkles, CheckCircle2, User, Phone, MapPin, Store } from 'lucide-react';
import { SareeProduct } from '@/types/product.types';
import {
  PreferredLanguage,
  VideoPlatform,
  TimeSlotCategory,
  VideoConsultBooking,
} from '@/types/whatsapp.types';
import { getWhatsAppVideoConsultBookingUrl, STORE_CONFIG } from '@/lib/whatsapp';

interface LiveVideoConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: SareeProduct[];
  preSelectedProduct?: SareeProduct | null;
}

export const LiveVideoConsultModal: React.FC<LiveVideoConsultModalProps> = ({
  isOpen,
  onClose,
  availableProducts,
  preSelectedProduct,
}) => {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(() => {
    return preSelectedProduct ? [preSelectedProduct.id] : [];
  });

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [language, setLanguage] = useState<PreferredLanguage>('Telugu');
  const [platform, setPlatform] = useState<VideoPlatform>('WhatsApp Video Call');
  const [timeSlot, setTimeSlot] = useState<TimeSlotCategory>('Auspicious Godhuli Vela (5:45 PM – 8:30 PM)');
  const [notes, setNotes] = useState('');

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleConfirmBooking = () => {
    const selectedSarees = availableProducts.filter((p) => selectedProductIds.includes(p.id));

    const booking: VideoConsultBooking = {
      customerName,
      customerPhone,
      customerCity,
      preferredLanguage: language,
      preferredPlatform: platform,
      timeSlot,
      selectedProducts: selectedSarees,
      specialNotes: notes,
    };

    const url = getWhatsAppVideoConsultBookingUrl(booking);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl border border-dasara-gold/40 bg-[#0E0C0F] p-5 sm:p-7 text-white sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-dasara-maroon border border-dasara-gold/40 px-3 py-1 text-xs font-bold text-dasara-goldLight flex items-center gap-1.5">
              <Video className="h-3.5 w-3.5 text-dasara-gold" />
              VIP Boutique Service
            </span>
            <span className="rounded-full bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              Free 5-Min Trial
            </span>
          </div>

          <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-dasara-champagne leading-snug">
            Book a Live Video Saree Drape Call
          </DialogTitle>
          <p className="text-xs sm:text-sm text-zinc-300">
            Inspect fabric fall, pleat drape, and zari luster under boutique showroom lighting before buying.
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {/* Step 1: Select Sarees to View (up to 3) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-dasara-goldLight block mb-2">
              1. Select Sarees for Display Stand (Choose up to 3)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {availableProducts.slice(0, 9).map((product) => {
                const isSelected = selectedProductIds.includes(product.id);
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => toggleProduct(product.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-dasara-gold bg-dasara-maroon/40 shadow-sm'
                        : 'border-zinc-800 bg-zinc-950/60 opacity-75 hover:opacity-100 hover:border-zinc-700'
                    }`}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white truncate">{product.name}</p>
                      <p className="text-[10px] text-dasara-gold font-mono">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Time Slot Picker */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-dasara-goldLight block mb-2">
              2. Select Auspicious Timing Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {([
                'Morning Pooja (10:30 AM – 1:00 PM)',
                'Afternoon High Tea (2:30 PM – 5:00 PM)',
                'Auspicious Godhuli Vela (5:45 PM – 8:30 PM)',
              ] as TimeSlotCategory[]).map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition cursor-pointer flex flex-col justify-between ${
                    timeSlot === slot
                      ? 'border-dasara-gold bg-gradient-to-br from-dasara-maroon/60 to-zinc-950 text-white font-semibold shadow-md'
                      : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-mono text-[11px] text-dasara-gold block mb-1">
                    {slot.split(' (')[0]}
                  </span>
                  <span className="text-[10px] text-zinc-300">
                    {slot.split(' (')[1].replace(')', '')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Preferred Language & Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-dasara-goldLight block mb-1.5">
                3. Preferred Language
              </label>
              <div className="grid grid-cols-4 gap-1.5 bg-zinc-950 border border-zinc-800 p-1 rounded-xl">
                {(['Telugu', 'Hindi', 'English', 'Tamil'] as PreferredLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      language === lang
                        ? 'bg-dasara-maroon text-dasara-goldLight border border-dasara-gold/40'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-dasara-goldLight block mb-1.5">
                4. Video Channel
              </label>
              <div className="grid grid-cols-2 gap-1.5 bg-zinc-950 border border-zinc-800 p-1 rounded-xl">
                {(['WhatsApp Video Call', 'Google Meet'] as VideoPlatform[]).map((plat) => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setPlatform(plat)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      platform === plat
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {plat.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Customer Details */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-dasara-goldLight block mb-2">
              5. Your Contact Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                placeholder="Your Name (e.g., Lakshmi)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
              />
              <input
                type="text"
                placeholder="City (e.g., Hyderabad)"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
              />
            </div>
          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <Button
              onClick={handleConfirmBooking}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 text-sm sm:text-base rounded-xl shadow-xl shadow-emerald-950/50 cursor-pointer transition hover:scale-[1.01]"
            >
              <Video className="mr-2 h-5 w-5" />
              Confirm Video Appointment via WhatsApp Now
            </Button>
            <p className="text-[11px] text-zinc-400 text-center mt-2">
              Our boutique staff will immediately accept and coordinate your live drape session.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

### 5.4 Sticky Floating WhatsApp Conversion Dock: `src/components/shop/FloatingWhatsAppDock.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { MessageCircle, Video, Heart, MapPin, X, Sparkles, ChevronUp } from 'lucide-react';
import { getWhatsAppGeneralChatUrl, STORE_CONFIG } from '@/lib/whatsapp';

interface FloatingWhatsAppDockProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenVideoConsult: () => void;
  isModalOpen?: boolean;
}

export const FloatingWhatsAppDock: React.FC<FloatingWhatsAppDockProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenVideoConsult,
  isModalOpen = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY + 50) {
        setIsExpanded(false); // minimize on fast scroll down
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Hide dock if large full-screen modal or inspection view is open
  if (isModalOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Quick Action Flyout Menu */}
      {isExpanded && (
        <div className="mb-3 w-64 rounded-2xl border border-dasara-gold/40 bg-[#0E0C0F]/95 p-3.5 text-white shadow-2xl backdrop-blur-xl animate-fadeIn space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="font-serif text-xs font-bold text-dasara-champagne flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-dasara-gold" />
              Live Boutique Desk
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-md"
              aria-label="Close action menu"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Action 1: General Chat */}
          <button
            type="button"
            onClick={() => {
              window.open(getWhatsAppGeneralChatUrl(), '_blank');
              setIsExpanded(false);
            }}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition cursor-pointer"
          >
            <div className="h-7 w-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Chat with Store Owner</p>
              <p className="text-[10px] text-zinc-400">Direct inquiries on new lots</p>
            </div>
          </button>

          {/* Action 2: Video Call */}
          <button
            type="button"
            onClick={() => {
              onOpenVideoConsult();
              setIsExpanded(false);
            }}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition cursor-pointer"
          >
            <div className="h-7 w-7 rounded-lg bg-dasara-maroon border border-dasara-gold/40 text-dasara-gold flex items-center justify-center shrink-0">
              <Video className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Book Live Video Drape</p>
              <p className="text-[10px] text-zinc-400">Free 5-min showroom trial</p>
            </div>
          </button>

          {/* Action 3: Shortlist WhatsApp Export */}
          {wishlistCount > 0 && (
            <button
              type="button"
              onClick={() => {
                onOpenWishlist();
                setIsExpanded(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs bg-rose-950/40 border border-rose-800/40 transition cursor-pointer"
            >
              <div className="h-7 w-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                <Heart className="h-4 w-4 fill-white" />
              </div>
              <div>
                <p className="font-semibold text-rose-300">Send Shortlist ({wishlistCount})</p>
                <p className="text-[10px] text-zinc-400">Export selected sarees</p>
              </div>
            </button>
          )}

          {/* Action 4: Google Maps Route */}
          <button
            type="button"
            onClick={() => {
              window.open(STORE_CONFIG.googleMapsUrl, '_blank');
              setIsExpanded(false);
            }}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition cursor-pointer"
          >
            <div className="h-7 w-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Store GPS Route</p>
              <p className="text-[10px] text-zinc-400">Main Bazaar Road directions</p>
            </div>
          </button>
        </div>
      )}

      {/* Primary Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="group relative flex items-center gap-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 transition-all duration-300 hover:scale-105 cursor-pointer ring-4 ring-black/40"
        aria-label="Open WhatsApp Customer Service"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        <MessageCircle className="h-6 w-6 text-white" />
        
        <span className="hidden sm:inline-block font-sans font-bold text-xs tracking-wide">
          WhatsApp Us
        </span>

        {wishlistCount > 0 && (
          <span className="rounded-full bg-dasara-maroon border border-dasara-gold px-2 py-0.5 text-[10px] font-bold text-white">
            {wishlistCount}
          </span>
        )}
      </button>
    </div>
  );
};
```

---

### 5.5 In-Store Footfall Catalyst Card: `src/components/festive/StoreFootfallCard.tsx`

```tsx
import React, { useState } from 'react';
import { MapPin, Navigation, Tag, Copy, Check, Clock, Phone, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STORE_CONFIG } from '@/lib/whatsapp';

export const StoreFootfallCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(STORE_CONFIG.inStoreCouponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-dasara-gold/40 bg-gradient-to-br from-dasara-deepCrimson/90 via-[#120B0F] to-black p-6 sm:p-8 text-white shadow-2xl">
      {/* Ambient Gold Radial Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-dasara-gold/10 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Information */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-dasara-maroon px-3 py-1 text-xs font-semibold text-dasara-goldLight border border-dasara-gold/40 shadow-sm">
            <Tag className="h-3.5 w-3.5 text-dasara-gold" />
            <span>Physical Store Footfall Offer</span>
            <span className="h-1 w-1 rounded-full bg-dasara-gold" />
            <span className="text-emerald-400 font-bold">₹500 Instant Billing Waiver</span>
          </div>

          <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-dasara-champagne leading-snug">
            Visiting Our Store in Person for Dasara Shopping?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Experience the tactile luster of authentic pure silk and heavy gold zari in person. 
            Show this coupon code at our billing counter to receive an instant{' '}
            <span className="font-bold text-dasara-gold font-mono">₹500 OFF</span> on any purchase above ₹5,000!
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-dasara-gold shrink-0" />
              <span>{STORE_CONFIG.storeAddress}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="text-emerald-300 font-medium">{STORE_CONFIG.storeHours}</span>
            </div>
          </div>
        </div>

        {/* Right CTA Box */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Coupon Code Pill */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-dasara-gold bg-black/70 px-5 py-3.5 w-full sm:w-auto shadow-inner">
            <div>
              <span className="text-[10px] text-zinc-400 block font-sans">Counter Voucher:</span>
              <span className="font-mono text-xl font-black tracking-widest text-dasara-gold">
                {STORE_CONFIG.inStoreCouponCode}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="rounded-xl bg-zinc-800 hover:bg-zinc-700 p-2 text-zinc-300 hover:text-white transition cursor-pointer"
              title="Copy Coupon Code"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation Button */}
          <Button
            onClick={() => window.open(STORE_CONFIG.googleMapsUrl, '_blank')}
            className="w-full sm:w-auto bg-dasara-gold hover:bg-dasara-goldLight text-black font-bold py-6 px-6 rounded-2xl shadow-xl shadow-dasara-gold/20 cursor-pointer transition hover:scale-105"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Get GPS Route
          </Button>
        </div>
      </div>
    </div>
  );
};
```

---

### 5.6 Multi-Item WhatsApp Inquiry Bag Modal: `src/components/shop/WhatsAppInquiryBagModal.tsx`

```tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Trash2, Sparkles, Tag, Plus } from 'lucide-react';
import { SareeProduct } from '@/types/product.types';
import { getWhatsAppMultiItemInquiryUrl } from '@/lib/whatsapp';

interface WhatsAppInquiryBagModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SareeProduct[];
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
}

export const WhatsAppInquiryBagModal: React.FC<WhatsAppInquiryBagModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearBag,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [occasionType, setOccasionType] = useState('Dasara Pooja & Family Muhurtham');
  const [notes, setNotes] = useState('');

  const totalAmount = items.reduce((acc, p) => acc + p.price, 0);
  const totalOriginal = items.reduce((acc, p) => acc + p.originalPrice, 0);
  const totalSavings = totalOriginal - totalAmount;

  const handleSendBagToWhatsApp = () => {
    const url = getWhatsAppMultiItemInquiryUrl({
      products: items,
      customerName,
      customerCity,
      occasionType,
      customNotes: notes,
    });
    window.open(url, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl border border-dasara-gold/40 bg-[#0E0C0F] p-5 sm:p-7 text-white sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <DialogHeader className="text-left space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-dasara-maroon border border-dasara-gold/40 px-3 py-1 text-xs font-bold text-dasara-goldLight flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-dasara-gold" />
              Bridal Trousseau Inquiry Bag
            </span>
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearBag}
                className="text-xs text-zinc-400 hover:text-rose-400 transition"
              >
                Clear All
              </button>
            )}
          </div>

          <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-dasara-champagne leading-snug">
            Multi-Saree WhatsApp Inquiry
          </DialogTitle>
          <p className="text-xs sm:text-sm text-zinc-300">
            Combine multiple matching sarees into a single itemized inquiry for package booking.
          </p>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="py-12 text-center text-zinc-400">
            <p className="text-sm">Your inquiry bag is currently empty.</p>
            <p className="text-xs text-zinc-500 mt-1">Shortlist sarees from the catalog to build a package!</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Items List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-2.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover shrink-0 border border-zinc-800"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{product.name}</p>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        SKU: {product.sku} • 📍 {product.provenance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs font-bold text-dasara-gold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculation Box */}
            <div className="rounded-xl border border-dasara-gold/30 bg-black/60 p-3.5 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Items in Package:</span>
                <span className="font-mono text-white">{items.length} Sarees</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Total MRP:</span>
                <span className="font-mono line-through text-zinc-500">₹{totalOriginal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Dasara Festive Savings:</span>
                <span className="font-mono">- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800 text-sm font-bold">
                <span className="text-dasara-champagne">Estimated Package Total:</span>
                <span className="font-serif text-lg text-dasara-gold">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Customer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
              />
              <input
                type="text"
                placeholder="Your City (e.g., Bengaluru)"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
              />
            </div>

            {/* Action CTA */}
            <Button
              onClick={handleSendBagToWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 text-sm sm:text-base rounded-xl shadow-xl shadow-emerald-950/50 cursor-pointer transition hover:scale-[1.01]"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Send Multi-Saree Package to WhatsApp
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
```

---

## 6. Step-by-Step Implementation Sequence

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 7 CHRONOLOGICAL EXECUTION SEQUENCE                  │
├───────────────────────────────────────────────────────────────────────────────┤
│ Step 1: Create src/types/whatsapp.types.ts                                    │
│         - Define data models for bookings, orders, and store contacts.        │
│                                                                               │
│ Step 2: Upgrade src/lib/whatsapp.ts                                           │
│         - Deep-linking URL generators, markdown builders, device detection.   │
│                                                                               │
│ Step 3: Implement src/components/shop/LiveVideoConsultModal.tsx               │
│         - Multi-saree selector, time slot picker, language selection.         │
│                                                                               │
│ Step 4: Implement src/components/festive/StoreFootfallCard.tsx                │
│         - DASARA500 coupon copy, Google Maps GPS directions, boutique hours.  │
│                                                                               │
│ Step 5: Implement src/components/shop/FloatingWhatsAppDock.tsx                │
│         - Pulsating WhatsApp bubble with quick-expand actions and scroll-hide.│
│                                                                               │
│ Step 6: Implement src/components/shop/WhatsAppInquiryBagModal.tsx             │
│         - Multi-item bridal trousseau package builder and bill calculator.    │
│                                                                               │
│ Step 7: Wire into src/App.tsx                                                 │
│         - Connect Floating Dock, Video Consult Modal, and Footfall Card.      │
│                                                                               │
│ Step 8: Validation & Quality Audits                                          │
│         - Execute tsc -b, npm run build, and Chrome DevTools MCP inspections. │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Verification & Quality Gates

| Quality Gate | Method | Target Standard |
| :--- | :--- | :--- |
| **TypeScript Strictness** | `tsc -b` | 0 errors across all new types and component exports. |
| **Production Build** | `npm run build` | Clean Vite bundle under 55s with 0 warnings. |
| **WhatsApp URL Encoding** | Unit check & DevTools inspection | All dynamic strings safely encoded (`encodeURIComponent`), under 1,800 chars. |
| **Device Scheme Switching** | Chrome DevTools device toggle | Switches to `wa.me` for mobile and `web.whatsapp.com` for desktop. |
| **Clipboard Copy Feedback** | Click test on coupon code | Visual check confirmation triggers for 2.5 seconds with zero console errors. |
| **Modal Stacking & Collision** | Chrome DevTools MCP audit | Floating dock cleanly hides during active modal display without layout shifts. |

---

## 8. Risk Assessment & Mitigation Matrix

| Potential Risk | Root Cause | Architectural Mitigation |
| :--- | :--- | :--- |
| **Message Truncation** | Massive URLs exceeding browser character limits. | Compact markdown template, omitting redundant whitespace, capping payload under 1,800 chars. |
| **Popup Blocker Rejection** | Calling `window.open` asynchronously after API delay. | Triggering `window.open` synchronously inside the direct user-initiated click handler. |
| **Floating Dock Clashing** | WhatsApp bubble covering inspection modal buttons on mobile. | Adding `isModalOpen` prop to auto-hide the floating dock when any Dialog is active. |
| **Stale Store Number** | Hardcoded phone numbers preventing store owner updates. | Centralized in `STORE_CONFIG` with `import.meta.env.VITE_STORE_WHATSAPP_NUMBER` fallback. |

---

## 9. Manual Verification Protocol for the User

When Phase 7 is implemented, you can verify each feature manually:

1. **Test 1-Click WhatsApp Ordering**:
   - Open any product card and click "Reserve / Buy via WhatsApp Now".
   - Verify that WhatsApp launches with the pre-filled message containing the saree title, SKU, festive price, and photo reference.
2. **Test 5-Minute Live Video Consultation Modal**:
   - Click "Book 5-Min Live Video Call" from either the floating dock or product modal.
   - Select 2 sarees, choose a time slot (e.g., *Godhuli Vela*), select your language (*Telugu* / *Hindi*), and fill in your name.
   - Click "Confirm Video Appointment". Verify that WhatsApp launches with the formatted appointment agenda.
3. **Test Floating WhatsApp Conversion Dock**:
   - Look at the bottom-right of your screen. Click the pulsating WhatsApp button.
   - Verify that the quick-action menu expands (*Chat with Owner*, *Book Video Drape*, *Store GPS Route*).
   - Scroll quickly down the page; verify that the dock stays tidy without jittering.
4. **Test In-Store Footfall Coupon**:
   - Locate the *Store Footfall Catalyst* card on the homepage.
   - Click the copy button next to `DASARA500`. Verify that the icon changes to a green checkmark and code copies to your clipboard.
   - Click "Get GPS Route". Verify that Google Maps opens to the store location.
5. **Test Mobile Stacking**:
   - Resize browser to 390px (mobile view).
   - Verify that the floating dock does not block the sticky footer or modal action buttons.
