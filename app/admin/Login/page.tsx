"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";

export default function page() {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Admin Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e5e5e5] via-[#dcdcdc] to-[#c8c8c8] px-4">
      
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 space-y-7 animate-fadeIn">
        
        {/* LOGO / HEADER */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="p-4 bg-black text-white rounded-full shadow-xl">
              <MdAdminPanelSettings size={36} />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-wide text-gray-900">
            Admin Panel
          </h1>
          <p className="text-gray-600 text-sm mt-1 tracking-wide">
            Login to manage dashboard
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Admin Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="mt-1 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black/80 outline-none transition shadow-sm"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••••"
                className="mt-1 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black/80 outline-none transition shadow-sm"
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

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl font-medium shadow hover:bg-black/90 transition"
          >
            Login
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className="text-center">
          <a
            href="/admin/forgot-password"
            className="text-sm text-gray-700 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
