# 🔧 TROUBLESHOOTING - Order System Not Showing

## ❌ Problem
Orders tidak tampil di My Orders page meskipun pembayaran sudah selesai.

## ✅ Solutions

### 1. **Check Console Logs**

Buka DevTools (F12) → Console tab, cari:
- `📝 Saving order to Firestore...` - Order sedang disave
- `✅ Order saved successfully with ID:` - Order berhasil disave
- `📥 Fetching all orders from Firestore...` - Page sedang fetch orders
- `✅ Orders loaded and sorted:` - Orders berhasil di-load

### 2. **Debug Endpoints (API Routes)**

#### Check if data exists in Firestore
```
GET http://localhost:3000/api/debug/orders
```

Response akan menunjukkan:
```json
{
  "success": true,
  "count": 2,
  "orders": [...]
}
```

#### Test saving order
```
POST http://localhost:3000/api/debug/save-order
```

Response akan menunjukkan:
```json
{
  "success": true,
  "message": "Test order saved successfully",
  "docId": "abc123def456"
}
```

### 3. **Firestore Collection Check**

1. Go to Firebase Console → Firestore Database
2. Check if "orders" collection exists
3. Verify documents are being created
4. Check document structure

**Expected structure:**
```
orders/
├── doc1/
│   ├── items: [...]
│   ├── totalPrice: 1200000
│   ├── status: "confirmed"
│   ├── createdAt: Timestamp
│   └── ...
```

### 4. **Manual Testing Steps**

**Step 1: Test Save Function**
```bash
curl -X POST http://localhost:3000/api/debug/save-order
```

**Step 2: Check if saved**
```bash
curl http://localhost:3000/api/debug/orders
```

**Step 3: Refresh My Orders page**
- Navigate to `/order`
- Check console for logs
- Should see orders in Ongoing tab

### 5. **Common Issues & Fixes**

#### ❌ Issue: "No orders found in Firestore"
**Cause:** Order tidak tersimpan saat payment success

**Fix:**
1. Check console logs saat payment-success page
2. Ensure cart has items
3. Check Firestore rules (must allow write to "orders")
4. Verify Firebase connection

#### ❌ Issue: Console error "Permission denied"
**Cause:** Firestore security rules terlalu ketat

**Fix:**
Go to Firebase Console → Firestore → Rules, set to:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for all collections during development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

#### ❌ Issue: "data.createdAt?.toDate is not a function"
**Fix:** Already fixed in latest version. If still error, ensure:
1. Reload page (hard refresh: Ctrl+Shift+R)
2. Clear browser cache
3. Restart dev server

### 6. **Step-by-Step Debug Process**

```
1. Add product to cart
   ↓
2. Go to checkout
   ↓
3. Select payment method
   ↓
4. Click "Confirm Pembayaran"
   ↓
5. [CHECK CONSOLE]
   - Should see: "📝 Saving order to Firestore..."
   - Should see: "✅ Order saved successfully with ID: abc123"
   ↓
6. Go to /order (or wait for auto-redirect)
   ↓
7. [CHECK CONSOLE]
   - Should see: "📥 Fetching all orders from Firestore..."
   - Should see: "✅ Orders loaded and sorted: 1 orders"
   ↓
8. Orders should appear in "Ongoing" tab
```

### 7. **Browser DevTools Debugging**

**Console Tab:**
```
// Check if Firestore is connected
console.log(db); // Should show Firestore instance

// Manual fetch test
async function test() {
  const result = await fetch('/api/debug/orders');
  console.log(await result.json());
}
test();
```

**Network Tab:**
- Check API calls to `/api/debug/orders`
- Should return 200 status with data

**Application Tab:**
- Check LocalStorage for cart data
- Should have cart items before checkout

### 8. **If Still Not Working**

1. **Clear Everything:**
   - Clear browser cache (Ctrl+Shift+Delete)
   - Clear LocalStorage (DevTools → Application → LocalStorage)
   - Restart dev server (Ctrl+C, npm run dev)

2. **Check Firebase Firestore:**
   - Go to Firebase Console
   - Firestore Database → Collections
   - Manually create test document in "orders" collection
   - Refresh page → should see test order

3. **Check Network:**
   - Open DevTools → Network tab
   - Filter for "XHR" requests
   - Check `/api/debug/orders` call
   - Should show orders data in response

4. **Verify Payment Flow:**
   - Before clicking confirm payment, check cart is populated
   - After clicking confirm payment, wait for redirect
   - Check that cart is cleared after payment
   - Check Firestore console for new document

### 9. **Firestore Rules Template (Allow All - Dev Only)**

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all read/write during development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 10. **Quick Checklist**

- [ ] Console logs show "Order saved successfully"
- [ ] Firebase Firestore has "orders" collection
- [ ] Test document can be saved via `/api/debug/save-order`
- [ ] `/api/debug/orders` returns orders
- [ ] Orders appear in My Orders page
- [ ] Firestore rules allow read/write
- [ ] Cart items are cleared after payment
- [ ] Status shows "confirmed"

---

## 📞 Quick Reference

| Issue | Check |
|-------|-------|
| Orders not appearing | Console logs + API endpoint + Firestore console |
| Permission denied | Firestore security rules |
| createdAt error | Reload page, clear cache |
| Cart not clearing | Check clearCart() is called |
| API returning 500 | Check Firebase connection + rules |
| Duplicate orders | Check if save function is idempotent |

---

**If issue persists after all checks, provide:**
1. Full console error message
2. Response from `/api/debug/orders`
3. Screenshot from Firestore console
4. Browser version & OS
