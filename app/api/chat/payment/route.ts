// app/api/payment/route.ts
import { NextResponse } from 'next/server';
const Midtrans = require('midtrans-client');

export async function POST(request: Request) {
  try {
    const { orderId, totalAmount, customerName, customerEmail } = await request.json();

    // Pastikan Server Key ada di .env.local
    const snap = new Midtrans.Snap({
      isProduction: false, // Mode Sandbox
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalAmount,
      },
      customer_details: {
        first_name: customerName || "Customer",
        email: customerEmail || "guest@example.com",
      },
      // Mengaktifkan semua metode pembayaran
      enabled_payments: ["gopay", "shopeepay", "bca_va", "mandiri_bill", "bni_va", "bri_va", "permata_va", "other_qris"],
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });

  } catch (error: any) {
    console.error("Midtrans Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}