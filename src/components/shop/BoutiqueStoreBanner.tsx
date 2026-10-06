import React, { useState } from 'react';
import { Store, MapPin, Clock, Copy, Check, Ticket, Sparkles, Navigation } from 'lucide-react';
import { STORE_CONFIG } from '@/lib/whatsapp';

export const BoutiqueStoreBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('DASARA500');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-dasara-gold/40 bg-gradient-to-br from-dasara-deepCrimson/90 via-[#181116] to-[#0E0C0F] p-6 sm:p-10 shadow-2xl">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-dasara-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-dasara-maroon/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-dasara-maroon/90 border border-dasara-gold/40 px-3.5 py-1 text-xs font-semibold text-dasara-goldLight shadow-md">
            <Store className="h-3.5 w-3.5 text-dasara-gold" />
            <span>Sri Sai ClothStore Physical Boutique</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Touch & Feel the Pure Silk Drape{' '}
            <span className="block gold-gradient-text mt-0.5">
              Experience the Loom in Person
            </span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Every saree in our digital showcase is physically displayed in our boutique. Visit us with your family to experience the pure 3-ply zari luster, authentic Silk Mark weave certifications, and personalized saree draping sessions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-300">
            <div className="flex items-center gap-2.5 rounded-xl bg-black/60 border border-dasara-gold/20 p-3">
              <Clock className="h-4 w-4 text-dasara-gold shrink-0" />
              <div>
                <span className="font-bold text-white block">Festive Timings</span>
                <span className="text-zinc-400">10:00 AM – 9:30 PM (All 10 Days)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-black/60 border border-dasara-gold/20 p-3">
              <MapPin className="h-4 w-4 text-dasara-gold shrink-0" />
              <div>
                <span className="font-bold text-white block">Boutique Flagship</span>
                <span className="text-zinc-400">Main Bazaar, Silk Weaver Enclave</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Voucher Card Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm rounded-2xl border-2 border-dashed border-dasara-gold/50 bg-black/70 p-6 backdrop-blur-md shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-1.5 text-dasara-gold font-serif font-bold text-sm">
                <Ticket className="h-4 w-4" />
                <span>IN-STORE VIP PASS</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Dasara Special
              </span>
            </div>

            <div className="py-4 text-center space-y-1">
              <span className="text-xs text-zinc-400 block font-medium">Extra Billing Discount</span>
              <div className="font-serif text-3xl font-black text-dasara-goldLight">
                ₹500 OFF
              </div>
              <p className="text-[11px] text-zinc-400">
                Show this digital pass at the boutique counter on purchases above ₹5,000
              </p>
            </div>

            {/* Voucher Code Box */}
            <div className="flex items-center justify-between bg-zinc-900/90 rounded-xl border border-dasara-gold/40 px-3.5 py-2.5">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-mono">Coupon Code</span>
                <span className="font-mono text-base font-black text-white tracking-widest">DASARA500</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 rounded-lg bg-dasara-maroon px-3 py-1.5 text-xs font-semibold text-dasara-goldLight hover:bg-dasara-maroon/80 transition cursor-pointer"
              >
                {copied ? (
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
            {/* Direction Button */}
            <button
              onClick={() => window.open(STORE_CONFIG.googleMapsUrl, '_blank')}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-dasara-maroon to-dasara-deepCrimson border border-dasara-gold/60 py-2.5 text-xs font-bold text-white hover:brightness-110 transition shadow-lg shadow-dasara-maroon/40 cursor-pointer"
            >
              <Navigation className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Get Boutique Directions on Google Maps</span>
              <Sparkles className="h-3 w-3 text-dasara-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
