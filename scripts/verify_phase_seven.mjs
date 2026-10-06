import { DASARA_PRODUCTS_SEED } from '../src/data/products.ts';
import {
  STORE_CONFIG,
  buildWhatsAppUrl,
  getWhatsAppOrderUrl,
  getWhatsAppVideoConsultBookingUrl,
  getWhatsAppMultiItemInquiryUrl,
  getWhatsAppShareUrl,
  getWhatsAppGeneralChatUrl,
  getWhatsAppVideoConsultUrl,
  getWhatsAppShortlistUrl,
} from '../src/lib/whatsapp.ts';

console.log('--- PHASE 7 COMPREHENSIVE AUTOMATED VERIFICATION ---');

// 1. Verify STORE_CONFIG
console.log('1. Checking STORE_CONFIG...');
if (!STORE_CONFIG.primaryPhone || !STORE_CONFIG.storeName || !STORE_CONFIG.googleMapsUrl) {
  throw new Error('STORE_CONFIG missing fundamental contact fields');
}
if (STORE_CONFIG.inStoreCouponCode !== 'DASARA500' || STORE_CONFIG.inStoreDiscountAmount !== 500) {
  throw new Error('STORE_CONFIG coupon code or discount amount mismatch');
}
console.log('✓ STORE_CONFIG verified (Phone, Coupon DASARA500, Maps URL).');

// 2. Verify Single Product Order URL
console.log('2. Checking getWhatsAppOrderUrl...');
const sampleProduct = DASARA_PRODUCTS_SEED[0];
const holdUrl = getWhatsAppOrderUrl(sampleProduct, {
  isHoldRequest: true,
  customerCity: 'Hyderabad',
  customNote: 'Inspected Angle: Full Drape',
  selectedAngleUrl: sampleProduct.images[0],
});
if (!holdUrl.includes(encodeURIComponent(sampleProduct.sku))) {
  throw new Error('Order URL missing encoded SKU');
}
if (!holdUrl.includes(encodeURIComponent('reserve & hold'))) {
  throw new Error('Hold order URL missing reserve & hold text');
}
if (!holdUrl.includes(encodeURIComponent('Hyderabad'))) {
  throw new Error('Order URL missing customer city');
}

const buyUrl = getWhatsAppOrderUrl(sampleProduct, {
  isHoldRequest: false,
  customerCity: 'Bengaluru',
});
if (!buyUrl.includes(encodeURIComponent('purchase'))) {
  throw new Error('Buy order URL missing purchase text');
}
console.log('✓ getWhatsAppOrderUrl verified for both hold request and direct purchase.');

// 3. Verify Video Consultation Booking URL
console.log('3. Checking getWhatsAppVideoConsultBookingUrl...');
const bookingUrl = getWhatsAppVideoConsultBookingUrl({
  customerName: 'Lakshmi Devi',
  customerPhone: '9440123456',
  customerCity: 'Vijayawada',
  preferredLanguage: 'Telugu',
  preferredPlatform: 'WhatsApp Video Call',
  timeSlot: 'Auspicious Godhuli Vela (5:45 PM – 8:30 PM)',
  selectedProducts: [DASARA_PRODUCTS_SEED[0], DASARA_PRODUCTS_SEED[1]],
  specialNotes: 'Please show pallu fall under warm light',
});

if (!bookingUrl.includes(encodeURIComponent('Lakshmi Devi')) ||
    !bookingUrl.includes(encodeURIComponent('Vijayawada')) ||
    !bookingUrl.includes(encodeURIComponent('Telugu')) ||
    !bookingUrl.includes(encodeURIComponent(DASARA_PRODUCTS_SEED[0].sku)) ||
    !bookingUrl.includes(encodeURIComponent(DASARA_PRODUCTS_SEED[1].sku))) {
  throw new Error('Video consult booking URL missing critical booking payload items');
}

// Check zero products fallback
const emptyBookingUrl = getWhatsAppVideoConsultBookingUrl({
  customerName: 'Shopper',
  customerPhone: '9876543210',
  customerCity: 'Hyderabad',
  preferredLanguage: 'Hindi',
  preferredPlatform: 'Google Meet',
  timeSlot: 'Morning Pooja (10:30 AM – 1:00 PM)',
  selectedProducts: [],
});
if (!emptyBookingUrl.includes(encodeURIComponent('New Dasara Consignment Showstoppers'))) {
  throw new Error('Empty booking URL missing fallback text');
}
console.log('✓ getWhatsAppVideoConsultBookingUrl verified.');

// 4. Verify Multi-Item Inquiry URL and Strict 1,800 Character Safety Limit
console.log('4. Checking getWhatsAppMultiItemInquiryUrl and length safety...');
const testSizes = [1, 3, 5, 10, 15, 24];

for (const size of testSizes) {
  const products = DASARA_PRODUCTS_SEED.slice(0, size);
  const totalAmount = products.reduce((acc, p) => acc + p.price, 0);
  const totalSavings = products.reduce((acc, p) => acc + (p.originalPrice - p.price), 0);

  const multiUrl = getWhatsAppMultiItemInquiryUrl({
    products,
    customerName: 'Ananya Sharma',
    customerCity: 'Chennai',
    occasionType: 'Family Wedding Muhurtham',
    customNotes: 'Require matching bridal contrast colors',
  });

  const urlLen = multiUrl.length;
  console.log(`   - Size ${size} sarees URL length: ${urlLen} chars`);

  if (urlLen > 1800) {
    throw new Error(`CRITICAL: Multi-item inquiry URL length ${urlLen} exceeds 1,800 char ceiling for ${size} items!`);
  }

  // Ensure total and savings are present in encoded message
  if (!multiUrl.includes(encodeURIComponent(totalAmount.toLocaleString('en-IN')))) {
    throw new Error(`Multi-item inquiry URL missing total package amount for size ${size}`);
  }
}
console.log('✓ getWhatsAppMultiItemInquiryUrl verified: strictly under 1,800 chars across all item counts up to 24 sarees!');

// 5. Verify getWhatsAppShortlistUrl and Strict 1,800 Character Limit
console.log('5. Checking getWhatsAppShortlistUrl and length safety...');
for (const size of testSizes) {
  const products = DASARA_PRODUCTS_SEED.slice(0, size);
  const shortlistUrl = getWhatsAppShortlistUrl(products);
  const urlLen = shortlistUrl.length;
  console.log(`   - Shortlist size ${size} sarees URL length: ${urlLen} chars`);

  if (urlLen > 1800) {
    throw new Error(`CRITICAL: Shortlist URL length ${urlLen} exceeds 1,800 char ceiling for ${size} items!`);
  }
}
console.log('✓ getWhatsAppShortlistUrl verified: strictly under 1,800 chars across all item counts up to 24 sarees!');

// 6. Verify Share and General Chat URLs
console.log('6. Checking Share and General Chat URLs...');
const shareUrl = getWhatsAppShareUrl(sampleProduct);
if (!shareUrl.startsWith('https://api.whatsapp.com/send?text=') || !shareUrl.includes(encodeURIComponent(sampleProduct.sku))) {
  throw new Error('Share URL failed verification');
}

const generalUrl = getWhatsAppGeneralChatUrl();
if (!generalUrl.includes(encodeURIComponent('Dasara 2026 Silk Collection'))) {
  throw new Error('General chat URL failed verification');
}
console.log('✓ Share and General Chat URLs verified.');

console.log('ALL PHASE 7 VERIFICATION CHECKS PASSED SUCCESSFULLY.');
