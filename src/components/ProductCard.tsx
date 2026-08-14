import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct, 
    setQuickViewProduct,
    setActivePage 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'Medium', product.colors[0]?.name || 'Standard', 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Badge styling
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'BEST SELLER':
        return 'bg-[#304238] text-[#FFFDF8] border-transparent';
      case 'NEW':
        return 'bg-[#9AA88F] text-white border-transparent';
      case 'SALE':
        return 'bg-[#C98282] text-white border-transparent';
      case 'EXCLUSIVE':
        return 'bg-[#D9A6A6] text-[#304238] font-bold border-transparent';
      default:
        return '';
    }
  };

  return (
    <div 
      className="group relative flex flex-col h-full bg-[#FFFDF8] rounded-xl overflow-hidden border border-[#F5EFE7] hover:border-[#D9A6A6]/60 transition-all duration-500 hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Container with Second Image Hover Switch */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image for Hover Flip */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xs ${getBadgeStyle(product.badge)}`}>
              {product.badge}
            </span>
          )}
          {product.isFlashSale && product.flashSaleDiscount && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C98282] text-white shadow-xs">
              -{product.flashSaleDiscount}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
            isWishlisted
              ? 'bg-[#C98282] text-white shadow-md'
              : 'bg-white/85 text-[#252525] hover:bg-white hover:text-[#C98282] shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
          title={isWishlisted ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </motion.div>
        </button>

        {/* Hover Quick Action Buttons Bar */}
        <div className={`absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-300 z-10 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}>
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-[#304238] rounded-lg text-xs font-semibold tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-colors"
            title="Xem nhanh"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem nhanh</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#304238] hover:bg-[#252525] text-white rounded-lg text-xs font-semibold tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-colors"
            title="Thêm vào giỏ"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D9A6A6]" />
            <span>Thêm giỏ</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
        <div>
          <span className="text-[11px] font-medium tracking-wider uppercase text-[#9AA88F] block">
            {product.categoryName}
          </span>
          <h3 className="font-editorial text-lg font-semibold text-[#252525] group-hover:text-[#304238] transition-colors line-clamp-1 mt-0.5">
            {product.name}
          </h3>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 text-xs text-amber-500">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          <span className="text-stone-500 text-[11px] font-medium ml-1">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline justify-between pt-1 border-t border-[#F5EFE7]">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#304238]">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#9AA88F] font-medium hidden sm:inline">
            Hoa tươi 100%
          </span>
        </div>
      </div>
    </div>
  );
};
