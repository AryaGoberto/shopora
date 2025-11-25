import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // Ganti hostname ini dengan domain yang kamu butuhkan
        hostname: "fakestoreapi.com",
        // Hapus properti 'domains' karena tidak digunakan
      },
      // Kamu bisa menambahkan pola lain di sini, misalnya:
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Allow Unsplash images used by admin image previews
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
