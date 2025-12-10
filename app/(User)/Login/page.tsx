"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";

export default function page() {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-b from-[#f5f5f5] to-[#e5e5e5] px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/50 border border-white/30 shadow-2xl rounded-3xl p-8 space-y-8">

        {/* BRAND */}
        <div className="text-center">
          <h1 className="text-4xl font-serif tracking-widest text-black"> RockRoars</h1>
          <p className="text-gray-600 mt-2 text-sm tracking-wide">
            Welcome back — sign in to continue
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
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
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
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
                {showPass ? <PiEyeSlashBold size={20} /> : <PiEyeBold size={20} />}
              </span>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-medium rounded-xl shadow-lg hover:bg-black/90 transition"
          >
            Sign In
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <a href="/Register" className="text-black font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
