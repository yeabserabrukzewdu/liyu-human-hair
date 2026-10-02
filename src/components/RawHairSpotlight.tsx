import React, { useState } from 'react';
import { CheckCircle2, Shield, Eye, ArrowRight, Package, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const RawHairSpotlight: React.FC = () => {
  const { openProductModal } = useStore();
  const [activeTab, setActiveTab] = useState<'double' | 'super'>('double');

  const doubleDonorProducts = PRODUCTS.filter((p) => p.donorCategory === 'Double Donor');
  const superDoubleDonorProducts = PRODUCTS.filter((p) => p.donorCategory === 'Super Double Donor');

  return (
    <section id="donor-guide-section" className="py-24 bg-[#F5F0E6] border-y border-[#E2DBD0] relative overflow-hidden">
      <div id="raw-hair-section" className="sr-only">Hair Quality Guide</div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#648443] font-semibold mb-3">
            Hair Quality & Fullness Guide
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1B2017] tracking-tight mb-4">
            Double Donors vs Super Double Donors
          </h2>
          <p className="text-sm sm:text-base text-[#55604E] font-light leading-relaxed">
            Discover our premium human hair collections crafted with cuticles aligned in one direction. Compare root-to-tip fullness and authentic regional hair origins. All items listed with 1 piece price.
          </p>

          {/* Interactive Toggle Switch */}
          <div className="mt-8 inline-flex p-1 bg-[#EAE3D5] rounded-xs border border-[#DDD5C7] shadow-inner">
            <button
              onClick={() => setActiveTab('double')}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-bold rounded-xs transition-all cursor-pointer ${
                activeTab === 'double'
                  ? 'bg-[#1B2017] text-white shadow-sm'
                  : 'text-[#55604E] hover:text-[#1B2017]'
              }`}
            >
              Double Donors (85%–90% Equal)
            </button>
            <button
              onClick={() => setActiveTab('super')}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-bold rounded-xs transition-all cursor-pointer ${
                activeTab === 'super'
                  ? 'bg-[#95B373] text-white shadow-sm'
                  : 'text-[#55604E] hover:text-[#1B2017]'
              }`}
            >
              Super Double Donors (100% Equal)
            </button>
          </div>
        </div>

        {/* Dynamic Display based on Selected Grade */}
        {activeTab === 'double' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left Specification Card */}
            <div className="lg:col-span-5 bg-white border border-[#DDD5C7] p-6 sm:p-8 rounded-xs shadow-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EFEAE0]">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#95B373] font-bold block">
                    Hair Category
                  </span>
                  <h3 className="text-2xl font-serif text-[#1B2017] font-medium">
                    Double Donors
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-[#95B373]/15 text-[#2B3E1F] text-xs font-bold font-mono rounded-xs">
                  85%–90% Fullness
                </span>
              </div>

              <div className="space-y-4 text-xs text-[#525D4C] leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block text-sm">
                      85%–90% Equal Length Top-to-Bottom
                    </strong>
                    From root to tip, 85% to 90% of all hair strands are identical in length, giving a naturally voluminous flow with tapered realism.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block text-sm">
                      Brazilian Human Hair Origin
                    </strong>
                    Sourced exclusively as 100% genuine Brazilian human hair, renowned for softness, body, and versatile movement.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block text-sm">
                      Signature Hair Textures
                    </strong>
                    Includes our bestselling <strong>Wave</strong>, <strong>Deep Frizz</strong>, and <strong>Burmese</strong> collections.
                  </div>
                </div>
              </div>

              {/* 1 Piece Price Notice */}
              <div className="p-4 bg-[#FAF7F2] border border-[#95B373] rounded-xs flex items-center gap-3">
                <Package className="w-5 h-5 text-[#95B373] shrink-0" />
                <div className="text-xs text-[#525D4C]">
                  <strong className="text-[#1B2017] block font-semibold">1 Piece Price Shown</strong>
                  All prices are per piece (~100 grams). 2 to 3 pieces recommended for full installs.
                </div>
              </div>
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {doubleDonorProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => openProductModal(prod)}
                  className="bg-white border border-[#DDD5C7] hover:border-[#95B373] p-4 rounded-xs transition-all duration-200 cursor-pointer shadow-sm group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xs bg-[#FAF7F2] mb-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-[#FAF7F2]/90 backdrop-blur-sm text-[#2B3E1F] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs border border-[#DDD5C7]">
                        Brazil · 85–90%
                      </span>
                    </div>

                    <h4 className="font-serif text-sm font-medium text-[#1B2017] group-hover:text-[#648443] transition-colors line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-[#6A7563] mt-0.5 line-clamp-1">
                      {prod.shortDescription}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#EFEAE0] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#1B2017]">
                        ${prod.basePrice} - ${prod.maxPrice}
                      </span>
                      <span className="text-[10px] text-[#2B3E1F] block font-semibold">
                        1 piece price
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#95B373] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Select →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left Specification Card */}
            <div className="lg:col-span-5 bg-white border border-[#DDD5C7] p-6 sm:p-8 rounded-xs shadow-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EFEAE0]">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#95B373] font-bold block">
                    Hair Category
                  </span>
                  <h3 className="text-2xl font-serif text-[#1B2017] font-medium">
                    Super Double Donors
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-[#95B373] text-white text-xs font-bold font-mono rounded-xs shadow-xs">
                  100% Equal Length
                </span>
              </div>

              <div className="space-y-4 text-xs text-[#525D4C] leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block text-sm">
                      100% Equal Length from Top to Bottom
                    </strong>
                    From top to bottom, 100% of all hair strands are equal length. Zero short hairs, providing full maximum density all the way down to the tips.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block text-sm">
                      Vietnamese Human Hair Origin
                    </strong>
                    Sourced as 100% authentic Vietnamese human hair, celebrated internationally for its silky strength, natural luster, and blunt cut fullness.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B2017] font-semibold block text-sm">
                      Signature Hair Textures
                    </strong>
                    Includes our iconic <strong>Pixie</strong>, <strong>Fumi</strong>, and <strong>Ocean Wave</strong> collections.
                  </div>
                </div>
              </div>

              {/* 1 Piece Price Notice */}
              <div className="p-4 bg-[#FAF7F2] border border-[#95B373] rounded-xs flex items-center gap-3">
                <Package className="w-5 h-5 text-[#95B373] shrink-0" />
                <div className="text-xs text-[#525D4C]">
                  <strong className="text-[#1B2017] block font-semibold">1 Piece Price Shown</strong>
                  All prices are per piece (~100 grams). Dense ends allow maximum fullness with fewer pieces.
                </div>
              </div>
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {superDoubleDonorProducts.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => openProductModal(prod)}
                  className="bg-white border border-[#DDD5C7] hover:border-[#95B373] p-4 rounded-xs transition-all duration-200 cursor-pointer shadow-sm group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xs bg-[#FAF7F2] mb-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-[#95B373] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                        Vietnam · 100%
                      </span>
                    </div>

                    <h4 className="font-serif text-sm font-medium text-[#1B2017] group-hover:text-[#648443] transition-colors line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-[#6A7563] mt-0.5 line-clamp-1">
                      {prod.shortDescription}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#EFEAE0] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#1B2017]">
                        ${prod.basePrice} - ${prod.maxPrice}
                      </span>
                      <span className="text-[10px] text-[#2B3E1F] block font-semibold">
                        1 piece price
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#95B373] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Select →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

