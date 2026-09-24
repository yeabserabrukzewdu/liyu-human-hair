import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Lock, Truck, FileText } from 'lucide-react';
import { Logo } from './Logo';
import { StripeLogo, PayPalLogo, VisaLogo, MastercardLogo } from './PaymentLogos';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { openComplianceModal } = useStore();
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
            <div className="mb-2">
              <Logo size="md" layout="horizontal" variant="light" />
            </div>

            <p className="text-xs text-[#5D6756] font-light leading-relaxed max-w-sm">
              100% real virgin and raw human hair bundles. Cuticles in one direction, strong double wefts, and zero chemical mixing. Every item is sold as 1 bundle.
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

          {/* Quick Links: Textures */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1B2017] font-bold mb-4">
              Hair Types
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#catalog-section" className="hover:text-[#95B373] transition-colors">
                  Wave Human Hair
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#95B373] transition-colors">
                  Pixie Curl Human Hair
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#95B373] transition-colors">
                  Fumi Curl Human Hair
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#95B373] transition-colors">
                  Deep Frizz Human Hair
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#95B373] transition-colors">
                  Burmese Human Hair
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#95B373] transition-colors">
                  Ocean Wave Human Hair
                </a>
              </li>
              <li>
                <a href="#raw-hair-section" className="hover:text-[#1B2017] transition-colors text-[#95B373] font-medium">
                  Raw Hair Blondes
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Help & Support */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1B2017] font-bold mb-4">
              Client Care & Policies
            </h4>
            <ul className="space-y-2 text-xs font-light">
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
                  onClick={() => openComplianceModal('refund')}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#485341]"
                >
                  Order Cancellation Policy
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
                  onClick={() => openComplianceModal('terms')}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#485341]"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => openComplianceModal('privacy')}
                  className="hover:text-[#95B373] text-left transition-colors cursor-pointer text-[#485341]"
                >
                  Privacy & Data Policy
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
          </div>

          {/* Newsletter sign-up */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1B2017] font-bold mb-4">
              Get Discounts
            </h4>
            <p className="text-xs text-[#5D6756] font-light mb-3">
              Subscribe to get secret sales and discount coupon codes directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-white border border-[#DDD5C7] text-[#1B2017] text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#95B373] placeholder-[#888888] shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#95B373] hover:bg-[#82A260] text-white text-xs uppercase font-bold rounded-xs transition-colors shadow-xs cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#2C401D] font-bold">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Secure Payment Gateways & Card Network Compliance */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-light">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-[#6B7565] text-[11px]">
            <span>© {new Date().getFullYear()} LIYU Human Hair Studio LLC. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>100% Real Human Hair • Sold as 1 Bundle</span>
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
