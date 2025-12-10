"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN IMAGE */}
      <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] rounded-xl overflow-hidden shadow-lg">
        <Image
          src={images[mainImageIndex]}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105 rounded-xl"
        />
      </div>

      {/* 3 SMALL IMAGES */}
      <div className="flex items-center justify-between gap-3 mt-2">
        {images.slice(0, 3).map((img, idx) => (
          <div
            key={idx}
            onClick={() => setMainImageIndex(idx)}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 
            ${mainImageIndex === idx ? "border-black" : "border-gray-300"}
            transition-all duration-300 hover:scale-105`}
          >
            <Image
              src={img}
              width={110}
              height={110}
              alt={`thumb-${idx}`}
              className="object-cover w-24 h-24 sm:w-28 sm:h-28"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
