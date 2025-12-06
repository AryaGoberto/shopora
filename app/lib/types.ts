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

// 4. Legacy (Opsional, biar kode lama ga error)
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