import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SareeAngleImage } from '@/types/inspection.types';

interface MultiAngleGalleryProps {
  angleImages: SareeAngleImage[];
  selectedAngleIndex: number;
  onSelectAngle: (index: number) => void;
}

export const MultiAngleGallery: React.FC<MultiAngleGalleryProps> = ({
  angleImages,
  selectedAngleIndex,
  onSelectAngle,
}) => {
  const currentAngle = angleImages[selectedAngleIndex] || angleImages[0];
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePrev = () => {
    onSelectAngle((selectedAngleIndex - 1 + angleImages.length) % angleImages.length);
  };

  const handleNext = () => {
    onSelectAngle((selectedAngleIndex + 1) % angleImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current && e.changedTouches.length > 0) {
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div
      className="flex flex-col gap-2.5"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Angle Selector Tabs */}
      <div
        role="tablist"
        aria-label="Saree Inspection Angles"
        className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950/80 border border-zinc-800/80 overflow-x-auto scrollbar-none"
      >
        {angleImages.map((item, idx) => {
          const isSelected = selectedAngleIndex === idx;
          return (
            <button
              key={`${item.angle}-${idx}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`${item.label} (${item.hindiLabel}) angle`}
              onClick={() => onSelectAngle(idx)}
              className={`flex-1 min-w-[70px] flex flex-col items-center justify-center py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-dasara-maroon to-dasara-deepCrimson text-dasara-goldLight border border-dasara-gold/50 shadow-md ring-1 ring-dasara-gold/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <span className="text-[11px] font-bold tracking-tight truncate w-full">
                {item.label}
              </span>
              <span className="text-[9px] text-zinc-400 font-serif opacity-80 truncate w-full">
                {item.hindiLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Thumbnail Track with Angle Badges */}
      <div className="relative flex items-center">
        {angleImages.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-2 z-10 h-7 w-7 rounded-full bg-black/80 border border-zinc-700 text-white flex items-center justify-center hover:border-dasara-gold transition cursor-pointer shadow-md"
            aria-label="Previous angle"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div className="flex items-center gap-2.5 overflow-x-auto px-1 py-1 w-full scrollbar-none justify-start sm:justify-center">
          {angleImages.map((item, idx) => {
            const isSelected = selectedAngleIndex === idx;
            return (
              <button
                key={`${item.angle}-${idx}`}
                type="button"
                onClick={() => onSelectAngle(idx)}
                aria-label={`View ${item.label}`}
                className={`relative h-16 w-16 sm:h-18 sm:w-18 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-dasara-gold scale-105 shadow-[0_0_15px_rgba(212,175,55,0.45)] ring-1 ring-dasara-gold/60'
                    : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                }`}
              >
                <img src={item.url} alt={item.label} className="h-full w-full object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[9px] text-center font-mono py-0.5 text-zinc-300">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {angleImages.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-2 z-10 h-7 w-7 rounded-full bg-black/80 border border-zinc-700 text-white flex items-center justify-center hover:border-dasara-gold transition cursor-pointer shadow-md"
            aria-label="Next angle"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Optical Description of Active Angle */}
      <div className="rounded-lg bg-zinc-950/60 border border-zinc-900 px-3 py-1.5 text-xs text-zinc-300 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-dasara-gold shrink-0" />
        <span className="italic">{currentAngle.description}</span>
      </div>
    </div>
  );
};
