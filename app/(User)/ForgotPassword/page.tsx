"use client";

import { useApi } from "@/app/useApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Loader from "@/public/svg/tube-spinner.svg";
import { notify } from "@/app/(User)/Component/ToastComponent";
import { useForm, SubmitHandler } from "react-hook-form";

import Image from "next/image";

export default function page() {
  type Data = { email: string };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const router = useRouter();
  const { callApi, error, loading } = useApi();

  const [message, setMessage] = useState(false);

  const onSubmit: SubmitHandler<Data> = async (info) => {
    const res = await callApi(
      "post",
      "http://localhost:3005/user/send-reset-password-email",
      {
        data: { email: info.email },
      }
    );

    setMessage(true);

    notify({
      message: res.message || "Sended Link successful!",
      type: "success",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-b from-[#f5f5f5] to-[#e5e5e5] px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/50 border border-white/30 shadow-2xl rounded-3xl p-8 space-y-8">
        {/* BRAND */}
        <div className="text-center">
          <h1 className="text-4xl font-serif tracking-widest text-black">
            {" "}
            RockRoars
          </h1>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {message && (
            <div
              className="
  mt-3
  flex items-start gap-3
  rounded-xl
  border border-green-100
  bg-green-50/60
  px-4 py-3
  text-sm
  text-green-800
  shadow-sm
"
            >
              <span
                className="
    mt-0.5
    flex h-5 w-5 shrink-0
    items-center justify-center
    rounded-full
    bg-green-600
    text-[11px]
    font-medium
    text-white
  "
              >
                ✓
              </span>

              <p className="leading-relaxed">
                Your reset password link has been sent to your email.
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 bg-black text-white font-medium rounded-xl shadow-lg hover:bg-black/90 transition"
          >
            {loading == true ? (
              <Image width={20} height={20} alt="Loading" src={Loader} />
            ) : (
              "Send Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
