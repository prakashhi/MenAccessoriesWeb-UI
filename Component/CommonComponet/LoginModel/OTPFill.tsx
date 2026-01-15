"use client";

import { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { X, Shield, Smartphone, RefreshCw, Lock } from "lucide-react";
import { notify } from "@/Component/ToastComponent";

import { mobileConfigType } from "@/Component/NavBar/Nav";
import { UsePanel } from "@/context/Context";
import { UserLoginCredential } from "./utilFunction.ts";
type OTPModalProps = {
  open: boolean;
  onClose: () => void;
  mobileData: mobileConfigType;
  onIfUserCreate: () => void;
};

export default function OTPModal({
  open,
  onClose,
  mobileData,
  onIfUserCreate,
}: OTPModalProps) {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [isAutoRead, setIsAutoRead] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const { UserTrigger, triggerRefresh, GetUserFromContactNumber, GetUserData } =
    UsePanel();

  const { loginUser } = UserLoginCredential();

  // Resend OTP timer countdown
  useEffect(() => {
    if (!open) return;
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 100);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, ""); // numeric only
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[value.length - 1]; // Take last character if multiple pasted
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    } else if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "Delete") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length < OTP_LENGTH) {
      setError("Please enter complete OTP");

      // Highlight empty inputs
      const emptyIndex = otp.findIndex((digit) => !digit);
      if (emptyIndex !== -1) {
        inputsRef.current[emptyIndex]?.focus();
        inputsRef.current[emptyIndex]?.classList.add("ring-2", "ring-red-500");
        setTimeout(() => {
          inputsRef.current[emptyIndex]?.classList.remove(
            "ring-2",
            "ring-red-500"
          );
        }, 1000);
      }

      return;
    }
    setLoading(true);
    setError("");

    if (otpString == "111111") {
      //OTP verify Logic

      notify({
        message: "OTP verified successfully",
        type: "success",
      });

      try {
        let res = await GetUserFromContactNumber(mobileData.mobileNumber);

        if (res.success == true && res.data) {
          //if UserNumber is Exist
          let userId = res.data.id;
          let response = await GetUserData(userId);

          if (response.success == true && response.data?.jwtToken) {
            // userLog-in
            let userData = response.data;
            let jwtToken :string = userData.jwtToken;
            UserTrigger();
            loginUser(userData, jwtToken);
            triggerRefresh();
            onClose();
          }
        }
      } catch (error: any) {
        //if UserNot is Exist
        onIfUserCreate();
        onClose();
      }
    } else {
      notify({
        message: "OTP is not valid",
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    setResendTimer(60);
    setIsAutoRead(false);
    console.log("Resending OTP...");
  };

  // Clear all inputs
  const clearOTP = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current.forEach((input) => {
      if (input) input.value = "";
    });
    inputsRef.current[0]?.focus();
  };

  const addToRefs = (el: HTMLInputElement | null) => {
    if (el && !inputsRef.current.includes(el)) {
      inputsRef.current.push(el);
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      hideCloseButton
      backdrop="blur"
      placement="center"
      size="full" // Changed from "md" to "full" for mobile
      classNames={{
        backdrop: "bg-black/70 backdrop-blur-sm backdrop-saturate-150",
        base: "m-0 sm:mx-0 sm:max-w-md", // Removed mx-4, added m-0 for mobile
        wrapper: "p-0 sm:p-4", // Added padding for mobile wrapper
        body: "p-0",
      }}
      scrollBehavior="inside"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: 20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent
        className="
        relative 
        min-h-screen sm:min-h-0
        bg-linear-to-br from-white via-white to-gray-50 
        dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 
        rounded-none sm:rounded-3xl 
        shadow-none sm:shadow-2xl 
        shadow-black/10 dark:shadow-black/30 
        border-0 sm:border border-white/40 dark:border-zinc-700/50 
        p-4 sm:p-8
      "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="text-center space-y-4 mb-6">
          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-linear-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
              <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Verify OTP
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">
              Enter the 6-digit code sent to
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Smartphone className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {mobileData.CountryCode}{" "}
                {mobileData.mobileNumber || "•••• •••• ••"}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <ModalBody className="flex flex-col items-center gap-6 px-0">
          {/* Auto-fill Section */}
          <div className="w-full space-y-4">
            {/* Hidden input for Web OTP API */}
            <input
              ref={hiddenInputRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="opacity-0 absolute -left-full"
              readOnly
            />

            {/* OTP Inputs */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-2 sm:gap-3 justify-center w-full px-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={addToRefs}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                    className="
                      w-full max-w-[55px] sm:max-w-[65px] h-14 sm:h-16
                      text-center text-2xl sm:text-3xl font-bold
                      rounded-xl sm:rounded-2xl border-2
                      border-gray-200 dark:border-zinc-700
                      focus:border-blue-500 dark:focus:border-blue-400
                      focus:ring-2 focus:ring-blue-500/20
                      bg-white dark:bg-zinc-800 
                      text-gray-900 dark:text-white
                      shadow-sm hover:shadow-md transition-all duration-200
                      placeholder:text-gray-300 dark:placeholder:text-gray-600
                      selection:bg-blue-500/20
                    "
                    placeholder="•"
                    data-index={index}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={clearOTP}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition flex items-center gap-1"
                >
                  <X size={14} />
                  Clear
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-sm">
                <X size={14} />
                <p>{error}</p>
              </div>
            )}
          </div>

          {/* Resend OTP */}
          <div className="text-center space-y-4 w-full px-2">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {resendTimer > 0
                  ? `You can request a new code in ${resendTimer} seconds`
                  : "Didn't receive the code?"}
              </p>

              <button
                onClick={handleResend}
                disabled={resendTimer > 0}
                className={`
                  flex items-center justify-center gap-2 mx-auto px-4 py-2
                  rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    resendTimer > 0
                      ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-zinc-700 cursor-not-allowed"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  }
                `}
              >
                <RefreshCw
                  size={14}
                  className={resendTimer > 0 ? "animate-spin" : ""}
                />
                Resend OTP {resendTimer > 0 && `(${resendTimer}s)`}
              </button>
            </div>
          </div>
        </ModalBody>

        {/* Footer */}
        <ModalFooter className="pt-4 mt-2 border-t border-gray-200 dark:border-zinc-700 px-0">
          <Button
            onPress={handleSubmit}
            isLoading={loading}
            isDisabled={otp.join("").length < OTP_LENGTH}
            className="
              w-full
              py-4
              bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600
              hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700
              text-white font-semibold text-base
              rounded-2xl shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15
              hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20
              hover:-translate-y-0.5
              active:translate-y-0
              transition-all duration-200
              data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed
            "
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
