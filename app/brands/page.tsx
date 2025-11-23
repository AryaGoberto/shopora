// app/brands/page.tsx
// HAPUS: "use client";

import React from "react"; // Hapus import useState, dll.
import Header from "../components/Header";
import Footer from "../components/footer";
import TopBrandBanner from "../components/TopBrandBanner";
import ProductSection from "../components/ProductSection";
import Newsletter from "../components/NewsLetter";
import { getProductsData } from "../lib/productService";
export default async function BrandsPage() {
  const allProducts = await getProductsData();
  const products = allProducts.slice(0, 12);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <TopBrandBanner />
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
          </div>
        </section>

        <ProductSection
          title="Top Selling"
          products={products} // Gunakan data yang sudah diambil
          viewAllLink="/shop/top-selling"
        />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
