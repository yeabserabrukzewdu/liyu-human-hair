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
  Mail,
  Bell,
  Clock,
  Phone,
  MessageCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';
import { StripeLogo, PayPalLogo, VisaLogo, MastercardLogo, AmexLogo } from './PaymentLogos';
import { EmailPreviewModal } from './EmailPreviewModal';
import { createMailtoLink } from '../utils/emailService';

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
    createOrder,
    setIsOrderTrackerOpen,
    openComplianceModal,
    ownerEmail,
    ownerPhone,
    stripeComingSoon,
    lastDispatchedEmails,
  } = useStore();

  const [paymentGateway, setPaymentGateway] = useState<'reservation' | 'stripe'>('reservation');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Email Preview Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalTab, setEmailModalTab] = useState<'buyer' | 'owner'>('buyer');

  // Customer Contact & Delivery Form
  const [email, setEmail] = useState('yeabserabruk1234@gmail.com');
  const [firstName, setFirstName] = useState('Yeabsera');
  const [lastName, setLastName] = useState('Bruk');
  const [street, setStreet] = useState('450 Kensington High St');
  const [city, setCity] = useState('London');
  const [state, setState] = useState('Greater London');
  const [postalCode, setPostalCode] = useState('W14 8NZ');
  const [country, setCountry] = useState('United Kingdom');
  const [phone, setPhone] = useState('+44 20 7946 0912');
  const [notes, setNotes] = useState('');

  const [formError, setFormError] = useState<string | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput.trim());
    if (res.success) {
      setPromoMessage('Coupon code applied successfully!');
      setPromoInput('');
    } else {
      setPromoMessage(res.message || 'Invalid coupon code. Try LUXE15 or VIP15.');
    }
    setTimeout(() => setPromoMessage(null), 4000);
  };

  const handleProcessOrderRequest = () => {
    if (!email || !phone || !firstName || !lastName) {
      setFormError('Please fill in your full name, email address, and phone number so we can reserve your pieces and send confirmation emails.');
      return;
    }
    setFormError(null);

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // Create confirmed order request
      const newOrder = createOrder({
        customerName: `${firstName} ${lastName}`.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        customerNotes: notes.trim(),
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
        paymentMethod: 'order_reservation',
        paymentStatus: 'reservation_confirmed',
      });

      setCompletedOrder(newOrder);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#95B373', '#FAF7F2', '#2B3E1F', '#D4AF37'],
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  const openEmailModalFor = (tab: 'buyer' | 'owner') => {
    setEmailModalTab(tab);
    setIsEmailModalOpen(true);
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
          <ShieldCheck className="w-3.5 h-3.5 text-[#95B373]" />
          <span className="hidden sm:inline">Secure Order & Reservation Portal</span>
          <span className="sm:hidden">Order Portal</span>
        </div>
      </header>

      {/* ==================================================== */}
      {/* ORDER CONFIRMATION VIEW (AFTER SUBMISSION)          */}
      {/* ==================================================== */}
      {completedOrder ? (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full flex-1 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#95B373]/20 border-2 border-[#95B373] text-[#2B3E1F] flex items-center justify-center mb-4 shadow-sm">
            <Check className="w-8 h-8 text-[#95B373]" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Order Request Received & Confirmed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif text-[#1B2017] font-medium mb-2">
            Thank You! Your Request Has Been Logged
          </h1>
          <p className="text-sm text-[#55634E] max-w-lg mx-auto mb-6 font-light leading-relaxed">
            Your authentic human hair bundles have been reserved under Reference ID{' '}
            <strong className="text-[#1B2017] font-mono">{completedOrder.id}</strong>. Because online card payments (Stripe) are currently in <em>Coming Soon</em> status,{' '}
            <strong className="text-[#2B3E1F]">zero upfront payment was charged today</strong>.
          </p>

          {/* ==================================================== */}
          {/* CRITICAL FEATURE: DUAL EMAIL DISPATCH BANNER        */}
          {/* ==================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-6 text-left">
            {/* 1. Buyer Email Confirmation Card */}
            <div className="p-4 bg-white border-2 border-[#95B373] rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#1B2017] uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-[#95B373]" />
                  <span>Confirmation Sent to Buyer</span>
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  Delivered
                </span>
              </div>
              <p className="text-xs text-[#55634E] leading-relaxed">
                An itemized confirmation email has been dispatched to{' '}
                <strong className="text-[#1B2017]">{completedOrder.customerEmail}</strong> detailing your bundle lengths, colors, and zero upfront payment status.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openEmailModalFor('buyer')}
                  className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] rounded-xs text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#95B373]" />
                  <span>Preview Buyer Email</span>
                </button>
                <a
                  href={`mailto:${completedOrder.customerEmail}`}
                  className="px-3 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#444E3D] border border-[#DDD5C7] rounded-xs text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open in Mail App</span>
                </a>
              </div>
            </div>

            {/* 2. Owner Alert Email Card */}
            <div className="p-4 bg-white border-2 border-amber-400 rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#1B2017] uppercase tracking-wider">
                  <Bell className="w-4 h-4 text-amber-500" />
                  <span>Alert Sent to Website Owner</span>
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                  Delivered
                </span>
              </div>
              <p className="text-xs text-[#55634E] leading-relaxed">
                The website owner (<strong className="text-[#1B2017]">{ownerEmail}</strong>) was immediately alerted with your contact info, phone, email, and requested products.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openEmailModalFor('owner')}
                  className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] rounded-xs text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Preview Owner Alert</span>
                </button>
                <a
                  href={`https://wa.me/${ownerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello LIYU Hair Atelier! I just submitted order request #${completedOrder.id}. My name is ${completedOrder.customerName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xs text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-white border border-[#DDD5C7] w-full max-w-2xl rounded-xs p-6 sm:p-7 text-left shadow-xs mb-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFEAE0] gap-2">
              <div>
                <span className="text-xs text-[#6A7563] block">Reservation ID</span>
                <span className="font-mono text-sm font-bold text-[#1B2017]">
                  {completedOrder.id}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#6A7563] block">DHL Express Tracking Slot</span>
                <span className="font-mono text-sm font-bold text-[#95B373]">
                  {completedOrder.trackingNumber}
                </span>
              </div>
            </div>

            {/* Customer & Delivery address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="uppercase tracking-wider text-[#6A7563] font-bold block mb-1">
                  Customer Contact on File:
                </span>
                <p className="text-[#1B2017] font-medium leading-relaxed">
                  <strong>{completedOrder.customerName}</strong><br />
                  Email: {completedOrder.customerEmail}<br />
                  Phone: {completedOrder.customerPhone || phone}
                </p>
              </div>
              <div>
                <span className="uppercase tracking-wider text-[#6A7563] font-bold block mb-1">
                  Destination Address:
                </span>
                <p className="text-[#55634E] leading-relaxed">
                  {completedOrder.shippingAddress.street}<br />
                  {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} {completedOrder.shippingAddress.postalCode}<br />
                  <strong>{completedOrder.shippingAddress.country}</strong>
                </p>
              </div>
            </div>

            {/* Items Summary */}
            <div className="pt-3 border-t border-[#EFEAE0]">
              <span className="text-xs uppercase tracking-wider text-[#6A7563] font-bold block mb-3">
                Reserved Bundles ({completedOrder.items.reduce((s: number, i: any) => s + i.quantity, 0)} pieces):
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
              <div className="mt-3 pt-3 border-t border-[#DDD5C7] flex justify-between items-center text-sm font-bold">
                <span>Total Reserved Value:</span>
                <span className="font-mono text-base text-[#1B2017]">${completedOrder.total} USD</span>
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
              <span>Track Reservation</span>
            </button>
          </div>
        </main>
      ) : (
        /* ==================================================== */
        /* ORDER NOW WORKFLOW (COMING SOON: STRIPE NOTICE)      */
        /* ==================================================== */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
          {/* Prominent Coming Soon Luxury Notice Banner */}
          <div className="mb-8 p-5 sm:p-6 bg-gradient-to-r from-[#FAF3E0] via-[#FAF7F2] to-[#FAF3E0] border-2 border-[#D4AF37] rounded-xs shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#8C6D1F] shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-[#8C6D1F]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <span className="px-2.5 py-0.5 bg-[#8C6D1F] text-white text-[10px] uppercase font-bold tracking-widest rounded-xs">
                    Notice: Online Card Payments Coming Soon
                  </span>
                  <span className="text-xs text-[#8C6D1F] font-semibold">
                    Stripe Merchant Account Verification in Progress
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#1B2017] mb-1">
                  Place Your Order Now with Zero Upfront Payment
                </h2>
                <p className="text-xs sm:text-sm text-[#55634E] leading-relaxed">
                  We are currently awaiting final business verification documents and company cards for our automated Stripe payment gateway. In the meantime, you can <strong>confirm your order request right now below</strong>. We will reserve your authentic human hair bundles, <strong>email you an itemized confirmation</strong>, and <strong>alert our website owner ({ownerEmail})</strong> with your contact details!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ==================================================== */}
            {/* LEFT COLUMN: Customer Form & Payment (7 Cols)        */}
            {/* ==================================================== */}
            <div className="lg:col-span-7 space-y-8">
              {/* STEP 1: Customer Contact & Delivery Info */}
              <div className="bg-white border border-[#DDD5C7] p-6 sm:p-7 rounded-xs shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFEAE0]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#95B373] text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-sm uppercase tracking-wider font-bold text-[#1B2017]">
                      Customer Contact & Delivery Information
                    </h2>
                  </div>
                  <span className="text-[11px] text-[#6A7563]">Required for email confirmation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">
                      Email Address (for Order Confirmation) *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                    <span className="text-[10px] text-[#6A7563] mt-0.5 block">
                      An itemized confirmation email will be sent here upon submission.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 911 ... or +44 ..."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                    <span className="text-[10px] text-[#6A7563] mt-0.5 block">
                      For courier delivery coordination and WhatsApp status updates.
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#55604E] font-medium mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">City *</label>
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
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">ZIP / Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[#55604E] font-medium mb-1">Country *</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#55604E] font-medium mb-1">
                      Special Requests / Hair Sourcing Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="e.g. Please match bundle lusters, or need matching HD lace closure, etc."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: Payment Method & Coming Soon Status */}
              <div className="bg-white border border-[#DDD5C7] p-6 sm:p-7 rounded-xs shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#EFEAE0]">
                  <span className="w-6 h-6 rounded-full bg-[#95B373] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-sm uppercase tracking-wider font-bold text-[#1B2017]">
                    Payment & Reservation Method
                  </h2>
                </div>

                {/* Option 1: ACTIVE ORDER RESERVATION */}
                <div
                  onClick={() => setPaymentGateway('reservation')}
                  className="p-5 rounded-xs border-2 border-[#95B373] bg-[#95B373]/10 cursor-pointer shadow-xs relative transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#95B373] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#1B2017] block">
                          Order Request & Reservation (Recommended)
                        </span>
                        <span className="text-[11px] text-[#2B3E1F] font-bold">
                          Zero Upfront Payment · Instant Email Sent to Buyer & Website Owner
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#95B373] text-white text-[10px] uppercase font-bold tracking-wider rounded-xs">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#55634E] leading-relaxed pl-7">
                    Place your order request now without entering card details. We reserve your pieces from our authentic Brazilian/Vietnamese batches, email you an itemized confirmation, and immediately alert the website owner (<strong className="text-[#1B2017]">{ownerEmail}</strong>) with your contact information.
                  </p>
                </div>

                {/* Option 2: STRIPE ONLINE PAYMENT (COMING SOON) */}
                <div className="p-5 rounded-xs border-2 border-dashed border-[#DDD5C7] bg-[#F9F6F0]/80 relative opacity-90">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <StripeLogo className="h-6 w-auto grayscale contrast-125" />
                      <span className="text-xs font-bold text-[#6A7563]">
                        Stripe Credit / Debit Card & Apple Pay
                      </span>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-300 text-[10px] uppercase font-bold tracking-wider rounded-xs self-start sm:self-auto">
                      Coming Soon — Pending Documents
                    </span>
                  </div>

                  <p className="text-xs text-[#6A7563] leading-relaxed mb-3">
                    Direct automated card checkout via Stripe is temporarily in <strong>Coming Soon</strong> status while our merchant documentation and business card are finalized.
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#DDD5C7]/70">
                    <span className="text-[11px] text-[#6A7563]">Supported when live:</span>
                    <div className="flex items-center gap-1.5 opacity-60">
                      <div className="h-5 px-1.5 bg-white border border-[#DDD5C7] rounded flex items-center">
                        <VisaLogo className="h-3 w-auto" />
                      </div>
                      <div className="h-5 px-1.5 bg-white border border-[#DDD5C7] rounded flex items-center">
                        <MastercardLogo className="h-3.5 w-auto" />
                      </div>
                      <div className="h-5 px-1.5 bg-white border border-[#DDD5C7] rounded flex items-center">
                        <AmexLogo className="h-3.5 w-auto" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* COMPLIANCE & LEGAL NOTICE */}
                <div className="pt-2 pb-1 border-t border-[#EFEAE0]">
                  <p className="text-[11px] text-[#55634E] leading-relaxed text-center sm:text-left">
                    By submitting your order request, you agree to LIYU's{' '}
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
                      Return Policy
                    </button>
                    . All items sold as 100% genuine virgin human hair bundles (1 piece price).
                  </p>
                </div>

                {/* FORM VALIDATION ERROR BANNER */}
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    id="checkout-submit-btn"
                    type="button"
                    onClick={handleProcessOrderRequest}
                    disabled={isProcessing || cart.length === 0}
                    className="w-full py-4 bg-[#95B373] hover:bg-[#82A260] disabled:opacity-50 text-white font-bold text-sm uppercase tracking-[0.2em] rounded-xs transition-all shadow-md shadow-[#95B373]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Emails & Reserving Bundles...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Confirm Order Request & Reserve ({totalBundleCount} {totalBundleCount === 1 ? 'Bundle' : 'Bundles'})</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#6A7563] mt-2 font-medium">
                    Zero charge today · Itemized confirmation sent to {email || 'your email'} · Alert sent to website owner ({ownerEmail})
                  </p>
                </div>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: Order Summary & Item List (5 Cols)     */}
            {/* ==================================================== */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#DDD5C7] p-6 rounded-xs shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFEAE0]">
                  <h3 className="text-sm font-serif font-bold text-[#1B2017]">
                    Order Request Summary
                  </h3>
                  <span className="text-xs font-mono text-[#6A7563]">
                    {totalBundleCount} {totalBundleCount === 1 ? 'Bundle' : 'Bundles'}
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const itemImg =
                      (item.product.colorImages && item.product.colorImages[item.variant.color]) ||
                      item.product.images[0];
                    return (
                      <div key={item.id} className="flex gap-3 text-xs">
                        <img
                          src={itemImg}
                          alt={item.product.name}
                          className="w-14 h-16 object-cover rounded-xs border border-[#DDD5C7] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-semibold text-[#1B2017] truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[#6A7563] mt-0.5">
                            {item.variant.length}" • {item.variant.color} • {item.product.donorCategory}
                          </p>
                          <p className="text-[11px] text-[#2C401D] font-mono mt-0.5 font-medium">
                            1 Piece Price: ${item.variant.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right font-mono font-bold text-[#1B2017]">
                          ${item.variant.price * item.quantity} USD
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-3 border-t border-[#EFEAE0]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (LUXE15)"
                      className="flex-1 p-2 bg-[#FAF7F2] border border-[#DDD5C7] focus:border-[#95B373] focus:outline-none rounded-xs text-xs uppercase font-medium"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] rounded-xs text-xs font-bold uppercase transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className="text-[11px] text-[#2B3E1F] mt-1.5 font-medium">{promoMessage}</p>
                  )}
                </form>

                {/* Subtotal Calculations */}
                <div className="space-y-2 text-xs text-[#55634E] pt-3 border-t border-[#EFEAE0]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#1B2017]">${cartSubtotal} USD</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-[#2B3E1F] font-bold">
                      <span>VIP Discount ({appliedCoupon})</span>
                      <span className="font-mono">-${cartDiscount} USD</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>DHL Express Delivery</span>
                    <span className="font-mono text-[#2B3E1F] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-serif text-[#1B2017] pt-2 border-t border-[#EFEAE0] font-bold">
                    <span>Total Request Value</span>
                    <span className="font-mono">${cartTotal} USD</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#2B3E1F] bg-[#95B373]/15 p-2 rounded-xs font-bold">
                    <span>Due Today:</span>
                    <span>$0.00 USD (Stripe Coming Soon)</span>
                  </div>
                </div>

                {/* Guarantees Box */}
                <div className="p-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs text-[11px] text-[#55634E] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#1B2017]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#95B373]" />
                    <span>LIYU Atelier Guarantee</span>
                  </div>
                  <p>
                    • 100% cuticle-aligned virgin Brazilian & Vietnamese human hair.
                  </p>
                  <p>
                    • 1 piece price clearly marked (~100g per bundle).
                  </p>
                  <p>
                    • Your order request will be held for 7 days with zero cancellation penalty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Dispatched Email Preview Modal */}
      <EmailPreviewModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        buyerEmail={lastDispatchedEmails?.buyerEmail}
        ownerEmail={lastDispatchedEmails?.ownerEmail}
        initialTab={emailModalTab}
      />
    </div>
  );
};

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen } = useStore();

  if (!isCheckoutOpen) return null;

  return <CheckoutContent />;
};
