import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BrochImg from "@/public/Images/GroomNackless.jpeg";
import ButtonImg from "@/public/Images/Brouch8.jpeg";
import MenNickles from "@/public/Images/Nackless1.jpeg";
import Cufflinks2 from "@/public/Images/Brouch4.jpeg";
import NAckless from "@/public/Images/Nackless3.jpeg";

import ButtonImg2 from "@/public/Images/ButtonImg3.jpg";
import ButtonImg3 from "@/public/Images/B67WK4225-with-qr.jpg";
import CuflineImg2 from "@/public/Images/C0PBWF4012-with-qr.jpg";
import BrouchImg2 from "@/public/Images/018GWBK540-with-qr.jpg";
import BrouchImg3 from "@/public/Images/00RGOK543-with-qr.jpg";

const images = [
  BrouchImg2,
  CuflineImg2,
  BrochImg,
  ButtonImg,
  MenNickles,
  ButtonImg3,
  ButtonImg2,
  Cufflinks2,
  NAckless,
  BrouchImg3,
];

export default function ImageCarousel() {
  return (
    <section className="w-full px-2 sm:px-6 lg:px-10 my-10 bg-[#FAFAFA]">
      <section className="w-full py-16">
        {/* ===== HEADER ===== */}
        <div className="mb-10 flex items-end justify-between animate-fade-up">
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Collections
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Hand-picked styles curated just for you
            </p>
          </div>
        </div>

        {/* ===== MASONRY GRID ===== */}
        <div className="columns-2 sm:columns-3 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 120}ms` }}
              className="
                relative mb-4 break-inside-avoid rounded-2xl overflow-hidden
                shadow-md bg-gray-100 group
                animate-image-reveal
              "
            >
              <Image
                src={src}
                alt={`Collection image ${index + 1}`}
                width={600}
                height={800}
                placeholder="blur"
                className="
                  w-full h-auto object-cover
                  transition-transform duration-500 ease-out
                  group-hover:scale-[1.05]
                "
              />

              {/* SOFT OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-50 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* ===== VIEW MORE BUTTON ===== */}
        <div className="flex justify-center mt-14 animate-fade-up delay-700">
          <Link
            href="/collection"
            className="group inline-flex items-center gap-3 px-8 py-3 text-sm sm:text-base font-medium transition"
          >
            <span>View More</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-2 transition-transform duration-300"
            />
          </Link>
        </div>
      </section>
    </section>
  );
}
