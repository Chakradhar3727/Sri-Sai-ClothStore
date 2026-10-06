import React, { useState } from 'react';
import { WEAVING_GUILDS } from '@/data/guilds';
import { WeavingGuild } from '@/types/guild.types';
import { MapPin, Award, ChevronRight, ArrowLeftRight } from 'lucide-react';

interface Props {
  activeHub: string;
  onSelectHub: (hubName: string) => void;
  onInspectGuild: (guild: WeavingGuild) => void;
}

export const WeavingGuildMarquee: React.FC<Props> = ({
  activeHub,
  onSelectHub,
  onInspectGuild,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const handleSelectGuild = (guildName: string) => {
    const isSelected =
      activeHub !== 'All' &&
      (activeHub.toLowerCase().includes(guildName.toLowerCase()) ||
        guildName.toLowerCase().includes(activeHub.toLowerCase()));
    
    onSelectHub(isSelected ? 'All' : guildName);
    
    // Smoothly scroll down to catalog section so user sees filtered collection
    const elem = document.getElementById('catalog-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderGuildCard = (guild: WeavingGuild, keyPrefix: string) => {
    const isSelected =
      activeHub !== 'All' &&
      (activeHub.toLowerCase().includes(guild.name.toLowerCase()) ||
        guild.name.toLowerCase().includes(activeHub.toLowerCase()));

    return (
      <div
        key={`${keyPrefix}-${guild.id}`}
        className={`group flex shrink-0 items-center gap-3.5 rounded-2xl p-2.5 pr-3.5 transition-all duration-300 border cursor-pointer select-none ${
          isSelected
            ? 'bg-dasara-maroon/95 border-dasara-gold text-white shadow-lg shadow-dasara-gold/25 scale-[1.03]'
            : 'bg-black/60 border-dasara-gold/20 hover:border-dasara-gold/60 text-zinc-300 hover:text-white backdrop-blur-md'
        }`}
      >
        {/* Guild Emblazonment & Hub Selector */}
        <button
          type="button"
          onClick={() => handleSelectGuild(guild.name)}
          className="flex items-center gap-3 text-left cursor-pointer"
          title={`Filter sarees by ${guild.name} guild`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-dasara-maroon to-zinc-900 border border-dasara-gold/40 text-dasara-gold shadow-md">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-sm font-bold tracking-wide text-dasara-champagne group-hover:text-dasara-gold transition-colors">
                {guild.name}
              </span>
              <span className="text-[10px] font-sans text-zinc-400">
                ({guild.state})
              </span>
              {guild.giTagYear && (
                <span className="inline-flex items-center gap-0.5 rounded bg-amber-950/80 px-1.5 py-0.5 text-[9px] font-semibold text-amber-300 border border-amber-600/30">
                  <Award className="h-2.5 w-2.5" /> GI
                </span>
              )}
            </div>
            <p className="text-[10px] text-zinc-400 font-mono tracking-tight line-clamp-1 max-w-[200px]">
              {guild.specialty}
            </p>
          </div>
        </button>

        {/* Inspect Guild Story Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInspectGuild(guild);
          }}
          className="ml-1 rounded-lg bg-dasara-gold/15 p-1.5 text-dasara-gold hover:bg-dasara-gold hover:text-black transition cursor-pointer"
          title={`Explore ${guild.name} Guild Legacy & GI Tag`}
          aria-label={`Explore ${guild.name} Guild Legacy`}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  };

  return (
    <div
      role="region"
      aria-label="Weaving Guild Marquee"
      className="relative w-full overflow-hidden py-3 bg-gradient-to-r from-dasara-maroon/40 via-zinc-950 to-dasara-deepCrimson/40 border-y border-dasara-gold/30 group/marquee"
    >
      {/* Edge Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0E0C0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0E0C0F] to-transparent z-10 pointer-events-none" />

      {/* Direction Toggle Control (Appears on Hover / Desktop) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center opacity-0 group-hover/marquee:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={() => setIsReversed((prev) => !prev)}
          className="rounded-full bg-black/80 border border-dasara-gold/40 px-2.5 py-1 text-[10px] font-mono font-semibold text-dasara-goldLight hover:bg-dasara-maroon/90 hover:border-dasara-gold transition flex items-center gap-1.5 shadow-xl backdrop-blur-md cursor-pointer"
          title="Toggle Marquee Direction"
        >
          <ArrowLeftRight className="h-3 w-3 text-dasara-gold" />
          <span>{isReversed ? 'Scroll Right' : 'Scroll Left'}</span>
        </button>
      </div>

      {/* Marquee Track with mathematically seamless dual flex containers */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`flex w-max items-center animate-marquee hover:[animation-play-state:paused] [animation-duration:45s] will-change-transform ${
          isPaused ? '[animation-play-state:paused]' : ''
        } ${isReversed ? '[animation-direction:reverse]' : ''}`}
      >
        {/* Set 1 */}
        <div className="flex items-center gap-5 sm:gap-6 pr-5 sm:pr-6 shrink-0">
          {WEAVING_GUILDS.map((guild) => renderGuildCard(guild, 's1'))}
        </div>

        {/* Set 2 (Identical duplicate for 100% glitch-free infinite looping) */}
        <div className="flex items-center gap-5 sm:gap-6 pr-5 sm:pr-6 shrink-0" aria-hidden="true">
          {WEAVING_GUILDS.map((guild) => renderGuildCard(guild, 's2'))}
        </div>
      </div>
    </div>
  );
};
