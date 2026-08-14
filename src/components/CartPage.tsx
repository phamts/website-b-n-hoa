import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  ChevronLeft, 
  ShieldCheck, 
  Heart,
  Truck,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setActivePage,
    toggleWishlist
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const result = applyCoupon(couponCode);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  const freeShippingThreshold = 1000000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFFDF8] min-h-[70vh] py-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4 space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#F5EFE7] flex items-center justify-center mx-auto text-[#D9A6A6]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-editorial text-3xl font-semibold text-[#304238]">
            Giỏ hoa của bạn đang trống
          </h2>
          <p className="text-sm text-stone-600">
            Chưa có bó hoa nào được chọn. Hãy khám phá các bộ sưu tập hoa tươi nghệ thuật của Lumière để chọn món quà hoàn hảo nhất.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#304238] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#252525] transition-all shadow-md mt-4"
          >
            <span>Khám phá Cửa hàng</span>
            <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#F5EFE7]">
          <div>
            <button
              onClick={() => setActivePage('shop')}
              className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-[#C98282] transition-colors mb-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Tiếp tục mua hoa</span>
            </button>
            <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#252525]">
              Giỏ hàng của bạn
            </h1>
          </div>
          <span className="text-sm text-stone-500 font-medium hidden sm:inline">
            ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
          </span>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="mt-6 bg-[#F5EFE7] rounded-xl p-4 border border-[#F5EFE7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-800">
            <Truck className="w-4 h-4 text-[#304238] shrink-0" />
            {cartSubtotal >= freeShippingThreshold ? (
              <span>Tuyệt vời! Đơn hàng của bạn đủ điều kiện <strong className="text-emerald-700 font-semibold">Miễn phí giao hàng</strong> tiêu chuẩn.</span>
            ) : (
              <span>Mua thêm <strong>{formatPrice(freeShippingThreshold - cartSubtotal)}</strong> để nhận ưu đãi <strong>Freeship</strong>.</span>
            )}
          </div>
          <div className="w-full sm:w-48 bg-stone-300 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#D9A6A6] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          
          {/* Left Column: Cart Items Table/List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="hidden sm:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-stone-400 pb-3 border-b border-[#F5EFE7]">
              <span className="col-span-6">Sản phẩm hoa</span>
              <span className="col-span-2 text-center">Đơn giá</span>
              <span className="col-span-2 text-center">Số lượng</span>
              <span className="col-span-2 text-right">Tổng tiền</span>
            </div>

            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#F5EFE7] shadow-xs flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 transition-all"
              >
                {/* Flower Info */}
                <div className="sm:col-span-6 flex items-center gap-4 w-full">
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-[#F5EFE7]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9AA88F]">
                      {item.product.categoryName}
                    </span>
                    <h3 className="font-editorial text-lg font-semibold text-[#304238]">
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-stone-500">
                      Kích thước: <strong>{item.selectedSize}</strong> | Tông màu: <strong>{item.selectedColor}</strong>
                    </div>
                    {item.deliveryInfo?.recipientName && (
                      <div className="text-[11px] text-[#C98282] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Người nhận: {item.deliveryInfo.recipientName} ({item.deliveryInfo.deliveryDate})</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Unit Price */}
                <div className="sm:col-span-2 text-center w-full sm:w-auto flex justify-between sm:block">
                  <span className="sm:hidden text-xs text-stone-500">Đơn giá:</span>
                  <span className="text-xs font-semibold text-stone-800">{formatPrice(item.unitPrice)}</span>
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2 flex justify-center w-full sm:w-auto">
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-stone-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal & Delete */}
                <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                  <div className="text-right">
                    <span className="sm:hidden text-xs text-stone-500 mr-2">Thành tiền:</span>
                    <span className="text-sm font-bold text-[#304238]">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        toggleWishlist(item.product.id);
                        removeFromCart(item.cartItemId);
                      }}
                      className="p-1.5 text-stone-400 hover:text-[#D9A6A6] transition-colors"
                      title="Lưu yêu thích"
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#F5EFE7] shadow-sm space-y-5 sticky top-24">
              <h3 className="font-editorial text-2xl font-semibold text-[#304238]">
                Tóm tắt đơn hàng
              </h3>

              {/* Coupon Form */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Mã khuyến mãi / Coupon
                </label>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <strong>{appliedCoupon.code}</strong>
                        <div className="text-[11px] text-emerald-700">{appliedCoupon.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 font-bold underline text-xs"
                    >
                      Gỡ bỏ
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã (FLOWER10, LUMIERE20)"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError('');
                      }}
                      className="flex-1 px-3 py-2 text-xs border border-stone-200 rounded-xl uppercase focus:outline-none focus:border-[#D9A6A6]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#304238] text-white rounded-xl text-xs font-bold hover:bg-[#252525] transition-colors"
                    >
                      Áp dụng
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-xs text-rose-600">{couponError}</p>
                )}
              </div>

              {/* Price Details */}
              <div className="space-y-2.5 text-xs text-stone-600 pt-2 border-t border-[#F5EFE7]">
                <div className="flex justify-between">
                  <span>Tạm tính ({cart.length} bó hoa):</span>
                  <span className="font-semibold text-stone-800">{formatPrice(cartSubtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600 font-semibold">Miễn phí</strong> : formatPrice(shippingFee)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Khuyến mãi:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-[#304238] pt-3 border-t border-[#F5EFE7]">
                  <span>Tổng thanh toán:</span>
                  <span className="text-xl text-[#C98282]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => {
                  setActivePage('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 px-6 bg-[#304238] hover:bg-[#252525] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Tiến hành Đặt hàng</span>
                <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#9AA88F]" />
                <span>Giao đúng giờ hẹn & Chụp ảnh xác nhận</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
