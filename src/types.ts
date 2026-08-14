export type ProductCategory = 
  | 'all'
  | 'birthday'
  | 'love'
  | 'wedding'
  | 'grand-opening'
  | 'sympathy'
  | 'seasonal'
  | 'gifts';

export type ProductBadge = 'NEW' | 'BEST SELLER' | 'SALE' | 'EXCLUSIVE';

export interface ProductSizeOption {
  name: 'Small' | 'Medium' | 'Large';
  description: string;
  priceModifier: number; // percentage or fixed addition
}

export interface ProductColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: ProductBadge;
  images: string[];
  description: string;
  flowerTypes: string[];
  stemCount: number;
  dimensions: {
    small: string;
    medium: string;
    large: string;
  };
  sizes: ProductSizeOption[];
  colors: ProductColorOption[];
  stock: number;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  flashSaleDiscount?: number;
  tags: string[];
}

export interface DeliveryRecipientInfo {
  recipientName: string;
  recipientPhone: string;
  address: string;
  city: string;
  district: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  cardMessage: string;
  senderName?: string;
  senderPhone?: string;
  isAnonymous?: boolean;
  cardType?: 'standard' | 'luxury' | 'handmade';
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: 'Small' | 'Medium' | 'Large';
  selectedColor: string;
  quantity: number;
  unitPrice: number;
  deliveryInfo?: DeliveryRecipientInfo;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrder: number;
  description: string;
  expiryDate?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Shipping' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'cod' | 'bank' | 'momo' | 'vnpay' | 'zalopay';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    notes?: string;
  };
  recipient: DeliveryRecipientInfo;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Unpaid';
  status: OrderStatus;
  estimatedDelivery?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  productName?: string;
  verified: boolean;
  occasion?: string;
}

export interface UserAddress {
  id: string;
  label: string;
  receiverName: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberTier: 'Silver' | 'Gold' | 'Platinum' | 'VIP';
  points: number;
  addresses: UserAddress[];
}

export type ActivePage = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'admin'
  | 'about'
  | 'contact'
  | 'wishlist'
  | 'order-success';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}
