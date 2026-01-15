"use client";

import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";
import { Button } from "@heroui/react";

import { X, ArrowRight } from "lucide-react";

import OptionComponent from "./OptionComponent";
import { UsePanel } from "@/context/Context";

export type StateMobileDrawer = {
  malarialId: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  PriceLabel: string | null;
};

export default function MobileFilterDrawer() {
  const { isOpen, onOpenChange } = UsePanel();

  return (
    <Drawer
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="left"
      size="sm"
      classNames={{
        base: `
          bg-white
          z-[9999]
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        `,
        backdrop: "bg-black/50 backdrop-blur-sm",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            transition: {
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            },
          },
          exit: {
            x: "-100%",
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        },
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <div className="flex flex-col h-dvh">
            {" "}
            {/* full viewport height */}
            {/* ================= HEADER ================= */}
            <header className="px-5 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
              <h2 className="text-[11px] tracking-[0.25em] uppercase text-gray-500">
                Filter Results
              </h2>

              <button
                onClick={onClose}
                className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black transition p-2 -mr-2"
                aria-label="Close filters"
              >
                <span className="text-[11px] tracking-widest hidden sm:block">
                  CLOSE
                </span>
                <X size={18} />
              </button>
            </header>
            {/* ================= BODY ================= */}
            <DrawerBody className="flex-1 overflow-y-auto px-5 py-6">
              <div className="flex flex-col space-y-4">
                <OptionComponent />
              </div>
            </DrawerBody>
            {/* ================= FOOTER ================= */}
            <footer className="px-5 py-4 border-t border-gray-200 shrink-0 bg-white">
              <Button
                fullWidth
                onPress={() => onOpenChange()}
                className="bg-black text-white h-12 rounded-lg text-[11px] tracking-[0.3em] uppercase hover:bg-neutral-900 transition flex items-center justify-center gap-2"
              >
                Show Filtered Products
                <ArrowRight size={16} className="stroke-white" />
              </Button>
            </footer>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
