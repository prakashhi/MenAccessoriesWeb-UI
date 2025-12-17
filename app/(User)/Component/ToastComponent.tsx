"use client";

import { toast, ToastOptions } from "react-toastify";
import { RiCheckLine, RiErrorWarningLine, RiInformationLine, RiAlertLine } from "react-icons/ri";

type ToastType = "success" | "error" | "info" | "warning";

interface NotifyProps {
  message: string;
  type?: ToastType;
  duration?: number;
}

/* 🎩 Light Armani Luxury Palette with Icons */
const TOAST_THEME: Record<
  ToastType,
  { style: ToastOptions["style"]; icon: JSX.Element }
> = {
  success: {
    style: {
      background: "rgba(255, 255, 252, 0.95)", // ivory white
      color: "#1F2937", // charcoal text
      borderLeft: "4px solid #C7B27C", // champagne gold
    },
    icon: <RiCheckLine className="w-5 h-5 text-green-600" />,
  },
  error: {
    style: {
      background: "rgba(255, 248, 248, 0.96)",
      color: "#7F1D1D",
      borderLeft: "4px solid #B91C1C",
    },
    icon: <RiErrorWarningLine className="w-5 h-5 text-red-600" />,
  },
  info: {
    style: {
      background: "rgba(248, 250, 252, 0.96)",
      color: "#1E3A8A",
      borderLeft: "4px solid #64748B",
    },
    icon: <RiInformationLine className="w-5 h-5 text-blue-600" />,
  },
  warning: {
    style: {
      background: "rgba(255, 251, 235, 0.96)",
      color: "#92400E",
      borderLeft: "4px solid #D97706",
    },
    icon: <RiAlertLine className="w-5 h-5 text-yellow-600" />,
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
    icon: TOAST_THEME[type].icon, // 🟢 Add icon
    style: {
      ...TOAST_THEME[type].style,
      fontFamily: `"Inter", "Helvetica Neue", "Segoe UI", sans-serif`,
      fontWeight: 500,
      fontSize: "14.5px",
      borderRadius: "16px",
      padding: "16px 24px",
      letterSpacing: "0.35px",
      boxShadow:
        "0px 12px 25px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.6)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
  };

  toast(message, options);
};
