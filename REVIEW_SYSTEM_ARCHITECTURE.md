# 🎨 Review System - Visual Guide & Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     SHOPORA REVIEW SYSTEM                │
└─────────────────────────────────────────────────────────┘

                          Frontend
        ┌────────────────────────────────────┐
        │     React Components                │
        │  ┌────────────────────────────────┐ │
        │  │  1. OrderCard                  │ │
        │  │  - Shows orders                │ │
        │  │  - "Write Review" button       │ │
        │  └────────────────────────────────┘ │
        │  ┌────────────────────────────────┐ │
        │  │  2. ReviewModal                │ │
        │  │  - Star rating (1-5)           │ │
        │  │  - Title input                 │ │
        │  │  - Comment textarea            │ │
        │  └────────────────────────────────┘ │
        │  ┌────────────────────────────────┐ │
        │  │  3. ReviewList                 │ │
        │  │  - Display all reviews         │ │
        │  │  - Rating chart                │ │
        │  │  - Average calculation         │ │
        │  └────────────────────────────────┘ │
        └────────────────────────────────────┘
                         ↓
                    Firestore Service
        ┌────────────────────────────────────┐
        │  Functions:                         │
        │  • saveReview()                     │
        │  • getProductReviews()              │
        │  • updateProductRating()            │
        │  • hasUserReviewedProduct()         │
        └────────────────────────────────────┘
                         ↓
                  Firestore Database
        ┌────────────────────────────────────┐
        │  Collections:                       │
        │                                     │
        │  reviews/                           │
        │  ├── doc1/                          │
        │  │   ├── orderId                    │
        │  │   ├── productId                  │
        │  │   ├── rating                     │
        │  │   ├── title                      │
        │  │   ├── comment                    │
        │  │   └── timestamps                 │
        │  │                                  │
        │  ├── doc2/                          │
        │  └── ...                            │
        │                                     │
        │  products/ (rating updated)         │
        │  ├── doc/                           │
        │  │   ├── name                       │
        │  │   ├── rating (auto-updated) ✨  │
        │  │   ├── reviewCount (auto) ✨     │
        │  │   └── ...                        │
        └────────────────────────────────────┘
```

## User Interaction Flow

```
START: Customer has received order
│
├─→ Open Shopora App
│   └─→ Go to "My Orders"
│       └─→ Click "Complete" tab
│
├─→ See order card
│   ├─ Invoice number
│   ├─ Product images
│   ├─ Price breakdown
│   └─ ✅ "Write Review" BUTTON
│
├─→ Click "Write Review"
│   │
│   └─→ ReviewModal appears
│       ├─ Header: "Tulis Review"
│       ├─ Product name (auto-filled)
│       │
│       ├─ Rating section
│       │  └─ ⭐⭐⭐⭐⭐ (click to select 1-5)
│       │
│       ├─ Title field
│       │  └─ "Judul Review *"
│       │     (e.g., "Bagus sekali!")
│       │
│       ├─ Comment field
│       │  └─ "Komentar *"
│       │     (e.g., "Kualitas bagus, cepat tiba...")
│       │
│       ├─ Validation
│       │  ├─ ✅ Rating: 1-5
│       │  ├─ ✅ Title: required & trimmed
│       │  ├─ ✅ Comment: required & trimmed
│       │  └─ ✅ Submit only if all valid
│       │
│       ├─ Actions
│       │  ├─ [Batal] - Close modal
│       │  └─ [Kirim Review] - Submit
│
├─→ Click "Kirim Review"
│   │
│   ├─ Button shows "Mengirim..." + spinner
│   │
│   ├─ saveReview() function
│   │  ├─ Validate fields
│   │  ├─ Add timestamps
│   │  ├─ Save to Firestore /reviews collection
│   │  └─ Return doc ID
│   │
│   ├─ updateProductRating() function
│   │  ├─ Query all reviews for this product
│   │  ├─ Calculate average rating
│   │  ├─ Update /products doc with new rating
│   │  └─ Update reviewCount
│   │
│   └─ Modal closes
│       └─ ✅ Review saved!

RESULT: Customer can now see their review in:
├─ Order Complete tab (under product)
└─ Product detail page (in Reviews section)
```

## Component Interaction Map

```
┌─────────────────────────────────────────────────────────┐
│                        App Routes                         │
└─────────────────────────────────────────────────────────┘

/order (My Orders Page)
│
└─→ OrderCard Component (per order)
    │
    ├─ Complete Tab
    │  │
    │  └─ Review Button
    │     │
    │     ├─ Click event
    │     │  ├─ Set product ID
    │     │  ├─ Set product name
    │     │  └─ Show ReviewModal
    │     │
    │     └─ ReviewModal
    │        │
    │        ├─ Props:
    │        │  ├─ isOpen: boolean
    │        │  ├─ onClose: () => void
    │        │  ├─ orderId: string
    │        │  ├─ productId: string
    │        │  ├─ productName: string
    │        │  └─ onSuccess: () => void
    │        │
    │        ├─ State:
    │        │  ├─ rating: 1-5
    │        │  ├─ title: string
    │        │  ├─ comment: string
    │        │  ├─ isSubmitting: boolean
    │        │  └─ error: string
    │        │
    │        └─ On Submit
    │           ├─ saveReview() to Firestore
    │           ├─ updateProductRating()
    │           └─ Call onSuccess()
    │
    └─ Review Tab
       └─ Shows all reviewed products


/detail/[id] (Product Detail Page)
│
└─→ ReviewList Component
    │
    ├─ useEffect (load on mount)
    │  └─ getProductReviews(productId)
    │
    ├─ State:
    │  ├─ reviews: Review[]
    │  ├─ loading: boolean
    │  └─ avgRating: number
    │
    ├─ Rating Summary Section
    │  ├─ Average rating (e.g., 4.5)
    │  ├─ Star display
    │  ├─ Total review count
    │  └─ Rating distribution (5→1 stars)
    │
    └─ Review Cards (map over reviews)
       ├─ Star rating
       ├─ Review title
       ├─ Reviewer name
       ├─ Date (formatted)
       └─ Comment text
```

## Data Flow Diagram

```
WRITE FLOW:
───────────

Customer fills form
    ↓
{
  orderId: "order_123",
  productId: "prod_abc",
  productName: "T-Shirt",
  rating: 5,
  title: "Excellent!",
  comment: "Very good...",
  userName: "John Doe"
}
    ↓
saveReview(data)
    ├─ Add timestamps
    ├─ Save to /reviews/{docId}
    └─ Return docId
    ↓
updateProductRating("prod_abc")
    ├─ Query: /reviews where productId == "prod_abc"
    ├─ Calculate: avg = sum(ratings) / count
    ├─ Update: /products/prod_abc
    │  ├─ rating: 4.7
    │  ├─ reviewCount: 12
    │  └─ updatedAt: now()
    └─ Done ✅

READ FLOW:
──────────

getProductReviews("prod_abc")
    ↓
Query: /reviews where productId == "prod_abc"
    ↓
Return array of reviews
[
  {
    id: "review_1",
    orderId: "order_123",
    productId: "prod_abc",
    rating: 5,
    title: "Excellent!",
    comment: "Very good...",
    userName: "John Doe",
    createdAt: Date
  },
  { ... },
  { ... }
]
    ↓
ReviewList component
    ├─ setReviews(data)
    ├─ Calculate avgRating
    ├─ Calculate distribution
    └─ Render cards
```

## State Management

```
OrderCard Component:
├─ showReviewModal: boolean
├─ reviewingProductId: string | null
├─ reviewingProductName: string
└─ handleReviewClick(productId, productName)
   └─ Shows ReviewModal

ReviewModal Component:
├─ rating: 1-5
├─ title: string
├─ comment: string
├─ isSubmitting: boolean
└─ error: string

ReviewList Component:
├─ reviews: Review[]
├─ loading: boolean
├─ avgRating: number
└─ loadReviews() → getProductReviews()
```

## Firestore Document Example

```javascript
// Collection: reviews
// Document: auto_generated_id

{
  orderId: "INV-1700123456789",
  productId: "prod_black_tshirt_001",
  productName: "Black T-Shirt Premium",
  rating: 5,
  title: "Bagus banget!",
  comment: "Kualitas baik, fast shipping, packing rapi. Recommended!",
  userName: "Rizqi Pratama",
  userEmail: "rizqi@email.com",
  images: [],
  createdAt: Timestamp(Dec 1, 2024, 10:30:45 AM),
  updatedAt: Timestamp(Dec 1, 2024, 10:30:45 AM)
}
```

## Component Props & Types

```typescript
// OrderCard Props
interface OrderCardProps {
  order: Order;
  activeTab: string;
  isUpdatingStatus: string | null;
  onOrderReceived: (orderId: string) => void;
  onReviewSuccess?: () => void; // NEW
}

// ReviewModal Props
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  productId: string;
  productName: string;
  onSuccess?: () => void;
}

// ReviewList Props
interface ReviewListProps {
  productId: string;
  productName?: string;
}

// Review Type
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

## Error Handling Flow

```
User submits review
    ↓
Validation
├─ Title empty? → Show error: "Judul review harus diisi"
├─ Comment empty? → Show error: "Komentar harus diisi"
└─ All valid? → Proceed

Save to Firestore
├─ Network error? → Show error message
├─ Permission denied? → Show error message
└─ Success? → Call onSuccess() → Close modal

Database error
└─ Log to console
└─ Show generic error to user
```

## Performance Optimization

- ✅ Reviews loaded once on mount (no polling)
- ✅ Review queries indexed by productId
- ✅ Lazy loading ReviewList (only when visible)
- ✅ Rating calculation happens server-side (Firestore)
- ✅ Modal only renders when opened
- ✅ No unnecessary re-renders (proper dependencies)

---

**Visual Guide Complete** - Architecture fully documented! 🎉
