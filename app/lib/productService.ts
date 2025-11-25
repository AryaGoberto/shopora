// app/lib/productService.ts
import { FakeProduct, Product } from "./types";
import { getProducts, searchProducts } from "./firestoreService";

/**
 * Fungsi utama untuk mengambil data produk dari Firestore
 */
export async function getProductsData(): Promise<Product[]> {
  try {
    // Fetch dari Firestore bukan API fake
    const products = await getProducts();
    return products;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}

/**
 * Search products by keyword
 */
export async function searchProductsData(query: string): Promise<Product[]> {
  try {
    const products = await searchProducts(query);
    return products;
  } catch (error) {
    console.error("❌ Error searching products:", error);
    return [];
  }
}

