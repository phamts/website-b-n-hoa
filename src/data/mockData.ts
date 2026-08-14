import { Product, Coupon, CustomerReview, UserProfile, Order } from '../types';

export const CATEGORIES_DATA = [
  {
    id: 'birthday',
    name: 'Hoa sinh nhật',
    slug: 'birthday',
    description: 'Rạng rỡ, tươi mới và tràn ngập niềm vui chúc mừng tuổi mới viên mãn.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=900&auto=format&fit=crop',
    count: 14,
  },
  {
    id: 'love',
    name: 'Hoa tình yêu',
    slug: 'love',
    description: 'Thay lời thì thầm ngọt ngào, trao gửi tình cảm nồng nàn sâu lắng.',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=900&auto=format&fit=crop',
    count: 18,
  },
  {
    id: 'wedding',
    name: 'Hoa cưới & Sự kiện',
    slug: 'wedding',
    description: 'Tinh khôi, trang trọng lưu dấu khoảnh khắc hạnh phúc thiêng liêng.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
    count: 10,
  },
  {
    id: 'grand-opening',
    name: 'Hoa khai trương',
    slug: 'grand-opening',
    description: 'Kệ hoa sang trọng chúc đại phát, tài lộc hanh thông và thịnh vượng.',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=900&auto=format&fit=crop',
    count: 12,
  },
  {
    id: 'sympathy',
    name: 'Hoa chia buồn',
    slug: 'sympathy',
    description: 'Tone màu trang nhã, thể hiện lòng thành kính phân ưu và tiếc thương.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=900&auto=format&fit=crop',
    count: 8,
  },
  {
    id: 'seasonal',
    name: 'Hoa theo mùa',
    slug: 'seasonal',
    description: 'Tuyển chọn những đóa hoa đương mùa rực rỡ nhất trong tháng.',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=900&auto=format&fit=crop',
    count: 16,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Rosé Romance',
    slug: 'rose-romance',
    category: 'love',
    categoryName: 'Hoa tình yêu',
    price: 1450000,
    oldPrice: 1680000,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'BEST SELLER',
    images: [
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Bó hoa Rosé Romance kết hợp hài hòa giữa hoa hồng Ohara nhập khẩu Pháp, hoa mẫu đơn blush kiêu sa cùng cành lá bạch đàn nhập khẩu. Tông màu hồng phấn nhẹ nhàng mang lại cảm giác lãng mạn vô tận.',
    flowerTypes: ['Hồng Ohara Pháp', 'Mẫu đơn Blush', 'Baby trắng Hà Lan', 'Lá bạc Eucalyptus'],
    stemCount: 25,
    dimensions: {
      small: 'Cao 45cm x Rộng 35cm',
      medium: 'Cao 55cm x Rộng 45cm',
      large: 'Cao 65cm x Rộng 55cm'
    },
    sizes: [
      { name: 'Small', description: 'Gọn gàng, xinh xắn (18 bông)', priceModifier: 0 },
      { name: 'Medium', description: 'Tiêu chuẩn cao cấp (25 bông - Khuyên chọn)', priceModifier: 350000 },
      { name: 'Large', description: 'Đại cảnh xa hoa lộng lẫy (38 bông)', priceModifier: 750000 }
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#D9A6A6' },
      { name: 'Pure White', hex: '#FFFDF8' },
      { name: 'Peach Coral', hex: '#F3C5B5' }
    ],
    stock: 24,
    isFeatured: true,
    isFlashSale: true,
    flashSaleDiscount: 15,
    tags: ['Lãng mạn', 'Hồng nhập khẩu', 'Kỷ niệm', 'Valentine']
  },
  {
    id: 'prod-2',
    name: 'Ivory Garden',
    slug: 'ivory-garden',
    category: 'wedding',
    categoryName: 'Hoa cưới & Sự kiện',
    price: 1890000,
    oldPrice: 2150000,
    rating: 5.0,
    reviewsCount: 42,
    badge: 'EXCLUSIVE',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Thiết kế biểu tượng của sự thuần khiết. Ivory Garden tuyển chọn hoa hồng trắng White O’hara, cẩm tú cầu trắng Đà Lạt và lan hồ điệp mini đài các mang vẻ đẹp hoàng gia thanh tao.',
    flowerTypes: ['Hồng White O’hara', 'Lan hồ điệp trắng', 'Cẩm tú cầu tuyết', 'Lá dương xỉ Pháp'],
    stemCount: 30,
    dimensions: {
      small: 'Cao 40cm x Rộng 35cm',
      medium: 'Cao 50cm x Rộng 45cm',
      large: 'Cao 60cm x Rộng 55cm'
    },
    sizes: [
      { name: 'Small', description: 'Bó cầm tay cô dâu tinh tế', priceModifier: 0 },
      { name: 'Medium', description: 'Bó hoa sự kiện tiêu chuẩn sang trọng', priceModifier: 400000 },
      { name: 'Large', description: 'Đại thiết kế tiệc cưới cao cấp', priceModifier: 890000 }
    ],
    colors: [
      { name: 'Pure Ivory', hex: '#FFFDF8' },
      { name: 'Champagne Cream', hex: '#F5EFE7' }
    ],
    stock: 15,
    isFeatured: true,
    tags: ['Hoa cưới', 'Thanh lịch', 'Sang trọng']
  },
  {
    id: 'prod-3',
    name: 'Pink Peony Symphony',
    slug: 'pink-peony-symphony',
    category: 'seasonal',
    categoryName: 'Hoa theo mùa',
    price: 2250000,
    oldPrice: 2500000,
    rating: 4.9,
    reviewsCount: 29,
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Bản hòa tấu ngọt ngào từ những đóa Mẫu đơn Sarah Bernhardt New Zealand nhập khẩu. Từng lớp cánh bung nở mịn như lụa, tỏa hương thơm thanh khiết nhẹ nhàng.',
    flowerTypes: ['Mẫu đơn Sarah Bernhardt', 'Hồng David Austin Juliet', 'Cát tường viền hồng', 'Cỏ đồng nội'],
    stemCount: 22,
    dimensions: {
      small: 'Cao 45cm x Rộng 38cm',
      medium: 'Cao 55cm x Rộng 48cm',
      large: 'Cao 65cm x Rộng 58cm'
    },
    sizes: [
      { name: 'Small', description: 'Bó nhỏ 12 cành mẫu đơn', priceModifier: 0 },
      { name: 'Medium', description: 'Bó tiêu chuẩn 18 cành hoa kiêu sa', priceModifier: 500000 },
      { name: 'Large', description: 'Đại phẩm 28 cành mẫu đơn quý tộc', priceModifier: 1100000 }
    ],
    colors: [
      { name: 'Rose Pink', hex: '#C98282' },
      { name: 'Pastel Blush', hex: '#F8D8D8' }
    ],
    stock: 9,
    isFeatured: true,
    isFlashSale: true,
    flashSaleDiscount: 10,
    tags: ['Mẫu đơn', 'Nhập khẩu', 'Quý phái']
  },
  {
    id: 'prod-4',
    name: 'White Dream',
    slug: 'white-dream',
    category: 'birthday',
    categoryName: 'Hoa sinh nhật',
    price: 1320000,
    oldPrice: 1550000,
    rating: 4.8,
    reviewsCount: 51,
    badge: 'BEST SELLER',
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Giấc mơ tinh khôi chào đón tuổi mới với hoa cúc mẫu đơn trắng, hoa phi yến trắng và hồng môn tuyết. Thiết kế nhẹ nhàng nhưng không kém phần nổi bật.',
    flowerTypes: ['Cúc mẫu đơn trắng Hà Lan', 'Phi yến trắng', 'Hồng kem dâu', 'Lá măng tây'],
    stemCount: 20,
    dimensions: {
      small: 'Cao 45cm x Rộng 35cm',
      medium: 'Cao 55cm x Rộng 45cm',
      large: 'Cao 65cm x Rộng 55cm'
    },
    sizes: [
      { name: 'Small', description: 'Gọn gàng, tươi mới', priceModifier: 0 },
      { name: 'Medium', description: 'Thiết kế chuẩn sinh nhật', priceModifier: 300000 },
      { name: 'Large', description: 'Bó đại ấn tượng', priceModifier: 650000 }
    ],
    colors: [
      { name: 'Cream White', hex: '#FFFDF8' },
      { name: 'Soft Sage', hex: '#9AA88F' }
    ],
    stock: 18,
    isFeatured: true,
    tags: ['Sinh nhật', 'Trắng tinh khôi', 'Chúc mừng']
  },
  {
    id: 'prod-5',
    name: 'Eternal Rose Heritage',
    slug: 'eternal-rose-heritage',
    category: 'love',
    categoryName: 'Hoa tình yêu',
    price: 1750000,
    oldPrice: 1980000,
    rating: 5.0,
    reviewsCount: 34,
    badge: 'SALE',
    images: [
      'https://images.unsplash.com/photo-1548094878-84ced0f68b08?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Bó hoa hồng đỏ Ecuador trứ danh với kích thước bông nở to bản, cánh nhung dày dặn đỏ thẫm tượng trưng cho tình yêu trường tồn bất diệt.',
    flowerTypes: ['Hồng đỏ Explorer Ecuador', 'Lá chanh Ý', 'Hoa chuỗi ngọc đỏ', 'Giấy gói lụa Hàn Quốc'],
    stemCount: 24,
    dimensions: {
      small: 'Cao 50cm x Rộng 40cm',
      medium: 'Cao 60cm x Rộng 50cm',
      large: 'Cao 75cm x Rộng 65cm'
    },
    sizes: [
      { name: 'Small', description: '15 bông hồng Ecuador', priceModifier: 0 },
      { name: 'Medium', description: '24 bông hồng Ecuador', priceModifier: 450000 },
      { name: 'Large', description: '36 bông hồng Ecuador khổng lồ', priceModifier: 950000 }
    ],
    colors: [
      { name: 'Velvet Red', hex: '#8B0000' },
      { name: 'Dark Burgundy', hex: '#4A0E17' }
    ],
    stock: 12,
    isFeatured: true,
    isFlashSale: true,
    flashSaleDiscount: 12,
    tags: ['Hồng đỏ', 'Tình yêu', 'Ecuador', 'Kỷ niệm']
  },
  {
    id: 'prod-6',
    name: 'Spring Blossom Meadow',
    slug: 'spring-blossom-meadow',
    category: 'seasonal',
    categoryName: 'Hoa theo mùa',
    price: 1580000,
    rating: 4.8,
    reviewsCount: 23,
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Mang cả khu vườn mùa xuân Châu Âu về bên người thương. Sự phối ngẫu tự nhiên phóng khoáng của hoa tulip pastel, mao lương Nhật Bản và thạch thảo.',
    flowerTypes: ['Tulip Hà Lan', 'Mao lương Ranunculus Nhật', 'Hoa thanh liễu', 'Cúc Tana'],
    stemCount: 28,
    dimensions: {
      small: 'Cao 45cm x Rộng 35cm',
      medium: 'Cao 55cm x Rộng 45cm',
      large: 'Cao 65cm x Rộng 55cm'
    },
    sizes: [
      { name: 'Small', description: 'Bó nhỏ tươi vui', priceModifier: 0 },
      { name: 'Medium', description: 'Bó trung hài hòa màu sắc', priceModifier: 380000 },
      { name: 'Large', description: 'Bó đại rực rỡ phong cách đồng quê', priceModifier: 800000 }
    ],
    colors: [
      { name: 'Pastel Yellow', hex: '#F9E79F' },
      { name: 'Dusty Lilac', hex: '#C39BD3' },
      { name: 'Soft Coral', hex: '#F5B7B1' }
    ],
    stock: 20,
    isFeatured: true,
    tags: ['Mùa xuân', 'Tulip', 'Mao lương']
  },
  {
    id: 'prod-7',
    name: 'Golden Prosperity',
    slug: 'golden-prosperity',
    category: 'grand-opening',
    categoryName: 'Hoa khai trương',
    price: 2600000,
    oldPrice: 2900000,
    rating: 4.9,
    reviewsCount: 47,
    badge: 'BEST SELLER',
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Kệ hoa khai trương cao cấp tông vàng hoàng kim rực rỡ. Kết hợp hoa thiên điểu, hồng vàng Juliet, hoa hướng dương nhập và lan vũ nữ bay bổng mang thông điệp vạn sự hanh thông.',
    flowerTypes: ['Hồng vàng Juliet', 'Lan vũ nữ hoàng kim', 'Thiên điểu', 'Hoa hướng dương', 'Lá cọ xẻ'],
    stemCount: 45,
    dimensions: {
      small: 'Cao 120cm x Rộng 60cm',
      medium: 'Cao 160cm x Rộng 80cm',
      large: 'Cao 190cm x Rộng 100cm'
    },
    sizes: [
      { name: 'Small', description: 'Kệ đơn 1 tầng tinh tế', priceModifier: 0 },
      { name: 'Medium', description: 'Kệ 2 tầng đại tiệc sang trọng', priceModifier: 800000 },
      { name: 'Large', description: 'Kệ 3 tầng bề thế tài lộc', priceModifier: 1500000 }
    ],
    colors: [
      { name: 'Golden Sun', hex: '#D4AC0D' },
      { name: 'Warm Amber', hex: '#CA6F1E' }
    ],
    stock: 14,
    isFeatured: true,
    tags: ['Khai trương', 'Kệ hoa', 'Tài lộc', 'Doanh nghiệp']
  },
  {
    id: 'prod-8',
    name: 'Midnight Serenade',
    slug: 'midnight-serenade',
    category: 'love',
    categoryName: 'Hoa tình yêu',
    price: 1950000,
    rating: 5.0,
    reviewsCount: 31,
    badge: 'EXCLUSIVE',
    images: [
      'https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548094878-84ced0f68b08?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Vẻ đẹp huyền bí và mê hoặc của màn đêm. Phối ngẫu giữa hoa hồng tím cà Cappuccino, hoa phi yến tím than cùng lá bạch đàn phủ nhũ bạc tinh tế.',
    flowerTypes: ['Hồng tím Cappuccino', 'Phi yến tím đêm', 'Baby đen nhuộm thủ công', 'Lá bạch đàn bạc'],
    stemCount: 25,
    dimensions: {
      small: 'Cao 45cm x Rộng 35cm',
      medium: 'Cao 55cm x Rộng 45cm',
      large: 'Cao 65cm x Rộng 55cm'
    },
    sizes: [
      { name: 'Small', description: 'Bó nhỏ thanh lịch', priceModifier: 0 },
      { name: 'Medium', description: 'Bó tiêu chuẩn sang trọng', priceModifier: 420000 },
      { name: 'Large', description: 'Bó đại huyền bí cao cấp', priceModifier: 880000 }
    ],
    colors: [
      { name: 'Deep Violet', hex: '#4A235A' },
      { name: 'Charcoal Mocha', hex: '#2C3E50' }
    ],
    stock: 8,
    isFeatured: true,
    tags: ['Huyền bí', 'Tone tím', 'Độc bản']
  },
  {
    id: 'prod-9',
    name: 'Peaceful Serenity',
    slug: 'peaceful-serenity',
    category: 'sympathy',
    categoryName: 'Hoa chia buồn',
    price: 1650000,
    rating: 4.9,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Vòng hoa tưởng niệm trang trọng kết từ lan hồ điệp trắng, hoa huệ trắng và cúc mẫu đơn tinh khiết, gửi gắm lời nguyện cầu an yên nơi cõi vĩnh hằng.',
    flowerTypes: ['Lan hồ điệp trắng', 'Huệ trắng Pháp', 'Cúc mẫu đơn', 'Lá cọ xanh'],
    stemCount: 35,
    dimensions: {
      small: 'Cao 90cm x Rộng 50cm',
      medium: 'Cao 150cm x Rộng 70cm',
      large: 'Cao 180cm x Rộng 90cm'
    },
    sizes: [
      { name: 'Small', description: 'Kệ chia buồn để bàn', priceModifier: 0 },
      { name: 'Medium', description: 'Kệ đứng trang trọng 1 tầng', priceModifier: 500000 },
      { name: 'Large', description: 'Kệ đứng 2 tầng đại lễ', priceModifier: 1100000 }
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFDF8' },
      { name: 'Evergreen', hex: '#304238' }
    ],
    stock: 10,
    tags: ['Chia buồn', 'Kính viếng', 'Trang nhã']
  },
  {
    id: 'prod-10',
    name: 'Autumn Whisper',
    slug: 'autumn-whisper',
    category: 'seasonal',
    categoryName: 'Hoa theo mùa',
    price: 1480000,
    oldPrice: 1720000,
    rating: 4.8,
    reviewsCount: 27,
    badge: 'SALE',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=900&auto=format&fit=crop'
    ],
    description: 'Giai điệu thu êm ả với hoa hồng cam cháy Sunset, quả thông khô mini, hoa phi yến cam đất và lá phong sấy khô nghệ thuật.',
    flowerTypes: ['Hồng cam Sunset', 'Mao lương cam đất', 'Quả chuỗi ngọc cam', 'Lá sồi khô'],
    stemCount: 22,
    dimensions: {
      small: 'Cao 45cm x Rộng 35cm',
      medium: 'Cao 55cm x Rộng 45cm',
      large: 'Cao 65cm x Rộng 55cm'
    },
    sizes: [
      { name: 'Small', description: 'Bó nhỏ ấm cúng', priceModifier: 0 },
      { name: 'Medium', description: 'Bó tiêu chuẩn sắc thu', priceModifier: 320000 },
      { name: 'Large', description: 'Bó đại ấn tượng ấm áp', priceModifier: 700000 }
    ],
    colors: [
      { name: 'Warm Terracotta', hex: '#D35400' },
      { name: 'Mustard Gold', hex: '#F39C12' }
    ],
    stock: 16,
    tags: ['Mùa thu', 'Cam cháy', 'Ấm áp']
  }
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'FLOWER10',
    discountPercent: 10,
    minOrder: 500000,
    description: 'Giảm 10% cho đơn hàng từ 500.000đ',
  },
  {
    code: 'LUMIERE20',
    discountPercent: 20,
    minOrder: 1500000,
    description: 'Giảm 20% cho đơn hàng cao cấp từ 1.500.000đ',
  },
  {
    code: 'FREESHIP',
    discountAmount: 40000,
    minOrder: 800000,
    description: 'Miễn phí giao hàng tiêu chuẩn (tiết kiệm 40.000đ)',
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Nguyễn Bích Phương',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    content: 'Hoa bên ngoài còn đẹp và tươi hơn cả trong ảnh chụp! Tone màu hoa nhã nhặn, giấy gói lụa cao cấp cực kỳ sang. Bạn nhận hoa đã xúc động đến phát khóc.',
    date: '12/08/2026',
    productName: 'Rosé Romance',
    verified: true,
    occasion: 'Kỷ niệm 3 năm ngày cưới'
  },
  {
    id: 'rev-2',
    author: 'Trần Minh Hoàng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    content: 'Dịch vụ giao hoa hỏa tốc 2 tiếng xuất sắc! Nhân viên giao hoa lịch sự, có túi bảo quản giữ ẩm cho hoa cẩn thận. Thiệp viết tay chữ đẹp như in.',
    date: '08/08/2026',
    productName: 'Ivory Garden',
    verified: true,
    occasion: 'Cầu hôn'
  },
  {
    id: 'rev-3',
    author: 'Lê Thuỳ Trang',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    content: 'Đã đặt hoa khai trương cho đối tác quan trọng tại Lumière và nhận được phản hồi khen nức nở. Kệ hoa đứng vững chãi, hoa nhập khẩu bền tươi suốt 4 ngày.',
    date: '02/08/2026',
    productName: 'Golden Prosperity',
    verified: true,
    occasion: 'Khai trương chi nhánh'
  },
  {
    id: 'rev-4',
    author: 'Đỗ Hải Đăng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    content: 'Mẫu đơn New Zealand thơm nồng nàn và từng cánh hoa mở bung tròn trịa. Thích nhất là sự chỉn chu trong từng chi tiết nhỏ từ ruy băng satin đến thiệp gỗ.',
    date: '28/07/2026',
    productName: 'Pink Peony Symphony',
    verified: true,
    occasion: 'Sinh nhật mẹ'
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-001',
  name: 'Phạm Hương Ly',
  email: 'huongly.flower@gmail.com',
  phone: '0908 123 456',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  memberTier: 'Gold',
  points: 1250,
  addresses: [
    {
      id: 'addr-1',
      label: 'Nhà riêng',
      receiverName: 'Phạm Hương Ly',
      phone: '0908 123 456',
      address: 'Căn hộ 1802, Tháp B, Saigon Pearl, 92 Nguyễn Hữu Cảnh',
      district: 'Bình Thạnh',
      city: 'Hồ Chí Minh',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Văn phòng',
      receiverName: 'Phạm Hương Ly (Trợ lý nhận thay)',
      phone: '0908 123 456',
      address: 'Tầng 12, Deutsches Haus, 33 Lê Duẩn, Bến Nghé',
      district: 'Quận 1',
      city: 'Hồ Chí Minh',
      isDefault: false
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8891',
    orderNumber: 'LUM-88912',
    createdAt: '2026-08-10 14:30',
    customer: {
      name: 'Phạm Hương Ly',
      email: 'huongly.flower@gmail.com',
      phone: '0908 123 456',
      address: '92 Nguyễn Hữu Cảnh',
      city: 'Hồ Chí Minh',
      district: 'Bình Thạnh'
    },
    recipient: {
      recipientName: 'Đặng Kim Ngân',
      recipientPhone: '0912 345 678',
      address: '15 Lê Thánh Tôn, Bến Nghé',
      city: 'Hồ Chí Minh',
      district: 'Quận 1',
      deliveryDate: '2026-08-11',
      deliveryTimeSlot: '14:00 - 16:00',
      cardMessage: 'Chúc mừng sinh nhật cô bạn thân yêu! Tuổi mới luôn rực rỡ và hạnh phúc như những đóa hoa này nhé.',
      senderName: 'Hương Ly'
    },
    items: [
      {
        cartItemId: 'item-1',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 'Medium',
        selectedColor: 'Dusty Rose',
        quantity: 1,
        unitPrice: 1800000
      }
    ],
    subtotal: 1800000,
    shippingFee: 40000,
    discount: 180000,
    couponCode: 'FLOWER10',
    total: 1660000,
    paymentMethod: 'bank',
    paymentStatus: 'Paid',
    status: 'Delivered',
    estimatedDelivery: '2026-08-11 15:30'
  },
  {
    id: 'ord-9042',
    orderNumber: 'LUM-90425',
    createdAt: '2026-08-13 09:15',
    customer: {
      name: 'Phạm Hương Ly',
      email: 'huongly.flower@gmail.com',
      phone: '0908 123 456',
      address: '92 Nguyễn Hữu Cảnh',
      city: 'Hồ Chí Minh',
      district: 'Bình Thạnh'
    },
    recipient: {
      recipientName: 'Hoàng Anh Tuấn',
      recipientPhone: '0988 765 432',
      address: 'Toà nhà Landmark 81, 720A Điện Biên Phủ',
      city: 'Hồ Chí Minh',
      district: 'Bình Thạnh',
      deliveryDate: '2026-08-14',
      deliveryTimeSlot: '09:00 - 11:00',
      cardMessage: 'Chúc mừng anh thăng chức! Chúc anh luôn vững vàng và gặt hái thêm nhiều đỉnh cao mới.',
      senderName: 'Team Creative'
    },
    items: [
      {
        cartItemId: 'item-2',
        product: INITIAL_PRODUCTS[6],
        selectedSize: 'Medium',
        selectedColor: 'Golden Sun',
        quantity: 1,
        unitPrice: 3400000
      }
    ],
    subtotal: 3400000,
    shippingFee: 0,
    discount: 340000,
    couponCode: 'FLOWER10',
    total: 3060000,
    paymentMethod: 'momo',
    paymentStatus: 'Paid',
    status: 'Shipping',
    estimatedDelivery: '2026-08-14 10:30'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop',
    likes: '1.8k',
    caption: 'Từng nụ hoa được chăm chút tại Studio sáng sớm.',
    tag: '#lumiereflowers #floralart'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    likes: '2.4k',
    caption: 'Bó hoa cưới mang giấc mơ hoàng gia tinh khiết.',
    tag: '#weddingbouquet #luxuryflorist'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop',
    likes: '3.1k',
    caption: 'Bản sắc hoa hồng Pháp Ohara ngát hương.',
    tag: '#roseromance #ohararose'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop',
    likes: '2.9k',
    caption: 'Mẫu đơn New Zealand vào độ bung cánh đẹp nhất năm.',
    tag: '#peonylover #floristlife'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    likes: '1.5k',
    caption: 'Nghệ thuật cắm hoa đương đại cho không gian sống thượng lưu.',
    tag: '#homedecor #floraldesigner'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1548094878-84ced0f68b08?q=80&w=800&auto=format&fit=crop',
    likes: '4.2k',
    caption: 'Hồng đỏ Ecuador Explorer biểu tượng bất diệt của tình yêu.',
    tag: '#ecuadorrose #redvelvet'
  }
];
