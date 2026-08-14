/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Preloader } from './components/Preloader';
import { PetalEffect } from './components/PetalEffect';
import { ToastContainer } from './components/Toast';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FlashSaleSection } from './components/FlashSaleSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { WishlistPage } from './components/WishlistPage';
import { UserAccountPage } from './components/UserAccountPage';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchOverlay } from './components/SearchOverlay';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activePage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF8] text-[#252525] font-sans antialiased selection:bg-[#D9A6A6] selection:text-white">
      {/* Luxury Intro Preloader */}
      <Preloader />

      {/* Subtle Floating Petals Atmospheric Effect */}
      <PetalEffect />

      {/* Global Toast Notifications */}
      <ToastContainer />

      {/* Global Header */}
      <Header />

      {/* Main Dynamic Page Switcher */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <CategorySection />
            <FlashSaleSection />
            <FeaturedProducts />
          </>
        )}

        {activePage === 'shop' && (
          <div className="py-8">
            <FeaturedProducts />
          </div>
        )}

        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'wishlist' && <WishlistPage />}
        {activePage === 'account' && <UserAccountPage />}
        {activePage === 'admin' && <AdminDashboard />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Drawers & Overlays */}
      <CartDrawer />
      <SearchOverlay />
      <ProductDetailModal />
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
