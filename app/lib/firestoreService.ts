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
import { Product, Review } from "./types";

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
        brand: data.brand ? String(data.brand).trim() : undefined,
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
      brand: data.brand ? String(data.brand).trim() : undefined,
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
        brand: data.brand ? String(data.brand).trim() : undefined,
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
        brand: data.brand ? String(data.brand).trim() : undefined,
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
      if (product.brand) haystackParts.push(product.brand);
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
      brand: (product as any).brand ? String((product as any).brand).trim() : undefined,
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
      ...(updates.brand !== undefined ? { brand: updates.brand ? String(updates.brand).trim() : undefined } : {}),
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

// ============ ORDER OPERATIONS ============

/**
 * Save order to Firestore after payment
 */
export async function saveOrder(order: any): Promise<string> {
  try {
    console.log('📝 Preparing to save order to Firestore...');
    console.log('Order data:', order);
    
    const collectionRef = collection(db, "orders");
    
    // Prepare order data with timestamps
    const orderDataToSave = {
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    console.log('Final order data to save:', orderDataToSave);
    
    const docRef = await addDoc(collectionRef, orderDataToSave);

    console.log("✅ Order saved successfully with ID:", docRef.id);
    console.log("📍 Collection: orders, Document:", docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving order:", error);
    throw error;
  }
}

/**
 * Get all orders (bisa di-filter by userId nanti)
 */
export async function getAllOrders(): Promise<any[]> {
  try {
    const collectionRef = collection(db, "orders");
    const snapshot = await getDocs(collectionRef);

    const orders = snapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Handle createdAt - bisa Firestore Timestamp atau Date object
      let createdAtDate = new Date();
      if (data.createdAt) {
        if (typeof data.createdAt.toDate === 'function') {
          // Firestore Timestamp
          createdAtDate = data.createdAt.toDate();
        } else if (data.createdAt instanceof Date) {
          // Already a Date object
          createdAtDate = data.createdAt;
        } else if (typeof data.createdAt === 'string') {
          // Date string
          createdAtDate = new Date(data.createdAt);
        }
      }

      // Handle updatedAt
      let updatedAtDate = new Date();
      if (data.updatedAt) {
        if (typeof data.updatedAt.toDate === 'function') {
          // Firestore Timestamp
          updatedAtDate = data.updatedAt.toDate();
        } else if (data.updatedAt instanceof Date) {
          // Already a Date object
          updatedAtDate = data.updatedAt;
        } else if (typeof data.updatedAt === 'string') {
          // Date string
          updatedAtDate = new Date(data.updatedAt);
        }
      }

      return {
        id: doc.id,
        ...data,
        createdAt: createdAtDate,
        updatedAt: updatedAtDate,
      };
    });

    console.log(`✅ Fetched ${orders.length} orders from Firestore`);
    return orders;
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return [];
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'received'
): Promise<void> {
  try {
    const docRef = doc(db, "orders", orderId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date(),
    });

    console.log("✅ Order status updated:", orderId, "->", status);
  } catch (error) {
    console.error("❌ Error updating order status:", error);
    throw error;
  }
}

// ============ REVIEW OPERATIONS ============

/**
 * Simpan review dari customer ke Firestore
 */
export async function saveReview(review: {
  orderId: string;
  productId: string;
  productName: string;
  rating: number;
  title: string;
  comment: string;
  userName?: string;
  userEmail?: string;
  images?: string[];
}): Promise<string> {
  try {
    const collectionRef = collection(db, "reviews");
    const docRef = await addDoc(collectionRef, {
      ...review,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ Review saved:", docRef.id);

    // Update product rating
    await updateProductRating(review.productId);

    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving review:", error);
    throw error;
  }
}

/**
 * Ambil semua reviews untuk product tertentu
 */
export async function getProductReviews(productId: string) {
  try {
    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const snapshot = await getDocs(q);

    const reviews = snapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Handle createdAt date
      let createdAtDate = new Date();
      if (data.createdAt) {
        if (typeof data.createdAt.toDate === 'function') {
          createdAtDate = data.createdAt.toDate();
        } else if (data.createdAt instanceof Date) {
          createdAtDate = data.createdAt;
        } else if (typeof data.createdAt === 'string') {
          createdAtDate = new Date(data.createdAt);
        }
      }

      return {
        id: doc.id,
        ...data,
        createdAt: createdAtDate,
      };
    });

    console.log(`✅ Fetched ${reviews.length} reviews for product ${productId}`);
    return reviews;
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    return [];
  }
}

/**
 * Update product rating berdasarkan semua reviews
 */
export async function updateProductRating(productId: string): Promise<void> {
  try {
    // Ambil semua reviews untuk product
    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const snapshot = await getDocs(q);

    const reviews = snapshot.docs.map((doc) => doc.data());

    if (reviews.length === 0) {
      console.log("⚠️ No reviews found for product:", productId);
      return;
    }

    // Hitung rata-rata rating
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const avgRating = totalRating / reviews.length;

    // Update product dengan rating baru
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      rating: parseFloat(avgRating.toFixed(1)),
      reviewCount: reviews.length,
      updatedAt: new Date(),
    });

    console.log(
      `✅ Product ${productId} rating updated: ${avgRating.toFixed(1)} (${reviews.length} reviews)`
    );
  } catch (error) {
    console.error("❌ Error updating product rating:", error);
    throw error;
  }
}

/**
 * Check apakah user sudah review product ini (dari order tertentu)
 */
export async function hasUserReviewedProduct(
  orderId: string,
  productId: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, "reviews"),
      where("orderId", "==", orderId),
      where("productId", "==", productId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0;
  } catch (error) {
    console.error("❌ Error checking review:", error);
    return false;
  }
}

/**
 * Ambil semua reviews untuk order tertentu
 */
export async function getOrderReviews(orderId: string) {
  try {
    const q = query(collection(db, "reviews"), where("orderId", "==", orderId));
    const snapshot = await getDocs(q);

    const reviews = snapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Handle createdAt date
      let createdAtDate = new Date();
      if (data.createdAt) {
        if (typeof data.createdAt.toDate === 'function') {
          createdAtDate = data.createdAt.toDate();
        } else if (data.createdAt instanceof Date) {
          createdAtDate = data.createdAt;
        } else if (typeof data.createdAt === 'string') {
          createdAtDate = new Date(data.createdAt);
        }
      }

      return {
        id: doc.id,
        ...data,
        createdAt: createdAtDate,
      };
    });

    console.log(`✅ Fetched ${reviews.length} reviews for order ${orderId}`);
    return reviews;
  } catch (error) {
    console.error("❌ Error fetching reviews for order:", error);
    return [];
  }
}
