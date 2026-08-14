import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const SearchOverlay: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    formatPrice, 
    setSelectedProduct, 
    setActivePage,
    setActiveCategory
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.flowerTypes.some(f => f.toLowerCase().includes(query.toLowerCase())) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSearches = [
    'Hồng Ohara Pháp',
    'Mẫu đơn New Zealand',
    'Hoa cưới trắng',
    'Kệ khai trương',
    'Hoa sinh nhật'
  ];

  const handleProductSelect = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsSearchOpen(false);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (catSlug: ProductCategory) => {
    setActiveCategory(catSlug);
    setIsSearchOpen(false);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative max-w-4xl mx-auto mt-8 sm:mt-16 mx-4 bg-[#FFFDF8] rounded-3xl shadow-2xl overflow-hidden border border-[#F5EFE7] z-10"
        >
          {/* Search Header Input */}
          <div className="p-6 sm:p-8 border-b border-[#F5EFE7] flex items-center gap-4">
            <Search className="w-6 h-6 text-[#304238] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm hoa hồng Ohara, mẫu đơn, hoa sinh nhật, hoa cưới..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base sm:text-xl font-editorial text-[#252525] bg-transparent focus:outline-none placeholder:text-stone-400 placeholder:font-sans placeholder:text-sm sm:placeholder:text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-full hover:bg-[#F5EFE7] text-stone-600 transition-colors shrink-0"
              aria-label="Đóng tìm kiếm"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
            
            {query.trim() === '' ? (
              <div className="space-y-6">
                {/* Popular Searches */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9AA88F] mb-3">
                    <TrendingUp className="w-4 h-4 text-[#C98282]" />
                    <span>Tìm kiếm phổ biến hôm nay</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 rounded-full bg-[#F5EFE7] text-xs font-medium text-[#304238] hover:bg-[#D9A6A6] hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="pt-4 border-t border-[#F5EFE7]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9AA88F] mb-3">
                    <Sparkles className="w-4 h-4 text-[#D9A6A6]" />
                    <span>Danh mục hoa nghệ thuật</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { slug: 'birthday' as ProductCategory, label: 'Hoa sinh nhật' },
                      { slug: 'love' as ProductCategory, label: 'Hoa tình yêu' },
                      { slug: 'wedding' as ProductCategory, label: 'Hoa cưới' },
                      { slug: 'grand-opening' as ProductCategory, label: 'Hoa khai trương' },
                      { slug: 'seasonal' as ProductCategory, label: 'Hoa theo mùa' },
                      { slug: 'sympathy' as ProductCategory, label: 'Hoa chia buồn' },
                    ].map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => handleCategorySelect(cat.slug)}
                        className="p-3 rounded-xl bg-white border border-[#F5EFE7] hover:border-[#D9A6A6] text-left text-xs font-semibold text-stone-700 hover:text-[#304238] transition-all shadow-xs flex items-center justify-between group"
                      >
                        <span>{cat.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#C98282] transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <p className="font-editorial text-xl font-semibold text-[#304238]">
                  Không tìm thấy mẫu hoa phù hợp với "{query}"
                </p>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Hãy thử tìm bằng từ khóa hoa hồng, mẫu đơn, hoa cưới, hoặc khám phá danh mục hoa bán chạy nhất.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-stone-500 font-medium">
                  <span>Tìm thấy <strong>{filteredProducts.length}</strong> mẫu hoa phù hợp:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleProductSelect(p)}
                      className="flex gap-4 p-3 rounded-2xl bg-white border border-[#F5EFE7] hover:border-[#D9A6A6] hover:shadow-md cursor-pointer transition-all items-center group"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-20 object-cover rounded-xl bg-stone-100 shrink-0"
                      />
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#9AA88F]">
                          {p.categoryName}
                        </span>
                        <h4 className="font-editorial text-base font-semibold text-[#304238] group-hover:text-[#C98282] transition-colors line-clamp-1">
                          {p.name}
                        </h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-[#304238]">{formatPrice(p.price)}</span>
                          {p.oldPrice && (
                            <span className="text-[10px] text-stone-400 line-through">{formatPrice(p.oldPrice)}</span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#304238] transition-colors mr-2 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
