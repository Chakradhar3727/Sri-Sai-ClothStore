# Sri Sai ClothStore (శ్రీ సాయి క్లాత్ స్టోర్) 🥻✨

A luxury, mobile-first boutique e-commerce web application for **Sri Sai ClothStore** (Mahadevpur, Telangana). Built for the grand festive season with real-time inventory management, multi-angle saree photography, WhatsApp direct checkout, live video shopping inquiries, and an admin operations hub.

---

## 🌟 Key Features

### 🛍️ Customer Experience (Storefront)
- **Mobile-First Responsive Design**: Optimized specifically for smartphone shoppers in Telangana with smooth touch navigation and bilingual Telugu/English labeling.
- **Unique Pieces Available (ప్రత్యేక చీరలు)**: Spotlight section at the top featuring exclusive single-piece (1-of-1) sarees.
- **Multi-Angle Loupe & Gallery**: Inspect sarees from multiple angles (Front Drape, Pallu/Zari, Side Border, Opened Saree, Blouse).
- **Direct WhatsApp Commerce**:
  - One-tap purchase inquiry with pre-filled saree details (SKU, price, photo link).
  - Shortlist & Wishlist Drawer with single-tap bundle inquiry.
  - 5-Minute Live Video Call saree trial booking.
- **Live Festive Banner & In-Store Pass**: Official Dasara festive specials banner and `DASARA500` in-store voucher code.
- **Google Maps Integration**: Direct navigation link to the flagship store in Mahadevpur.

### 🛡️ Admin Operations Hub (Secured Portal)
- **Role-Based Admin Authentication**: Secured via Supabase Auth.
- **On-The-Fly Mobile Camera Capture & Multi-Angle Upload**: Snap photos of sarees directly from smartphone camera or device gallery, auto-compressed and uploaded to Supabase Storage.
- **Live Inventory CRUD**: Add, edit, or delete saree consignments in real-time with instant UI feedback and database persistence.
- **Stock Available Stepper**: Manage physical piece counts with 1-tap quick presets (`0 (Sold Out)`, `1 (Single Piece)`, `2`, `3`, `5`, `10`).
- **Showstopper Spotlight Control**: Star-mark sarees to automatically feature them at the top of the storefront.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI Primitives, Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Supabase Storage, Realtime WebSockets)
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/Saisrikar-Kokku/Sri-Sai-ClothStore.git
cd Sri-Sai-ClothStore
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STORE_WHATSAPP_NUMBER=918500581272
VITE_STORE_NAME="Sri Sai ClothStore"
```

### 4. Development Server
```bash
npm run dev
```

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com/new), click **"Add New Project"** and select **`Sri-Sai-ClothStore`**.
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `VITE_STORE_WHATSAPP_NUMBER`: `918500581272`
   - `VITE_STORE_NAME`: `Sri Sai ClothStore`
4. Click **Deploy**. The `vercel.json` included in this repository will handle single-page app routing automatically.

---

## 📍 Store Location & Contact
- **Address**: Sri Sai ClothStore, Near Pathangadi Bazaar, Mahadevpur, Telangana
- **WhatsApp / Phone**: +91 8500581272
- **Maps**: [Google Maps Location](https://maps.app.goo.gl/LFGRZcLxPDVP2j9A7)
