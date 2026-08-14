import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Sự kiện & Tiệc cưới');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitted(true);
    addToast('Yêu cầu tư vấn của bạn đã được gửi thành công!', 'success');
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.25em] text-[#9AA88F]">
            Get In Touch
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#252525]">
            Liên hệ & Tư vấn Thiết kế Hoa
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Dành cho khách hàng cá nhân, tiệc cưới, sự kiện doanh nghiệp hoặc đặt hoa định kỳ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info: Boutiques */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#F5EFE7] shadow-sm space-y-6">
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#304238]">
                Hệ thống Boutique Lumière
              </h3>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="p-5 rounded-2xl bg-[#F5EFE7]/50 border border-[#F5EFE7] space-y-2">
                  <strong className="text-base font-bold text-[#304238] block">Flagship Boutique — Quận 1</strong>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C98282] shrink-0 mt-1" />
                    <span className="leading-relaxed">88 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#9AA88F] shrink-0" />
                    <span>07:30 - 21:30 (Mở cửa tất cả các ngày)</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F5EFE7]/50 border border-[#F5EFE7] space-y-2">
                  <strong className="text-base font-bold text-[#304238] block">Boutique & Workshop — Thảo Điền</strong>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C98282] shrink-0 mt-1" />
                    <span className="leading-relaxed">24 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP. HCM</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#9AA88F] shrink-0" />
                    <span>08:00 - 21:00</span>
                  </div>
                </div>
              </div>

              {/* Direct Hotlines */}
              <div className="pt-4 border-t border-[#F5EFE7] space-y-3 text-sm">
                <div className="flex items-center gap-2.5 text-stone-800">
                  <Phone className="w-5 h-5 text-[#C98282]" />
                  <span>
                    Hotline Dịch vụ Khách hàng: <a href="tel:0913337280" className="text-[#C98282] font-bold text-base hover:underline">0913 337 280 (24/7)</a>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-800">
                  <Mail className="w-5 h-5 text-[#304238]" />
                  <span>Email hợp tác doanh nghiệp: <strong className="text-[#304238]">concierge@lumiereflowers.vn</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form: Consultation */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F5EFE7] shadow-sm">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#304238]">
                    Đã nhận yêu cầu tư vấn!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Chuyên viên cắm hoa nghệ thuật của Lumière sẽ liên hệ với bạn trong vòng 30 phút qua hotline <strong>0913 337 280</strong> để lên phương án thiết kế hoa ưng ý nhất.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 rounded-full bg-[#304238] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#252525] transition-colors"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#9AA88F] block">
                      Custom Flower Arrangement
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#304238] mt-0.5">
                      Gửi yêu cầu thiết kế hoa theo ý muốn
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-800 block mb-1.5">Họ và tên của bạn: *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-stone-800 block mb-1.5">Số điện thoại liên hệ: *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0913 337 280"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-800 block mb-1.5">Email:</label>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-stone-800 block mb-1.5">Loại nhu cầu:</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6] bg-white"
                      >
                        <option value="Hoa cưới & Hoa cô dâu">Hoa cưới & Hoa cô dâu</option>
                        <option value="Sự kiện & Tiệc khai trương">Sự kiện & Tiệc khai trương</option>
                        <option value="Gói hoa định kỳ văn phòng">Gói hoa định kỳ văn phòng</option>
                        <option value="Bó hoa thiết kế riêng">Bó hoa thiết kế riêng (Custom)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-800 block mb-1.5">Ý tưởng, màu sắc hoặc ngân sách dự kiến:</label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả ý tưởng, tông màu bạn thích (Pastel, Dark Luxe, Trắng tinh khôi...) hoặc số lượng cần chuẩn bị..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#304238] hover:bg-[#252525] text-white rounded-xl font-bold uppercase tracking-wider text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-[#D9A6A6]" />
                      <span>Gửi yêu cầu nhận tư vấn miễn phí</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
