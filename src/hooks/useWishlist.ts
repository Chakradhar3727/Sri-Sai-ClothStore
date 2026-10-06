import { useState, useEffect, useCallback } from 'react';
import { SareeProduct } from '@/types/product.types';

const STORAGE_KEY = 'sri_sai_saree_wishlist_v1';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<SareeProduct[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load wishlist from localStorage', e);
    }
    return [];
  });

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((p) => p.id === productId),
    [wishlist]
  );

  const addToWishlist = useCallback((product: SareeProduct) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    setCompareIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggleWishlist = useCallback((product: SareeProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        setCompareIds((c) => c.filter((id) => id !== product.id));
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  const isInCompare = useCallback(
    (productId: string) => compareIds.includes(productId),
    [compareIds]
  );

  const toggleCompare = useCallback((product: SareeProduct) => {
    setCompareIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        // Max 3 for comparison
        return [prev[1], prev[2], product.id];
      }
      return [...prev, product.id];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    setCompareIds([]);
  }, []);

  // Products in compare
  const comparedProducts = wishlist.filter((p) => compareIds.includes(p.id));

  return {
    wishlist,
    wishlistCount: wishlist.length,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    compareIds,
    comparedProducts,
    isInCompare,
    toggleCompare,
    clearCompare,
    clearWishlist,
    isDrawerOpen,
    setIsDrawerOpen,
  };
}
