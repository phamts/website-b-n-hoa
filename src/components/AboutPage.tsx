import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.3em] text-[#9AA88F]">
            The Lumière Heritage
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-semibold text-[#252525] leading-tight">
            Nghệ thuật trao gửi cảm xúc qua từng cánh hoa tươi
          </h1>
          <p className="text-stone-700 text-base sm:text-lg leading-relaxed pt-2">
            Được thành lập với tôn chỉ tôn vinh vẻ đẹp tự nhiên và cảm xúc chân thành nhất của con người, Lumière Flowers mang đến những thiết kế hoa tươi mang tính thẩm mỹ cao, kết hợp giữa kỹ nghệ cắm hoa châu Âu và phong vị thanh lịch đương đại.
          </p>
        </div>

        {/* Feature Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#F5EFE7]">
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80"
              alt="Florist arranging flowers"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-white/40 shadow-lg text-[#304238]">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9AA88F] block">Triết lý sáng tạo</span>
              <p className="font-editorial text-xl italic mt-1 font-medium">
                "Mỗi đóa hoa nở là một bức thư không lời của đất trời, và chúng tôi là người chắp bút cho những tình cảm đẹp đẽ nhất."
              </p>
            </div>
          </div>

          <div className="space-y-8 text-stone-700">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm uppercase font-bold tracking-widest text-[#C98282]">01. Nguồn hoa tuyển chọn</span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#304238]">
                100% Hoa tươi nhập khẩu & Canh tác hữu cơ
              </h3>
              <p className="text-base leading-relaxed">
                Chúng tôi trực tiếp tuyển chọn những giống hoa đặc biệt nhất từ các trang trại danh tiếng tại Hà Lan, Ecuador, Nhật Bản và các đồn điền hoa cao cấp tại Đà Lạt. Mỗi cành hoa đều đạt chuẩn kích thước cánh, độ bung nở hoàn hảo và độ tươi tối thiểu 5-7 ngày.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs sm:text-sm uppercase font-bold tracking-widest text-[#9AA88F]">02. Đội ngũ nghệ nhân Florist</span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#304238]">
                Tay nghề thủ công & Thẩm mỹ đương đại
              </h3>
              <p className="text-base leading-relaxed">
                Mỗi tác phẩm tại Lumière đều được thiết kế độc bản bởi các Master Florist được đào tạo bài bản theo trường phái Floral Art Pháp và Anh Quốc, chăm chút từng nếp giấy lụa, ruy băng nhung và thông điệp viết tay.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-[#304238] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#252525] transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Xem bộ sưu tập của chúng tôi</span>
                <ArrowRight className="w-4 h-4 text-[#D9A6A6]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
