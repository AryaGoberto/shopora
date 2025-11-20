"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Menu, X, Star, ShoppingCart, User } from "lucide-react";

// --- START: Data & Type Definitions (Diambil dari page.tsx sebelumnya, namun disederhanakan) ---

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string; // Menggunakan emoji seperti di komponen sebelumnya
  rating?: number;
}

// Data Produk (Filter Brands hanya menampilkan produk yang ada)
const brandProducts: Product[] = [
  {
    id: 2,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    image: "👖",
    rating: 3.5,
  },
  {
    id: 3,
    name: "Checkered Shirt",
    price: 180,
    image: "👔",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    image: "👕",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    discount: "-20%",
    image: "👔",
    rating: 5.0,
  },
  {
    id: 6,
    name: "Courage Graphic T-shirt",
    price: 145,
    image: "🎨",
    rating: 4.0,
  },
  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    image: "🩳",
    rating: 3.0,
  },
];

// --- END: Data & Type Definitions ---

// --- START: Internal Component - ProductCard (Diambil dari page.tsx sebelumnya) ---
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    );
  }
  if (hasHalfStar) {
    stars.push(
      <Star
        key="half"
        className="w-4 h-4 fill-yellow-400 text-yellow-400"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      />
    );
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
  }
  return stars;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
    {/* Mengganti bagian emoji dengan wadah kosong (seperti pada screenshot) */}
    <div className="bg-white rounded-xl h-48 flex items-center justify-center text-6xl mb-4 border border-gray-200">
      {/* Jika Anda ingin menampilkan emoji lagi, ganti dengan {product.image} */}
    </div>
    <div className="flex items-center gap-1 mb-1">
      {product.rating && renderStars(product.rating)}
      <span className="text-sm text-gray-600 ml-1">{product.rating}/5</span>
    </div>
    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
    <div className="flex items-center gap-2">
      <span className="font-bold text-xl">${product.price}</span>
      {product.originalPrice && (
        <>
          <span className="text-gray-400 line-through">
            ${product.originalPrice}
          </span>
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            {product.discount}
          </span>
        </>
      )}
    </div>
  </div>
);
// --- END: Internal Component - ProductCard ---

// --- START: Global Component - Header (Dibuat ulang agar dapat digunakan di halaman manapun) ---

// Catatan: Dalam aplikasi Next.js nyata, Header harus berupa komponen terpisah (app/components/Header.tsx)
// dan diimpor di sini. Untuk tujuan pembuatan kode cepat, saya menyertakannya secara internal,
// tetapi menggunakan struktur dari page.tsx sebelumnya (Header + Top Banner).
const Header: React.FC<{ mobileMenuOpen: boolean, setMobileMenuOpen: (b: boolean) => void }> = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <>
    {/* Top Banner (Diambil dari page.tsx) */}
    <div
        className="text-white text-center py-2 text-sm"
        style={{ backgroundColor: "#1230AE" }}
    >
        Sign up and get 20% off to your first order.{" "}
        <a href="/signup" className="underline font-medium">
            Sign Up Now
        </a>
        {/* Tombol Close dihilangkan untuk kesederhanaan, tetapi bisa ditambahkan */}
    </div>
    
    {/* Header Utama (Diambil dari page.tsx) */}
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center">
              {/* Logo: Menggunakan tulisan Shopora dan ikon keranjang dari screenshot */}
              <h1 className="text-2xl font-bold text-blue-900" style={{ color: '#1230AE' }}>Shopora</h1>
              <ShoppingCart size={24} className="text-blue-900" style={{ color: '#1230AE' }} />
            </div>
            
            {/* Navigasi Desktop (Diperbarui agar mencerminkan screenshot) */}
            <nav className="hidden lg:flex gap-6">
              <a href="#" className="hover:text-gray-600">
                On Sale
              </a>
              <a href="#" className="hover:text-gray-600">
                New Arrivals
              </a>
              <a href="/brands" className="hover:text-gray-600 font-bold text-blue-700" style={{ color: '#1230AE' }}>
                Brands
              </a>
            </nav>
          </div>
          
          {/* Search dan Ikon Kanan (Diambil dari page.tsx + screenshot) */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-lg w-full">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Celana Panjang" /* Placeholder dari screenshot */
                className="bg-transparent border-none outline-none ml-2 w-full text-sm"
              />
            </div>
            {/* Ikon Keranjang dan User dari screenshot */}
            <button className="hover:text-gray-600">
              <ShoppingCart size={24} />
            </button>
            <button className="hover:text-gray-600">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Diambil dari page.tsx) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col p-4 gap-4">
            <a href="#" className="hover:text-gray-600">
              On Sale
            </a>
            <a href="#" className="hover:text-gray-600">
              New Arrivals
            </a>
            <a href="/brands" className="hover:text-gray-600 font-bold">
              Brands
            </a>
          </nav>
        </div>
      )}
    </header>
  </>
);
// --- END: Global Component - Header ---

// --- START: Brands Page Component ---
const BrandsPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Menggunakan Header yang disesuaikan dari page.tsx dan screenshot */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Banner Placeholder (Mirip dengan screenshot Category Page) */}
        <div className="mb-8 p-6 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            {/* Di sini Anda bisa menempatkan banner khusus merek atau filter */}
            <h2 className="text-2xl font-semibold text-gray-700">Filter atau Promo Merek Unggulan</h2>
        </div>

        {/* Brand/Category Filter (Dapat diganti dengan filter merek yang sebenarnya) */}
        <section className="mb-12">
            <div className="flex items-center gap-4 border-b pb-4 mb-6">
                <span className="font-bold text-lg">Filter Merek:</span>
                <button className="px-4 py-2 bg-blue-900 text-white rounded-full text-sm">Semua</button>
                <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">ZARA</button>
                <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">VERSACE</button>
                <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">GUCCI</button>
            </div>

            <h3 className="text-3xl font-bold mb-8">Produk Merek Unggulan</h3>
            
            {/* Grid Produk (Menggunakan data brandProducts) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {brandProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Tombol View All (Dari screenshot Category Page) */}
            <div className="text-center">
                <button className="border-2 border-gray-200 px-12 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
                    View All
                </button>
            </div>
        </section>

      </div>

      {/* Footer dan Newsletter (Diambil dari page.tsx dan screenshot Category Page) */}
      
      {/* Newsletter Section */}
      <section
        className="py-16 mt-12"
        style={{ backgroundColor: "#1230AE" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-0 max-w-md">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-80 px-4 py-3 rounded-full text-black outline-none"
              />
              <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Utama (Diambil dari page.tsx) */}
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-1">
              <h3 className="font-bold text-xl mb-4">Shopora</h3>
              <p className="text-gray-600 text-sm mb-4">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">COMPANY</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">About</a></li>
                <li><a href="#" className="hover:text-black">Features</a></li>
                <li><a href="#" className="hover:text-black">Works</a></li>
                <li><a href="#" className="hover:text-black">Career</a></li>
              </ul>
            </div>
            {/* Help */}
            <div>
              <h4 className="font-bold mb-4">HELP</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Customer Support</a></li>
                <li><a href="#" className="hover:text-black">Delivery Details</a></li>
                <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
              </ul>
            </div>
            {/* FAQ (Ditambahkan dari screenshot) */}
            <div>
                <h4 className="font-bold mb-4">FAQ</h4>
                <ul className="space-y-2 text-gray-600">
                    <li><a href="#" className="hover:text-black">Account</a></li>
                    <li><a href="#" className="hover:text-black">Manage Deliveries</a></li>
                    <li><a href="#" className="hover:text-black">Orders</a></li>
                    <li><a href="#" className="hover:text-black">Payments</a></li>
                </ul>
            </div>
            {/* Resources */}
            <div>
              <h4 className="font-bold mb-4">RESOURCES</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Free eBooks</a></li>
                <li><a href="#" className="hover:text-black">Development Tutorial</a></li>
                <li><a href="#" className="hover:text-black">How to - Blog</a></li>
                <li><a href="#" className="hover:text-black">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
            <span>© 2025 Shopora. All Rights Reserved.</span>
            {/* Payment Icons Placeholder */}
            <div className="mt-4 sm:mt-0">
                {/* Di sini bisa ditambahkan ikon Visa, PayPal, dll. */}
                <span className="font-bold">VISA | PayPal | MASTERCARD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrandsPage;