import React from 'react';
import { History, ArrowRight, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';

export const PersonalizedRecommendations: React.FC = () => {
  const {
    browsingHistory,
    getPersonalizedRecommendations,
    clearBrowsingHistory,
    openProductModal,
  } = useStore();

  const recommendedProducts = getPersonalizedRecommendations();

  // If user has viewed items, get the last viewed product name
  const lastViewedId = browsingHistory[0]?.productId;
  const lastViewedProduct = PRODUCTS.find((p) => p.id === lastViewedId);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5DFD2]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E5DFD2] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#95B373] font-bold mb-2">
            <Heart className="w-3 h-3 text-[#95B373]" />
            <span>Recommended For You</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1B2017] tracking-tight font-medium">
            {lastViewedProduct
              ? `Recommended Based on Your View of ${lastViewedProduct.name}`
              : 'Popular Hair Styles You Might Like'}
          </h2>

          <p className="text-xs text-[#55604E] mt-1 font-light">
            Hair products picked based on styles and hair types you viewed.
          </p>
        </div>

        {/* History Controls */}
        {browsingHistory.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#6A7563] flex items-center gap-1 font-medium">
              <History className="w-3.5 h-3.5 text-[#6A7563]" />
              <span>{browsingHistory.length} recently viewed items</span>
            </span>
            <button
              onClick={clearBrowsingHistory}
              className="text-[11px] text-[#6A7563] hover:text-[#1B2017] transition-colors underline font-medium cursor-pointer"
            >
              Reset history
            </button>
          </div>
        )}
      </div>

      {/* Recommended Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard key={`rec-${product.id}`} product={product} />
        ))}
      </div>

      {/* Complete The Look / Bundle Builder Promo Box */}
      <div className="mt-12 p-6 sm:p-8 bg-white border border-[#DDD5C7] rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="max-w-xl">
          <span className="text-[10px] uppercase tracking-widest text-[#95B373] font-bold block mb-1">
            Professional Stylist Tip
          </span>
          <h4 className="text-lg font-serif text-[#1B2017] font-medium">
            Need 3 Bundles for a Full Voluminous Sew-In?
          </h4>
          <p className="text-xs text-[#55604E] font-light mt-1 leading-relaxed">
            For lengths 18" to 28", we recommend 3 to 4 bundles to maintain ultra-dense, full ends. Apply code{' '}
            <span className="font-mono text-[#2B401D] font-bold">LUXE15</span> at checkout for 15% off full bundle suites.
          </p>
        </div>

        <button
          onClick={() => {
            const oceanWave = PRODUCTS.find((p) => p.id === 'liyu-ocean-wave') || PRODUCTS[0];
            openProductModal(oceanWave);
          }}
          className="whitespace-nowrap px-6 py-3.5 bg-[#95B373] text-white hover:bg-[#82A260] text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-[#95B373]/20 rounded-xs"
        >
          <span>Configure 3-Bundle Suite</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
