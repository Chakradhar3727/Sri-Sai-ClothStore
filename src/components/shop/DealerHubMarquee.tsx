import React from 'react';

interface HubItem {
  name: string;
  state: string;
  specialty: string;
}

const WEAVER_HUBS: HubItem[] = [
  { name: 'Kanchipuram', state: 'Tamil Nadu', specialty: 'Pure Mulberry Silk & 3-Ply Zari' },
  { name: 'Varanasi', state: 'Uttar Pradesh', specialty: 'Katan Silk & Kadwa Weave' },
  { name: 'Dharmavaram', state: 'Andhra Pradesh', specialty: 'Broad Temple Border Silks' },
  { name: 'Gadwal', state: 'Telangana', specialty: 'Kuttu Weave Contrast Zari' },
  { name: 'Paithani', state: 'Maharashtra', specialty: 'Peacock Mor Pallu Weave' },
  { name: 'Surat', state: 'Gujarat', specialty: 'Contemporary Tissue & Foil Silk' },
  { name: 'Chanderi', state: 'Madhya Pradesh', specialty: 'Gossamer Silk Cotton & Buttas' },
  { name: 'Patola', state: 'Gujarat', specialty: 'Double Ikat Royal Geometric' },
  { name: 'Uppada', state: 'Andhra Pradesh', specialty: 'Pure Jamdani Featherweight' },
  { name: 'Pochampally', state: 'Telangana', specialty: 'Traditional Telia Ikat' },
  { name: 'Mysore Silk', state: 'Karnataka', specialty: 'Liquid Gold Crepe Zari' },
];

interface DealerHubMarqueeProps {
  activeHub?: string;
  onSelectHub?: (hubName: string) => void;
}

export const DealerHubMarquee: React.FC<DealerHubMarqueeProps> = ({
  activeHub,
  onSelectHub,
}) => {
  // Seamless loop with duplicated list
  const duplicatedList = [...WEAVER_HUBS, ...WEAVER_HUBS];

  return (
    <div className="relative w-full overflow-hidden py-2.5 sm:py-3 bg-black/60 border-y border-dasara-gold/15 backdrop-blur-md">
      {/* Subtle Luxury Edge Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#0E0C0F] via-[#0E0C0F]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#0E0C0F] via-[#0E0C0F]/90 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track with hover pause */}
      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] select-none">
        {duplicatedList.map((hub, idx) => {
          const isSelected = activeHub === hub.name;

          return (
            <div key={`${hub.name}-${idx}`} className="flex items-center">
              <button
                type="button"
                onClick={() => onSelectHub?.(isSelected ? 'All' : hub.name)}
                title={`Filter by ${hub.name} (${hub.specialty})`}
                className={`group flex items-center gap-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'rounded-full bg-dasara-gold/15 text-dasara-goldLight border border-dasara-gold/60 px-3.5 py-1 shadow-[0_0_12px_rgba(212,175,55,0.25)] scale-105'
                    : 'rounded-full px-2.5 py-1 text-zinc-400 hover:text-dasara-champagne border border-transparent hover:border-dasara-gold/25 hover:bg-white/[0.02]'
                }`}
              >
                <span className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium">
                  {hub.name}
                </span>
                <span className="text-[9px] tracking-wider font-light opacity-50 group-hover:opacity-80">
                  [{hub.state}]
                </span>
              </button>

              {/* Subtle Temple Gold Diamond Separator */}
              <span className="text-dasara-gold/50 text-[8px] sm:text-[9px] select-none pointer-events-none mx-3 sm:mx-4">
                ◆
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
