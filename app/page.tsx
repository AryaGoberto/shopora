'use client';

import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X, Star } from 'lucide-react';
import Footer from './components/footer';
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const newArrivals: Product[] = [
    {
      id: 1,
      name: 'T-shirt with Tape Details',
      price: 120,
      image: '🎽',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Skinny Fit Jeans',
      price: 240,
      originalPrice: 260,
      discount: '-20%',
      image: '👖',
      rating: 3.5
    },
    {
      id: 3,
      name: 'Checkered Shirt',
      price: 180,
      image: '👔',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Sleeve Striped T-shirt',
      price: 130,
      originalPrice: 160,
      discount: '-30%',
      image: '👕',
      rating: 4.5
    }
  ];

  const topSelling: Product[] = [
    {
      id: 5,
      name: 'Vertical Striped Shirt',
      price: 212,
      originalPrice: 232,
      discount: '-20%',
      image: '👔',
      rating: 5.0
    },
    {
      id: 6,
      name: 'Courage Graphic T-shirt',
      price: 145,
      image: '🎨',
      rating: 4.0
    },
    {
      id: 7,
      name: 'Loose Fit Bermuda Shorts',
      price: 80,
      image: '🩳',
      rating: 3.0
    },
    {
      id: 8,
      name: 'Faded Skinny Jeans',
      price: 210,
      image: '👖',
      rating: 4.5
    }
  ];

  const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
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
            <span className="text-gray-400 line-through">${product.originalPrice}</span>
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
      <div className="text-white text-center py-2 text-sm" style={{backgroundColor: '#1230AE'}}>
        Sign up and get 20% off to your first order.{' '}
        <a href="/signup" className="underline font-medium">Sign Up Now</a>
        <button className="absolute right-4 top-2 text-white">×</button>
      </div>

      {/* Header */}
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8">
              <button 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl md:text-2xl font-bold">Shopora</h1>
              <nav className="hidden lg:flex gap-6">
                <a href="#" className="hover:text-gray-600 flex items-center gap-1">
                  Shop
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-600">On Sale</a>
                <a href="#" className="hover:text-gray-600">New Arrivals</a>
                <a href="#" className="hover:text-gray-600">Brands</a>
              </nav>
            </div>
            <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-md w-full">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className="bg-transparent border-none outline-none ml-2 w-full"
                />
              </div>
              <button className="hover:text-gray-600">
                <Search size={20} className="md:hidden" />
              </button>
              <button  onClick={() => router.push("/login")}className="text-white px-4 md:px-6 py-2 rounded-full font-medium transition-colors text-sm md:text-base" style={{backgroundColor: '#1230AE'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f2890'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1230AE'} >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="flex flex-col p-4 gap-4">
              <a href="#" className="hover:text-gray-600">Shop</a>
              <a href="#" className="hover:text-gray-600">On Sale</a>
              <a href="#" className="hover:text-gray-600">New Arrivals</a>
              <a href="#" className="hover:text-gray-600">Brands</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">
              FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 max-w-lg">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <button className="text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-medium transition-colors w-full md:w-auto" style={{backgroundColor: '#1230AE'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f2890'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1230AE'}>
              Shop Now
            </button>
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
              <div>
                <div className="text-2xl md:text-3xl font-bold">200+</div>
                <div className="text-gray-600 text-xs md:text-sm">International Brands</div>
              </div>
              <div className="border-l pl-4 md:pl-8">
                <div className="text-2xl md:text-3xl font-bold">2,000+</div>
                <div className="text-gray-600 text-xs md:text-sm">High-Quality Products</div>
              </div>
              <div className="border-l pl-4 md:pl-8">
                <div className="text-2xl md:text-3xl font-bold">30,000+</div>
                <div className="text-gray-600 text-xs md:text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute top-20 right-20 text-6xl animate-bounce">✨</div>
            <div className="absolute bottom-20 left-10 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
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
      <section className="py-8" style={{backgroundColor: '#1230AE'}}>
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
          {newArrivals.map(product => (
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
          {topSelling.map(product => (
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
        <h2 className="text-4xl font-bold text-center mb-12">BROWSE BY DRESS STYLE</h2>
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

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">OUR HAPPY CUSTOMERS</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
              ←
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
              →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-gray-200 rounded-2xl p-6">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-bold">Sarah M.</h4>
              <span className="text-green-500">✓</span>
            </div>
            <p className="text-gray-600 text-sm">
              "I'm blown away by the quality and style of the clothes I received from Shopora. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            </p>
          </div>
          <div className="border-2 border-gray-200 rounded-2xl p-6">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-bold">Alex K.</h4>
              <span className="text-green-500">✓</span>
            </div>
            <p className="text-gray-600 text-sm">
              "Finding clothes that align with my personal style used to be a challenge until I discovered Shopora. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
            </p>
          </div>
          <div className="border-2 border-gray-200 rounded-2xl p-6">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-bold">James L.</h4>
              <span className="text-green-500">✓</span>
            </div>
            <p className="text-gray-600 text-sm">
              "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shopora. The selection of clothes is not only diverse but also on-point with the latest trends."
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-3xl p-8 md:p-12 text-center" style={{backgroundColor: '#1230AE'}}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            STAY UP TO DATE ABOUT<br />OUR LATEST OFFERS
          </h2>
          <div className="max-w-md mx-auto space-y-4">
            <div className="relative bg-white rounded-full">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">📧</span>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-14 pr-6 py-4 rounded-full outline-none text-gray-700"
              />
            </div>
            <button className="w-full bg-white text-black font-medium py-4 rounded-full hover:bg-gray-100 transition-colors">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;