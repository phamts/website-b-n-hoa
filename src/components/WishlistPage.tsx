import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, moveToCartFromWishlist, toggleWishlist, setActivePage } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="bg-[#FFFDF8] min-h-[70vh] py-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4 space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#F5EFE7] flex items-center justify-center mx-auto text-[#C98282]">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="font-editorial text-3xl font-semibold text-[#304238]">
            Danh sách yêu thích trống
          </h2>
          <p className="text-sm text-stone-600">
            Bạn chưa lưu mẫu hoa nào. Hãy nhấn vào biểu tượng trái tim ở bất kỳ tác phẩm nào để lưu lại những đóa hoa bạn yêu thích nhé.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#304238] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#252525] transition-all shadow-md mt-4"
          >
            <span>Khám phá các mẫu hoa</span>
            <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
          </button>
        </div>
      </div>
    );
  }

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach(p => moveToCartFromWishlist(p));
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#F5EFE7]">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9AA88F] block">
              Saved Masterpieces
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#252525] mt-1">
              Danh sách hoa yêu thích ({wishlistedProducts.length})
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="px-6 py-2.5 bg-[#304238] text-white hover:bg-[#252525] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D9A6A6]" />
              <span>Chuyển tất cả vào giỏ</span>
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
          {wishlistedProducts.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
