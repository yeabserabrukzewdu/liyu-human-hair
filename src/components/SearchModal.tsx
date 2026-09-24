import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductModal } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Global keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Deep Frizz 24"',
    'Raw Burmese Virgin',
    'Ocean Wave Highlight',
    'Raw Hair Ash Blonde 20"',
    'Pixie Curl Piano',
    'Fumi Burgundy',
    'Body Wave 28"',
  ];

  // Predictive search query matches
  const predictiveSuggestions = query.trim()
    ? [
        `${query} bundles`,
        `${query} 20 inch`,
        `${query} raw hair`,
        `${query} natural black`,
      ].filter((s) => s.toLowerCase() !== query.toLowerCase())
    : [];

  const matchedProducts: Product[] = query.trim()
    ? PRODUCTS.filter((product) => {
        const q = query.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(q);
        const categoryMatch = product.category.toLowerCase().includes(q);
        const descMatch = product.description.toLowerCase().includes(q);
        const colorMatch = product.availableColors.some((c) => c.toLowerCase().includes(q));
        const lengthMatch = product.availableLengths.some((l) => `${l}`.includes(q) || `${l}"`.includes(q));
        return nameMatch || categoryMatch || descMatch || colorMatch || lengthMatch;
      })
    : [];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    openProductModal(product);
  };

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center p-4 sm:p-8 pt-20 animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        id="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs shadow-2xl overflow-hidden text-[#1B2017]"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E5DFD2]">
          <div className="mr-3 shrink-0">
            <Logo size="xs" layout="mark-only" variant="light" />
          </div>
          <Search className="w-4 h-4 text-[#6A7563] shrink-0 mr-2.5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search textures (Deep Frizz, Burmese, Ocean Wave, Blondes)..."
            className="w-full bg-transparent text-[#1B2017] text-sm placeholder-[#888888] focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#6A7563] hover:text-[#1B2017] mr-2 cursor-pointer"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-wider text-[#6A7563] hover:text-[#1B2017] pl-2 border-l border-[#DDD5C7] cursor-pointer font-bold"
          >
            ESC
          </button>
        </div>

        {/* Predictive Suggestions when typing */}
        {query.trim().length > 1 && predictiveSuggestions.length > 0 && (
          <div className="px-5 py-2.5 bg-white border-b border-[#E5DFD2] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#6A7563] shrink-0 font-bold">Predictive:</span>
            {predictiveSuggestions.map((pred, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(pred)}
                className="whitespace-nowrap px-2.5 py-1 bg-[#FAF7F2] hover:bg-[#95B373] hover:text-white text-[#1B2017] border border-[#DDD5C7] rounded-xs text-[11px] font-mono transition-colors cursor-pointer"
              >
                {pred}
              </button>
            ))}
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto p-5">
          {/* Results List */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-[#6A7563]">
                <span className="font-medium">
                  {matchedProducts.length} result{matchedProducts.length === 1 ? '' : 's'} found
                </span>
                <span className="text-[11px]">Click item to configure length & color</span>
              </div>

              {matchedProducts.length > 0 ? (
                <div className="space-y-2.5">
                  {matchedProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="group flex items-center gap-4 p-3 bg-white hover:bg-[#F2ECE0] border border-[#DDD5C7] hover:border-[#95B373] transition-all cursor-pointer rounded-xs shadow-xs"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-16 object-cover object-center rounded-xs shrink-0 bg-[#FAF7F2] border border-[#DDD5C7]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#95B373] font-bold">
                            {product.category}
                          </span>
                          <span className="text-[10px] font-mono text-[#888888]">
                            #{String(product.catalogNumber).padStart(2, '0')}
                          </span>
                        </div>
                        <h4 className="text-sm font-serif text-[#1B2017] font-medium truncate group-hover:text-[#95B373] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#6A7563] truncate font-light mt-0.5">
                          {product.availableColors.join(', ')} • {product.availableLengths.join('", ')}"
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-serif text-[#1B2017] font-bold">
                          ${product.basePrice} - ${product.maxPrice}
                        </span>
                        <span className="text-[10px] text-[#6A7563] block font-mono">USD</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-[#55604E]">No matching hair textures for "{query}"</p>
                  <p className="text-xs text-[#888888] mt-1">
                    Try browsing by style: "Deep Frizz", "Ocean Wave", "Pixie", or "Burmese".
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Popular Trending Searches */
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#6A7563] mb-3 font-bold">
                <Tag className="w-3.5 h-3.5 text-[#95B373]" />
                <span>Trending Studio Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term.replace(/"/g, ''))}
                    className="px-3 py-1.5 bg-white hover:bg-[#95B373] hover:text-white text-xs text-[#1B2017] border border-[#DDD5C7] rounded-xs transition-colors cursor-pointer shadow-xs font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Quick links to all 7 categories */}
              <div className="mt-8 pt-6 border-t border-[#E5DFD2]">
                <span className="text-[10px] uppercase tracking-wider text-[#6A7563] block mb-3 font-bold">
                  All 7 Notebook Catalog Textures
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="p-2.5 text-left bg-white hover:bg-[#F2ECE0] border border-[#DDD5C7] rounded-xs transition-colors text-xs text-[#1B2017] hover:text-[#95B373] flex items-center justify-between cursor-pointer shadow-xs font-medium"
                    >
                      <span className="truncate">{prod.name}</span>
                      <ArrowRight className="w-3 h-3 text-[#6A7563]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
