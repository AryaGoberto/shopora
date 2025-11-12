"use client";

import React, { useState } from "react";
import { ShoppingCart, User, Search, Menu, X, Star } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  rating?: number;
}

const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newArrivals: Product[] = [
    {
      id: 1,
      name: "T-shirt with Tape Details",
      price: 120,
      image: "🎽",
      rating: 4.5,
    },
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
  ];

  const topSelling: Product[] = [
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
    {
      id: 8,
      name: "Faded Skinny Jeans",
      price: 210,
      image: "👖",
      rating: 4.5,
    },
  ];

  const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

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
      <div className="bg-white rounded-xl h-48 flex items-center justify-center text-6xl mb-4">
        {product.image}
      </div>
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <div className="flex items-center gap-1 mb-2">
        {product.rating && renderStars(product.rating)}
        <span className="text-sm text-gray-600 ml-1">{product.rating}/5</span>
      </div>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div
        className="text-white text-center py-2 text-sm"
        style={{ backgroundColor: "#1230AE" }}
      >
        Sign up and get 20% off to your first order.{" "}
        <a href="#" className="underline font-medium">
          Sign Up Now
        </a>
        <button className="absolute right-4 top-2 text-white">×</button>
      </div>

      {/* Header */}
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
              <div className="flex">
                <Image
                  src="/image/Vector.svg"
                  alt="Signup illustration"
                  width={30}
                  height={30}
                  className="h-8"
                />{" "}
                <h1 className="text-2xl font-bold">Shopora</h1>
              </div>
              <nav className="hidden lg:flex gap-6">
                <a
                  href="#"
                  className="hover:text-gray-600 flex items-center gap-1"
                >
                  Shop
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-600">
                  On Sale
                </a>
                <a href="#" className="hover:text-gray-600">
                  New Arrivals
                </a>
                <a href="#" className="hover:text-gray-600">
                  Brands
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-md w-full">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className="bg-transparent border-none outline-none ml-2 w-full"
                />
              </div>
              <button className="hover:text-gray-600">
                <Search size={24} className="md:hidden" />
              </button>
              <button
                className="text-white px-6 py-2 rounded-full font-medium transition-colors"
                style={{ backgroundColor: "#1230AE" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0f2890")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1230AE")
                }
              >
                Login
                <a href="/login"></a>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="flex flex-col p-4 gap-4">
              <a href="#" className="hover:text-gray-600">
                Shop
              </a>
              <a href="#" className="hover:text-gray-600">
                On Sale
              </a>
              <a href="#" className="hover:text-gray-600">
                New Arrivals
              </a>
              <a href="#" className="hover:text-gray-600">
                Brands
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <button
              className="text-white px-12 py-4 rounded-full font-medium transition-colors"
              style={{ backgroundColor: "#1230AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0f2890")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1230AE")
              }
            >
              Shop Now
            </button>
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold">200+</div>
                <div className="text-gray-600 text-sm">
                  International Brands
                </div>
              </div>
              <div className="border-l pl-8">
                <div className="text-3xl font-bold">2,000+</div>
                <div className="text-gray-600 text-sm">
                  High-Quality Products
                </div>
              </div>
              <div className="border-l pl-8">
                <div className="text-3xl font-bold">30,000+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-20 right-20 text-6xl animate-bounce">
              ✨
            </div>
            <div
              className="absolute bottom-20 left-10 text-6xl animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              ✨
            </div>
            <div className="bg-white rounded-lg p-8 flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-8xl mb-4">👕</div>
                <div className="text-8xl">👔</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-8" style={{ backgroundColor: "#1230AE" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="text-white text-2xl font-bold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">NEW ARRIVALS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <button className="border-2 border-gray-200 px-12 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>
      </section>

      {/* Top Selling Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">TOP SELLING</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <button className="border-2 border-gray-200 px-12 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>
      </section>

      {/* Browse by Style Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <span className="text-2xl font-bold">Casual</span>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center md:col-span-2 cursor-pointer hover:shadow-lg transition-shadow">
            <span className="text-2xl font-bold">Formal</span>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center md:col-span-2 cursor-pointer hover:shadow-lg transition-shadow">
            <span className="text-2xl font-bold">Party</span>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <span className="text-2xl font-bold">Gym</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Shopora</h3>
              <p className="text-gray-600 text-sm mb-4">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">COMPANY</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Career
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">HELP</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Delivery Details
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">RESOURCES</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Free eBooks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Development Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    How to - Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Youtube Playlist
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-gray-600 text-sm">
            © 2025 Shopora. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
