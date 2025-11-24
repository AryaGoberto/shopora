// app/search/page.tsx
import React from "react";
import ProductCard from "../components/product/ProductCard";
import { FakeProduct, Product } from "../lib/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getAllProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

// PERBAIKAN 1: Definisikan tipe searchParams sebagai Promise
interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // PERBAIKAN 2: Kita harus 'await' searchParams dulu agar datanya terbaca
  const resolvedSearchParams = await searchParams;
  const query =
    typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";

  // Ambil semua data mentah
  const rawProducts: FakeProduct[] = await getAllProducts();

  // PERBAIKAN 3: Pastikan jika query kosong, hasilnya KOSONG (bukan semua produk)
  let filteredRawProducts: FakeProduct[] = [];

  if (query.trim() !== "") {
    // Lakukan filtering hanya jika ada text pencarian
    filteredRawProducts = rawProducts.filter((item) => {
      const lowerQuery = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      );
    });
  }

  // Mapping Data (Sama seperti sebelumnya)
  const products: Product[] = filteredRawProducts.map((item) => {
    const shouldHaveDiscount = item.id % 2 !== 0;
    let displayedOriginalPrice = undefined;
    let displayedDiscount = undefined;

    if (shouldHaveDiscount) {
      const markup = item.price * 1.3;
      displayedOriginalPrice = Number(markup.toFixed(2));
      displayedDiscount = "30% OFF";
    }

    return {
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
      rating: item.rating.rate,
      originalPrice: displayedOriginalPrice,
      discount: displayedDiscount,
    };
  });

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
                : `We couldn't find any products matching "${query}". Try using general keywords like "jacket", "men", or "gold".`}
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
