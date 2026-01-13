"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import { X } from "lucide-react";

type props = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
};
export function DeleteAddressAskModel({
  open,
  title = "Delete Address?",
  description = "Are you sure you want to delete this address?",
  onConfirm,
  onCancel,
  loading = false,
}: props) {
  return (
    <>
      <Modal
        isOpen={open}
        hideCloseButton
        onClose={onCancel}
        backdrop="blur"
        placement="center"
        size="md"
        classNames={{
          backdrop: "bg-black/70 backdrop-blur-lg",
          base: "mx-4 sm:mx-0",
        }}
      >
        <ModalContent
          className="
      relative
      bg-white/95 dark:bg-zinc-900/95
      backdrop-blur-xl
      rounded-2xl
      shadow-2xl
      border border-white/20 dark:border-white/10
    "
        >
          <>
            {/* Close icon */}
            <button
              onClick={onCancel}
              aria-label="Close"
              className="
          absolute right-4 top-4
          rounded-full cursor-pointer p-1.5
          text-gray-500 dark:text-gray-400
          hover:bg-black/5 dark:hover:bg-white/10
          transition
        "
            >
              <X size={18} />
            </button>

            {/* Header */}
            <ModalHeader
              className="
          text-lg sm:text-xl
          font-semibold
          text-gray-900 dark:text-white
          pr-10
        "
            >
              {title}
            </ModalHeader>

            {/* Body */}
            <ModalBody>
              <p
                className="
            text-sm sm:text-base
            text-gray-600 dark:text-gray-300
            leading-relaxed
          "
              >
                {description}
              </p>
            </ModalBody>

            {/* Footer */}
            <ModalFooter
              className="
          flex flex-col-reverse sm:flex-row
          gap-3
        "
            >
              {/* Cancel */}
              <Button
                variant="flat"
                onPress={onCancel}
                isDisabled={loading}
                className="
            w-full sm:w-auto
            text-gray-700  dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-white/10
          "
              >
                Cancel
              </Button>

              {/* Delete */}
              <Button
                onPress={onConfirm}
                className="
            w-full sm:w-auto
            bg-red-600 hover:bg-red-700 rounded-xl  active:bg-red-800
            text-white
            shadow-md
          "
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
