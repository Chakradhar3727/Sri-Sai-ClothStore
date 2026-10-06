import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  ZoomIn, 
  X, 
  ChevronDown, 
  Copy, 
  Check, 
  ShoppingBag, 
  MessageCircle,
  Store,
  Tag,
  ShieldCheck,
  Clock,
  Navigation
} from 'lucide-react';

import { STORE_CONFIG, buildWhatsAppUrl } from '@/lib/whatsapp';

interface HeroFestiveBannerProps {
  onExploreCatalog?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const HeroFestiveBanner: React.FC<HeroFestiveBannerProps> = ({ 
  onExploreCatalog,
  onSelectCategory 
}) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  const bannerImagePath = '/images/sri_sai_dasara_banner.jpg';

  const handleCopyVoucher = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('DASARA500');
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2200);
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message =
      'Namaste Sri Sai ClothStore! 🙏 I saw your official Dasara Specials banner (Mahadevpur Near Pathangadi Bazaar) and would like to inquire about your new festive arrivals!';
    window.open(buildWhatsAppUrl(STORE_CONFIG.primaryPhone, message), '_blank');
  };

  const handleOpenMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(STORE_CONFIG.googleMapsUrl, '_blank');
  };

  const scrollToCatalog = () => {
    if (onExploreCatalog) {
      onExploreCatalog();
    } else {
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const flyerCategories = [
    { label: 'Sarees', sub: 'Mysore Silk & Pattu' },
    { label: 'Blouse Pieces', sub: 'All Designs' },
    { label: 'Half Sarees', sub: 'Trendy & Traditional' },
    { label: 'Kids Wear', sub: 'Little Fashion' },
    { label: 'Fancy & Ethnic', sub: 'Stylish Wear' },
    { label: 'Daily Wear', sub: 'Comfort Everyday' },
    { label: 'Cosmetics', sub: 'Branded & Affordable' },
    { label: 'Bangles & Jewellery', sub: 'Earrings & Sets' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-dasara-gold/30 bg-gradient-to-b from-[#180C14] via-[#0E0C0F] to-[#0E0C0F]">
      {/* 1. Ambient Blurred Backdrop Glow matching authentic banner colors */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl scale-110 pointer-events-none transform -translate-y-6"
        style={{ backgroundImage: `url(${bannerImagePath})` }}
      />
      <div className="absolute inset-0 bg-radial-gradient from-dasara-maroon/20 via-transparent to-[#0E0C0F] pointer-events-none" />

      {/* 2. Top Header Ribbon - Snug wrap with the sticky navbar above */}
      <div className="relative z-10 border-b border-dasara-gold/15 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-dasara-goldLight font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-serif font-bold text-white tracking-wide">
              Sri Sai Cloth Store Flagship
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300">Mahadevpur, Near Pathangadi Bazaar</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="rounded-full bg-dasara-maroon/90 border border-dasara-gold/50 px-3 py-0.5 font-bold text-dasara-goldLight shadow-sm">
              ✨ Dasara Specials Ready to Sale!
            </span>
            <span className="hidden md:inline text-zinc-400">
              Special Offers & Attractive Festival Discounts
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Showcase Wrapper - Dual Column on Desktop, Seamless Stack on Mobile */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-5 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Framed Authentic Boutique Flyer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group w-full max-w-[320px] sm:max-w-sm lg:max-w-[360px] transition-all duration-300">
              
              {/* Luminous Gold Halo Aura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-dasara-maroon via-dasara-gold/40 to-dasara-deepCrimson opacity-70 blur-xl group-hover:opacity-100 transition duration-500" />

              {/* Framed Flyer Card */}
              <div 
                onClick={() => setIsZoomOpen(true)}
                className="relative rounded-2xl overflow-hidden border-2 border-dasara-gold/70 bg-[#0E0C0F] shadow-2xl shadow-dasara-maroon/60 cursor-pointer select-none group"
                title="Click to view full-resolution official flyer"
              >
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-dasara-gold to-transparent z-20" />

                {/* Authentic Flyer Image */}
                <img
                  src={bannerImagePath}
                  alt="Sri Sai Cloth Store - Official Dasara Specials Festival Arrivals Flyer"
                  className="w-full h-auto max-h-[480px] lg:max-h-[510px] object-contain mx-auto block transition-transform duration-500 group-hover:scale-[1.015]"
                  loading="eager"
                />

                {/* Interactive Zoom Hover Pill */}
                <div className="absolute bottom-2.5 inset-x-2.5 z-20 flex justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomOpen(true);
                    }}
                    className="flex items-center gap-1.5 rounded-full bg-black/85 hover:bg-dasara-maroon border border-dasara-gold/70 px-3.5 py-1.5 text-xs font-semibold text-dasara-goldLight backdrop-blur-md shadow-xl transition-all duration-200"
                  >
                    <ZoomIn className="h-3.5 w-3.5 text-dasara-gold" />
                    <span>Click to Enlarge Official Flyer</span>
                  </button>
                </div>
              </div>

              {/* Address Micro-Bar beneath poster */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                <MapPin className="h-3.5 w-3.5 text-dasara-gold shrink-0" />
                <span>Sri Sai Cloth Store | Mahadevpur Near Pathangadi Bazaar</span>
              </div>
            </div>
          </div>

          {/* Right Column: Boutique Welcome, Highlights & Direct Action Controls */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {/* Header Title & Tagline matching the flyer */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-dasara-maroon/90 border border-dasara-gold/50 px-4 py-1 text-xs font-semibold text-dasara-goldLight shadow-md">
                <Sparkles className="h-3.5 w-3.5 text-dasara-gold animate-spin" style={{ animationDuration: '6s' }} />
                <span>Celebrate Festivals with Tradition & Grace</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Sri Sai Cloth Store <br />
                <span className="text-dasara-gold font-serif italic text-2xl sm:text-3xl lg:text-4xl font-normal">
                  Tradition • Style • For Every You
                </span>
              </h1>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
                Your one-stop boutique for all women's festive needs! Fresh <strong className="text-white">Dasara Specials & Festival Arrivals</strong> have arrived directly from artisan weaver hubs. Ready to sale at direct wholesale & reasonable prices in Mahadevpur.
              </p>
            </div>

            {/* Flyer Categories Grid */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-serif font-bold text-dasara-goldLight uppercase tracking-wider text-[11px]">
                  ✨ Available Festival Collections
                </span>
                <span className="text-[10px] text-zinc-500">All Colours & Falls Available</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {flyerCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.label);
                      scrollToCatalog();
                    }}
                    className="flex flex-col rounded-xl bg-black/60 hover:bg-zinc-900 border border-dasara-gold/25 hover:border-dasara-gold/60 p-2.5 cursor-pointer transition shadow-sm group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-dasara-gold transition">
                      {cat.label}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {cat.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              {/* Explore Collection Button */}
              <button
                type="button"
                onClick={scrollToCatalog}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-dasara-maroon via-dasara-deepCrimson to-dasara-maroon border border-dasara-gold px-5 py-3 text-sm font-bold text-white shadow-xl shadow-dasara-maroon/50 hover:brightness-110 transition cursor-pointer w-full sm:w-auto"
              >
                <ShoppingBag className="h-4 w-4 text-dasara-gold" />
                <span>Explore Saree Collection</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Direct WhatsApp Concierge */}
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 px-4 py-3 text-sm font-semibold text-emerald-300 transition cursor-pointer shadow-md w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp Store Inquiry</span>
              </button>

              {/* Directions Button */}
              <button
                type="button"
                onClick={handleOpenMaps}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black/70 hover:bg-zinc-900 border border-dasara-gold/40 px-4 py-3 text-sm font-semibold text-dasara-goldLight transition cursor-pointer shadow-md w-full sm:w-auto"
              >
                <Navigation className="h-4 w-4 text-dasara-gold" />
                <span>Mahadevpur Location</span>
              </button>
            </div>

            {/* In-Store Coupon & Assurances Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Coupon Box */}
              <div className="flex items-center justify-between rounded-xl bg-zinc-950/90 border border-dasara-gold/40 p-3 shadow-md">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block">
                    In-Store Voucher Pass
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-black text-white tracking-widest">
                      DASARA500
                    </span>
                    <span className="text-[10px] text-amber-400 font-semibold">
                      (₹500 OFF)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyVoucher}
                  className="flex items-center gap-1 rounded-lg bg-dasara-maroon px-2.5 py-1.5 text-xs font-semibold text-dasara-goldLight hover:bg-dasara-maroon/80 transition cursor-pointer"
                >
                  {copiedVoucher ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Boutique Hours & Trial */}
              <div className="flex items-center gap-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800 p-3 shadow-md">
                <Clock className="h-4 w-4 text-dasara-gold shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Daily Festive Hours</span>
                  <span className="text-zinc-400 text-[11px]">10:00 AM – 9:30 PM (All 10 Days)</span>
                </div>
              </div>
            </div>

            {/* Key Value Badges matching the flyer's footer */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-[11px] text-zinc-300">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 border border-emerald-500/30 px-3 py-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Best Quality Products</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 border border-dasara-gold/30 px-3 py-1.5 text-dasara-goldLight font-medium">
                <Store className="h-3.5 w-3.5 text-dasara-gold" />
                <span>Special Navaratri Sarees</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 border border-amber-500/30 px-3 py-1.5 text-amber-300 font-medium">
                <Tag className="h-3.5 w-3.5" />
                <span>Wholesale & Reasonable Prices</span>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* 4. Fullscreen High-Resolution Lightbox Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-2 sm:p-6"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 border border-dasara-gold/50 text-white hover:text-dasara-gold hover:scale-105 transition shadow-2xl cursor-pointer"
            aria-label="Close flyer preview"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Content */}
          <div 
            className="relative max-w-2xl max-h-[92vh] w-full flex flex-col items-center overflow-auto rounded-2xl border-2 border-dasara-gold/70 bg-[#0E0C0F] p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={bannerImagePath}
              alt="Sri Sai Cloth Store Dasara Specials High-Resolution Flyer"
              className="w-full h-auto object-contain rounded-xl"
            />

            {/* Modal Bottom Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-950/90 rounded-b-xl border-t border-zinc-800 text-xs">
              <div className="flex items-center gap-2 text-dasara-goldLight font-serif">
                <Store className="h-4 w-4 text-dasara-gold" />
                <span>Sri Sai Cloth Store • Mahadevpur Near Pathangadi Bazaar</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 text-xs transition"
                >
                  WhatsApp Inquiries
                </button>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 text-xs transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
