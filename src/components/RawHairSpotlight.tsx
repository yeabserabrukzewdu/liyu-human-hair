import React from 'react';
import { CheckCircle2, Shield, Eye, ArrowRight, Package } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const RawHairSpotlight: React.FC = () => {
  const { openProductModal } = useStore();
  const rawBlondeProduct = PRODUCTS.find((p) => p.id === 'liyu-raw-hair') || PRODUCTS[6];

  return (
    <section id="raw-hair-section" className="py-24 bg-[#F5F0E6] border-y border-[#E2DBD0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#648443] font-semibold mb-3">
            Raw Hair Spotlight
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1B2017] tracking-tight mb-4">
            100% Single Donor Raw Hair
          </h2>
          <p className="text-sm sm:text-base text-[#55604E] font-light leading-relaxed">
            Raw hair is natural hair cut directly from a single donor's ponytail with all cuticles facing the same way. It is never dipped in silicone and never processed with harsh acids. Soft, thick, and lasts over 3 years.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Interactive Spotlight on Raw Blondes */}
          <div className="relative group bg-white border border-[#DDD5C7] overflow-hidden rounded-xs shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
              <img
                src={rawBlondeProduct.images[0]}
                alt="Raw Hair Blondes"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#2B3D1E] border border-[#95B373]/40 font-bold rounded-xs flex items-center gap-1.5">
                <Package className="w-3 h-3" />
                Sold as 1 Bundle
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#95B373] font-bold">
                  Raw Hair
                </span>
                <span className="font-serif text-xl text-[#1B2017] font-semibold">$86 USD (1 Bundle)</span>
              </div>

              <h3 className="text-2xl font-serif text-[#1B2017] mb-2">{rawBlondeProduct.name}</h3>
              <p className="text-xs text-[#5C6656] font-light leading-relaxed mb-6">
                Pure single-donor raw hair with intact cuticles. Available in Ash Blonde, Mushroom Blonde, and Blonde in 20 inches. Sold as 1 bundle.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 pt-4 border-t border-[#EFEAE0]">
                <div className="bg-[#FAF7F2] p-3 text-center border border-[#DDD5C7] rounded-xs">
                  <span className="text-[10px] text-[#6E7868] block uppercase font-medium">Length</span>
                  <span className="text-sm font-mono text-[#1B2017] font-bold">20 Inches</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 text-center border border-[#DDD5C7] rounded-xs">
                  <span className="text-[10px] text-[#6E7868] block uppercase font-medium">Weight</span>
                  <span className="text-sm font-mono text-[#1B2017] font-bold">~100 Grams</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 text-center border border-[#DDD5C7] rounded-xs">
                  <span className="text-[10px] text-[#6E7868] block uppercase font-medium">Lifespan</span>
                  <span className="text-sm font-mono text-[#1B2017] font-bold">3+ Years</span>
                </div>
              </div>

              <button
                onClick={() => openProductModal(rawBlondeProduct)}
                className="w-full py-3.5 bg-[#95B373] text-white hover:bg-[#82A260] text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-xs shadow-sm"
              >
                <span>Select Color & Buy Bundle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Technical Anatomy of Raw Cuticle Hair in Simple English */}
          <div className="space-y-6">
            <div className="bg-white border border-[#DDD5C7] p-6 sm:p-8 rounded-xs shadow-md">
              <h4 className="text-sm uppercase tracking-[0.2em] text-[#1B2017] font-bold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#95B373]" />
                Why Choose Raw Hair?
              </h4>

              <div className="space-y-4 text-xs text-[#525D4C] font-light leading-relaxed">
                <div className="flex items-start gap-3 pb-3 border-b border-[#EFEAE0]">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block">Cuticles Face One Direction</strong>
                    Because the cuticles run naturally in the same direction, the hair never tangles or knots.
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-[#EFEAE0]">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block">Single Donor Hair</strong>
                    Each bundle comes from one person, giving you consistent texture and fullness from root to tip.
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-[#EFEAE0]">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block">Easy to Bleach, Dye, and Style</strong>
                    Since the hair has no chemical coating, it takes hair dye beautifully and handles curling irons easily.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block">Long-Lasting Value</strong>
                    With simple washing and conditioning, your bundles will stay soft and luxurious for over 3 years.
                  </div>
                </div>
              </div>
            </div>

            {/* Sold as 1 bundle reminder card */}
            <div className="bg-[#FAF7F2] border border-[#95B373] p-5 rounded-xs">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-[#95B373]" />
                <div>
                  <h5 className="text-xs uppercase tracking-wider font-bold text-[#1B2017]">
                    Important Note: Sold as 1 Bundle
                  </h5>
                  <p className="text-xs text-[#55604E] mt-0.5">
                    All prices are for 1 bundle. Most customers buy 2 to 3 bundles for a natural install, or 3 to 4 bundles for extra fullness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
