"use client";

import Link from "next/link";
import { WhatsAppNumber } from "@/app/page";
import Image from "next/image";

const MESSAGE = "Hello, I am interested in your products";

export default function FloatingWhatsApp() {
  return (
    <Link
      href={`https://wa.me/${WhatsAppNumber}?text=${encodeURIComponent(
        MESSAGE
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed bottom-5 right-5 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[#25D366]
        shadow-lg
        transition-all duration-300
        hover:scale-110
        hover:shadow-2xl
        focus:outline-none
        animate-pulse
      "
    >
      {/* Tooltip */}
      <span
        className="
        absolute right-16
        whitespace-nowrap
        rounded-md bg-black px-3 py-1
        text-xs text-white
        opacity-0 scale-95
        transition-all duration-300
        group-hover:opacity-100 group-hover:scale-100
        pointer-events-none
      "
      >
        Chat with us
      </span>

      {/* WhatsApp Icon */}
      <Image
        src={"https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"}
        alt="WhatsApp"
        className="w-7 h-7"
        width={2}

        height={2}
      />
    </Link>
  );
}
