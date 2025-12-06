import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

// Inisialisasi Snap Midtrans
const snap = new Midtrans.Snap({
  isProduction: false, // Sandbox environment
  serverKey: process.env.MIDTRANS_SERVER_KEY || "", // Server Key dari .env
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "", // Client Key dari .env
});

export async function POST(request: Request) {
  try {
    // Debug: Cek apakah keys terbaca
    console.log("Server Key exists:", !!process.env.MIDTRANS_SERVER_KEY);
    console.log("Server Key prefix:", process.env.MIDTRANS_SERVER_KEY?.substring(0, 15));

    // 1. Ambil data dari frontend
    const { orderId, totalAmount, items } = await request.json();

    console.log("Menerima Request Payment:", { orderId, totalAmount }); // Debug Log

    // 2. Siapkan parameter Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId,    // ID Unik (cth: ORDER-1715000...)
        gross_amount: Math.round(totalAmount), // Harga harus bulat (integer)
      },
      item_details: items,    // (Opsional) Data barang
      // Menambahkan expiry agar transaksi tidak menggantung selamanya
      credit_card: {
        secure: true,
      },
      expiry: {
        unit: "minutes",
        duration: 60, // Expire dalam 60 menit
      }
    };

    // 3. Minta Token Transaksi ke Midtrans
    const transaction = await snap.createTransaction(parameter);
    const token = transaction.token;

    console.log("Token Berhasil Dibuat:", token); // Debug Log

    // 4. Kirim token ke frontend
    return NextResponse.json({ token });

  } catch (error: any) {
    console.error("Gagal Membuat Transaksi:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}