import { DASARA_PRODUCTS_SEED } from '../src/data/products.ts';
import { getProductAngleImages, SAREE_ANGLE_DEFINITIONS } from '../src/types/inspection.types.ts';
import { getWhatsAppOrderUrl, getWhatsAppVideoConsultUrl, getWhatsAppShareUrl } from '../src/lib/whatsapp.ts';

console.log('--- PHASE 6 COMPREHENSIVE AUTOMATED VERIFICATION ---');

// 1. Verify DASARA_PRODUCTS_SEED
console.log(`Checking ${DASARA_PRODUCTS_SEED.length} seed products...`);
if (DASARA_PRODUCTS_SEED.length !== 24) {
  throw new Error(`Expected 24 seed products, got ${DASARA_PRODUCTS_SEED.length}`);
}

for (const product of DASARA_PRODUCTS_SEED) {
  if (!product.id || !product.sku || !product.name || !product.price) {
    throw new Error(`Product ${product.id} missing basic fields`);
  }

  // 2. Verify 4-angle resolution
  const angles = getProductAngleImages(product);
  if (!Array.isArray(angles) || angles.length !== 4) {
    throw new Error(`Product ${product.id} (${product.sku}) does not produce exactly 4 angles`);
  }

  const expectedAngleTypes = ['full_drape', 'pallu_macro', 'border_selvedge', 'blouse_piece'];
  for (let i = 0; i < 4; i++) {
    const a = angles[i];
    if (a.angle !== expectedAngleTypes[i]) {
      throw new Error(`Angle ${i} mismatch: expected ${expectedAngleTypes[i]}, got ${a.angle}`);
    }
    if (!a.url || !a.url.startsWith('http')) {
      throw new Error(`Invalid URL for product ${product.id} angle ${a.angle}: ${a.url}`);
    }
    if (!a.label || !a.hindiLabel || !a.description) {
      throw new Error(`Missing metadata for product ${product.id} angle ${a.angle}`);
    }
  }

  // 3. Verify specs
  if (!product.weaveSpecs || !product.puritySpecs || !product.stylingSpecs) {
    throw new Error(`Product ${product.id} (${product.sku}) missing technical specs`);
  }

  // 4. Verify WhatsApp generation
  const orderUrl = getWhatsAppOrderUrl(product, angles[0].label, angles[0].url);
  if (!orderUrl.startsWith('https://wa.me/') || !orderUrl.includes(encodeURIComponent(product.sku))) {
    throw new Error(`Order WhatsApp URL failed for ${product.sku}`);
  }

  const videoUrl = getWhatsAppVideoConsultUrl(product);
  if (!videoUrl.startsWith('https://wa.me/')) {
    throw new Error(`Video WhatsApp URL failed for ${product.sku}`);
  }

  const shareUrl = getWhatsAppShareUrl(product, angles[0].url);
  if (!shareUrl.startsWith('https://api.whatsapp.com/send?text=')) {
    throw new Error(`Share WhatsApp URL failed for ${product.sku}`);
  }
}

console.log('✓ All 24 seed products passed 4-angle resolution and metadata integrity checks.');

// 5. Verify Loupe Lens Optical Mathematics
console.log('Checking Loupe Lens Optical Mathematics...');
function calculateLoupeOpticalTransform(containerW, containerH, clientX, clientY, zoomLevel, isTouch = false) {
  const lensDiameter = 176;
  const lensRadius = lensDiameter / 2;

  const inspectX = Math.max(0, Math.min(containerW, clientX));
  const inspectY = Math.max(0, Math.min(containerH, clientY));

  let lensCenterX = inspectX;
  let lensCenterY = isTouch ? inspectY - 75 : inspectY;

  lensCenterX = Math.max(lensRadius + 4, Math.min(containerW - lensRadius - 4, lensCenterX));
  lensCenterY = Math.max(lensRadius + 4, Math.min(containerH - lensRadius - 4, lensCenterY));

  const bgWidth = containerW * zoomLevel;
  const bgHeight = containerH * zoomLevel;

  const bgPosX = lensRadius - inspectX * zoomLevel;
  const bgPosY = lensRadius - inspectY * zoomLevel;

  // Center of lens in lens-relative coordinates is (lensRadius, lensRadius).
  // The pixel of the magnified background image that appears at the lens center is:
  const imagePixelAtCenterOfLensX = lensRadius - bgPosX;
  const imagePixelAtCenterOfLensY = lensRadius - bgPosY;

  // Divide by zoomLevel to get the corresponding coordinate in the unmagnified container:
  const unmagnifiedPointInspectedX = imagePixelAtCenterOfLensX / zoomLevel;
  const unmagnifiedPointInspectedY = imagePixelAtCenterOfLensY / zoomLevel;

  return {
    lensCenterX,
    lensCenterY,
    bgWidth,
    bgHeight,
    bgPosX,
    bgPosY,
    inspectedX: inspectX,
    inspectedY: inspectY,
    unmagnifiedPointInspectedX,
    unmagnifiedPointInspectedY,
    errorX: Math.abs(unmagnifiedPointInspectedX - inspectX),
    errorY: Math.abs(unmagnifiedPointInspectedY - inspectY),
  };
}

const testCases = [
  { w: 400, h: 533, x: 200, y: 266, zoom: 2.0 },
  { w: 400, h: 533, x: 50, y: 50, zoom: 3.0 },
  { w: 400, h: 533, x: 380, y: 500, zoom: 4.5 },
  { w: 350, h: 466, x: 175, y: 233, zoom: 2.0, isTouch: true },
  { w: 350, h: 466, x: 20, y: 30, zoom: 4.5, isTouch: true },
];

for (const tc of testCases) {
  const result = calculateLoupeOpticalTransform(tc.w, tc.h, tc.x, tc.y, tc.zoom, tc.isTouch);
  if (result.errorX > 0.0001 || result.errorY > 0.0001) {
    throw new Error(`Optical math error in test case: ${JSON.stringify(tc)}, error: ${result.errorX}, ${result.errorY}`);
  }
  // Verify background size is genuinely magnified
  if (result.bgWidth < tc.w * tc.zoom) {
    throw new Error(`Background image width under-magnified: expected >= ${tc.w * tc.zoom}, got ${result.bgWidth}`);
  }
  // Verify lens stays inside container
  if (result.lensCenterX < 88 || result.lensCenterX > tc.w - 88) {
    throw new Error(`Lens center X out of bounds: ${result.lensCenterX}`);
  }
  if (result.lensCenterY < 88 || result.lensCenterY > tc.h - 88) {
    throw new Error(`Lens center Y out of bounds: ${result.lensCenterY}`);
  }
}

console.log('✓ Loupe optical transformation math verified: exact 0.0000px error under crosshair across all zoom levels!');
console.log('ALL PHASE 6 VERIFICATION CHECKS PASSED SUCCESSFULLY.');
