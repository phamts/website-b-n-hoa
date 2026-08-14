import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PetalEffect } from './PetalEffect';

export const Hero: React.FC = () => {
  const { setActivePage, setActiveCategory } = useStore();

  const handleExplore = () => {
    setActiveCategory('all');
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderNow = () => {
    const productsEl = document.getElementById('signature-products-section');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActivePage('shop');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#F5EFE7]/40 to-[#FFFDF8] pt-8 pb-16 lg:py-20">
      <PetalEffect count={10} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE7] border border-[#D9A6A6]/40 text-[#304238] text-xs font-semibold uppercase tracking-[0.2em]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C98282]" />
              <span>Haute Floriculture • Sưu tập Thu - Đông 2026</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#252525] leading-[1.12] tracking-tight"
            >
              Flowers that <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#304238] underline decoration-[#D9A6A6]/60 decoration-wavy decoration-1 underline-offset-8">
                speak from the heart.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-[#252525]/80 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Những đóa hoa được chọn lựa và thiết kế bằng tất cả sự tinh tế dành cho những khoảnh khắc đáng nhớ nhất của bạn.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                id="hero-explore-btn"
                onClick={handleExplore}
                className="w-full sm:w-auto px-8 py-4 bg-[#304238] text-[#FFFDF8] hover:bg-[#252525] rounded-full text-sm font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <span>Khám phá bộ sưu tập</span>
                <ArrowRight className="w-4 h-4 text-[#D9A6A6] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-order-btn"
                onClick={handleOrderNow}
                className="w-full sm:w-auto px-8 py-4 bg-[#FFFDF8] border border-[#D9A6A6] text-[#304238] hover:bg-[#F5EFE7] rounded-full text-sm font-semibold tracking-wider transition-all duration-300"
              >
                <span>Đặt hoa ngay</span>
              </button>
            </motion.div>

            {/* Key trust markers */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-6 border-t border-[#F5EFE7] grid grid-cols-3 gap-2 sm:gap-6 text-center lg:text-left"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-[#304238]">
                  <ShieldCheck className="w-4 h-4 text-[#9AA88F]" />
                  <span>100% Hoa tươi</span>
                </div>
                <p className="text-[11px] text-[#252525]/60 hidden sm:block">Tuyển chọn hoa nhập loại 1</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-[#304238]">
                  <Clock className="w-4 h-4 text-[#C98282]" />
                  <span>Giao nhanh 2H</span>
                </div>
                <p className="text-[11px] text-[#252525]/60 hidden sm:block">Đảm bảo độ tươi nguyên bản</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-[#304238]">
                  <HeartHandshake className="w-4 h-4 text-[#D9A6A6]" />
                  <span>Thiết kế thủ công</span>
                </div>
                <p className="text-[11px] text-[#252525]/60 hidden sm:block">Nghệ nhân hoa kinh nghiệm</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background Decorative Rings */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#D9A6A6]/20 via-[#9AA88F]/20 to-transparent rounded-[2.5rem] -rotate-2 transform scale-105 pointer-events-none blur-sm" />

            {/* Main Featured Photo Container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-stone-100 aspect-[4/5] border border-white/70 group">
              <motion.img
                src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1200&auto=format&fit=crop"
                alt="Lumière Signature Luxury Bouquet"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4 }}
              />

              {/* Floating Luxury Glass Label */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl luxury-glass border border-white/80 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9AA88F] block">
                      Bộ sưu tập đặc biệt
                    </span>
                    <h3 className="font-editorial text-lg font-semibold text-[#304238]">
                      Rosé Symphony & Peonies
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 line-through block">1.680.000₫</span>
                    <span className="text-sm font-bold text-[#C98282]">1.450.000₫</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Small Floating Accent Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute -top-4 -left-4 sm:-left-6 bg-[#FFFDF8] p-3 sm:p-4 rounded-2xl shadow-xl border border-[#F5EFE7] hidden sm:flex items-center gap-3 z-30"
            >
              <div className="w-10 h-10 rounded-full bg-[#D9A6A6]/20 flex items-center justify-center text-[#C98282]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#304238]">Bó hoa của tuần</div>
                <div className="text-[11px] text-stone-500">Đã giao 120+ bó hôm nay</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
