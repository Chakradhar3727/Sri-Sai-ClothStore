import React, { useState } from 'react';
import { SareeProduct } from '@/types/product.types';
import { MessageCircle, ShieldCheck, MapPin, Eye, Clock, Sparkles, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getWhatsAppOrderUrl } from '@/lib/whatsapp';
import { TiltedCard } from '@/components/reactbits/TiltedCard';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';

interface Props {
  product: SareeProduct;
  onQuickView: (product: SareeProduct) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: SareeProduct) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  onQuickView,
  isWishlisted: externalIsWishlisted,
  onToggleWishlist,
}) => {
  const [internalWishlisted, setInternalWishlisted] = useState(false);
  const isWishlisted = externalIsWishlisted !== undefined ? externalIsWishlisted : internalWishlisted;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (externalIsWishlisted === undefined) {
      setInternalWishlisted((prev) => !prev);
    }
    onToggleWishlist?.(product);
  };

  return (
    <TiltedCard maxTilt={5} scale={1.02} glareOpacity={0.2} className="h-full">
      <SpotlightCard
        spotlightColor="rgba(212, 175, 55, 0.22)"
        className="festive-glass-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-dasara-gold/25 shadow-xl transition-all duration-300 hover:border-dasara-gold/60"
      >
        {/* 1. Saree Image Frame */}
        <div
          onClick={() => onQuickView(product)}
          className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950 cursor-pointer select-none"
        >
          {/* Base Saree Image */}
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
            loading="lazy"
          />

          {/* Dual-Angle Hover Image Cross-Fade (Pallu / Border Detail) */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} - Pallu & Border Detail`}
              className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              loading="lazy"
            />
          )}

          {/* Ambient Dark Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0F] via-transparent to-black/35 opacity-75 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

          {/* Minimalist Floating Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20">
            {/* Top-left: Frosted glass pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-dasara-champagne/90 shadow-sm pointer-events-none">
              {product.isDealerUnique ? (
                <>
                  <Sparkles className="h-3 w-3 text-dasara-gold shrink-0" />
                  <span>Single Piece • ఒక్కటే పీస్</span>
                </>
              ) : (
                <span>{product.category}</span>
              )}
            </div>

            {/* Top-right: Floating heart button for Wishlist/bookmarking */}
            <button
              type="button"
              onClick={handleHeartClick}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={cn(
                'group/heart relative flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer pointer-events-auto',
                'bg-black/40 border border-white/10 hover:border-dasara-gold/40 hover:bg-black/60',
                'active:scale-75 hover:scale-110',
                isWishlisted && 'border-rose-500/40 bg-black/70 text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
              )}
            >
              <Heart
                className={cn(
                  'h-4 w-4 transition-all duration-300',
                  isWishlisted
                    ? 'fill-rose-500 text-rose-500 scale-110'
                    : 'text-zinc-300 group-hover/heart:text-white'
                )}
              />
            </button>
          </div>

          {/* Pallu Peek Badge on Hover */}
          {product.images[1] && (
            <div className="absolute top-12 right-3 pointer-events-none opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-10">
              <span className="rounded-full backdrop-blur-md bg-black/60 border border-white/10 px-2 py-0.5 text-[9px] font-mono tracking-wider text-dasara-goldLight">
                PALLU VIEW
              </span>
            </div>
          )}

          {/* Bottom Translucent Badges: Provenance and Silk Mark */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/10 px-2.5 py-0.5 text-[11px] text-zinc-300 font-normal">
              <MapPin className="h-2.5 w-2.5 text-dasara-gold shrink-0" />
              <span>{product.provenance.split(',')[0]}</span>
            </span>

            {product.isSilkMarkCertified && (
              <span className="inline-flex items-center gap-1 rounded-full backdrop-blur-md bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>Silk Mark</span>
              </span>
            )}
          </div>

          {/* Quick View Hover Button (Overlay) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{ transform: 'translateZ(30px)' }}
              className="inline-flex items-center gap-2 rounded-full backdrop-blur-md bg-black/70 border border-dasara-gold/50 px-4 py-2 text-xs font-semibold text-dasara-champagne shadow-2xl transition-all duration-300 hover:bg-dasara-gold hover:text-black hover:border-dasara-gold hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* 2. Saree Information */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 space-y-3">
          <div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5 font-mono">
              <span className="text-zinc-500">{product.sku}</span>
              <span className={`flex items-center gap-1 font-sans font-medium text-[11px] ${
                product.stockCount === 0
                  ? 'text-rose-400'
                  : product.stockCount === 1
                  ? 'text-amber-300/90'
                  : 'text-emerald-400'
              }`}>
                <Clock className="h-3 w-3 text-dasara-gold/80" />
                {product.stockCount === 0
                  ? 'Sold Out (అయిపోయింది)'
                  : product.stockCount === 1
                  ? 'Single Piece (ఒక్కటే పీస్)'
                  : `${product.stockCount} Pieces Available`}
              </span>
            </div>

            <h3
              onClick={() => onQuickView(product)}
              className="cursor-pointer font-serif text-base sm:text-lg font-bold text-dasara-champagne leading-snug line-clamp-1 transition-colors hover:text-dasara-gold"
              title={product.name}
            >
              {product.name}
            </h3>

            <p className="mt-1 text-xs text-zinc-400 line-clamp-1 font-sans font-light">
              {product.fabric} • {product.zariType}
            </p>
          </div>

          {/* 3. Sleek Typography & Pricing & Action Buttons */}
          <div className="pt-3 border-t border-zinc-800/80">
            <div className="flex items-baseline justify-between mb-3.5">
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-2xl font-bold text-dasara-gold tracking-tight">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-zinc-500 line-through font-sans">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {product.discountPercent > 0 && (
                <span className="rounded-full bg-dasara-maroon/30 border border-dasara-gold/20 px-2 py-0.5 text-[10px] font-semibold text-dasara-goldLight tracking-wider">
                  -{product.discountPercent}%
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="w-full inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-dasara-gold/50 hover:bg-dasara-gold/[0.08] hover:text-dasara-gold active:scale-[0.98] cursor-pointer"
              >
                Quick View
              </button>
              <button
                type="button"
                onClick={() => window.open(getWhatsAppOrderUrl(product), '_blank')}
                className="group/wa w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/80 to-[#0e3b2e] px-3 py-2 text-xs font-semibold text-emerald-300 shadow-md shadow-emerald-950/60 transition-all duration-200 hover:border-dasara-gold/60 hover:from-emerald-900 hover:to-emerald-800 hover:text-dasara-goldLight hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-400 group-hover/wa:text-dasara-gold transition-colors" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </TiltedCard>
  );
};
