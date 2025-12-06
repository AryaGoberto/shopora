'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { getProductReviews } from '../../lib/firestoreService';
import { formatIDR } from '../../lib/format';

interface ReviewListProps {
  productId: string;
  productName?: string;
}

interface ReviewItem {
  id: string;
  rating: number;
  title: string;
  comment: string;
  userName?: string;
  createdAt: Date | string;
}

export default function ReviewList({ productId, productName }: ReviewListProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await getProductReviews(productId);
      const typedData = data as ReviewItem[];
      setReviews(typedData);

      if (typedData.length > 0) {
        const avg = typedData.reduce((sum, review) => sum + review.rating, 0) / typedData.length;
        setAvgRating(parseFloat(avg.toFixed(1)));
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <p className="text-gray-500">Loading reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{avgRating}</div>
            <div className="mt-2">{renderStars(Math.round(avgRating))}</div>
            <p className="text-sm text-gray-500 mt-2">
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-12">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {renderStars(review.rating)}
                  <span className="text-sm font-semibold text-gray-900">
                    {review.title}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {review.userName || 'Anonymous'} • {formatDate(review.createdAt)}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
