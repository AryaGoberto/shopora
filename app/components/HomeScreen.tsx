"use client";

import { useMemo, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import ProductCard from "./ProductCard";
import type { Product } from "../lib/types";

function Chip({
  active,
  label,
  onClick,
}: {
  active?: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-neutral-900 bg-neutral-900 text-white"
          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
      }`}
    >
      {label}
    </button>
  );
}

export default function HomeScreen({ products }: { products: Product[] }) {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["Semua", ...Array.from(set)];
  }, [products]);

  const visibleProducts = useMemo(() => {
    if (!selectedCat || selectedCat === "Semua") return products;
    return products.filter((p) => p.category === selectedCat);
  }, [products, selectedCat]);

  const handleAdd = () => setCartCount((c) => c + 1);

  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <Header cartCount={cartCount} />
      <Hero />

      {/* Kategori */}
      <section
        id="kategori"
        className="border-y border-neutral-200/70 bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex w-full snap-x items-center gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <Chip
                key={c}
                label={c}
                active={selectedCat === c || (!selectedCat && c === "Semua")}
                onClick={() => setSelectedCat(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Katalog */}
      <section id="katalog" className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-bold sm:text-xl">Produk Pilihan</h2>
            <span className="text-xs text-neutral-500">
              {visibleProducts.length} produk
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200/70 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-neutral-600 sm:flex-row sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} ShopOra. All rights reserved.
          </span>
          <nav className="flex items-center gap-4">
            <a className="hover:underline" href="#">
              Kebijakan Privasi
            </a>
            <a className="hover:underline" href="#">
              Syarat & Ketentuan
            </a>
            <a className="hover:underline" href="#">
              Bantuan
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
