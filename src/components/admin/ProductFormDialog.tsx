import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SareeProduct } from '@/types/product.types';
import { ProductFormData } from '@/types/admin.types';
import {
  UploadCloud,
  Smartphone,
  Camera,
  Video,
  Image as ImageIcon,
  Plus,
  Minus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Link as LinkIcon,
  PackageCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { uploadMultipleSareeImages } from '@/lib/imageUpload';
import { LiveCameraModal } from './LiveCameraModal';

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: SareeProduct | null;
  onSubmit: (formData: ProductFormData) => Promise<{ success: boolean; error?: string }>;
}

const DEFAULT_FORM: ProductFormData = {
  sku: '',
  name: '',
  category: 'Kanchi Pattu',
  provenance: 'Kanchipuram, Tamil Nadu',
  price: 12999,
  originalPrice: 16999,
  fabric: '100% Pure Mulberry Silk',
  zariType: 'Pure Gold Zari Weave',
  blouseDetails: '0.8m Contrast Blouse Piece Included',
  stockCount: 1,
  isDealerUnique: true,
  isSilkMarkCertified: true,
  isFeaturedShowstopper: false,
  isPublished: true,
  images: [],
  description: 'Handpicked masterweaver handloom masterpiece with rich temple borders and grand zari pallu.',
  color: 'Crimson Red',
};

const ANGLE_LABELS = [
  'Angle 1: Front Drape (Main)',
  'Angle 2: Pallu & Zari Detail',
  'Angle 3: Side & Border',
  'Angle 4: Opened / Full View',
  'Angle 5: Blouse & Back',
  'Angle 6: Fabric Texture Macro',
];

export const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Camera Viewfinder Modal State
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);

  // Uploading state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Separate refs for native phone camera and file picker
  const nativeCameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        sku: productToEdit.sku,
        name: productToEdit.name,
        category: productToEdit.category,
        provenance: productToEdit.provenance,
        lot_id: productToEdit.lot_id,
        price: productToEdit.price,
        originalPrice: productToEdit.originalPrice,
        fabric: productToEdit.fabric,
        zariType: productToEdit.zariType,
        blouseDetails: productToEdit.blouseDetails,
        stockCount: productToEdit.stockCount,
        isDealerUnique: productToEdit.isDealerUnique,
        isSilkMarkCertified: productToEdit.isSilkMarkCertified,
        isFeaturedShowstopper: productToEdit.isFeaturedShowstopper,
        isPublished: productToEdit.isPublished ?? true,
        images: productToEdit.images || [],
        description: productToEdit.description,
        color: productToEdit.color,
      });
    } else {
      setFormData({
        ...DEFAULT_FORM,
        sku: `SSC-${Math.floor(100 + Math.random() * 900)}`,
        images: [],
      });
    }
    setUploadError(null);
    setUrlInput('');
  }, [productToEdit, isOpen]);

  const discountPercent = Math.max(
    0,
    Math.round(((formData.originalPrice - formData.price) / (formData.originalPrice || 1)) * 100)
  );

  // File selection from PC or Mobile phone
  const handleFilesChosen = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress({ current: 0, total: files.length });

    const fileArray = Array.from(files);
    const { urls, errors } = await uploadMultipleSareeImages(
      fileArray,
      formData.sku || 'saree',
      formData.images.length,
      (current, total) => setUploadProgress({ current, total })
    );

    setIsUploading(false);
    setUploadProgress(null);

    if (urls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    }

    if (errors.length > 0) {
      setUploadError(`Some uploads had errors: ${errors.join(', ')}`);
    }

    // Reset inputs so user can pick or shoot again
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (nativeCameraInputRef.current) nativeCameraInputRef.current.value = '';
  };

  const handleLiveCameraPhotoCaptured = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const handleAddImageUrl = () => {
    const trimmed = urlInput.trim();
    if (trimmed) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, trimmed],
      }));
      setUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= formData.images.length) return;
    setFormData((prev) => {
      const copy = [...prev.images];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return { ...prev, images: copy };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      setUploadError('Please upload or click at least 1 photo for this saree.');
      return;
    }
    setIsSubmitting(true);
    setUploadError(null);
    try {
      const res = await onSubmit(formData);
      if (res && res.success) {
        onClose();
      } else {
        setUploadError(res?.error || 'Failed to save saree. Please check your internet connection.');
      }
    } catch (err: any) {
      console.error('Submit exception:', err);
      setUploadError(err.message || 'An error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent className="max-w-3xl w-full border border-dasara-gold/40 bg-[#0E0C0F] p-4 sm:p-6 text-white sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="font-serif text-xl sm:text-2xl font-bold text-dasara-champagne">
              {productToEdit ? 'Edit Saree Consignment' : 'Add New Saree (New Maal)'}
            </DialogTitle>
            <p className="text-xs text-zinc-400">
              Snap photos with your phone camera, set stock pieces & pricing, and save directly to live database.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-3 sm:mt-4 space-y-4">
            {/* Row 1: Name and SKU */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Saree Name / Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kanchipuram Pure Bridal Pattu in Royal Crimson"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-dasara-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Consignment SKU</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                  placeholder="e.g. SSC-KP-101"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase focus:border-dasara-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2: Category, Provenance, Color */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-dasara-gold focus:outline-none cursor-pointer"
                >
                  <option value="Kanchi Pattu">Kanchi Pattu</option>
                  <option value="Banarasi Silk">Banarasi Silk</option>
                  <option value="Organza">Organza</option>
                  <option value="Fancy Sarees">Fancy Sarees</option>
                  <option value="Partywear & Kurtis">Partywear & Kurtis</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Provenance / Hub</label>
                <input
                  type="text"
                  required
                  value={formData.provenance}
                  onChange={(e) => setFormData({ ...formData, provenance: e.target.value })}
                  placeholder="e.g. Kanchipuram, Tamil Nadu"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-dasara-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Color Shade</label>
                <input
                  type="text"
                  required
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g. Crimson Red"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-dasara-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Row 3: Pricing and Discount */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800">
              <div>
                <label className="text-xs font-semibold text-dasara-gold block mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  required
                  min={100}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-sm font-bold text-dasara-gold focus:border-dasara-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Original MRP (₹)</label>
                <input
                  type="number"
                  required
                  min={formData.price}
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-sm font-medium text-zinc-400 line-through focus:border-dasara-gold focus:outline-none"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-zinc-400 block">Festive Discount:</span>
                <span className="text-sm sm:text-base font-bold text-emerald-400">
                  {discountPercent}% OFF (Saves ₹{Math.max(0, formData.originalPrice - formData.price).toLocaleString('en-IN')})
                </span>
              </div>
            </div>

            {/* Row 4: Fabric, Zari, Blouse */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Fabric Composition</label>
                <input
                  type="text"
                  required
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-dasara-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Zari Specification</label>
                <input
                  type="text"
                  required
                  value={formData.zariType}
                  onChange={(e) => setFormData({ ...formData, zariType: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-dasara-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Blouse Piece</label>
                <input
                  type="text"
                  required
                  value={formData.blouseDetails}
                  onChange={(e) => setFormData({ ...formData, blouseDetails: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-dasara-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Row 5: Description */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Description / Artisan Note</label>
              <textarea
                rows={2}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-dasara-gold focus:outline-none resize-none"
              />
            </div>

            {/* ======================================================== */}
            {/* Row 6: STOCK AVAILABLE CONTROLS (EXPLICIT PIECES INPUT) */}
            {/* ======================================================== */}
            <div className="p-4 bg-zinc-950/90 rounded-2xl border border-dasara-gold/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <PackageCheck className="h-4 w-4 text-dasara-gold" />
                    <span>Stock Available (అందుబాటులో ఉన్న పీసులు)</span>
                  </label>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Enter the number of pieces physically in stock (e.g. 1 for single exclusive piece, 0 for sold out).
                  </p>
                </div>

                {/* Status Indicator Pill */}
                <div className="self-start sm:self-auto">
                  {formData.stockCount === 0 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 px-3 py-1 text-xs font-bold text-rose-300">
                      <XCircle className="h-3.5 w-3.5 text-rose-400" />
                      <span>Sold Out (స్టాక్ అయిపోయింది)</span>
                    </span>
                  ) : formData.stockCount === 1 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-950/80 border border-dasara-gold/50 px-3 py-1 text-xs font-bold text-dasara-goldLight">
                      <Sparkles className="h-3.5 w-3.5 text-dasara-gold" />
                      <span>Single Piece Only (ఒక్కటే పీస్ - 1-of-1)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 px-3 py-1 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{formData.stockCount} Pieces Available (స్టాక్ లో ఉన్నాయి)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Stepper Input & Quick Presets */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {/* Stepper with - / + */}
                <div className="flex items-center rounded-xl bg-black border border-zinc-800 p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => {
                        const next = Math.max(0, prev.stockCount - 1);
                        return {
                          ...prev,
                          stockCount: next,
                          ...(next === 1 ? { isDealerUnique: true } : {}),
                        };
                      })
                    }
                    className="h-8 w-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition cursor-pointer font-bold disabled:opacity-40"
                    disabled={formData.stockCount <= 0}
                    title="Decrease count"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <input
                    type="number"
                    min={0}
                    max={999}
                    value={formData.stockCount}
                    onChange={(e) => {
                      const val = Math.max(0, parseInt(e.target.value) || 0);
                      setFormData((prev) => ({
                        ...prev,
                        stockCount: val,
                        ...(val === 1 ? { isDealerUnique: true } : {}),
                      }));
                    }}
                    className="w-16 bg-transparent text-center text-sm font-bold font-mono text-dasara-gold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => {
                        const next = prev.stockCount + 1;
                        return {
                          ...prev,
                          stockCount: next,
                          ...(next === 1 ? { isDealerUnique: true } : {}),
                        };
                      })
                    }
                    className="h-8 w-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition cursor-pointer font-bold"
                    title="Increase count"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Quick 1-tap Preset Buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { label: '0 (Sold Out)', count: 0 },
                    { label: '1 (Single Piece)', count: 1 },
                    { label: '2 Pcs', count: 2 },
                    { label: '3 Pcs', count: 3 },
                    { label: '5 Pcs', count: 5 },
                    { label: '10 Pcs', count: 10 },
                  ].map((preset) => (
                    <button
                      key={preset.count}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          stockCount: preset.count,
                          ...(preset.count === 1 ? { isDealerUnique: true } : {}),
                        }))
                      }
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                        formData.stockCount === preset.count
                          ? 'bg-dasara-gold text-black border-dasara-gold shadow-md'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 7: Checkboxes (Unique, Silk Mark, Star Showstopper) */}
            <div className="flex flex-wrap items-center gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={formData.isDealerUnique}
                  onChange={(e) => setFormData({ ...formData, isDealerUnique: e.target.checked })}
                  className="rounded border-zinc-700 text-dasara-gold focus:ring-dasara-gold"
                />
                <span className="text-zinc-300">1-of-1 Exclusive (ఒక్కటే పీస్)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={formData.isSilkMarkCertified}
                  onChange={(e) => setFormData({ ...formData, isSilkMarkCertified: e.target.checked })}
                  className="rounded border-zinc-700 text-dasara-gold focus:ring-dasara-gold"
                />
                <span className="text-zinc-300">Silk Mark Certified</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={formData.isFeaturedShowstopper}
                  onChange={(e) => setFormData({ ...formData, isFeaturedShowstopper: e.target.checked })}
                  className="rounded border-zinc-700 text-dasara-gold focus:ring-dasara-gold"
                />
                <span className="text-amber-300 font-semibold flex items-center gap-1">
                  ★ Star (Feature in Top Unique Pieces)
                </span>
              </label>
            </div>

            {/* ======================================================== */}
            {/* Row 8: MULTI-ANGLE PHOTOGRAPHY & ON-THE-FLOW CAMERA */}
            {/* ======================================================== */}
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <label className="text-xs font-bold text-dasara-champagne flex items-center gap-1.5">
                    <Camera className="h-4 w-4 text-dasara-gold" />
                    <span>Saree Photos ({formData.images.length} uploaded)</span>
                  </label>
                  <p className="text-[11px] text-zinc-400">
                    Snap or upload multiple angles: Front drape, Pallu/Zari, Side border, Opened saree, and Blouse.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] text-zinc-400 hover:text-dasara-gold flex items-center gap-1 transition self-start sm:self-auto"
                >
                  <LinkIcon className="h-3 w-3" />
                  {showUrlInput ? 'Hide URL paste' : 'Or paste web link'}
                </button>
              </div>

              {/* Hidden native camera input for single-tap camera launch on mobile */}
              <input
                ref={nativeCameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFilesChosen(e.target.files)}
                className="hidden"
              />

              {/* Hidden multi-file input for selecting existing gallery photos */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFilesChosen(e.target.files)}
                className="hidden"
              />

              {/* High-Visibility Multi-Channel Upload Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* 1. Direct Phone Camera Snap */}
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => nativeCameraInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-950 via-[#0e3b2e] to-emerald-950 border border-emerald-500/50 hover:border-emerald-400 p-3 text-xs font-bold text-emerald-300 shadow-lg hover:shadow-emerald-900/40 transition cursor-pointer active:scale-98"
                >
                  <Camera className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>📸 Snap with Camera (ఫోటో తీయండి)</span>
                </button>

                {/* 2. In-App Continuous Live Camera Viewfinder */}
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setIsLiveCameraOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-dasara-maroon/90 via-[#3a1523] to-dasara-maroon/90 border border-dasara-gold/50 hover:border-dasara-gold p-3 text-xs font-bold text-dasara-goldLight shadow-lg hover:shadow-dasara-gold/20 transition cursor-pointer active:scale-98"
                >
                  <Video className="h-4 w-4 text-dasara-gold shrink-0" />
                  <span>🎥 Live Camera Viewfinder</span>
                </button>

                {/* 3. Phone Gallery or Computer Files */}
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 p-3 text-xs font-semibold text-zinc-200 hover:text-white transition cursor-pointer active:scale-98"
                >
                  <Smartphone className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>📁 Gallery / PC Files (గ్యాలరీ)</span>
                </button>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFilesChosen(e.dataTransfer.files);
                }}
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer ${
                  isDragging
                    ? 'border-dasara-gold bg-dasara-gold/10 scale-[1.01]'
                    : isUploading
                    ? 'border-dasara-gold/50 bg-black/60 pointer-events-none'
                    : 'border-zinc-800 hover:border-dasara-gold/60 bg-zinc-950/60 hover:bg-zinc-900/50'
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center py-2 space-y-2">
                    <Loader2 className="h-7 w-7 text-dasara-gold animate-spin" />
                    <span className="text-xs font-semibold text-dasara-goldLight">
                      Compressing & Uploading Photos... ({uploadProgress?.current || 0} of {uploadProgress?.total || 0})
                    </span>
                    <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-dasara-gold transition-all duration-300"
                        style={{
                          width: `${
                            uploadProgress ? (uploadProgress.current / uploadProgress.total) * 100 : 30
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <UploadCloud className="h-5 w-5 text-dasara-gold" />
                      <span className="text-xs">
                        Or drag & drop photos here directly
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500">
                      High resolution JPEG, PNG, WEBP supported • Auto-compressed for fast loading
                    </span>
                  </div>
                )}
              </div>

              {/* Upload Error Banner */}
              {uploadError && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Optional URL Paste Box */}
              {showUrlInput && (
                <div className="flex gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste high-res image link (https://...)"
                    className="flex-1 bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-dasara-gold focus:outline-none"
                  />
                  <Button
                    type="button"
                    onClick={handleAddImageUrl}
                    variant="outline"
                    className="text-xs border-zinc-700 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add URL
                  </Button>
                </div>
              )}

              {/* Multi-Angle Image Grid & Reordering Controls */}
              {formData.images.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>Photo Angle Sequence (Angle 1 is the main photo shown on storefront cards):</span>
                    <span className="font-mono text-dasara-gold font-bold">{formData.images.length} Angles</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {formData.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative flex flex-col rounded-xl border overflow-hidden bg-zinc-950 transition-all ${
                          idx === 0
                            ? 'border-dasara-gold ring-1 ring-dasara-gold/40 shadow-lg shadow-dasara-maroon/20'
                            : 'border-zinc-800'
                        }`}
                      >
                        {/* Image Thumbnail */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                          <img
                            src={img}
                            alt={`Angle ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                          {/* Angle Pill Badge */}
                          <div className="absolute top-1.5 left-1.5 rounded-md bg-black/85 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-bold text-dasara-goldLight border border-dasara-gold/30">
                            {idx === 0 ? '★ Main Front' : `Angle ${idx + 1}`}
                          </div>

                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1.5 right-1.5 h-6 w-6 rounded-md bg-rose-950/90 border border-rose-500/40 text-rose-300 flex items-center justify-center hover:bg-rose-900 transition cursor-pointer"
                            title="Remove this photo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Label & Order Controls */}
                        <div className="p-2 bg-zinc-900/90 flex flex-col gap-1 border-t border-zinc-800">
                          <span className="text-[10px] font-medium text-zinc-300 truncate">
                            {ANGLE_LABELS[idx] || `Angle ${idx + 1}`}
                          </span>

                          <div className="flex items-center justify-between pt-0.5">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveImage(idx, idx - 1)}
                              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 transition cursor-pointer"
                              title="Move Earlier (Higher Priority)"
                            >
                              <ChevronLeft className="h-3 w-3" />
                            </button>
                            <span className="text-[9px] font-mono text-zinc-500">#{idx + 1}</span>
                            <button
                              type="button"
                              disabled={idx === formData.images.length - 1}
                              onClick={() => handleMoveImage(idx, idx + 1)}
                              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 transition cursor-pointer"
                              title="Move Later"
                            >
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 text-center">
                  <ImageIcon className="h-6 w-6 text-zinc-600 mx-auto mb-1.5" />
                  <p className="text-xs text-zinc-400">
                    No photos added yet. Tap <strong>Snap with Camera</strong> or <strong>Live Camera</strong> or choose from gallery above.
                  </p>
                </div>
              )}
            </div>

            {/* Action Area Error Alert */}
            {uploadError && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 text-xs text-rose-200 shadow-md">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span className="font-medium leading-relaxed">{uploadError}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-3 border-t border-zinc-800">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={onClose}
                className="border-zinc-800 text-zinc-300 hover:text-white cursor-pointer w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="bg-dasara-gold hover:bg-dasara-goldLight text-black font-bold px-6 shadow-lg shadow-dasara-gold/20 cursor-pointer w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    Saving to Database...
                  </span>
                ) : isUploading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    Uploading Photos...
                  </span>
                ) : productToEdit ? (
                  'Save Changes'
                ) : (
                  'Publish Saree to Catalog'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Live Camera Viewfinder Modal */}
      <LiveCameraModal
        isOpen={isLiveCameraOpen}
        onClose={() => setIsLiveCameraOpen(false)}
        onPhotoCaptured={handleLiveCameraPhotoCaptured}
        sku={formData.sku || 'saree'}
        currentAnglesCount={formData.images.length}
      />
    </>
  );
};
