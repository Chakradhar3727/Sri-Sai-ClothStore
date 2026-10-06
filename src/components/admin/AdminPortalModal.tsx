import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SareeProduct } from '@/types/product.types';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminInventory } from '@/hooks/useAdminInventory';
import { InventoryTable } from './InventoryTable';
import { ProductFormDialog } from './ProductFormDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { ToastNotification, ToastData } from '@/components/ui/ToastNotification';
import {
  Plus,
  Search,
  LogOut,
  X,
  Store,
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SareeProduct[];
  setProducts: React.Dispatch<React.SetStateAction<SareeProduct[]>>;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  products,
  setProducts,
}) => {
  const { signOut } = useAdminAuth();
  const {
    metrics,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    toggleShowstopper,
  } = useAdminInventory(products, setProducts);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SareeProduct | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setToast({ type, title, message });
  };

  const handleToggleStock = (id: string, currentStock: number) => {
    const target = products.find((p) => p.id === id);
    const nextStock = currentStock > 0 ? 0 : 1;
    toggleStock(id, currentStock);
    showToast(
      'info',
      nextStock > 0 ? 'Marked In-Stock' : 'Marked Sold Out',
      `"${target?.name}": ${nextStock > 0 ? 'Active in stock (1)' : 'Marked as Sold Out (0)'}.`
    );
  };

  const handleToggleShowstopper = (id: string, currentVal: boolean) => {
    const target = products.find((p) => p.id === id);
    const nextVal = !currentVal;
    toggleShowstopper(id, currentVal);
    showToast(
      'info',
      nextVal ? 'Featured as Unique Piece ★' : 'Removed from Showstoppers',
      `"${target?.name}" ${
        nextVal
          ? 'is now spotlighted at the top of the store!'
          : 'removed from the top Unique Pieces section.'
      }`
    );
  };

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.provenance.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q);
    const matchesCat = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: SareeProduct) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="fixed inset-0 !left-0 !top-0 !translate-x-0 !translate-y-0 z-50 !max-w-none !w-screen !h-screen bg-[#0A080B] !p-0 !border-0 !flex !flex-col !gap-0 select-none text-white overflow-hidden !rounded-none">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md shrink-0 gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-dasara-maroon to-zinc-900 border border-dasara-gold/50 flex items-center justify-center text-dasara-gold font-bold text-sm shadow-md">
                SS
              </div>
              <div>
                <h2 className="font-serif text-base sm:text-lg font-bold text-dasara-champagne flex items-center gap-2">
                  <span>Operations Hub</span>
                  <span className="rounded-full bg-dasara-maroon px-2 py-0.5 text-[9px] font-mono text-dasara-goldLight border border-dasara-gold/40">
                    Admin
                  </span>
                </h2>
                <p className="text-[10px] text-zinc-400 hidden sm:block">
                  Mahadevpur Flagship Consignments • Live Stock Controls
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="sm:hidden h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
              title="Close Portal"
              aria-label="Close Portal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Button
              onClick={handleOpenAdd}
              className="bg-dasara-gold hover:bg-dasara-goldLight text-black font-bold text-xs py-2 px-3 sm:px-4 rounded-xl shadow-lg shadow-dasara-gold/20 cursor-pointer shrink-0"
            >
              <Plus className="mr-1 h-3.5 w-3.5" /> Add Saree (New Maal)
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 text-xs py-2 px-2.5 sm:px-3 rounded-xl cursor-pointer shrink-0"
              title="Return to Storefront"
            >
              <Store className="mr-1 h-3.5 w-3.5 text-dasara-gold" /> Storefront
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                signOut();
                onClose();
              }}
              className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs py-2 px-2.5 sm:px-3 rounded-xl cursor-pointer shrink-0"
              title="Sign Out from Admin"
            >
              <LogOut className="mr-1 h-3.5 w-3.5" /> Sign Out
            </Button>
            <button
              onClick={onClose}
              className="hidden sm:flex h-9 w-9 rounded-xl bg-zinc-900 border border-zinc-800 items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer ml-1"
              title="Close Portal"
              aria-label="Close Portal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Real-Time KPI Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 p-3 sm:p-4 sm:px-6 bg-zinc-950 border-b border-zinc-800 shrink-0">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Total Catalog</span>
            <span className="text-xl font-bold text-white font-mono">{metrics.totalProducts} Pieces</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">In-Stock</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{metrics.inStockPieces} Active</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Sold Out</span>
            <span className="text-xl font-bold text-rose-400 font-mono">{metrics.soldOutPieces} Claimed</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Showstoppers</span>
            <span className="text-xl font-bold text-amber-300 font-mono">{metrics.featuredShowstoppers} Spotlighted</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hidden lg:block">
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Inventory Value</span>
            <span className="text-xl font-bold text-dasara-gold font-mono">₹{metrics.totalInventoryValue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0E0C0F] shrink-0 border-b border-zinc-800/40">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU, Name, Hub, or Color..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-dasara-gold"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-dasara-gold cursor-pointer"
            >
              <option value="All">All Categories ({products.length})</option>
              <option value="Kanchi Pattu">Kanchi Pattu</option>
              <option value="Banarasi Silk">Banarasi Silk</option>
              <option value="Organza">Organza</option>
              <option value="Fancy Sarees">Fancy Sarees</option>
              <option value="Partywear & Kurtis">Partywear & Kurtis</option>
            </select>
            <span className="text-xs text-zinc-400 font-mono">
              Showing {filteredProducts.length} of {products.length}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 pt-4 bg-[#0E0C0F]">
          <InventoryTable
            products={filteredProducts}
            onEdit={handleOpenEdit}
            onDelete={(id) => setDeletingId(id)}
            onToggleStock={handleToggleStock}
            onToggleShowstopper={handleToggleShowstopper}
          />
        </div>

        {/* Modals */}
        <ProductFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          productToEdit={editingProduct}
          onSubmit={async (data) => {
            try {
              if (editingProduct) {
                const res = await updateProduct(editingProduct.id, data);
                if (res.success) {
                  showToast(
                    'success',
                    'Saree Modified Successfully',
                    `"${data.name}" (${data.sku}) changes saved permanently to database.`
                  );
                } else {
                  showToast('error', 'Update Failed', res.error || 'Could not update saree.');
                }
                return res;
              } else {
                const res = await createProduct(data);
                if (res.success) {
                  showToast(
                    'success',
                    'Saree Added Successfully',
                    `"${data.name}" (${data.sku}) published to live store & database.`
                  );
                } else {
                  showToast('error', 'Add Failed', res.error || 'Could not save saree.');
                }
                return res;
              }
            } catch (err: any) {
              const msg = err.message || 'Operation failed.';
              showToast('error', 'Error', msg);
              return { success: false, error: msg };
            }
          }}
        />

        <DeleteConfirmDialog
          isOpen={!!deletingId}
          onClose={() => setDeletingId(null)}
          onConfirm={async () => {
            if (deletingId) {
              const target = products.find((p) => p.id === deletingId);
              const res = await deleteProduct(deletingId);
              if (res.success) {
                showToast(
                  'success',
                  'Saree Deleted Successfully',
                  `"${target?.name || 'Saree'}" (${target?.sku || ''}) was permanently removed from database.`
                );
              } else {
                showToast('error', 'Delete Failed', res.error || 'Could not delete saree.');
              }
              setDeletingId(null);
            }
          }}
        />

        {/* Floating Toast Notification Popup */}
        <ToastNotification toast={toast} onClose={() => setToast(null)} />

      </DialogContent>
    </Dialog>
  );
};
