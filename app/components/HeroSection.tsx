"use client";

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 max-w-lg">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button
            className="text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-medium transition-colors w-full md:w-auto"
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
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
            <div>
              <div className="text-2xl md:text-3xl font-bold">200+</div>
              <div className="text-gray-600 text-xs md:text-sm">
                International Brands
              </div>
            </div>
            <div className="border-l pl-4 md:pl-8">
              <div className="text-2xl md:text-3xl font-bold">2,000+</div>
              <div className="text-gray-600 text-xs md:text-sm">
                High-Quality Products
              </div>
            </div>
            <div className="border-l pl-4 md:pl-8">
              <div className="text-2xl md:text-3xl font-bold">30,000+</div>
              <div className="text-gray-600 text-xs md:text-sm">
                Happy Customers
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
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
  );
};

export default HeroSection;
