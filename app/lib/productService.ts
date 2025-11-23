// app/lib/productService.ts

import { FakeProduct, Product } from "./types";

// Fungsi fetch dasar (Fetch mentah dari API)
async function fetchRawProducts(): Promise<FakeProduct[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Gagal mengambil data produk");
  }
  return res.json();
}

/**
 * Fungsi utama untuk mengambil data produk, mentransformasi, dan mengaplikasikan diskon.
 * Ini harus dipanggil oleh komponen Server Anda.
 */
export async function getProductsData(): Promise<Product[]> {
  const rawProducts: FakeProduct[] = await fetchRawProducts(); // ⬅️ Await ADA DI DALAM FUNGSI

  const products: Product[] = rawProducts.map((item) => {
    // --- LOGIKA PENGACAKAN DISKON (tetap sama) ---
    const isDiscounted = Math.random() > 0.5;
    let finalOriginalPrice = undefined;
    let finalDiscountLabel = undefined;

    if (isDiscounted) {
      const markupPrice = item.price * 1.2;
      finalOriginalPrice = Number(markupPrice.toFixed(2));
      finalDiscountLabel = "20% OFF";
    }

    return {
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
      rating: item.rating.rate,
      originalPrice: finalOriginalPrice,
      discount: finalDiscountLabel,
    };
  });

  return products;
}

// Hapus 'getProducts' dan 'products' yang diekspor dari file ini
// export { getProducts, products }; ❌ HAPUS!
