"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();

  // Hide header on auth pages
  const isAuthPage =
    pathname.startsWith("/sign-up") || pathname.startsWith("/login");

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white"
          >
            🛍️
          </Link>
          <span className="hidden text-base font-semibold tracking-tight text-neutral-900 sm:inline">
            ShopOra
          </span>
        </div>

        {/* Search bar (desktop) */}
        <div className="hidden min-w-0 flex-1 items-center sm:flex">
          <div className="relative w-full max-w-xl">
            <input
              type="search"
              placeholder="Cari produk…"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-300"
            />
          </div>
        </div>

        {/* Right section: Keranjang & Auth */}
        <div className="flex items-center gap-2">
          <button
            className="relative rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-50"
            aria-label="Buka keranjang"
          >
            <span className="pr-1">Keranjang</span>
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </button>

          <Link
            href="/login"
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Search bar (mobile) */}
      <div className="block border-t border-neutral-200/70 sm:hidden">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <input
            type="search"
            placeholder="Cari produk…"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-300"
          />
        </div>
      </div>
    </header>
  );
}
