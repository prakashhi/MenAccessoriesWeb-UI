import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import HeroProvider from "./HeroProvider";
import { UserContextProvider } from "@/context/Context";

import { UserLikeContextProvider } from "@/context/UserLikeContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserCartContextProvider } from "@/context/UserCartContext";
import { GuestUserContextProvider } from "@/context//GuestUserContext";
import FloatingWhatsApp from "@/Component/FloatingWhatappLogo";
import { CartInit } from "@/Component/CartInit";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RockeRoar",
  description:
    "Discover premium men's accessories designed for style, comfort, and everyday confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeroProvider>
      
          <UserContextProvider>
            <UserLikeContextProvider>
              <UserCartContextProvider>
                <GuestUserContextProvider><CartInit/>{children}</GuestUserContextProvider>
              </UserCartContextProvider>
            </UserLikeContextProvider>
          </UserContextProvider>

          <FloatingWhatsApp />

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            // transition={'Bounce'}
          />
        </HeroProvider>
      </body>
    </html>
  );
}
