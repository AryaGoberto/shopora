// app/components/SaleBanner.tsx

import React from "react";
import Image from "next/image";

interface SaleBannerProps {
  imageUrl: string;
  altText?: string;
}

const SaleBanner: React.FC<SaleBannerProps> = ({
  imageUrl,
  altText = "Promotional Sale Banner",
}) => (
  <section
    className="
      w-full
      max-w-7xl
      mx-auto
      my-6
      px-4           /* kasih padding di mobile */
      md:px-0        /* di desktop balik full */
    "
  >
    <div
      className="
        relative
        w-full
        rounded-xl
        overflow-hidden
        shadow-lg

        h-40         /* HP: agak rendah */
        sm:h-48      /* small screen */
        md:h-64      /* tablet / kecil desktop */
        lg:h-72      /* besar */
      "
    >
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover object-center"
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
      />
    </div>
  </section>
);

export default SaleBanner;
