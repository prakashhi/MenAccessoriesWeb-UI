"use client";

import Link from "next/link";
import Image from "next/image";
import { WhatsAppNumber } from "@/app/page";

const MESSAGE = "Hello, I am interested in your products";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Message Bubble (Hidden by default) */}
      <div
        className="
          absolute bottom-16 right-1/2 translate-x-1/2
          px-4 py-2
          text-xs sm:text-sm
          bg-black text-white
          rounded-full shadow-lg
          opacity-0 scale-95
          transition-all duration-300
          group-hover:opacity-100 group-hover:scale-100
          whitespace-nowrap
          pointer-events-none
        "
      >
        Start Chat
      </div>

      {/* WhatsApp Button */}
      <Link
        href={`https://wa.me/${WhatsAppNumber}?text=${encodeURIComponent(
          MESSAGE
        )}`}
        target="_blank"
        aria-label="Chat on WhatsApp"
        className="
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-[#25D366]
          shadow-xl
          transition-all duration-300
          hover:scale-110
          hover:shadow-2xl
        "
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          width={28}
          height={28}
          priority
        />
      </Link>
    </div>
  );
}
