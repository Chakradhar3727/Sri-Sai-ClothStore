import { useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SareeProduct } from '@/types/product.types';

interface RealtimeInventoryProps {
  onProductUpdate: (updatedProduct: SareeProduct) => void;
  onProductInsert: (newProduct: SareeProduct) => void;
  onProductDelete: (deletedId: string) => void;
}

export function useRealtimeInventory({
  onProductUpdate,
  onProductInsert,
  onProductDelete,
}: RealtimeInventoryProps) {
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel('realtime:products')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const p = payload.new as any;
            onProductInsert({
              id: p.id,
              sku: p.sku,
              name: p.name,
              category: p.category,
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
              createdAt: p.created_at,
            });
          } else if (payload.eventType === 'UPDATE') {
            const p = payload.new as any;
            onProductUpdate({
              id: p.id,
              sku: p.sku,
              name: p.name,
              category: p.category,
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
              createdAt: p.created_at,
            });
          } else if (payload.eventType === 'DELETE') {
            onProductDelete(payload.old.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onProductUpdate, onProductInsert, onProductDelete]);
}
