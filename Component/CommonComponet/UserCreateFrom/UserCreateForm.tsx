"use client";

import { useApi } from "@/app/useApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { notify } from "@/Component/ToastComponent";
import Image from "next/image";
import Loader from "@/public/svg/tube-spinner.svg";

import { RegisterType } from "@/Type/UserDetailType";
import API from "@/app/api";

export default function UserCreateForm({ open, onClose }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterType>();

  const router = useRouter();
  const { callApi, error, loading } = useApi();

  const onSubmit: SubmitHandler<RegisterType> = async (info: RegisterType) => {
    const formData = new FormData();
    try {
      const res = await API.post("/signup", formData);

      if (res) {
        notify({
          message: res.data.msg || "Registration is successful!",
          type: "success",
        });
      }

      router.push("/login");
    } catch (err: any) {
      // Show error toast
      notify({
        message: err?.response?.data?.msg || "Something is Wrong!",
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
              {...register("userName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
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
              {...register("contactNumber", {
                pattern: {
                  value: /^[6-9][0-9]{9}$/,
                  message: "Enter valid Mobile No",
                },
              })}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 cursor-pointer bg-black text-white font-medium rounded-xl shadow-lg hover:bg-black/90 transition"
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
          <a href="/login" className="text-black font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
