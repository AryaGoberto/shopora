import React from "react";

interface TopBrandBannerProps {
  title?: string;
  heightClass?: string;
  bgColorClass?: string;
}

const TopBrandBanner: React.FC<TopBrandBannerProps> = ({
  title = "Filter atau Promo Merek Unggulan",
  heightClass = "h-48",
  bgColorClass = "bg-gray-100",
}) => (
  <div
    className={`mb-8 p-6 ${bgColorClass} rounded-lg ${heightClass} flex items-center justify-center`}
  >
    <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
  </div>
);

export default TopBrandBanner;
