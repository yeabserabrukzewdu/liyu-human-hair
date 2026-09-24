import React, { useState } from 'react';
import { Heart, Plus, Eye, Tag, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { COLOR_SWATCHES } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isWishlisted, toggleWishlist, openProductModal, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  // Default variant for fast add
  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (defaultVariant) {
      addToCart(product, defaultVariant, 1);
      setQuickAdded(true);
      setTimeout(() => setQuickAdded(false), 2000);
    } else {
      openProductModal(product);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => openProductModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-[#E8E2D5] hover:border-[#95B373]/60 hover:shadow-xl hover:shadow-[#95B373]/10 transition-all duration-300 cursor-pointer overflow-hidden rounded-xs"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4EFE6]">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isFlashSale && (
            <span className="px-2.5 py-0.5 bg-[#95B373] text-white font-bold text-[9px] uppercase tracking-widest rounded-xs shadow-xs flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" />
              Flash -{product.discountPercentage || 15}%
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-0.5 bg-[#FAF7F2]/95 backdrop-blur-md text-[#2B3821] border border-[#DDD5C7] text-[9px] uppercase tracking-widest rounded-xs font-semibold">
              Bestseller
            </span>
          )}
          {product.category === 'Raw Hair' && (
            <span className="px-2 py-0.5 bg-[#FAF7F2]/95 backdrop-blur-md text-[#2C401D] border border-[#DDD5C7] text-[9px] uppercase tracking-widest rounded-xs font-bold">
              Single Donor
            </span>
          )}
        </div>

        {/* Catalog Index Monogram */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[10px] font-mono text-[#5A6453] bg-[#FAF7F2]/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#DDD5C7]">
            #{String(product.catalogNumber).padStart(2, '0')}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-sm ${
            wishlisted
              ? 'bg-[#95B373] text-white shadow-md scale-105'
              : 'bg-white/90 text-[#434F3D] hover:bg-[#95B373] hover:text-white border border-[#DDD5C7]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-white' : ''}`} />
        </button>

        {/* Quick View overlay banner on desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:flex items-center justify-between gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#95B373] hover:bg-[#82A260] text-white text-[10px] uppercase font-bold tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 shadow-md rounded-xs"
          >
            {quickAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add 1 Bundle ({defaultVariant.length}")</span>
              </>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="p-2.5 bg-white hover:bg-[#FAF7F2] text-[#1B2017] transition-colors rounded-xs shadow-md border border-[#DDD5C7]"
            title="Configure Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#6A7563] font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[#95B373] text-xs">★</span>
              <span className="text-[11px] font-mono text-[#55614E] font-medium">{product.rating}</span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-serif text-[#1B2017] font-medium tracking-wide group-hover:text-[#648443] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#5D6656] mt-1 line-clamp-1 font-light">
            {product.shortDescription}
          </p>

          {/* Color swatches preview */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.availableColors.map((color) => {
              const swatch = COLOR_SWATCHES[color];
              return (
                <span
                  key={color}
                  title={color}
                  className="w-3.5 h-3.5 rounded-full border shadow-2xs"
                  style={{
                    background: swatch?.bg || '#171717',
                    borderColor: swatch?.border || '#404040',
                  }}
                />
              );
            })}
            <span className="text-[10px] text-[#737C6D] ml-1">
              {product.availableColors.length > 1 ? `${product.availableColors.length} Colors` : 'Black'}
            </span>
          </div>
        </div>

        {/* Pricing and Length Specs */}
        <div className="mt-4 pt-3 border-t border-[#EFEAE0] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#2B3E1F] font-bold block uppercase tracking-wider">
              Sold as 1 Bundle
            </span>
            <div className="text-xs font-mono text-[#6A7463]">
              {Math.min(...product.availableLengths)}" - {Math.max(...product.availableLengths)}"
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm sm:text-base font-serif font-semibold text-[#1B2017]">
              {product.basePrice === product.maxPrice
                ? `$${product.basePrice}`
                : `$${product.basePrice} - $${product.maxPrice}`}
            </span>
            <span className="text-[10px] text-[#788272] block -mt-0.5">USD for 1 bundle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
