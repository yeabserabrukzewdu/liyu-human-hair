import React, { useState } from 'react';
import { X, Heart, Trash2, ArrowRight, Share2, Check, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Logo } from './Logo';

const WishlistDrawerContent: React.FC = () => {
  const {
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    openProductModal,
    addToCart,
  } = useStore();

  const [copiedLink, setCopiedLink] = useState(false);

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleShareWishlist = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div
      id="wishlist-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        id="wishlist-drawer-content"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF7F2] border-l border-[#DDD5C7] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 text-[#1B2017]"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E5DFD2]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Logo size="xs" layout="horizontal" variant="light" />
              <div className="flex items-center gap-1.5 border-l border-[#DDD5C7] pl-3">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span className="text-xs font-mono text-[#6A7563] font-bold">({wishlist.length})</span>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#6A7563] hover:text-[#1B2017] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#6A7563]">
            <span>Your curated personal selections</span>
            <button
              onClick={handleShareWishlist}
              className="flex items-center gap-1 text-[11px] text-[#2C401D] hover:text-[#1B2017] transition-colors font-medium cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#95B373]" />
                  <span className="text-[#95B373] font-bold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#95B373]" />
                  <span>Share Wishlist</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-white border border-[#DDD5C7] rounded-xs group relative shadow-xs"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-18 h-24 object-cover object-center rounded bg-[#FAF7F2] shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    openProductModal(product);
                  }}
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#95B373] font-bold">
                        {product.category}
                      </span>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-[#888888] hover:text-rose-500 transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductModal(product);
                      }}
                      className="text-sm font-serif text-[#1B2017] font-medium hover:text-[#95B373] cursor-pointer truncate mt-0.5"
                    >
                      {product.name}
                    </h4>

                    <p className="text-xs font-serif text-[#1B2017] font-bold mt-1">
                      ${product.basePrice} - ${product.maxPrice} USD
                    </p>
                    <p className="text-[10px] text-[#6A7563]">
                      Lengths: {Math.min(...product.availableLengths)}" to {Math.max(...product.availableLengths)}"
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductModal(product);
                    }}
                    className="mt-2 py-1.5 px-3 bg-[#95B373] hover:bg-[#82A260] text-white text-[11px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors rounded-xs shadow-xs cursor-pointer"
                  >
                    <span>Configure & Buy</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="mb-4">
                <Logo size="md" layout="full-picture" variant="light" />
              </div>
              <p className="text-sm font-serif text-[#1B2017] font-medium mb-2">Your wishlist is empty</p>
              <p className="text-xs text-[#6A7563] max-w-xs mx-auto mb-6">
                Tap the heart on any human hair texture to save it for your next custom install.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2.5 bg-[#95B373] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#82A260] transition-colors cursor-pointer rounded-xs shadow-xs"
              >
                Explore The Textures
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5DFD2] bg-white flex items-center justify-between text-center">
          <Logo size="xs" layout="horizontal" variant="light" />
          <span className="text-[10px] text-[#6A7563] uppercase tracking-wider block font-medium">
            Stock reserved 48h
          </span>
        </div>
      </div>
    </div>
  );
};

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen } = useStore();

  if (!isWishlistOpen) return null;

  return <WishlistDrawerContent />;
};

