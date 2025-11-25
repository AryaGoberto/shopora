// app/detail/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { playfair } from "../../lib/font";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronDown,
  Check,
  Plus,
  Minus,
  Search,
  ArrowLeft,
} from "lucide-react";
import Newsletter from "../../components/common/NewsLetter";
import { getProductById } from "../../lib/firestoreService";
import { Product } from "../../lib/types";
import { addToCart } from "../../lib/cart";
import { useRouter } from "next/navigation";

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

// --- MAIN COMPONENT ---

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const router = useRouter();

  // Load product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(productId);
        if (data) {
          setProduct(data);
          setMainImage(data.image);
          // Set default color dan size
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0].hex);
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } else {
          setError("Produk tidak ditemukan");
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Gagal memuat produk");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((q) => q + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Product not found"}
          </h2>
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b sticky top-0 bg-white z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <ArrowLeft size={24} className="text-gray-600 hover:text-gray-900" />
          </Link>
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
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li className="flex items-center">
              <Link href="/" className="hover:text-gray-700 transition duration-150">
                Home
              </Link>
            </li>
            <span className="text-gray-400">/</span>
            <li className="flex items-center">
              <a href="#" className="hover:text-gray-700 transition duration-150">
                Shop
              </a>
            </li>
            <span className="text-gray-400">/</span>
            <li className="text-gray-800 font-medium" aria-current="page">
              {product.category}
            </li>
          </ol>
        </nav>

        {/* 1. PRODUCT DETAIL SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: IMAGES */}
          <div className="flex flex-row-reverse gap-4">
            {/* Main Image */}
            <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden shadow-lg h-[600px] flex items-center justify-center">
              <Image
                src={mainImage}
                alt={product.name}
                width={500}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails - hanya 1 gambar untuk sekarang */}
            <div className="flex flex-col space-y-3 w-20 sm:w-28">
              <div
                className="w-full h-24 sm:h-32 rounded-lg cursor-pointer overflow-hidden border-2 border-[#1230AE] shadow-md"
                onClick={() => setMainImage(product.image)}
              >
                <Image
                  src={product.image}
                  alt="Thumbnail"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & CHECKOUT */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Price and Discount */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-4xl font-bold text-[#1230AE]">
                Rp{product.price.toLocaleString("id-ID")}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    Rp{product.originalPrice.toLocaleString("id-ID")}
                  </span>
                  <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {product.discount}
                  </span>
                </>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6 border-b pb-6">
              <div className="flex">
                {renderStars(product.rating || 0, "w-4 h-4")}
              </div>
              <span>({product.reviewCount || 0} reviews)</span>
            </div>

            <p className="text-gray-600 mb-8 max-w-lg">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <p className="text-lg font-semibold mb-3">Pilih Warna:</p>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
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
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-lg font-semibold mb-3">Pilih Ukuran:</p>
                <div className="flex space-x-3 flex-wrap">
                  {product.sizes.map((size) => (
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
            )}

            {/* Quantity & Add to Cart */}
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
                onClick={() => {
                  if (!product) return;
                  const item = {
                    id: product.id,
                    name: product.name,
                    size: selectedSize || undefined,
                    color: selectedColor || undefined,
                    price: product.price,
                    image: product.image,
                    quantity,
                  };
                  addToCart(item as any);
                  // small feedback then stay on page
                  alert("Added to cart");
                }}
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

        {/* 2. REVIEWS SECTION */}
        <div className="mt-20">
          <div className="flex border-b border-gray-200 text-lg font-medium space-x-8 mb-8">
            <button className="py-2 px-1 border-b-2 border-[#1230AE] text-[#1230AE] transition-colors">
              Product Details
            </button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800 transition-colors">
              Rating & Reviews ({product.reviewCount || 0})
            </button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800 transition-colors">
              FAQs
            </button>
          </div>

          {/* Review Summary */}
          <div className="mb-10 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-4">
              <span className="text-5xl font-extrabold mr-4">
                {product.rating || 0}
              </span>
              <div className="flex flex-col">
                <div className="flex">{renderStars(product.rating || 0)}</div>
                <span className="text-gray-600">
                  {product.reviewCount || 0} total reviews
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
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
