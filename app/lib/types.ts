// lib/types.ts

// ============ LEGACY (untuk kompatibilitas) ============
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

// ============ PRODUCT TYPE (FIRESTORE) ============
export interface Product {
  id: string;                    // Firestore doc ID
  name: string;
  price: number;
  originalPrice?: number;        // Optional - harga sebelum diskon
  discount?: string;             // Optional - label diskon (e.g., "30% OFF")
  image: string;                 // URL gambar
  description: string;
  category: string;              // e.g., "electronics", "clothing", "jewelry"
  rating?: number;               // 0-5
  reviewCount?: number;          // Jumlah review
  sizes?: string[];              // Optional - e.g., ["S", "M", "L", "XL"]
  colors?: Array<{ name: string; hex: string }>; // Optional - color variants
  stock?: number;                // Jumlah stok
  adminId: string;               // ID admin/toko yang upload
  createdAt: Date;
  updatedAt: Date;
  isNewArrival?: boolean;        // Optional - show in New Arrivals
  isOnSale?: boolean;            // Optional - mark as on sale
  brand?: string;                // Optional - brand label for product
}

// ============ ADMIN TYPE (FIRESTORE) ============
export interface Admin {
  id: string;                    // Firestore doc ID
  email: string;
  storeName: string;
  storeDescription?: string;
  storeImage?: string;           // Logo toko
  createdAt: Date;
  updatedAt: Date;
}

// ============ CART ITEM TYPE ============
export interface CartItemType {
  id: string;
  name: string;
  size?: string;
  color?: string;
  price: number;
  image: string;
  quantity: number;
}