// app/lib/firestoreService.ts
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Query,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "./types";

// ============ PRODUCT OPERATIONS ============

/**
 * Get semua products dari Firestore
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const collectionRef = collection(db, "products");
    const snapshot = await getDocs(collectionRef);

    const products: Product[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        originalPrice: data.originalPrice,
        discount: data.discount,
        image: data.image,
        description: data.description,
        category: data.category,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        sizes: data.sizes || [],
        colors: data.colors || [],
        stock: data.stock || 0,
        adminId: data.adminId,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        isNewArrival: data.isNewArrival || false,
        isOnSale: data.isOnSale || false,
      } as Product;
    });

    console.log(`✅ Fetched ${products.length} products from Firestore`);
    return products;
  } catch (error) {
    console.error("❌ Error fetching products from Firestore:", error);
    console.warn("⚠️ No products found. Make sure Firestore 'products' collection exists with data.");
    return [];
  }
}

/**
 * Get single product by ID
 */
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      price: data.price,
      originalPrice: data.originalPrice,
      discount: data.discount,
      image: data.image,
      description: data.description,
      category: data.category,
      rating: data.rating || 0,
      reviewCount: data.reviewCount || 0,
      sizes: data.sizes || [],
      colors: data.colors || [],
      stock: data.stock || 0,
      adminId: data.adminId,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      isNewArrival: data.isNewArrival || false,
      isOnSale: data.isOnSale || false,
    } as Product;
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return null;
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, where("category", "==", category));
    const snapshot = await getDocs(q);

    const products: Product[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        originalPrice: data.originalPrice,
        discount: data.discount,
        image: data.image,
        description: data.description,
        category: data.category,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        sizes: data.sizes || [],
        colors: data.colors || [],
        stock: data.stock || 0,
        adminId: data.adminId,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        isNewArrival: data.isNewArrival || false,
        isOnSale: data.isOnSale || false,
      } as Product;
    });

    return products;
  } catch (error) {
    console.error("❌ Error fetching products by category:", error);
    return [];
  }
}

/**
 * Get products by admin ID
 */
export async function getProductsByAdminId(adminId: string): Promise<Product[]> {
  try {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, where("adminId", "==", adminId));
    const snapshot = await getDocs(q);

    const products: Product[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        originalPrice: data.originalPrice,
        discount: data.discount,
        image: data.image,
        description: data.description,
        category: data.category,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        sizes: data.sizes || [],
        colors: data.colors || [],
        stock: data.stock || 0,
        adminId: data.adminId,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        isNewArrival: data.isNewArrival || false,
        isOnSale: data.isOnSale || false,
      } as Product;
    });

    return products;
  } catch (error) {
    console.error("❌ Error fetching admin products:", error);
    return [];
  }
}

/**
 * Search products by name or category
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic client-side filter. Untuk production, gunakan Firestore full-text search atau Algolia
    const allProducts = await getProducts();

    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    // split into tokens so multi-word searches are handled
    const tokens = lowerQuery.split(/\s+/).filter(Boolean);

    return allProducts.filter((product) => {
      const haystackParts: string[] = [];
      haystackParts.push(product.name || "");
      haystackParts.push(product.category || "");
      haystackParts.push(product.description || "");
      if (product.sizes && product.sizes.length > 0) {
        haystackParts.push(product.sizes.join(" "));
      }
      if (product.colors && product.colors.length > 0) {
        haystackParts.push(product.colors.map((c) => c.name).join(" "));
      }
      if (product.discount) haystackParts.push(product.discount.toString());
      // include price as string so numeric searches like "199" can match
      if (product.price !== undefined && product.price !== null)
        haystackParts.push(String(product.price));

      const haystack = haystackParts.join(" ").toLowerCase();

      // require that all tokens appear somewhere in the haystack
      return tokens.every((t) => haystack.includes(t));
    });
  } catch (error) {
    console.error("❌ Error searching products:", error);
    return [];
  }
}

/**
 * Add new product
 */
export async function addProduct(
  product: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const collectionRef = collection(db, "products");
    const docRef = await addDoc(collectionRef, {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
      isNewArrival: (product as any).isNewArrival || false,
      isOnSale: (product as any).isOnSale || false,
    });

    console.log("✅ Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding product:", error);
    throw error;
  }
}

/**
 * Update product
 */
export async function updateProduct(
  productId: string,
  updates: Partial<Product>
): Promise<void> {
  try {
    const docRef = doc(db, "products", productId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
      ...(updates.isNewArrival !== undefined ? { isNewArrival: updates.isNewArrival } : {}),
      ...(updates.isOnSale !== undefined ? { isOnSale: updates.isOnSale } : {}),
    });

    console.log("✅ Product updated:", productId);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    throw error;
  }
}

/**
 * Delete product
 */
export async function deleteProduct(productId: string): Promise<void> {
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);

    console.log("✅ Product deleted:", productId);
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    throw error;
  }
}
