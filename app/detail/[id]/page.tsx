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
  Check,
  Plus,
  Minus,
  Search,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Newsletter from "../../components/common/NewsLetter";
import { getProductById } from "../../lib/firestoreService";
import { Product } from "../../lib/types";
import { useCart } from "../../context/CartContext";
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/footer";

// --- Helper Stars ---
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
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(productId);
        if (data) {
          // --- DATA CLEANING ---
          // Handle colors that might be objects {name, hex} or strings
          let safeColors: string[] = [];
          if (Array.isArray(data.colors)) {
            safeColors = data.colors.map((c: unknown) => {
              if (typeof c === "object" && c !== null && "name" in c) {
                return c.name; // Extract name if object
              }
              return String(c); // Otherwise force to string
            });
          }

          const safeSizes = Array.isArray(data.sizes) ? data.sizes : [];

          // Create clean product object
          const cleanProduct = {
            ...data,
            colors: safeColors,
            sizes: safeSizes,
          } as Product;

          setProduct(cleanProduct);
          setMainImage(cleanProduct.image);

          // Set defaults
          if (safeColors.length > 0) setSelectedColor(safeColors[0]);
          if (safeSizes.length > 0) setSelectedSize(safeSizes[0]);
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

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      product,
      quantity,
      selectedColor || undefined,
      selectedSize || undefined
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 w-10 h-10 mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
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
      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <span className="text-gray-400">/</span>
            <li>
              <span className="text-gray-800 font-medium">
                {product.category || "Product"}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: IMAGE */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg w-full aspect-square flex items-center justify-center relative">
              <Image
                src={mainImage || "https://placehold.co/500"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-3 uppercase">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-[#1230AE]">
                Rp{product.price.toLocaleString("id-ID")}
              </span>

              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    Rp{product.originalPrice.toLocaleString("id-ID")}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.discount}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6 border-b pb-6">
              <div className="flex">
                {renderStars(product.rating || 0, "w-4 h-4")}
              </div>
              <span>({product.reviewCount || 0} reviews)</span>
            </div>

            <p className="text-gray-600 mb-8 max-w-lg leading-relaxed">
              {product.description}
            </p>

            {/* COLOR SELECTION */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <p className="text-lg font-semibold mb-3">Pilih Warna:</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((colorName) => (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        selectedColor === colorName
                          ? "bg-[#1230AE] text-white border-[#1230AE]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {colorName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE SELECTION */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-lg font-semibold mb-3">Pilih Ukuran:</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 border rounded-full font-medium transition-colors ${
                        size === selectedSize
                          ? "bg-[#1230AE] text-white border-[#1230AE]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-gray-200 mb-8" />

            {/* Quantity & Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-gray-50">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-3 hover:bg-gray-200 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="px-4 font-bold text-lg w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-3 hover:bg-gray-200 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center space-x-3 py-3 px-6 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform active:scale-95
                  ${
                    isAdded
                      ? "bg-green-600 text-white"
                      : "bg-[#1230AE] text-white hover:bg-[#0f2890]"
                  }`}
              >
                {isAdded ? (
                  <>
                    {" "}
                    <Check size={24} /> <span>Added!</span>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <ShoppingCart size={24} /> <span>Add to Cart</span>{" "}
                  </>
                )}
              </button>

              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-red-500">
                <Heart size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
