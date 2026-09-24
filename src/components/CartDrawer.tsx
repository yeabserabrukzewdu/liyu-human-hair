import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Tag, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

const CartDrawerContent: React.FC = () => {
  const {
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    openProductModal,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const freeShippingProgress = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-content"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF7F2] border-l border-[#DDD5C7] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 text-[#1B2017]"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E5DFD2]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Logo size="xs" layout="horizontal" variant="light" />
              <span className="text-xs font-mono text-[#6A7563]">
                ({cart.reduce((s, i) => s + i.quantity, 0)} bundles)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6A7563] hover:text-[#1B2017] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Worldwide Shipping Progress Bar */}
          <div className="bg-white p-3 rounded-xs border border-[#DDD5C7] shadow-xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-[#2C3E1F] font-medium">
                <Truck className="w-3.5 h-3.5 text-[#95B373]" />
                {amountToFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#1B2017] font-mono">${amountToFreeShipping} USD</strong> for Free DHL Express
                  </span>
                ) : (
                  <span className="text-[#2B401D] font-bold">
                    You've unlocked Free DHL Express Worldwide!
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] text-[#6A7563] font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#EFEAE0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#95B373] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white border border-[#DDD5C7] rounded-xs group relative shadow-xs"
              >
                {/* Thumbnail */}
                <img
                  src={(item.product.colorImages && item.product.colorImages[item.variant.color]) || item.product.images[0]}
                  alt={`${item.product.name} - ${item.variant.color}`}
                  className="w-18 h-22 object-cover object-center rounded bg-[#FAF7F2] shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsCartOpen(false);
                    openProductModal(item.product);
                  }}
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          setIsCartOpen(false);
                          openProductModal(item.product);
                        }}
                        className="text-sm font-serif text-[#1B2017] font-medium hover:text-[#95B373] cursor-pointer truncate"
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#888888] hover:text-rose-500 transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#6A7563] mt-0.5 space-x-2 font-medium">
                      <span>Length: {item.variant.length}"</span>
                      <span>•</span>
                      <span>Color: {item.variant.color}</span>
                    </div>

                    <div className="text-[10px] text-[#2B3E1F] font-bold mt-0.5">
                      1 Bundle (${item.variant.price} USD each)
                    </div>

                    <div className="text-[10px] font-mono text-[#888888] mt-0.5">
                      SKU: {item.variant.sku}
                    </div>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFEAE0]">
                    <div className="flex items-center border border-[#DDD5C7] rounded-xs bg-[#FAF7F2]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#6A7563] hover:text-[#1B2017] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-mono text-xs text-[#1B2017] font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#6A7563] hover:text-[#1B2017] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-[#1B2017] font-bold">
                        ${item.variant.price * item.quantity} USD
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-[#7A8574] block">
                          (${item.variant.price} ea)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="mb-4">
                <Logo size="md" layout="full-picture" variant="light" />
              </div>
              <p className="text-sm font-serif text-[#1B2017] font-medium mb-2">Your shopping bag is empty</p>
              <p className="text-xs text-[#6A7563] max-w-xs mx-auto mb-6">
                Discover our single-donor raw hair and 100% virgin human hair textures.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#95B373] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#82A260] transition-colors cursor-pointer rounded-xs shadow-xs"
              >
                Explore The Catalog
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E5DFD2] bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#95B373]/15 border border-[#95B373]/40 rounded-xs text-xs">
                  <div className="flex items-center gap-2 text-[#243916] font-bold">
                    <Check className="w-4 h-4 text-[#95B373]" />
                    <span>
                      Promo <strong>{appliedCoupon}</strong> active (-${cartDiscount} USD)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#6A7563] hover:text-[#1B2017] text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (try LUXE15 or LIYU10)"
                      className="w-full bg-[#FAF7F2] border border-[#DDD5C7] text-[#1B2017] text-xs pl-8 pr-3 py-2 rounded-xs focus:outline-none focus:border-[#95B373] uppercase placeholder-normal font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#95B373] hover:bg-[#82A260] text-white text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer shadow-xs"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-500 mt-1 font-medium">{couponError}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#55604E] pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#1B2017] font-semibold">${cartSubtotal} USD</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#2C421D] font-bold">
                  <span>VIP Discount ({appliedCoupon})</span>
                  <span className="font-mono">-${cartDiscount} USD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping (DHL Worldwide)</span>
                <span className="font-mono text-[#1B2017] font-semibold">
                  {amountToFreeShipping === 0 ? 'FREE' : '$15.00 USD'}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif text-[#1B2017] pt-2 border-t border-[#EFEAE0]">
                <span className="font-semibold">Total</span>
                <span className="font-bold font-sans">${cartTotal} USD</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="drawer-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-[#95B373] hover:bg-[#82A260] text-white font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#95B373]/20 rounded-xs"
            >
              <span>Secure Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Payment Icons Preview */}
            <div className="flex items-center justify-center gap-3 text-[10px] text-[#6A7563] uppercase tracking-wider font-medium">
              <span>Stripe 256-bit</span>
              <span>•</span>
              <span>PayPal Express</span>
              <span>•</span>
              <span>Apple Pay</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CartDrawer: React.FC = () => {
  const { isCartOpen } = useStore();

  if (!isCartOpen) return null;

  return <CartDrawerContent />;
};

