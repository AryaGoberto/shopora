"use client";

// app/components/TopBanner.tsx

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const TopBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setIsLoggedIn(!!u));
    return () => unsub();
  }, []);

  if (isLoggedIn || !showBanner) return null;
  return (
    <div
      className="text-white text-center py-2 text-sm relative"
      style={{ backgroundColor: "#1230AE" }}
    >
      Sign up and get 20% off to your first order.{" "}
      <Link href="/signup" className="underline font-medium">
        Sign Up Now
      </Link>
      <button
        onClick={() => setShowBanner(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default TopBanner;
