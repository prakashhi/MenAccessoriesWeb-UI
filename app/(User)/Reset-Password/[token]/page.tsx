"use client";

import { useApi } from "@/app/useApi";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import Loader from "@/public/svg/tube-spinner.svg";
import { notify } from "@/app/(User)/Component/ToastComponent";

import Image from "next/image";
import { param } from "framer-motion/client";
import { useSearchParams } from "next/navigation";

export default function page() {
  const [showConfirm, setShowConfirm] = useState(false);

  const params = useParams();

  type ResetPass = {
    token: "string";
    email: "string";
    newPassword: "string";
    confirmPassword: "string";
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPass>();

  const router = useRouter();
  const { callApi, error, loading } = useApi();

  const searchParams = useSearchParams();
   console.log(searchParams)
 

  const onSubmit: SubmitHandler<ResetPass> = async (info) => {
    const res = await callApi("post", "/user/validate-reset-password-token", {
      data: {
        token: params.token,
        email: params.email,
        newPassword: info.newPassword,
      },
    });

    notify({
      message: res.message || "Password reset successful!",
      type: "success",
    });
    router.push("/Login");
  };

  const passwordValue = watch("newPassword");

  return (
    <div className="min-h-screen py-4 flex justify-center items-center bg-linear-to-b from-[#f5f5f5] to-[#e5e5e5] px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/50 border border-white/30 shadow-2xl rounded-3xl p-8 space-y-8">
        {/* BRAND */}
        <div className="text-center">
          <h1 className="text-4xl font-serif tracking-widest text-black">
            {" "}
            RockRoars
          </h1>
          <p className="text-gray-600 mt-2 text-sm tracking-wide">
            Reset your Password
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={"text"}
                className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
                placeholder="••••••••"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
            </div>

            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value == passwordValue || "Passwords do not match",
                })}
              />

              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showConfirm ? (
                  <PiEyeSlashBold size={20} />
                ) : (
                  <PiEyeBold size={20} />
                )}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 bg-black text-white font-medium rounded-xl shadow-lg hover:bg-black/90 transition"
          >
            {loading == true ? (
              <Image width={20} height={20} alt="Loading" src={Loader} />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
