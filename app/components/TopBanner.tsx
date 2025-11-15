// app/components/TopBanner.tsx

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

const TopBanner: React.FC = () => (
  <div
    className="text-white text-center py-2 text-sm relative"
    style={{ backgroundColor: "#1230AE" }}
  >
    Sign up and get 20% off to your first order.{" "}
    <Link href="/signup" className="underline font-medium">
      Sign Up Now
    </Link>
    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
      <X size={18} />
    </button>
  </div>
);

export default TopBanner;
