import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Lock,
  RotateCcw,
  Truck,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  Printer,
  ExternalLink,
  CreditCard,
  Package,
} from 'lucide-react';
import { useStore, ComplianceTab } from '../context/StoreContext';
import { Logo } from './Logo';
import { StripeLogo, PayPalLogo, VisaLogo, MastercardLogo, AmexLogo } from './PaymentLogos';

export const ComplianceModal: React.FC = () => {
  const { isComplianceOpen, setIsComplianceOpen, complianceTab, setComplianceTab } = useStore();
  const [copiedContact, setCopiedContact] = useState(false);

  if (!isComplianceOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('support@liyuhair.com');
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const tabs: { id: ComplianceTab; label: string; icon: React.ReactNode }[] = [
    { id: 'compliance', label: 'Merchant Compliance', icon: <Building2 className="w-4 h-4" /> },
    { id: 'refund', label: 'Refund, Return & Cancellation', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'terms', label: 'Terms of Service', icon: <FileText className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy Policy', icon: <Lock className="w-4 h-4" /> },
    { id: 'shipping', label: 'Shipping & Delivery', icon: <Truck className="w-4 h-4" /> },
    { id: 'security', label: 'Payment & PCI-DSS', icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div
      id="compliance-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={() => setIsComplianceOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="compliance-modal-title"
    >
      <div
        className="relative bg-[#FAF7F2] w-full max-w-5xl rounded-xs border border-[#DDD5C7] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-white border-b border-[#E8E2D5] px-5 sm:px-8 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Logo size="sm" layout="horizontal" variant="light" />
            <div className="h-6 w-px bg-[#E2DBD0] hidden sm:block" />
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#6A7563] block">
                Official Legal Disclosure
              </span>
              <h2 id="compliance-modal-title" className="text-sm font-bold text-[#1B2017]">
                Website Compliance & Legal Center
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-[#6A7563] hover:text-[#1B2017] hover:bg-[#FAF7F2] rounded-xs transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Print Policy Documents"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-medium">Print</span>
            </button>
            <button
              onClick={() => setIsComplianceOpen(false)}
              className="p-2 text-[#6A7563] hover:text-[#1B2017] hover:bg-[#FAF7F2] rounded-xs transition-colors cursor-pointer"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="bg-[#F4EFE6] border-b border-[#E2DBD0] px-4 sm:px-8 flex overflow-x-auto no-scrollbar gap-1 shrink-0">
          {tabs.map((tab) => {
            const isActive = complianceTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setComplianceTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-3 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#95B373] text-[#1B2017] bg-white shadow-2xs font-bold'
                    : 'border-transparent text-[#626E5A] hover:text-[#1B2017] hover:bg-white/40'
                }`}
              >
                <span className={isActive ? 'text-[#95B373]' : 'text-[#7D8874]'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Document Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 md:p-10 space-y-8 text-[#283222] font-light leading-relaxed text-sm bg-white">
          {/* ======================================================== */}
          {/* TAB 1: MERCHANT COMPLIANCE & LEGAL IDENTIFICATION        */}
          {/* ======================================================== */}
          {complianceTab === 'compliance' && (
            <div className="space-y-6">
              <div className="border-b border-[#EFE9DE] pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#95B373] font-bold block mb-1">
                  Card Network & Merchant Identification Standards
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2017]">
                  Merchant Compliance & Business Disclosure
                </h3>
                <p className="text-xs text-[#6A7563] mt-1">
                  In compliance with Visa Core Rules, Mastercard Operating Regulations, American Express Rules, and Stripe Merchant Terms.
                </p>
              </div>

              {/* Verified Business Identity Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1B2017] uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-[#95B373]" />
                    <span>Legal Business Entity</span>
                  </div>
                  <p className="text-xs text-[#3D4736] font-medium">LIYU Human Hair Studio LLC</p>
                  <p className="text-xs text-[#5D6755]">
                    Registered Business Address:<br />
                    1401 21st Street, Suite R<br />
                    Sacramento, CA 95811, United States
                  </p>
                  <p className="text-[11px] text-[#7A8572] font-mono">
                    Entity Type: Limited Liability Company (LLC)
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1B2017] uppercase tracking-wider">
                    <Mail className="w-4 h-4 text-[#95B373]" />
                    <span>Direct Customer Support Contacts</span>
                  </div>
                  <p className="text-xs text-[#3D4736]">
                    Email: <span className="font-mono font-semibold">support@liyuhair.com</span>
                  </p>
                  <p className="text-xs text-[#3D4736]">
                    Legal & Compliance: <span className="font-mono font-semibold">compliance@liyuhair.com</span>
                  </p>
                  <p className="text-xs text-[#3D4736]">
                    Toll-Free Phone: <span className="font-mono font-semibold">+1 (800) 549-8238</span>
                  </p>
                  <p className="text-[11px] text-[#7A8572]">
                    Support Hours: Mon–Fri 9:00 AM – 6:00 PM EST (Guaranteed 24-hr response SLA)
                  </p>
                </div>
              </div>

              {/* Product & Pricing Disclosures */}
              <div className="p-5 bg-white border border-[#E5DFD2] rounded-xs space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#1B2017] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#95B373]" />
                  <span>Product Specifications & Bundle Disclosure</span>
                </h4>
                <p className="text-xs text-[#53604C]">
                  <strong>Unit of Sale:</strong> Every product in our atelier catalog is clearly sold as <strong>1 individual bundle</strong> (~100 grams / 3.5 oz net weight each) unless explicitly labeled otherwise in product title.
                </p>
                <p className="text-xs text-[#53604C]">
                  <strong>Material Authenticity:</strong> 100% genuine virgin human hair or single-donor raw hair. Absolutely no synthetic hair fibers, animal fibers, or silicone coatings are used.
                </p>
                <p className="text-xs text-[#53604C]">
                  <strong>Billing Currency:</strong> All transactions are priced and billed in <strong>United States Dollars ($ USD)</strong>. Total order amounts, including free express shipping and applicable sales taxes, are itemized prior to final payment authorization.
                </p>
              </div>

              {/* Payment Methods & Processor Compliance */}
              <div className="p-5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#1B2017] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#95B373]" />
                  <span>Authorized Payment Methods & Gateways</span>
                </h4>
                <p className="text-xs text-[#53604C]">
                  LIYU Human Hair partners with authorized payment institutions to process transactions securely:
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DDD5C7] rounded-xs shadow-2xs">
                    <StripeLogo className="h-4 w-auto" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DDD5C7] rounded-xs shadow-2xs">
                    <PayPalLogo className="h-4 w-auto" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DDD5C7] rounded-xs shadow-2xs">
                    <VisaLogo className="h-3.5 w-auto" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DDD5C7] rounded-xs shadow-2xs">
                    <MastercardLogo className="h-4 w-auto" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DDD5C7] rounded-xs shadow-2xs">
                    <AmexLogo className="h-3.5 w-auto" />
                  </div>
                </div>
                <ul className="text-xs space-y-1.5 text-[#5A6553] list-disc list-inside">
                  <li>Credit & Debit Cards: Visa, MasterCard, American Express, Discover.</li>
                  <li>Direct Tokenized Processing via Stripe Elements (PCI-DSS Level 1 Certified).</li>
                  <li>PayPal Express Checkout with Buyer Protection.</li>
                  <li>3D Secure 2.0 (3DS2) cardholder authentication for fraud prevention.</li>
                </ul>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: REFUND, RETURN, AND CANCELLATION POLICY           */}
          {/* ======================================================== */}
          {complianceTab === 'refund' && (
            <div className="space-y-6">
              <div className="border-b border-[#EFE9DE] pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#95B373] font-bold block mb-1">
                  Mandatory Consumer Protection Disclosures
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2017]">
                  Refund, Return, and Cancellation Policy
                </h3>
                <p className="text-xs text-[#6A7563] mt-1">
                  Last Updated: September 2026 • Valid for all purchases made on liyuhair.com
                </p>
              </div>

              {/* Order Cancellation Clause */}
              <div className="p-4 bg-white border-l-4 border-[#95B373] border-y border-r border-[#E2DBD0] rounded-xs space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#1B2017] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#95B373]" />
                  <span>1. Order Cancellation Policy</span>
                </h4>
                <p className="text-xs text-[#3D4736]">
                  <strong>Pre-Fulfillment Cancellations (Within 2 Hours):</strong> You may cancel any order within <strong>2 hours</strong> of placement for a 100% full immediate refund, before the warehouse assigns fulfillment batches and prepares courier customs documentation.
                </p>
                <p className="text-xs text-[#5D6755]">
                  <strong>Post-Fulfillment / In-Transit:</strong> Once an order has been assigned a DHL Express air waybill and dispatched from our atelier warehouse, the order cannot be halted, rerouted, or cancelled. You may return the sealed items once delivered pursuant to our Return Policy below.
                </p>
              </div>

              {/* 30-Day Return Guarantee & Hygiene Policy */}
              <div className="space-y-4">
                <h4 className="text-sm uppercase tracking-wider font-bold text-[#1B2017]">
                  2. 30-Day Return Window & Sanitary Hygiene Requirements
                </h4>
                <p className="text-xs text-[#485341] leading-relaxed">
                  We stand behind the superior quality of our 100% real human hair. We offer a <strong>30-calendar-day return window</strong> from the date of confirmed DHL Express delivery.
                </p>

                <div className="p-4 bg-[#FAF7F2] border border-[#E0D8CA] rounded-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8C3A27] uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#8C3A27]" />
                    <span>Important Public Health & Hygiene Regulation</span>
                  </div>
                  <p className="text-xs text-[#4E5B47] leading-relaxed">
                    Under United States Federal Health and Safety Code, OSHA hygiene standards, and international regulations governing cosmetic and hair goods, <strong>human hair extensions are classified as an intimate personal hygiene product</strong>.
                  </p>
                  <p className="text-xs text-[#4E5B47] leading-relaxed">
                    To guarantee that every client receives completely pristine, hygienic, and unadulterated hair, returns and exchanges are strictly accepted <strong>ONLY IF ALL</strong> of the following conditions are met:
                  </p>
                  <ul className="text-xs space-y-2 text-[#4E5B47] list-disc list-inside bg-white p-3.5 rounded-xs border border-[#DDD5C7]">
                    <li>
                      <strong>Intact Security Seal:</strong> The golden security bundle loop zip-seal and tamper-evident tags must remain 100% intact, unbroken, and unopened.
                    </li>
                    <li>
                      <strong>Unworn & Unaltered:</strong> The hair has <em>never</em> been unrolled, finger-combed, brushed, washed, conditioned, chemically treated, bleached, colored, cut, heat-styled, or installed.
                    </li>
                    <li>
                      <strong>Original Packaging:</strong> Returned in the original protective satin storage pouch and box with all included care cards.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Non-Refundable Items Clause */}
              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-wider font-bold text-[#1B2017]">
                  3. Non-Refundable Situations
                </h4>
                <p className="text-xs text-[#485341]">
                  A return or refund will be denied and returned to sender under the following circumstances:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white border border-[#E2DBD0] rounded-xs">
                    <span className="font-bold text-[#8C3A27] block mb-1">Broken or Cut Security Seal</span>
                    <span className="text-[#64705D]">Any bundle where the security loop has been detached, clipped, or re-tied.</span>
                  </div>
                  <div className="p-3 bg-white border border-[#E2DBD0] rounded-xs">
                    <span className="font-bold text-[#8C3A27] block mb-1">Altered or Installed Hair</span>
                    <span className="text-[#64705D]">Hair that has been installed, sewn, bleached, dyed, or exposed to cosmetic products.</span>
                  </div>
                  <div className="p-3 bg-white border border-[#E2DBD0] rounded-xs">
                    <span className="font-bold text-[#8C3A27] block mb-1">Passed 30-Day Window</span>
                    <span className="text-[#64705D]">Return requests initiated more than 30 calendar days following delivery.</span>
                  </div>
                  <div className="p-3 bg-white border border-[#E2DBD0] rounded-xs">
                    <span className="font-bold text-[#8C3A27] block mb-1">Unauthorized Returns</span>
                    <span className="text-[#64705D]">Packages returned without an approved Return Merchandise Authorization (RMA) number.</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Return Process */}
              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-wider font-bold text-[#1B2017]">
                  4. Return Merchandise Authorization (RMA) Process
                </h4>
                <div className="space-y-2 text-xs text-[#485341]">
                  <p>
                    <strong>Step 1 — Request RMA:</strong> Email <span className="font-mono font-semibold">support@liyuhair.com</span> with your Order Number (e.g. LIYU-84920) and clear photograph(s) demonstrating the unbroken security loop seal.
                  </p>
                  <p>
                    <strong>Step 2 — Approval & Instructions:</strong> Our concierge team issues an RMA number and returns warehouse address within 24 hours.
                  </p>
                  <p>
                    <strong>Step 3 — Ship via Tracked Courier:</strong> Carefully package the sealed bundles and ship via a trackable carrier (DHL, FedEx, UPS). The customer is responsible for return transit shipping fees unless the return is due to our fulfillment error.
                  </p>
                </div>
              </div>

              {/* Refund Issuance & Timelines */}
              <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs space-y-2 text-xs">
                <h4 className="font-bold text-[#1B2017] uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#95B373]" />
                  <span>5. Refund Processing & Bank Timelines</span>
                </h4>
                <p className="text-[#4E5B47]">
                  Upon physical receipt at our inspection atelier, returns are inspected within <strong>48 to 72 business hours</strong>.
                </p>
                <p className="text-[#4E5B47]">
                  Once approved, your refund will be credited back automatically to your <strong>original method of payment</strong> (Visa, Mastercard, Amex, Stripe, or PayPal).
                </p>
                <p className="text-[#4E5B47]">
                  <strong>Processing Time:</strong> Most card issuers and banks reflect the credit within <strong>5 to 7 business days</strong>. No restocking fees are deducted for returns meeting sanitary requirements.
                </p>
              </div>

              {/* Damaged or Defective Items */}
              <div className="p-4 bg-white border border-[#E2DBD0] rounded-xs space-y-2 text-xs">
                <h4 className="font-bold text-[#1B2017] uppercase tracking-wider">
                  6. Damaged, Defective, or Incorrect Shipments
                </h4>
                <p className="text-[#4E5B47]">
                  If your package arrives damaged by the courier or you received an incorrect bundle texture or length, contact us at <span className="font-mono font-semibold">support@liyuhair.com</span> within <strong>48 hours of delivery</strong> with photos of the package and item.
                </p>
                <p className="text-[#4E5B47]">
                  We will immediately provide a prepaid DHL Express return label and expedite a replacement bundle at zero expense.
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: TERMS OF SERVICE                                  */}
          {/* ======================================================== */}
          {complianceTab === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-[#EFE9DE] pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#95B373] font-bold block mb-1">
                  Binding Legal Agreement
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2017]">
                  Terms of Service
                </h3>
                <p className="text-xs text-[#6A7563] mt-1">
                  Effective Date: September 2026 • Governed under the laws of the State of California, United States
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#485341] leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">1. Acceptance of Terms</h4>
                  <p>
                    By accessing, browsing, or making a purchase on LIYU Human Hair (liyuhair.com), you acknowledge and agree to be bound by these Terms of Service, our Privacy Policy, and our Refund & Cancellation Policy. If you do not agree, you must discontinue use of the site immediately.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">2. Age Requirement & Eligibility</h4>
                  <p>
                    You must be at least 18 years of age or the age of legal majority in your jurisdiction to make purchases on this website. By placing an order, you represent that you possess the legal authority to enter into binding agreements.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">3. Products, Specifications & Sold-As-Bundle Disclosure</h4>
                  <p>
                    LIYU Human Hair specializes in 100% human hair extensions, including cuticle-aligned virgin hair and single-donor raw hair. <strong>Every hair item is sold as 1 bundle (~100 grams / 3.5 oz)</strong> unless explicitly indicated. Due to the genuine biological nature of raw human hair, subtle variances in natural donor color undertones and wave patterns are natural hallmarks of authenticity.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">4. Pricing, Currency & Payment Authorization</h4>
                  <p>
                    All listed prices are displayed and charged in United States Dollars ($ USD). When submitting an order, you authorize LIYU and our payment partners (Stripe, PayPal) to charge your designated credit card or payment instrument. We reserve the right to correct typographical pricing errors prior to shipment.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">5. Fraud Prevention & Order Verification</h4>
                  <p>
                    To protect genuine cardholders against unauthorized charges, all transactions undergo real-time automated fraud screening, Address Verification Service (AVS), Card Verification Value (CVV) checks, and 3D Secure 2.0 verification. Orders flagging high fraud risk may require secondary identity confirmation or be cancelled with immediate refund.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">6. Intellectual Property & Trademarks</h4>
                  <p>
                    All trademarks, logos, service marks, imagery, product descriptions, editorial text, and website design elements are the exclusive intellectual property of LIYU Human Hair Studio LLC and are protected under international copyright and trademark laws.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">7. Limitation of Liability</h4>
                  <p>
                    To the maximum extent permitted by applicable law, LIYU Human Hair Studio LLC shall not be liable for indirect, incidental, or consequential damages resulting from the use or inability to use our products or website. In no event shall our total aggregate liability exceed the total purchase price paid for the specific order in dispute.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">8. Governing Law & Dispute Resolution</h4>
                  <p>
                    These Terms of Service and all related transactions shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: PRIVACY POLICY                                    */}
          {/* ======================================================== */}
          {complianceTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-[#EFE9DE] pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#95B373] font-bold block mb-1">
                  Data Protection & Confidentiality
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2017]">
                  Privacy Policy
                </h3>
                <p className="text-xs text-[#6A7563] mt-1">
                  Compliant with GDPR (EU), CCPA/CPRA (California), and PCI-DSS Level 1 Security Requirements
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#485341] leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">1. Information We Collect</h4>
                  <p>
                    When you interact with our website or place an order, we collect information necessary to fulfill your purchases and comply with tax and courier regulations:
                  </p>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-[#55634E]">
                    <li>Full Name, Shipping Address, Billing Address, and Contact Telephone.</li>
                    <li>Email Address for order tracking, receipts, and customer service.</li>
                    <li>IP address, browser type, and device telemetry for fraud detection.</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs space-y-2">
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#95B373]" />
                    <span>2. Cardholder Data & PCI-DSS Tokenization</span>
                  </h4>
                  <p className="text-[#3D4736]">
                    <strong>We never store, see, or transmit raw credit card numbers:</strong> All payment details entered during checkout are submitted directly to our PCI-DSS Level 1 certified payment partners (Stripe Inc. and PayPal Holdings Inc.) via encrypted iframes and tokenized APIs.
                  </p>
                  <p className="text-[#55634E]">
                    LIYU servers only store non-sensitive transaction tokens, the last 4 digits of the card for your reference, and payment approval codes.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">3. Use of Your Personal Information</h4>
                  <p>
                    Your data is strictly utilized for:
                  </p>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-[#55634E]">
                    <li>Processing, packing, and dispatching your human hair bundles.</li>
                    <li>DHL Express international customs documentation and airway bill creation.</li>
                    <li>Transmitting order confirmation and delivery status notifications.</li>
                    <li>Preventing credit card fraud and unauthorized chargebacks.</li>
                  </ul>
                  <p className="mt-2 font-medium text-[#1B2017]">
                    We do NOT sell, rent, or trade your personal data to third-party data brokers or advertisers.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">4. Your Legal Rights (GDPR & CCPA/CPRA)</h4>
                  <p>
                    Regardless of your geographic location, you have the right to request access to the personal data we hold about you, request corrections to erroneous records, or request complete deletion of your customer profile (subject to statutory tax retention periods).
                  </p>
                  <p className="mt-1">
                    To exercise these rights, email our Data Privacy Officer at <span className="font-mono font-semibold">privacy@liyuhair.com</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: SHIPPING & DELIVERY POLICY                        */}
          {/* ======================================================== */}
          {complianceTab === 'shipping' && (
            <div className="space-y-6">
              <div className="border-b border-[#EFE9DE] pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#95B373] font-bold block mb-1">
                  Global Logistics & Fulfillment SLA
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2017]">
                  Shipping & Delivery Policy
                </h3>
                <p className="text-xs text-[#6A7563] mt-1">
                  Official Carrier: DHL Express Worldwide • Carbon-Neutral Flight Transport
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs text-center space-y-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#1B2017] block">Express Transit</span>
                  <span className="text-2xl font-serif font-bold text-[#95B373] block">2–4 Days</span>
                  <span className="text-[11px] text-[#6A7563]">Worldwide Air Delivery</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs text-center space-y-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#1B2017] block">Dispatch Window</span>
                  <span className="text-2xl font-serif font-bold text-[#1B2017] block">24–48 Hrs</span>
                  <span className="text-[11px] text-[#6A7563]">Atelier Quality Inspection</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs text-center space-y-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#1B2017] block">Shipping Fee</span>
                  <span className="text-2xl font-serif font-bold text-[#95B373] block">FREE</span>
                  <span className="text-[11px] text-[#6A7563]">Complimentary on all orders</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#485341] leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">Signature Confirmation on Delivery</h4>
                  <p>
                    To eliminate porch piracy and protect both client and merchant, all orders over $250 USD require a direct physical signature upon DHL delivery. If you are unavailable, DHL will hold the package at your local depot or offer authorized redelivery through the DHL On-Demand Delivery portal.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider mb-1">Customs, Duties & Import Taxes</h4>
                  <p>
                    For international shipments outside the United States, customs duties and value-added taxes (VAT) are assessed by destination country customs authorities. LIYU Human Hair complies with international commercial invoicing standards.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: PAYMENT SECURITY & PCI-DSS                        */}
          {/* ======================================================== */}
          {complianceTab === 'security' && (
            <div className="space-y-6">
              <div className="border-b border-[#EFE9DE] pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#95B373] font-bold block mb-1">
                  Financial Cryptography & Network Certifications
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2017]">
                  Payment Security & PCI-DSS Compliance
                </h3>
                <p className="text-xs text-[#6A7563] mt-1">
                  Adherence to Visa Security Standards, Mastercard SDP, and PCI-DSS Level 1 Requirements
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#485341] leading-relaxed">
                <div className="p-4 bg-white border border-[#E2DBD0] rounded-xs space-y-2">
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#95B373]" />
                    <span>Payment Card Industry Data Security Standard (PCI-DSS)</span>
                  </h4>
                  <p>
                    LIYU Human Hair operates strictly under <strong>PCI-DSS SAQ A compliance</strong>. Cardholder payment interactions take place within sandboxed, tokenized frames provided directly by Stripe (certified PCI-DSS Level 1 Service Provider).
                  </p>
                  <p>
                    At no stage does unencrypted primary account number (PAN), CVV/CVC, or PIN data enter or reside on LIYU web servers.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs space-y-2">
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#95B373]" />
                    <span>256-Bit TLS 1.3 Encryption & Secure Channels</span>
                  </h4>
                  <p>
                    All web communications between your device and our checkout gateway are encrypted with high-grade TLS 1.3 protocols utilizing SHA-256 with RSA/ECDSA encryption.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E2DBD0] rounded-xs space-y-2">
                  <h4 className="font-bold text-[#1B2017] uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#95B373]" />
                    <span>3D Secure 2.0 (3DS2) Authentication</span>
                  </h4>
                  <p>
                    Our payment infrastructure supports EMV 3-D Secure (Verified by Visa, Mastercard Identity Check, American Express SafeKey) to authenticate cardholders with biometric and one-time password (OTP) verification, dramatically reducing fraud and chargeback friction.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="bg-[#FAF7F2] border-t border-[#E8E2D5] px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 text-xs text-[#5D6755]">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#95B373]" />
              Stripe & Card Brand Verified
            </span>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={handleCopyEmail}
              className="text-[#1B2017] font-mono hover:text-[#95B373] underline transition-colors cursor-pointer"
            >
              {copiedContact ? 'Email Copied!' : 'support@liyuhair.com'}
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsComplianceOpen(false)}
              className="px-6 py-2.5 bg-[#95B373] hover:bg-[#82A260] text-white text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer shadow-xs"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
