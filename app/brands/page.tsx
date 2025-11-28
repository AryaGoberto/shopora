// app/brands/page.tsx
// HAPUS: "use client";

import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/footer";
import NewArrivalsBanner from "../components/marketing/NewArrivalBanner";
import ProductSection from "../components/product/ProductSection";
import Newsletter from "../components/common/NewsLetter";
import BrandFilter from "../components/brands/BrandFilter";
import { getProductsData } from "../lib/productService";

type Props = { searchParams?: { brand?: string } };

export default async function BrandsPage({ searchParams }: Props) {
  const allProducts = await getProductsData();

  // Collect unique brands (non-empty) and sort
  const brandSet = new Set<string>();
  allProducts.forEach((p) => {
    if (p.brand && p.brand.trim()) brandSet.add(p.brand.trim());
  });
  const brands = Array.from(brandSet).sort((a, b) => a.localeCompare(b));

  // `searchParams` may be a Promise in some Next.js contexts — unwrap safely
  const params = (await Promise.resolve(searchParams)) || {};
  const rawSelected = params?.brand;
  const selectedBrand = rawSelected ? String(rawSelected).trim() : undefined;

  const filtered = selectedBrand
    ? allProducts.filter((p) => (p.brand || "").trim().toLowerCase() === selectedBrand.toLowerCase())
    : allProducts;

  const products = filtered.slice(0, 24);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <NewArrivalsBanner imageUrl="/brands_banner.png" />
        <section className="mb-12">
          <div className="border-b pb-4 mb-6">
            <span className="font-bold text-lg inline-block mb-3">
              Filter Merek:
            </span>
            <BrandFilter brands={brands} selectedBrand={selectedBrand} />
          </div>
        </section>

        <ProductSection
          title={selectedBrand ? `Merek: ${selectedBrand}` : "Top Brands"}
          products={products}
          viewAllLink="/brands"
        />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
