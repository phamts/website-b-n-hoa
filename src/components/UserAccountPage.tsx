import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

export const UserAccountPage: React.FC = () => {
  const { 
    user, 
    updateUserProfile, 
    addAddress, 
    deleteAddress, 
    orders, 
    formatPrice, 
    wishlist, 
    products, 
    setActivePage 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'payments' | 'security'>('orders');

  // Edit profile local state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  // Add Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newLabel, setNewLabel] = useState('Nhà riêng');
  const [newReceiver, setNewReceiver] = useState(user.name);
  const [newPhone, setNewPhone] = useState(user.phone);
  const [newStreet, setNewStreet] = useState('');
  const [newDistrict, setNewDistrict] = useState('Quận 1');
  const [newCity, setNewCity] = useState('Hồ Chí Minh');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email, phone });
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;
    addAddress({
      label: newLabel,
      receiverName: newReceiver,
      phone: newPhone,
      address: newStreet,
      district: newDistrict,
      city: newCity,
      isDefault: user.addresses.length === 0
    });
    setNewStreet('');
    setShowAddAddress(false);
  };

  // Status visual badge
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return { label: 'Chờ xác nhận', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'Confirmed':
        return { label: 'Đã tiếp nhận', color: 'bg-sky-50 text-sky-800 border-sky-200' };
      case 'Preparing':
        return { label: 'Florist đang cắm hoa', color: 'bg-purple-50 text-purple-800 border-purple-200' };
      case 'Shipping':
        return { label: 'Đang giao hỏa tốc', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'Delivered':
        return { label: 'Giao hoa thành công', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'Cancelled':
        return { label: 'Đã hủy', color: 'bg-rose-50 text-rose-800 border-rose-200' };
    }
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Top Summary Banner */}
        <div className="bg-[#304238] rounded-3xl p-6 sm:p-8 text-[#FFFDF8] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#D9A6A6] shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-white">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D9A6A6] text-[#304238]">
                  Thành viên {user.memberTier}
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md self-start md:self-auto">
            <Sparkles className="w-6 h-6 text-[#D9A6A6]" />
            <div>
              <span className="text-[11px] text-white/70 block uppercase tracking-wider">Điểm thưởng Lumière Club</span>
              <strong className="text-xl font-bold text-white">{user.points.toLocaleString()} pts</strong>
            </div>
          </div>
        </div>

        {/* Account Grid Navigation & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-[#F5EFE7] shadow-xs space-y-1">
              {[
                { id: 'orders', label: 'Lịch sử Đơn hàng', icon: Package, count: orders.length },
                { id: 'profile', label: 'Thông tin cá nhân', icon: User },
                { id: 'addresses', label: 'Sổ địa chỉ nhận', icon: MapPin, count: user.addresses.length },
                { id: 'payments', label: 'Phương thức thanh toán', icon: CreditCard },
                { id: 'security', label: 'Bảo mật & Mật khẩu', icon: Lock },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      isActive
                        ? 'bg-[#304238] text-white shadow-xs'
                        : 'text-stone-700 hover:bg-[#F5EFE7] hover:text-[#304238]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#D9A6A6]" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count !== undefined && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#F5EFE7] text-stone-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-2 border-t border-[#F5EFE7] mt-2">
                <button
                  onClick={() => {
                    setActivePage('wishlist');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 hover:bg-rose-50 hover:text-rose-700 transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Hoa đã yêu thích</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800">
                    {wishlist.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#304238] bg-[#9AA88F]/15 hover:bg-[#9AA88F]/25 transition-all text-left mt-1"
                >
                  <ShieldCheck className="w-4 h-4 text-[#304238]" />
                  <span>Trang Quản trị Shop</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9">
            
            {/* TAB: MY ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-editorial text-2xl font-semibold text-[#304238]">
                    Lịch sử đơn hàng ({orders.length})
                  </h2>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-[#F5EFE7] space-y-3">
                    <Package className="w-12 h-12 text-stone-300 mx-auto" />
                    <p className="text-sm font-semibold text-stone-700">Bạn chưa có đơn hàng nào.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const badge = getStatusBadge(order.status);
                      return (
                        <div
                          key={order.id}
                          className="bg-white rounded-2xl p-6 border border-[#F5EFE7] shadow-xs space-y-4 transition-all hover:shadow-md"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F5EFE7] gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-bold text-[#304238]">
                                  {order.orderNumber}
                                </span>
                                <span className="text-xs text-stone-400">• {order.createdAt}</span>
                              </div>
                              <span className="text-xs text-stone-500 block mt-0.5">
                                Giao cho: <strong className="text-stone-800">{order.recipient.recipientName}</strong> ({order.recipient.recipientPhone})
                              </span>
                            </div>

                            <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>

                          {/* Items List */}
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-xs">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-14 h-16 object-cover rounded-lg bg-stone-100 shrink-0"
                                />
                                <div className="flex-1">
                                  <h4 className="font-editorial font-semibold text-stone-800 text-sm">
                                    {item.product.name}
                                  </h4>
                                  <div className="text-[11px] text-stone-500">
                                    {item.selectedSize} • {item.selectedColor} • SL: {item.quantity}
                                  </div>
                                </div>
                                <span className="font-bold text-stone-800">
                                  {formatPrice(item.unitPrice * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Recipient Message & Estimated Delivery */}
                          {order.recipient.cardMessage && (
                            <div className="p-3 bg-[#F5EFE7]/50 rounded-xl text-xs text-stone-700 italic border border-[#F5EFE7]">
                              " {order.recipient.cardMessage} "
                            </div>
                          )}

                          {/* Footer Total */}
                          <div className="pt-3 border-t border-[#F5EFE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <div className="text-stone-500">
                              Địa chỉ: {order.recipient.address}, {order.recipient.district}, {order.recipient.city}
                            </div>

                            <div className="flex items-baseline gap-2 self-end sm:self-auto">
                              <span className="text-stone-500">Tổng thanh toán:</span>
                              <span className="text-base font-bold text-[#C98282]">
                                {formatPrice(order.total)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F5EFE7] shadow-xs space-y-6">
                <h2 className="font-editorial text-2xl font-semibold text-[#304238]">
                  Thông tin tài khoản
                </h2>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Họ và tên:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Email:
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Số điện thoại:
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#D9A6A6]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#304238] text-white rounded-xl text-xs font-bold hover:bg-[#252525] transition-colors"
                  >
                    Lưu thông tin
                  </button>
                </form>
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-editorial text-2xl font-semibold text-[#304238]">
                    Sổ địa chỉ ({user.addresses.length})
                  </h2>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="px-4 py-2 bg-[#304238] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#252525]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm địa chỉ mới</span>
                  </button>
                </div>

                {/* Add Address Form Modal/Inline */}
                {showAddAddress && (
                  <form onSubmit={handleCreateAddress} className="bg-[#F5EFE7]/60 rounded-2xl p-6 border border-[#F5EFE7] space-y-4">
                    <h3 className="text-sm font-bold text-[#304238]">Thêm địa chỉ giao nhận mới</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-stone-700 block mb-1">Nhãn địa chỉ:</label>
                        <input
                          type="text"
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          placeholder="Nhà riêng, Văn phòng..."
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-stone-700 block mb-1">Tên người nhận:</label>
                        <input
                          type="text"
                          value={newReceiver}
                          onChange={(e) => setNewReceiver(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-stone-700 block mb-1">Số điện thoại:</label>
                        <input
                          type="tel"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-stone-700 block mb-1">Địa chỉ chi tiết:</label>
                      <input
                        type="text"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        placeholder="Số nhà, toà nhà, tên đường..."
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="px-4 py-2 text-xs text-stone-600 hover:bg-stone-200 rounded-lg"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#304238] text-white text-xs font-bold rounded-lg hover:bg-[#252525]"
                      >
                        Lưu địa chỉ
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white rounded-2xl p-5 border border-[#F5EFE7] shadow-xs relative flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#304238] bg-[#F5EFE7] px-2.5 py-0.5 rounded-md">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-stone-800 pt-1">
                          {addr.receiverName} ({addr.phone})
                        </h4>
                        <p className="text-xs text-stone-600">
                          {addr.address}, {addr.district}, {addr.city}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#F5EFE7] flex justify-end">
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          title="Xóa địa chỉ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F5EFE7] shadow-xs space-y-4">
                <h2 className="font-editorial text-2xl font-semibold text-[#304238]">
                  Phương thức thanh toán đã liên kết
                </h2>
                <div className="p-4 rounded-xl border border-[#F5EFE7] bg-[#F5EFE7]/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[#304238]" />
                    <div>
                      <strong className="text-xs text-[#304238] block">Vietcombank Visa •••• 8899</strong>
                      <span className="text-[11px] text-stone-500">Hết hạn: 12/28</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Mặc định</span>
                </div>
              </div>
            )}

            {/* TAB: SECURITY */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F5EFE7] shadow-xs space-y-4 max-w-md">
                <h2 className="font-editorial text-2xl font-semibold text-[#304238]">
                  Đổi mật khẩu
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Mật khẩu hiện tại:</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-xs border rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Mật khẩu mới:</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-xs border rounded-lg" />
                  </div>
                  <button className="px-5 py-2.5 bg-[#304238] text-white text-xs font-bold rounded-lg hover:bg-[#252525]">
                    Cập nhật mật khẩu
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
