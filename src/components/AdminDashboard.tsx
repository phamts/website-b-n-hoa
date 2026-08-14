import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X,
  TrendingUp,
  Eye,
  ChevronLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, ProductCategory } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    updateOrderStatus, 
    addProduct, 
    formatPrice, 
    setActivePage 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'analytics'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('All');
  const [productSearch, setProductSearch] = useState('');

  // Add Product Form Modal state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('birthday');
  const [newPrice, setNewPrice] = useState<number>(1200000);
  const [newOldPrice, setNewOldPrice] = useState<number>(1400000);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80');
  const [newDesc, setNewDesc] = useState('');
  const [newFlowerTypes, setNewFlowerTypes] = useState('Hồng Ecuador, Cẩm tú cầu');
  const [newStock, setNewStock] = useState(15);
  const [newBadge, setNewBadge] = useState('Mới');

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  const filteredOrders = orderFilter === 'All'
    ? orders
    : orders.filter(o => o.status === orderFilter);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const categoryNames: Record<ProductCategory, string> = {
      'all': 'Tất cả hoa',
      'birthday': 'Hoa sinh nhật',
      'love': 'Hoa tình yêu',
      'wedding': 'Hoa cưới',
      'grand-opening': 'Hoa khai trương',
      'seasonal': 'Hoa theo mùa',
      'sympathy': 'Hoa chia buồn',
      'gifts': 'Quà tặng & Bình gốm'
    };

    const newProd: Product = {
      id: `custom-${Date.now()}`,
      name: newName,
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      categoryName: categoryNames[newCategory] || 'Hoa nghệ thuật',
      price: Number(newPrice),
      oldPrice: Number(newOldPrice) || undefined,
      images: [newImage],
      description: newDesc || 'Bó hoa tươi nghệ thuật phối từ hoa nhập khẩu cao cấp.',
      flowerTypes: newFlowerTypes.split(',').map(s => s.trim()),
      dimensions: {
        small: 'Cao 40cm x Rộng 30cm',
        medium: 'Cao 50cm x Rộng 40cm',
        large: 'Cao 65cm x Rộng 50cm'
      },
      stemCount: 25,
      rating: 5.0,
      reviewsCount: 1,
      stock: Number(newStock),
      badge: newBadge || undefined,
      isFeatured: true,
      colors: [
        { name: 'Dusty Rose', hex: '#D9A6A6' },
        { name: 'Ivory Cream', hex: '#FFFDF8' }
      ],
      sizes: [
        { name: 'Small', priceModifier: -200000, description: '15-18 cành hoa' },
        { name: 'Medium', priceModifier: 0, description: '22-25 cành hoa' },
        { name: 'Large', priceModifier: 400000, description: '30-35 cành hoa' }
      ],
      tags: ['Hoa mới', 'Nghệ thuật']
    };

    addProduct(newProd);
    setShowAddProduct(false);
    setNewName('');
    setNewDesc('');
  };

  const statusOptions: OrderStatus[] = ['Pending', 'Confirmed', 'Preparing', 'Shipping', 'Delivered', 'Cancelled'];

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#F5EFE7]">
          <div>
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-[#C98282] transition-colors mb-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Về Cửa hàng</span>
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#304238]" />
              <h1 className="font-editorial text-3xl font-semibold text-[#304238]">
                Bảng Quản Trị Cửa Hàng (Admin Console)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders' ? 'bg-[#304238] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-[#F5EFE7]'
              }`}
            >
              Quản lý Đơn hàng ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'products' ? 'bg-[#304238] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-[#F5EFE7]'
              }`}
            >
              Kho Sản phẩm ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analytics' ? 'bg-[#304238] text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-[#F5EFE7]'
              }`}
            >
              Doanh thu
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
          <div className="bg-white rounded-2xl p-6 border border-[#F5EFE7] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 uppercase font-bold">Tổng doanh thu</span>
              <h3 className="text-2xl font-bold text-[#304238] mt-0.5">{formatPrice(totalRevenue)}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#F5EFE7] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5EFE7] text-[#304238] flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 uppercase font-bold">Tổng số đơn hàng</span>
              <h3 className="text-2xl font-bold text-[#304238] mt-0.5">{totalOrdersCount} đơn</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#F5EFE7] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 uppercase font-bold">Giá trị trung bình đơn</span>
              <h3 className="text-2xl font-bold text-[#304238] mt-0.5">{formatPrice(avgOrderValue)}</h3>
            </div>
          </div>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['All', 'Pending', 'Confirmed', 'Preparing', 'Shipping', 'Delivered', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                    orderFilter === st
                      ? 'bg-[#304238] text-white shadow-xs'
                      : 'bg-white border border-[#F5EFE7] text-stone-700 hover:bg-[#F5EFE7]'
                  }`}
                >
                  {st === 'All' ? 'Tất cả đơn' : st}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-[#F5EFE7] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-[#F5EFE7]/60 text-stone-600 font-bold uppercase tracking-wider border-b border-[#F5EFE7]">
                    <tr>
                      <th className="p-4">Mã Đơn</th>
                      <th className="p-4">Khách hàng & Người nhận</th>
                      <th className="p-4">Sản phẩm hoa</th>
                      <th className="p-4">Ngày giao</th>
                      <th className="p-4">Tổng tiền</th>
                      <th className="p-4">Trạng thái</th>
                      <th className="p-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5EFE7]">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#304238]">
                          {order.orderNumber}
                          <div className="text-[10px] text-stone-400 font-sans">{order.createdAt}</div>
                        </td>

                        <td className="p-4">
                          <strong className="block text-stone-900">{order.recipient.recipientName}</strong>
                          <span className="text-[11px] text-stone-500">{order.recipient.recipientPhone}</span>
                          <div className="text-[10px] text-stone-400 truncate max-w-xs">{order.recipient.address}</div>
                        </td>

                        <td className="p-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="truncate max-w-[180px]">
                              {item.product.name} ({item.quantity}x)
                            </div>
                          ))}
                        </td>

                        <td className="p-4">
                          <span className="font-semibold text-[#304238] block">{order.recipient.deliveryDate}</span>
                          <span className="text-[10px] text-stone-500">{order.recipient.deliveryTimeSlot}</span>
                        </td>

                        <td className="p-4 font-bold text-[#C98282]">
                          {formatPrice(order.total)}
                        </td>

                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-[#D9A6A6]"
                          >
                            {statusOptions.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                            {order.paymentMethod.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mẫu hoa..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-xl bg-white focus:outline-none focus:border-[#D9A6A6]"
                />
              </div>

              <button
                onClick={() => setShowAddProduct(true)}
                className="px-5 py-2.5 bg-[#304238] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#252525] shadow-xs"
              >
                <Plus className="w-4 h-4 text-[#D9A6A6]" />
                <span>Thêm mẫu hoa mới</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#F5EFE7] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-[#F5EFE7]/60 text-stone-600 font-bold uppercase tracking-wider border-b border-[#F5EFE7]">
                    <tr>
                      <th className="p-4">Hình ảnh</th>
                      <th className="p-4">Tên tác phẩm</th>
                      <th className="p-4">Danh mục</th>
                      <th className="p-4">Giá bán</th>
                      <th className="p-4">Kho</th>
                      <th className="p-4">Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5EFE7]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-4">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded-lg bg-stone-100"
                          />
                        </td>
                        <td className="p-4">
                          <strong className="font-editorial text-sm font-semibold text-[#304238] block">{p.name}</strong>
                          <span className="text-[10px] text-stone-400 truncate max-w-xs block">{p.flowerTypes.join(', ')}</span>
                        </td>
                        <td className="p-4 font-semibold text-stone-600">{p.categoryName}</td>
                        <td className="p-4 font-bold text-[#304238]">{formatPrice(p.price)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock > 5 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {p.stock} bó
                          </span>
                        </td>
                        <td className="p-4 text-amber-600 font-bold">★ {p.rating} ({p.reviewsCount})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REVENUE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl p-8 border border-[#F5EFE7] shadow-xs space-y-6">
            <h2 className="font-editorial text-2xl font-semibold text-[#304238]">
              Báo cáo hiệu suất kinh doanh
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dữ liệu doanh thu thực tế được tự động đồng bộ hóa với từng giao dịch đặt hoa qua Website.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-xl bg-[#F5EFE7]/50 border border-[#F5EFE7] space-y-2">
                <span className="text-xs font-bold text-[#304238]">Phương thức thanh toán phổ biến</span>
                <div className="space-y-1 text-xs text-stone-700 pt-2">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span>Chuyển khoản VietQR:</span>
                    <strong>65%</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span>Thanh toán khi nhận (COD):</span>
                    <strong>20%</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Ví MoMo / VNPay:</span>
                    <strong>15%</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F5EFE7]/50 border border-[#F5EFE7] space-y-2">
                <span className="text-xs font-bold text-[#304238]">Cam kết chuẩn mực dịch vụ</span>
                <p className="text-xs text-stone-600 leading-relaxed pt-2">
                  100% các bó hoa được chuẩn bị từ nguồn hoa nhập khẩu tuyển chọn từ Hà Lan, Ecuador, Pháp và Đà Lạt loại 1.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add New Product */}
        {showAddProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#F5EFE7] space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5EFE7]">
                <h3 className="font-editorial text-2xl font-semibold text-[#304238]">Thêm Mẫu Hoa Mới</h3>
                <button onClick={() => setShowAddProduct(false)} className="p-1 hover:bg-[#F5EFE7] rounded-full">
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Tên bó hoa: *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Secret Garden Rosé"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Danh mục:</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                      className="w-full px-3 py-2 border rounded-xl"
                    >
                      <option value="birthday">Hoa sinh nhật</option>
                      <option value="love">Hoa tình yêu</option>
                      <option value="wedding">Hoa cưới</option>
                      <option value="grand-opening">Hoa khai trương</option>
                      <option value="seasonal">Hoa theo mùa</option>
                      <option value="sympathy">Hoa chia buồn</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Huy hiệu (Badge):</label>
                    <input
                      type="text"
                      placeholder="Mới, Bán chạy..."
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Giá bán (VNĐ): *</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Giá gốc / Gạch ngang (VNĐ):</label>
                    <input
                      type="number"
                      value={newOldPrice}
                      onChange={(e) => setNewOldPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">URL Hình ảnh Unsplash:</label>
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Thành phần hoa chính:</label>
                  <input
                    type="text"
                    placeholder="Hồng Ohara, Cẩm tú cầu, Phi yến..."
                    value={newFlowerTypes}
                    onChange={(e) => setNewFlowerTypes(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Mô tả tác phẩm:</label>
                  <textarea
                    rows={2}
                    placeholder="Mô tả ý nghĩa và cảm hứng cắm hoa..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#F5EFE7]">
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#304238] text-white font-bold rounded-xl hover:bg-[#252525]"
                  >
                    Lưu vào Cửa hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
