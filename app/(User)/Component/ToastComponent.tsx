"use client";

import { toast, ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

interface NotifyProps {
  message: string;
  type?: ToastType;
  duration?: number;
}

/* 🎩 Light Armani Luxury Palette */
const TOAST_THEME: Record<ToastType, ToastOptions["style"]> = {
  success: {
    background: "rgba(255, 255, 252, 0.95)", // ivory white
    color: "#1F2937", // charcoal text
    borderLeft: "4px solid #C7B27C", // champagne gold
  },
  error: {
    background: "rgba(255, 248, 248, 0.96)",
    color: "#7F1D1D",
    borderLeft: "4px solid #B91C1C",
  },
  info: {
    background: "rgba(248, 250, 252, 0.96)",
    color: "#1E3A8A",
    borderLeft: "4px solid #64748B",
  },
  warning: {
    background: "rgba(255, 251, 235, 0.96)",
    color: "#92400E",
    borderLeft: "4px solid #D97706",
  },
};

export const notify = ({
  message,
  type = "success",
  duration = 1600,
}: NotifyProps) => {
  const options: ToastOptions = {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

    style: {
      ...TOAST_THEME[type],
      fontFamily: `"Inter", "Helvetica Neue", "Segoe UI", sans-serif`,
      fontWeight: 500,
      fontSize: "14.5px",
      borderRadius: "16px",
      padding: "16px 24px",
      letterSpacing: "0.35px",
      boxShadow:
        "0px 12px 25px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.6)",
      backdropFilter: "blur(10px)",
    },
  };

  toast(message, options);
};
