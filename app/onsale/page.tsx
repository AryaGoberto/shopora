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
import Footer from "../components/common/footer";
import Header from "../components/common/Header";
import Newsletter from "../components/common/NewsLetter";
import TopBanner from "../components/common/TopBanner";
import ProductSection from "../components/product/ProductSection";
import { products } from "../lib/mock";
import { getProductsData } from "../lib/productService";
import SaleBanner from "../components/marketing/SaleBanner";

// --- HALAMAN UTAMA ---

export default async function HomePage() {
  const products = await getProductsData();
  return (
    <div className="min-h-screen bg-white font-sans">
      <TopBanner />

      <Header />
      <SaleBanner imageUrl="/onsale_banner.jpg" />
      <ProductSection
        title="On Sale"
        products={products.filter((p) => p.isOnSale || !!p.discount)}
        viewAllLink="/onsale"
      />

      <Newsletter />
      <Footer />
    </div>
  );
}
