'use client';

import { useState, ReactNode } from 'react';
import { X, Star, Loader2 } from 'lucide-react';
import { saveReview } from '../../lib/firestoreService';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  productId: string;
  productName: string;
  onSuccess?: () => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  orderId,
  productId,
  productName,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!title.trim()) {
      setError('Judul review harus diisi');
      return;
    }
    if (!comment.trim()) {
      setError('Komentar harus diisi');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await saveReview({
        orderId,
        productId,
        productName,
        rating,
        title: title.trim(),
        comment: comment.trim(),
      });

      // Reset form
      setTitle('');
      setComment('');
      setRating(5);

      // Callback
      onSuccess?.();

      // Close modal
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err: any) {
      console.error('Error submitting review:', err);
      setError(err.message || 'Gagal mengirim review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold">Tulis Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Name */}
          <div>
            <p className="text-sm text-gray-600 font-medium">Produk</p>
            <p className="text-sm text-gray-900 truncate">{productName}</p>
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`transition-colors ${
                    star <= rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  <Star size={28} fill="currentColor" />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Judul Review *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="Misal: Bagus sekali!"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isSubmitting}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Komentar *
            </label>
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setError('');
              }}
              placeholder="Ceritakan pengalaman Anda dengan produk ini..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {!error && (
            <p className="text-xs text-gray-500">
              Review Anda akan membantu pembeli lain membuat keputusan yang tepat.
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
