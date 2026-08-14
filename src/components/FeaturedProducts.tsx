import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';

export const FeaturedProducts: React.FC = () => {
  const { products, setActivePage, setActiveCategory } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<ProductCategory>('all');

  const filterTabs: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'Tất cả mẫu hoa' },
    { id: 'love', label: 'Hoa tình yêu' },
    { id: 'birthday', label: 'Hoa sinh nhật' },
    { id: 'wedding', label: 'Hoa cưới' },
    { id: 'grand-opening', label: 'Hoa khai trương' },
    { id: 'seasonal', label: 'Hoa theo mùa' },
  ];

  const filteredProducts = selectedFilter === 'all'
    ? products
    : products.filter(p => p.category === selectedFilter);

  const handleViewAll = () => {
    setActiveCategory(selectedFilter);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="signature-products-section" className="py-16 md:py-24 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.25em] text-[#9AA88F]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A6A6]" />
            <span>Masterpiece Collection</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#252525]">
            Our Signature Flowers
          </h2>
          <div className="w-16 h-0.5 bg-[#D9A6A6] mx-auto mt-3" />
          <p className="text-sm sm:text-base text-[#252525]/70 pt-1">
            Tuyển chọn những thiết kế hoa hoa lệ, được yêu thích nhất từ bàn tay tài hoa của nghệ nhân Lumière.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                selectedFilter === tab.id
                  ? 'bg-[#304238] text-[#FFFDF8] shadow-md scale-105'
                  : 'bg-[#F5EFE7] text-[#252525]/80 hover:bg-[#D9A6A6]/30 hover:text-[#304238]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid (4 col desktop, 2 col tablet, 1-2 col mobile) */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.slice(0, 8).map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F5EFE7] text-[#304238] hover:bg-[#304238] hover:text-[#FFFDF8] text-sm font-semibold tracking-wider transition-all duration-300 shadow-xs hover:shadow-md group"
          >
            <span>Khám phá toàn bộ {products.length} mẫu hoa</span>
            <ArrowRight className="w-4 h-4 text-[#D9A6A6] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
