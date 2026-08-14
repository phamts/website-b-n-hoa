import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Star, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check, 
  Droplets,
  Sun,
  Wind
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductSizeOption, DeliveryRecipientInfo } from '../types';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setActivePage,
    setIsCartDrawerOpen
  } = useStore();

  const product = selectedProduct || products[0];

  // Gallery state
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  // Customization state
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Delivery options state
  const [showDeliveryForm, setShowDeliveryForm] = useState(true);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Hồ Chí Minh');
  const [deliveryDistrict, setDeliveryDistrict] = useState('Quận 1');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('14:00 - 16:00');
  const [cardMessage, setCardMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  // Price calculations
  const sizeOption: ProductSizeOption = product.sizes.find(s => s.name === selectedSize) || product.sizes[0];
  const unitPrice = product.price + (sizeOption ? sizeOption.priceModifier : 0);
  const totalPrice = unitPrice * quantity;

  // Zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const presetMessages = [
    'Chúc mừng sinh nhật người thương! Chúc bạn luôn rực rỡ và hạnh phúc.',
    'Cảm ơn em vì đã luôn ở bên anh trong suốt hành trình tuyệt vời này. Yêu em!',
    'Kính chúc quý công ty khai trương hồng phát, vạn sự hanh thông!',
    'Gửi tặng người phụ nữ tuyệt vời nhất của lòng anh.'
  ];

  const getRecipientData = (): DeliveryRecipientInfo | undefined => {
    if (!recipientName && !cardMessage) return undefined;
    return {
      recipientName: recipientName || 'Người nhận',
      recipientPhone: recipientPhone || '0908 000 000',
      address: deliveryAddress || 'Giao theo địa chỉ đơn hàng',
      city: deliveryCity,
      district: deliveryDistrict,
      deliveryDate,
      deliveryTimeSlot,
      cardMessage,
      isAnonymous
    };
  };

  const handleAddToCart = () => {
    const deliveryInfo = getRecipientData();
    addToCart(product, selectedSize, selectedColor, quantity, deliveryInfo);
    setIsCartDrawerOpen(true);
  };

  const handleBuyNow = () => {
    const deliveryInfo = getRecipientData();
    addToCart(product, selectedSize, selectedColor, quantity, deliveryInfo);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back Button */}
        <div className="flex items-center gap-2 mb-8 text-xs font-medium text-stone-500">
          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-1 text-[#304238] hover:text-[#C98282] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại Cửa hàng</span>
          </button>
          <span>/</span>
          <span className="text-[#9AA88F] uppercase font-bold">{product.categoryName}</span>
          <span>/</span>
          <span className="text-stone-800 font-semibold truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Image with Zoom */}
            <div 
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-[#F5EFE7] shadow-sm cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Zoom Overlay */}
              {isZoomed && (
                <div
                  className="absolute inset-0 pointer-events-none hidden md:block bg-no-repeat transition-opacity duration-200"
                  style={{
                    backgroundImage: `url(${product.images[activeImage] || product.images[0]})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '220%',
                  }}
                />
              )}

              {/* Badges */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#304238] text-[#FFFDF8] shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === idx
                        ? 'border-[#D9A6A6] scale-105 shadow-md'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Flower Care Guide */}
            <div className="mt-8 bg-[#F5EFE7]/50 rounded-2xl p-6 border border-[#F5EFE7] space-y-4">
              <h4 className="font-editorial text-xl font-semibold text-[#304238] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C98282]" />
                <span>Bí quyết giữ hoa tươi lâu từ Florist</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-700">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70">
                  <Droplets className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#304238] font-bold">Cấp nước mỗi ngày</strong>
                    <span>Cắt vát gốc 45 độ và thay nước sạch 1 lần/ngày.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70">
                  <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#304238] font-bold">Tránh nắng gắt</strong>
                    <span>Đặt hoa ở nơi râm mát, tránh ánh nắng trực tiếp.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70">
                  <Wind className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#304238] font-bold">Tránh gió điều hòa</strong>
                    <span>Không đặt thẳng luồng gió phả trực diện của máy lạnh.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Information & Delivery Customizer */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#9AA88F]">
                {product.categoryName}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#252525] mt-1">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#304238]">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-stone-500">
                  ({product.reviewsCount} khách hàng hài lòng)
                </span>
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-4 mt-4 pb-4 border-b border-[#F5EFE7]">
                <span className="text-3xl font-bold text-[#304238]">
                  {formatPrice(unitPrice)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-stone-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Còn {product.stock} bó hoa tươi hôm nay
                </span>
              </div>
            </div>

            {/* Description & Flower Specs */}
            <div className="space-y-3 text-sm text-stone-700">
              <p className="leading-relaxed">{product.description}</p>
              
              <div className="bg-[#FFFDF8] border border-[#F5EFE7] rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F5EFE7]">
                  <span className="text-stone-500">Thành phần hoa chính:</span>
                  <span className="font-semibold text-[#304238] text-right">{product.flowerTypes.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5EFE7]">
                  <span className="text-stone-500">Số lượng cành hoa:</span>
                  <span className="font-semibold text-[#304238]">{product.stemCount} cành tiêu chuẩn</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Kích thước ({selectedSize}):</span>
                  <span className="font-semibold text-[#304238]">
                    {selectedSize === 'Small' && product.dimensions.small}
                    {selectedSize === 'Medium' && product.dimensions.medium}
                    {selectedSize === 'Large' && product.dimensions.large}
                  </span>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#304238] uppercase tracking-wider">
                  Chọn kích thước:
                </label>
                <span className="text-xs text-stone-500">{sizeOption.description}</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      selectedSize === s.name
                        ? 'border-[#304238] bg-[#304238] text-white shadow-md'
                        : 'border-[#F5EFE7] bg-white hover:bg-[#F5EFE7] text-stone-800'
                    }`}
                  >
                    <div className="text-sm">{s.name}</div>
                    <div className="text-[11px] font-normal opacity-90 mt-0.5">
                      {s.priceModifier === 0 ? 'Giá gốc' : `+${formatPrice(s.priceModifier)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Selector */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#304238] uppercase tracking-wider block">
                  Tông màu chủ đạo: <span className="font-normal text-stone-600 ml-1">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-9 px-3.5 rounded-full border-2 text-xs font-medium flex items-center gap-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-[#304238] bg-[#304238] text-white shadow-xs'
                          : 'border-[#F5EFE7] bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Customizer Box */}
            <div className="border border-[#D9A6A6]/40 rounded-2xl bg-[#F5EFE7]/30 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#304238]">
                  <Truck className="w-4 h-4 text-[#C98282]" />
                  <span>Dịch vụ giao hoa tận nơi & Thiệp viết tay</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {unitPrice >= 1000000 ? 'Freeship' : 'Phí ship 40k'}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Tên người nhận hoa:
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Nguyễn Ngọc Lan"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#F5EFE7] rounded-lg focus:outline-none focus:border-[#D9A6A6]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Số điện thoại người nhận:
                    </label>
                    <input
                      type="tel"
                      placeholder="VD: 0912 345 678"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#F5EFE7] rounded-lg focus:outline-none focus:border-[#D9A6A6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#9AA88F]" />
                      <span>Ngày giao hoa:</span>
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#F5EFE7] rounded-lg focus:outline-none focus:border-[#D9A6A6]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C98282]" />
                      <span>Khung giờ giao:</span>
                    </label>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#F5EFE7] rounded-lg focus:outline-none focus:border-[#D9A6A6]"
                    >
                      <option value="08:00 - 10:00">08:00 - 10:00 (Sáng sớm)</option>
                      <option value="10:00 - 12:00">10:00 - 12:00 (Trưa)</option>
                      <option value="14:00 - 16:00">14:00 - 16:00 (Chiều)</option>
                      <option value="18:00 - 20:00">18:00 - 20:00 (Tối hẹn hò)</option>
                      <option value="Hỏa tốc 2H">Hỏa tốc trong 2H (+50k)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#D9A6A6]" />
                    <span>Lời nhắn đính kèm thiệp (Miễn phí):</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Nhập nội dung bạn muốn nghệ nhân viết tay gửi gắm lên thiệp..."
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#F5EFE7] rounded-lg focus:outline-none focus:border-[#D9A6A6]"
                  />

                  {/* Preset quick message chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {presetMessages.map((msg, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCardMessage(msg)}
                        className="text-[10px] bg-white border border-stone-200 hover:border-[#D9A6A6] px-2 py-1 rounded text-stone-600 hover:text-[#304238] transition-colors"
                      >
                        + {msg.substring(0, 24)}...
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="anonymous-sender"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-[#304238] focus:ring-[#D9A6A6]"
                  />
                  <label htmlFor="anonymous-sender" className="text-xs text-stone-700 cursor-pointer">
                    Giữ bí mật danh tính người gửi (Giao hoa bất ngờ)
                  </label>
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart / Buy Now Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#F5EFE7] bg-white rounded-xl overflow-hidden p-1 shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-[#F5EFE7] rounded-lg font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#304238]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-[#F5EFE7] rounded-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#304238] text-[#FFFDF8] hover:bg-[#252525] rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D9A6A6]" />
                  <span>Thêm vào giỏ ({formatPrice(totalPrice)})</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'border-[#F5EFE7] bg-white text-stone-600 hover:text-rose-600'
                  }`}
                  title="Lưu yêu thích"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-[#D9A6A6] text-[#304238] hover:bg-[#C98282] hover:text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Mua ngay — Chuyển đến Thanh toán</span>
              </button>
            </div>

            {/* Guarantee badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F5EFE7] text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9AA88F]" />
                <span>Cam kết hoa tươi trên 3 ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C98282]" />
                <span>Chụp ảnh thành phẩm trước khi giao</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        <div className="mt-24 pt-12 border-t border-[#F5EFE7]">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9AA88F]">
              You May Also Adore
            </span>
            <h3 className="font-editorial text-3xl font-semibold text-[#252525]">
              Những mẫu hoa cùng phong cách
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
