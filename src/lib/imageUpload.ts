import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Compresses an image file in-browser before upload.
 * Reduces 5MB-15MB phone camera photos to ~200-350KB while retaining high visual crispness.
 */
export async function compressImage(
  file: File,
  maxWidth = 1600,
  maxHeight = 2000,
  quality = 0.85
): Promise<Blob> {
  return new Promise((resolve) => {
    // If browser doesn't support canvas or it's not an image, return raw file
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

/**
 * Uploads a single saree image to Supabase Storage bucket 'saree-images'.
 * Returns public CDN URL or throws error.
 */
export async function uploadSingleSareeImage(
  file: File,
  sku: string,
  angleIndex: number
): Promise<string> {
  if (!isSupabaseConfigured) {
    // If Supabase is not configured, create a local base64 Data URL for preview
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  // 1. Client-side compression
  const compressedBlob = await compressImage(file);

  // 2. Generate clean, unique filename
  const cleanSku = (sku || 'saree').replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  const filePath = `${cleanSku}-angle${angleIndex + 1}-${timestamp}-${randomSuffix}.jpg`;

  // 3. Upload to Supabase 'saree-images' bucket
  const { error } = await supabase.storage
    .from('saree-images')
    .upload(filePath, compressedBlob, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed for ${file.name}: ${error.message}`);
  }

  // 4. Retrieve public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('saree-images').getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Uploads multiple saree images sequentially with progress tracking.
 */
export async function uploadMultipleSareeImages(
  files: File[],
  sku: string,
  startIndex: number,
  onProgress?: (current: number, total: number) => void
): Promise<{ urls: string[]; errors: string[] }> {
  const urls: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, files.length);

    try {
      const url = await uploadSingleSareeImage(file, sku, startIndex + i);
      urls.push(url);
    } catch (err: any) {
      console.error(err);
      errors.push(err.message || `Failed to upload ${file.name}`);
    }
  }

  return { urls, errors };
}

/**
 * Uploads a raw camera Blob directly to Supabase Storage bucket 'saree-images'.
 * Allows seamless instant uploading from live camera viewfinder stream.
 */
export async function uploadBlobAsSareeImage(
  blob: Blob,
  sku: string,
  angleIndex: number
): Promise<string> {
  if (!isSupabaseConfigured) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  const cleanSku = (sku || 'saree').replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  const filePath = `${cleanSku}-camera${angleIndex + 1}-${timestamp}-${randomSuffix}.jpg`;

  const { error } = await supabase.storage
    .from('saree-images')
    .upload(filePath, blob, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error(`Camera photo upload failed: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('saree-images').getPublicUrl(filePath);

  return publicUrl;
}
