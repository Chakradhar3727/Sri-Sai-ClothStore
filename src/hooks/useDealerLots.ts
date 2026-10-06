import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DealerLot } from '@/types/product.types';

const FALLBACK_LOTS: DealerLot[] = [
  {
    id: 'lot-1',
    lot_code: 'LOT-KANCHI-01',
    dealer_name: 'Sri Raman Weavers Guild',
    origin_hub: 'Kanchipuram, Tamil Nadu',
    arrival_date: '2026-10-01',
    total_pieces: 12,
    notes: 'Bridal pure mulberry silk consignments with heavy gold zari',
  },
  {
    id: 'lot-2',
    lot_code: 'LOT-VARANASI-01',
    dealer_name: 'Kashi Vishwanath Looms',
    origin_hub: 'Varanasi, Uttar Pradesh',
    arrival_date: '2026-10-02',
    total_pieces: 18,
    notes: 'Handwoven Katan silk with real silver and gold resham jaal',
  },
  {
    id: 'lot-3',
    lot_code: 'LOT-SURAT-01',
    dealer_name: 'Surat Textile Hub Designers',
    origin_hub: 'Surat, Gujarat',
    arrival_date: '2026-10-03',
    total_pieces: 25,
    notes: 'Modern lightweight pastel organza with floral zari borders',
  },
  {
    id: 'lot-4',
    lot_code: 'LOT-DHARMA-01',
    dealer_name: 'Dharmavaram Silk Co-op',
    origin_hub: 'Dharmavaram, Andhra Pradesh',
    arrival_date: '2026-10-04',
    total_pieces: 10,
    notes: 'Rich festive double-warp pattu sarees with contrast pallus',
  },
];

export function useDealerLots() {
  const [lots, setLots] = useState<DealerLot[]>(FALLBACK_LOTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLots() {
      if (!isSupabaseConfigured) {
        setLots(FALLBACK_LOTS);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('dealer_lots')
          .select('*')
          .order('arrival_date', { ascending: false });

        if (!error && data && data.length > 0) {
          setLots(data as DealerLot[]);
        } else {
          setLots(FALLBACK_LOTS);
        }
      } catch {
        setLots(FALLBACK_LOTS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLots();
  }, []);

  return { lots, isLoading };
}
