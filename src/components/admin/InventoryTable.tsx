import React from 'react';
import { SareeProduct } from '@/types/product.types';
import { Edit2, Trash2, Star, CheckCircle2, XCircle, Sparkles, Camera } from 'lucide-react';

interface InventoryTableProps {
  products: SareeProduct[];
  onEdit: (product: SareeProduct) => void;
  onDelete: (id: string) => void;
  onToggleStock: (id: string, currentStock: number) => void;
  onToggleShowstopper: (id: string, currentVal: boolean) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleStock,
  onToggleShowstopper,
}) => {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 sm:p-12 text-center text-zinc-400">
        <p className="font-serif text-base text-zinc-300">No sarees match your current search or category filter.</p>
        <span className="text-xs text-zinc-500 mt-1 block">Try clearing the search query or changing the category filter.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ======================================================== */}
      {/* 1. MOBILE RESPONSIVE CARD LIST (Visible on < 640px) */}
      {/* ======================================================== */}
      <div className="sm:hidden space-y-3">
        {products.map((product) => {
          const inStock = product.stockCount > 0;
          return (
            <div
              key={product.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3.5 space-y-3 shadow-lg"
            >
              <div className="flex items-start gap-3">
                {/* Saree Image Thumbnail with Multi-Angle Indicator */}
                <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-black shrink-0 border border-zinc-800">
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  {product.images.length > 1 && (
                    <span className="absolute bottom-1 right-1 rounded bg-black/85 px-1 py-0.2 text-[8px] font-mono font-bold text-dasara-gold border border-dasara-gold/40 flex items-center gap-0.5">
                      <Camera className="h-2 w-2" />
                      {product.images.length}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-semibold text-white text-xs truncate leading-snug">
                      {product.name}
                    </h4>
                    {/* Star Showstopper Toggle */}
                    <button
                      type="button"
                      onClick={() => onToggleShowstopper(product.id, product.isFeaturedShowstopper)}
                      className={`p-1 rounded-lg transition shrink-0 cursor-pointer ${
                        product.isFeaturedShowstopper
                          ? 'bg-dasara-maroon text-dasara-gold border border-dasara-gold/50'
                          : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                      title="Toggle Star in Unique Pieces"
                    >
                      <Star className={`h-4 w-4 ${product.isFeaturedShowstopper ? 'fill-dasara-gold' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[10px] text-zinc-400">SKU: {product.sku}</span>
                    <span className="text-[10px] text-dasara-goldLight font-medium truncate">• {product.category}</span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-mono font-bold text-sm text-dasara-gold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-[10px] text-zinc-500 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {product.discountPercent > 0 && (
                      <span className="text-[9px] font-bold text-emerald-400">
                        ({product.discountPercent}% OFF)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Controls: Stock Pill + Edit + Delete */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-900 gap-2">
                {/* Stock Toggle Badge with Piece Count */}
                <button
                  type="button"
                  onClick={() => onToggleStock(product.id, product.stockCount)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer border ${
                    inStock
                      ? product.stockCount === 1
                        ? 'bg-amber-950/70 border-dasara-gold/40 text-dasara-goldLight'
                        : 'bg-emerald-950/70 border-emerald-500/40 text-emerald-400'
                      : 'bg-rose-950/70 border-rose-500/40 text-rose-400'
                  }`}
                  title="Click to toggle Stock Status"
                >
                  {inStock ? (
                    product.stockCount === 1 ? (
                      <Sparkles className="h-3 w-3 text-dasara-gold" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    )
                  ) : (
                    <XCircle className="h-3 w-3 text-rose-400" />
                  )}
                  <span>
                    {inStock
                      ? product.stockCount === 1
                        ? 'Single Piece (1)'
                        : `${product.stockCount} Pieces In Stock`
                      : 'Sold Out (0)'}
                  </span>
                </button>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer border border-zinc-800 text-xs font-semibold"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    className="p-1 rounded-lg bg-zinc-900 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 transition cursor-pointer border border-zinc-800"
                    title="Delete Saree"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP FULL INVENTORY TABLE (Visible on >= 640px) */}
      {/* ======================================================== */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/70 shadow-xl">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="border-b border-zinc-800 bg-black/60 text-[11px] font-bold uppercase tracking-wider text-dasara-gold">
            <tr>
              <th className="px-4 py-3">Saree / SKU</th>
              <th className="px-4 py-3">Category & Hub</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-center">Stock Available</th>
              <th className="px-4 py-3 text-center">Star Unique</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {products.map((product) => {
              const inStock = product.stockCount > 0;
              return (
                <tr key={product.id} className="hover:bg-zinc-900/50 transition">
                  {/* Saree & Thumbnail */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 rounded-lg overflow-hidden shrink-0 border border-zinc-800 bg-black">
                        <img
                          src={product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                        {product.images.length > 1 && (
                          <span className="absolute bottom-0 right-0 rounded-tl bg-black/90 px-1 text-[8px] font-mono text-dasara-gold border-t border-l border-dasara-gold/40">
                            {product.images.length}📸
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <p className="font-semibold text-white truncate">{product.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-zinc-400">SKU: {product.sku}</span>
                          {product.isSilkMarkCertified && (
                            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/50 px-1 rounded border border-emerald-500/30">
                              Silk Mark
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category & Origin */}
                  <td className="px-4 py-3">
                    <span className="block text-zinc-200 font-medium">{product.category}</span>
                    <span className="text-[10px] text-zinc-400">📍 {product.provenance}</span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3">
                    <span className="font-mono font-bold text-dasara-gold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-zinc-500 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      {product.discountPercent > 0 && (
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          ({product.discountPercent}% OFF)
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Quick Stock Toggle with Exact Piece Count */}
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleStock(product.id, product.stockCount)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer border ${
                        inStock
                          ? product.stockCount === 1
                            ? 'bg-amber-950/60 border-dasara-gold/40 text-dasara-goldLight hover:bg-amber-900/60'
                            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60'
                          : 'bg-rose-950/60 border-rose-500/40 text-rose-400 hover:bg-rose-900/60'
                      }`}
                      title="Click to toggle between In-Stock and Sold Out"
                    >
                      {inStock ? (
                        product.stockCount === 1 ? (
                          <Sparkles className="h-3 w-3 text-dasara-gold" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <XCircle className="h-3 w-3 text-rose-400" />
                      )}
                      <span>
                        {inStock
                          ? product.stockCount === 1
                            ? 'Single Piece (1)'
                            : `${product.stockCount} Pieces In Stock`
                          : 'Sold Out (0)'}
                      </span>
                    </button>
                  </td>

                  {/* Quick Star Showstopper Toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleShowstopper(product.id, product.isFeaturedShowstopper)}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        product.isFeaturedShowstopper
                          ? 'bg-dasara-maroon text-dasara-gold border border-dasara-gold/50 shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-400 border border-transparent'
                      }`}
                      title="Toggle Star in Top Unique Pieces"
                    >
                      <Star className={`h-4 w-4 ${product.isFeaturedShowstopper ? 'fill-dasara-gold' : ''}`} />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer border border-zinc-800"
                        title="Edit Saree"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 transition cursor-pointer border border-zinc-800 hover:border-rose-800"
                        title="Delete Saree"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
