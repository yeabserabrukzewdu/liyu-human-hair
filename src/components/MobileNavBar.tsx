import React from 'react';
import { Sparkles, MapPin, Search, Heart, ShoppingBag, Home } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileNavBar: React.FC = () => {
  const {
    currentPage,
    navigateToPage,
    cartCount,
    wishlistCount,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
  } = useStore();

  return (
    <div
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#DDD5C7] px-2 py-1.5 shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => navigateToPage('home')}
          className={`flex flex-col items-center justify-center p-1.5 min-w-[56px] min-h-[46px] transition-colors cursor-pointer ${
            currentPage === 'home' ? 'text-[#1B2017] font-bold' : 'text-[#6A7563] hover:text-[#1B2017]'
          }`}
          aria-label="Home"
        >
          <Home className={`w-4 h-4 mb-0.5 ${currentPage === 'home' ? 'text-[#1B2017]' : 'text-[#6A7563]'}`} />
          <span className="text-[9px] uppercase tracking-wider">Home</span>
        </button>

        {/* Hair Collections */}
        <button
          onClick={() => navigateToPage('collections')}
          className={`flex flex-col items-center justify-center p-1.5 min-w-[56px] min-h-[46px] transition-colors cursor-pointer ${
            currentPage === 'collections' ? 'text-[#1B2017] font-bold' : 'text-[#6A7563] hover:text-[#1B2017]'
          }`}
          aria-label="Hair Collections"
        >
          <Sparkles className={`w-4 h-4 mb-0.5 ${currentPage === 'collections' ? 'text-[#95B373]' : 'text-[#6A7563]'}`} />
          <span className="text-[9px] uppercase tracking-wider">Collections</span>
        </button>

        {/* Our Stores */}
        <button
          onClick={() => navigateToPage('stores')}
          className={`flex flex-col items-center justify-center p-1.5 min-w-[56px] min-h-[46px] transition-colors cursor-pointer ${
            currentPage === 'stores' ? 'text-[#1B2017] font-bold' : 'text-[#6A7563] hover:text-[#1B2017]'
          }`}
          aria-label="Our Stores"
        >
          <MapPin className={`w-4 h-4 mb-0.5 ${currentPage === 'stores' ? 'text-[#95B373]' : 'text-[#6A7563]'}`} />
          <span className="text-[9px] uppercase tracking-wider">Stores</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center p-1.5 min-w-[56px] min-h-[46px] text-[#6A7563] hover:text-[#1B2017] transition-colors cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] uppercase tracking-wider">Saved</span>
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-2.5 w-3.5 h-3.5 bg-[#95B373] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Bag Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-1.5 min-w-[56px] min-h-[46px] text-[#1B2017] transition-colors cursor-pointer"
          aria-label="Shopping bag"
        >
          <ShoppingBag className="w-4 h-4 mb-0.5 text-[#1B2017]" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Bag</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-2.5 w-3.5 h-3.5 bg-[#95B373] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
