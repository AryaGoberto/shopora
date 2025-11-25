import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Kemeja Linen Premium",
    price: 299000,
      image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca2a?q=80&w=1600&auto=format&fit=crop",
    description: "Kemeja linen premium, nyaman dipakai sehari-hari dan cocok untuk acara formal maupun kasual.",
    category: "Fashion",
    adminId: "admin_mock",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p2",
    name: "Sneaker Putih Minimalis",
    price: 549000,
      image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1600&auto=format&fit=crop",
    description: "Sneaker putih dengan desain minimalis, ringan dan cocok untuk berbagai aktivitas.",
    category: "Fashion",
    adminId: "admin_mock",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p3",
    name: "Headphone Wireless",
    price: 799000,
      image:
      "https://images.unsplash.com/photo-1518441982123-111d8b6f13fb?q=80&w=1600&auto=format&fit=crop",
    description: "Headphone wireless dengan kualitas suara jernih dan noise cancellation dasar.",
    category: "Elektronik",
    adminId: "admin_mock",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p4",
    name: "Tumbler Stainless 1L",
    price: 159000,
      image:
      "https://images.unsplash.com/photo-1600172454284-934feca24e56?q=80&w=1600&auto=format&fit=crop",
    description: "Tumbler stainless 1L, tahan panas/dingin, cocok untuk dibawa bepergian.",
    category: "Rumah Tangga",
    adminId: "admin_mock",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
