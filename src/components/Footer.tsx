import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Lock, Truck, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { StripeLogo, PayPalLogo, VisaLogo, MastercardLogo } from './PaymentLogos';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { openComplianceModal, navigateToPage } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="footer-section" className="bg-[#FAF7F2] border-t border-[#E5DFD2] text-[#55604E] pt-16 pb-24 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#E5DFD2]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-2 cursor-pointer" onClick={() => navigateToPage('home')}>
              <Logo size="md" layout="horizontal" variant="light" />
            </div>

            <p className="text-xs text-[#5D6756] font-light leading-relaxed max-w-sm">
              Brazilian & Vietnamese human hair bundles in Double Donors (85%–90% equal length) and Super Double Donors (100% equal length). Every item is displayed with our exact 1 piece price.
            </p>

            <div className="flex items-center gap-4 text-xs pt-2">
              <div className="flex items-center gap-1.5 text-[#2C3E1F] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#95B373]" />
                <span className="text-[11px]">100% Real Hair Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#2C3E1F] font-medium">
                <Truck className="w-4 h-4 text-[#95B373]" />
                <span className="text-[11px]">Fast DHL Worldwide</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Hair Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1B2017] font-bold mb-4">
              Hair Collections
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <button
                  onClick={() => navigateToPage('collections', { donor: 'all' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#1B2017] font-semibold"
                >
                  All Collections (7 Textures)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('collections', { donor: 'Double Donor' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#2E3C25]"
                >
                  Double Donors (Brazil · 85–90%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('collections', { donor: 'Super Double Donor' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#2E3C25]"
                >
                  Super Double Donors (Vietnam · 100%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('collections', { texture: 'Wave' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer"
                >
                  Wave Brazilian Hair
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('collections', { texture: 'Deep Frizz' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer"
                >
                  Deep Frizz Brazilian Hair
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('collections', { texture: 'Ocean Wave' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer"
                >
                  Ocean Wave Vietnamese Hair
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('collections', { texture: 'Burmese' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer"
                >
                  Burmese Brazilian Hair
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Our Stores */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1B2017] font-bold mb-4">
              Our Stores
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <button
                  onClick={() => navigateToPage('stores')}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#1B2017] font-semibold flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#95B373]" />
                  <span>All Boutiques & Ateliers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('stores', { storeId: 'bole-flagship' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer"
                >
                  Bole Flagship (Addis Ababa)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('stores', { storeId: 'kazanchis-vip' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer"
                >
                  Kazanchis VIP Fitting Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('stores', { storeId: 'dubai-showroom' })}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer"
                >
                  Dubai Luxury Showroom
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('stores')}
                  className="hover:text-[#1B2017] text-left transition-colors text-[#95B373] font-medium cursor-pointer"
                >
                  Book In-Store Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care & Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1B2017] font-bold mb-4">
              Client Care & Policies
            </h4>
            <ul className="space-y-2 text-xs font-light mb-6">
              <li>
                <button
                  onClick={() => openComplianceModal('refund')}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#485341] font-medium"
                >
                  Refund & Return Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openComplianceModal('shipping')}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#485341]"
                >
                  Shipping & Delivery (DHL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openComplianceModal('compliance')}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#95B373] font-semibold flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Stripe & Card Compliance</span>
                </button>
              </li>
            </ul>

            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#1B2017] font-bold mb-2">
              Get Discounts
            </h5>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-white border border-[#DDD5C7] text-[#1B2017] text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-[#95B373] placeholder-[#888888] shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#95B373] hover:bg-[#82A260] text-white text-xs uppercase font-bold rounded-xs transition-colors shadow-xs cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-[#2C401D] font-bold">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Secure Payment Gateways & Card Network Compliance */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-light">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-[#6B7565] text-[11px]">
            <span>© {new Date().getFullYear()} LIYU Human Hair Studio. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>100% Real Human Hair • 1 Piece Price Guaranteed</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openComplianceModal('terms')}
                className="hover:text-[#1B2017] transition-colors cursor-pointer"
              >
                Terms
              </button>
              <button
                onClick={() => openComplianceModal('privacy')}
                className="hover:text-[#1B2017] transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <button
                onClick={() => openComplianceModal('refund')}
                className="hover:text-[#1B2017] transition-colors cursor-pointer"
              >
                Refunds
              </button>
              <button
                onClick={() => openComplianceModal('compliance')}
                className="hover:text-[#1B2017] transition-colors cursor-pointer text-[#95B373] font-medium"
              >
                Compliance
              </button>
            </div>
          </div>

          {/* Payment Gateways Accurate Logotypes */}
          <div className="flex items-center gap-2 text-[#5A6553]">
            <div className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded-xs shadow-xs">
              <Lock className="w-3 h-3 text-[#95B373]" />
              <StripeLogo className="h-4 w-auto" />
            </div>
            <div className="flex items-center px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded-xs shadow-xs">
              <PayPalLogo className="h-4 w-auto" />
            </div>
            <div className="h-7 px-2 bg-white border border-[#DDD5C7] rounded-xs flex items-center shadow-xs">
              <VisaLogo className="h-3.5 w-auto" />
            </div>
            <div className="h-7 px-2 bg-white border border-[#DDD5C7] rounded-xs flex items-center shadow-xs">
              <MastercardLogo className="h-4 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
