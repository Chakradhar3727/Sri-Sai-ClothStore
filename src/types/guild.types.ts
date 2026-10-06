export interface WeavingGuild {
  id: string;
  name: string;
  state: string;
  region: string;
  specialty: string;
  historicalEra: string;
  loomType: 'Pit Loom' | 'Frame Loom' | 'Draw Loom' | 'Slanted Handloom' | 'Specialized Loom';
  giTagYear: number | null;
  giTagNumber: string | null;
  avgWeavingDays: string;
  zariSpecification: string;
  silkGrade: string;
  signatureMotifs: string[];
  description: string;
  curatorNote: string;
  bannerImage: string;
  accentColor: string;
}

export interface LiveBookingEvent {
  id: string;
  customerCity: string;
  customerInitial: string;
  sareeName: string;
  sareeSku: string;
  actionType: 'whatsapp_trial' | 'direct_booking' | 'lot_unpacked';
  timestampMinutesAgo: number;
}
