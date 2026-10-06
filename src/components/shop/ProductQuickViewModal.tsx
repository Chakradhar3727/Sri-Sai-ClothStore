import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SareeProduct } from '@/types/product.types';
import { ZoomLevel, getProductAngleImages } from '@/types/inspection.types';
import { FabricLoupeLens } from './modal/FabricLoupeLens';
import { MultiAngleGallery } from './modal/MultiAngleGallery';
import { FullScreenLightbox } from './modal/FullScreenLightbox';
import { SareeSpecTabs } from './modal/SareeSpecTabs';
import { PurityCertificateCard } from './modal/PurityCertificateCard';
import { ModalConversionBar } from './modal/ModalConversionBar';
import { Sparkles, ShieldCheck, Heart, Clock } from 'lucide-react';

interface Props {
  product: SareeProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: SareeProduct) => void;
  onOpenVideoConsult?: (product: SareeProduct) => void;
}

export const ProductQuickViewModal: React.FC<Props> = ({
  product,
  isOpen,
  onClose,
  isWishlisted = false,
  onToggleWishlist,
  onOpenVideoConsult,
}) => {
  const [selectedAngleIdx, setSelectedAngleIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(2.0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset state whenever modal opens or active product changes
  useEffect(() => {
    if (isOpen) {
      setSelectedAngleIdx(0);
      setZoomLevel(2.0);
      setIsLightboxOpen(false);
    }
  }, [isOpen, product?.id]);

  if (!product) return null;

  // Resolve 4 saree inspection angles
  const angleImages = getProductAngleImages(product);
  const currentAngle = angleImages[selectedAngleIdx] || angleImages[0];

  const handleNextAngle = () => {
    setSelectedAngleIdx((prev) => (prev + 1) % angleImages.length);
  };

  const handlePrevAngle = () => {
    setSelectedAngleIdx((prev) => (prev - 1 + angleImages.length) % angleImages.length);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="max-w-5xl border border-dasara-gold/40 bg-[#0E0C0F] p-4 sm:p-7 text-white sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* ================= LEFT COLUMN: LOUPE & MULTI-ANGLE GALLERY (5 Cols) ================= */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              {/* Badges on Top */}
              <div className="flex justify-between items-center gap-2">
                {product.isDealerUnique ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-dasara-maroon to-dasara-gold/90 px-3 py-1 text-xs font-bold text-white shadow-xl border border-dasara-gold/50 backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-dasara-goldLight" /> 1-of-1 Dealer Exclusive
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                    Masterweaver Handloom Lot
                  </span>
                )}

                {product.isSilkMarkCertified && (
                  <div className="inline-flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                    <ShieldCheck className="h-3.5 w-3.5" /> Silk Mark Certified
                  </div>
                )}
              </div>

              {/* 60/120 FPS Fabric Loupe Lens Box */}
              <FabricLoupeLens
                imageSrc={currentAngle.url}
                altText={`${product.name} - ${currentAngle.label}`}
                zoomLevel={zoomLevel}
                onZoomChange={setZoomLevel}
                onOpenLightbox={() => setIsLightboxOpen(true)}
                currentAngleLabel={currentAngle.label}
                onNextAngle={handleNextAngle}
                onPrevAngle={handlePrevAngle}
              />

              {/* 4-Angle Saree Gallery Carousel */}
              <MultiAngleGallery
                angleImages={angleImages}
                selectedAngleIndex={selectedAngleIdx}
                onSelectAngle={setSelectedAngleIdx}
              />
            </div>

            {/* ================= RIGHT COLUMN: METADATA, SPECS & CTAs (7 Cols) ================= */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <DialogHeader className="text-left space-y-2">
                  {/* Category, SKU, Provenance & Wishlist button */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-dasara-gold/60 bg-dasara-gold/10 px-2.5 py-0.5 text-xs font-semibold text-dasara-goldLight">
                        {product.category}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">SKU: {product.sku}</span>
                      <span className="text-xs text-amber-400 font-medium">📍 {product.provenance}</span>
                    </div>

                    {/* Shortlist Toggle */}
                    {onToggleWishlist && (
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(product)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition border cursor-pointer ${
                          isWishlisted
                            ? 'bg-rose-950/70 text-rose-400 border-rose-600/50 shadow-sm'
                            : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                        }`}
                        aria-label={isWishlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${
                            isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'
                          }`}
                        />
                        <span>{isWishlisted ? 'Shortlisted' : 'Add to Shortlist'}</span>
                      </button>
                    )}
                  </div>

                  <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-dasara-champagne leading-snug">
                    {product.name}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Comprehensive multi-angle fabric inspection, weave architecture, and Silk Mark purity specs for {product.name}
                  </DialogDescription>
                </DialogHeader>

                {/* Pricing Block */}
                <div className="mt-3.5 flex flex-wrap items-baseline gap-3 pb-3 border-b border-zinc-800/80">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-dasara-gold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base sm:text-lg text-zinc-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="rounded-full bg-gradient-to-r from-dasara-maroon to-dasara-deepCrimson text-dasara-goldLight border border-dasara-gold/40 px-3 py-1 text-xs font-bold shadow-sm">
                    {product.discountPercent}% OFF • Dasara Special
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    (You Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')})
                  </span>
                </div>

                {/* Stock Status Bar */}
                <div className="mt-3 flex items-center justify-between text-xs bg-zinc-900/50 rounded-xl px-3.5 py-2 border border-zinc-800/80">
                  <span className="text-zinc-400">Stock Available:</span>
                  <span className={`font-semibold flex items-center gap-1.5 ${
                    product.stockCount === 0
                      ? 'text-rose-400'
                      : product.stockCount === 1
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}>
                    <Clock className="h-3.5 w-3.5" />
                    {product.stockCount === 0
                      ? 'Sold Out (స్టాక్ అయిపోయింది)'
                      : product.stockCount === 1
                      ? 'Single Piece (ఒక్కటే పీస్ - Exclusive)'
                      : `${product.stockCount} Pieces Available (అందుబాటులో ఉన్నాయి)`}
                  </span>
                </div>

                {/* Silk Mark & GI Authenticity Credential Card */}
                <div className="mt-3.5">
                  <PurityCertificateCard product={product} />
                </div>

                {/* Technical Saree Specification Tabs */}
                <SareeSpecTabs product={product} />
              </div>

              {/* High-Conversion Regional Commerce Bar */}
              <ModalConversionBar
                product={product}
                activeAngleLabel={currentAngle.label}
                activeImageUrl={currentAngle.url}
                onOpenVideoConsult={onOpenVideoConsult}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-Screen Theatre Lightbox Modal */}
      <FullScreenLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        angleImages={angleImages}
        initialIndex={selectedAngleIdx}
        productName={product.name}
      />
    </>
  );
};
