import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Coupon, 
  Order, 
  UserProfile, 
  ActivePage, 
  ProductCategory,
  ToastMessage,
  DeliveryRecipientInfo,
  OrderStatus
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  VALID_COUPONS, 
  INITIAL_USER, 
  INITIAL_ORDERS 
} from '../data/mockData';

interface StoreContextType {
  // Navigation & UI state
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: 'Small' | 'Medium' | 'Large', color?: string, quantity?: number, deliveryInfo?: DeliveryRecipientInfo) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  
  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Financial computations
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  cartTotal: number;
  
  // Orders
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (
    customerInfo: Order['customer'], 
    recipientInfo: DeliveryRecipientInfo, 
    paymentMethod: Order['paymentMethod']
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // User
  user: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserProfile['addresses'][0], 'id'>) => void;
  deleteAddress: (id: string) => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Formatters
  formatPrice: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // LocalStorage state init
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('lumiere_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumiere_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lumiere_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('lumiere_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('lumiere_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('lumiere_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('lumiere_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lumiere_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumiere_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumiere_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lumiere_user', JSON.stringify(user));
  }, [user]);

  // Toast management
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Format currency: VND (e.g. 1.450.000 ₫)
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  // Cart operations
  const addToCart = (
    product: Product, 
    size: 'Small' | 'Medium' | 'Large' = 'Medium', 
    color: string = product.colors[0]?.name || 'Standard', 
    quantity: number = 1,
    deliveryInfo?: DeliveryRecipientInfo
  ) => {
    const sizeOption = product.sizes.find(s => s.name === size);
    const unitPrice = product.price + (sizeOption ? sizeOption.priceModifier : 0);
    const cartItemId = `${product.id}-${size}-${color}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (deliveryInfo) {
          updated[existingIndex].deliveryInfo = deliveryInfo;
        }
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
            unitPrice,
            deliveryInfo
          }
        ];
      }
    });

    showToast(`Đã thêm "${product.name}" vào giỏ hàng`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: qty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const targetProd = products.find(p => p.id === productId);
      const name = targetProd ? targetProd.name : 'Sản phẩm';
      
      if (exists) {
        showToast(`Đã bỏ "${name}" khỏi danh sách yêu thích`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Đã lưu "${name}" vào danh sách yêu thích`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, 'Medium', product.colors[0]?.name || 'Standard', 1);
    setWishlist(prev => prev.filter(id => id !== product.id));
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  
  // Shipping fee calculation: Free if >= 1.000.000đ or FREESHIP coupon, otherwise 40.000đ
  const baseShipping = cartSubtotal > 0 ? (cartSubtotal >= 1000000 ? 0 : 40000) : 0;
  
  // Coupon computation
  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  const shippingFee = appliedCoupon?.code === 'FREESHIP' ? 0 : baseShipping;
  const cartTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  // Apply Coupon
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = VALID_COUPONS.find(c => c.code === cleanCode);
    
    if (!found) {
      return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
    }
    
    if (cartSubtotal < found.minOrder) {
      return { 
        success: false, 
        message: `Mã ${cleanCode} chỉ áp dụng cho đơn hàng từ ${formatPrice(found.minOrder)}.` 
      };
    }

    setAppliedCoupon(found);
    localStorage.setItem('lumiere_coupon', JSON.stringify(found));
    showToast(`Áp dụng mã ${cleanCode} thành công!`, 'success');
    return { success: true, message: `Áp dụng thành công: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('lumiere_coupon');
    showToast('Đã xóa mã giảm giá', 'info');
  };

  // Place Order
  const placeOrder = (
    customerInfo: Order['customer'], 
    recipientInfo: DeliveryRecipientInfo, 
    paymentMethod: Order['paymentMethod']
  ): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `LUM-${randomSuffix}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      customer: customerInfo,
      recipient: recipientInfo,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Unpaid' : 'Paid',
      status: 'Pending',
      estimatedDelivery: `${recipientInfo.deliveryDate} (${recipientInfo.deliveryTimeSlot})`
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    localStorage.removeItem('lumiere_coupon');

    // Update user points
    setUser(prev => ({
      ...prev,
      points: prev.points + Math.round(newOrder.total / 10000)
    }));

    showToast(`Đặt hàng thành công! Mã đơn hàng: ${newOrder.orderNumber}`, 'success');
    setActivePage('order-success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          paymentStatus: status === 'Delivered' ? 'Paid' : order.paymentStatus
        };
      }
      return order;
    }));
    showToast(`Đã cập nhật trạng thái đơn hàng thành: ${status}`, 'success');
  };

  // Product CRUD (For Admin)
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Đã thêm sản phẩm "${newProduct.name}" vào cửa hàng`, 'success');
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
    showToast(`Đã cập nhật thông tin "${updatedProd.name}"`, 'success');
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Đã xóa "${target?.name || 'Sản phẩm'}" khỏi cửa hàng`, 'info');
  };

  // User Profile
  const updateUserProfile = (profileData: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profileData }));
    showToast('Đã lưu thông tin tài khoản thành công', 'success');
  };

  const addAddress = (newAddr: Omit<UserProfile['addresses'][0], 'id'>) => {
    const addressWithId = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    setUser(prev => ({
      ...prev,
      addresses: [...prev.addresses, addressWithId]
    }));
    showToast('Đã thêm địa chỉ giao hàng mới', 'success');
  };

  const deleteAddress = (id: string) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id)
    }));
    showToast('Đã xóa địa chỉ', 'info');
  };

  return (
    <StoreContext.Provider value={{
      activePage,
      setActivePage,
      selectedProduct,
      setSelectedProduct,
      quickViewProduct,
      setQuickViewProduct,
      isSearchOpen,
      setIsSearchOpen,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      isWishlistDrawerOpen,
      setIsWishlistDrawerOpen,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      
      wishlist,
      toggleWishlist,
      isInWishlist,
      moveToCartFromWishlist,
      
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      
      cartSubtotal,
      shippingFee,
      discountAmount,
      cartTotal,
      
      orders,
      currentOrder,
      placeOrder,
      updateOrderStatus,
      
      user,
      updateUserProfile,
      addAddress,
      deleteAddress,
      
      toasts,
      showToast,
      removeToast,
      
      formatPrice
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
