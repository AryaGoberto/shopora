import localFont from "next/font/local";
import "./globals.css"; // <-- WAJIB biar Tailwind masuk

import { inter as Inter } from "./lib/font";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`bg-neutral-50 text-neutral-900 ${Inter.className}`}>{children}</body>
    </html>
  );
}
