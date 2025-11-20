// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  console.log("1. Memulai Request ke AI...");

  try {
    // KUNCI API KAMU (Hardcoded)
    const API_KEY = "AIzaSyAT5An_z-2A4MCl9T6V09VZyV2EXKrZ8-Q"; 

    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // --- PERBAIKAN DI SINI: Ganti model jadi 'gemini-pro' ---
    // Model 'gemini-pro' itu versi standar yang pasti jalan.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const body = await request.json();
    const userMessage = body.message || "Halo";

    // --- INSTRUKSI SHOPORA (Kita gabung manual ke pesan user) ---
    // Ini trik supaya AI nurut walaupun pakai model standar.
    const SYSTEM_PROMPT = `
    Peran: Kamu adalah CS untuk e-commerce "Shopora". Jawab singkat & ramah.
    
    Info Shopora:
    - Ganti Username: Profile > Edit Profile.
    - Link Akun: Settings > Linked Accounts.
    - Lupa Password: Login > Lupa Password.
    - Pembayaran: Transfer Bank, E-Wallet, Kartu Kredit.
    - Ongkir: Gratis di atas Rp 500rb.
    - Retur: Max 3 hari via Riwayat Pesanan.
    
    PENTING: Jika ditanya di luar topik Shopora, tolak dengan sopan.
    
    Pertanyaan User: ${userMessage}
    `;
    
    console.log("2. Mengirim pesan ke Google...");

    // Kirim prompt gabungan tadi
    const result = await model.generateContent(SYSTEM_PROMPT);
    const response = await result.response;
    const text = response.text();

    console.log("3. Berhasil dapat balasan!");

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("❌ ERROR:", error.message || error);
    
    return NextResponse.json(
      { reply: "Maaf, server sedang sibuk. Coba lagi nanti." }, 
      { status: 500 }
    );
  }
}