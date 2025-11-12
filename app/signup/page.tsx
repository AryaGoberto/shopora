"use client";

import React from "react";
// Mengganti import Link dari "next/link" menjadi tag <a> HTML biasa
import { User, Lock, Mail, ChevronRight } from "lucide-react";

const SignupPage: React.FC = () => {
  // SVG Icon for Google (simplified and embedded for single-file mandate)
  const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.096,4.672C14.152,15.795,18.665,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.664,8.388,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.666,36,24,36c-5.202,0-9.627-3.693-11.97-8.867l-6.096,4.672C9.364,39.46,16.273,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );

  return (
    // Kontainer Utama: Menggunakan BG abu-abu yang sangat terang
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Container Split-Screen Baru: Lebih lebar dan terbagi dua */}
      <div className="w-full max-w-6xl h-auto md:h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* KOLOM KIRI: Visual/Branding (Hanya terlihat di desktop/tablet) */}
        <div
          className="hidden md:flex flex-col justify-between p-7 text-white"
          style={{ backgroundColor: "#1230AE" }} // Warna Brand Biru Tua
        >
          <div className="flex items-center text-3xl font-black mb-10">
            {/* Mengganti logo dengan teks sederhana karena tidak ada aset */}
            🛍️ Shopora
          </div>

          <div className="flex flex-col items-center justify-center text-center flex-grow">
            <h2 className="text-5xl font-extrabold mb-4 leading-tight">
              Unlock Your Style
            </h2>
            <p className="text-gray-200 mt-4 max-w-sm">
              Sign up today to explore thousands of high-quality products and
              get 20% off your first order.
            </p>
          </div>
        </div>

        {/* KOLOM KANAN: Formulir Pendaftaran */}
        <div className="p-5 sm:p-12 md:p-7 flex flex-col justify-center">
          {/* Header/Judul */}
          <div className="text-left mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">Start your journey with us now.</p>
          </div>

          {/* Form Pendaftaran */}
          <form className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative rounded-full shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="John Doe"
                  className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1230AE] sm:text-sm sm:leading-6 transition duration-150"
                />
              </div>
            </div>

            {/* Email Input */}
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="youremail@example.com"
                  className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1230AE] sm:text-sm sm:leading-6 transition duration-150"
                />
              </div>
            </div>

            {/* Password Input */}
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
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Create a strong password"
                  className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1230AE] sm:text-sm sm:leading-6 transition duration-150"
                />
              </div>
            </div>

            {/* Persetujuan Terms & Conditions */}
            <div className="flex items-center pt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#1230AE] focus:ring-[#1230AE] border-gray-300 rounded"
                style={{ accentColor: "#1230AE" }}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-[#1230AE] hover:text-[#0f2890] transition-colors"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Tombol Signup */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white transition-colors gap-2 hover:shadow-xl mt-4"
                style={{ backgroundColor: "#1230AE" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0f2890")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1230AE")
                }
              >
                Sign Up
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* PEMISAH DAN SOCIAL LOGIN */}
          <div className="mt-6 mb-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Tombol Login with Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-100 transition-colors"
          >
            <GoogleIcon />
            Sign Up with Google
          </button>

          {/* Tautan Login */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-[#1230AE] hover:text-[#0f2890] transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
