// app/components/CustomerReviews.tsx
"use client";

import React, { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import c from "next/font/local";

// Data review
const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shopora. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 3,
    text: "The customer service is exceptional! I had a question about sizing and they responded immediately. The products are great quality and shipping was fast.",
  },
  {
    id: 3,
    name: "Emma J.",
    rating: 4,
    text: "Love the variety of styles available. The prices are reasonable and the quality is consistent. Will definitely be ordering again.",
  },
  {
    id: 4,
    name: "Michael T.",
    rating: 5,
    text: "Best online shopping experience I've had. The website is easy to navigate and the checkout process is smooth. Highly recommended!",
  },
  {
    id: 5,
    name: "Jessica L.",
    rating: 5,
    text: "Amazing collection! I found exactly what I was looking for. The fit is perfect and the fabric quality is excellent. Thank you Shopora!",
  },
];

const CustomerReviews: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Sesuaikan nilai ini untuk kontrol jarak scroll
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className={`text-4xl font-bold $`}>OUR HAPPY CUSTOMERS</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="shrink-0 w-96 border-2 border-gray-200 rounded-2xl p-6"
          >
            <div className="flex gap-1 mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-bold">{review.name}</h4>
              <span className="text-green-500">✓</span>
            </div>
            <p className="text-gray-600 text-sm">&quot;{review.text}&quot;</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
