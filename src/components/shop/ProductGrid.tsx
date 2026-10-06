import React from 'react';
import { SareeProduct } from '@/types/product.types';
import { ProductCard } from '@/components/shop/ProductCard';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  products: SareeProduct[];
  isLoading: boolean;
  onQuickView: (product: SareeProduct) => void;
  onResetFilters: () => void;
  isWishlisted?: (productId: string) => boolean;
  onToggleWishlist?: (product: SareeProduct) => void;
}

export const ProductGrid: React.FC<Props> = ({
  products,
  isLoading,
  onQuickView,
  onResetFilters,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3 animate-pulse space-y-4"
          >
            <div className="aspect-[3/4] w-full rounded-xl bg-zinc-800" />
            <div className="h-4 w-3/4 rounded bg-zinc-800" />
            <div className="h-3 w-1/2 rounded bg-zinc-800" />
            <div className="h-8 w-full rounded bg-zinc-800" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="festive-glass flex flex-col items-center justify-center rounded-3xl p-12 text-center border border-zinc-800 my-8">
        <Sparkles className="h-10 w-10 text-dasara-gold animate-spin" style={{ animationDuration: '8s' }} />
        <h3 className="mt-4 font-serif text-2xl font-bold text-white">
          No Sarees Match Your Filter
        </h3>
        <p className="mt-2 text-sm text-zinc-400 max-w-md">
          We have new dealer consignments arriving daily for the Dasara sale. Try clearing your search keyword or switching categories.
        </p>
        <Button variant="gold" onClick={onResetFilters} className="mt-6">
          <RefreshCcw className="mr-2 h-4 w-4" /> Reset All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          isWishlisted={isWishlisted ? isWishlisted(product.id) : undefined}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
};

