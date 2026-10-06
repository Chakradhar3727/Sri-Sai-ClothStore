import React from 'react';
import { WeavingGuild } from '@/types/guild.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Award, Clock, Sparkles, ShieldCheck, Layers, BookOpen } from 'lucide-react';

interface Props {
  guild: WeavingGuild | null;
  isOpen: boolean;
  onClose: () => void;
  onFilterByGuild: (guildName: string) => void;
}

export const GuildExplorerModal: React.FC<Props> = ({
  guild,
  isOpen,
  onClose,
  onFilterByGuild,
}) => {
  if (!guild) return null;

  // Format Zari specifications concisely for the technical spec badge
  const getZariLabel = (zari: string) => {
    if (zari.includes('2G/3G')) return '2G/3G Tested Zari';
    if (zari.includes('0.65%')) return '0.65% Pure Gold Zari';
    if (zari.includes('Dual Gold')) return 'Dual Gold & Silver Resham';
    if (zari.includes('Solid Tested')) return 'Solid Tested Temple Zari';
    if (zari.includes('Tested Silver-Gold')) return 'Tested Silver-Gold Wire';
    if (zari.includes('Silver Base')) return 'Pure Silver-Gold Plate';
    if (zari.includes('Champagne Gold')) return 'Champagne Gold Wire';
    if (zari.includes('Temple Zari') || zari.includes('High-Density')) return 'Temple Density Zari';
    if (zari.includes('Antique Gold')) return 'Antique Gold Threading';
    if (zari.includes('Dull Gold')) return 'Antique Dull Gold';
    if (zari.includes('Resham Highlights')) return 'Gold Resham Highlights';
    if (zari.includes('Accent Zari')) return 'Subtle Accent Zari';
    return zari.split(',')[0];
  };

  // Format Silk Grade standards dynamically from guild metadata
  const getSilkLabel = (grade: string) => {
    if (grade.includes('Silk Mark Certified')) return 'Silk Mark Certified';
    if (grade.includes('Katan Mulberry')) return 'Pure Katan Silk';
    if (grade.includes('Wild') || grade.includes('Tussar')) return '100% Wild Tussar';
    if (grade.includes('Cotton')) return 'Pure Silk-Cotton';
    if (grade.includes('Tissue') || grade.includes('Blends')) return 'Fine Tissue Blend';
    if (grade.includes('Crepe')) return 'Pure Natural Crepe';
    if (grade.includes('Double Warp')) return 'Double-Warp Pure Silk';
    if (grade.includes('Double Ikat') || grade.includes('Cultivated')) return '6-Ply Cultivated Silk';
    if (grade.includes('Filature')) return 'Filature Pure Silk';
    if (grade.includes('120-Count')) return '120-Count Pure Silk';
    return '100% Pure Handloom';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-3xl border border-dasara-gold/50 bg-gradient-to-br from-[#1A0E15] via-[#120B10] to-[#0E0C0F] p-5 sm:p-7 text-white sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-dasara-maroon/90 border border-dasara-gold/40 px-3 py-1 text-xs font-semibold text-dasara-goldLight">
              <Award className="h-3.5 w-3.5 text-dasara-gold" />
              <span>GI Certified Artisan Cluster</span>
            </span>
            {guild.giTagYear && (
              <span className="rounded-full bg-black/60 border border-dasara-gold/30 px-2.5 py-0.5 text-xs text-amber-300 font-mono">
                GI Tag: {guild.giTagYear} ({guild.giTagNumber || 'Verified'})
              </span>
            )}
            <span className="text-xs text-zinc-400 font-sans">
              📍 {guild.region}, {guild.state}
            </span>
          </div>

          <DialogTitle className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
            The {guild.name} Master Weavers Guild
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-zinc-300 font-sans mt-1">
            {guild.historicalEra}
          </DialogDescription>
        </DialogHeader>

        {/* Guild Banner Visual */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-dasara-gold/30 my-4 bg-zinc-950">
          <img
            src={guild.bannerImage}
            alt={guild.name}
            className="h-full w-full object-cover object-top"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120B10] via-black/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-mono text-dasara-gold uppercase tracking-widest font-semibold">
                Signature Craft
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-white">
                {guild.specialty}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Craft Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-4">
          <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Layers className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Loom Type</span>
            </div>
            <span className="font-serif text-sm font-semibold text-dasara-champagne block truncate">
              {guild.loomType}
            </span>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Clock className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Weaving Time</span>
            </div>
            <span className="font-serif text-sm font-semibold text-dasara-champagne block truncate">
              {guild.avgWeavingDays}
            </span>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 p-3" title={guild.zariSpecification}>
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Sparkles className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Zari Purity</span>
            </div>
            <span className="font-serif text-xs sm:text-sm font-semibold text-dasara-champagne block truncate">
              {getZariLabel(guild.zariSpecification)}
            </span>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 p-3" title={guild.silkGrade}>
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <ShieldCheck className="h-3.5 w-3.5 text-dasara-gold" />
              <span>Silk Standard</span>
            </div>
            <span className="font-serif text-xs sm:text-sm font-semibold text-emerald-400 block truncate">
              {getSilkLabel(guild.silkGrade)}
            </span>
          </div>
        </div>

        {/* Narrative Description & Motifs */}
        <div className="space-y-3.5 my-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          <p>{guild.description}</p>
          <div className="rounded-2xl border border-dasara-gold/30 bg-dasara-maroon/20 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-dasara-gold font-serif font-bold text-xs uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              <span>Curator Provenance Guarantee</span>
            </div>
            <p className="text-zinc-300 text-xs">
              {guild.curatorNote}
            </p>
          </div>

          {/* Signature Motifs Badges */}
          <div>
            <span className="text-xs font-semibold text-zinc-400 block mb-2">
              Signature Motifs Handwoven in this Guild:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {guild.signatureMotifs.map((motif, i) => (
                <span
                  key={i}
                  className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs text-dasara-champagne font-medium"
                >
                  ✦ {motif}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-3 border-t border-zinc-800">
          <Button
            variant="gold"
            className="flex-1 py-6 text-sm font-bold shadow-xl cursor-pointer"
            onClick={() => {
              onFilterByGuild(guild.name);
              onClose();
            }}
          >
            <span>Explore All {guild.name} Sarees in Storefront</span>
          </Button>

          <Button
            variant="outline"
            className="border-zinc-700 hover:border-zinc-500 text-zinc-300 py-6 text-sm cursor-pointer"
            onClick={onClose}
          >
            Close Explorer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
