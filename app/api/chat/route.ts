// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. AMBIL KEY DARI ENV
    const API_KEY = process.env.GOOGLE_API_KEY;
    
    if (!API_KEY) {
      throw new Error("API Key tidak ditemukan di .env.local");
    }
    
    const body = await request.json();
    const userMessage = body.message || "Halo";

    const MODEL_NAME = "gemini-2.5-flash";

    const prompt = `
      Kamu adalah CS Shopora. Jawab singkat (maks 2 kalimat), ramah, profesional, dan membantu.
      Info Shopora:
      - Ganti Username: Menu Profile > Edit Profile.
      - Link Akun: Settings > Linked Accounts.
      - Lupa Password: Login > Lupa Password, konfirmasi lewat email atau nomor telepon.
      - Ongkir: Gratis di atas Rp 500rb.
      - Retur: Maksimal 3 hari.
      - cara tambah alamat, bisa buka account setting, lalu my address/alamat saya, lalu isi semua yang dibutuhkan
      - menangani masalah kurir terlambat, produk lama datang, arahkan untuk menghubungi pihak toko atau ekspedisi dengan baik baik

      jika ada yang bertanya terkait masalah produk atau tokonya, arahkan untuk menghubungi tokonya dengan baik baik.
      jangan jawab jika ada yang bertanya selain tentang platform shopora, seperti bertanya tentang project pribadi ataupun informasi yang tidak relevan.
      
      Pertanyaan User: ${userMessage}
    `;

    // 3. KIRIM KE GOOGLE
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error Google:", data);
      throw new Error(data.error?.message || "Gagal connect ke Google");
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("❌ Error Server:", error.message);
    return NextResponse.json(
      { reply: "Maaf, saya sedang pembaruan sistem." }, 
      { status: 500 }
    );
  }
}