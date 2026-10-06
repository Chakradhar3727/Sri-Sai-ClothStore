export type SareeCategory = 
  | 'All'
  | 'Kanchi Pattu' 
  | 'Banarasi Silk' 
  | 'Organza' 
  | 'Fancy Sarees' 
  | 'Partywear & Kurtis';

export type SortOption = 
  | 'featured'
  | 'price-low'
  | 'price-high'
  | 'discount'
  | 'newest';

export interface DealerLot {
  id: string;
  lot_code: string;
  dealer_name: string;
  origin_hub: string;
  arrival_date: string;
  total_pieces: number;
  notes?: string | null;
}

export interface SareeProduct {
  id: string;
  sku: string;
  name: string;
  category: Exclude<SareeCategory, 'All'>;
  provenance: string;
  lot_id?: string | null;
  price: number;
  originalPrice: number;
  discountPercent: number;
  fabric: string;
  zariType: string;
  blouseDetails: string;
  stockCount: number;
  isDealerUnique: boolean;
  isSilkMarkCertified: boolean;
  isFeaturedShowstopper: boolean;
  images: string[];
  description: string;
  color: string;
  isPublished?: boolean;
  createdAt?: string;
  angleImages?: import('./inspection.types').SareeAngleImage[];
  weaveSpecs?: Partial<import('./inspection.types').TechnicalWeaveSpecs>;
  puritySpecs?: Partial<import('./inspection.types').PurityZariSpecs>;
  stylingSpecs?: Partial<import('./inspection.types').BlouseStylingSpecs>;
}

export interface CatalogFilterState {
  category: SareeCategory;
  originHub: string;
  sortBy: SortOption;
  searchQuery: string;
  onlyUniquePieces: boolean;
  inStockOnly: boolean;
  selectedColor?: string;
}

