import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeroProvider from "./HeroProvider";
import { SearchPanelContextProvider } from "@/context/SerchPanelContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "9RockeRoars",
  description:
    "Discover premium men's accessories designed for style, comfort, and everyday confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SearchPanelContextProvider>
          <HeroProvider>{children}</HeroProvider>
        </SearchPanelContextProvider>
      </body>
    </html>
  );
}
