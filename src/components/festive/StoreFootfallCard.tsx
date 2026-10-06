import React, { useState } from 'react';
import { MapPin, Navigation, Tag, Copy, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STORE_CONFIG } from '@/lib/whatsapp';

export const StoreFootfallCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(STORE_CONFIG.inStoreCouponCode);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = STORE_CONFIG.inStoreCouponCode;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback feedback even if browser restricts programmatic clipboard access
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-dasara-gold/40 bg-gradient-to-br from-dasara-deepCrimson/90 via-[#120B0F] to-black p-6 sm:p-8 text-white shadow-2xl">
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
              aria-label="Copy Coupon Code"
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
    </section>
  );
};
