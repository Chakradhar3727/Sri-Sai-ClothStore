import React from 'react';
import { SilkColorway } from '@/types/silk.types';

interface Props {
  colorway: SilkColorway;
}

export const SilkExperienceBadge: React.FC<Props> = ({ colorway }) => {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="flex items-center gap-2 sm:gap-2.5 rounded-full bg-black/40 px-4 sm:px-5 py-1.5 text-xs text-zinc-300 backdrop-blur-xl border border-dasara-gold/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-dasara-gold/40 hover:bg-black/55 transition-all">
        {/* Subtle gold emblem */}
        <span className="text-dasara-gold text-xs select-none animate-pulse">✦</span>

        {/* Tactile interaction cue */}
        <span className="font-sans font-light tracking-wide text-zinc-300 text-[11px] sm:text-xs">
          Touch or drag to sway pure silk drape
        </span>

        {/* Separator */}
        <span className="text-dasara-gold/40 select-none">•</span>

        {/* Fabric Weight */}
        <span className="font-sans font-medium text-dasara-goldLight text-[11px] sm:text-xs tracking-wide">
          {colorway.gsm || 208} GSM Pure Mulberry Silk
        </span>
      </div>
    </div>
  );
};
