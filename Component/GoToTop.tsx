"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowTooltip(false);
  };

  return (
    <div
      className={`
        fixed bottom-25 right-8  md:right-8 z-50
        transition-all duration-300
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }
      `}
    >
      {/* Tooltip */}
      <span
        className={`
          absolute right-14 top-1/2 -translate-y-1/2
          whitespace-nowrap
          bg-black text-white text-xs px-3 py-1 rounded-md
          transition-opacity duration-200
          hidden md:block
          ${showTooltip ? "opacity-100" : "opacity-0"}
        `}
      >
        Go to top
      </span>

      {/* Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 1000)}
        aria-label="Go to top"
        className="
          flex items-center justify-center
          w-12 h-12 md:w-11 md:h-11
          rounded-full
          bg-black text-white
          cursor-pointer
          shadow-lg
          hover:scale-110
          active:scale-95
          transition-transform
        "
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
