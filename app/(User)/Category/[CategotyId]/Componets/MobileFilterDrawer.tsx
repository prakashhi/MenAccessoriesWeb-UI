"use client";

import {
  Drawer,
  DrawerContent,
  DrawerBody,
} from "@heroui/drawer";
import { Button } from "@heroui/react";
import Optioncomponet from "./OptionComponent";
import { UsePanel } from "@/context/Context";

export default function MobileFilterDrawer() {
  const { isOpen, onOpenChange } = UsePanel();

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="left"
      backdrop="blur"
      size="sm"
      classNames={{
        base: `
          bg-white
          z-[9999]
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        `,
        backdrop: "bg-black/30 backdrop-blur-sm",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            transition: {
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1], // premium easing
            },
          },
          exit: {
            x: "-100%",
            transition: {
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        },
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <div className="flex flex-col h-full">
            {/* HEADER */}
            <header className="px-6 pt-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
                  Refine Results
                </h2>

                <button
                  onClick={onClose}
                  className="text-xs tracking-widest text-gray-500 hover:text-black transition"
                >
                  CLOSE
                </button>
              </div>
            </header>

            {/* BODY */}
            <DrawerBody className="px-5 py-6 overflow-y-auto flex-1">
              <Optioncomponet />
            </DrawerBody>

            {/* FOOTER */}
            <footer className="px-5 py-4 border-t bg-white">
              <Button
                fullWidth
                onPress={onClose}
                className="
                  bg-black text-white
                  rounded-none
                  h-12
                  text-[11px]
                  tracking-[0.3em]
                  uppercase
                  hover:bg-neutral-900
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
