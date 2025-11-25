"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type Props = {
  brands: string[];
  selectedBrand?: string | null;
};

export default function BrandFilter({ brands, selectedBrand }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q) return brands;
    const lower = q.toLowerCase();
    return brands.filter((b) => b.toLowerCase().includes(lower));
  }, [brands, q]);

  const navigateToFirst = () => {
    if (filtered.length === 0) return;
    const target = filtered[0];
    // navigate to brand page (preserve case as stored)
    window.location.href = `/brands?brand=${encodeURIComponent(target)}`;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // If there's an exact case-insensitive match, prefer it
              const exact = brands.find((b) => b.toLowerCase() === q.trim().toLowerCase());
              if (exact) {
                window.location.href = `/brands?brand=${encodeURIComponent(exact)}`;
                return;
              }
              navigateToFirst();
            }
          }}
          placeholder="Cari merek..."
          className="w-full max-w-sm px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={navigateToFirst}
          className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
        >
          Go
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Link
          href="/brands"
          className={`px-4 py-2 rounded-full text-sm ${!selectedBrand ? "bg-blue-900 text-white" : "border hover:bg-gray-50"}`}
        >
          Semua
        </Link>

        {filtered.map((b) => (
          <Link
            key={b}
            href={`/brands?brand=${encodeURIComponent(b)}`}
            className={`px-4 py-2 rounded-full text-sm ${selectedBrand && selectedBrand.toLowerCase() === b.toLowerCase() ? "bg-blue-900 text-white" : "border hover:bg-gray-50"}`}
          >
            {b}
          </Link>
        ))}
      </div>
    </div>
  );
}
