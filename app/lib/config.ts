// app/lib/config.ts
// Konfigurasi untuk delivery fee dan promo

export const DELIVERY_CONFIG = {
  // Biaya ongkir standar (dalam Rupiah)
  standardFee: 25000,

  // Minimum pembelian untuk gratis ongkir (dalam Rupiah)
  freeShippingThreshold: 500000,

  // Discount default (dalam persen, 0-1)
  defaultDiscount: 0.2, // 20%
};

/**
 * Hitung delivery fee berdasarkan subtotal
 * @param subtotal - Total harga sebelum diskon
 * @returns Biaya pengiriman
 */
export function calculateDeliveryFee(subtotal: number): number {
  if (subtotal === 0) return 0;
  if (subtotal >= DELIVERY_CONFIG.freeShippingThreshold) return 0;
  return DELIVERY_CONFIG.standardFee;
}

/**
 * Hitung discount berdasarkan subtotal
 * @param subtotal - Total harga sebelum diskon
 * @returns Jumlah diskon
 */
export function calculateDiscount(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal * DELIVERY_CONFIG.defaultDiscount;
}

/**
 * Hitung total akhir
 * @param subtotal - Total harga barang
 * @returns Object dengan breakdown biaya
 */
export function calculateOrderTotal(subtotal: number) {
  const discount = calculateDiscount(subtotal);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal - discount + deliveryFee;

  return {
    subtotal,
    discount,
    deliveryFee,
    total,
    isFreeShipping: subtotal >= DELIVERY_CONFIG.freeShippingThreshold,
  };
}
