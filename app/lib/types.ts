// lib/types.ts

// Ini bentuk data mentah DARI Fake Store API
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

// Ini bentuk data yang DIBUTUHKAN aplikasi kita (sesuai ProductCard)
export interface Product {
  id: number;
  name: string;       // Di API namanya 'title', kita ubah jadi 'name'
  price: number;
  image: string;
  rating: number;     // Di API ratingnya objek, kita ambil angkanya saja
  originalPrice?: number; // Opsional (tidak ada di API)
  discount?: string;      // Opsional (tidak ada di API)
}