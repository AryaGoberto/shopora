// app/admin/dashboard/edit-product/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdmin } from "../../../../context/AdminContext";
import {
  getProductById,
  updateProduct,
} from "../../../../lib/firestoreService";
import { Product } from "../../../../lib/types";
import Image from "next/image";
import { playfair } from "../../../../lib/font";
import { ArrowLeft, AlertCircle, CheckCircle, Upload } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const { adminData, isAdmin, isLoading } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    category: "electronics",
    image: "",
    rating: "0",
    stock: "",
    sizes: "",
    colors: "",
    isNewArrival: false,
    isOnSale: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  // Redirect jika tidak login
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, isLoading, router]);

  // Load product
  useEffect(() => {
    if (isAdmin && productId) {
      loadProduct();
    }
  }, [isAdmin, productId]);

  const loadProduct = async () => {
    try {
      setIsLoadingProduct(true);
      const product = await getProductById(productId);

      if (!product) {
        setError("Produk tidak ditemukan");
        return;
      }

      // Check ownership
      if (product.adminId !== adminData?.id) {
        setError("Anda tidak memiliki akses ke produk ini");
        return;
      }

      // Format colors untuk input
      const colorString = product.colors
        ?.map((c) => `${c.name}:${c.hex}`)
        .join("; ") || "";

      setFormData({
        name: product.name,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        discount: product.discount || "",
        description: product.description,
        category: product.category,
        image: product.image,
        rating: (product.rating || 0).toString(),
        stock: (product.stock || 0).toString(),
        sizes: product.sizes?.join(", ") || "",
        colors: colorString,
        isNewArrival: !!product.isNewArrival,
        isOnSale: !!product.isOnSale,
      });
    } catch (err) {
      console.error("Error loading product:", err);
      setError("Gagal memuat produk");
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      // Validasi
      if (!formData.name || !formData.price || !formData.image) {
        setError("Nama, harga, dan gambar wajib diisi");
        setIsSubmitting(false);
        return;
      }

      // Parse sizes dan colors
      const sizes = formData.sizes
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const colors = formData.colors
        .split(";")
        .map((c) => {
          const [name, hex] = c.split(":");
          return name && hex ? { name: name.trim(), hex: hex.trim() } : null;
        })
        .filter(Boolean) as Array<{ name: string; hex: string }>;

      // Update product
      const updates = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : undefined,
        discount: formData.discount || undefined,
        description: formData.description,
        category: formData.category,
        image: formData.image,
        rating: parseFloat(formData.rating) || 0,
        stock: parseInt(formData.stock) || 0,
        sizes: sizes.length > 0 ? sizes : undefined,
        colors: colors.length > 0 ? colors : undefined,
        isNewArrival: formData.isNewArrival,
        isOnSale: formData.isOnSale,
      };

      await updateProduct(productId, updates);

      setSuccess("Produk berhasil diperbarui!");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Error updating product:", err);
      setError(err.message || "Gagal memperbarui produk");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isLoadingProduct) {
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
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className={`text-2xl font-bold text-blue-600 ${playfair.className}`}>
            Edit Produk
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-6"
        >
          {/* Basic Info Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Informasi Dasar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="contoh: ONE LIFE GRAPHIC T-SHIRT"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga (Rp) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="185000"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga Asli (Rp)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="250000"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Discount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Diskon
                </label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="30% OFF"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stok
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  placeholder="4.5"
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi Produk
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Deskripsikan produk Anda secara detail..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL Gambar Produk *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/product.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {formData.image && (
              <div className="mt-3 relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={formData.image}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sizes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ukuran (pisahkan dengan koma)
              </label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleInputChange}
                placeholder="S, M, L, XL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Contoh: S, M, L, XL, XXL
              </p>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Warna (nama:hex, pisahkan dengan ;)
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                placeholder="Red:#FF0000; Blue:#0000FF"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Contoh: Red:#FF0000; Blue:#0000FF; Green:#00FF00
              </p>
            </div>
          </div>

          {/* Flags: New Arrival, On Sale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isNewArrival"
                name="isNewArrival"
                checked={!!formData.isNewArrival}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <label htmlFor="isNewArrival" className="text-sm font-medium">
                Tandai sebagai New Arrival (tampil di halaman New Arrivals)
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isOnSale"
                name="isOnSale"
                checked={!!formData.isOnSale}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <label htmlFor="isOnSale" className="text-sm font-medium">
                Tandai sebagai On Sale (tampil di halaman On Sale)
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Upload size={18} />
              {isSubmitting ? "Sedang menyimpan..." : "Perbarui Produk"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
