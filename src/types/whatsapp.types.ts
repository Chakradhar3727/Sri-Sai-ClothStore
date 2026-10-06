import { SareeProduct } from './product.types';

export type PreferredLanguage = 'Telugu' | 'Hindi' | 'English' | 'Tamil';

export type VideoPlatform = 'WhatsApp Video Call' | 'Google Meet';

export type TimeSlotCategory =
  | 'Morning Pooja (10:30 AM – 1:00 PM)'
  | 'Afternoon High Tea (2:30 PM – 5:00 PM)'
  | 'Auspicious Godhuli Vela (5:45 PM – 8:30 PM)';

export interface VideoConsultBooking {
  customerName: string;
  customerPhone: string;
  customerCity: string;
  preferredLanguage: PreferredLanguage;
  preferredPlatform: VideoPlatform;
  timeSlot: TimeSlotCategory;
  selectedProducts: SareeProduct[];
  specialNotes?: string;
}

export interface WhatsAppOrderPayload {
  product: SareeProduct;
  customerCity?: string;
  isHoldRequest?: boolean;
  selectedAngleUrl?: string;
  customNote?: string;
}

export interface MultiItemInquiryPayload {
  products: SareeProduct[];
  customerName?: string;
  customerCity?: string;
  occasionType?: string;
  customNotes?: string;
}

export interface StoreContactConfig {
  primaryPhone: string;
  displayPhone: string;
  storeName: string;
  storeAddress: string;
  googleMapsUrl: string;
  storeHours: string;
  inStoreCouponCode: string;
  inStoreDiscountAmount: number;
}
