import React, { useState, useEffect } from 'react';
import { MessageCircle, Video, Heart, MapPin, X, Sparkles, ShoppingBag } from 'lucide-react';
import { getWhatsAppGeneralChatUrl, STORE_CONFIG } from '@/lib/whatsapp';

interface FloatingWhatsAppDockProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenVideoConsult: () => void;
  onOpenInquiryBag?: () => void;
  isModalOpen?: boolean;
}

export const FloatingWhatsAppDock: React.FC<FloatingWhatsAppDockProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenVideoConsult,
  onOpenInquiryBag,
  isModalOpen = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dockRef = React.useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  // Hide dock if large full-screen modal or inspection view is open
  if (isModalOpen) return null;

  return (
    <div ref={dockRef} className="fixed bottom-5 right-5 z-40 select-none">
      {/* Quick Action Flyout Menu */}
      {isExpanded && (
        <div className="mb-3 w-72 rounded-2xl border border-dasara-gold/40 bg-[#0E0C0F]/95 p-3.5 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="font-serif text-xs font-bold text-dasara-champagne flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-dasara-gold" />
              Live Boutique Desk
            </span>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-md cursor-pointer"
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

          {/* Action 3: Shortlist / Inquiry Bag */}
          {wishlistCount > 0 ? (
            <button
              type="button"
              onClick={() => {
                if (onOpenInquiryBag) {
                  onOpenInquiryBag();
                } else {
                  onOpenWishlist();
                }
                setIsExpanded(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs bg-rose-950/40 border border-rose-800/40 hover:bg-rose-900/50 transition cursor-pointer"
            >
              <div className="h-7 w-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-rose-300">Trousseau Bag ({wishlistCount} Sarees)</p>
                <p className="text-[10px] text-zinc-300">Itemized bridal WhatsApp bill</p>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onOpenWishlist();
                setIsExpanded(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition cursor-pointer"
            >
              <div className="h-7 w-7 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0">
                <Heart className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-zinc-300">View Shortlist</p>
                <p className="text-[10px] text-zinc-500">0 sarees saved</p>
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
          <span className="rounded-full bg-dasara-maroon border border-dasara-gold px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
            {wishlistCount}
          </span>
        )}
      </button>
    </div>
  );
};
