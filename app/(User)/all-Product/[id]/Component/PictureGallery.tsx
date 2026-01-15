"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageShowUtil } from "@/utils/ImageShowUtil";
import { Play } from "lucide-react";

interface ProductGalleryProps {
  images?: (string | null | undefined)[];
  video?: string | null;
  name: string;
}

type MediaItem =
  | { type: "image"; url: string }
  | { type: "video"; url: string };

const FALLBACK_IMAGE = "/placeholder.png"; // put in /public

export default function ProductGallery({
  images = [],
  video,
  name,
}: ProductGalleryProps) {
  /* ---------------- NORMALIZE MEDIA ---------------- */

  const media: MediaItem[] = useMemo(() => {
    const imgItems =
      images
        ?.filter((i): i is string => Boolean(i && i.trim()))
        .map((url) => ({ type: "image" as const, url })) ?? [];

    const videoItem =
      video && video.trim() ? [{ type: "video" as const, url: video }] : [];

    return [...videoItem, ...imgItems];
  }, [images, video]);

  /* ---------------- STATE ---------------- */

  const [activeIndex, setActiveIndex] = useState(0);

  /* ---------------- EMPTY STATE ---------------- */

  if (media.length === 0) {
    return (
      <div className="w-full h-[420px] flex items-center justify-center bg-gray-100 rounded-xl">
        <span className="text-gray-400 text-sm">No media available</span>
      </div>
    );
  }

  const active = media[activeIndex];

  /* ---------------- RENDER ---------------- */

  return (
    <div className="flex flex-col gap-4">
      {/* BIG PREVIEW */}
      <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] rounded-xl overflow-hidden bg-gray-100 shadow-lg">
        <AnimatePresence mode="wait">
          {active.type === "video" ? (
            <motion.video
              key={active.url}
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${active.url}`}
              controls
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ) : (
            <motion.div
              key={active.url}
              className="absolute inset-0"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={ImageShowUtil(active.url) || FALLBACK_IMAGE}
                alt={name}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* THUMBNAILS (ALWAYS SHOWN) */}
      <div
        className={`flex gap-3 overflow-x-auto py-2 ${
          media.length == 1
            ? "justify-center"
            : media.length > 1
            ? "justify-evenly"
            : "justify-between"
        } `}
      >
        {media.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative cursor-pointer shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition
              ${idx === activeIndex ? "border-black" : "border-gray-300"}`}
          >
            {item.type === "video" ? (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <Play className="w-6 h-6 text-white absolute z-10" />
                <video
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.url}`}
                  muted
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            ) : (
              <Image
                src={ImageShowUtil(item.url) || FALLBACK_IMAGE}
                alt="thumbnail"
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
