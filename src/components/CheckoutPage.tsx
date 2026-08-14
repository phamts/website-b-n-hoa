import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  User, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  QrCode,
  Printer,
  Home
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DeliveryRecipientInfo, PaymentMethod, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    shippingFee, 
    discountAmount, 
    cartTotal, 
    appliedCoupon, 
    formatPrice, 
    placeOrder, 
    currentOrder, 
    user, 
    setActivePage 
  } = useStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Customer Information
  const [customerName, setCustomerName] = useState(user.name || '');
  const [customerEmail, setCustomerEmail] = useState(user.email || '');
  const [customerPhone, setCustomerPhone] = useState(user.phone || '');
  const [customerAddress, setCustomerAddress] = useState(user.addresses[0]?.address || '');
  const [customerCity, setCustomerCity] = useState(user.addresses[0]?.city || 'Hồ Chí Minh');
  const [customerDistrict, setCustomerDistrict] = useState(user.addresses[0]?.district || 'Quận 1');
  const [orderNotes, setOrderNotes] = useState('');

  // Step 2: Delivery & Recipient Information
  const [isSameAsCustomer, setIsSameAsCustomer] = useState(false);
  const [recipientName, setRecipientName] = useState(cart[0]?.deliveryInfo?.recipientName || '');
  const [recipientPhone, setRecipientPhone] = useState(cart[0]?.deliveryInfo?.recipientPhone || '');
  const [recipientAddress, setRecipientAddress] = useState(cart[0]?.deliveryInfo?.address || '');
  const [recipientCity, setRecipientCity] = useState(cart[0]?.deliveryInfo?.city || 'Hồ Chí Minh');
  const [recipientDistrict, setRecipientDistrict] = useState(cart[0]?.deliveryInfo?.district || 'Quận 1');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    if (cart[0]?.deliveryInfo?.deliveryDate) return cart[0].deliveryInfo.deliveryDate;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(cart[0]?.deliveryInfo?.deliveryTimeSlot || '14:00 - 16:00');
  const [cardMessage, setCardMessage] = useState(cart[0]?.deliveryInfo?.cardMessage || '');
  const [isAnonymous, setIsAnonymous] = useState(cart[0]?.deliveryInfo?.isAnonymous || false);

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Trigger celebratory confetti upon completing order
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D9A6A6', '#C98282', '#9AA88F', '#304238', '#FFFDF8']
      });
    } catch {
      // ignore
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Vui lòng nhập họ và tên của bạn.';
    if (!customerPhone.trim()) errs.customerPhone = 'Vui lòng nhập số điện thoại.';
    if (!customerEmail.trim() || !customerEmail.includes('@')) errs.customerEmail = 'Vui lòng nhập email hợp lệ.';
    if (!customerAddress.trim()) errs.customerAddress = 'Vui lòng nhập địa chỉ.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!isSameAsCustomer) {
      if (!recipientName.trim()) errs.recipientName = 'Vui lòng nhập tên người nhận hoa.';
      if (!recipientPhone.trim()) errs.recipientPhone = 'Vui lòng nhập số điện thoại người nhận.';
      if (!recipientAddress.trim()) errs.recipientAddress = 'Vui lòng nhập địa chỉ giao hoa.';
    }
    if (!deliveryDate) errs.deliveryDate = 'Vui lòng chọn ngày giao hoa.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        if (isSameAsCustomer) {
          setRecipientName(customerName);
          setRecipientPhone(customerPhone);
          setRecipientAddress(customerAddress);
          setRecipientCity(customerCity);
          setRecipientDistrict(customerDistrict);
        }
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleCompleteOrder = () => {
    const recipientInfo: DeliveryRecipientInfo = {
      recipientName: isSameAsCustomer ? customerName : recipientName,
      recipientPhone: isSameAsCustomer ? customerPhone : recipientPhone,
      address: isSameAsCustomer ? customerAddress : recipientAddress,
      city: isSameAsCustomer ? customerCity : recipientCity,
      district: isSameAsCustomer ? customerDistrict : recipientDistrict,
      deliveryDate,
      deliveryTimeSlot,
      cardMessage,
      senderName: isAnonymous ? undefined : customerName,
      senderPhone: isAnonymous ? undefined : customerPhone,
      isAnonymous
    };

    const customerData = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress,
      city: customerCity,
      district: customerDistrict,
      notes: orderNotes
    };

    const newOrder = placeOrder(customerData, recipientInfo, paymentMethod);
    setCreatedOrder(newOrder);
    setCurrentStep(4);
    triggerConfetti();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If cart is empty and not on step 4
  if (cart.length === 0 && currentStep !== 4) {
    return (
      <div className="bg-[#FFFDF8] min-h-[70vh] py-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4 space-y-4">
          <h2 className="font-editorial text-3xl font-semibold text-[#304238]">
            Không có sản phẩm để thanh toán
          </h2>
          <p className="text-sm text-stone-600">
            Giỏ hàng của bạn đang trống. Vui lòng chọn hoa trước khi tiến hành đặt hàng.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="px-8 py-3.5 rounded-full bg-[#304238] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#252525]"
          >
            Quay lại Cửa hàng
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Thông tin đặt', icon: User },
    { num: 2, label: 'Địa chỉ & Thiệp', icon: MapPin },
    { num: 3, label: 'Thanh toán', icon: CreditCard },
    { num: 4, label: 'Xác nhận', icon: CheckCircle2 },
  ];

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="grid grid-cols-4 relative">
            {/* Connecting Bar */}
            <div className="absolute top-5 left-12 right-12 h-0.5 bg-stone-200 -z-0" />
            <div
              className="absolute top-5 left-12 h-0.5 bg-[#304238] transition-all duration-500 -z-0"
              style={{
                width: currentStep === 1 ? '0%' : currentStep === 2 ? '33%' : currentStep === 3 ? '66%' : '100%'
              }}
            />

            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.num;
              const isCurrent = currentStep === step.num;

              return (
                <div key={step.num} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[#304238] text-white'
                        : isCurrent
                        ? 'bg-[#D9A6A6] text-[#304238] ring-4 ring-[#D9A6A6]/30 font-bold shadow-md'
                        : 'bg-white border-2 border-stone-200 text-stone-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs font-semibold mt-2 text-center ${
                      isCurrent ? 'text-[#304238] font-bold' : isCompleted ? 'text-stone-700' : 'text-stone-400'
                    }`}
                  >
                    0{step.num} {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Full Order Confirmation Screen */}
        {currentStep === 4 ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#F5EFE7] shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9AA88F] block">
                Đặt hoa thành công!
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#304238] mt-1">
                Cảm ơn bạn đã tin chọn Lumière
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Nghệ nhân đang chuẩn bị những đóa hoa tươi đẹp nhất theo yêu cầu của bạn.
              </p>
            </div>

            {/* Order Brief Box */}
            <div className="bg-[#F5EFE7]/50 rounded-2xl p-6 text-left text-xs space-y-3 border border-[#F5EFE7]">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Mã đơn hàng:</span>
                <strong className="text-[#304238] text-sm font-mono">{createdOrder?.orderNumber || currentOrder?.orderNumber}</strong>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Người nhận:</span>
                <span className="font-semibold text-stone-800">
                  {createdOrder?.recipient.recipientName} ({createdOrder?.recipient.recipientPhone})
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Địa chỉ giao:</span>
                <span className="font-semibold text-stone-800 text-right max-w-[280px]">
                  {createdOrder?.recipient.address}, {createdOrder?.recipient.district}, {createdOrder?.recipient.city}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Thời gian dự kiến:</span>
                <span className="font-semibold text-[#C98282]">
                  {createdOrder?.recipient.deliveryDate} ({createdOrder?.recipient.deliveryTimeSlot})
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Phương thức thanh toán:</span>
                <span className="font-semibold uppercase text-[#304238]">
                  {createdOrder?.paymentMethod} ({createdOrder?.paymentStatus === 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'})
                </span>
              </div>

              <div className="flex justify-between py-1 pt-2 text-sm font-bold text-[#304238]">
                <span>Tổng giá trị đơn hàng:</span>
                <span className="text-base text-[#C98282]">{formatPrice(createdOrder?.total || 0)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setActivePage('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#304238] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#252525] transition-colors flex items-center justify-center gap-2"
              >
                <span>Xem đơn trong Tài khoản</span>
                <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
              </button>

              <button
                onClick={() => {
                  setActivePage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F5EFE7] text-[#304238] text-xs font-bold tracking-wider uppercase hover:bg-[#D9A6A6]/40 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Trở về Trang chủ</span>
              </button>
            </div>
          </div>
        ) : (
          /* Steps 1, 2, 3 Grid Layout (Left Forms, Right Summary) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Steps Content */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5EFE7] shadow-sm">
                
                {/* STEP 1: INFORMATION */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#304238]">
                        01. Thông tin người đặt hoa
                      </h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Chúng tôi sẽ gửi biên lai điện tử và cập nhật trạng thái giao hoa qua số điện thoại này.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">
                          Họ và tên của bạn: *
                        </label>
                        <input
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                        />
                        {errors.customerName && <p className="text-[11px] text-rose-600 mt-1">{errors.customerName}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-stone-700 block mb-1">
                            Số điện thoại: *
                          </label>
                          <input
                            type="tel"
                            placeholder="0908 123 456"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                          />
                          {errors.customerPhone && <p className="text-[11px] text-rose-600 mt-1">{errors.customerPhone}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-bold text-stone-700 block mb-1">
                            Email nhận biên lai: *
                          </label>
                          <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                          />
                          {errors.customerEmail && <p className="text-[11px] text-rose-600 mt-1">{errors.customerEmail}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-stone-700 block mb-1">
                            Tỉnh / Thành phố:
                          </label>
                          <select
                            value={customerCity}
                            onChange={(e) => setCustomerCity(e.target.value)}
                            className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                          >
                            <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Cần Thơ">Cần Thơ</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-stone-700 block mb-1">
                            Quận / Huyện:
                          </label>
                          <input
                            type="text"
                            placeholder="Quận 1, Bình Thạnh..."
                            value={customerDistrict}
                            onChange={(e) => setCustomerDistrict(e.target.value)}
                            className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">
                          Địa chỉ của bạn: *
                        </label>
                        <input
                          type="text"
                          placeholder="Số nhà, tên đường, toà nhà..."
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                        />
                        {errors.customerAddress && <p className="text-[11px] text-rose-600 mt-1">{errors.customerAddress}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">
                          Ghi chú đặc biệt cho Florist:
                        </label>
                        <textarea
                          rows={2}
                          placeholder="VD: Gọi trước khi giao 15 phút, đóng gói chống sốc kỹ..."
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          className="w-full px-4 py-2.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handleNextStep}
                        className="px-8 py-3.5 bg-[#304238] hover:bg-[#252525] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
                      >
                        <span>Tiếp tục: Địa chỉ & Thiệp</span>
                        <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: DELIVERY & RECIPIENT */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#304238]">
                          02. Người nhận hoa & Lời chúc
                        </h2>
                        <p className="text-xs text-stone-500 mt-1">
                          Thông tin người sẽ đón nhận những đóa hoa tươi thắm.
                        </p>
                      </div>
                    </div>

                    {/* Toggle same as customer */}
                    <div className="p-3.5 rounded-xl bg-[#F5EFE7] border border-[#D9A6A6]/40 flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        id="same-customer-checkbox"
                        checked={isSameAsCustomer}
                        onChange={(e) => setIsSameAsCustomer(e.target.checked)}
                        className="rounded text-[#304238] focus:ring-[#D9A6A6]"
                      />
                      <label htmlFor="same-customer-checkbox" className="text-xs font-semibold text-[#304238] cursor-pointer">
                        Tôi tự nhận hoa tại địa chỉ của tôi
                      </label>
                    </div>

                    {!isSameAsCustomer && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">
                              Tên người nhận: *
                            </label>
                            <input
                              type="text"
                              placeholder="VD: Trần Thị Mai"
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                            />
                            {errors.recipientName && <p className="text-[11px] text-rose-600 mt-1">{errors.recipientName}</p>}
                          </div>

                          <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">
                              Số điện thoại người nhận: *
                            </label>
                            <input
                              type="tel"
                              placeholder="0912 345 678"
                              value={recipientPhone}
                              onChange={(e) => setRecipientPhone(e.target.value)}
                              className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                            />
                            {errors.recipientPhone && <p className="text-[11px] text-rose-600 mt-1">{errors.recipientPhone}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">
                              Tỉnh / Thành phố:
                            </label>
                            <select
                              value={recipientCity}
                              onChange={(e) => setRecipientCity(e.target.value)}
                              className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                            >
                              <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                              <option value="Hà Nội">Hà Nội</option>
                              <option value="Đà Nẵng">Đà Nẵng</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">
                              Quận / Huyện:
                            </label>
                            <input
                              type="text"
                              placeholder="Quận 1, Quận 3..."
                              value={recipientDistrict}
                              onChange={(e) => setRecipientDistrict(e.target.value)}
                              className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-stone-700 block mb-1">
                            Địa chỉ giao hoa chi tiết: *
                          </label>
                          <input
                            type="text"
                            placeholder="Số nhà, tên đường, tên toà nhà/văn phòng..."
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                            className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                          />
                          {errors.recipientAddress && <p className="text-[11px] text-rose-600 mt-1">{errors.recipientAddress}</p>}
                        </div>
                      </div>
                    )}

                    {/* Delivery Time & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#9AA88F]" />
                          <span>Ngày giao hoa: *</span>
                        </label>
                        <input
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                        />
                        {errors.deliveryDate && <p className="text-[11px] text-rose-600 mt-1">{errors.deliveryDate}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#C98282]" />
                          <span>Khung giờ giao hoa:</span>
                        </label>
                        <select
                          value={deliveryTimeSlot}
                          onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                          className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                        >
                          <option value="08:00 - 10:00">08:00 - 10:00 (Sáng)</option>
                          <option value="10:00 - 12:00">10:00 - 12:00 (Trưa)</option>
                          <option value="14:00 - 16:00">14:00 - 16:00 (Chiều)</option>
                          <option value="18:00 - 20:00">18:00 - 20:00 (Tối)</option>
                          <option value="Hỏa tốc 2H">Giao hỏa tốc trong 2H</option>
                        </select>
                      </div>
                    </div>

                    {/* Card Message */}
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[#D9A6A6]" />
                        <span>Nội dung thiệp chúc mừng viết tay (Miễn phí):</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Nhập thông điệp yêu thương bạn muốn gửi..."
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                        className="w-full px-4 py-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="anon-check"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-[#304238] focus:ring-[#D9A6A6]"
                      />
                      <label htmlFor="anon-check" className="text-xs text-stone-700 cursor-pointer">
                        Giao hoa ẩn danh (Không ghi tên người gửi trên nhãn đơn)
                      </label>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="px-6 py-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold"
                      >
                        Quay lại Bước 1
                      </button>

                      <button
                        onClick={handleNextStep}
                        className="px-8 py-3.5 bg-[#304238] hover:bg-[#252525] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
                      >
                        <span>Tiếp tục: Thanh toán</span>
                        <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PAYMENT */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#304238]">
                        03. Phương thức thanh toán
                      </h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Lựa chọn hình thức thanh toán thuận tiện và an toàn nhất.
                      </p>
                    </div>

                    {/* Payment Options Grid */}
                    <div className="space-y-3">
                      {/* Bank Transfer */}
                      <label
                        className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === 'bank'
                            ? 'border-[#304238] bg-[#F5EFE7]/40 shadow-xs'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'bank'}
                          onChange={() => setPaymentMethod('bank')}
                          className="mt-1 text-[#304238] focus:ring-[#D9A6A6]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#304238]">Chuyển khoản Ngân hàng (VietQR)</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D9A6A6]/30 text-[#304238]">Khuyên dùng</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Quét mã QR tự động điền số tiền và nội dung qua ứng dụng ngân hàng bất kỳ.
                          </p>

                          {paymentMethod === 'bank' && (
                            <div className="mt-3 p-3.5 bg-white rounded-xl border border-stone-200 text-xs space-y-2 text-stone-700">
                              <div className="flex items-center gap-2 font-bold text-[#304238]">
                                <QrCode className="w-4 h-4 text-[#C98282]" />
                                <span>Thông tin chuyển khoản Lumière Florist:</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div>Ngân hàng: <strong>Vietcombank (VCB)</strong></div>
                                <div>Số TK: <strong>1900 8899 999</strong></div>
                                <div>Chủ TK: <strong>LUMIERE FLOWERS BOUTIQUE</strong></div>
                                <div>Cú pháp: <strong>LUM {customerPhone.slice(-4)}</strong></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>

                      {/* COD */}
                      <label
                        className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === 'cod'
                            ? 'border-[#304238] bg-[#F5EFE7]/40 shadow-xs'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="mt-1 text-[#304238] focus:ring-[#D9A6A6]"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-[#304238]">Thanh toán tiền mặt khi nhận hoa (COD)</span>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Kiểm tra hoa tươi nguyên vẹn và thanh toán trực tiếp cho nhân viên giao hoa.
                          </p>
                        </div>
                      </label>

                      {/* MoMo */}
                      <label
                        className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === 'momo'
                            ? 'border-[#304238] bg-[#F5EFE7]/40 shadow-xs'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'momo'}
                          onChange={() => setPaymentMethod('momo')}
                          className="mt-1 text-[#304238] focus:ring-[#D9A6A6]"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-[#304238]">Ví điện tử MoMo</span>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Thanh toán an toàn, liền mạch qua ứng dụng Ví MoMo.
                          </p>
                        </div>
                      </label>

                      {/* VNPay */}
                      <label
                        className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === 'vnpay'
                            ? 'border-[#304238] bg-[#F5EFE7]/40 shadow-xs'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'vnpay'}
                          onChange={() => setPaymentMethod('vnpay')}
                          className="mt-1 text-[#304238] focus:ring-[#D9A6A6]"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-[#304238]">Cổng VNPay (Thẻ ATM nội địa / Visa / Mastercard)</span>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Hỗ trợ tất cả thẻ ngân hàng Việt Nam và thẻ quốc tế.
                          </p>
                        </div>
                      </label>

                      {/* ZaloPay */}
                      <label
                        className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === 'zalopay'
                            ? 'border-[#304238] bg-[#F5EFE7]/40 shadow-xs'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'zalopay'}
                          onChange={() => setPaymentMethod('zalopay')}
                          className="mt-1 text-[#304238] focus:ring-[#D9A6A6]"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-[#304238]">Ví ZaloPay</span>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Thanh toán nhanh trong 1 chạm qua hệ sinh thái ZaloPay.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="px-6 py-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold"
                      >
                        Quay lại Bước 2
                      </button>

                      <button
                        onClick={handleCompleteOrder}
                        className="px-8 py-3.5 bg-[#304238] hover:bg-[#252525] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
                      >
                        <span>Hoàn tất Đặt hoa ({formatPrice(cartTotal)})</span>
                        <CheckCircle2 className="w-4 h-4 text-[#D9A6A6]" />
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5EFE7] shadow-sm space-y-5 sticky top-24">
                <h3 className="font-editorial text-2xl font-semibold text-[#304238]">
                  Đơn hàng của bạn ({cart.length} bó)
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex gap-3 text-xs items-center justify-between pb-3 border-b border-[#F5EFE7]">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-14 object-cover rounded-lg bg-stone-100"
                        />
                        <div>
                          <h4 className="font-editorial font-semibold text-[#304238] text-sm line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-stone-500">
                            {item.selectedSize} x {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-800">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial breakdown */}
                <div className="space-y-2 text-xs text-stone-600 pt-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-semibold text-stone-800">{formatPrice(cartSubtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-600 font-semibold">Miễn phí</strong> : formatPrice(shippingFee)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Giảm giá ({appliedCoupon?.code}):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-bold text-[#304238] pt-3 border-t border-[#F5EFE7]">
                    <span>Tổng tiền thanh toán:</span>
                    <span className="text-xl text-[#C98282]">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-stone-500 space-y-1.5 border-t border-[#F5EFE7]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9AA88F]" />
                    <span>Cam kết hoa tươi và đúng mẫu 98%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C98282]" />
                    <span>Miễn phí thiệp thiết kế & ruy băng lụa</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
