import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, CheckCircle2 } from 'lucide-react';
import { SareeProduct } from '@/types/product.types';
import {
  PreferredLanguage,
  VideoPlatform,
  TimeSlotCategory,
  VideoConsultBooking,
} from '@/types/whatsapp.types';
import { getWhatsAppVideoConsultBookingUrl } from '@/lib/whatsapp';

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

  useEffect(() => {
    if (isOpen) {
      if (preSelectedProduct) {
        setSelectedProductIds([preSelectedProduct.id]);
      } else {
        setSelectedProductIds([]);
      }
    }
  }, [preSelectedProduct, isOpen]);

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleConfirmBooking = () => {
    const candidateList = preSelectedProduct
      ? [preSelectedProduct, ...availableProducts.filter((p) => p.id !== preSelectedProduct.id)]
      : availableProducts;
    const selectedSarees = candidateList.filter((p) => selectedProductIds.includes(p.id));

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

  // Ensure pre-selected product appears in the list if available
  const displayProducts = React.useMemo(() => {
    const pool = availableProducts.slice(0, 18);
    if (!preSelectedProduct) return pool;
    const hasPre = pool.some((p) => p.id === preSelectedProduct.id);
    if (hasPre) return pool;
    return [preSelectedProduct, ...availableProducts.filter((p) => p.id !== preSelectedProduct.id).slice(0, 17)];
  }, [availableProducts, preSelectedProduct]);

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
          <DialogDescription className="text-xs sm:text-sm text-zinc-300">
            Inspect fabric fall, pleat drape, and zari luster under boutique showroom lighting before buying.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {/* Step 1: Select Sarees to View (up to 3) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-dasara-goldLight block">
                1. Select Sarees for Display Stand (Choose up to 3)
              </label>
              <span className="text-[11px] text-zinc-400 font-mono">
                {selectedProductIds.length}/3 selected
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {displayProducts.map((product) => {
                const isSelected = selectedProductIds.includes(product.id);
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => toggleProduct(product.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-dasara-gold bg-dasara-maroon/40 shadow-sm ring-1 ring-dasara-gold/50'
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
                    {isSelected && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-dasara-gold shrink-0" />
                    )}
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
                      ? 'border-dasara-gold bg-gradient-to-br from-dasara-maroon/60 to-zinc-950 text-white font-semibold shadow-md ring-1 ring-dasara-gold/40'
                      : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-mono text-[11px] text-dasara-gold block mb-1">
                    {slot.split(' (')[0]}
                  </span>
                  <span className="text-[10px] text-zinc-300">
                    {slot.split(' (')[1]?.replace(')', '') || ''}
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
                    className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer text-center ${
                      language === lang
                        ? 'bg-dasara-maroon text-dasara-goldLight border border-dasara-gold/40 shadow-sm'
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
                    className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer text-center ${
                      platform === plat
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 shadow-sm'
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
            <div className="mt-2.5">
              <input
                type="text"
                placeholder="Special notes or drape preferences (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
