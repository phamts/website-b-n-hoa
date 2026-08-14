import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const CategorySection: React.FC = () => {
  const { setActivePage, setActiveCategory } = useStore();

  const handleCategorySelect = (categorySlug: string) => {
    setActiveCategory(categorySlug as ProductCategory);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="category-moments-section" className="py-16 md:py-24 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9AA88F] block">
            Occasions & Moments
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#252525]">
            Find flowers for every moment
          </h2>
          <div className="w-16 h-0.5 bg-[#D9A6A6] mx-auto mt-3" />
          <p className="text-sm sm:text-base text-[#252525]/70 pt-2 font-normal">
            Từ những lời chúc sinh nhật rạng ngời đến ngày cưới thiêng liêng, hãy để hoa thay bạn chuyển tải vẹn nguyên tâm ý.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => handleCategorySelect(category.slug)}
              className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F5EFE7]"
            >
              {/* Background Image with Zoom on Hover */}
              <div className="absolute inset-0 bg-stone-900 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-90 opacity-95"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/90 via-[#252525]/30 to-transparent transition-opacity duration-300 group-hover:from-[#252525]/95" />

              {/* Top Pill / Count */}
              <div className="absolute top-5 left-5">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-white/90 bg-white/20 backdrop-blur-md border border-white/30">
                  {category.count} Mẫu hoa
                </span>
              </div>

              {/* Bottom Information */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white transition-transform duration-300">
                <div className="flex items-end justify-between">
                  <div className="space-y-1.5 flex-1 pr-4">
                    <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-white tracking-wide transition-colors group-hover:text-[#FFFDF8]">
                      {category.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                      {category.description}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#D9A6A6] group-hover:border-[#D9A6A6] group-hover:text-[#304238] shrink-0">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
