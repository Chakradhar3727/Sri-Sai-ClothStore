import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SareeProduct, SareeCategory, CatalogFilterState } from '@/types/product.types';
import { DASARA_PRODUCTS_SEED } from '@/data/products';
import { WEAVING_GUILDS } from '@/data/guilds';
import { useRealtimeInventory } from '@/hooks/useRealtimeInventory';

export function useProducts() {
  const [products, setProducts] = useState<SareeProduct[]>(DASARA_PRODUCTS_SEED);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<CatalogFilterState>({
    category: 'All',
    originHub: 'All',
    sortBy: 'featured',
    searchQuery: '',
    onlyUniquePieces: false,
    inStockOnly: false,
    selectedColor: 'All',
  });


  const fetchProducts = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setProducts(DASARA_PRODUCTS_SEED);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error: dbError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;

      if (data) {
        const mapped: SareeProduct[] = data.map((p) => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
          category: p.category as any,
          provenance: p.provenance,
          lot_id: p.lot_id,
          price: Number(p.price),
          originalPrice: Number(p.original_price),
          discountPercent: p.discount_percent ?? Math.round(((p.original_price - p.price) / p.original_price) * 100),
          fabric: p.fabric,
          zariType: p.zari_type,
          blouseDetails: p.blouse_details,
          stockCount: p.stock_count,
          isDealerUnique: p.is_dealer_unique,
          isSilkMarkCertified: p.is_silk_mark_certified,
          isFeaturedShowstopper: p.is_featured_showstopper,
          images: p.images || [],
          description: p.description,
          color: p.color,
          isPublished: p.is_published,
          createdAt: p.created_at || undefined,
        }));
        
        setProducts(mapped);
        setIsLiveConnected(true);
      }
    } catch (err: any) {
      console.warn('Failed to fetch from Supabase, using local seed fallback:', err.message);
      setError(err.message);
      setProducts(DASARA_PRODUCTS_SEED);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Hook in real-time inventory updates via WebSocket
  useRealtimeInventory({
    onProductInsert: (newProd) => {
      setProducts((prev) => {
        const exists = prev.some((p) => p.id === newProd.id || (newProd.sku && p.sku === newProd.sku));
        if (exists) {
          return prev.map((p) => (p.id === newProd.id || (newProd.sku && p.sku === newProd.sku) ? newProd : p));
        }
        return [newProd, ...prev];
      });
    },
    onProductUpdate: (updatedProd) => {
      setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    },
    onProductDelete: (deletedId) => {
      setProducts((prev) => prev.filter((p) => p.id !== deletedId));
    },
  });

  // Calculate live item counts per category
  const categoryCounts = useMemo(() => {
    const visible = products.filter((p) => p.isPublished !== false);
    const counts: Record<SareeCategory, number> = {
      'All': visible.length,
      'Kanchi Pattu': 0,
      'Banarasi Silk': 0,
      'Organza': 0,
      'Fancy Sarees': 0,
      'Partywear & Kurtis': 0,
    };
    visible.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [products]);

  // Client-side instant filter & search calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.isPublished === false) return false;
        // Category Filter
        if (filters.category !== 'All' && p.category !== filters.category) {
          return false;
        }
        // Origin Hub Filter
        if (filters.originHub !== 'All') {
          const hubLower = filters.originHub.toLowerCase();
          const provLower = p.provenance.toLowerCase();
          const pNameLower = p.name.toLowerCase();
          const matches =
            provLower.includes(hubLower) ||
            hubLower.includes(provLower.split(',')[0].trim().toLowerCase()) ||
            pNameLower.includes(hubLower);
          if (!matches) {
            return false;
          }
        }
        // 1-of-1 Unique Filter
        if (filters.onlyUniquePieces && !p.isDealerUnique) {
          return false;
        }
        // In-stock Filter
        if (filters.inStockOnly && p.stockCount <= 0) {
          return false;
        }
        // Color Swatch Filter
        if (filters.selectedColor && filters.selectedColor !== 'All') {
          const colorKey = filters.selectedColor.toLowerCase();
          const pColor = (p.color || '').toLowerCase();
          const pName = (p.name || '').toLowerCase();
          const pDesc = (p.description || '').toLowerCase();
          
          let matchesColor = pColor.includes(colorKey) || pName.includes(colorKey) || pDesc.includes(colorKey);
          
          if (!matchesColor) {
            if (colorKey === 'crimson') {
              matchesColor = pColor.includes('red') || pColor.includes('ruby') || pColor.includes('maroon') || pName.includes('crimson') || pName.includes('red');
            } else if (colorKey === 'peacock') {
              matchesColor = pColor.includes('teal') || pColor.includes('blue') || pColor.includes('cyan') || pName.includes('peacock') || pName.includes('teal');
            } else if (colorKey === 'haldi') {
              matchesColor = pColor.includes('yellow') || pColor.includes('mustard') || pColor.includes('gold') || pName.includes('haldi') || pName.includes('yellow');
            } else if (colorKey === 'emerald') {
              matchesColor = pColor.includes('green') || pColor.includes('olive') || pColor.includes('sage') || pName.includes('emerald') || pName.includes('green');
            } else if (colorKey === 'wine') {
              matchesColor = pColor.includes('purple') || pColor.includes('magenta') || pColor.includes('plum') || pColor.includes('violet') || pName.includes('wine');
            } else if (colorKey === 'pastel') {
              matchesColor = pColor.includes('blush') || pColor.includes('peach') || pColor.includes('pink') || pColor.includes('mint') || pColor.includes('lavender') || pName.includes('pastel');
            } else if (colorKey === 'ivory') {
              matchesColor = pColor.includes('white') || pColor.includes('cream') || pColor.includes('off-white') || pName.includes('ivory') || pName.includes('white');
            } else if (colorKey === 'black') {
              matchesColor = pColor.includes('midnight') || pColor.includes('charcoal') || pColor.includes('dark') || pName.includes('black');
            }
          }
          if (!matchesColor) return false;
        }

        // Search Query (matches title, SKU, fabric, color, provenance)
        if (filters.searchQuery.trim() !== '') {
          const q = filters.searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.fabric.toLowerCase().includes(q) ||
            p.color.toLowerCase().includes(q) ||
            p.provenance.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'featured') {
          return (b.isFeaturedShowstopper ? 1 : 0) - (a.isFeaturedShowstopper ? 1 : 0);
        }
        if (filters.sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (filters.sortBy === 'price-high') {
          return b.price - a.price;
        }
        if (filters.sortBy === 'discount') {
          return b.discountPercent - a.discountPercent;
        }
        if (filters.sortBy === 'newest') {
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        }
        return 0;
      });
  }, [products, filters]);

  // Extract all distinct origin hubs for the filter dropdown
  const originHubs = useMemo(() => {
    const hubs = new Set<string>();
    // Pre-populate with all 12 premier weaving guild names
    WEAVING_GUILDS.forEach((g) => hubs.add(g.name));
    products.forEach((p) => {
      const parts = p.provenance.split(',');
      if (parts[0]) hubs.add(parts[0].trim());
    });
    return Array.from(hubs);
  }, [products]);

  return {
    products: filteredProducts,
    allProducts: products,
    allProductsCount: products.length,
    setProducts,
    categoryCounts,
    originHubs,
    filters,
    setFilters,
    isLoading,
    isLiveConnected,
    error,
    refresh: fetchProducts,
  };
}
