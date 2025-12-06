# 💳 Fake Payment System - Shopora

Sistem pembayaran fake (tanpa Midtrans) dengan multiple payment methods.

## 📋 Struktur Halaman

### Main Payment Pages
- `/checkout` - Checkout page (sebelum pilih metode)
- `/payment` - Halaman pilih metode pembayaran
- `/payment-success` - Halaman konfirmasi pembayaran berhasil

### Payment Method Pages
- `/payment/bca` - Transfer Bank BCA
- `/payment/mandiri` - Transfer Bank Mandiri  
- `/payment/bri` - Transfer Bank BRI
- `/payment/gopay` - Pembayaran GoPay
- `/payment/qris` - Pembayaran QRIS (dengan QR code static)
- `/payment/shopeepay` - Pembayaran ShopeePay

## 🔄 Alur Pembayaran

```
Cart Page (/cart)
    ↓
Checkout Page (/checkout)
    ↓
[Tombol: Pilih Metode Pembayaran]
    ↓
Payment Method Selection (/payment)
    ↓
Pilih salah satu metode:
    ├─ Bank Transfer (BCA/Mandiri/BRI) → Virtual Account + Copy Button
    ├─ GoPay → Step-by-step instructions
    ├─ QRIS → Static QR Code + Manual entry
    └─ ShopeePay → Step-by-step instructions
    ↓
[Tombol: Konfirmasi Pembayaran]
    ↓
Payment Success Page (/payment-success)
    ↓
Clear Cart + Auto redirect ke home (5 detik)
```

## 💰 Bank Virtual Account Details

```typescript
// app/lib/paymentMethods.ts
BCA: Virtual Account 7891234567890
Mandiri: Virtual Account 9876543210987
BRI: Virtual Account 1234567890123
```

## 📱 Features Per Method

### Bank Transfer (BCA, Mandiri, BRI)
✅ Virtual Account number dengan copy button
✅ Account name dengan copy button
✅ Transfer amount dengan copy button
✅ Instructions untuk setiap bank
✅ Confirm button untuk simulasi pembayaran

### GoPay
✅ Step-by-step instructions (4 langkah)
✅ GoPay number untuk copy
✅ Amount display
✅ Tips section
✅ Success confirmation

### QRIS
✅ Static SVG QR Code (bukan image)
✅ Detailed instructions dengan numbered steps
✅ Manual QRIS string entry sebagai alternative
✅ Tips untuk quality assurance
✅ Success confirmation

### ShopeePay
✅ Step-by-step instructions (4 langkah)
✅ ShopeePay number
✅ Amount display
✅ Tips section
✅ Success confirmation

## 🎨 Color Scheme Per Method

```
Bank Transfer: Blue (#1230AE)
GoPay: Green
QRIS: Purple
ShopeePay: Orange
BRI: Red
```

## 🔧 Key Components

### PaymentMethodSelector.tsx
- Grid layout untuk semua metode
- Grouped by type (Bank, E-wallet, QR)
- Selection state dengan visual feedback
- Next button ke specific payment page

### Routing
```
/payment/[method]/page.tsx
├─ bca/page.tsx → BankTransferPage
├─ mandiri/page.tsx → MandiriTransferPage
├─ bri/page.tsx → BriTransferPage
├─ gopay/page.tsx → GoPaylPage
├─ qris/page.tsx → QrisPage
└─ shopeepay/page.tsx → ShopeepayPage
```

## ✨ Fitur Spesial

### Copy to Clipboard
- Semua nomor VA, GoPay, QRIS string bisa di-copy
- Visual feedback: ikon berubah ke hijau setelah copy
- Auto-reset setelah 2 detik

### Static QR Code
- Generated dengan SVG element (bukan image)
- Position detection pattern di 3 corners (seperti QR code asli)
- Random pattern data untuk appear authentic
- Fallback manual QRIS string jika QR tidak terbaca

### Auto Redirect
- Payment success page auto-redirect ke home dalam 5 detik
- User bisa manual klik button juga
- Toast notification + invoice number

## 🧪 Testing

### Test Flow 1: Bank Transfer
1. Add produk ke cart
2. Go to checkout
3. Klik "Pilih Metode Pembayaran"
4. Pilih "BCA Transfer"
5. Copy VA number + amount
6. Klik "Konfirmasi Pembayaran"
7. Lihat success page

### Test Flow 2: QRIS
1. Same as above
2. Pilih "QRIS"
3. Lihat static QR code
4. Bisa copy QRIS string atau scan QR
5. Klik confirm
6. Success page

### Test Flow 3: E-Wallet
1. Same
2. Pilih "GoPay" atau "ShopeePay"
3. Follow step-by-step instructions
4. Confirm
5. Success page

## 📝 Environment Variables (Optional)
Tidak perlu Midtrans keys lagi! Tapi jika masih ada di .env, bisa di-remove:

```bash
# Bisa di-remove:
MIDTRANS_SERVER_KEY
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
```

## 🎯 Customization

### Change VA Numbers
Edit `app/lib/paymentMethods.ts`:
```typescript
const VA_NUMBERS = {
  bca: '1234567890',
  mandiri: '1234567890',
  bri: '1234567890',
};
```

### Change Timeout
Edit payment page (e.g., `app/payment/bca/page.tsx`):
```typescript
setTimeout(() => {
  router.push('/payment-success');
}, 2000); // Change this number (milliseconds)
```

### Customize QR Code
Edit `app/payment/qris/page.tsx`:
- Change SVG pattern
- Add color variations
- Replace dengan image QR jika ingin

## 🚀 Future Enhancements

1. Save order to Firestore sebelum confirm
2. Add order tracking
3. Send email notification
4. Add more payment methods
5. Admin panel untuk confirm pembayaran manual
6. Payment timeout handling (24 jam)
7. Payment retry logic

---

**Status**: ✅ Fully Functional Fake Payment System
**Last Updated**: December 6, 2025
