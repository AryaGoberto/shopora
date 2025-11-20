import React from 'react';
import { Search, ShoppingCart, User, Star, Twitter, Facebook, Instagram, Github, Mail } from 'lucide-react';
import Image from 'next/image';
import Footer from '../components/footer';
import Header from '../components/Header';

// --- TIPE DATA & MOCK DATA ---
interface Product {
  id: number;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
}

const products: Product[] = [
  { id: 1, title: "Skinny Fit Jeans", rating: 3.5, price: 240, originalPrice: 260, discount: 20, image: "/api/placeholder/300/300" },
  { id: 2, title: "Checkered Shirt", rating: 4.5, price: 180, image: "/api/placeholder/300/300" },
  { id: 3, title: "Sleeve Striped T-shirt", rating: 4.5, price: 130, originalPrice: 160, discount: 30, image: "/api/placeholder/300/300" },
  { id: 4, title: "Vertical Striped Shirt", rating: 5.0, price: 212, originalPrice: 232, discount: 20, image: "/api/placeholder/300/300" },
  { id: 5, title: "Courage Graphic T-shirt", rating: 4.0, price: 145, image: "/api/placeholder/300/300" },
  { id: 6, title: "Loose Fit Bermuda Shorts", rating: 3.0, price: 80, image: "/api/placeholder/300/300" },
];

// --- KOMPONEN KECIL (HELPER) ---

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
      <span className="text-sm text-gray-500 ml-1">{rating}/5</span>
    </div>
  );
};

// --- HALAMAN UTAMA ---

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* 1. TOP BANNER */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-2 text-center relative">
        <p>
          Sign up and get 20% off to your first order. <span className="font-bold underline cursor-pointer">Sign Up Now</span>
        </p>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hidden sm:block">✕</button>
      </div>

      {/* 2. NAVBAR */}
      <Header></Header>

      <main className="max-w-7xl mx-auto px-6">
        
        {/* 3. HERO SECTION (Kotak Abu-abu "On Sale") */}
        <section className="bg-[#F2F0F1] rounded-xl p-8 md:p-16 my-6 flex flex-col md:flex-row items-center justify-center gap-8">
          <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-black">
            ON SALE
          </h2>
          {/* Garis Pemisah Vertikal */}
          <div className="hidden md:block w-px h-24 bg-gray-400 mx-4"></div>
          
          <div className="flex gap-4">
            <div className="bg-blue-800 text-white p-4 rounded shadow-lg w-32">
              <p className="text-xs font-bold italic">DISC</p>
              <p className="text-xl font-black italic">UP TO</p>
            </div>
            <div className="bg-blue-800 text-white p-4 rounded shadow-lg w-32">
              <p className="text-xs font-bold italic">GRATIS</p>
              <p className="text-xl font-black italic">ONGKIR</p>
            </div>
          </div>
        </section>

        {/* 4. PRODUCT GRID */}
        <section className="py-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 gap-y-12">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col group cursor-pointer">
                {/* Placeholder Image - Dalam app nyata gunakan next/image dengan src asli */}
                <div className="bg-[#F0EEED] rounded-2xl aspect-square mb-4 overflow-hidden">
                  {/* Simulasi Gambar Transparan */}
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                   [Product Image]
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-1 truncate">{product.title}</h4>
                <div className="mb-2">
                  <StarRating rating={product.rating} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 text-red-500 text-xs font-medium px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border border-gray-300 rounded-full px-12 py-3 font-medium hover:bg-gray-100 transition">
              View All
            </button>
          </div>
        </section>
      </main>

      {/* 5. NEWSLETTER SECTION */}
      <section className="relative mt-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-blue-800 rounded-3xl px-6 py-10 md:px-16 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-black text-white max-w-lg uppercase leading-tight">
              Stay upto date about our latest offers
            </h2>
            <div className="w-full md:w-auto flex flex-col gap-3 w-full max-w-sm">
              <div className="bg-white rounded-full px-4 py-3 flex items-center">
                <Mail className="text-gray-400 w-5 h-5 mr-2" />
                <input type="email" placeholder="Enter your email address" className="outline-none w-full text-sm" />
              </div>
              <button className="bg-white text-black font-medium rounded-full px-4 py-3 w-full hover:bg-gray-100 transition">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
        {/* Background abu-abu separuh bawah untuk blending ke footer */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#F0F0F0] -z-0"></div>
      </section>

      {/* 6. FOOTER */}
      <Footer></Footer>
    </div>
  );
}