import React, { useState } from 'react';
import { Sparkles, Send, Phone, Mail, MapPin, Heart, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { setActivePage, setActiveCategory, addToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast('Cảm ơn bạn! Mã giảm giá 10% (LUMIERE10) đã được gửi đến email.', 'success');
    setEmail('');
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    setActiveCategory(cat);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#252525] text-[#FFFDF8] pt-16 pb-12 border-t border-[#304238]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Bar */}
        <div className="bg-[#304238] rounded-3xl p-8 sm:p-12 mb-16 border border-[#304238]/60 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.25em] text-[#D9A6A6] block">
              Join The Lumière Club
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
              Nhận voucher 100.000₫ & Bản tin hoa theo mùa
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Đăng ký để nhận những câu chuyện hoa tươi, bí quyết giữ hoa nghệ thuật và ưu đãi độc quyền hàng tháng.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex gap-2">
            <input
              type="email"
              required
              placeholder="Nhập email của bạn..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-[#D9A6A6]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#D9A6A6] hover:bg-[#C98282] text-[#304238] hover:text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Đăng ký</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800 text-sm">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-3xl sm:text-4xl font-semibold tracking-wider text-white">
                LUMIÈRE
              </span>
              <span className="text-xs tracking-[0.3em] uppercase text-[#D9A6A6] font-sans font-bold">
                FLOWERS
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              Thương hiệu hoa tươi nghệ thuật cao cấp, mang vẻ đẹp tinh tế của phong cách cắm hoa đương đại đến từng không gian sống và khoảnh khắc đáng nhớ nhất của bạn.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#D9A6A6] hover:text-[#304238] flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#D9A6A6] hover:text-[#304238] flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-4">
            <h4 className="font-editorial text-lg font-semibold text-white tracking-wider">
              Danh mục hoa
            </h4>
            <ul className="space-y-2.5 text-stone-300 text-sm">
              <li>
                <button onClick={() => handleCategoryClick('birthday')} className="hover:text-[#D9A6A6] transition-colors">
                  Hoa chúc mừng sinh nhật
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('love')} className="hover:text-[#D9A6A6] transition-colors">
                  Hoa tình yêu lãng mạn
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('wedding')} className="hover:text-[#D9A6A6] transition-colors">
                  Hoa cưới & Hoa cô dâu
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('grand-opening')} className="hover:text-[#D9A6A6] transition-colors">
                  Kệ hoa chúc mừng khai trương
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('seasonal')} className="hover:text-[#D9A6A6] transition-colors">
                  Bộ sưu tập hoa theo mùa
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand & Story */}
          <div className="space-y-4">
            <h4 className="font-editorial text-lg font-semibold text-white tracking-wider">
              Về Lumière
            </h4>
            <ul className="space-y-2.5 text-stone-300 text-sm">
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D9A6A6] transition-colors">
                  Câu chuyện thương hiệu
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D9A6A6] transition-colors">
                  Hệ thống Boutique & Workshop
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D9A6A6] transition-colors">
                  Tư vấn hoa sự kiện / Doanh nghiệp
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D9A6A6] transition-colors">
                  Trang quản trị (Admin Console)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care */}
          <div className="space-y-4">
            <h4 className="font-editorial text-lg font-semibold text-white tracking-wider">
              Dịch vụ khách hàng
            </h4>
            <ul className="space-y-3 text-stone-300 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9A6A6] shrink-0" />
                <a href="tel:0913337280" className="text-white hover:text-[#D9A6A6] font-bold transition-colors">
                  0913 337 280 <span className="font-normal text-xs text-stone-400 block">(24/7 CSKH & Giao hoa)</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D9A6A6] shrink-0" />
                <a href="mailto:care@lumiereflowers.vn" className="hover:text-[#D9A6A6] transition-colors">
                  care@lumiereflowers.vn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9AA88F] shrink-0" />
                <span>Cam kết đổi hoa tươi 100%</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & payment methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-400">
          <p>© {new Date().getFullYear()} Lumière Flowers Boutique. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-3 text-stone-300 font-medium">
            <span>VietQR</span>
            <span>•</span>
            <span>MoMo</span>
            <span>•</span>
            <span>VNPay</span>
            <span>•</span>
            <span>Visa / Master</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
