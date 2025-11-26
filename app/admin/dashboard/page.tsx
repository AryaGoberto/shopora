// app/admin/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../../context/AdminContext";
import { getProductsByAdminId, deleteProduct } from "../../lib/firestoreService";
import { Product } from "../../lib/types";
import Image from "next/image";
import { playfair } from "../../lib/font";
import {
  LogOut,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { adminUser, adminData, logout, isAdmin, isLoading } = useAdmin();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Redirect jika tidak login
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, isLoading, router]);

  // Load products
  useEffect(() => {
    if (isAdmin && adminData) {
      loadProducts();
    }
  }, [isAdmin, adminData]);

  const loadProducts = async () => {
    if (!adminData) return;

    try {
      setIsLoadingProducts(true);
      const result = await getProductsByAdminId(adminData.id);
      setProducts(result);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Gagal memuat produk");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      setDeletingId(productId);
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setSuccess("Produk berhasil dihapus");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Gagal menghapus produk");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo_shopora.svg"
              alt="Shopora Logo"
              width={30}
              height={30}
            />
            <div>
              <h1 className={`text-2xl font-bold text-blue-600 ${playfair.className}`}>
                Shopora Admin
              </h1>
              <p className="text-sm text-gray-600">{adminData?.storeName}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Produk Saya</h2>
            <p className="text-gray-600 mt-1">
              Total: <span className="font-semibold">{products.length} produk</span>
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/dashboard/add-product")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Tambah Produk
          </button>
        </div>

        {/* Products Table/Grid */}
        {isLoadingProducts ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada produk</h3>
            <p className="text-gray-600 mb-6">
              Mulai tambahkan produk untuk ditampilkan di toko Anda
            </p>
            <button
              onClick={() => router.push("/admin/dashboard/add-product")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Plus size={20} />
              Tambah Produk Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.discount}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.category}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        Rp{product.originalPrice.toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>

                  {/* Stock */}
                  <p className="text-sm text-gray-700 mb-4">
                    Stok: <span className="font-semibold">{product.stock || 0}</span>
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/dashboard/edit-product/${product.id}`)
                      }
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                      {deletingId === product.id ? "Deleting..." : "Hapus"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
