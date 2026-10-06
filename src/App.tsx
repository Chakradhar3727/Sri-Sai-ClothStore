import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Database, Lock, PhoneCall, Heart } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useProducts } from '@/hooks/useProducts';
import { useWishlist } from '@/hooks/useWishlist';
import { CategoryTabs } from '@/components/shop/CategoryTabs';
import { ProductFilterBar } from '@/components/shop/ProductFilterBar';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ProductQuickViewModal } from '@/components/shop/ProductQuickViewModal';
import { WishlistDrawer } from '@/components/shop/WishlistDrawer';
import { AdminLoginModal } from '@/components/admin/AdminLoginModal';
import { AdminPortalModal } from '@/components/admin/AdminPortalModal';
import { HeroFestiveBanner } from '@/components/shop/HeroFestiveBanner';
import { WeavingGuildMarquee } from '@/components/shop/WeavingGuildMarquee';
import { GuildExplorerModal } from '@/components/shop/GuildExplorerModal';
import { WeavingGuild } from '@/types/guild.types';
import { LiveUrgencyTicker } from '@/components/festive/LiveUrgencyTicker';
import { StockScarcityBar } from '@/components/festive/StockScarcityBar';
import { DasaraCountdown } from '@/components/shop/DasaraCountdown';
import { ShowstopperShowcase } from '@/components/shop/ShowstopperShowcase';
import { StoreFootfallCard } from '@/components/festive/StoreFootfallCard';
import { FloatingWhatsAppDock } from '@/components/shop/FloatingWhatsAppDock';
import { LiveVideoConsultModal } from '@/components/shop/LiveVideoConsultModal';
import { WhatsAppInquiryBagModal } from '@/components/shop/WhatsAppInquiryBagModal';
import { SareeProduct } from '@/types/product.types';
import { STORE_CONFIG } from '@/lib/whatsapp';

export default function App() {
  const { isAdmin } = useAdminAuth();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SareeProduct | null>(null);
  const [selectedGuild, setSelectedGuild] = useState<WeavingGuild | null>(null);
  const [isVideoConsultModalOpen, setIsVideoConsultModalOpen] = useState(false);
  const [videoConsultProduct, setVideoConsultProduct] = useState<SareeProduct | null>(null);
  const [isInquiryBagModalOpen, setIsInquiryBagModalOpen] = useState(false);

  const handleOpenVideoConsult = (product?: SareeProduct | null) => {
    setVideoConsultProduct(product || null);
    setIsVideoConsultModalOpen(true);
  };

  const handleOpenInquiryBag = () => {
    setIsInquiryBagModalOpen(true);
  };

  const {
    wishlist,
    wishlistCount,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    compareIds,
    toggleCompare,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useWishlist();

  const {
    products,
    allProducts,
    allProductsCount,
    setProducts,
    categoryCounts,
    originHubs,
    filters,
    setFilters,
    isLoading,
    isLiveConnected,
  } = useProducts();

  const resetFilters = () => {
    setFilters({
      category: 'All',
      originHub: 'All',
      sortBy: 'featured',
      searchQuery: '',
      onlyUniquePieces: false,
      inStockOnly: false,
      selectedColor: 'All',
    });
  };


  const featuredShowstoppers = useMemo(() => {
    // 1. All products that the admin explicitly marked with a Star (isFeaturedShowstopper === true)
    const starred = allProducts.filter((p) => p.isFeaturedShowstopper && p.isPublished !== false);
    
    // 2. Fallback single pieces that are dealer-unique or stock 1
    const fallbackUnique = allProducts.filter(
      (p) => !p.isFeaturedShowstopper && p.isPublished !== false && (p.isDealerUnique || p.stockCount === 1)
    );

    // If admin has starred items, show all starred items first! If fewer than 4, fill remaining slots up to 4 with other unique pieces.
    if (starred.length >= 4) {
      return starred;
    }
    const combined = [...starred, ...fallbackUnique];
    return combined.slice(0, Math.max(4, Math.min(starred.length, allProducts.length)));
  }, [allProducts]);

  const inStockPiecesLeft = useMemo(() => {
    return allProducts
      .filter((p) => p.isPublished !== false && p.stockCount > 0)
      .reduce((acc, p) => acc + p.stockCount, 0);
  }, [allProducts]);

  const totalConsignmentPieces = useMemo(() => {
    if (allProductsCount === 0) return 0;
    return allProducts.reduce((acc, p) => acc + Math.max(1, p.stockCount), 0);
  }, [allProducts, allProductsCount]);

  const claimedPieces = useMemo(() => {
    return Math.max(0, totalConsignmentPieces - inStockPiecesLeft);
  }, [totalConsignmentPieces, inStockPiecesLeft]);

  return (
    <div className="min-h-screen bg-[#0E0C0F] text-dasara-champagne font-sans selection:bg-dasara-maroon selection:text-dasara-goldLight">
      
      {/* 1. TOP ROYAL FESTIVE BANNER */}
      <div className="bg-gradient-to-r from-dasara-maroon via-dasara-deepCrimson to-dasara-maroon py-1.5 px-4 text-center text-xs text-dasara-goldLight font-medium border-b border-dasara-gold/30">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="h-3 w-3 animate-spin text-dasara-gold" style={{ animationDuration: '4s' }} />
          <span>Dasara Grand Festive Utsav • Direct Loom Wholesale Pricing • In-Store Voucher Code: <span className="font-mono font-black text-white underline decoration-dasara-gold decoration-2">DASARA500</span></span>
        </div>
      </div>

      {/* 2. ROYAL LUXURY HEADER */}
      <header className="sticky top-0 z-40 border-b border-dasara-gold/20 bg-black/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-dasara-maroon to-dasara-deepCrimson border border-dasara-gold/50 shadow-lg shadow-dasara-maroon/40">
              <span className="font-serif font-black text-dasara-gold text-lg tracking-wider">SS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide">
                  Sri Sai ClothStore
                </span>
                <span className="hidden md:inline-block rounded-full bg-dasara-maroon/90 border border-dasara-gold/40 px-2 py-0.5 text-[10px] font-bold text-dasara-goldLight tracking-wider uppercase">
                  Dasara 2026
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans hidden sm:block">
                Exclusive Silk Sarees & Handpicked Dealer Consignments
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Supabase Realtime Indicator */}
            <div className="hidden lg:flex items-center gap-2 rounded-xl bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 text-xs">
              <Database className="h-3.5 w-3.5 text-dasara-gold" />
              <span className={`font-semibold ${isLiveConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isLiveConnected ? `● Supabase Live (${allProductsCount} Sarees)` : '● Offline Standby'}
              </span>
            </div>

            {/* Shortlist Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="View shortlisted sarees"
              className="relative inline-flex items-center gap-1.5 rounded-xl border border-dasara-gold/40 bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-dasara-champagne hover:border-dasara-gold hover:text-white transition cursor-pointer shadow-sm"
            >
              <Heart className={`h-3.5 w-3.5 ${wishlistCount > 0 ? 'fill-dasara-gold text-dasara-gold' : 'text-zinc-400'}`} />
              <span className="hidden sm:inline">Shortlist</span>
              {wishlistCount > 0 && (
                <span className="rounded-full bg-dasara-gold text-black px-1.5 py-0.2 text-[10px] font-bold font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* In-Store Call / WhatsApp CTA */}
            <button
              onClick={() => handleOpenVideoConsult(null)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-600/40 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/50 transition cursor-pointer"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Live Video Drape</span>
            </button>

            {/* Admin Access Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (isAdmin) {
                  setIsAdminPortalOpen(true);
                } else {
                  setIsAdminModalOpen(true);
                }
              }}
              className="border-dasara-gold/40 text-dasara-gold hover:bg-dasara-gold/10 text-xs font-semibold cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5 mr-1" />
              Admin Portal
            </Button>
          </div>
        </div>
      </header>

      {/* 3. HERO SHOWCASE WITH OFFICIAL DASARA FESTIVE BANNER */}
      <HeroFestiveBanner
        onSelectCategory={(cat) => {
          if (cat === 'Sarees' || cat === 'Daily Wear') {
            setFilters((prev) => ({ ...prev, category: 'All' }));
          } else if (cat.includes('Blouse') || cat.includes('Half') || cat.includes('Kids')) {
            setFilters((prev) => ({ ...prev, category: 'All' }));
          }
        }}
      />

      {/* 4. WEAVING GUILD MARQUEE */}
      <WeavingGuildMarquee
        activeHub={filters.originHub}
        onSelectHub={(hub) =>
          setFilters((prev) => ({
            ...prev,
            originHub: hub,
            ...(hub !== 'All' ? { category: 'All', searchQuery: '', selectedColor: 'All' } : {}),
          }))
        }
        onInspectGuild={(guild) => setSelectedGuild(guild)}
      />

      {/* 5. MAIN STOREFRONT CONTENT */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        
        {/* VIP 1-OF-1 SHOWSTOPPERS SPOTLIGHT */}
        <ShowstopperShowcase
          showstoppers={featuredShowstoppers}
          onQuickView={(p) => setSelectedProduct(p)}
          wishlistIds={wishlist.map((p) => p.id)}
          onToggleWishlist={toggleWishlist}
          onOpenVideoConsult={handleOpenVideoConsult}
        />

        {/* FESTIVE STOCK SCARCITY GAUGE */}
        {totalConsignmentPieces > 0 && (
          <StockScarcityBar
            totalPieces={totalConsignmentPieces}
            claimedPieces={claimedPieces}
          />
        )}

        {/* DASARA COUNTDOWN URGENCY DRIVER */}
        <DasaraCountdown />

        {/* CATALOG NAVIGATION: CATEGORY SELECTOR */}
        <section className="space-y-4 pt-2">
          <div className="flex items-end justify-between border-b border-zinc-800/80 pb-3">
            <div>
              <span className="text-[11px] font-bold text-dasara-gold tracking-widest uppercase">
                Curated Collections
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dasara-champagne mt-0.5">
                Explore by Weave & Fabric
              </h2>
            </div>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline-block">
              Displaying {products.length} of {allProductsCount} sarees
            </span>
          </div>

          <CategoryTabs
            activeCategory={filters.category}
            onSelectCategory={(cat) => setFilters({ ...filters, category: cat })}
            categoryCounts={categoryCounts}
          />
        </section>

        {/* FILTER, SEARCH & SORT BAR */}
        <section>
          <ProductFilterBar
            filters={filters}
            onFilterChange={setFilters}
            originHubs={originHubs}
            totalResults={products.length}
          />
        </section>

        {/* RESPONSIVE PRODUCT SHOWCASE GRID */}
        <section>
          <ProductGrid
            products={products}
            isLoading={isLoading}
            onQuickView={(p) => setSelectedProduct(p)}
            onResetFilters={resetFilters}
            isWishlisted={isInWishlist}
            onToggleWishlist={toggleWishlist}
          />
        </section>

        {/* BOUTIQUE PHYSICAL STORE VISIT & DASARA500 IN-STORE FOOTFALL CATALYST */}
        <StoreFootfallCard />

      </main>

      {/* 6. ROYAL FOOTER */}
      <footer className="border-t border-dasara-gold/20 bg-black/90 py-10 px-4 sm:px-8 mt-12 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-dasara-maroon flex items-center justify-center text-dasara-gold font-serif font-black">
                SS
              </div>
              <span className="font-serif font-bold text-white text-base">Sri Sai ClothStore</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Family-owned luxury handloom boutique bringing India's timeless weaving legacies straight from artisan looms to your festive celebrations.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3">Artisan Weaving Clusters</h4>
            <ul className="space-y-1.5">
              <li>Kanchipuram Mulberry Silk</li>
              <li>Varanasi Katan & Kadwa</li>
              <li>Dharmavaram Temple Borders</li>
              <li>Gadwal Pure Silk Kuttu</li>
              <li>Surat Organza & Tissue</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3">Boutique Flagship</h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={STORE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dasara-gold underline underline-offset-2 transition"
                >
                  📍 {STORE_CONFIG.storeAddress}
                </a>
              </li>
              <li>Open {STORE_CONFIG.storeHours}</li>
              <li>
                <a
                  href={`https://wa.me/${STORE_CONFIG.primaryPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 underline underline-offset-2 transition"
                >
                  💬 Direct WhatsApp: {STORE_CONFIG.displayPhone}
                </a>
              </li>
              <li>In-Store Billing Coupon: <span className="font-mono text-dasara-gold font-bold">{STORE_CONFIG.inStoreCouponCode}</span></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-white text-sm mb-3">Authenticity Guarantee</h4>
            <p className="text-zinc-400 leading-relaxed">
              All our silk sarees are 100% Silk Mark certified with authentic zari testing. Hand-verified consignments ("maal") sourced directly from master weaver families.
            </p>
            <div className="pt-2 text-[10px] text-zinc-500 font-mono">
              © {new Date().getFullYear()} Sri Sai ClothStore. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* 7. QUICK VIEW, WISHLIST DRAWER, GUILD EXPLORER & ADMIN MODALS */}
      <GuildExplorerModal
        guild={selectedGuild}
        isOpen={Boolean(selectedGuild)}
        onClose={() => setSelectedGuild(null)}
        onFilterByGuild={(guildName) => {
          setFilters((prev) => ({
            ...prev,
            originHub: guildName,
            category: 'All',
            searchQuery: '',
            selectedColor: 'All',
          }));
          const elem = document.getElementById('catalog-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <ProductQuickViewModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? isInWishlist(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        onOpenVideoConsult={(p) => handleOpenVideoConsult(p)}
      />

      <WishlistDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        wishlist={wishlist}
        onRemove={removeFromWishlist}
        onClear={clearWishlist}
        onQuickView={(p) => {
          setSelectedProduct(p);
        }}
        compareIds={compareIds}
        onToggleCompare={toggleCompare}
        onOpenInquiryBag={handleOpenInquiryBag}
      />

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onOpenPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* PHASE 8 FULL-SCREEN ADMIN OPERATIONS PORTAL */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        products={allProducts}
        setProducts={setProducts}
      />

      {/* 8. PHASE 7 LIVE VIDEO CONSULTATION & MULTI-ITEM INQUIRY MODALS */}
      <LiveVideoConsultModal
        isOpen={isVideoConsultModalOpen}
        onClose={() => {
          setIsVideoConsultModalOpen(false);
          setVideoConsultProduct(null);
        }}
        availableProducts={allProducts || products}
        preSelectedProduct={videoConsultProduct}
      />

      <WhatsAppInquiryBagModal
        isOpen={isInquiryBagModalOpen}
        onClose={() => setIsInquiryBagModalOpen(false)}
        items={wishlist}
        onRemoveItem={removeFromWishlist}
        onClearBag={clearWishlist}
      />

      {/* 9. PHASE 7 FLOATING CONVERSATIONAL WHATSAPP DOCK */}
      <FloatingWhatsAppDock
        wishlistCount={wishlistCount}
        onOpenWishlist={() => setIsDrawerOpen(true)}
        onOpenVideoConsult={() => handleOpenVideoConsult(selectedProduct || null)}
        onOpenInquiryBag={handleOpenInquiryBag}
        isModalOpen={
          Boolean(selectedProduct) ||
          isDrawerOpen ||
          isAdminModalOpen ||
          isAdminPortalOpen ||
          Boolean(selectedGuild) ||
          isVideoConsultModalOpen ||
          isInquiryBagModalOpen
        }
      />

      {/* 10. LIVE FESTIVE SOCIAL PROOF BOOKING TICKER */}
      <LiveUrgencyTicker
        onSelectSku={(sku) => {
          const found = products.find((p) => p.sku === sku);
          if (found) {
            setSelectedProduct(found);
          } else {
            const elem = document.getElementById('catalog-section');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}

