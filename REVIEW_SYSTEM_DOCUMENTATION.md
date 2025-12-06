# 📝 Review System Documentation

## Overview
Implementasi fitur review/ulasan customer yang terintegrasi dengan system order. Customer dapat menulis review untuk produk yang telah diterima, dan review akan ditampilkan di halaman detail produk.

## Architecture

### 1. Type Definitions (`app/lib/types.ts`)
```typescript
interface Review {
  id?: string;
  orderId: string;
  productId: string;
  productName: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  images?: string[];
  userName?: string;
  userEmail?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}
```

### 2. Firestore Functions (`app/lib/firestoreService.ts`)

#### `saveReview(review)`
- Simpan review baru ke Firestore collection `reviews`
- Auto-update product rating berdasarkan semua reviews
- Return review ID

#### `getProductReviews(productId)`
- Ambil semua reviews untuk product tertentu
- Handle date conversion (Firestore Timestamp → JS Date)
- Return array of reviews

#### `updateProductRating(productId)`
- Hitung rata-rata rating dari semua reviews
- Update `products` document dengan rating & reviewCount baru
- Automatic trigger saat review baru disimpan

#### `hasUserReviewedProduct(orderId, productId)`
- Check apakah user sudah review product dari order tertentu
- Return boolean (untuk validasi duplicate review)

### 3. Components

#### `ReviewModal.tsx`
Modal form untuk submit review:
- **Props:**
  - `isOpen: boolean` - Kontrol modal visibility
  - `onClose: () => void` - Close handler
  - `orderId: string` - Link ke order mana review ini
  - `productId: string` - Product ID yang di-review
  - `productName: string` - Tampilan nama produk
  - `onSuccess?: () => void` - Callback after successful submit

- **Features:**
  - Star rating picker (1-5)
  - Title input (required)
  - Comment textarea (required)
  - Validation before submit
  - Loading state during submission
  - Error handling

**Usage:**
```tsx
const [showReviewModal, setShowReviewModal] = useState(false);

<ReviewModal
  isOpen={showReviewModal}
  onClose={() => setShowReviewModal(false)}
  orderId={order.id}
  productId={product.id}
  productName={product.name}
  onSuccess={() => {
    // Reload reviews
    loadReviews();
  }}
/>
```

#### `ReviewList.tsx`
Display reviews untuk product (tampil di detail page):
- **Props:**
  - `productId: string` - Load reviews untuk product ini
  - `productName?: string` - Optional display

- **Features:**
  - Rating summary dengan average
  - Rating distribution chart
  - Individual review cards
  - Star rating visualization
  - Reviewer name & date
  - Loading state

**Usage:**
```tsx
import ReviewList from '@/components/product/ReviewList';

<ReviewList 
  productId={productId} 
  productName={productName} 
/>
```

#### `OrderCard.tsx` (Updated)
Order card sekarang include "Write Review" button:
- **Ongoing Tab:** "Pesanan Diterima" button (order received)
- **Complete Tab:** 
  - "✓ Received" label
  - "Write Review" button (baru)
  - Click button → ReviewModal opens
- **Review Tab:** "Reviewed ✓" label

**Props Update:**
```tsx
interface OrderCardProps {
  order: Order;
  activeTab: string;
  isUpdatingStatus: string | null;
  onOrderReceived: (orderId: string) => void;
  onReviewSuccess?: () => void; // New callback
}
```

### 4. Product Detail Page Integration
File: `app/detail/[id]/page.tsx`

Tambahan section di bottom:
```tsx
import ReviewList from "@/components/product/ReviewList";

// ... existing code ...

{/* Reviews Section */}
<div className="max-w-7xl mx-auto px-4 py-12">
  <div className="border-t pt-12">
    <h2 className="text-3xl font-black text-gray-900 mb-8">
      Customer Reviews
    </h2>
    <ReviewList 
      productId={params.id as string} 
      productName={product.name} 
    />
  </div>
</div>
```

## Firestore Schema

```
reviews/ (collection)
├── doc1/
│   ├── orderId: "order_123"
│   ├── productId: "product_abc"
│   ├── productName: "T-Shirt Black"
│   ├── rating: 5
│   ├── title: "Excellent quality"
│   ├── comment: "Very satisfied with this purchase..."
│   ├── userName: "customer_name"
│   ├── userEmail: "customer@email.com"
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp
└── doc2/
    └── ...
```

**Collection Rules (Security):**
```javascript
// Allow anyone to read reviews
allow read: if request.auth != null;

// Allow authenticated users to create reviews
allow create: if request.auth != null 
              && request.resource.data.createdAt == request.time
              && request.resource.data.rating >= 1 
              && request.resource.data.rating <= 5;

// Allow users to update own reviews (optional)
allow update: if request.auth != null 
              && request.auth.uid == resource.data.userId;
```

## User Flow

```
1. Customer mendapat order (status: delivered/received)
   ↓
2. Di "Complete" tab → Lihat "Write Review" button
   ↓
3. Click "Write Review" → ReviewModal muncul
   ↓
4. Isi rating, title, comment → Submit
   ↓
5. Review disimpan ke Firestore collection `reviews`
   ↓
6. Product rating auto-update (rata-rata semua reviews)
   ↓
7. Review muncul di Product Detail page "Customer Reviews" section
   ↓
8. Review juga tetap visible di "Complete" tab (proof of purchase)
```

## Key Features

✅ **Review Persistence:** Reviews disimpan ke Firestore, tidak hilang  
✅ **Rating Calculation:** Average rating auto-compute dari semua reviews  
✅ **Review Validation:** Require title + comment, rating 1-5  
✅ **Date Handling:** Support multiple date formats (Timestamp, Date, string)  
✅ **User Context:** Store reviewer name untuk public display  
✅ **Product Page Integration:** Reviews visible di detail page  
✅ **Order Integration:** Link review ke specific order/purchase  

## API Endpoints Used

None - Review system adalah fully client-side dengan Firestore operations.

## Testing Checklist

- [ ] Write review dari order Complete tab
- [ ] Modal open dengan correct product name
- [ ] Star rating picker works (1-5)
- [ ] Title validation (required)
- [ ] Comment validation (required)
- [ ] Submit button loading state
- [ ] Review saved to Firestore
- [ ] Product rating updated
- [ ] Review visible in product detail page
- [ ] Rating summary shows correct average
- [ ] Rating distribution chart updates
- [ ] Multiple reviews display correctly
- [ ] Modal close after successful submit

## Future Enhancements

- [ ] Review images/photos support
- [ ] Review helpfulness voting (👍👎)
- [ ] Admin moderation for reviews
- [ ] Review filtering (by rating, newest, helpful)
- [ ] Seller response to reviews
- [ ] Review verification badge (verified purchase)
- [ ] Review pagination/infinite scroll
- [ ] Email notifications for new reviews
