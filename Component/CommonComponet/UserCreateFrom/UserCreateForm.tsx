"use client";

import { useApi } from "@/app/useApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { notify } from "@/Component/ToastComponent";
import Image from "next/image";
import Loader from "@/public/svg/tube-spinner.svg";
import API from "@/app/api";

import { EditUserObjType } from "@/Type/UserDetailType";

import { Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/react";
import { UsePanel } from "@/context/Context";
import { UserLoginCredential } from "@/Component/CommonComponet/LoginModel/utilFunction.ts";
import { X, User, Mail, Phone, CheckCircle, AlertCircle } from "lucide-react";

export default function UserCreateForm({
  open,
  onClose,
  mobileNumber,
}: {
  open: boolean;
  onClose: () => void;
  mobileNumber: string;
}) {
  const { CreateUser } = UsePanel();
  const { loginUser } = UserLoginCredential();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<EditUserObjType>({
    defaultValues: {
      contactNumber: mobileNumber,
    },
    mode: "onChange",
  });

  const { loading } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<EditUserObjType> = async (
    info: EditUserObjType
  ) => {
    setIsSubmitting(true);
    try {
      let res = await CreateUser(info);
      if (res.data) {
        notify({
          message: "Account created successfully!",
          type: "success",
        });
        loginUser(res?.data, res?.data?.jwtToken);
        onClose();
      }
    } catch (err: any) {
      notify({
        message: err?.response?.data?.msg || "Something is Wrong!",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const formValues = watch();

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="md"
      placement="center"
      hideCloseButton
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
          },
          exit: {
            y: 20,
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.2,
            },
          },
        },
      }}
      classNames={{
        backdrop: "bg-black/70 backdrop-blur-sm backdrop-saturate-150",
        base: "mx-4 sm:mx-0 max-w-lg",
        wrapper: "overflow-hidden",
      }}
    >
      <ModalContent>
        <ModalBody className="p-0">
          <ModalHeader className="absolute top-6 right-6 p-0 z-20">
            <button
              onClick={onClose}
              className="w-8 cursor-pointer h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-600 hover:text-black hover:bg-white/40 transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </ModalHeader>

          <div className="w-full bg-linear-to-br from-white via-white to-gray-50/90 border border-white/40 shadow-2xl shadow-black/5 rounded-3xl p-6 sm:p-8 space-y-8 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-linear-to-br from-black/5 to-transparent blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-linear-to-tr from-black/5 to-transparent blur-2xl"></div>

            {/* BRAND SECTION */}
            <div className="text-center relative z-10">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-serif tracking-widest text-black">
                  {" "}
                  RockRoars
                </h1>
              </div>
              <p className="text-gray-500 text-sm mt-2 ">
                Complete your profile to continue
              </p>
            </div>

            {/* FORM SECTION */}
            <form
              className="space-y-5 sm:space-y-6 mt-6 relative z-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Two-column layout for names on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
                {/* FirstName */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User size={14} />
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      className={`w-full px-4 py-3.5 bg-white border ${
                        errors.userFirstName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-200 focus:border-black focus:ring-black/20"
                      } rounded-xl outline-none focus:ring-4 transition-all duration-200 placeholder:text-gray-400`}
                      placeholder="First Name"
                      {...register("userFirstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum 50 characters",
                        },
                      })}
                    />
                    {formValues.userFirstName && !errors.userFirstName && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.userFirstName && (
                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      {errors.userFirstName.message}
                    </p>
                  )}
                </div>

                {/* LastName */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User size={14} />
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      className={`w-full px-4 py-3.5 bg-white border ${
                        errors.userLastName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-200 focus:border-black focus:ring-black/20"
                      } rounded-xl outline-none focus:ring-4 transition-all duration-200 placeholder:text-gray-400`}
                      placeholder="Last Name"
                      {...register("userLastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum 50 characters",
                        },
                      })}
                    />
                    {formValues.userLastName && !errors.userLastName && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.userLastName && (
                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      {errors.userLastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail size={14} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className={`w-full px-4 py-3.5 bg-white border ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-black focus:ring-black/20"
                    } rounded-xl outline-none focus:ring-4 transition-all duration-200 placeholder:text-gray-400`}
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {formValues.email && !errors.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle size={12} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone size={14} />
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    className={`w-full px-4 py-3.5 bg-white border ${
                      errors.contactNumber
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-black focus:ring-black/20"
                    } rounded-xl outline-none focus:ring-4 transition-all duration-200 placeholder:text-gray-400`}
                    placeholder="9876543210"
                    {...register("contactNumber", {
                      required: "Mobile number is required",
                      // pattern: {
                      //   value: /^[6-9][0-9]{9}$/,
                      //   message: "Enter a valid 10-digit mobile number",
                      // },
                    })}
                  />
                  {formValues.contactNumber && !errors.contactNumber && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.contactNumber && (
                  <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle size={12} />
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || isSubmitting || !isValid}
                className={`w-full py-4 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-2 ${
                  loading || isSubmitting || !isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black hover:shadow-lg active:scale-[0.99]"
                }`}
              >
                {loading || isSubmitting ? (
                  <>
                    <div className="animate-spin">
                      <Image
                        width={18}
                        height={18}
                        src={Loader}
                        alt="loading"
                      />
                    </div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
