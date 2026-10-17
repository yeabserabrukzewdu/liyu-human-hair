import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Check, 
  SlidersHorizontal, 
  Heart, 
  Plus, 
  Eye, 
  ShieldCheck, 
  Info, 
  Layers, 
  Scissors, 
  Clock, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductVariant } from '../types';

export const HairCollectionsPage: React.FC = () => {
  const { 
    products,
    productTypes,
    navigateToPage, 
    selectedCollectionDonor, 
    setSelectedCollectionDonor,
    selectedCollectionTexture,
    setSelectedCollectionTexture,
    openProductModal, 
    addToCart, 
    wishlist, 
    toggleWishlist 
  } = useStore();

  const [selectedLength, setSelectedLength] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'fullness'>('featured');
  const [selectedCardVariant, setSelectedCardVariant] = useState<Record<string, ProductVariant>>({});
  const [activeTab, setActiveTab] = useState<'catalog' | 'comparison' | 'calculator'>('catalog');

  // Available filters
  const textures = ['all', ...productTypes];
  const lengths = [14, 16, 18, 20, 22, 24, 26, 28, 30];

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Donor filter
      if (selectedCollectionDonor !== 'all') {
        if (product.donorCategory !== selectedCollectionDonor) return false;
      }

      // Texture filter
      if (selectedCollectionTexture !== 'all') {
        if (product.category !== selectedCollectionTexture) return false;
      }

      // Length filter
      if (selectedLength !== 'all') {
        const hasLength = product.variants.some((v) => v.length === selectedLength);
        if (!hasLength) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'fullness') {
        const aFull = a.donorCategory === 'Super Double Donor' ? 100 : 90;
        const bFull = b.donorCategory === 'Super Double Donor' ? 100 : 90;
        return bFull - aFull;
      }
      return 0; // featured default
    });
  }, [selectedCollectionDonor, selectedCollectionTexture, selectedLength, sortBy]);

  const getActiveVariant = (product: Product): ProductVariant => {
    return selectedCardVariant[product.id] || product.variants[0];
  };

  const handleVariantSelect = (productId: string, variant: ProductVariant) => {
    setSelectedCardVariant((prev) => ({
      ...prev,
      [productId]: variant,
    }));
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] min-h-screen text-[#1B2017]">
      {/* Editorial Page Top Header */}
      <section className="border-b border-[#E8E2D5] bg-[#F4EFE6]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#697462] mb-6">
            <button 
              onClick={() => navigateToPage('home')}
              className="hover:text-[#1B2017] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-[#BDB4A4]">/</span>
            <span className="text-[#1B2017] font-semibold">Hair Collections</span>
            {selectedCollectionDonor !== 'all' && (
              <>
                <span className="text-[#BDB4A4]">/</span>
                <span className="text-[#95B373] font-semibold">{selectedCollectionDonor}s</span>
              </>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#7E8B75] font-semibold block mb-3">
                The Atelier Collections
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1B2017] tracking-tight leading-tight">
                Hair Collections
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#56624F] font-light leading-relaxed">
                Discover our meticulously sorted human hair bundles. Featuring <strong className="text-[#1B2017] font-medium">Brazilian Double Donors</strong> (85%–90% equal length) and <strong className="text-[#1B2017] font-medium">Vietnamese Super Double Donors</strong> (100% equal length from root to tips). Each texture is transparently priced per 1 piece.
              </p>
            </div>

            {/* Quick Guarantees Hairline Panel */}
            <div className="border-l border-[#DDD5C7] pl-6 py-1 flex flex-col justify-center gap-2.5 text-xs text-[#38462E] shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#95B373]" />
                <span className="tracking-wide">100% Pure Human Hair Only</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#95B373]" />
                <span className="tracking-wide">1 Piece Price Beside Every Item</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#95B373]" />
                <span className="tracking-wide">Double Machine-Reinforced Wefts</span>
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs: Clean Editorial Underline */}
          <div className="flex items-center gap-8 mt-8 border-t border-[#E2DAD0] pt-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`py-2 text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
                activeTab === 'catalog'
                  ? 'border-[#1B2017] text-[#1B2017] font-bold'
                  : 'border-transparent text-[#6D7967] hover:text-[#1B2017] font-medium'
              }`}
            >
              Browse Catalog ({filteredProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`py-2 text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
                activeTab === 'comparison'
                  ? 'border-[#1B2017] text-[#1B2017] font-bold'
                  : 'border-transparent text-[#6D7967] hover:text-[#1B2017] font-medium'
              }`}
            >
              Fullness Ratio Guide (85% vs 100%)
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-2 text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
                activeTab === 'calculator'
                  ? 'border-[#1B2017] text-[#1B2017] font-bold'
                  : 'border-transparent text-[#6D7967] hover:text-[#1B2017] font-medium'
              }`}
            >
              Bundle Quantity Calculator
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* TAB 1: PRODUCT CATALOG */}
        {activeTab === 'catalog' && (
          <div>
            {/* Filter Bar Controls */}
            <div className="bg-white border border-[#DDD5C7] rounded-none p-5 sm:p-6 mb-8 shadow-xs space-y-5">
              {/* Row 1: Primary Donor Category Selector */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7C8875] font-semibold block mb-3">
                  Donor Fullness Classification
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedCollectionDonor('all')}
                    className={`p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedCollectionDonor === 'all'
                        ? 'border-[#1B2017] bg-[#1B2017] text-white shadow-xs'
                        : 'border-[#DDD5C7] bg-[#FAF7F2] text-[#2C3823] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-sm font-semibold tracking-wide">All Collections</span>
                        <span className={`text-[10px] font-mono uppercase ${selectedCollectionDonor === 'all' ? 'text-[#C9D6BD]' : 'text-[#7D8A75]'}`}>
                          7 Textures
                        </span>
                      </div>
                      <span className={`text-[11px] font-light leading-relaxed block ${selectedCollectionDonor === 'all' ? 'text-[#D7E0CF]' : 'text-[#6C7866]'}`}>
                        Complete atelier range across Brazil & Vietnam.
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedCollectionDonor('Double Donor')}
                    className={`p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedCollectionDonor === 'Double Donor'
                        ? 'border-[#1B2017] bg-[#1B2017] text-white shadow-xs'
                        : 'border-[#DDD5C7] bg-[#FAF7F2] text-[#2C3823] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-sm font-semibold tracking-wide">Double Donors</span>
                        <span className={`text-[10px] font-mono uppercase ${selectedCollectionDonor === 'Double Donor' ? 'text-[#C9D6BD]' : 'text-[#7D8A75]'}`}>
                          85%–90% Equal
                        </span>
                      </div>
                      <span className={`text-[11px] font-light leading-relaxed block ${selectedCollectionDonor === 'Double Donor' ? 'text-[#D7E0CF]' : 'text-[#6C7866]'}`}>
                        Brazilian Human Hair: Wave, Deep Frizz, and Burmese.
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedCollectionDonor('Super Double Donor')}
                    className={`p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedCollectionDonor === 'Super Double Donor'
                        ? 'border-[#1B2017] bg-[#1B2017] text-white shadow-xs'
                        : 'border-[#DDD5C7] bg-[#FAF7F2] text-[#2C3823] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-sm font-semibold tracking-wide">Super Double Donors</span>
                        <span className={`text-[10px] font-mono uppercase ${selectedCollectionDonor === 'Super Double Donor' ? 'text-[#C9D6BD]' : 'text-[#7D8A75]'}`}>
                          100% Equal
                        </span>
                      </div>
                      <span className={`text-[11px] font-light leading-relaxed block ${selectedCollectionDonor === 'Super Double Donor' ? 'text-[#D7E0CF]' : 'text-[#6C7866]'}`}>
                        Vietnamese Human Hair: Pixie, Fumi, and Ocean Wave.
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Row 2: Secondary Filters (Texture, Length, Sort) */}
              <div className="pt-3 border-t border-[#EAE3D6] flex flex-wrap items-center justify-between gap-4">
                {/* Texture filter pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#717C69] font-semibold mr-1">
                    Texture:
                  </span>
                  {textures.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedCollectionTexture(t)}
                      className={`px-3 py-1 text-xs transition-colors cursor-pointer border ${
                        selectedCollectionTexture === t
                          ? 'border-[#1B2017] bg-[#1B2017] text-white font-medium'
                          : 'border-[#DDD5C7] bg-[#FAF7F2] text-[#4A5742] hover:border-[#1B2017]'
                      }`}
                    >
                      {t === 'all' ? 'All Textures' : t}
                    </button>
                  ))}
                </div>

                {/* Length and Sort controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#717C69] font-semibold">
                      Length:
                    </span>
                    <select
                      value={selectedLength}
                      onChange={(e) => setSelectedLength(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                      className="bg-[#F2ECE0] text-xs text-[#2A3721] py-1 px-2.5 rounded-xs border border-[#D5CDBD] focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Lengths</option>
                      {lengths.map((len) => (
                        <option key={len} value={len}>
                          {len}" Inch
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#717C69] font-semibold">
                      Sort:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-[#F2ECE0] text-xs text-[#2A3721] py-1 px-2.5 rounded-xs border border-[#D5CDBD] focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured Textures</option>
                      <option value="price-asc">1 Piece Price: Low to High</option>
                      <option value="price-desc">1 Piece Price: High to Low</option>
                      <option value="fullness">Fullness (100% Super Double First)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notice Bar for Transparency */}
            <div className="bg-[#EBE5D8] border border-[#D5CCBA] rounded-xs px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#44503D]">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#95B373] shrink-0" />
                <span>
                  Showing <strong className="font-semibold text-[#1B2017]">{filteredProducts.length}</strong> styles. All prices displayed as <strong>1 piece price</strong> for complete transparency.
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#2A3721]">
                <span>✓ Brazil & Vietnam Direct</span>
                <span>•</span>
                <span>✓ Intact Cuticles</span>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#DDD5C7] rounded-xs">
                <p className="text-base text-[#56624F]">No hair collections match the selected filters.</p>
                <button
                  onClick={() => {
                    setSelectedCollectionDonor('all');
                    setSelectedCollectionTexture('all');
                    setSelectedLength('all');
                  }}
                  className="mt-4 px-5 py-2 bg-[#1B2017] text-white text-xs uppercase tracking-[0.2em] rounded-xs cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const activeVariant = getActiveVariant(product);
                  const isSaved = wishlist.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group bg-white border border-[#DDD5C7] rounded-xs overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-[#1B2017]/40 relative"
                    >
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {/* Donor Category & Fullness badge */}
                        <span className="px-2.5 py-0.5 bg-[#1B2017] text-white font-bold text-[9px] uppercase tracking-wide rounded-xs shadow-xs">
                          {product.donorCategory === 'Super Double Donor'
                            ? 'Super Double Donor · 100%'
                            : 'Double Donor · 85–90%'}
                        </span>

                        {/* Origin badge */}
                        <span className="px-2 py-0.5 bg-[#FAF7F2] text-[#2C3B22] border border-[#DDD5C7] font-semibold text-[8px] uppercase tracking-wider rounded-xs">
                          {product.donorCategory === 'Super Double Donor'
                            ? 'Vietnamese Human Hair'
                            : 'Brazilian Human Hair'}
                        </span>
                      </div>

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-xs rounded-full border border-[#DDD5C7] text-[#4A5741] hover:text-[#C53030] transition-colors cursor-pointer shadow-xs"
                        aria-label="Save to wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isSaved ? 'fill-[#C53030] text-[#C53030]' : 'text-[#4A5741]'
                          }`}
                        />
                      </button>

                      {/* Product Image */}
                      <div
                        onClick={() => openProductModal(product)}
                        className="relative aspect-4/5 overflow-hidden bg-[#FAF7F2] cursor-pointer"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Overlay quick view hover */}
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 bg-white/95 text-[#1B2017] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-md flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Product Info Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Texture Subtitle */}
                          <div className="text-[10px] uppercase tracking-[0.2em] text-[#717D6A] font-semibold mb-1">
                            {product.category} • {product.origin}
                          </div>

                          {/* Product Title */}
                          <h3
                            onClick={() => openProductModal(product)}
                            className="font-serif text-lg text-[#1B2017] group-hover:text-[#95B373] transition-colors cursor-pointer leading-tight mb-2"
                          >
                            {product.name}
                          </h3>

                          {/* Length selector on card */}
                          <div className="mb-3">
                            <span className="text-[10px] uppercase tracking-wider text-[#64715E] block mb-1">
                              Selected Length: <strong className="text-[#1B2017]">{activeVariant.length}"</strong>
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {product.variants.slice(0, 5).map((v) => (
                                <button
                                  key={v.id}
                                  onClick={() => handleVariantSelect(product.id, v)}
                                  className={`px-2 py-0.5 text-[10px] rounded-xs border transition-all cursor-pointer ${
                                    activeVariant.id === v.id
                                      ? 'border-[#1B2017] bg-[#1B2017] text-white font-bold'
                                      : 'border-[#DDD5C7] bg-[#FAF7F2] text-[#4A5542] hover:bg-[#EFE9DE]'
                                  }`}
                                >
                                  {v.length}"
                                </button>
                              ))}
                              {product.variants.length > 5 && (
                                <span className="text-[10px] text-[#7B8773] self-center ml-1">
                                  +{product.variants.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price and Action Section */}
                        <div className="pt-3 border-t border-[#EFE9DF] mt-2">
                          {/* Prominent 1 Piece Price Notice */}
                          <div className="flex items-baseline justify-between mb-3">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xl font-bold text-[#1B2017] font-mono">
                                ${activeVariant.price}
                              </span>
                              <span className="text-xs font-semibold uppercase tracking-wider text-[#2B3B20] bg-[#E3DFD5] px-1.5 py-0.5 rounded-xs">
                                1 piece price
                              </span>
                            </div>
                            <span className="text-[10px] text-[#73806C]">
                              {product.weightGrams}g
                            </span>
                          </div>

                          {/* Action Buttons: Quick Add 1 Piece & View */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => addToCart(product, activeVariant, 1)}
                              className="py-2.5 px-2 bg-[#1B2017] hover:bg-[#2F3A27] text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add 1 Piece</span>
                            </button>
                            <button
                              onClick={() => openProductModal(product)}
                              className="py-2.5 px-2 bg-[#FAF7F2] hover:bg-[#EFE9DE] border border-[#DDD5C7] text-[#2C3823] text-[11px] uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center transition-all cursor-pointer"
                            >
                              <span>Specs & Sizes</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DETAILED DOUBLE DONORS VS SUPER DOUBLE DONORS GUIDE */}
        {activeTab === 'comparison' && (
          <div className="space-y-10">
            {/* Guide Introduction Header */}
            <div className="bg-white border border-[#DDD5C7] rounded-xs p-6 sm:p-8 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#95B373] block mb-2">
                Hair Anatomy & Sourcing Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1B2017] mb-4">
                Double Donors (85%–90%) vs. Super Double Donors (100%)
              </h2>
              <p className="text-sm text-[#55634E] leading-relaxed max-w-4xl">
                In our atelier, we categorise human hair by donor equality and root-to-tip strand uniformity. 
                Whether you select our Brazilian Double Donors with natural movement or our Vietnamese Super Double Donors with extreme blunt ends, every single bundle is sold with complete transparency and listed with our exact 1 piece price.
              </p>
            </div>

            {/* Side-by-Side Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Double Donors (Brazil) */}
              <div className="bg-white border-2 border-[#C9C0B0] rounded-xs p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#2C3B22] text-white text-xs uppercase font-bold tracking-wider rounded-xs">
                      Double Donors
                    </span>
                    <span className="text-xs font-mono font-bold text-[#95B373]">
                      85%–90% Equal Length
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-[#1B2017] mb-2">
                    Brazilian Human Hair
                  </h3>
                  <p className="text-xs text-[#586450] mb-6 leading-relaxed">
                    Double donor hair retains natural layered taper: 85% to 90% of the strands extend to the absolute declared length, providing an effortless, flowing silhouette that mimics natural biological hair growth.
                  </p>

                  <div className="space-y-3.5 border-t border-[#EAE3D6] pt-5 text-xs">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2017] block">Featured Textures:</strong>
                        <span className="text-[#55634E]">Wave, Deep Frizz, Burmese Human Hair</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2017] block">Length Distribution:</strong>
                        <span className="text-[#55634E]">85%–90% equal strand length from root to hemline</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2017] block">Best Suited For:</strong>
                        <span className="text-[#55634E]">Effortless layers, voluminous deep frizz texture, soft flowing natural waves</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2017] block">Pricing Guarantee:</strong>
                        <span className="text-[#55634E]">Clear 1 piece price on every bundle without hidden fees</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[#EAE3D6]">
                  <button
                    onClick={() => {
                      setSelectedCollectionDonor('Double Donor');
                      setActiveTab('catalog');
                    }}
                    className="w-full py-3 bg-[#1B2017] hover:bg-[#2F3A27] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-colors cursor-pointer"
                  >
                    View Double Donors Collection
                  </button>
                </div>
              </div>

              {/* Card 2: Super Double Donors (Vietnam) */}
              <div className="bg-white border-2 border-[#1B2017] rounded-xs p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#1B2017] text-white text-xs uppercase font-bold tracking-wider rounded-xs">
                      Super Double Donors
                    </span>
                    <span className="text-xs font-mono font-bold text-[#95B373]">
                      100% Equal Length
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-[#1B2017] mb-2">
                    Vietnamese Human Hair
                  </h3>
                  <p className="text-xs text-[#586450] mb-6 leading-relaxed">
                    Super double donor hair is sorted strand by strand so that exactly 100% of all hairs reach the full terminal length from root to bottom. This delivers maximum density, solid heavy tips, and razor-sharp blunt fullness.
                  </p>

                  <div className="space-y-3.5 border-t border-[#EAE3D6] pt-5 text-xs">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2017] block">Featured Textures:</strong>
                        <span className="text-[#55634E]">Pixie, Fumi, Ocean Wave Human Hair</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2017] block">Length Distribution:</strong>
                        <span className="text-[#55634E]">100% equal strand length with zero thin or tapered strays</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2017] block">Best Suited For:</strong>
                        <span className="text-[#55634E]">Blunt bob cuts, high-density spiral curls (Fumi/Pixie), lush luxury cascading waves</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B2017] block">Pricing Guarantee:</strong>
                        <span className="text-[#55634E]">Full transparent 1 piece price displayed right next to item</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[#EAE3D6]">
                  <button
                    onClick={() => {
                      setSelectedCollectionDonor('Super Double Donor');
                      setActiveTab('catalog');
                    }}
                    className="w-full py-3 bg-[#95B373] hover:bg-[#82A060] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xs transition-colors cursor-pointer"
                  >
                    View Super Double Donors Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Summary Table */}
            <div className="bg-white border border-[#DDD5C7] rounded-xs overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#DDD5C7]">
                <h4 className="font-serif text-lg text-[#1B2017]">
                  Specification Matrix at a Glance
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F2ECE0] text-[#1B2017] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3 px-4 border-b border-[#DDD5C7]">Grade Attribute</th>
                      <th className="py-3 px-4 border-b border-[#DDD5C7]">Double Donors (Brazil)</th>
                      <th className="py-3 px-4 border-b border-[#DDD5C7]">Super Double Donors (Vietnam)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3D6] text-[#4F5B47]">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1B2017]">Strand Uniformity</td>
                      <td className="py-3 px-4">85% – 90% Equal Length</td>
                      <td className="py-3 px-4 font-medium text-[#2A3721]">100% Equal Length</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1B2017]">Country of Origin</td>
                      <td className="py-3 px-4">Brazil</td>
                      <td className="py-3 px-4">Vietnam</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1B2017]">Associated Textures</td>
                      <td className="py-3 px-4">Wave, Deep Frizz, Burmese</td>
                      <td className="py-3 px-4">Pixie, Fumi, Ocean Wave</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1B2017]">End Thickness</td>
                      <td className="py-3 px-4">Natural feathering at very tips</td>
                      <td className="py-3 px-4 font-medium text-[#2A3721]">Heavy, solid blunt hemline</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1B2017]">Pricing Presentation</td>
                      <td className="py-3 px-4">1 Piece Price Beside Amount</td>
                      <td className="py-3 px-4">1 Piece Price Beside Amount</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 1-PIECE BUNDLE INSTALL CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white border border-[#DDD5C7] rounded-xs p-6 sm:p-8 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#95B373] block mb-2">
                Professional Atelier Sizing
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1B2017] mb-3">
                1-Piece Bundle Installation Recommendation Guide
              </h2>
              <p className="text-sm text-[#55634E] leading-relaxed mb-6">
                Because all our hair is sold by individual pieces (each piece weighing 100g ± 3g), use this guide to calculate exactly how many 1-piece bundles you need for your desired length and installation fullness.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs">
                  <div className="font-mono text-lg font-bold text-[#1B2017] mb-1">12" – 16" Lengths</div>
                  <div className="text-xs text-[#95B373] font-bold uppercase tracking-wider mb-2">2 to 3 Pieces Needed</div>
                  <p className="text-xs text-[#63705C] leading-normal">
                    Shorter bundles have wider weft tracks. 2 to 3 pieces offer complete, voluminous coverage for bobs and collarbone styles.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#1B2017] rounded-xs">
                  <div className="font-mono text-lg font-bold text-[#1B2017] mb-1">18" – 22" Lengths</div>
                  <div className="text-xs text-[#95B373] font-bold uppercase tracking-wider mb-2">3 Pieces Needed</div>
                  <p className="text-xs text-[#63705C] leading-normal">
                    The classic standard. 3 pieces provide full density from root to waistline with natural movement.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs">
                  <div className="font-mono text-lg font-bold text-[#1B2017] mb-1">24" – 30" Lengths</div>
                  <div className="text-xs text-[#95B373] font-bold uppercase tracking-wider mb-2">3 to 4 Pieces Needed</div>
                  <p className="text-xs text-[#63705C] leading-normal">
                    Due to strand length, wefts are narrower. 4 pieces ensure thick, glamorous, ultra-dense results to the hip.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#EAE3D6] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#55634E]">
                  Ready to select your pieces? Switch back to our catalog or speak with an in-store specialist.
                </div>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-6 py-2.5 bg-[#1B2017] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs cursor-pointer"
                >
                  Shop 1-Piece Bundles
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
