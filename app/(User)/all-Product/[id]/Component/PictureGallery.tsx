"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  video?: string; // optional video URL
  name: string;
}

export default function ProductGallery({ images, video, name }: ProductGalleryProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(!!video);

  // Create thumbnails array with media type
  const thumbnails: { type: "video" | "image"; url: string }[] = [
    ...(video ? [{ type: "video", url: video }] : []),
    ...images.map((img) => ({ type: "image", url: img })),
  ];

  const handleClick = (idx: number) => {
    const media = thumbnails[idx];
    if (media.type === "video") {
      setShowVideo(true);
    } else {
      setShowVideo(false);
      // Calculate image index
      const imgIndex = video ? idx - 1 : idx;
      setMainIndex(imgIndex);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN MEDIA */}
      <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          {showVideo && video ? (
            <motion.video
              key="video"
              src={video.startsWith("/") ? `${process.env.NEXT_PUBLIC_IMG_URL}${video}` : `${process.env.NEXT_PUBLIC_IMG_URL}${video}`} // local or API
              controls
              autoPlay={false}
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          ) : (
            <motion.div
              key={mainIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[mainIndex]}
                alt={name}
                fill
                className="object-cover rounded-xl"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* THUMBNAILS */}
      <div className={`flex items-center ${thumbnails.length > 2 ? "justify-between" : "justify-evenly"} gap-3 mt-2`}>
        {thumbnails.map((media, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2
              ${media.type === "video"
                ? showVideo
                  ? "border-gray-500"
                  : "border-gray-300"
                : mainIndex === (video ? idx - 1 : idx)
                ? "border-gray-500"
                : "border-gray-300"
              } transition-all duration-300 hover:scale-105`}
          >
            {media.type === "video" ? (
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-black text-white font-bold text-xs">
                VIDEO
              </div>
            ) : (
              <Image
                src={media.url}
                width={110}
                height={110}
                alt={`thumb-${idx}`}
                className="object-cover w-24 h-24 sm:w-28 sm:h-28"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
