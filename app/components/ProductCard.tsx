"use client";

import Image from "next/image";
import { formatIDR } from "../lib/format";
import type { Product } from "../lib/types";

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (id: string) => void;
}) {
  return (
    <div className="group rounded-2xl border border-neutral-200/70 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 shadow">
          {product.category}
        </span>
      </div>
      <div className="space-y-1 p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900 sm:text-base">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-emerald-700">
          {formatIDR(product.price)}
        </p>
        <a
          href={`/product/${product.slug}`}
          className="inline-block w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-center text-sm font-medium hover:bg-neutral-50"
        >
          Lihat Detail
        </a>
        <button
          onClick={() => onAdd(product.id)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.99]"
          aria-label={`Tambah ${product.name} ke keranjang`}
        >
          + Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
