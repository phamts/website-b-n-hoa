import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductSizeOption } from '../types';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct, 
    setActivePage 
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);

  // Size calculation
  const currentSizeOption: ProductSizeOption = product.sizes.find(s => s.name === selectedSize) || product.sizes[0];
  const unitPrice = product.price + (currentSizeOption ? currentSizeOption.priceModifier : 0);
  const totalPrice = unitPrice * quantity;

  const activeColor = selectedColor || product.colors[0]?.name || 'Standard';

  const handleClose = () => {
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    handleClose();
  };

  const handleGoToFullPage = () => {
    setSelectedProduct(product);
    setQuickViewProduct(null);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#FFFDF8] rounded-2xl shadow-2xl overflow-hidden z-10 border border-[#F5EFE7] my-8"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-[#D9A6A6] hover:text-white text-[#304238] flex items-center justify-center shadow-md transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 border border-[#F5EFE7]">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#D9A6A6] scale-105 shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#9AA88F]">
                  {product.categoryName}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#304238] mt-1">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-stone-700">
                    {product.rating} ({product.reviewsCount} đánh giá)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-3 pb-3 border-b border-[#F5EFE7]">
                  <span className="text-2xl font-bold text-[#304238]">
                    {formatPrice(unitPrice)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mt-3 line-clamp-3">
                  {product.description}
                </p>

                {/* Size Selector */}
                <div className="mt-4 space-y-1.5">
                  <label className="text-xs font-bold text-[#304238] uppercase tracking-wider block">
                    Kích thước bó hoa:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSize(s.name)}
                        className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                          selectedSize === s.name
                            ? 'border-[#304238] bg-[#304238] text-white'
                            : 'border-[#F5EFE7] bg-[#F5EFE7]/50 text-stone-700 hover:bg-[#F5EFE7]'
                        }`}
                      >
                        <div>{s.name}</div>
                        {s.priceModifier > 0 && (
                          <div className="text-[10px] opacity-80">+{formatPrice(s.priceModifier)}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <label className="text-xs font-bold text-[#304238] uppercase tracking-wider block">
                      Tông màu: <span className="font-normal text-stone-600">{activeColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            activeColor === c.name ? 'border-[#304238] scale-110 shadow-sm' : 'border-stone-200'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {activeColor === c.name && (
                            <Check className="w-3.5 h-3.5 text-stone-900 bg-white/60 rounded-full p-0.5" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Actions */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center border border-[#F5EFE7] bg-[#F5EFE7]/60 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-stone-600 hover:bg-white text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-[#304238] min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-stone-600 hover:bg-white text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 bg-[#304238] text-white hover:bg-[#252525] rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D9A6A6]" />
                    <span>Thêm vào giỏ ({formatPrice(totalPrice)})</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-300 text-rose-600'
                        : 'border-[#F5EFE7] text-stone-500 hover:text-rose-600'
                    }`}
                    title="Yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Full details link */}
              <button
                onClick={handleGoToFullPage}
                className="pt-2 text-xs text-[#C98282] hover:text-[#304238] font-bold flex items-center gap-1 group self-start"
              >
                <span>Xem chi tiết đầy đủ & Tuỳ chỉnh thiệp / Giờ giao</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
