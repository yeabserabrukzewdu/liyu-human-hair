import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  Check,
  ArrowRight,
  ArrowLeft,
  Truck,
  Package,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';
import { StripeLogo, PayPalLogo, VisaLogo, MastercardLogo, AmexLogo } from './PaymentLogos';

const CheckoutContent: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    createOrder,
    setIsOrderTrackerOpen,
    openComplianceModal,
  } = useStore();

  const [paymentGateway, setPaymentGateway] = useState<'stripe' | 'paypal'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Delivery Address Form
  const [email, setEmail] = useState('yeabserabruk1234@gmail.com');
  const [firstName, setFirstName] = useState('Yeabsera');
  const [lastName, setLastName] = useState('Bruk');
  const [street, setStreet] = useState('450 Kensington High St');
  const [city, setCity] = useState('London');
  const [state, setState] = useState('Greater London');
  const [postalCode, setPostalCode] = useState('W14 8NZ');
  const [country, setCountry] = useState('United Kingdom');
  const [phone, setPhone] = useState('+44 20 7946 0912');

  // Stripe Card State
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState('Yeabsera Bruk');

  // PayPal Simulation State
  const [showPayPalPopup, setShowPayPalPopup] = useState(false);

  const handleCardNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const parts = cleaned.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(' ') : cleaned);
  };

  const fillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('12/29');
    setCardCvc('314');
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyCoupon(promoInput.trim());
    if (success) {
      setPromoMessage('Coupon code applied successfully!');
      setPromoInput('');
    } else {
      setPromoMessage('Invalid coupon code. Try LUXE15 or VIP15.');
    }
    setTimeout(() => setPromoMessage(null), 4000);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // Create confirmed order
      const newOrder = createOrder({
        customerName: `${firstName} ${lastName}`.trim(),
        customerEmail: email,
        shippingAddress: {
          street,
          city,
          state,
          postalCode,
          country,
        },
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          image:
            (item.product.colorImages && item.product.colorImages[item.variant.color]) ||
            item.product.images[0],
          color: item.variant.color,
          length: item.variant.length,
          price: item.variant.price,
          quantity: item.quantity,
        })),
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shippingFee: 0,
        total: cartTotal,
        paymentMethod: paymentGateway,
        paymentStatus: 'paid',
      });

      setCompletedOrder(newOrder);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#95B373', '#FAF7F2', '#2B3E1F', '#D4AF37'],
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }
    }, 1500);
  };

  const handlePayPalSimulatedAuth = () => {
    setShowPayPalPopup(false);
    handleProcessPayment();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  const totalBundleCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div
      id="full-checkout-page"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF7F2] min-h-screen text-[#1B2017] flex flex-col animate-in fade-in duration-200"
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
          <span>Back to Shopping</span>
        </button>

        <div onClick={handleClose} className="cursor-pointer" title="Return to Home">
          <Logo size="sm" layout="horizontal" variant="light" />
        </div>

        <div className="flex items-center gap-2 text-xs text-[#2B3E1F] bg-[#95B373]/15 px-3 py-1.5 rounded-xs border border-[#95B373]/30 font-bold">
          <Lock className="w-3.5 h-3.5 text-[#95B373]" />
          <span className="hidden sm:inline">256-Bit SSL Encrypted Checkout</span>
          <span className="sm:hidden">Secure Checkout</span>
        </div>
      </header>

      {/* ==================================================== */}
      {/* ORDER CONFIRMATION VIEW (IF COMPLETED)               */}
      {/* ==================================================== */}
      {completedOrder ? (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full flex-1 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#95B373]/20 border-2 border-[#95B373] text-[#2B3E1F] flex items-center justify-center mb-5 shadow-sm">
            <Check className="w-8 h-8 text-[#95B373]" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#95B373] font-bold block mb-1">
            Payment Successful
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1B2017] font-medium mb-3">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-[#55634E] max-w-md mx-auto mb-8 font-light leading-relaxed">
            We received your payment of <strong>${completedOrder.total} USD</strong>. A receipt and tracking details have been sent to <strong>{completedOrder.customerEmail}</strong>.
          </p>

          {/* Order Details Card */}
          <div className="bg-white border border-[#DDD5C7] w-full max-w-2xl rounded-xs p-6 sm:p-8 text-left shadow-xs mb-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFEAE0] gap-2">
              <div>
                <span className="text-xs text-[#6A7563] block">Order Number</span>
                <span className="font-mono text-sm font-bold text-[#1B2017]">
                  {completedOrder.id}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#6A7563] block">DHL Express Tracking</span>
                <span className="font-mono text-sm font-bold text-[#95B373]">
                  {completedOrder.trackingNumber}
                </span>
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#6A7563] font-bold block mb-1">
                Delivery Address:
              </span>
              <p className="text-xs text-[#1B2017]">
                {completedOrder.customerName}<br />
                {completedOrder.shippingAddress.street}<br />
                {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} {completedOrder.shippingAddress.postalCode}<br />
                {completedOrder.shippingAddress.country}
              </p>
            </div>

            {/* Items Summary */}
            <div className="pt-3 border-t border-[#EFEAE0]">
              <span className="text-xs uppercase tracking-wider text-[#6A7563] font-bold block mb-3">
                Ordered Bundles:
              </span>
              <div className="space-y-3">
                {completedOrder.items.map((it: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <img
                      src={it.image}
                      alt={it.productName}
                      className="w-12 h-14 object-cover rounded-xs border border-[#DDD5C7]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[#1B2017] font-semibold truncate">{it.productName}</p>
                      <p className="text-[#6A7563]">
                        {it.length}" • Color: {it.color} • {it.quantity} {it.quantity === 1 ? 'bundle' : 'bundles'} (${it.price} each)
                      </p>
                    </div>
                    <span className="font-mono font-bold text-[#1B2017]">
                      ${it.price * it.quantity} USD
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button
              onClick={handleClose}
              className="flex-1 py-3.5 bg-[#95B373] text-white hover:bg-[#82A260] text-xs uppercase tracking-[0.2em] font-bold transition-all rounded-xs shadow-sm cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                handleClose();
                setIsOrderTrackerOpen(true);
              }}
              className="flex-1 py-3.5 bg-white hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] text-xs uppercase tracking-[0.2em] font-bold transition-all rounded-xs shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Truck className="w-3.5 h-3.5 text-[#95B373]" />
              <span>Track Delivery</span>
            </button>
          </div>
        </main>
      ) : (
        /* ==================================================== */
        /* FULL PAGE CHECKOUT WORKFLOW                          */
        /* ==================================================== */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1B2017] font-medium">
              Checkout
            </h1>
            <p className="text-xs sm:text-sm text-[#55634E] mt-1 font-light">
              Please enter your delivery details and choose your preferred payment method.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ==================================================== */}
            {/* LEFT COLUMN: Customer Form & Payment (7 Cols)        */}
            {/* ==================================================== */}
            <div className="lg:col-span-7 space-y-8">
              {/* STEP 1: Delivery Address */}
              <div className="bg-white border border-[#DDD5C7] p-6 sm:p-7 rounded-xs shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#EFEAE0]">
                  <span className="w-6 h-6 rounded-full bg-[#95B373] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-sm uppercase tracking-wider font-bold text-[#1B2017]">
                    Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#55604E] font-medium mb-1">Email Address (for order tracking)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#55604E] font-medium mb-1">Street Address</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">ZIP / Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#55604E] font-medium mb-1">Phone Number (for DHL courier contact)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: Payment Method (Accurate Stripe, PayPal, Visa, Mastercard Logos) */}
              <div className="bg-white border border-[#DDD5C7] p-6 sm:p-7 rounded-xs shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#EFEAE0]">
                  <span className="w-6 h-6 rounded-full bg-[#95B373] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-sm uppercase tracking-wider font-bold text-[#1B2017]">
                    Payment Method
                  </h2>
                </div>

                {/* Gateway Selection Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* STRIPE PAYMENT SELECTION */}
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('stripe')}
                    className={`p-4 rounded-xs border-2 text-left transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                      paymentGateway === 'stripe'
                        ? 'border-[#95B373] bg-[#95B373]/10 text-[#1B2017]'
                        : 'border-[#DDD5C7] bg-white text-[#55604E] hover:border-[#95B373]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="flex items-center gap-2">
                        {/* ACCURATE STRIPE LOGO */}
                        <StripeLogo className="h-6 w-auto" />
                        <span className="text-xs font-bold text-[#1B2017]">Credit / Debit Card</span>
                      </div>
                      {paymentGateway === 'stripe' && (
                        <div className="w-4 h-4 rounded-full bg-[#95B373] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* ACCURATE MASTERCARD & VISA LOGOS DIRECTLY UNDER STRIPE */}
                    <div className="mt-2 pt-2 border-t border-[#DDD5C7]/70 flex items-center justify-between">
                      <span className="text-[11px] text-[#6A7563] font-medium">Supported cards:</span>
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 px-1.5 bg-white border border-[#DDD5C7] rounded flex items-center shadow-2xs">
                          <VisaLogo className="h-3.5 w-auto" />
                        </div>
                        <div className="h-6 px-1.5 bg-white border border-[#DDD5C7] rounded flex items-center shadow-2xs">
                          <MastercardLogo className="h-4 w-auto" />
                        </div>
                        <div className="h-6 px-1 bg-[#006FCF] border border-[#00559E] rounded flex items-center shadow-2xs">
                          <AmexLogo className="h-3.5 w-auto" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* PAYPAL PAYMENT SELECTION */}
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('paypal')}
                    className={`p-4 rounded-xs border-2 text-left transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                      paymentGateway === 'paypal'
                        ? 'border-[#95B373] bg-[#95B373]/10 text-[#1B2017]'
                        : 'border-[#DDD5C7] bg-white text-[#55604E] hover:border-[#95B373]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      {/* ACCURATE PAYPAL LOGO */}
                      <PayPalLogo className="h-6 w-auto" />
                      {paymentGateway === 'paypal' && (
                        <div className="w-4 h-4 rounded-full bg-[#95B373] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#DDD5C7]/70 text-[11px] text-[#6A7563]">
                      Pay in full or in 4 interest-free installments.
                    </div>
                  </button>
                </div>

                {/* STRIPE CARD FORM DETAILS */}
                {paymentGateway === 'stripe' && (
                  <div className="p-5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-[#95B373]" />
                        <span className="text-xs font-bold text-[#1B2017]">
                          Enter Card Details (Powered by Stripe)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={fillTestCard}
                        className="text-[11px] text-[#95B373] hover:underline font-bold cursor-pointer"
                      >
                        Fill Test Card (4242...)
                      </button>
                    </div>

                    {/* Mastercard and Visa Accepted Bar */}
                    <div className="flex items-center gap-2 text-xs text-[#55634E] pb-2 border-b border-[#E8E2D5]">
                      <span>Accepted Cards:</span>
                      <div className="flex items-center gap-2">
                        <VisaLogo className="h-3.5 w-auto" />
                        <MastercardLogo className="h-4 w-auto" />
                        <AmexLogo className="h-4 w-auto" />
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#55604E] font-medium mb-1">Name on Card</label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                          placeholder="Full Name"
                        />
                      </div>

                      <div>
                        <label className="block text-[#55604E] font-medium mb-1">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                            maxLength={19}
                            className="w-full p-2.5 pr-20 bg-white border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-mono font-medium"
                            placeholder="1234 5678 9012 3456"
                          />
                          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                            <VisaLogo className="h-3 w-auto" />
                            <MastercardLogo className="h-3.5 w-auto" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#55604E] font-medium mb-1">Expiration Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                            className="w-full p-2.5 bg-white border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-mono text-center font-medium"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-[#55604E] font-medium mb-1">CVC / Security Code</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            maxLength={4}
                            className="w-full p-2.5 bg-white border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-mono text-center font-medium"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PAYPAL PROMPT */}
                {paymentGateway === 'paypal' && (
                  <div className="p-6 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs text-center space-y-3">
                    <div className="flex justify-center">
                      <PayPalLogo className="h-7 w-auto" />
                    </div>
                    <p className="text-xs text-[#55634E] max-w-sm mx-auto">
                      Click below to proceed with PayPal. You will complete authorization safely through PayPal's secure gateway.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowPayPalPopup(true)}
                      className="w-full sm:w-auto px-8 py-3 bg-[#FFC439] hover:bg-[#F4BB30] text-[#003087] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
                    >
                      <PayPalLogo className="h-4 w-auto" />
                      <span>Authorize with PayPal</span>
                    </button>
                  </div>
                )}

                {/* COMPLIANCE & LEGAL NOTICE (Stripe & Card Brand Requirement) */}
                <div className="pt-2 pb-1 border-t border-[#EFEAE0]">
                  <p className="text-[11px] text-[#55634E] leading-relaxed text-center sm:text-left">
                    By clicking <strong>Place Order</strong>, you confirm you are 18+ and agree to LIYU's{' '}
                    <button
                      type="button"
                      onClick={() => openComplianceModal('terms')}
                      className="underline text-[#1B2017] hover:text-[#95B373] font-medium cursor-pointer"
                    >
                      Terms of Service
                    </button>
                    ,{' '}
                    <button
                      type="button"
                      onClick={() => openComplianceModal('privacy')}
                      className="underline text-[#1B2017] hover:text-[#95B373] font-medium cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    , and{' '}
                    <button
                      type="button"
                      onClick={() => openComplianceModal('refund')}
                      className="underline text-[#1B2017] hover:text-[#95B373] font-medium cursor-pointer"
                    >
                      Refund, Return & Cancellation Policy
                    </button>
                    . You acknowledge every item is sold as 1 bundle of 100% human hair and returns require unbroken security seals.
                  </p>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    id="checkout-submit-btn"
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={isProcessing || cart.length === 0}
                    className="w-full py-4 bg-[#95B373] hover:bg-[#82A260] disabled:opacity-50 text-white font-bold text-sm uppercase tracking-[0.2em] rounded-xs transition-all shadow-md shadow-[#95B373]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Secure Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order — ${cartTotal} USD</span>
                      </>
                    )}
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-[11px] text-[#6A7563]">
                    <span>🔒 256-Bit SSL Encryption</span>
                    <span>•</span>
                    <span>PCI-DSS Level 1</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => openComplianceModal('refund')}
                      className="underline hover:text-[#1B2017] cursor-pointer"
                    >
                      30-Day Money-Back Guarantee
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: Order Summary (5 Cols)                 */}
            {/* ==================================================== */}
            <div className="lg:col-span-5 bg-white border border-[#DDD5C7] p-6 sm:p-7 rounded-xs shadow-xs space-y-6 lg:sticky lg:top-20">
              <div>
                <h3 className="text-sm uppercase tracking-wider font-bold text-[#1B2017] pb-3 border-b border-[#EFEAE0] flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="font-mono text-xs font-bold text-[#95B373]">
                    {totalBundleCount} {totalBundleCount === 1 ? 'Bundle' : 'Bundles'}
                  </span>
                </h3>

                {/* Items list */}
                <div className="max-h-72 overflow-y-auto space-y-3.5 my-4 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={
                          (item.product.colorImages && item.product.colorImages[item.variant.color]) ||
                          item.product.images[0]
                        }
                        alt={`${item.product.name} - ${item.variant.color}`}
                        className="w-14 h-16 object-cover rounded-xs bg-[#FAF7F2] border border-[#DDD5C7] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-[#1B2017] font-semibold truncate text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-[#6A7563] text-xs">
                          {item.variant.length}" • Color: {item.variant.color}
                        </p>
                        <p className="text-[#2B3E1F] font-bold text-[11px] mt-0.5">
                          {item.quantity} {item.quantity === 1 ? 'bundle' : 'bundles'} (${item.variant.price} ea)
                        </p>
                      </div>
                      <span className="font-mono font-bold text-sm text-[#1B2017]">
                        ${item.variant.price * item.quantity} USD
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="pt-3 border-t border-[#EFEAE0]">
                <label className="block text-xs font-bold text-[#55604E] mb-1.5 uppercase tracking-wider">
                  Discount Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (e.g. LUXE15)"
                    className="flex-1 p-2 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#95B373] text-white hover:bg-[#82A260] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className="text-[11px] mt-1 text-[#2B3E1F] font-semibold">{promoMessage}</p>
                )}
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-[#2B3E1F] bg-[#95B373]/15 p-2 rounded-xs mt-2 font-semibold">
                    <span>Applied: {appliedCoupon}</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Pricing breakdown */}
              <div className="space-y-2 text-xs text-[#55604E] pt-4 border-t border-[#EFEAE0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-[#1B2017]">${cartSubtotal} USD</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#2B3E1F] font-bold">
                    <span>Discount</span>
                    <span className="font-mono">-${cartDiscount} USD</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (DHL Express)</span>
                  <span className="font-mono text-[#2B3E1F] font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-[#EFEAE0] text-sm text-[#1B2017] font-bold">
                  <span className="text-base font-serif">Total</span>
                  <span className="font-mono text-xl text-[#1B2017]">${cartTotal} USD</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-[#FAF7F2] p-4 rounded-xs border border-[#DDD5C7] space-y-2 text-xs text-[#55634E]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#95B373] shrink-0" />
                  <span>Delivered worldwide in 2–4 business days via DHL Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#95B373] shrink-0" />
                  <span>30-day money-back guarantee with unbroken security seals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#95B373] shrink-0" />
                  <span>Every product is sold as 1 bundle (~100g each)</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ==================================================== */}
      {/* PAYPAL POPUP MODAL SIMULATION                        */}
      {/* ==================================================== */}
      {showPayPalPopup && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-xs border border-[#DDD5C7] w-full max-w-md p-6 shadow-2xl space-y-4 text-center text-[#1B2017]">
            <div className="flex justify-center mb-2">
              <PayPalLogo className="h-8 w-auto" />
            </div>
            <h3 className="text-base font-bold">
              Confirm Payment with PayPal
            </h3>
            <p className="text-xs text-[#55634E]">
              Authorize your purchase of <strong>${cartTotal} USD</strong> using your PayPal account.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPayPalPopup(false)}
                className="flex-1 py-2.5 bg-white border border-[#DDD5C7] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePayPalSimulatedAuth}
                className="flex-1 py-2.5 bg-[#FFC439] hover:bg-[#F4BB30] text-[#003087] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen } = useStore();

  if (!isCheckoutOpen) return null;

  return <CheckoutContent />;
};

