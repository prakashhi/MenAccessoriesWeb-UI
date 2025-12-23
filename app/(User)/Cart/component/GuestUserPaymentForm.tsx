"use client";

import { useApi } from "@/app/useApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { notify } from "@/app/(User)/Component/ToastComponent";
import Image from "next/image";
import Loader from "@/public/svg/tube-spinner.svg";
import CountryFiled from "@/app/(User)/register/Component/CountryFiledComponet";
import PaymentSuccessModal from "./PaymentSucessModel";

export default function GuestUserPaymentForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { callApi, error, loading } = useApi();

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (info: any) => {
    try {
      const res = await callApi("post", "/signup", {
        data: {
          email: info.email,
          address: info.address,
          pinCode: info.pinCode,
          contactNumber: info.mobile_no,
          countryCode: info.countryCode,
          countryCodeLabel: info.countryCodeLabel,
          country: info.country,
          state: info.state,
        },
      });

      router.push("/login");
    } catch (err: any) {
      notify({
        message: err?.response?.data?.message || "Something went wrong!",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6  from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* HEADER */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Guest Checkout
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your delivery details
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Mobile */}
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

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none resize-none"
              {...register("address")}
            />
          </div>

          {/* Pin Code */}
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
            className="w-full h-12 flex items-center justify-center rounded-xl bg-black text-white text-sm font-medium hover:bg-black/90 transition"
          >
            {loading ? (
              <Image src={Loader} alt="loading" width={22} height={22} />
            ) : (
              "Continue"
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
