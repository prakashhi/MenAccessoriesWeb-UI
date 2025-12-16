"use client";

import { useApi } from "@/app/useApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { notify } from "@/app/(User)/Component/ToastComponent";
import Image from "next/image";
import Loader from "@/public/svg/tube-spinner.svg";
import CountryFiled from "./Componets/CountryFiledComponet";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { callApi, error, loading } = useApi();

  const onSubmit = async (info) => {
    try {
      const res = await callApi("post", "/signup", {
        data: {
          userName: info.fullName,

          email: info.email,

          password: info.password,

          address: info.address,

          pinCode: info.pinCode,

          contactNumber: info.mobile_no,

          countryCode: info.countryCode,

          countryCodeLabel: info.countryCodeLabel,

          isSupplier: info.isSupplier,

          country: info.country,

          state: info.state,
        },
      });

      // Show success toast
      notify({
        message: res.msg || "Registration is successful!",
        type: "success",
      });

      // Redirect to admin dashboard
      router.push("/Login");
    } catch (err: any) {
      // Show error toast
      console.log(error);
      notify({
        message: err?.response?.data?.message || "Something is Wrong!",
        type: "error",
      });
    }
  };

  const passwordValue = watch("password");

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-b from-[#f5f5f5] to-[#e5e5e5] px-4">
      <div className="w-full my-5 max-w-md backdrop-blur-xl bg-white/50 border border-white/30 shadow-2xl rounded-3xl p-8 space-y-8">
        {/* BRAND */}
        <div className="text-center">
          <h1 className="text-4xl font-serif tracking-widest text-black">
            {" "}
            RockRoars
          </h1>
          <p className="text-gray-600 mt-2 text-sm tracking-wide">
            Create your luxury experience
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
              placeholder="John Doe"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

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

          {/* Mobile No */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Mobile No
            </label>
            <input
              placeholder="1234567890"
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
              {...register("mobile_no", {
                pattern: {
                  value: /^[6-9][0-9]{9}$/,
                  message: "Enter valid Mobile No",
                },
              })}
            />
            {errors.mobile_no && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile_no.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
              {...register("address")}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Pin Code
            </label>

            <input
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
              {...register("pinCode", {
                pattern: {
                  value: /^[A-Za-z0-9\s-]{3,10}$/,
                  message: "Enter valid postal / zip code",
                },
              })}
            />

            {errors.pinCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pinCode.message}
              </p>
            )}
          </div>
          <div className="pt-2 space-y-4">
            <CountryFiled
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Is Supplier
            </label>

            <div className="flex items-center gap-8 mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="true" {...register("isSupplier")} />
                <span>Yes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="false" {...register("isSupplier")} />
                <span>No</span>
              </label>
            </div>

            {errors.isSupplier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.isSupplier.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPass ? (
                  <PiEyeSlashBold size={20} />
                ) : (
                  <PiEyeBold size={20} />
                )}
              </span>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
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
                    value === passwordValue || "Passwords do not match",
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

          {/* Register Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 bg-black text-white font-medium rounded-xl shadow-lg hover:bg-black/90 transition"
          >
            {loading == true ? (
              <Image width={20} height={20} alt="Loading" src={Loader} />
            ) : (
              "Create Account "
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/Login" className="text-black font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
