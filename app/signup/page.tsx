"use client";

import React, { useState } from "react";
import { User, Lock, Mail, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { playfair, integralCF_Fonts } from "../lib/font";

const SignupPage: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
      });

      console.log("✅ User registered & saved to Firestore");
      router.push("/login");
    } catch (err: unknown) {
      console.error("❌ Error registering user:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email sudah terdaftar.");
      } else if (err.code === "auth/weak-password") {
        setError("Password minimal 6 karakter.");
      } else {
        setError("Gagal mendaftar. Coba lagi nanti.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl h-auto md:h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div
          className="hidden md:flex flex-col justify-between p-7 text-white"
          style={{ backgroundColor: "#1230AE" }}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/logo_shopora.svg"
              alt="Shopora Logo"
              width={30}
              height={30}
              className="svg-white-filter"
            />
            <Link
              href="/"
              className={`text-2xl font-bold text-white ${playfair.className}`}
            >
              Shopora
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <h2
              className={`text-5xl font-extrabold mb-4 leading-tight ${integralCF_Fonts.className}`}
            >
              Unlock Your Style
            </h2>
            <p className="text-gray-200 mt-4 max-w-sm">
              Sign up today to explore thousands of high-quality products and
              get 20% off your first order.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-12 md:p-7 flex flex-col justify-center">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">Start your journey with us now.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative rounded-full shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1230AE] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-full shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1230AE] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative rounded-full shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1230AE] sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white gap-2"
                style={{ backgroundColor: "#1230AE" }}
              >
                {loading ? "Creating..." : "Sign Up"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-[#1230AE] hover:text-[#0f2890]"
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
