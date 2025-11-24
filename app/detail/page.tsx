"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { playfair } from "../lib/font";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronDown,
  Check,
  Plus,
  Minus,
  Search,
} from "lucide-react";
import Newsletter from "../components/common/NewsLetter";

// --- MOCK DATA ---
const currentProduct = {
  id: 1,
  title: "ONE LIFE GRAPHIC T-SHIRT",
  price: 185000,
  originalPrice: 250000,
  discount: "30%",
  description:
    "Didesain dengan bahan katun premium dan jahitan yang presisi. Kaos grafis One Life kami hadir dalam eberbagai warna unik. Sempurna untuk tampilan kasual dan trendi.",
  rating: 4.3,
  reviewsCount: 112,
  colors: [
    { name: "Green", hex: "#4CAF50" },
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1230AE" },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  images: [
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png", // Main image placeholder
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png", // Secondary image
    "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png", // Detail image
  ],
};

const mockReviews = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 5,
    date: "August 14, 2023",
    text: "Kualitasnya luar biasa! Desainnya unik dan bahannya sangat lembut. Saya suka bagaimana detail lipatan di lengan menambah nuansa vintage.",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    date: "August 15, 2023",
    text: "Sangat direkomendasikan. Warna navy-nya pekat dan pas di badan. Hanya saja, bagian kerah agak ketat, tapi secara keseluruhan sangat bagus.",
  },
  {
    id: 3,
    name: "Olivia F.",
    rating: 5,
    date: "August 09, 2023",
    text: "Sangat nyaman dipakai, saya bisa pakai seharian. Desain grafisnya sangat menonjol. Saya pasti akan membeli lebih banyak item dari toko ini.",
  },
  {
    id: 4,
    name: "Lisa C.",
    rating: 5,
    date: "August 10, 2023",
    text: "Pengiriman cepat dan packaging rapi. Kaosnya tebal namun adem. Desain sablonnya detail sekali, sangat puas dengan pembelian ini.",
  },
];

const relatedProducts = [
  {
    id: 101,
    name: "Polo with Contrast Trim",
    price: 232,
    originalPrice: 242,
    image: "👔",
    discount: "-5%",
  },
  {
    id: 102,
    name: "Gradient Graphic T-shirt",
    price: 145,
    originalPrice: 157,
    image: "👕",
    discount: "-10%",
  },
  {
    id: 103,
    name: "Polo with Tipping Details",
    price: 188,
    image: "👕",
    discount: null,
  },
  {
    id: 104,
    name: "Black Striped T-shirt",
    price: 128,
    originalPrice: 180,
    image: "👕",
    discount: "-30%",
  },
];

// --- UTILITY COMPONENTS ---

// Helper function to render star icons
const renderStars = (rating: number, size: string = "w-5 h-5") => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />
    );
  }
  if (hasHalfStar) {
    // Note: Half-star logic is complex in simple environments. Using a full star with clipPath for effect.
    stars.push(
      <Star
        key="half"
        className={`${size} fill-yellow-400 text-yellow-400`}
        style={{ clipPath: "inset(0 50% 0 0)" }}
      />
    );
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className={`${size} text-gray-300`} />);
  }
  return stars;
};

// Reusable Product Card (from app/page.tsx)
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string | null;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer mt-10">
    <div className="bg-white rounded-xl h-48 flex items-center justify-center text-6xl mb-4">
      {product.image}
    </div>
    <h3 className="font-bold text-base mb-1">{product.name}</h3>
    <div className="flex items-center gap-2">
      <span className="font-bold text-lg">
        Rp{product.price.toLocaleString("id-ID")}
      </span>
      {product.originalPrice && (
        <>
          <span className="text-gray-400 line-through text-sm">
            Rp{product.originalPrice.toLocaleString("id-ID")}
          </span>
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            {product.discount}
          </span>
        </>
      )}
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const ProductDetailPage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(
    currentProduct.colors[0].hex
  );
  const [selectedSize, setSelectedSize] = useState(currentProduct.sizes[1]); // Default to M
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(currentProduct.images[0]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((q) => q + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b sticky top-0 bg-white z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/logo_shopora.svg"
              alt="Shopora Logo"
              width={30}
              height={30}
            />
            <Link
              href="/"
              className={`text-2xl font-bold text-[#1230AE] ${playfair.className}`}
            >
              Shopora
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Search size={24} className="text-gray-600" />
            <ShoppingCart size={24} className="text-gray-600" />
            <a
              href="/login"
              className="text-white px-6 py-2 rounded-full font-medium"
              style={{ backgroundColor: "#1230AE" }}
            >
              Login
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {/* Item 1: Home */}
            <li className="flex items-center">
              <Link
                href="/"
                className="hover:text-gray-700 transition duration-150"
              >
                Home
              </Link>
            </li>

            {/* Pemisah (Menggunakan elemen pseudo/CSS untuk versi lebih canggih, 
            tapi kita pakai span saja agar sederhana dan konsisten) */}
            <span className="text-gray-400">/</span>

            {/* Item 2: Shop */}
            <li className="flex items-center">
              <a
                href="#"
                className="hover:text-gray-700 transition duration-150"
              >
                Shop
              </a>
            </li>
            <span className="text-gray-400">/</span>

            {/* Item 3: Men */}
            <li className="flex items-center">
              <a
                href="#"
                className="hover:text-gray-700 transition duration-150"
              >
                Men
              </a>
            </li>
            <span className="text-gray-400">/</span>

            {/* Item Terakhir: T-shirts (Tidak perlu link) */}
            <li className="text-gray-800 font-medium" aria-current="page">
              T-shirts
            </li>
          </ol>
        </nav>

        {/* 1. PRODUCT DETAIL SECTION (SPLIT LAYOUT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: IMAGES */}
          <div className="flex flex-row-reverse gap-4">
            {/* Main Image */}
            <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden shadow-lg h-[600px] flex items-center justify-center text-9xl">
              {/* Using mainImage state */}
              <Image
                src={mainImage}
                alt={currentProduct.title}
                width={500}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-col space-y-3 w-20 sm:w-28">
              {currentProduct.images.map((img, index) => (
                <div
                  key={index}
                  className={`w-full h-24 sm:h-32 rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${
                    img === mainImage
                      ? "border-[#1230AE] shadow-md"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & CHECKOUT */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">
              {currentProduct.title}
            </h1>

            {/* Price and Discount */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-4xl font-bold text-[#1230AE]">
                Rp{currentProduct.price.toLocaleString("id-ID")}
              </span>
              <span className="text-xl text-gray-400 line-through">
                Rp{currentProduct.originalPrice.toLocaleString("id-ID")}
              </span>
              <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                -{currentProduct.discount}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6 border-b pb-6">
              <div className="flex">
                {renderStars(currentProduct.rating, "w-4 h-4")}
              </div>
              <span>({currentProduct.reviewsCount} reviews)</span>
            </div>
            <p className="text-gray-600 mb-8 max-w-lg">
              {currentProduct.description}
            </p>

            <div className="mb-8">
              <p className="text-lg font-semibold mb-3">Pilih Warna:</p>
              <div className="flex space-x-3">
                {currentProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center`}
                    style={{
                      backgroundColor: color.hex,
                      borderColor:
                        color.hex === selectedColor ? "#1230AE" : "transparent",
                    }}
                    onClick={() => setSelectedColor(color.hex)}
                  >
                    {color.hex === selectedColor && (
                      <Check size={20} className="text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <p className="text-lg font-semibold mb-3">Pilih Ukuran:</p>
              <div className="flex space-x-3">
                {currentProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-5 py-2 border rounded-full font-medium transition-colors ${
                      size === selectedSize
                        ? "bg-[#1230AE] text-white border-[#1230AE]"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="px-4 font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button
                className="flex-1 flex items-center justify-center space-x-3 py-3 px-6 rounded-full text-white font-semibold text-lg transition-colors shadow-lg"
                style={{ backgroundColor: "#1230AE" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0f2890")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1230AE")
                }
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Button */}
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                <Heart size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex border-b border-gray-200 text-lg font-medium space-x-8 mb-8">
            <button className="py-2 px-1 border-b-2 border-[#1230AE] text-[#1230AE] transition-colors">
              Product Details
            </button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800 transition-colors">
              Rating & Reviews ({currentProduct.reviewsCount})
            </button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800 transition-colors">
              FAQs
            </button>
          </div>

          {/* Review Summary */}
          <div className="mb-10 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-4">
              <span className="text-5xl font-extrabold mr-4">
                {currentProduct.rating}
              </span>
              <div className="flex flex-col">
                <div className="flex">{renderStars(currentProduct.rating)}</div>
                <span className="text-gray-600">
                  {currentProduct.reviewsCount} total reviews
                </span>
              </div>
            </div>
            <button className="py-2 px-6 rounded-full bg-[#1230AE] text-white font-medium hover:bg-[#0f2890]">
              Write a Review
            </button>
          </div>

          {/* Individual Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-4">{review.name}</span>
                  <div className="flex">
                    {renderStars(review.rating, "w-3 h-3")}
                  </div>
                </div>
                <p className="text-gray-800 mb-2">&quot;{review.text}&quot;</p>
                <span className="text-xs text-gray-500">
                  Posted on {review.date}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="text-[#1230AE] font-medium hover:underline flex items-center mx-auto">
              Load More Reviews <ChevronDown size={20} className="ml-1" />
            </button>
          </div>
        </div>

        {/* 3. YOU MIGHT ALSO LIKE SECTION */}
        <div className="mt-10">
          <h2 className="text-4xl font-bold text-center text-[#1230AE] mb-6 md:mb-0">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Newsletter />

      <footer className="bg-gray-100 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Shopora</h3>
              <p className="text-gray-600 text-sm mb-4">
                We have clothes that suits your style and which you&apos;re
                proud to wear. From women to men.
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
            &copy; 2025 Shopora. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;
