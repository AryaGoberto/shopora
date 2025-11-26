"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Mail, Lock } from "lucide-react";
import { auth } from "../lib/firebase"; // pastikan path ini sesuai struktur folder kamu

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Login ke Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("✅ Login berhasil:", userCredential.user);

      // 🚀 Arahkan ke halaman utama (app/page.tsx)
      router.push("/");
    } catch (err: unknown) {
      console.error("❌ Gagal login:", err);
      const e = err as any;
      if (e && e.code === "auth/user-not-found") {
        setError("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
      } else if (e && e.code === "auth/wrong-password") {
        setError("Password salah. Coba lagi.");
      } else if (e && e.code === "auth/invalid-email") {
        setError("Format email tidak valid.");
      } else {
        setError("Gagal login. Silakan coba lagi nanti.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-500">Sign in to continue to Shopora</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative rounded-full shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative rounded-full shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Tombol Login */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white transition-colors"
              style={{ backgroundColor: "#1230AE" }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Tautan Pendaftaran */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
