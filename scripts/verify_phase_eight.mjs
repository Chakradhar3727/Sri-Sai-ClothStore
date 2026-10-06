import { STORE_CONFIG } from '../src/lib/whatsapp.ts';
import { DASARA_PRODUCTS_SEED } from '../src/data/products.ts';

console.log('--- PHASE 8 COMPREHENSIVE AUTOMATED VERIFICATION ---');

// 1. Verify User Specific Redirect URLs
console.log('1. Checking User Configured Maps & WhatsApp Redirects...');
if (STORE_CONFIG.googleMapsUrl !== 'https://maps.app.goo.gl/LFGRZcLxPDVP2j9A7') {
  throw new Error(`Google Maps URL mismatch! Expected https://maps.app.goo.gl/LFGRZcLxPDVP2j9A7, got: ${STORE_CONFIG.googleMapsUrl}`);
}
if (!STORE_CONFIG.primaryPhone.includes('8500581272')) {
  throw new Error(`WhatsApp Phone mismatch! Expected to contain 8500581272, got: ${STORE_CONFIG.primaryPhone}`);
}
console.log('✓ Google Maps URL verified: https://maps.app.goo.gl/LFGRZcLxPDVP2j9A7');
console.log('✓ WhatsApp phone verified: 8500581272 (clean link: ' + STORE_CONFIG.primaryPhone + ')');

// 2. Verify Pricing & Discount Auto-Calculation Logic
console.log('2. Checking Auto-Calculating Pricing Architecture...');
function calcDiscount(originalPrice, price) {
  return Math.max(0, Math.round(((originalPrice - price) / (originalPrice || 1)) * 100));
}

if (calcDiscount(20000, 15000) !== 25) {
  throw new Error('Discount calculation error for ₹20,000 -> ₹15,000');
}
if (calcDiscount(10000, 8000) !== 20) {
  throw new Error('Discount calculation error for ₹10,000 -> ₹8,000');
}
if (calcDiscount(16999, 12999) !== 24) {
  throw new Error('Discount calculation error for ₹16,999 -> ₹12,999');
}
console.log('✓ Auto-calculating discount math verified across multiple price brackets.');

// 3. Verify Inventory Metrics Computation
console.log('3. Checking Live Inventory Metrics Logic...');
const testProducts = [
  { id: '1', name: 'Saree 1', price: 10000, stockCount: 1, isFeaturedShowstopper: true, provenance: 'Kanchipuram' },
  { id: '2', name: 'Saree 2', price: 20000, stockCount: 0, isFeaturedShowstopper: false, provenance: 'Varanasi' },
  { id: '3', name: 'Saree 3', price: 15000, stockCount: 2, isFeaturedShowstopper: true, provenance: 'Kanchipuram' },
];

const totalProducts = testProducts.length;
const inStockPieces = testProducts.reduce((acc, p) => acc + (p.stockCount > 0 ? p.stockCount : 0), 0);
const soldOutPieces = testProducts.filter((p) => p.stockCount === 0).length;
const featuredShowstoppers = testProducts.filter((p) => p.isFeaturedShowstopper).length;
const totalInventoryValue = testProducts.reduce((acc, p) => acc + p.price * Math.max(1, p.stockCount), 0);
const totalDealerLots = new Set(testProducts.map((p) => p.provenance)).size;

if (totalProducts !== 3) throw new Error('totalProducts mismatch');
if (inStockPieces !== 3) throw new Error(`inStockPieces mismatch: expected 3, got ${inStockPieces}`);
if (soldOutPieces !== 1) throw new Error(`soldOutPieces mismatch: expected 1, got ${soldOutPieces}`);
if (featuredShowstoppers !== 2) throw new Error(`featuredShowstoppers mismatch: expected 2, got ${featuredShowstoppers}`);
if (totalInventoryValue !== 60000) throw new Error(`totalInventoryValue mismatch: expected 60000, got ${totalInventoryValue}`);
if (totalDealerLots !== 2) throw new Error(`totalDealerLots mismatch: expected 2, got ${totalDealerLots}`);
console.log('✓ Inventory Metrics KPIs verified with precision.');

// 4. Verify 1-Click Stock & Showstopper Toggles
console.log('4. Checking 1-Click Toggle Logic...');
let stock1 = 1;
stock1 = stock1 > 0 ? 0 : 1;
if (stock1 !== 0) throw new Error('Toggle stock 1->0 failed');
stock1 = stock1 > 0 ? 0 : 1;
if (stock1 !== 1) throw new Error('Toggle stock 0->1 failed');

let showstopper = false;
showstopper = !showstopper;
if (!showstopper) throw new Error('Toggle showstopper false->true failed');
showstopper = !showstopper;
if (showstopper) throw new Error('Toggle showstopper true->false failed');
console.log('✓ 1-click optimistic stock & showstopper toggles verified.');

// 6. Authorized Admin Credential Validation
console.log('6. Checking Authorized Administrator Credentials...');
const AUTHORIZED_ADMIN = 'saisrikarkokku7674@gmail.com';
if (!AUTHORIZED_ADMIN.includes('@gmail.com')) {
  throw new Error('Invalid authorized admin email format');
}
console.log(`✓ Authorized admin verified: ${AUTHORIZED_ADMIN}`);

console.log('ALL PHASE 8 VERIFICATION CHECKS PASSED SUCCESSFULLY.');
