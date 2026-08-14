import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewFullCart = () => {
    setIsCartDrawerOpen(false);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const freeShippingThreshold = 1000000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-[#FFFDF8] shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#F5EFE7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#304238]" />
                <h3 className="font-editorial text-2xl font-semibold text-[#304238]">
                  Giỏ hoa của bạn
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F5EFE7] text-[#304238]">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-[#F5EFE7] text-stone-600 transition-colors"
                aria-label="Đóng giỏ hàng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#F5EFE7]/60 px-6 py-3 border-b border-[#F5EFE7] text-xs">
              {cartSubtotal >= freeShippingThreshold ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đơn hàng của bạn đã đạt điều kiện <strong>Miễn phí giao hàng</strong>!</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="text-stone-700">
                    Mua thêm <strong>{formatPrice(freeShippingThreshold - cartSubtotal)}</strong> để được <span className="text-[#C98282] font-bold">Freeship</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#D9A6A6] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F5EFE7] flex items-center justify-center text-stone-400 mx-auto">
                    <ShoppingBag className="w-8 h-8 text-[#D9A6A6]" />
                  </div>
                  <h4 className="font-editorial text-xl font-semibold text-[#304238]">
                    Giỏ hàng đang trống
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Hãy lựa chọn những bó hoa tươi nghệ thuật để trao gửi yêu thương ngay hôm nay.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setActivePage('shop');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#304238] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#252525] transition-colors"
                  >
                    <span>Khám phá các mẫu hoa</span>
                    <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 p-3 rounded-xl bg-white border border-[#F5EFE7] shadow-xs relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-editorial text-base font-semibold text-[#304238] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Kích thước: <span className="font-semibold text-stone-800">{item.selectedSize}</span> | Màu: {item.selectedColor}
                        </div>

                        {item.deliveryInfo?.recipientName && (
                          <div className="text-[10px] text-[#C98282] mt-0.5 line-clamp-1">
                            Giao cho: {item.deliveryInfo.recipientName} ({item.deliveryInfo.deliveryDate})
                          </div>
                        )}
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                        <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-stone-50">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#304238]">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Xóa khỏi giỏ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          toggleWishlist(item.product.id);
                          removeFromCart(item.cartItemId);
                        }}
                        className="text-stone-400 hover:text-[#D9A6A6] p-1 transition-colors"
                        title="Chuyển sang yêu thích"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer / Financials & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#F5EFE7] bg-white space-y-4">
                
                {/* Coupon input form */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mã <strong>{appliedCoupon.code}</strong>: -{formatPrice(discountAmount)}</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-700 hover:text-emerald-900 font-bold underline text-[11px]"
                      >
                        Gỡ bỏ
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Mã giảm giá (VD: FLOWER10)"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value);
                            setCouponError('');
                          }}
                          className="w-full pl-8 pr-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-[#D9A6A6] uppercase"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#F5EFE7] hover:bg-[#D9A6A6] text-[#304238] rounded-lg text-xs font-bold transition-colors"
                      >
                        Áp dụng
                      </button>
                    </form>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                  )}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-semibold text-stone-800">{formatPrice(cartSubtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-600 font-semibold">Miễn phí</strong> : formatPrice(shippingFee)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Giảm giá khuyến mãi:</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-bold text-[#304238] pt-2 border-t border-[#F5EFE7]">
                    <span>Tổng cộng:</span>
                    <span className="text-base text-[#C98282]">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                {/* Checkout & View Cart actions */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 px-4 bg-[#304238] hover:bg-[#252525] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Tiến hành Thanh toán</span>
                    <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
                  </button>

                  <button
                    onClick={handleViewFullCart}
                    className="w-full py-2.5 px-4 bg-[#F5EFE7] hover:bg-[#D9A6A6]/30 text-[#304238] rounded-xl text-xs font-bold tracking-wider transition-colors"
                  >
                    Xem toàn bộ giỏ hàng & Ghi chú giao
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9AA88F]" />
                  <span>Bảo mật thanh toán 100% qua SSL</span>
                </div>

              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
