import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowRight, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const FlashSaleSection: React.FC = () => {
  const { products, setActivePage } = useStore();

  // Real-time countdown timer state (2 days, 14 hours, 36 minutes, 22 seconds initial)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter(p => p.isFlashSale || p.badge === 'SALE').slice(0, 3);

  const formatUnit = (val: number) => String(val).padStart(2, '0');

  return (
    <section className="py-16 bg-[#304238] text-[#FFFDF8] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#D9A6A6]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#9AA88F]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title and Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C98282]/20 border border-[#C98282]/40 text-[#D9A6A6] text-xs font-bold uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-[#D9A6A6]" />
              <span>Ưu đãi giới hạn trong tuần</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-white">
              A little more love, for less.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-lg">
              Tuyển chọn các tác phẩm hoa cao cấp với mức giá ưu đãi đặc quyền, số lượng giới hạn mỗi ngày.
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl backdrop-blur-md self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-[#D9A6A6] mr-2 font-medium">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Kết thúc sau:</span>
            </div>

            {/* Days */}
            <div className="text-center bg-[#252525]/80 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 min-w-[48px]">
              <span className="block font-mono text-lg sm:text-xl font-bold text-white">
                {formatUnit(timeLeft.days)}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-white/60">Ngày</span>
            </div>
            <span className="text-white/40 font-bold">:</span>

            {/* Hours */}
            <div className="text-center bg-[#252525]/80 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 min-w-[48px]">
              <span className="block font-mono text-lg sm:text-xl font-bold text-white">
                {formatUnit(timeLeft.hours)}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-white/60">Giờ</span>
            </div>
            <span className="text-white/40 font-bold">:</span>

            {/* Minutes */}
            <div className="text-center bg-[#252525]/80 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 min-w-[48px]">
              <span className="block font-mono text-lg sm:text-xl font-bold text-white">
                {formatUnit(timeLeft.minutes)}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-white/60">Phút</span>
            </div>
            <span className="text-white/40 font-bold">:</span>

            {/* Seconds */}
            <div className="text-center bg-[#C98282]/30 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#C98282]/40 min-w-[48px]">
              <span className="block font-mono text-lg sm:text-xl font-bold text-[#D9A6A6]">
                {formatUnit(timeLeft.seconds)}
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-white/70">Giây</span>
            </div>
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="bg-[#FFFDF8] rounded-2xl text-[#252525] p-3 shadow-xl">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View all sale button */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm font-semibold tracking-wider transition-colors"
          >
            <span>Xem tất cả ưu đãi hôm nay</span>
            <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
          </button>
        </div>

      </div>
    </section>
  );
};
