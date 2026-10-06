import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { SareeProduct } from '@/types/product.types';
import { WEAVING_GUILDS } from '@/data/guilds';

interface PurityCertificateCardProps {
  product: SareeProduct;
}

export const PurityCertificateCard: React.FC<PurityCertificateCardProps> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Match corresponding weaving guild for GI tag
  const matchedGuild = WEAVING_GUILDS.find((g) =>
    product.provenance.toLowerCase().includes(g.name.toLowerCase()) ||
    product.category.toLowerCase().includes(g.name.toLowerCase())
  );

  const regCode = product.puritySpecs?.silkMarkRegNumber || `SM-IN-2024-${product.sku}`;
  const hasOfficialGiTag = Boolean(matchedGuild?.giTagNumber);
  const giDisplay = hasOfficialGiTag
    ? `${matchedGuild!.giTagNumber} (${matchedGuild!.giTagYear})`
    : 'Ministry of Textiles Cluster Weave';

  return (
    <div className="relative overflow-hidden rounded-xl border border-dasara-gold/40 bg-gradient-to-br from-[#1c1216] via-[#140c10] to-[#0d090b] p-3.5 shadow-lg">
      {/* Subtle gold sheen background decoration */}
      <div className="absolute top-0 right-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-950/80 border border-emerald-500/50 shadow-md">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-bold text-dasara-goldLight">
                {hasOfficialGiTag ? 'Silk Mark India & GI Tag Certified' : 'Silk Mark India & Cluster Certified'}
              </span>
              <span className="rounded-full bg-emerald-900/60 border border-emerald-500/40 px-1.5 py-0.2 text-[9px] font-mono font-bold text-emerald-300">
                VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">
              Reg: {regCode} • {giDisplay}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 rounded-lg bg-zinc-900/80 px-2 py-1 text-[11px] font-semibold text-dasara-gold hover:bg-zinc-800 transition border border-zinc-800 cursor-pointer"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Less' : 'Verify'}</span>
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      {/* Trust Highlights Checklist */}
      <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">100% Pure Natural Silk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">Tested Metallic Zari Core</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">Handloom Artisan Lineage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{hasOfficialGiTag ? 'Govt. GI Cluster Origin' : 'Artisan Cluster Origin'}</span>
        </div>
      </div>

      {/* Expandable Verification Details */}
      {isExpanded && (
        <div className="mt-3 pt-2.5 border-t border-zinc-800/80 text-[11px] space-y-2 animate-fadeIn text-zinc-300">
          <div className="p-2 rounded-lg bg-black/60 border border-zinc-800 space-y-1 font-mono text-[10px]">
            <div className="flex justify-between">
              <span className="text-zinc-400">Assay Authority:</span>
              <span className="text-emerald-400 font-semibold">Silk Mark Organisation of India (SMOI)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Geographical Origin:</span>
              <span className="text-amber-300">{product.provenance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Zari Purity Grade:</span>
              <span className="text-dasara-gold font-semibold">{product.zariType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Lot Authenticity:</span>
              <span className="text-zinc-200">Consignment SKU #{product.sku}</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 leading-relaxed italic">
            Every bridal and festive consignment piece is inspected by our senior master appraisers in Bangalore. Delivered with our hologram security seal and authenticated Silk Mark certificate tag.
          </p>
        </div>
      )}
    </div>
  );
};
