import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { Product, HairTexture, HairColor } from '../types';
import { PRODUCTS, COLOR_SWATCHES } from '../data/products';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const [selectedTexture, setSelectedTexture] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedLength, setSelectedLength] = useState<number | 'all'>('all');
  const [priceMax, setPriceMax] = useState<number>(110);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const textures: { label: string; value: string }[] = [
    { label: 'All Textures', value: 'all' },
    { label: 'Wave', value: 'Wave' },
    { label: 'Pixie', value: 'Pixie' },
    { label: 'Fumi', value: 'Fumi' },
    { label: 'Deep Frizz', value: 'Deep Frizz' },
    { label: 'Burmese', value: 'Burmese' },
    { label: 'Ocean Wave', value: 'Ocean Wave' },
    { label: 'Raw Hair', value: 'Raw Hair' },
  ];

  const colors: HairColor[] = [
    'Black',
    'Coffee Brown',
    'Half Coffee Brown',
    'Highlight',
    'Piano',
    'Burgundy',
    'Ash Blonde',
    'Mushroom Blonde',
    'Blonde',
  ];

  const lengths = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28];

  const activeFilterCount =
    (selectedTexture !== 'all' ? 1 : 0) +
    (selectedColor !== 'all' ? 1 : 0) +
    (selectedLength !== 'all' ? 1 : 0) +
    (priceMax < 110 ? 1 : 0);

  const resetFilters = () => {
    setSelectedTexture('all');
    setSelectedColor('all');
    setSelectedLength('all');
    setPriceMax(110);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Texture match
      if (selectedTexture !== 'all' && product.category !== selectedTexture) {
        return false;
      }
      // Color match
      if (selectedColor !== 'all' && !product.availableColors.includes(selectedColor as HairColor)) {
        return false;
      }
      // Length match
      if (selectedLength !== 'all' && !product.availableLengths.includes(selectedLength as number)) {
        return false;
      }
      // Price match (checks if any variant is <= priceMax)
      const minProductPrice = Math.min(...product.variants.map((v) => v.price));
      if (minProductPrice > priceMax) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.basePrice - b.basePrice;
      if (sortBy === 'price_high') return b.maxPrice - a.maxPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured (preserve catalog order)
      return a.catalogNumber - b.catalogNumber;
    });
  }, [selectedTexture, selectedColor, selectedLength, priceMax, sortBy]);

  return (
    <section id="catalog-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E5DFD2] gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#6A7563] font-bold mb-2">
            <span>Human Hair Shop</span>
            <span className="w-1 h-1 rounded-full bg-[#95B373]" />
            <span>100% Real Virgin & Raw Hair</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1B2017] tracking-tight">
            Human Hair Bundles
          </h2>
          <p className="text-sm text-[#5D6755] mt-1 font-light max-w-xl">
            Real human hair with cuticles aligned. Explore our 7 hair types, various lengths,
            and colors. Every item is sold as 1 bundle.
          </p>
        </div>

        {/* Quick Actions & Sorting */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Trigger */}
          <button
            id="filter-toggle-btn"
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-[#FAF7F2] text-[#1B2017] border border-[#DDD5C7] text-xs uppercase tracking-wider transition-colors shadow-xs rounded-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#95B373]" />
            <span className="font-semibold">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#95B373] text-white text-[9px] font-mono flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white hover:bg-[#FAF7F2] text-[#1B2017] border border-[#DDD5C7] px-3.5 py-2.5 pr-8 text-xs uppercase tracking-wider cursor-pointer focus:outline-none focus:border-[#95B373] transition-colors shadow-xs rounded-xs font-medium"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6A7563] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Texture Categories Horizontal Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {textures.map((t) => {
          const isActive = selectedTexture === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setSelectedTexture(t.value)}
              className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all rounded-xs cursor-pointer ${
                isActive
                  ? 'bg-[#95B373] text-white font-bold shadow-md shadow-[#95B373]/20'
                  : 'bg-white text-[#4A5543] hover:text-[#1B2017] border border-[#E0D9CB] hover:border-[#95B373]'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Expandable Filter Panel */}
      {isFilterDrawerOpen && (
        <div className="bg-white border border-[#E5DFD2] p-6 mb-8 rounded-xs shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-[#EFEAE0] mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#95B373]" />
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#1B2017] font-semibold">
                Refine Studio Selection
              </h3>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] text-[#6A7563] hover:text-[#1B2017] transition-colors"
              >
                <RotateCcw className="w-3 h-3 text-[#95B373]" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Color Filter */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#6A7563] block mb-2.5 font-bold">
                Hair Color Tone
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedColor('all')}
                  className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors ${
                    selectedColor === 'all'
                      ? 'bg-[#95B373] text-white font-semibold border-[#95B373]'
                      : 'bg-[#FAF7F2] text-[#475240] border-[#DDD5C7] hover:border-[#95B373]'
                  }`}
                >
                  All Colors
                </button>
                {colors.map((c) => {
                  const swatch = COLOR_SWATCHES[c];
                  const isSelected = selectedColor === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(isSelected ? 'all' : c)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-xs border transition-colors ${
                        isSelected
                          ? 'bg-[#95B373] text-white border-[#95B373] font-semibold'
                          : 'bg-[#FAF7F2] text-[#475240] border-[#DDD5C7] hover:border-[#95B373]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/30"
                        style={{ background: swatch?.bg || '#333333' }}
                      />
                      <span>{c}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Length Filter */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#6A7563] block mb-2.5 font-bold">
                Length Span (Inches)
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedLength('all')}
                  className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors ${
                    selectedLength === 'all'
                      ? 'bg-[#95B373] text-white font-semibold border-[#95B373]'
                      : 'bg-[#FAF7F2] text-[#475240] border-[#DDD5C7] hover:border-[#95B373]'
                  }`}
                >
                  All
                </button>
                {lengths.map((len) => {
                  const isSelected = selectedLength === len;
                  return (
                    <button
                      key={len}
                      onClick={() => setSelectedLength(isSelected ? 'all' : len)}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-xs border transition-colors ${
                        isSelected
                          ? 'bg-[#95B373] text-white font-bold border-[#95B373]'
                          : 'bg-[#FAF7F2] text-[#475240] border-[#DDD5C7] hover:border-[#95B373]'
                      }`}
                    >
                      {len}"
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-wider text-[#6A7563] font-bold">
                  Max Price
                </label>
                <span className="text-xs font-mono text-[#1B2017] font-bold">${priceMax} USD</span>
              </div>
              <input
                type="range"
                min="60"
                max="110"
                step="2"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#95B373] bg-[#EAE3D5] h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#6A7563] font-mono mt-1">
                <span>$60 (Fumi 10")</span>
                <span>$110 (Burmese 28")</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Tags Bar */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="text-xs text-[#6A7563] font-medium">Active filters:</span>
          {selectedTexture !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[#1B2017] text-xs border border-[#DDD5C7] font-medium shadow-2xs">
              Texture: {selectedTexture}
              <button onClick={() => setSelectedTexture('all')}>
                <X className="w-3 h-3 text-[#6A7563] hover:text-black cursor-pointer" />
              </button>
            </span>
          )}
          {selectedColor !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[#1B2017] text-xs border border-[#DDD5C7] font-medium shadow-2xs">
              Color: {selectedColor}
              <button onClick={() => setSelectedColor('all')}>
                <X className="w-3 h-3 text-[#6A7563] hover:text-black cursor-pointer" />
              </button>
            </span>
          )}
          {selectedLength !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[#1B2017] text-xs border border-[#DDD5C7] font-medium shadow-2xs">
              Length: {selectedLength}"
              <button onClick={() => setSelectedLength('all')}>
                <X className="w-3 h-3 text-[#6A7563] hover:text-black cursor-pointer" />
              </button>
            </span>
          )}
          {priceMax < 110 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[#1B2017] text-xs border border-[#DDD5C7] font-medium shadow-2xs">
              Max: ${priceMax}
              <button onClick={() => setPriceMax(110)}>
                <X className="w-3 h-3 text-[#6A7563] hover:text-black cursor-pointer" />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-xs text-[#6A7563] hover:text-[#1B2017] underline ml-1 cursor-pointer font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-[#E5DFD2] p-8 rounded-xs shadow-xs">
          <p className="text-lg font-serif text-[#1B2017] mb-2 font-medium">No matching textures found</p>
          <p className="text-xs text-[#6A7563] max-w-sm mx-auto mb-6">
            Try adjusting your length, color, or price filters to explore the available stock.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#95B373] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#82A260] transition-colors rounded-xs shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
