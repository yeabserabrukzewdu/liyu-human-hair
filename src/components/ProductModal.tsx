import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Check,
  Tag,
  ShieldCheck,
  Truck,
  Layers,
  Package,
  Star,
  RefreshCw,
} from 'lucide-react';
import { Product, ProductVariant, HairColor } from '../types';
import { useStore } from '../context/StoreContext';
import { COLOR_SWATCHES, PRODUCTS } from '../data/products';
import { Logo } from './Logo';

interface ProductModalContentProps {
  product: Product;
}

const ProductModalContent: React.FC<ProductModalContentProps> = ({ product }) => {
  const {
    closeProductModal,
    openProductModal,
    addToCart,
    isWishlisted,
    toggleWishlist,
    cartCount,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useStore();

  // Active selections
  const [selectedColor, setSelectedColor] = useState<HairColor>(product.availableColors[0]);
  const [selectedLength, setSelectedLength] = useState<number>(product.availableLengths[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(product.images[0]);
  const [activeTab, setActiveTab] = useState<'description' | 'options' | 'care' | 'shipping'>('description');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Initialize and synchronize with URL parameters
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlColor = params.get('color') as HairColor | null;
      const urlLength = params.get('length') ? parseInt(params.get('length')!, 10) : null;

      const initialColor =
        urlColor && product.availableColors.includes(urlColor)
          ? urlColor
          : product.availableColors[0];

      const validLengths = product.variants
        .filter((v) => v.color === initialColor)
        .map((v) => v.length);

      const initialLength =
        urlLength && validLengths.includes(urlLength)
          ? urlLength
          : validLengths[0] || product.availableLengths[0];

      setSelectedColor(initialColor);
      setSelectedLength(initialLength);
      setQuantity(1);

      // Auto update main product image to color image if available
      if (product.colorImages && product.colorImages[initialColor]) {
        setMainImage(product.colorImages[initialColor]);
      } else {
        setMainImage(product.images[0]);
      }
    } catch {
      // fallback
    }
  }, [product]);

  // Dynamic SEO title sync
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${product.name} (${selectedLength}", ${selectedColor}) – Liyu Human Hair`;
    return () => {
      document.title = originalTitle;
    };
  }, [product.name, selectedLength, selectedColor]);

  // Keep URL updated with selected variant
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('product', product.slug);
      url.searchParams.set('color', selectedColor);
      url.searchParams.set('length', selectedLength.toString());
      window.history.replaceState(null, '', url.toString());
    } catch {
      // ignore
    }
  }, [product, selectedColor, selectedLength]);

  // Handle closing product page and cleaning URL
  const handleClose = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('product');
      url.searchParams.delete('color');
      url.searchParams.delete('length');
      const newQuery = url.searchParams.toString();
      window.history.replaceState(
        null,
        '',
        url.pathname + (newQuery ? `?${newQuery}` : '')
      );
    } catch {
      // ignore
    }
    closeProductModal();
  };

  // Find exact matching variant
  const currentVariant: ProductVariant | undefined =
    product.variants.find(
      (v) => v.color === selectedColor && v.length === selectedLength
    ) ||
    product.variants.find((v) => v.color === selectedColor) ||
    product.variants[0];

  const currentPrice = currentVariant ? currentVariant.price : product.basePrice;
  const totalPrice = currentPrice * quantity;
  const wishlisted = isWishlisted(product.id);

  // Available lengths for currently selected color
  const lengthsForColor = Array.from(
    new Set(
      product.variants
        .filter((v) => v.color === selectedColor)
        .map((v) => v.length)
    )
  ).sort((a, b) => a - b);

  // Color change handler (Rule 6: automatically change main image to the color image & filter lengths)
  const handleColorChange = (newColor: HairColor) => {
    setSelectedColor(newColor);

    // Switch image to selected color
    if (product.colorImages && product.colorImages[newColor]) {
      setMainImage(product.colorImages[newColor]);
    }

    // Filter available lengths for this color
    const validLengths = product.variants
      .filter((v) => v.color === newColor)
      .map((v) => v.length);

    // If current length is unavailable in new color, auto-select first valid length
    if (!validLengths.includes(selectedLength) && validLengths.length > 0) {
      setSelectedLength(validLengths[0]);
    }
  };

  // Length change handler (Rule 7: update selected variant and price)
  const handleLengthChange = (newLength: number) => {
    setSelectedLength(newLength);
  };

  const handleAddToCart = () => {
    if (currentVariant) {
      addToCart(product, currentVariant, quantity);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (currentVariant) {
      addToCart(product, currentVariant, quantity);
      handleClose();
      setIsCheckoutOpen(true);
    }
  };

  // Other products for related products section
  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div
      id="full-product-page"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF7F2] min-h-screen text-[#1B2017] animate-in fade-in duration-200 flex flex-col"
    >
      {/* ==================================================== */}
      {/* FULL PAGE HEADER                                    */}
      {/* ==================================================== */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D5] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <button
          onClick={handleClose}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#485341] hover:text-[#1B2017] font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#95B373]" />
          <span>Back to All Products</span>
        </button>

        <div
          onClick={handleClose}
          className="cursor-pointer"
          title="Back to Home"
        >
          <Logo size="sm" layout="horizontal" variant="light" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              wishlisted
                ? 'border-rose-200 bg-rose-50 text-rose-500'
                : 'border-[#DDD5C7] bg-white text-[#55604E] hover:border-[#95B373]'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => {
              handleClose();
              setIsCartOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#95B373] text-white rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-[#82A260] transition-colors cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span>({cartCount})</span>
          </button>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#55604E] hover:text-[#1B2017] cursor-pointer"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ==================================================== */}
      {/* BREADCRUMB NAVIGATION                                */}
      {/* ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 w-full">
        <nav className="flex items-center gap-2 text-xs text-[#6A7563]">
          <button onClick={handleClose} className="hover:underline cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={handleClose} className="hover:underline cursor-pointer">
            Human Hair Products
          </button>
          <span>/</span>
          <span className="text-[#1B2017] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* ==================================================== */}
      {/* MAIN FULL-PAGE PRODUCT CONTENT                      */}
      {/* ==================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ==================================================== */}
          {/* LEFT COLUMN: Large Photo Gallery (6 Cols)            */}
          {/* ==================================================== */}
          <div className="lg:col-span-6 lg:sticky lg:top-20 space-y-4">
            {/* Main High-Res Image View */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4EFE6] border border-[#DDD5C7] rounded-xs shadow-xs">
              <img
                src={mainImage}
                alt={`${product.name} - ${selectedColor}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="px-3 py-1 bg-[#2B3E1F] text-white font-bold text-[10px] uppercase tracking-widest rounded-xs shadow-sm flex items-center gap-1.5">
                  <Package className="w-3 h-3" />
                  Sold as 1 Bundle
                </span>
                {product.isFlashSale && (
                  <span className="px-3 py-1 bg-[#95B373] text-white font-bold text-[10px] uppercase tracking-widest rounded-xs shadow-sm flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    Special Deal -{product.discountPercentage || 15}%
                  </span>
                )}
              </div>

              {/* Active Color & Length Tag */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-xs font-mono text-[#2B3E1F] font-bold px-3 py-1.5 rounded-xs border border-[#DDD5C7] shadow-xs">
                Color: {selectedColor} • Length: {selectedLength}"
              </div>
            </div>

            {/* Gallery Thumbnails List */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
              {/* Color Specific Image Thumbnail */}
              {product.colorImages && product.colorImages[selectedColor] && (
                <button
                  type="button"
                  onClick={() => setMainImage(product.colorImages![selectedColor])}
                  className={`relative w-20 h-24 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 bg-white ${
                    mainImage === product.colorImages![selectedColor]
                      ? 'border-[#95B373] ring-1 ring-[#95B373]'
                      : 'border-[#DDD5C7] opacity-75 hover:opacity-100'
                  }`}
                  title={`${selectedColor} photo`}
                >
                  <img
                    src={product.colorImages[selectedColor]}
                    alt={`${product.name} - ${selectedColor}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] text-center py-0.5 truncate font-medium">
                    {selectedColor}
                  </span>
                </button>
              )}

              {/* General angle images */}
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 h-24 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 bg-white ${
                    mainImage === img
                      ? 'border-[#95B373] ring-1 ring-[#95B373]'
                      : 'border-[#DDD5C7] opacity-75 hover:opacity-100'
                  }`}
                  title={`View angle ${idx + 1}`}
                >
                  <img src={img} alt={`View angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Simple Quality Guarantees Bar */}
            <div className="bg-white p-4 border border-[#DDD5C7] rounded-xs grid grid-cols-2 gap-3 text-xs text-[#55634E] shadow-2xs">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#95B373] shrink-0" />
                <span><strong>Sold as 1 Bundle</strong> (~100g)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#95B373] shrink-0" />
                <span>100% Real Human Hair</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#95B373] shrink-0" />
                <span>Cuticles in One Direction</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#95B373] shrink-0" />
                <span>Fast DHL Express Delivery</span>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: Amazon-Style Variant Experience (6 Cols)*/}
          {/* ==================================================== */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Category & Verified Reviews */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#95B373] font-bold mb-1.5">
                <span>{product.category}</span>
                <span className="text-[#888888]">·</span>
                <span className="text-[#6A7563] font-normal">100% Real Human Hair</span>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-medium text-[#1B2017] tracking-tight">
                {product.name}
              </h1>

              {/* Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#95B373] text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#1B2017]">{product.rating}</span>
                <span className="text-xs text-[#6A7563]">
                  ({product.reviewCount} verified client reviews)
                </span>
              </div>

              {/* Simple English Product Description */}
              <p className="text-sm text-[#55634E] font-light leading-relaxed mt-3">
                {product.description}
              </p>
            </div>

            {/* ==================================================== */}
            {/* CLEAR "SOLD AS 1 BUNDLE" NOTICE BOX                  */}
            {/* ==================================================== */}
            <div className="p-4 bg-white border border-[#95B373] rounded-xs shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#95B373]/15 text-[#2B3E1F] rounded-xs mt-0.5">
                  <Package className="w-5 h-5 text-[#95B373]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#1B2017]">
                      Sold as 1 Bundle
                    </h3>
                    <span className="text-[11px] font-bold text-[#2B3E1F] bg-[#95B373]/20 px-2 py-0.5 rounded-xs">
                      1 Unit = 1 Bundle
                    </span>
                  </div>
                  <p className="text-xs text-[#55634E] mt-1 leading-normal">
                    The price shown is for <strong>ONE bundle</strong> (~100 grams).
                    To purchase more hair for a full look, choose your desired bundle count below.
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Price Display */}
            <div className="p-4 bg-white border border-[#DDD5C7] rounded-xs flex flex-wrap items-baseline justify-between gap-3 shadow-2xs">
              <div>
                <span className="text-3xl sm:text-4xl font-serif text-[#1B2017] font-semibold">
                  ${currentPrice}
                </span>
                <span className="text-sm text-[#6A7563] ml-2">USD for 1 bundle</span>
                {quantity > 1 && (
                  <div className="text-xs font-mono font-bold text-[#2B3E1F] mt-1">
                    Total: ${totalPrice} USD (${currentPrice} × {quantity} bundles)
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#2C401D] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#95B373]" />
                <span>In Stock · Ready to Ship</span>
              </div>
            </div>

            {/* ==================================================== */}
            {/* COLOR SELECTOR (Amazon-style with thumbnails & names) */}
            {/* ==================================================== */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#6A7563] font-bold">
                  Color:{' '}
                  <span className="text-[#1B2017] normal-case font-bold ml-1 text-sm">
                    {selectedColor}
                  </span>
                </label>
                <span className="text-xs text-[#7A8574]">
                  {product.availableColors.length} {product.availableColors.length === 1 ? 'color' : 'colors'} available
                </span>
              </div>

              {/* Color cards with image thumbnail, color name, and status */}
              <div className="flex flex-wrap gap-3">
                {product.availableColors.map((color) => {
                  const swatch = COLOR_SWATCHES[color];
                  const isSelected = selectedColor === color;
                  const thumbUrl =
                    (product.colorThumbnails && product.colorThumbnails[color]) ||
                    swatch?.thumbnail ||
                    (product.colorImages && product.colorImages[color]);

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleColorChange(color)}
                      className={`flex flex-col items-center p-2.5 rounded-xs border-2 transition-all cursor-pointer min-w-[86px] sm:min-w-[96px] text-center bg-white ${
                        isSelected
                          ? 'border-[#95B373] ring-1 ring-[#95B373] shadow-xs'
                          : 'border-[#DDD5C7] hover:border-[#95B373]/70'
                      }`}
                    >
                      {/* Image Thumbnail Frame */}
                      <div className="relative w-12 h-12 rounded-xs overflow-hidden border border-black/15 mb-1.5 bg-[#EAE5DC] flex items-center justify-center">
                        {thumbUrl ? (
                          <img
                            src={thumbUrl}
                            alt={color}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span
                            className="w-full h-full block"
                            style={{ background: swatch?.bg || '#171717' }}
                          />
                        )}
                        {isSelected && (
                          <div className="absolute top-0.5 right-0.5 bg-[#95B373] text-white rounded-full p-0.5 shadow-xs">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>

                      {/* Color Name */}
                      <span className="text-xs font-semibold text-[#1B2017] leading-tight block truncate max-w-[88px]">
                        {color}
                      </span>

                      {/* Status Underneath */}
                      <span
                        className={`text-[10px] mt-0.5 block font-bold ${
                          isSelected ? 'text-[#2B3E1F]' : 'text-[#7A8574]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Available'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ==================================================== */}
            {/* LENGTH SELECTOR (Strictly available lengths per color) */}
            {/* ==================================================== */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#6A7563] font-bold">
                  Length:{' '}
                  <span className="text-[#1B2017] font-mono font-bold ml-1 text-sm">
                    {selectedLength}" Inches
                  </span>
                </label>
                <span className="text-xs text-[#7A8574]">
                  Lengths for {selectedColor}
                </span>
              </div>

              {/* Length cards showing length, bundle price, and selected status */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {lengthsForColor.map((len) => {
                  const varItem = product.variants.find(
                    (v) => v.color === selectedColor && v.length === len
                  );
                  const isSelected = selectedLength === len;
                  const price = varItem ? varItem.price : product.basePrice;

                  return (
                    <button
                      key={len}
                      type="button"
                      onClick={() => handleLengthChange(len)}
                      className={`p-3 rounded-xs border-2 text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#95B373] bg-[#95B373] text-white font-bold shadow-xs'
                          : 'border-[#DDD5C7] bg-white text-[#1B2017] hover:border-[#95B373]'
                      }`}
                    >
                      <div className="text-base font-mono font-semibold">{len}"</div>
                      <div
                        className={`text-xs font-mono font-bold mt-0.5 ${
                          isSelected ? 'text-white' : 'text-[#2B3E1F]'
                        }`}
                      >
                        ${price}
                      </div>
                      <div
                        className={`text-[9px] uppercase tracking-wider mt-1 ${
                          isSelected ? 'text-white/90 font-bold' : 'text-[#7A8574]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Available'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ==================================================== */}
            {/* QUANTITY SELECTOR (Professional Bundle Stepper)      */}
            {/* ==================================================== */}
            <div className="p-4 bg-white border border-[#DDD5C7] rounded-xs shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#6A7563] font-bold block">
                    Quantity: Choose Number of Bundles
                  </span>
                  <span className="text-xs text-[#55634E]">
                    Sold as 1 bundle per unit.
                  </span>
                </div>

                {/* Stepper */}
                <div className="flex items-center border border-[#DDD5C7] rounded-xs bg-[#FAF7F2] shadow-2xs self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-[#6A7563] hover:text-[#1B2017] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Decrease bundle quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-14 text-center font-mono text-base text-[#1B2017] font-bold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    className="p-2.5 text-[#6A7563] hover:text-[#1B2017] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Increase bundle quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Preset Bundle Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EFEAE0]">
                <span className="text-xs text-[#7A8574] font-medium mr-1">Quick Select:</span>
                {[1, 2, 3, 4].map((bundleCount) => (
                  <button
                    key={bundleCount}
                    type="button"
                    onClick={() => setQuantity(bundleCount)}
                    className={`px-3 py-1.5 text-xs rounded-xs border transition-colors cursor-pointer ${
                      quantity === bundleCount
                        ? 'border-[#95B373] bg-[#95B373]/15 text-[#2B3E1F] font-bold'
                        : 'border-[#DDD5C7] bg-[#FAF7F2] text-[#55634E] hover:border-[#95B373]'
                    }`}
                  >
                    {bundleCount} {bundleCount === 1 ? 'Bundle' : 'Bundles'}
                  </button>
                ))}
              </div>

              {/* Helpful advice in simple English */}
              <p className="text-xs text-[#6A7563] bg-[#FAF7F2] p-2.5 rounded-xs border border-[#EFEAE0]">
                💡 <strong>How many bundles do I need?</strong><br />
                • <strong>2 to 3 bundles:</strong> Perfect for a natural, everyday look.<br />
                • <strong>3 to 4 bundles:</strong> Recommended for lengths 22 inches and longer or maximum fullness.
              </p>
            </div>

            {/* ==================================================== */}
            {/* ACTION BUTTONS: Add to Bag + Buy Now                 */}
            {/* ==================================================== */}
            <div className="space-y-3 pt-2">
              <button
                id="modal-add-to-bag-btn"
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#95B373] text-white hover:bg-[#82A260] text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-[#95B373]/20 rounded-xs"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Added {quantity} {quantity === 1 ? 'Bundle' : 'Bundles'} to Your Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>
                      Add to Bag — ${totalPrice} USD ({quantity} {quantity === 1 ? 'Bundle' : 'Bundles'})
                    </span>
                  </>
                )}
              </button>

              <button
                id="modal-instant-checkout-btn"
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-white hover:bg-[#F2ECE0] text-[#1B2017] border-2 border-[#DDD5C7] hover:border-[#95B373] text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer rounded-xs shadow-xs"
              >
                <span>Buy Now — Go to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#95B373]" />
              </button>
            </div>

            {/* ==================================================== */}
            {/* SIMPLE ENGLISH TABS: Description, Care, Shipping     */}
            {/* ==================================================== */}
            <div className="pt-6 border-t border-[#E5DFD2]">
              <div className="flex border-b border-[#E5DFD2] mb-4 text-xs uppercase tracking-wider overflow-x-auto scrollbar-none gap-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 transition-colors cursor-pointer shrink-0 font-bold ${
                    activeTab === 'description'
                      ? 'text-[#1B2017] border-b-2 border-[#95B373]'
                      : 'text-[#6A7563] hover:text-[#1B2017]'
                  }`}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('options')}
                  className={`pb-3 transition-colors cursor-pointer shrink-0 font-bold ${
                    activeTab === 'options'
                      ? 'text-[#1B2017] border-b-2 border-[#95B373]'
                      : 'text-[#6A7563] hover:text-[#1B2017]'
                  }`}
                >
                  All Colors & Lengths
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('care')}
                  className={`pb-3 transition-colors cursor-pointer shrink-0 font-bold ${
                    activeTab === 'care'
                      ? 'text-[#1B2017] border-b-2 border-[#95B373]'
                      : 'text-[#6A7563] hover:text-[#1B2017]'
                  }`}
                >
                  Hair Care Tips
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-3 transition-colors cursor-pointer shrink-0 font-bold ${
                    activeTab === 'shipping'
                      ? 'text-[#1B2017] border-b-2 border-[#95B373]'
                      : 'text-[#6A7563] hover:text-[#1B2017]'
                  }`}
                >
                  Shipping & Guarantee
                </button>
              </div>

              {activeTab === 'description' && (
                <div className="text-sm text-[#55604E] font-light leading-relaxed space-y-3">
                  <p>{product.description}</p>
                  <div className="pt-2">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1B2017] mb-2">
                      Key Highlights:
                    </h4>
                    <ul className="space-y-1.5">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-[#95B373] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'options' && (
                <div className="text-xs text-[#55604E] space-y-3">
                  <div className="p-3 bg-white border border-[#DDD5C7] rounded-xs">
                    <span className="font-bold text-[#1B2017] block">
                      Price List for {product.name} (Sold as 1 Bundle)
                    </span>
                    <p className="text-[11px] text-[#6A7563] mt-0.5">
                      All prices below are in USD for 1 individual bundle.
                    </p>
                  </div>
                  <div className="divide-y divide-[#EFEAE0] bg-white border border-[#DDD5C7] rounded-xs p-3">
                    {product.availableColors.map((color) => {
                      const colorVariants = product.variants.filter((v) => v.color === color);
                      return (
                        <div
                          key={color}
                          className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                        >
                          <span className="font-bold text-[#1B2017]">{color}</span>
                          <span className="font-mono text-[#55604E]">
                            {colorVariants
                              .map((v) => `${v.length}" = $${v.price}`)
                              .join('  •  ')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="text-xs text-[#55604E] font-light leading-relaxed space-y-3 bg-white p-4 border border-[#DDD5C7] rounded-xs">
                  <p>
                    <strong className="text-[#1B2017]">Washing:</strong> Wash gently with warm water and a moisturizing shampoo. Do not rub or tangle the hair while washing.
                  </p>
                  <p>
                    <strong className="text-[#1B2017]">Conditioning:</strong> Apply conditioner from the middle to the ends. Gently comb through with a wide-tooth comb starting from the ends up.
                  </p>
                  <p>
                    <strong className="text-[#1B2017]">Heat Styling:</strong> Safe to curl, straighten, and blow dry. Always apply heat protectant spray before using hot tools.
                  </p>
                  <p>
                    <strong className="text-[#1B2017]">Bedtime:</strong> Sleep with a satin or silk bonnet or pillowcase to keep hair soft and tangle-free.
                  </p>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="text-xs text-[#55604E] font-light leading-relaxed space-y-3 bg-white p-4 border border-[#DDD5C7] rounded-xs">
                  <p>
                    <strong className="text-[#1B2017]">Fast DHL Express:</strong> All orders are dispatched within 24–48 hours with DHL Express tracking. Delivery takes 2 to 4 business days.
                  </p>
                  <p>
                    <strong className="text-[#1B2017]">Free Shipping:</strong> Enjoy free DHL Express worldwide shipping on all orders over $250 USD.
                  </p>
                  <p>
                    <strong className="text-[#1B2017]">30-Day Money Back Guarantee:</strong> If you are not satisfied, return your unopened bundles with intact security tags within 30 days for a full refund.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* RELATED PRODUCTS SECTION                              */}
        {/* ==================================================== */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-[#E5DFD2]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#95B373] font-bold block">
                Explore More
              </span>
              <h3 className="text-2xl font-serif text-[#1B2017]">
                Other Hair Products You May Like
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-xs uppercase tracking-wider text-[#95B373] hover:text-[#82A260] font-bold cursor-pointer"
            >
              View All 7 Textures →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => openProductModal(p)}
                className="bg-white border border-[#DDD5C7] hover:border-[#95B373] p-4 rounded-xs transition-all duration-200 cursor-pointer shadow-2xs group flex flex-col justify-between"
              >
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xs mb-3 bg-[#F4EFE6]">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#2B3E1F] font-bold uppercase tracking-wider block">
                    Sold as 1 Bundle
                  </span>
                  <h4 className="text-base font-serif text-[#1B2017] group-hover:text-[#95B373] transition-colors font-medium">
                    {p.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFEAE0]">
                    <span className="text-xs text-[#6A7563] font-mono">
                      {Math.min(...p.availableLengths)}" - {Math.max(...p.availableLengths)}"
                    </span>
                    <span className="text-sm font-serif font-bold text-[#1B2017]">
                      ${p.basePrice} USD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ==================================================== */}
      {/* FULL PAGE FOOTER BAR                                 */}
      {/* ==================================================== */}
      <footer className="bg-white border-t border-[#E8E2D5] py-6 px-4 sm:px-8 text-center text-xs text-[#6A7563]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleClose}
            className="flex items-center gap-1 text-[#95B373] hover:underline font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </button>
          <span>LIYU Human Hair • 100% Real Virgin & Raw Bundles • Sold as 1 bundle</span>
          <span>DHL Express Worldwide Delivery</span>
        </div>
      </footer>
    </div>
  );
};

export const ProductModal: React.FC = () => {
  const { selectedProduct } = useStore();

  if (!selectedProduct) return null;

  return <ProductModalContent product={selectedProduct} />;
};
