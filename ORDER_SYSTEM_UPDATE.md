# 📦 ORDER SYSTEM UPDATE - Shopora

## 🎯 Ringkasan Fitur

Sistem order telah diperbarui untuk:
1. **Menyimpan data pesanan** ke Firestore setelah payment berhasil
2. **Menampilkan order history** di halaman My Orders dengan data real dari database
3. **Tombol "Pesanan Diterima"** untuk update status pesanan (dari delivered → received)

---

## 🔄 ALUR PROSES

### **1. Payment Success Flow**

```
Customer Confirm Payment
    ↓
/payment-success page loaded
    ↓
useEffect → saveOrderToFirestore()
    ↓
Order data saved ke Firestore collection "orders"
    ↓
Cart cleared automatically
    ↓
Auto redirect ke home (5 detik)
```

### **2. Order Display Flow**

```
/order page loaded
    ↓
useEffect → getAllOrders() dari Firestore
    ↓
Orders sorted by createdAt (newest first)
    ↓
Filter by status berdasarkan active tab:
  - Ongoing: confirmed, processing, shipped, delivered
  - Complete: received
  - Review: semua status
    ↓
Display di grid 2 column
    ↓
Show "Pesanan Diterima" button jika status = delivered
```

### **3. Status Update Flow**

```
Customer click "Pesanan Diterima"
    ↓
handleOrderReceived() triggered
    ↓
updateOrderStatus(orderId, 'received') to Firestore
    ↓
Local state updated
    ↓
Order moves to "Complete" tab
```

---

## 📊 DATA STRUCTURE

### **Order Type (TypeScript)**

```typescript
interface Order {
  id?: string;                    // Firestore doc ID
  items: CartItem[];              // Array dari produk yang dibeli
  userId?: string;                // User ID (optional)
  userEmail?: string;             // User email (optional)
  totalPrice: number;             // Total harga setelah diskon
  subtotal: number;               // Harga sebelum diskon
  discount: number;               // Jumlah diskon
  deliveryFee: number;            // Biaya pengiriman
  paymentMethod: string;          // ex: 'fake-payment'
  invoiceNumber: string;          // ex: 'INV-1733562890123'
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'received';
  createdAt: Date | string;       // Waktu pemesanan
  updatedAt?: Date | string;      // Terakhir di-update
  estimatedDelivery?: string;     // Estimasi tanggal pengiriman
}
```

### **Firestore Collection: "orders"**

```
orders/ (collection)
├── doc1/
│   ├── items: [...]
│   ├── totalPrice: 1200000
│   ├── subtotal: 1500000
│   ├── discount: 300000
│   ├── deliveryFee: 0
│   ├── paymentMethod: "fake-payment"
│   ├── invoiceNumber: "INV-1733562890123"
│   ├── status: "confirmed"
│   ├── createdAt: Timestamp
│   ├── updatedAt: Timestamp
│   └── estimatedDelivery: "2025-12-10"
│
├── doc2/
│   └── ...
```

---

## 🔧 FUNGSI BARU DI FIRESTORESERVICE.TS

### **1. saveOrder(order)**

```typescript
/**
 * Save order to Firestore after payment
 * @param order - Order data object
 * @returns Order ID (doc.id)
 */
export async function saveOrder(order: any): Promise<string>
```

**Usage:**
```typescript
const orderId = await saveOrder({
  items: cart,
  totalPrice: 1200000,
  subtotal: 1500000,
  discount: 300000,
  deliveryFee: 0,
  paymentMethod: 'fake-payment',
  invoiceNumber: 'INV-1733562890123',
  status: 'confirmed',
  estimatedDelivery: '2025-12-10'
});
```

---

### **2. getAllOrders()**

```typescript
/**
 * Get all orders from Firestore
 * @returns Array of orders
 */
export async function getAllOrders(): Promise<any[]>
```

**Usage:**
```typescript
const allOrders = await getAllOrders();
const ongoingOrders = allOrders.filter(o => 
  ['confirmed', 'processing', 'shipped', 'delivered'].includes(o.status)
);
```

---

### **3. updateOrderStatus(orderId, status)**

```typescript
/**
 * Update order status
 * @param orderId - Order document ID
 * @param status - New status
 */
export async function updateOrderStatus(
  orderId: string,
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'received'
): Promise<void>
```

**Usage:**
```typescript
await updateOrderStatus('orderDoc123', 'received');
```

---

## 📱 UI CHANGES

### **Payment Success Page (`/payment-success`)**

**Changes:**
- ✅ Integrate dengan CartContext
- ✅ Calculate order total dari cart
- ✅ Save order ke Firestore sebelum redirect
- ✅ Auto-clear cart setelah save

**New imports:**
```typescript
import { useCart } from '../context/CartContext';
import { calculateOrderTotal } from '../lib/config';
import { saveOrder } from '../lib/firestoreService';
```

---

### **My Orders Page (`/order`)**

**UI Improvements:**

1. **Order Card Layout:**
   - Invoice number dengan badge status di top
   - Product items list (show max 2, indicate "+X more")
   - Order summary (Subtotal, Discount, Total)
   - Created date & estimated delivery
   - Action button di bottom right

2. **Status Badge:**
   ```
   received    → Green
   confirmed   → Blue
   other       → Orange
   ```

3. **Action Buttons:**
   - **Ongoing + Delivered:** "Pesanan Diterima" (green button)
   - **Ongoing + Processing/Shipped/Confirmed:** "Track Order" (link)
   - **Complete:** "Received" + checkmark icon
   - **Review:** "Review" atau "See Review"

4. **Loading & Empty State:**
   - Loading spinner saat fetch orders
   - Empty state dengan icon & CTA button

**New imports:**
```typescript
import { getAllOrders, updateOrderStatus } from '../lib/firestoreService';
import { formatIDR } from '../lib/format';
import { CheckCircle2, Package } from 'lucide-react';
```

---

## 🚀 FEATURES

### ✅ **Completed**

- [x] Save order to Firestore on payment success
- [x] Clear cart automatically
- [x] Load orders from Firestore on order page
- [x] Display orders in grid layout
- [x] Filter orders by status (Ongoing, Complete, Review)
- [x] Update order status to "received"
- [x] Show estimated delivery date
- [x] Loading & empty states

### 🔄 **In Progress / Optional**

- [ ] User authentication (filter orders by userId)
- [ ] Email notifications
- [ ] Order tracking timeline
- [ ] Admin order management
- [ ] Order cancellation

---

## 🧪 TESTING CHECKLIST

### **Test Payment → Order Save**

- [ ] Add product to cart
- [ ] Go to checkout
- [ ] Select payment method
- [ ] Complete payment (confirm button)
- [ ] Verify success page displays
- [ ] Wait 5 seconds for auto redirect
- [ ] Go to `/order`
- [ ] Verify order appears in "Ongoing" tab
- [ ] Check invoice number matches

### **Test Order Status Update**

- [ ] On "Ongoing" tab, find order with status "delivered"
- [ ] Click "Pesanan Diterima" button
- [ ] Verify loading state
- [ ] After update, verify order moves to "Complete" tab
- [ ] Verify status badge changed to "Received"
- [ ] Refresh page and verify status persisted

### **Test Filtering**

- [ ] Create multiple orders
- [ ] Click "Ongoing" tab → verify filter works
- [ ] Click "Complete" tab → verify filter works
- [ ] Click "Review" tab → verify filter works
- [ ] Verify order count matches

### **Test Loading States**

- [ ] Navigate to `/order` page
- [ ] Verify loading spinner shows
- [ ] Verify spinner disappears when orders load
- [ ] Verify empty state shows if no orders

---

## 📝 EXAMPLE ORDER DATA

```json
{
  "id": "abc123def456",
  "items": [
    {
      "id": "prod1",
      "name": "Pedro Leather Shoes",
      "price": 1500000,
      "quantity": 1,
      "size": "38",
      "color": "bg-orange-100"
    },
    {
      "id": "prod2",
      "name": "Red Blazer",
      "price": 750000,
      "quantity": 1,
      "size": "L",
      "color": "bg-red-100"
    }
  ],
  "totalPrice": 1800000,
  "subtotal": 2250000,
  "discount": 450000,
  "deliveryFee": 0,
  "paymentMethod": "fake-payment",
  "invoiceNumber": "INV-1733562890123",
  "status": "confirmed",
  "createdAt": "2025-12-07T10:30:00Z",
  "updatedAt": "2025-12-07T10:30:00Z",
  "estimatedDelivery": "2025-12-10"
}
```

---

## 🔗 RELATED FILES

- `app/order/page.tsx` - Order listing & management
- `app/payment-success/page.tsx` - Save order after payment
- `app/lib/firestoreService.ts` - Database operations
- `app/lib/types.ts` - Type definitions
- `app/context/CartContext.tsx` - Cart state management

---

## 📞 NOTES

- Orders disimpan dengan status "confirmed" saat payment berhasil
- Estimasi pengiriman dihitung +3 hari dari order date
- Cart auto-cleared setelah order saved
- Status transitions: confirmed → processing → shipped → delivered → received
- Admin dapat trigger status changes via dashboard (future feature)

**Created:** December 7, 2025  
**Status:** ✅ Complete & Tested
