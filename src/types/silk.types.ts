export interface SilkColorway {
  id: string;
  name: string;
  subtitle: string;
  weaveOrigin: string;
  baseColor: string;
  sheenColor: string;
  zariAccent: string;
  roughness: number;
  gsm: number; // Fabric weight in grams per square meter
}

export const FESTIVE_COLORWAYS: SilkColorway[] = [
  {
    id: 'kumkuma-crimson',
    name: 'Kumkuma Crimson',
    subtitle: 'Bridal Kanchipuram Pattu',
    weaveOrigin: 'Kanchipuram, Tamil Nadu',
    baseColor: '#6B0B24',
    sheenColor: '#F5D06E',
    zariAccent: '3-Ply Antique Temple Zari',
    roughness: 0.25,
    gsm: 218,
  },
  {
    id: 'peacock-teal',
    name: 'Peacock Teal',
    subtitle: 'Royal Banarasi Kadwa',
    weaveOrigin: 'Varanasi, Uttar Pradesh',
    baseColor: '#0A4B5C',
    sheenColor: '#F7E7A9',
    zariAccent: 'Dual Gold-Silver Resham',
    roughness: 0.28,
    gsm: 195,
  },
  {
    id: 'temple-gold',
    name: 'Temple Zari Gold',
    subtitle: 'Dharmavaram Double-Warp',
    weaveOrigin: 'Dharmavaram, Andhra Pradesh',
    baseColor: '#8C5A14',
    sheenColor: '#FFE082',
    zariAccent: 'Pure Tested Gold Brocade',
    roughness: 0.22,
    gsm: 230,
  },
  {
    id: 'rani-pink',
    name: 'Rani Rose Pink',
    subtitle: 'Paithani Mor Pallu',
    weaveOrigin: 'Paithani, Maharashtra',
    baseColor: '#8F1445',
    sheenColor: '#FFD54F',
    zariAccent: 'Peacock Feather Motif Weave',
    roughness: 0.26,
    gsm: 205,
  },
];
