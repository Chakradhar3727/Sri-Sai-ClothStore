import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Trash2, Sparkles, Heart } from 'lucide-react';
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
                className="text-xs text-zinc-400 hover:text-rose-400 transition cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-dasara-champagne leading-snug">
            Multi-Saree WhatsApp Inquiry
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-zinc-300">
            Combine multiple matching sarees into a single itemized inquiry for package booking.
          </DialogDescription>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 space-y-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
              <Heart className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-white">Your inquiry bag is currently empty.</p>
            <p className="text-xs text-zinc-400">Shortlist sarees from the catalog to build a festive trousseau package!</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Items List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
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
                      className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer transition"
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
                <span className="font-mono text-white font-medium">{items.length} Sarees</span>
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
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Your Name (e.g., Ananya)"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Occasion (e.g., Wedding Trousseau)"
                  value={occasionType}
                  onChange={(e) => setOccasionType(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
                />
                <input
                  type="text"
                  placeholder="Special instructions or queries"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
                />
              </div>
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
