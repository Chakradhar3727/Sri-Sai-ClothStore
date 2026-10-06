import React from 'react';
import { FESTIVE_COLORWAYS, SilkColorway } from '@/types/silk.types';

interface Props {
  selectedColorway: SilkColorway;
  onSelectColorway: (colorway: SilkColorway) => void;
}

export const SilkColorwaySelector: React.FC<Props> = ({
  selectedColorway,
  onSelectColorway,
}) => {
  return (
    <div className="inline-flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 rounded-full bg-black/60 px-4 py-2 sm:py-2.5 backdrop-blur-2xl border border-dasara-gold/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
      {/* Title & Active Weave Indicator */}
      <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-dasara-gold/90 sm:border-r sm:border-dasara-gold/20 sm:pr-3.5">
        <span className="text-dasara-gold text-xs">✦</span>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-zinc-400">WEAVE PALETTE</span>
        <span className="hidden md:inline text-dasara-goldLight font-serif font-medium normal-case tracking-normal text-xs ml-1">
          {selectedColorway.name}
        </span>
      </div>

      {/* Circular Jewel Swatches */}
      <div className="flex items-center gap-3">
        {FESTIVE_COLORWAYS.map((swatch) => {
          const isSelected = selectedColorway.id === swatch.id;

          return (
            <div key={swatch.id} className="relative group">
              <button
                type="button"
                onClick={() => onSelectColorway(swatch)}
                aria-label={`Select ${swatch.name}`}
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] transition-all duration-300 cursor-pointer focus:outline-none ${
                  isSelected
                    ? 'scale-115 ring-2 ring-dasara-gold ring-offset-2 ring-offset-[#0E0C0F] shadow-[0_0_18px_rgba(212,175,55,0.65)]'
                    : 'hover:scale-105 ring-1 ring-dasara-gold/25 ring-offset-1 ring-offset-[#0E0C0F]/60 hover:ring-dasara-gold/70'
                }`}
              >
                {/* Metallic Liquid Gold Ring Bezel */}
                <div className="w-full h-full rounded-full p-[1px] bg-gradient-to-tr from-[#9B7126] via-[#F7E7A9] to-[#7A5013]">
                  {/* Gemstone Core with Silk Lustre */}
                  <div
                    className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center shadow-inner"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${swatch.sheenColor} 0%, ${swatch.baseColor} 70%, #000000 100%)`,
                    }}
                  >
                    {/* Gem Refraction Glint */}
                    <div className="absolute top-0.5 inset-x-1 h-2 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                    {/* Active Golden Core Dot */}
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-dasara-goldLight shadow-[0_0_6px_#FFF] animate-pulse" />
                    )}
                  </div>
                </div>
              </button>

              {/* Tooltip with Weave Name & Subtitle */}
              <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-30 whitespace-nowrap">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-black/90 px-3 py-1 text-[11px] font-medium text-dasara-goldLight border border-dasara-gold/40 backdrop-blur-md shadow-xl flex items-center gap-1.5">
                    <span className="font-serif tracking-wide">{swatch.name}</span>
                    <span className="text-[9px] text-zinc-400 font-sans">({swatch.subtitle})</span>
                  </div>
                  {/* Subtle downwards caret */}
                  <div className="w-1.5 h-1.5 bg-black/90 border-r border-b border-dasara-gold/40 transform rotate-45 -mt-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
