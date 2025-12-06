'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatIDR } from '../../lib/format';
import ReviewModal from './ReviewModal';

type Order = {
  id: string;
  items: any[];
  totalPrice: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  invoiceNumber: string;
  status: string;
  createdAt: any;
  estimatedDelivery?: string;
};

interface OrderCardProps {
  order: Order;
  activeTab: string;
  isUpdatingStatus: string | null;
  onOrderReceived: (orderId: string) => void;
  onReviewSuccess?: () => void;
}

export default function OrderCard({ 
  order, 
  activeTab, 
  isUpdatingStatus, 
  onOrderReceived,
  onReviewSuccess 
}: OrderCardProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewingProductId, setReviewingProductId] = useState<string | null>(null);
  const [reviewingProductName, setReviewingProductName] = useState<string>('');

  const handleReviewClick = (productId: string, productName: string) => {
    setReviewingProductId(productId);
    setReviewingProductName(productName);
    setShowReviewModal(true);
  };

  const handleReviewSuccess = () => {
    onReviewSuccess?.();
    setTimeout(() => {
      setShowReviewModal(false);
    }, 500);
  };

  const renderAction = () => {
    // Ongoing tab
    if (activeTab === 'Ongoing') {
      return (
        <button
          onClick={() => onOrderReceived(order.id)}
          disabled={isUpdatingStatus === order.id}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-700 transition disabled:opacity-50"
        >
          {isUpdatingStatus === order.id ? 'Updating...' : 'Pesanan Diterima'}
        </button>
      );
    }

    // Complete tab
    if (activeTab === 'Complete') {
      return (
        <div className="flex flex-col gap-2">
          <span className="text-emerald-500 font-bold text-xs">
            ✓ Received
          </span>
          <button
            onClick={() => {
              if (order.items.length > 0) {
                const firstItem = order.items[0];
                handleReviewClick(firstItem.id, firstItem.name);
              }
            }}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition"
          >
            Write Review
          </button>
        </div>
      );
    }

    // Review tab
    if (activeTab === 'Review') {
      return (
        <span className="text-gray-500 text-xs">Reviewed ✓</span>
      );
    }

    return null;
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-500">Invoice</p>
            <p className="font-mono font-bold text-gray-900 text-sm">{order.invoiceNumber}</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            order.status === 'received' 
              ? 'bg-green-100 text-green-700'
              : order.status === 'confirmed'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3 mb-4">
        {order.items.slice(0, 2).map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="w-16 h-16 rounded-lg shrink-0 bg-gray-200 overflow-hidden flex items-center justify-center">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full ${item.color || 'bg-gray-300'}`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm line-clamp-2">
                {item.name}
              </h4>
              <p className="text-xs text-gray-500">Size: {item.size || '-'}</p>
              <p className="font-bold text-gray-900 text-sm mt-1">
                {formatIDR(item.price)} x {item.quantity}
              </p>
            </div>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-xs text-gray-500 text-center">
            +{order.items.length - 2} more items
          </p>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900">{formatIDR(order.subtotal || 0)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Discount</span>
          <span className="font-bold text-red-500">-{formatIDR(order.discount || 0)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between text-sm font-bold">
          <span>Total</span>
          <span className="text-blue-600">
            {formatIDR(
              order.totalPrice && order.totalPrice > 0
                ? order.totalPrice
                : (order.subtotal || 0) - (order.discount || 0) + (order.deliveryFee || 0)
            )}
          </span>
        </div>
      </div>

      {/* Date & Action */}
      <div className="flex justify-between items-end">
        <div className="text-xs text-gray-500">
          <p>{new Date(order.createdAt).toLocaleDateString('id-ID')}</p>
          {order.estimatedDelivery && (
            <p className="text-xs text-gray-400">Est. {order.estimatedDelivery}</p>
          )}
        </div>
        <div className="w-fit">
          {renderAction()}
        </div>
      </div>

      {/* Review Modal */}
      {reviewingProductId && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          orderId={order.id}
          productId={reviewingProductId}
          productName={reviewingProductName}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
}
