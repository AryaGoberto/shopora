// app/layout.tsx
import "./globals.css"; 
import { inter as Inter } from "./lib/font";

// 1. IMPORT CHATBOT DI SINI
import ChatBot from "./components/chatbot"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`bg-neutral-50 text-neutral-900 ${Inter.className}`}>
        {/* Konten halaman utama */}
        {children}
        
        {/* 2. PASANG CHATBOT DI SINI (Supaya muncul di atas semua halaman) */}
        <ChatBot />
        
      </body>
    </html>
  );
}