"use client";

import { useApi } from "@/app/useApi";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { UsePanel } from "@/context/Context";

import { Modal, ModalContent, Button } from "@heroui/react";
import {
  X,
  Smartphone,
  Shield,
  ArrowRight,
  ChevronDown,
  Search,
  Globe,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { CountryCode } from "@/utils/CountryCode"; // Adjust import path
import { notify } from "@/Component/ToastComponent";

type Props = {
  onClose: () => void;
  open: boolean;
  onConfirm: (mobileNumber: string, countryCode: string) => void;
};

export default function MobileNumberLogin({ onClose, open, onConfirm }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find((c) => c.dial_code === "+91")!
  ); // Default to India
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const countryListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  type Info = { contactNumber: string };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<Info>();

  const router = useRouter();
  const { loading } = useApi();

  const onSubmit: SubmitHandler<Info> = async (info) => {
    try {
      onClose();
      onConfirm(info.contactNumber, selectedCountry.dial_code);

      notify({
        message: "OTP has been sent successfully to your mobile number",
        type: "success",
      });

      // onClose();
      // onConfirm(info.contactNumber, selectedCountry.dial_code);
    } catch (err: any) {
      notify({
        message: err.message,
        type: "error",
      });
    }
  };

  // Filter countries based on search
  const filteredCountries = CountryCode.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dial_code.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle click outside to close country list
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryListRef.current &&
        !countryListRef.current.contains(event.target as Node)
      ) {
        setShowCountryList(false);
      }
    };

    if (showCountryList) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCountryList]);

  // Handle input change with number validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove all non-digit characters including spaces
    const rawValue = value.replace(/\D/g, "");

    // Update raw value for form
    setInputValue(rawValue);
    setValue("contactNumber", rawValue, { shouldValidate: true });

    setDisplayValue(rawValue);

    // Trigger validation if we have errors
    if (errors.contactNumber && rawValue.length > 0) {
      clearErrors("contactNumber");
    }
  };

  // Handle country selection
  const handleCountrySelect = (country: (typeof CountryCode)[0]) => {
    setSelectedCountry(country);
    setShowCountryList(false);
    setSearchQuery("");

    // Re-format the current number with new country pattern
    if (inputValue) {
      setDisplayValue(inputValue);
    }

    // Focus back on input
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Validation based on selected country
  const validatePhoneNumber = (value: string) => {
    if (!value) return "Phone number is required";
    return true;
  };

  // Country flag component
  const FlagEmoji = ({ emoji }: { emoji: string }) => {
    return <span className="text-xl">{emoji}</span>;
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      hideCloseButton
      backdrop="blur"
      placement="center"
      size="md"
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
      classNames={{
        backdrop: "bg-black/70 backdrop-blur-sm backdrop-saturate-150",
        base: "mx-4 sm:mx-0 max-w-md",
        wrapper: "overflow-hidden",
      }}
    >
      <ModalContent className="relative bg-linear-to-br from-white via-white to-gray-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/30 border border-white/40 dark:border-zinc-700/50 p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute cursor-pointer top-4 right-4 z-10 rounded-full p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center space-y-4 mb-5  ">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif tracking-widest text-black">
              {" "}
              RockRoars
            </h1>
          </div>

          
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">
              Enter your mobile number to continue
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Country Code & Mobile Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Smartphone size={16} />
                Phone Number
              </label>
            </div>

            <div className="flex gap-2">
              {/* Country Code Selector */}
              <div className="relative shrink-0" ref={countryListRef}>
                <button
                  type="button"
                  onClick={() => setShowCountryList(!showCountryList)}
                  className="flex items-center gap-2 px-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-zinc-800 transition-all duration-200 min-w-[110px]"
                >
                  <div className="flex items-center gap-2">
                    <FlagEmoji emoji={selectedCountry.emoji} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {selectedCountry.dial_code}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </button>

                {/* Country List Dropdown */}
                {showCountryList && (
                  <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 z-50 max-h-96 overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-3 border-b border-gray-100 dark:border-zinc-700">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-zinc-700 rounded-xl border border-gray-200 dark:border-zinc-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    {/* Country List */}
                    <div className="overflow-y-auto max-h-64">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors ${
                              country.code === selectedCountry.code
                                ? "bg-blue-50 dark:bg-blue-900/20"
                                : ""
                            }`}
                          >
                            <FlagEmoji emoji={country.emoji} />
                            <span className="text-gray-700 dark:text-gray-300 font-medium flex-1 text-left">
                              {country.name}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">
                              {country.dial_code}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          No countries found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Number Input */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="tel"
                  inputMode="numeric"
                  value={displayValue}
                  onChange={handleInputChange}
                  placeholder={
                    selectedCountry.code === "IN"
                      ? "000 000 0000"
                      : "Phone number"
                  }
                  className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-lg font-medium tracking-wider"
                />
                <input
                  type="hidden"
                  {...register("contactNumber", {
                    required: "Phone number is required",
                    // validate: validatePhoneNumber,
                  })}
                />
              </div>
            </div>

            {errors.contactNumber ? (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <X size={14} />
                <p>{errors.contactNumber.message}</p>
              </div>
            ) : inputValue && validatePhoneNumber(inputValue) === true ? (
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <Shield size={14} />
                <p>Valid phone number for {selectedCountry.name}</p>
              </div>
            ) : null}
          </div>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
            <p>We'll send you a verification code to this number</p>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            spinnerPlacement="start"
            isDisabled={!inputValue || validatePhoneNumber(inputValue) !== true}
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
              group
            "
          >
            {loading ? (
              "Sending OTP..."
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            By continuing, you agree to our{" "}
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Terms
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
}
