// app/search/page.tsx
import React from "react";
import ProductCard from "../components/product/ProductCard";
import { Product } from "../lib/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { searchProducts } from "../lib/firestoreService";

// PERBAIKAN 1: Definisikan tipe searchParams sebagai Promise
interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // PERBAIKAN 2: Kita harus 'await' searchParams dulu agar datanya terbaca
  const resolvedSearchParams = await searchParams;
  const query =
    typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";

  // Ambil products dari Firestore
  let products: Product[] = [];

  if (query.trim() !== "") {
    // Lakukan searching hanya jika ada text pencarian
    products = await searchProducts(query);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </Link>

          <h1 className="text-3xl font-bold">
            Search Results for <span className="text-blue-700">"{query}"</span>
          </h1>

          {/* Tampilkan jumlah hanya jika ada query */}
          {query && (
            <p className="text-gray-500 mt-2">
              Found {products.length} products matching your search.
            </p>
          )}
        </div>

        {/* Tampilan Jika Query Kosong atau Tidak Ada Hasil */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {query.trim() === ""
                ? "Waiting for search..."
                : "No products found"}
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              {query.trim() === ""
                ? "Please type something in the search bar to find products."
                : `We couldn't find any products matching "${query}". Try using general keywords like "jacket", "ring", or other product names.`}
            </p>
          </div>
        ) : (
          /* Grid Produk */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
