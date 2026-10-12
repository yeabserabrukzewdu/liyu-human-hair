import React from 'react';
import { ArrowDown, ShieldCheck, Sparkles, Truck, Award } from 'lucide-react';
import { Logo } from './Logo';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#FAF7F2]">
      {/* Editorial ambient background with soft gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <img
          src="/landing.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/85 to-[#FAF7F2]" />
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
          Premium Brazilian & Vietnamese human hair bundles in Double Donor (85%–90% equal length) and Super Double Donor (100% equal length). All items listed with 1 piece price.
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
              const el = document.getElementById('donor-guide-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-xs shadow-xs"
          >
            <span>Donor Fullness Guide</span>
          </button>
        </div>

        {/* Landing Page Showcase Image with Simple Gradient */}
        <div className="w-full mt-12 sm:mt-14 relative group overflow-hidden border border-[#DDD5C7] rounded-xs shadow-xl bg-[#EAE2D5]">
          <div className="relative aspect-16/10 sm:aspect-16/9 lg:aspect-21/9 overflow-hidden">
            <img
              src="/landing.webp"
              alt="Liyu Human Hair Collection - Brazilian and Vietnamese Bundles"
              className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
              loading="eager"
            />
            {/* Simple gradient overlay across the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Understated luxury caption overlay */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white pointer-events-none text-left">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D0DEB5] font-semibold block mb-1">
                  The Atelier Campaign
                </span>
                <p className="font-serif text-base sm:text-xl font-medium text-white leading-tight drop-shadow-xs">
                  Brazilian & Vietnamese Pure Human Hair Bundles
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#FAF7F2]/80 font-mono">
                  Double & Super Double Donors · 1 Piece Price
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Luxury Trust Markers */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#E5DFD2] w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#95B373] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1B2017] font-semibold">100% Real Hair</h4>
              <p className="text-[11px] text-[#697262] mt-0.5">No synthetic hair or silicone coatings</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-4 h-4 text-[#95B373] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1B2017] font-semibold">Cuticles Aligned</h4>
              <p className="text-[11px] text-[#697262] mt-0.5">Unidirectional, tangle-free flow</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#95B373] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1B2017] font-semibold">Double & Super Double</h4>
              <p className="text-[11px] text-[#697262] mt-0.5">85%–90% & 100% equal length</p>
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

