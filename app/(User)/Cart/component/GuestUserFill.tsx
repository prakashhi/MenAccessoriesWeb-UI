"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { notify } from "@/app/(User)/Component/ToastComponent";
import Image from "next/image";
import Loader from "@/public/svg/tube-spinner.svg";
import CountryFiled from "@/app/(User)/register/Component/CountryFiledComponet";
import PaymentSuccessModal from "./PaymentSucessModel";
import { User } from "../../Type/Types";
import API from "@/app/api";
import { X } from "lucide-react";

type FormValues = {
  country: string;
  state: string;
  countryCode: string;
  address: string;
  pinCode: string;
  mobile_no: string;
};

export default function GuestUserFill({
  requiredFields,
  UserData,
  onClose,
}: {
  requiredFields: string[];
  UserData: User;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      country: UserData.country,
      state: UserData.state,
      countryCode: UserData.countryCode,
      address: UserData.address,
      pinCode: UserData.pinCode,
      mobile_no: UserData.contactNumber,
    },
  });

  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (info: FormValues) => {
    try {
      const formData = new FormData();

      Object.entries(info).forEach(([key, value]) => {
        if (!value) return;
        if (key === "profileImage") {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      let res = await API.patch(`/user/${UserData.id}`, formData);

      notify({
        message: "Successfully Data filled",
        type: "success",
      });

      onClose();
    } catch (err: any) {
      notify({
        message: err?.response?.data?.message || "Something went wrong!",
        type: "error",
      });
    }
  };

  console.log(requiredFields);

  return (
    <div className="lg:min-h-dvh  flex items-center justify-center lg:px-4 py-6  from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* HEADER */}
        <div className="px-6 flex relative  justify-between pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              User Checkout
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your delivery details
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-5 h-5  flex items-center relative bottom-1 cursor-pointer  left-3  justify-center rounded-full hover:bg-gray-200/40 transition"
            aria-label="Close modal"
          >
            <X size={18} className="text-gray-700" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5">
          {requiredFields.includes("contactNumber") && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                placeholder="9876543210"
                className="mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                {...register("mobile_no", {
                  pattern: {
                    value: /^[6-9][0-9]{9}$/,
                    message: "Enter valid mobile number",
                  },
                })}
              />
              {errors.mobile_no && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.mobile_no.message as string}
                </p>
              )}
            </div>
          )}

          {requiredFields.includes("address") && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                rows={3}
                className="mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none resize-none"
                {...register("address")}
              />
            </div>
          )}

          {requiredFields.includes("pinCode") && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Pin / Zip Code
              </label>
              <input
                className="mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                {...register("pinCode", {
                  pattern: {
                    value: /^[A-Za-z0-9\s-]{3,10}$/,
                    message: "Enter valid pin code",
                  },
                })}
              />
              {errors.pinCode && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.pinCode.message as string}
                </p>
              )}
            </div>
          )}

          {/* Country / State */}
          <CountryFiled
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 flex items-center justify-center rounded-xl bg-black text-white text-sm font-medium hover:bg-black/90 transition"
          >
            {isSubmitting ? (
              <Image src={Loader} alt="loading" width={22} height={22} />
            ) : (
              "Save"
            )}
          </button>

          <PaymentSuccessModal
            isOpen={isSuccess}
            onClose={() => setIsSuccess(false)}
            amount={123456} // Example amount
          />
        </form>
      </div>
    </div>
  );
}
