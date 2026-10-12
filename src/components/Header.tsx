import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  MapPin, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';
import { STORES } from '../data/stores';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection }) => {
  const {
    currentPage,
    navigateToPage,
    cartCount,
    wishlistCount,
    unreadNotificationCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsNotificationCenterOpen,
    openComplianceModal,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hover states for desktop dropdowns
  const [collectionsHover, setCollectionsHover] = useState(false);
  const [storesHover, setStoresHover] = useState(false);

  // Mobile menu accordion toggles
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(true);
  const [mobileStoresOpen, setMobileStoresOpen] = useState(false);

  const collectionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const storesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCollectionsMouseEnter = () => {
    if (collectionsTimeoutRef.current) clearTimeout(collectionsTimeoutRef.current);
    setCollectionsHover(true);
  };

  const handleCollectionsMouseLeave = () => {
    collectionsTimeoutRef.current = setTimeout(() => {
      setCollectionsHover(false);
    }, 150);
  };

  const handleStoresMouseEnter = () => {
    if (storesTimeoutRef.current) clearTimeout(storesTimeoutRef.current);
    setStoresHover(true);
  };

  const handleStoresMouseLeave = () => {
    storesTimeoutRef.current = setTimeout(() => {
      setStoresHover(false);
    }, 150);
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      navigateToPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      if (onNavigateSection) {
        onNavigateSection(sectionId);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D5] py-3 shadow-sm'
          : 'bg-[#FAF7F2]/90 backdrop-blur-xs py-4.5 border-b border-[#EFE9DE]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#2B3525] hover:text-[#95B373] transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Brand Logo: Clicking navigates to Home */}
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={() => {
                navigateToPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Return to Home"
            >
              <Logo size="sm" layout="horizontal" variant="light" />
            </div>
          </div>

          {/* CENTER: Desktop Navigation Links with Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-medium text-[#485341]">
            {/* 1. HOME */}
            <button
              onClick={() => {
                navigateToPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-[#1B2017] transition-colors cursor-pointer py-2 ${
                currentPage === 'home' ? 'text-[#1B2017] font-bold border-b-2 border-[#1B2017]' : ''
              }`}
            >
              Home
            </button>

            {/* 2. HAIR COLLECTIONS (WITH HOVER DROPDOWN) */}
            <div
              className="relative"
              onMouseEnter={handleCollectionsMouseEnter}
              onMouseLeave={handleCollectionsMouseLeave}
            >
              <button
                onClick={() => navigateToPage('collections', { donor: 'all', texture: 'all' })}
                className={`flex items-center gap-1.5 py-2 hover:text-[#1B2017] transition-colors cursor-pointer group ${
                  currentPage === 'collections' ? 'text-[#1B2017] font-bold border-b-2 border-[#1B2017]' : ''
                }`}
              >
                <span>Hair Collections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    collectionsHover ? 'rotate-180 text-[#1B2017]' : 'text-[#7D8A74]'
                  }`}
                />
              </button>

              {/* Hover Dropdown Menu for Hair Collections */}
              {collectionsHover && (
                <div 
                  className="absolute top-full -left-4 w-[560px] bg-[#FAF7F2] border border-[#DDD5C7] shadow-xl p-7 pt-6 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-1 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  onMouseEnter={handleCollectionsMouseEnter}
                  onMouseLeave={handleCollectionsMouseLeave}
                >
                  {/* Top Header Link */}
                  <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#E8E1D3]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7E8B75]">
                      Atelier Collections
                    </span>
                    <button
                      onClick={() => {
                        setCollectionsHover(false);
                        navigateToPage('collections', { donor: 'all', texture: 'all' });
                      }}
                      className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1B2017] hover:text-[#95B373] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore All Textures</span>
                      <ArrowRight className="w-3 h-3 text-[#95B373]" />
                    </button>
                  </div>

                  {/* 2-Column Minimalist Layout */}
                  <div className="grid grid-cols-12 gap-7">
                    {/* Left Column: Donors by Fullness */}
                    <div className="col-span-7 space-y-4">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A9583] font-medium block">
                        By Fullness Ratio
                      </span>

                      {/* Double Donors */}
                      <div
                        onClick={() => {
                          setCollectionsHover(false);
                          navigateToPage('collections', { donor: 'Double Donor', texture: 'all' });
                        }}
                        className="group/donor cursor-pointer text-left"
                      >
                        <div className="flex items-baseline justify-between mb-0.5">
                          <h4 className="font-serif text-[15px] font-semibold text-[#1B2017] group-hover/donor:text-[#95B373] transition-colors">
                            Double Donors
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider text-[#73806D] font-mono">
                            85%–90% Equal
                          </span>
                        </div>
                        <p className="text-[11px] text-[#4E5A47] font-medium normal-case tracking-normal">
                          Brazilian Human Hair
                        </p>
                        <p className="text-[11px] text-[#6E7B68] font-light leading-relaxed normal-case tracking-normal mt-0.5">
                          Natural tapered density with fluid movement. Wave, Deep Frizz & Burmese.
                        </p>
                        <span className="text-[10px] text-[#8C9885] normal-case tracking-normal block mt-1">
                          1 piece price from $140
                        </span>
                      </div>

                      <div className="border-t border-[#ECE5D9]" />

                      {/* Super Double Donors */}
                      <div
                        onClick={() => {
                          setCollectionsHover(false);
                          navigateToPage('collections', { donor: 'Super Double Donor', texture: 'all' });
                        }}
                        className="group/donor cursor-pointer text-left"
                      >
                        <div className="flex items-baseline justify-between mb-0.5">
                          <h4 className="font-serif text-[15px] font-semibold text-[#1B2017] group-hover/donor:text-[#95B373] transition-colors">
                            Super Double Donors
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider text-[#73806D] font-mono">
                            100% Equal
                          </span>
                        </div>
                        <p className="text-[11px] text-[#4E5A47] font-medium normal-case tracking-normal">
                          Vietnamese Human Hair
                        </p>
                        <p className="text-[11px] text-[#6E7B68] font-light leading-relaxed normal-case tracking-normal mt-0.5">
                          Full thickness from weft root to ends. Pixie, Fumi & Ocean Wave.
                        </p>
                        <span className="text-[10px] text-[#8C9885] normal-case tracking-normal block mt-1">
                          1 piece price from $175
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Curated Textures */}
                    <div className="col-span-5 border-l border-[#E8E1D3] pl-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A9583] font-medium block mb-3">
                          Select Texture
                        </span>
                        <div className="space-y-1">
                          {[
                            { name: 'Wave', donor: 'Double Donor' },
                            { name: 'Pixie', donor: 'Super Double Donor' },
                            { name: 'Fumi', donor: 'Super Double Donor' },
                            { name: 'Deep Frizz', donor: 'Double Donor' },
                            { name: 'Burmese', donor: 'Double Donor' },
                            { name: 'Ocean Wave', donor: 'Super Double Donor' },
                          ].map((item) => (
                            <button
                              key={item.name}
                              onClick={() => {
                                setCollectionsHover(false);
                                navigateToPage('collections', { texture: item.name });
                              }}
                              className="group/tex w-full flex items-center justify-between py-1 text-xs text-[#2E3A26] hover:text-[#95B373] transition-colors cursor-pointer text-left normal-case tracking-normal"
                            >
                              <span className="group-hover/tex:font-medium">{item.name}</span>
                              <span className="text-[10px] text-[#A6AF9F] group-hover/tex:text-[#95B373] transition-colors">
                                →
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#ECE5D9] mt-3">
                        <span className="text-[10px] text-[#7C8875] leading-normal block normal-case tracking-normal">
                          100g ± 5g bundles · Hand-graded and transparently priced per 1 piece.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Bottom Hairline */}
                  <div className="mt-6 pt-3.5 border-t border-[#E8E1D3] flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#7C8875]">
                    <span>Machine-Reinforced Wefts</span>
                    <button
                      onClick={() => {
                        setCollectionsHover(false);
                        handleNavClick('donor-guide-section');
                      }}
                      className="hover:text-[#1B2017] transition-colors cursor-pointer font-semibold underline underline-offset-4 decoration-[#C9C1B2]"
                    >
                      Fullness Guide & Care
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. OUR STORES (WITH HOVER DROPDOWN) */}
            <div
              className="relative"
              onMouseEnter={handleStoresMouseEnter}
              onMouseLeave={handleStoresMouseLeave}
            >
              <button
                onClick={() => navigateToPage('stores')}
                className={`flex items-center gap-1.5 py-2 hover:text-[#1B2017] transition-colors cursor-pointer group ${
                  currentPage === 'stores' ? 'text-[#1B2017] font-bold border-b-2 border-[#1B2017]' : ''
                }`}
              >
                <span>Our Stores</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    storesHover ? 'rotate-180 text-[#1B2017]' : 'text-[#7D8A74]'
                  }`}
                />
              </button>

              {/* Hover Dropdown Menu for Our Stores */}
              {storesHover && (
                <div 
                  className="absolute top-full -left-12 w-[480px] bg-[#FAF7F2] border border-[#DDD5C7] shadow-xl p-7 pt-6 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-1 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  onMouseEnter={handleStoresMouseEnter}
                  onMouseLeave={handleStoresMouseLeave}
                >
                  {/* Top Header Link */}
                  <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#E8E1D3]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7E8B75]">
                      Atelier Boutiques & Suites
                    </span>
                    <button
                      onClick={() => {
                        setStoresHover(false);
                        navigateToPage('stores');
                      }}
                      className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1B2017] hover:text-[#95B373] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>All Locations</span>
                      <ArrowRight className="w-3 h-3 text-[#95B373]" />
                    </button>
                  </div>

                  {/* Clean Architectural Atelier List (No Cards-in-Cards) */}
                  <div className="space-y-4">
                    {STORES.map((store, index) => (
                      <div
                        key={store.id}
                        onClick={() => {
                          setStoresHover(false);
                          navigateToPage('stores', { storeId: store.id });
                        }}
                        className="group/store cursor-pointer text-left"
                      >
                        <div className="flex items-baseline justify-between mb-0.5">
                          <h4 className="font-serif text-[15px] font-semibold text-[#1B2017] group-hover/store:text-[#95B373] transition-colors">
                            {store.name}
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider text-[#73806D] font-mono">
                            {store.city}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#4E5A47] normal-case tracking-normal">
                          {store.address}
                        </p>
                        <p className="text-[11px] text-[#77846E] font-light leading-relaxed normal-case tracking-normal mt-0.5">
                          {store.tagline}
                        </p>

                        {index < STORES.length - 1 && (
                          <div className="border-t border-[#ECE5D9] mt-3.5" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Consultation Booking CTA - Minimalist & Elegant */}
                  <div className="mt-6 pt-4 border-t border-[#E8E1D3]">
                    <button
                      onClick={() => {
                        setStoresHover(false);
                        navigateToPage('stores');
                      }}
                      className="w-full py-2.5 bg-[#1B2017] hover:bg-[#2C3823] text-white text-[10px] uppercase tracking-[0.22em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#95B373]" />
                      <span>Reserve Private In-Store Appointment</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. FULLNESS GUIDE (SCROLLS ON HOMEPAGE) */}
            <button
              onClick={() => handleNavClick('donor-guide-section')}
              className="hover:text-[#1B2017] transition-colors cursor-pointer py-2"
            >
              Fullness Guide
            </button>

            {/* 5. POLICIES & CARE */}
            <button
              onClick={() => openComplianceModal('compliance')}
              className="hover:text-[#1B2017] transition-colors cursor-pointer py-2"
            >
              Policies & Care
            </button>
          </nav>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              id="search-trigger-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#485341] hover:text-[#1B2017] transition-colors flex items-center group cursor-pointer"
              title="Search collection"
              aria-label="Search collection"
            >
              <Search className="w-4 h-4 text-[#485341] group-hover:text-[#1B2017] transition-colors" />
            </button>

            {/* Notification Bell */}
            <button
              id="notification-trigger-btn"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative p-2 text-[#485341] hover:text-[#1B2017] transition-colors cursor-pointer"
              title="Order Updates & Flash Sales"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#95B373] rounded-full animate-pulse ring-2 ring-[#FAF7F2]" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              id="wishlist-trigger-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#485341] hover:text-[#1B2017] transition-colors cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[9px] w-4 h-4 rounded-full bg-[#95B373] text-white flex items-center justify-center font-mono font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              id="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#485341] hover:text-[#1B2017] transition-colors flex items-center gap-2 pl-3 border-l border-[#E5DFD2] cursor-pointer"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#1E2519]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 text-[9px] w-4 h-4 rounded-full bg-[#95B373] text-white font-bold flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline-block text-xs uppercase tracking-wider text-[#1E2519] font-semibold">
                Bag
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E2D5] px-6 py-6 transition-all duration-300 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex justify-between items-center pb-5 mb-4 border-b border-[#E8E2D5]">
            <Logo size="md" layout="horizontal" variant="light" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-[#485341]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 text-xs uppercase tracking-[0.2em] text-[#364230]">
            {/* Home link */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateToPage('home');
              }}
              className="text-left py-2 font-bold hover:text-[#1B2017] flex items-center justify-between cursor-pointer border-b border-[#EAE3D6]"
            >
              <span>Home</span>
              <span className="text-[10px] text-[#95B373]">Main</span>
            </button>

            {/* Hair Collections Accordion */}
            <div className="border-b border-[#EAE3D6] pb-3">
              <div className="flex items-center justify-between py-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateToPage('collections', { donor: 'all' });
                  }}
                  className="font-bold text-[#1B2017] hover:text-[#95B373] text-left cursor-pointer"
                >
                  Hair Collections
                </button>
                <button
                  onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                  className="p-1 text-[#5E6B57]"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCollectionsOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {mobileCollectionsOpen && (
                <div className="pl-3 pt-2.5 pb-1 space-y-2.5 text-xs normal-case tracking-normal">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToPage('collections', { donor: 'all' });
                    }}
                    className="block text-left text-[#1B2017] font-medium hover:text-[#95B373] transition-colors"
                  >
                    View All Collections (7 Textures)
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToPage('collections', { donor: 'Double Donor' });
                    }}
                    className="block text-left text-[#4C5946] hover:text-[#95B373] transition-colors"
                  >
                    Double Donors (Brazil · 85%–90%)
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToPage('collections', { donor: 'Super Double Donor' });
                    }}
                    className="block text-left text-[#4C5946] hover:text-[#95B373] transition-colors"
                  >
                    Super Double Donors (Vietnam · 100%)
                  </button>
                </div>
              )}
            </div>

            {/* Our Stores Accordion */}
            <div className="border-b border-[#EAE3D6] pb-3">
              <div className="flex items-center justify-between py-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateToPage('stores');
                  }}
                  className="font-bold text-[#1B2017] hover:text-[#95B373] text-left cursor-pointer"
                >
                  Our Stores
                </button>
                <button
                  onClick={() => setMobileStoresOpen(!mobileStoresOpen)}
                  className="p-1 text-[#5E6B57]"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileStoresOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {mobileStoresOpen && (
                <div className="pl-3 pt-2.5 pb-1 space-y-2.5 text-xs normal-case tracking-normal">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToPage('stores', { storeId: 'bole-flagship' });
                    }}
                    className="block text-left text-[#4C5946] hover:text-[#95B373] transition-colors"
                  >
                    Bole Flagship Atelier (Addis Ababa)
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToPage('stores', { storeId: 'kazanchis-vip' });
                    }}
                    className="block text-left text-[#4C5946] hover:text-[#95B373] transition-colors"
                  >
                    Kazanchis VIP Fitting Suite
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToPage('stores', { storeId: 'dubai-showroom' });
                    }}
                    className="block text-left text-[#4C5946] hover:text-[#95B373] transition-colors"
                  >
                    Dubai Luxury Showroom (Downtown)
                  </button>
                </div>
              )}
            </div>

            {/* Fullness Guide */}
            <button
              onClick={() => handleNavClick('donor-guide-section')}
              className="text-left hover:text-[#1B2017] py-1 cursor-pointer font-medium"
            >
              Fullness Guide (Double & Super Double)
            </button>

            {/* Saved Wishlist */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
              className="text-left hover:text-[#1B2017] py-1 flex items-center justify-between cursor-pointer"
            >
              <span>Saved Wishlist</span>
              <span className="text-xs text-[#6B7565] font-semibold">{wishlistCount} items</span>
            </button>

            {/* Policies */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openComplianceModal('compliance');
              }}
              className="text-left hover:text-[#1B2017] py-1 font-medium cursor-pointer flex items-center justify-between"
            >
              <span>Client Care & Policies</span>
              <span className="text-[10px] text-[#95B373] font-semibold uppercase tracking-wider">Compliance</span>
            </button>

            <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between text-xs text-[#737C6D] font-sans normal-case tracking-normal">
              <span>Brazilian & Vietnamese Human Hair</span>
              <span>1 Piece Price Guaranteed</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
