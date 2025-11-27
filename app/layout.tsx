// app/layout.tsx
import "./globals.css";
import { inter as Inter } from "./lib/font";

import { AdminProvider } from "./context/AdminContext";
import { CartProvider } from "./context/CartContext"; // 

import ChatBot from "./components/utils/chatbot";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`bg-neutral-50 text-neutral-900 ${Inter.className}`}>
        
        {/* BUNGKUS APLIKASI DENGAN PROVIDER */}
        <AdminProvider>
          <CartProvider> {/* <--- PASANG DI SINI */}
            
            {children}
            
            <ChatBot />
            
          </CartProvider> {/* <--- TUTUP DI SINI */}
        </AdminProvider>
        
      </body>
    </html>
  );
}