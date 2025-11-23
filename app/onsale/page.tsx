import React from "react";
import {
  Search,
  ShoppingCart,
  User,
  Star,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Footer from "../components/footer";
import Header from "../components/Header";
import Newsletter from "../components/NewsLetter";
import TopBanner from "../components/TopBanner";
import ProductSection from "../components/ProductSection";
import { products } from "../lib/mock";
import { getProductsData } from "../lib/productService";
import SaleBanner from "../components/SaleBanner";

// --- HALAMAN UTAMA ---

export default async function HomePage() {
  const products = await getProductsData();
  return (
    <div className="min-h-screen bg-white font-sans">
      <TopBanner />

      <Header />
      <SaleBanner />
      <ProductSection
        title="Top Selling"
        products={products.slice(8, 16)} // Ambil 8 produk berikutnya
        viewAllLink="/shop/top-selling"
      />

      <Newsletter />
      <Footer />
    </div>
  );
}
