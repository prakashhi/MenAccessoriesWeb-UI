"use client";

import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";
import { Button } from "@heroui/react";
import { X } from "lucide-react";
import Optioncomponet from "./OptionComponent";
import { UsePanel } from "@/context/Context";

export default function MobileFilterDrawer() {
  const { isOpen, onOpenChange } = UsePanel();

  return (
    <Drawer
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
          <div className="flex flex-col min-h-dvh">
            {/* ================= HEADER ================= */}
            <header className="px-5 py-4 border-b flex items-center justify-between">
              <h2 className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
                Refine Results
              </h2>

              <button
                onClick={onClose}
                className="
                  flex items-center gap-2
                  text-gray-500
                  hover:text-black
                  transition
                  p-2
                  -mr-2
                "
                aria-label="Close filters"
              >
                <span className="text-[11px] tracking-widest hidden sm:block">
                  CLOSE
                </span>
                <X size={18} />
              </button>
            </header>

            {/* ================= BODY ================= */}
            <DrawerBody className="flex-1 px-5 py-6 overflow-y-auto">
              <Optioncomponet />
            </DrawerBody>

            {/* ================= FOOTER ================= */}
            <footer className="px-5 py-4 border-t bg-white">
              <Button
                fullWidth
                onPress={onClose}
                className="
                  bg-black text-white
                  h-12
                  rounded-lg
                  text-[11px]
                  tracking-[0.3em]
                  uppercase
                  hover:bg-neutral-900
                  transition
                "
              >
                Apply Filters
              </Button>
            </footer>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
