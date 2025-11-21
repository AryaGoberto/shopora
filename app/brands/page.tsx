"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Menu, X, Star, ShoppingCart, User } from "lucide-react";
import Newsletter from "../components/NewsLetter";
import Header from "../components/Header";
import Footer from "../components/footer";

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

const BrandsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Menggunakan Header yang disesuaikan dari page.tsx dan screenshot */}
      <Header />
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Placeholder (Mirip dengan screenshot Category Page) */}
        <div className="mb-8 p-6 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
          {/* Di sini Anda bisa menempatkan banner khusus merek atau filter */}
          <h2 className="text-2xl font-semibold text-gray-700">
            Filter atau Promo Merek Unggulan
          </h2>
        </div>

        {/* Brand/Category Filter (Dapat diganti dengan filter merek yang sebenarnya) */}
        <section className="mb-12">
          <div className="flex items-center gap-4 border-b pb-4 mb-6">
            <span className="font-bold text-lg">Filter Merek:</span>
            <button className="px-4 py-2 bg-blue-900 text-white rounded-full text-sm">
              Semua
            </button>
            <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">
              ZARA
            </button>
            <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">
              VERSACE
            </button>
            <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">
              GUCCI
            </button>
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
      <Newsletter />
      <Footer />
    </div>
  );
};

export default BrandsPage;