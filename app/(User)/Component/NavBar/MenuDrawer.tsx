"use client";

import { useState } from "react";
import { Drawer, Button } from "@heroui/react";
import Link from "next/link";
import { LuX } from "react-icons/lu";
import { UsePanel } from "@/context/Context";

export default function MenuDrawer() {
  const [open, setOpen] = useState(false);

 {} UsePanel()
likeProductList

  return (
    <>
      {/* Menu Button */}
      <Button
        onPress={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Menu
      </Button>

      {/* Drawer */}
      <Drawer open={open} onOpenChange={setOpen} placement="left" size="sm">
        <div className="flex flex-col h-full bg-white text-black p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <Button
              onPress={() => setOpen(false)}
              className="bg-gray-100 text-black rounded-full p-2 hover:bg-gray-200"
            >
              <LuX size={20} />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium hover:text-gray-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Optional Footer */}
          <div className="mt-auto pt-6 border-t border-gray-200 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </div>
        </div>
      </Drawer>
    </>
  );
}
