"use client";

import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FC } from "react";

type NotifyProps = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
};

export const notify = ({
  message,
  type = "success",
  duration = 1200,
}: NotifyProps) => {
  const options: ToastOptions = {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      background: type === "success" ? "#F2F2F2" : "#b91c1c", // Armani black / red for error
      color: "#364153", // soft white text
      fontFamily: "Inter, sans-serif",
      fontWeight: 600,
      borderRadius: "12px",
      padding: "12px 20px",
      boxShadow: "0px 8px 15px rgba(0,0,0,0.2)",
      backdropFilter: "blur(5px)",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    bodyStyle: {
      fontSize: "14px",
    },
  };

  toast(message, options);
};

// Toast container component (place once in _app or page)
export const ToastProvider: FC = () => {
  return (
    <ToastContainer
      limit={3}
      newestOnTop
      closeButton={false}
      pauseOnFocusLoss={false}
      rtl={false}
      draggable
      pauseOnHover
      style={{ zIndex: 9999 }}
    />
  );
};
