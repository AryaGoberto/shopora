// app/lib/types.ts

// 1. Tipe Data Produk Utama
export interface Product {
  id: string | number; // ID bisa string (Firestore doc.id) atau number
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  discount?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  pcsSold?: number;
  images?: string[];
  colors?: string[]; // Array string: ["Merah", "Biru"]
  sizes?: string[];  // Array string: ["S", "M", "L"]
  category?: string;
  stock?: number;
  adminId?: string;
  createdAt?: Date | string;
  brand?: string;
  isNewArrival?: boolean;
  isOnSale?: boolean;
}

// 2. Tipe Data CartItem (Produk + Jumlah)
export interface CartItem extends Product {
  quantity: number;
}

// 3. Tipe Data Admin
export interface Admin {
  id: string;
  email: string;
  storeName: string;
  storeDescription?: string;
  storeImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 4. Tipe Data Order (Pesanan dari Payment)
export interface Order {
  id?: string;
  items: CartItem[];
  userId?: string;
  userEmail?: string;
  totalPrice: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  paymentMethod: string;
  invoiceNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'received';
  createdAt: Date | string;
  updatedAt?: Date | string;
  estimatedDelivery?: string;
}

// 5. Tipe Data Review (Review dari Customer)
export interface Review {
  id?: string;
  orderId: string;
  productId: string;
  productName: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  images?: string[];
  userName?: string;
  userEmail?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

// 6. Legacy (Opsional, biar kode lama ga error)
export interface FakeProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}