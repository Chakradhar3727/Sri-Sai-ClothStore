import React from 'react';
import { Flame, Clock } from 'lucide-react';

interface Props {
  totalPieces: number;
  claimedPieces: number;
}

export const StockScarcityBar: React.FC<Props> = ({ totalPieces, claimedPieces }) => {
  const safeTotal = Math.max(1, totalPieces);
  const percentageClaimed = Math.min(100, Math.max(0, Math.round((claimedPieces / safeTotal) * 100)));
  const remaining = Math.max(0, totalPieces - claimedPieces);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-dasara-gold/30 bg-black/60 p-4 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Festive Saree Stock (చీరల స్టాక్)
          </span>
          <span className="rounded-full bg-dasara-maroon px-2 py-0.5 text-[10px] font-bold text-white border border-dasara-gold/40">
            {percentageClaimed}% Claimed
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-dasara-gold font-mono">
          <Clock className="h-3.5 w-3.5" />
          <span>Only {remaining} Single Pieces Left (కేవలం {remaining} పీసులు మాత్రమే)</span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-dasara-maroon via-dasara-gold to-amber-400 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(212,175,55,0.5)]"
          style={{ width: `${percentageClaimed}%` }}
        />
      </div>
    </div>
  );
};
