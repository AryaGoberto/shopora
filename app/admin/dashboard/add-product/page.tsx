"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, AlertCircle, CheckCircle, Upload, Loader2 } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import { addProduct } from "../../../lib/firestoreService";
import { playfair } from "../../../lib/font";

export default function AddProductPage() {
  const router = useRouter();
  const { adminData, isAdmin, isLoading } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    category: "electronics",
    brand: "",
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

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, isLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (!formData.name || !formData.price || !formData.image) {
        throw new Error("Nama, Harga, dan URL Gambar wajib diisi!");
      }

      // Bersihkan data Array
      const sizesArray = formData.sizes.split(",").map(s => s.trim()).filter(s => s);
      const colorsArray = formData.colors.split(",").map(c => c.trim()).filter(c => c);

      const newProduct = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        discount: formData.discount || undefined,
        description: formData.description,
        category: formData.category,
        brand: formData.brand || undefined,
        image: formData.image,
        rating: parseFloat(formData.rating) || 0,
        stock: parseInt(formData.stock) || 0,
        sizes: sizesArray,
        colors: colorsArray,
        adminId: adminData?.id || "unknown",
        isNewArrival: formData.isNewArrival,
        isOnSale: formData.isOnSale,
        createdAt: new Date().toISOString(),
        reviewCount: 0,
        pcsSold: 0
      };

      await addProduct(newProduct as any);
      setSuccess("Produk berhasil disimpan!");
      setTimeout(() => router.push("/admin/dashboard"), 1500);

    } catch (err: any) {
      console.error("Gagal simpan:", err);
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className={`text-xl md:text-2xl font-bold text-[#1230AE] ${playfair.className}`}>Tambah Produk Baru</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">{success}</div>}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Informasi Dasar</h2>
            <div className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama Produk" className="w-full p-3 border rounded-lg" />
              <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Brand" className="w-full p-3 border rounded-lg" />
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 border rounded-lg bg-white">
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="jewelry">Jewelry</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Deskripsi" rows={4} className="w-full p-3 border rounded-lg" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Harga & Stok</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Harga Jual" className="w-full p-3 border rounded-lg" />
              <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} placeholder="Harga Coret" className="w-full p-3 border rounded-lg" />
              <input type="text" name="discount" value={formData.discount} onChange={handleInputChange} placeholder="Diskon (30% OFF)" className="w-full p-3 border rounded-lg" />
              <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="Stok" className="w-full p-3 border rounded-lg" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Media & Varian</h2>
            <input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="URL Gambar" className="w-full p-3 border rounded-lg mb-4" />
            {formData.image && <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border mb-4" />}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Ukuran (Pisahkan koma)</label>
                <input type="text" name="sizes" value={formData.sizes} onChange={handleInputChange} placeholder="S, M, L" className="w-full p-3 border rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium">Warna (Pisahkan koma)</label>
                <input type="text" name="colors" value={formData.colors} onChange={handleInputChange} placeholder="Merah, Biru" className="w-full p-3 border rounded-lg" />
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2"><input type="checkbox" name="isNewArrival" checked={formData.isNewArrival} onChange={handleCheckboxChange} /> New Arrival</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="isOnSale" checked={formData.isOnSale} onChange={handleCheckboxChange} /> On Sale</label>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button type="button" onClick={() => router.back()} className="flex-1 py-3 border rounded-lg">Batal</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-[#1230AE] text-white rounded-lg disabled:opacity-50">
              {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}