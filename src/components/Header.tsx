import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory, ActivePage } from '../types';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    setIsWishlistDrawerOpen,
    cart,
    wishlist,
    setActiveCategory
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (page: ActivePage, category?: ProductCategory) => {
    setActivePage(page);
    if (category) {
      setActiveCategory(category);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Trang chủ', page: 'home' as ActivePage },
    { label: 'Cửa hàng', page: 'shop' as ActivePage, category: 'all' as ProductCategory },
    { label: 'Hoa sinh nhật', page: 'shop' as ActivePage, category: 'birthday' as ProductCategory },
    { label: 'Hoa tình yêu', page: 'shop' as ActivePage, category: 'love' as ProductCategory },
    { label: 'Hoa cưới', page: 'shop' as ActivePage, category: 'wedding' as ProductCategory },
    { label: 'Hoa khai trương', page: 'shop' as ActivePage, category: 'grand-opening' as ProductCategory },
    { label: 'Về chúng tôi', page: 'about' as ActivePage },
    { label: 'Liên hệ', page: 'contact' as ActivePage },
  ];

  return (
    <>
      {/* Top Banner Info */}
      <div className="bg-[#304238] text-[#FFFDF8] text-xs sm:text-sm py-2.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        <span className="hidden sm:inline font-semibold">🌸 Giao hoa hỏa tốc trong 2H</span>
        <span className="opacity-60 hidden sm:inline">•</span>
        <span>
          Hotline CSKH: <a href="tel:0913337280" className="text-[#D9A6A6] font-bold hover:underline">0913 337 280</a>
        </span>
        <span className="opacity-60 hidden md:inline">•</span>
        <span>Nhập mã <strong className="text-[#D9A6A6] font-bold">FLOWER10</strong> giảm 10% đơn đầu tiên</span>
        <span className="opacity-60 hidden lg:inline">•</span>
        <button 
          onClick={() => handleNavClick('admin')}
          className="hidden md:inline-flex items-center gap-1.5 text-xs bg-[#FFFDF8]/15 hover:bg-[#FFFDF8]/25 px-2.5 py-1 rounded-md transition text-[#FFFDF8] font-medium"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#D9A6A6]" />
          <span>Quản trị viên</span>
        </button>
      </div>

      {/* Main Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF8]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-[#F5EFE7]'
            : 'bg-[#FFFDF8] border-b border-[#F5EFE7]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2.5 -ml-2 text-[#304238] hover:text-[#C98282] transition-colors"
                aria-label="Mở thực đơn"
              >
                <Menu className="w-6 h-6" />
              </button>

              <button
                id="mobile-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-[#304238] hover:text-[#C98282] transition-colors ml-1"
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <button
                id="brand-logo-btn"
                onClick={() => handleNavClick('home')}
                className="group inline-block text-left"
              >
                <span className="font-editorial text-3xl sm:text-4xl tracking-[0.18em] font-semibold text-[#304238] block transition-transform group-hover:scale-[1.01]">
                  LUMIÈRE
                </span>
                <span className="text-xs sm:text-xs tracking-[0.35em] text-[#9AA88F] uppercase font-bold block -mt-1">
                  Haute Floriculture
                </span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  id={`nav-link-${idx}`}
                  onClick={() => handleNavClick(link.page, link.category)}
                  className={`text-sm xl:text-[15px] font-semibold tracking-wide transition-colors relative py-1 uppercase ${
                    activePage === link.page
                      ? 'text-[#304238] font-bold'
                      : 'text-[#252525]/80 hover:text-[#C98282]'
                  }`}
                >
                  {link.label}
                  {activePage === link.page && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D9A6A6]"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Action Utilities */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              {/* Search */}
              <button
                id="desktop-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full text-[#304238] hover:bg-[#F5EFE7] hover:text-[#C98282] transition-colors"
                aria-label="Tìm kiếm sản phẩm"
                title="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                id="header-wishlist-btn"
                onClick={() => handleNavClick('wishlist')}
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-[#304238] hover:bg-[#F5EFE7] hover:text-[#C98282] transition-colors"
                aria-label="Danh sách yêu thích"
                title="Danh sách yêu thích"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D9A6A6] text-white text-[11px] font-bold rounded-full flex items-center justify-center leading-none">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account */}
              <button
                id="header-account-btn"
                onClick={() => handleNavClick('account')}
                className="flex items-center justify-center w-10 h-10 rounded-full text-[#304238] hover:bg-[#F5EFE7] hover:text-[#C98282] transition-colors"
                aria-label="Tài khoản của tôi"
                title="Tài khoản"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                id="header-cart-btn"
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-2 bg-[#304238] text-[#FFFDF8] hover:bg-[#252525] px-4 py-2.5 rounded-full transition-all duration-200 shadow-sm ml-1"
                aria-label="Giỏ hàng"
              >
                <ShoppingBag className="w-4 h-4 text-[#D9A6A6]" />
                <span className="text-xs sm:text-sm font-bold hidden sm:inline">Giỏ hàng</span>
                <span className="w-5 h-5 bg-[#D9A6A6] text-[#304238] text-xs font-bold rounded-full flex items-center justify-center leading-none">
                  {totalCartCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-[#FFFDF8] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div>
                {/* Header in Drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-[#F5EFE7]">
                  <div>
                    <span className="font-editorial text-2xl tracking-[0.2em] font-semibold text-[#304238] block">
                      LUMIÈRE
                    </span>
                    <span className="text-[9px] tracking-[0.3em] text-[#9AA88F] uppercase font-medium">
                      Haute Floriculture
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-[#F5EFE7] text-[#304238] hover:bg-[#D9A6A6] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation List */}
                <nav className="py-6 space-y-1">
                  {navLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(link.page, link.category)}
                      className={`w-full flex items-center justify-between py-3 px-3 rounded-lg text-left text-sm font-medium transition-colors ${
                        activePage === link.page
                          ? 'bg-[#F5EFE7] text-[#304238] font-semibold'
                          : 'text-[#252525]/80 hover:bg-[#F5EFE7]/50 hover:text-[#C98282]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </button>
                  ))}

                  <div className="pt-4 border-t border-[#F5EFE7] mt-4 space-y-1">
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-sm font-medium text-[#304238] bg-[#9AA88F]/15"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#304238]" />
                        Trang Quản trị Admin
                      </span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </button>
                  </div>
                </nav>
              </div>

              {/* Drawer Footer Contact */}
              <div className="pt-6 border-t border-[#F5EFE7] space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#252525]/90">
                  <div className="w-10 h-10 rounded-full bg-[#F5EFE7] flex items-center justify-center text-[#304238] shrink-0">
                    <Phone className="w-5 h-5 text-[#C98282]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#304238]">Hotline Dịch vụ Khách hàng</div>
                    <a href="tel:0913337280" className="text-[#C98282] font-bold text-base hover:underline">0913 337 280</a>
                  </div>
                </div>
                <div className="text-xs text-stone-600 text-center font-medium">
                  Lumière Boutique • 92 Nguyễn Hữu Cảnh, TP.HCM
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
