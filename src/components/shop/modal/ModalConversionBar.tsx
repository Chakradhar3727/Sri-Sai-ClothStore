import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Video, Share2, Store } from 'lucide-react';
import { SareeProduct } from '@/types/product.types';
import {
  getWhatsAppOrderUrl,
  getWhatsAppVideoConsultUrl,
  getWhatsAppShareUrl,
} from '@/lib/whatsapp';

interface ModalConversionBarProps {
  product: SareeProduct;
  activeAngleLabel?: string;
  activeImageUrl?: string;
  onOpenVideoConsult?: (product: SareeProduct) => void;
}

export const ModalConversionBar: React.FC<ModalConversionBarProps> = ({
  product,
  activeAngleLabel,
  activeImageUrl,
  onOpenVideoConsult,
}) => {
  return (
    <div className="mt-5 space-y-2.5 pt-2 border-t border-zinc-800/80">
      {/* Primary CTA: WhatsApp Direct Reserve */}
      <Button
        onClick={() =>
          window.open(getWhatsAppOrderUrl(product, activeAngleLabel, activeImageUrl), '_blank')
        }
        className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 text-sm sm:text-base font-bold text-white shadow-xl shadow-emerald-950/40 rounded-xl cursor-pointer transition hover:scale-[1.01]"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Reserve / Buy via WhatsApp Now
      </Button>

      {/* Secondary CTA: Video Call Consultation */}
      <Button
        variant="outline"
        onClick={() => {
          if (onOpenVideoConsult) {
            onOpenVideoConsult(product);
          } else {
            window.open(getWhatsAppVideoConsultUrl(product), '_blank');
          }
        }}
        className="w-full border-dasara-gold/50 text-dasara-goldLight hover:bg-dasara-gold/10 py-5 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
      >
        <Video className="mr-2 h-4 w-4 text-dasara-gold" />
        Book 5-Min Live Video Call Saree Trial
      </Button>

      {/* Tertiary CTA: WhatsApp Family Share */}
      <Button
        variant="outline"
        onClick={() => window.open(getWhatsAppShareUrl(product, activeImageUrl), '_blank')}
        className="w-full border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/80 py-4 text-xs font-medium rounded-xl cursor-pointer"
      >
        <Share2 className="mr-2 h-4 w-4 text-dasara-gold" />
        Share Saree with Family on WhatsApp
      </Button>

      {/* Boutique Notice */}
      <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-zinc-400">
        <Store className="h-3.5 w-3.5 text-dasara-gold" />
        <span>Visit Store for Live Physical Trial • Special Dasara Timings 10 AM - 10 PM</span>
      </div>
    </div>
  );
};
