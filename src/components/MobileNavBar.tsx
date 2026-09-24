import React from 'react';
import { Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileNavBar: React.FC = () => {
  const {
    cartCount,
    wishlistCount,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
  } = useStore();

  const handleScrollToShop = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#DDD5C7] px-2 py-1.5 shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Shop Button */}
        <button
          onClick={handleScrollToShop}
          className="flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[48px] text-[#6A7563] hover:text-[#1B2017] transition-colors cursor-pointer"
          aria-label="Shop textures"
        >
          <Compass className="w-4 h-4 mb-0.5 text-[#1B2017]" />
          <span className="text-[9px] uppercase tracking-wider font-medium text-[#1B2017]">Catalog</span>
        </button>

        {/* Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[48px] text-[#6A7563] hover:text-[#1B2017] transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] uppercase tracking-wider">Search</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[48px] text-[#6A7563] hover:text-[#1B2017] transition-colors cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] uppercase tracking-wider">Saved</span>
          {wishlistCount > 0 && (
            <span className="absolute top-1.5 right-3 w-3.5 h-3.5 bg-[#95B373] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Bag Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[48px] text-[#1B2017] transition-colors cursor-pointer"
          aria-label="Shopping bag"
        >
          <ShoppingBag className="w-4 h-4 mb-0.5 text-[#1B2017]" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Bag</span>
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-3 w-3.5 h-3.5 bg-[#95B373] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
