import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { RawHairSpotlight } from './components/RawHairSpotlight';
import { PersonalizedRecommendations } from './components/PersonalizedRecommendations';
import { ProductModal } from './components/ProductModal';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { NotificationCenter } from './components/NotificationCenter';
import { MobileNavBar } from './components/MobileNavBar';
import { ToastAlert } from './components/ToastAlert';
import { Footer } from './components/Footer';
import { ComplianceModal } from './components/ComplianceModal';

const AppContent: React.FC = () => {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1B2017] flex flex-col font-sans selection:bg-[#95B373]/30 selection:text-[#1B2017]">
      {/* Main Luxury Header */}
      <Header onNavigateSection={handleNavigateSection} />

      {/* Main Body */}
      <main className="flex-1">
        {/* Editorial Hero */}
        <Hero onExploreClick={scrollToCatalog} />

        {/* Catalog Grid with Textures, Colors, Lengths, and Price Filters */}
        <ProductGrid />

        {/* Single-Donor Raw Hair Spotlight (Atelier Blondes & Raw Burmese) */}
        <RawHairSpotlight />

        {/* Personalized Recommendations Based on Browsing History */}
        <PersonalizedRecommendations />
      </main>

      {/* Luxury Monochromatic Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNavBar />

      {/* Modals & Slide-over Drawers */}
      <ProductModal />
      <SearchModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <WishlistDrawer />
      <NotificationCenter />
      <ToastAlert />
      <ComplianceModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
