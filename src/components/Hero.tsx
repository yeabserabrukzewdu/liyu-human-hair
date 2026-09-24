import React from 'react';
import { ArrowDown, ShieldCheck, Flame, Truck, Award } from 'lucide-react';
import { Logo } from './Logo';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2]">
      {/* Editorial ambient background with soft sage warmth */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#95B373]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#E5DCCB]/40 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Official Liyu Hair Brand Emblem */}
        <div className="mb-6 flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
          <Logo size="xl" layout="full-picture" variant="light" />
        </div>

        {/* Main luxury headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight text-[#1B2017] mb-6 leading-[1.1] max-w-4xl">
          100% Real Human Hair <span className="font-semibold text-[#648443]">Bundles</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#555F4F] max-w-2xl font-light leading-relaxed mb-10 tracking-wide">
          Soft, natural, and long-lasting hair bundles from 10 inches to 28 inches. Each item is sold as 1 bundle. Safe to bleach, dye, and style with heat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#95B373] text-white hover:bg-[#82A260] font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 shadow-lg shadow-[#95B373]/25 flex items-center justify-center gap-2 group cursor-pointer rounded-xs"
          >
            <span>Shop Hair Bundles</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            id="hero-raw-hair-btn"
            onClick={() => {
              const el = document.getElementById('raw-hair-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-xs shadow-xs"
          >
            <span>Explore Raw Hair</span>
          </button>
        </div>

        {/* Luxury Trust Markers */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#E5DFD2] w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#95B373] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1B2017] font-semibold">100% Real Hair</h4>
              <p className="text-[11px] text-[#697262] mt-0.5">No synthetic hair or harsh chemicals</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-4 h-4 text-[#95B373] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1B2017] font-semibold">Cuticles in One Way</h4>
              <p className="text-[11px] text-[#697262] mt-0.5">Tangle-free, lasts over 2 years</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Flame className="w-4 h-4 text-[#95B373] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1B2017] font-semibold">Bleach & Heat Safe</h4>
              <p className="text-[11px] text-[#697262] mt-0.5">Safe to bleach to blonde, style with heat</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-4 h-4 text-[#95B373] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1B2017] font-semibold">Fast DHL Shipping</h4>
              <p className="text-[11px] text-[#697262] mt-0.5">Delivered in 2–4 days worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

