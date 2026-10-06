import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Award } from 'lucide-react';
import { SareeProduct } from '@/types/product.types';

interface SareeSpecTabsProps {
  product: SareeProduct;
}

export const SareeSpecTabs: React.FC<SareeSpecTabsProps> = ({ product }) => {
  // Loom & interlock resolution
  const loomInterlock =
    product.weaveSpecs?.loomType ||
    (product.category === 'Kanchi Pattu'
      ? 'Pit Loom Korvai 3-Shuttle Interlock'
      : product.category === 'Banarasi Silk'
      ? 'Kadwa Jacquard Draw Loom Weave'
      : product.category === 'Organza'
      ? 'Ultra-Fine Slanted Handloom Weave'
      : 'Artisanal Handloom Interlock Weave');

  const threadCount = product.weaveSpecs?.threadCountWarpWeft || '120s Warp × 140s Weft Double Ply';
  const warpComp = product.weaveSpecs?.warpComposition || 'Pure Mulberry Cultivated Silk';
  const weftComp = product.weaveSpecs?.weftComposition || 'High-Twist Silk & Tested Zari Filaments';
  const interlockTech = product.weaveSpecs?.interlockTechnique || 'Hand-Interlocking Shuttle Technique';

  const weavingDays = product.weaveSpecs?.approxDaysOnLoom
    ? `${product.weaveSpecs.approxDaysOnLoom} Days on Loom`
    : product.category === 'Kanchi Pattu' || product.category === 'Banarasi Silk'
    ? '14 – 22 Days per Single Saree'
    : '8 – 14 Days per Saree';

  const weight = product.puritySpecs?.approxSareeWeightGrams
    ? `~${product.puritySpecs.approxSareeWeightGrams}g`
    : product.category === 'Kanchi Pattu' || product.category === 'Banarasi Silk'
    ? '~680g – 740g (Heavy Bridal Fall Class A)'
    : product.category === 'Organza'
    ? '~380g – 440g (Featherweight Gossamer Drape)'
    : '~520g – 600g (Festive Comfort Fall)';

  const zariRating =
    product.puritySpecs?.zariPurityRating ||
    (product.zariType.toLowerCase().includes('tested') || product.zariType.toLowerCase().includes('gold')
      ? 'Tested 2G Silver-Gilt Core with 24K Gold Flash'
      : 'Pure Metallic Resham & Electroplated Shimmer');

  const silkRegNumber = product.puritySpecs?.silkMarkRegNumber || `SM-IN-2024-${product.sku}`;
  const silkType = product.puritySpecs?.silkType || (product.isSilkMarkCertified ? '100% Pure Natural Mulberry Silk' : 'Handloom Certified Pure Silk');
  const zariGrade = product.puritySpecs?.zariGrade || product.zariType;

  const blouseType = product.stylingSpecs?.blouseType || (product.blouseDetails.toLowerCase().includes('contrast') ? 'Contrast' : 'Running');
  const blouseLength = product.stylingSpecs?.blouseLengthMeters ? `${product.stylingSpecs.blouseLengthMeters}m Cut Piece` : '0.8m Cut Piece';
  const sleeveBorder = product.stylingSpecs?.sleeveBorderWidthInches ? `${product.stylingSpecs.sleeveBorderWidthInches}" Zari Cuff Border` : '4.0" Zari Cuff Border';

  const necklines =
    product.stylingSpecs?.recommendedNecklines && product.stylingSpecs.recommendedNecklines.length > 0
      ? product.stylingSpecs.recommendedNecklines.join(' • ')
      : 'Deep Sweetheart, Royal Mandarin Collar, or Heritage U-Cut with Zari Sleeves';

  const jewelry =
    product.stylingSpecs?.recommendedJewelry && product.stylingSpecs.recommendedJewelry.length > 0
      ? product.stylingSpecs.recommendedJewelry.join(' • ')
      : 'Antique Kemp Vaddanam, Heritage Mango Mala & Temple Gold Jhumkas';

  const occasions =
    product.stylingSpecs?.auspiciousOccasions && product.stylingSpecs.auspiciousOccasions.length > 0
      ? product.stylingSpecs.auspiciousOccasions.join(', ')
      : 'Dasara Pooja, Vijayadashami Muhurtham, Festive Mandap & Weddings';

  return (
    <Tabs defaultValue="weave" className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weave">Weave & Loom</TabsTrigger>
        <TabsTrigger value="purity">Fabric & Zari</TabsTrigger>
        <TabsTrigger value="styling">Blouse & Styling</TabsTrigger>
      </TabsList>

      {/* TAB 1: WEAVE & LOOM ARCHITECTURE */}
      <TabsContent value="weave" className="space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Hub Origin:</span>
          <span className="font-semibold text-dasara-champagne flex items-center gap-1">
            📍 {product.provenance}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Loom & Architecture:</span>
          <span className="font-medium text-amber-300">{loomInterlock}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Interlock Technique:</span>
          <span className="text-zinc-300 font-medium text-right max-w-[60%] truncate">{interlockTech}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Warp & Weft Yarn:</span>
          <span className="text-zinc-300 text-right max-w-[65%] truncate">{warpComp} / {weftComp}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Thread Count Density:</span>
          <span className="font-mono text-zinc-300">{threadCount}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Consignment SKU:</span>
          <span className="font-mono text-zinc-300 font-semibold">{product.sku}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Artisan Weaving Time:</span>
          <span className="font-mono text-emerald-400">{weavingDays}</span>
        </div>
        <p className="text-zinc-300 text-xs leading-relaxed pt-1.5">{product.description}</p>
      </TabsContent>

      {/* TAB 2: FABRIC & ZARI PURITY */}
      <TabsContent value="purity" className="space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Silk Certification:</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-emerald-400" />
            {product.isSilkMarkCertified ? 'Silk Mark Certified (100% Pure Natural Silk)' : 'Handloom Certified Pure Weave'}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Silk Mark Reg. Code:</span>
          <span className="font-mono text-dasara-goldLight font-bold">{silkRegNumber}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Silk Classification:</span>
          <span className="font-medium text-dasara-champagne">{silkType}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Zari Specification & Grade:</span>
          <span className="font-medium text-amber-300">{zariGrade}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Fabric Composition:</span>
          <span className="font-medium text-dasara-champagne">{product.fabric}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Net Saree Weight:</span>
          <span className="font-mono text-zinc-300">{weight}</span>
        </div>
        <div className="flex justify-between items-center py-1.5">
          <span className="text-zinc-400">Zari Purity Assay:</span>
          <span className="font-mono text-dasara-gold font-bold">{zariRating}</span>
        </div>
      </TabsContent>

      {/* TAB 3: BLOUSE & STYLING CONSULTATION */}
      <TabsContent value="styling" className="space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Included Blouse Piece:</span>
          <span className="font-semibold text-emerald-400">{product.blouseDetails}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Blouse Cut & Sleeve Border:</span>
          <span className="font-medium text-amber-300">{blouseType} ({blouseLength} • {sleeveBorder})</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Recommended Neckline:</span>
          <span className="font-medium text-dasara-champagne">{necklines}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
          <span className="text-zinc-400">Jewelry Pairing:</span>
          <span className="font-medium text-amber-300">{jewelry}</span>
        </div>
        <div className="flex justify-between items-center py-1.5">
          <span className="text-zinc-400">Auspicious Occasion:</span>
          <span className="font-medium text-dasara-goldLight">{occasions}</span>
        </div>
      </TabsContent>
    </Tabs>
  );
};
