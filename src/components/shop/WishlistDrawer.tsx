import React, { useState } from 'react';
import { SareeProduct } from '@/types/product.types';
import {
  X,
  Heart,
  MessageCircle,
  Eye,
  Trash2,
  Columns3,
  List,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppOrderUrl, getWhatsAppShortlistUrl } from '@/lib/whatsapp';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  wishlist: SareeProduct[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onQuickView: (product: SareeProduct) => void;
  compareIds: string[];
  onToggleCompare: (product: SareeProduct) => void;
  onOpenInquiryBag?: () => void;
}

export const WishlistDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onClear,
  onQuickView,
  compareIds,
  onToggleCompare,
  onOpenInquiryBag,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'compare'>('list');

  if (!isOpen) return null;

  const totalValue = wishlist.reduce((acc, p) => acc + p.price, 0);
  const totalSavings = wishlist.reduce((acc, p) => acc + (p.originalPrice - p.price), 0);

  // Filter products for comparison (defaults to all wishlist up to 3 if none specifically toggled)
  const comparedProducts =
    compareIds.length > 0
      ? wishlist.filter((p) => compareIds.includes(p.id))
      : wishlist.slice(0, 3);

  const canCompare = wishlist.length >= 2;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6">
        <div
          className={`w-screen ${
            viewMode === 'compare' ? 'max-w-4xl' : 'max-w-md sm:max-w-lg'
          } bg-[#0E0C0F] border-l border-dasara-gold/30 shadow-2xl flex flex-col justify-between transition-all duration-300`}
        >
          
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-dasara-maroon to-dasara-deepCrimson border border-dasara-gold/40 flex items-center justify-center text-dasara-gold">
                  <Heart className="h-4 w-4 fill-dasara-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    Festive Shortlist
                    <span className="rounded-full bg-dasara-gold/20 text-dasara-goldLight border border-dasara-gold/40 px-2 py-0.5 text-xs font-mono">
                      {wishlist.length}
                    </span>
                  </h2>
                  <p className="text-[11px] text-zinc-400">
                    Handpicked sarees saved for consultation & trials
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close shortlist"
                className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mode Switcher (List vs Compare) */}
            {canCompare && (
              <div className="mt-3.5 flex items-center justify-between pt-3 border-t border-zinc-900">
                <span className="text-xs text-zinc-400 font-medium">Display Mode:</span>
                <div className="flex items-center p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-dasara-maroon text-white font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <List className="h-3.5 w-3.5" />
                    <span>List</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('compare')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'compare'
                        ? 'bg-dasara-gold text-black font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Columns3 className="h-3.5 w-3.5" />
                    <span>Compare (2-3)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 scrollbar-thin">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="h-16 w-16 rounded-full bg-zinc-900/80 border border-dasara-gold/30 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-dasara-gold/60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-white">Your Shortlist is Empty</h3>
                  <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                    Click the heart icon on any saree in our Dasara collection to save it here for side-by-side comparison or direct WhatsApp booking.
                  </p>
                </div>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={onClose}
                  className="mt-2 text-xs"
                >
                  Explore Collection
                </Button>
              </div>
            ) : viewMode === 'compare' && canCompare ? (
              /* ================= COMPARE MODE (Side-by-Side Table) ================= */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Comparing {comparedProducts.length} Shortlisted Sarees</span>
                  <span className="font-mono text-dasara-gold text-[11px]">Side-by-side Specs</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {comparedProducts.map((p) => {
                    const isSelected = compareIds.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        className={`rounded-2xl border ${
                          isSelected ? 'border-dasara-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]' : 'border-dasara-gold/30'
                        } bg-zinc-950/80 p-3 flex flex-col justify-between space-y-3 shadow-lg`}
                      >

                        {/* Image & Header */}
                        <div>
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-zinc-800">
                            <img
                              src={p.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'}
                              alt={p.name}
                              className="h-full w-full object-cover"
                            />
                            {p.isSilkMarkCertified && (
                              <span className="absolute top-2 left-2 rounded-full bg-black/80 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-500/40">
                                Silk Mark
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => onRemove(p.id)}
                              className="absolute top-2 right-2 rounded-full bg-black/80 p-1 text-zinc-400 hover:text-rose-400 border border-white/10"
                              title="Remove from shortlist"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>

                          <h4 className="mt-2.5 font-serif text-xs font-bold text-dasara-champagne line-clamp-2">
                            {p.name}
                          </h4>
                          <span className="text-[10px] text-zinc-500 font-mono">{p.sku}</span>
                        </div>

                        {/* Specs comparison */}
                        <div className="space-y-2 text-[11px] border-t border-zinc-900 pt-2">
                          <div>
                            <span className="text-zinc-500 block text-[10px]">Price:</span>
                            <span className="font-serif text-sm font-bold text-dasara-gold">
                              ₹{p.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-zinc-500 line-through ml-1.5">
                              ₹{p.originalPrice.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div>
                            <span className="text-zinc-500 block text-[10px]">Fabric:</span>
                            <span className="text-zinc-300 font-medium">{p.fabric}</span>
                          </div>

                          <div>
                            <span className="text-zinc-500 block text-[10px]">Zari:</span>
                            <span className="text-amber-300 font-medium">{p.zariType}</span>
                          </div>

                          <div>
                            <span className="text-zinc-500 block text-[10px]">Loom / Origin:</span>
                            <span className="text-zinc-300">{p.provenance}</span>
                          </div>

                          <div>
                            <span className="text-zinc-500 block text-[10px]">Estimated Drape:</span>
                            <span className="font-mono text-zinc-400">~680g Silk Mark Class A</span>
                          </div>
                        </div>

                        {/* Direct WhatsApp Reserve for this item */}
                        <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                          <Button
                            variant="whatsapp"
                            size="sm"
                            onClick={() => window.open(getWhatsAppOrderUrl(p), '_blank')}
                            className="w-full text-xs py-2"
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Book Piece
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onQuickView(p)}
                            className="w-full text-[11px] py-1 border-zinc-800 text-zinc-300 hover:text-white"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Loupe Details
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ================= LIST MODE ================= */
              <div className="space-y-3">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-2xl border border-zinc-800/90 bg-zinc-950/70 p-3 transition-all hover:border-dasara-gold/40 shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => onQuickView(item)}
                      className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-800 cursor-pointer group"
                    >
                      <img
                        src={item.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Information */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => onQuickView(item)}
                            className="font-serif text-xs sm:text-sm font-semibold text-dasara-champagne line-clamp-1 hover:text-dasara-gold cursor-pointer"
                          >
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemove(item.id)}
                            className="text-zinc-500 hover:text-rose-400 p-1 transition cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono mt-0.5">
                          <span>{item.sku}</span>
                          <span>•</span>
                          <span className="text-amber-400/90">{item.provenance.split(',')[0]}</span>
                        </div>

                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="font-serif text-sm sm:text-base font-bold text-dasara-gold">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-zinc-500 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-900 mt-2">
                        {canCompare && (
                          <button
                            type="button"
                            onClick={() => onToggleCompare(item)}
                            className={`text-[11px] font-medium px-2 py-1 rounded-md border transition cursor-pointer ${
                              compareIds.includes(item.id)
                                ? 'bg-dasara-gold/20 text-dasara-goldLight border-dasara-gold/60'
                                : 'border-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {compareIds.includes(item.id) ? '✓ Compare' : '+ Compare'}
                          </button>
                        )}

                        <div className="flex items-center gap-1.5 ml-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onQuickView(item)}
                            className="text-xs py-1 px-2.5 h-7 border-zinc-700 hover:border-dasara-gold"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Loupe
                          </Button>
                          <Button
                            variant="whatsapp"
                            size="sm"
                            onClick={() => window.open(getWhatsAppOrderUrl(item), '_blank')}
                            className="text-xs py-1 px-2.5 h-7"
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Footer Summary & WhatsApp Batch Consultation */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md space-y-3">
              {/* Financial summary */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Shortlist Total ({wishlist.length} Sarees):</span>
                  <span className="font-serif text-sm font-bold text-dasara-champagne">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-400 text-[11px]">
                  <span>Total Dasara Savings:</span>
                  <span>Save ₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {onOpenInquiryBag && (
                  <Button
                    onClick={() => {
                      onOpenInquiryBag();
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-dasara-maroon via-dasara-deepCrimson to-dasara-maroon border border-dasara-gold/60 py-5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-dasara-maroon/40 rounded-xl cursor-pointer hover:brightness-110 transition"
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-dasara-gold" />
                    Build Bridal Trousseau Inquiry ({wishlist.length} Sarees)
                  </Button>
                )}

                <Button
                  onClick={() => window.open(getWhatsAppShortlistUrl(wishlist), '_blank')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 py-5 text-sm font-bold text-white shadow-xl shadow-emerald-950/50 rounded-xl cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Quick Shortlist to WhatsApp
                </Button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={onClear}
                    className="text-[11px] text-zinc-500 hover:text-rose-400 transition cursor-pointer"
                  >
                    Clear All Shortlisted
                  </button>

                  <span className="text-[11px] text-dasara-gold font-medium">
                    Sri Sai ClothStore Dasara Guarantee
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
