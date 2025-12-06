// app/lib/paymentMethods.ts

export type PaymentMethodType = 'bca' | 'mandiri' | 'bri' | 'gopay' | 'qris' | 'shopeepay';

export interface PaymentMethod {
  id: PaymentMethodType;
  name: string;
  displayName: string;
  icon: string;
  description: string;
  type: 'bank' | 'ewallet' | 'qr';
}

export const PAYMENT_METHODS: Record<PaymentMethodType, PaymentMethod> = {
  bca: {
    id: 'bca',
    name: 'BCA Transfer',
    displayName: 'BCA / Mandiri / BRI',
    icon: '🏦',
    description: 'Transfer langsung ke rekening bank',
    type: 'bank',
  },
  mandiri: {
    id: 'mandiri',
    name: 'Mandiri Transfer',
    displayName: 'Mandiri Bank',
    icon: '🏦',
    description: 'Transfer via Mandiri',
    type: 'bank',
  },
  bri: {
    id: 'bri',
    name: 'BRI Transfer',
    displayName: 'BRI Bank',
    icon: '🏦',
    description: 'Transfer via BRI',
    type: 'bank',
  },
  gopay: {
    id: 'gopay',
    name: 'GoPay',
    displayName: 'GoPay',
    icon: '📱',
    description: 'Pembayaran melalui GoPay',
    type: 'ewallet',
  },
  qris: {
    id: 'qris',
    name: 'QRIS',
    displayName: 'QRIS',
    icon: '📲',
    description: 'Pembayaran via QR Code',
    type: 'qr',
  },
  shopeepay: {
    id: 'shopeepay',
    name: 'ShopeePay',
    displayName: 'ShopeePay',
    icon: '🛍️',
    description: 'Pembayaran melalui ShopeePay',
    type: 'ewallet',
  },
};

// Virtual Account Numbers
export const VA_NUMBERS = {
  bca: '1234567890',
  mandiri: '1234567890',
  bri: '1234567890',
};

// Bank Account Details
export const BANK_ACCOUNTS = {
  bca: {
    bank: 'PT. Bank Central Asia Tbk',
    accountName: 'Shopora Indonesia',
    accountNumber: '1234567890',
  },
  mandiri: {
    bank: 'PT. Bank Mandiri Tbk',
    accountName: 'Shopora Indonesia',
    accountNumber: '1234567890',
  },
  bri: {
    bank: 'PT. Bank Rakyat Indonesia Tbk',
    accountName: 'Shopora Indonesia',
    accountNumber: '1234567890',
  },
};
