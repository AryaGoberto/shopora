// app/admin/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../../context/AdminContext";
import Image from "next/image";
import { playfair } from "../../lib/font";
import { LogIn, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading, isAdmin } = useAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect jika sudah login
  React.useEffect(() => {
    if (isAdmin && !isLoading) {
      router.push("/admin/dashboard");
    }
  }, [isAdmin, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validasi input
      if (!email || !password) {
        setError("Email dan password harus diisi");
        setIsSubmitting(false);
        return;
      }

      // Login
      await login(email, password);

      // Redirect ke dashboard
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);

      // Handle Firebase errors
      if (err.code === "auth/user-not-found") {
        setError("Email tidak terdaftar");
      } else if (err.code === "auth/wrong-password") {
        setError("Password salah");
      } else if (err.message.includes("bukan admin")) {
        setError(err.message);
      } else {
        setError(err.message || "Login gagal. Coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Image
                src="/logo_shopora.svg"
                alt="Shopora Logo"
                width={40}
                height={40}
              />
              <h1 className={`text-3xl font-bold text-white ${playfair.className}`}>
                Shopora
              </h1>
            </div>
            <p className="text-blue-100 text-center text-sm">Admin Store Login</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Admin
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@store.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>

          {/* Footer Info */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <p className="text-gray-600 text-sm text-center">
              Belum punya akun admin?{" "}
              <a
                href="mailto:admin@shopora.com"
                className="text-blue-600 font-semibold hover:underline"
              >
                Hubungi kami
              </a>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">
            ← Kembali ke Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
