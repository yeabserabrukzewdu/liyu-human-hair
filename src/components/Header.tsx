import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Bell, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection }) => {
  const {
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D5] py-3.5 shadow-sm'
          : 'bg-[#FAF7F2]/80 backdrop-blur-xs py-5 border-b border-[#EFE9DE]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: Mobile Menu Button + Brand Logo on the Left Side */}
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

            {/* Brand Logo with Official Medallion on the LEFT */}
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Logo size="sm" layout="horizontal" variant="light" />
            </div>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium text-[#485341]">
            <button
              onClick={() => handleNavClick('catalog-section')}
              className="hover:text-[#1B2017] transition-colors cursor-pointer"
            >
              All Hair Products
            </button>
            <button
              onClick={() => handleNavClick('raw-hair-section')}
              className="hover:text-[#1B2017] transition-colors cursor-pointer"
            >
              Raw Hair
            </button>
            <button
              onClick={() => handleNavClick('catalog-section')}
              className="hover:text-[#1B2017] transition-colors cursor-pointer"
            >
              Virgin Bundles
            </button>
            <button
              onClick={() => openComplianceModal('compliance')}
              className="hover:text-[#1B2017] transition-colors cursor-pointer"
            >
              Policies & Care
            </button>
          </nav>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger (Without ⌘K keyboard shortcut icon) */}
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
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E2D5] px-6 py-6 transition-all duration-300 shadow-xl">
          <div className="flex justify-start pb-5 mb-4 border-b border-[#E8E2D5]">
            <Logo size="md" layout="horizontal" variant="light" />
          </div>
          <div className="flex flex-col space-y-5 text-sm uppercase tracking-[0.2em] text-[#364230]">
            <button
              onClick={() => handleNavClick('catalog-section')}
              className="text-left hover:text-[#1B2017] py-1 font-medium cursor-pointer"
            >
              All Hair Products (7 Hair Types)
            </button>
            <button
              onClick={() => handleNavClick('raw-hair-section')}
              className="text-left hover:text-[#1B2017] py-1 cursor-pointer font-medium"
            >
              Single Donor Raw Hair
            </button>
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
              <span>100% Real Virgin & Raw Hair</span>
              <span>Fast DHL Delivery</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
