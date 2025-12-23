"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { ArrowLeft } from "lucide-react";
import { useApi } from "@/app/useApi";
import Loader from "@/public/svg/tube-spinner.svg";
import Image from "next/image";
import { notify } from "../../Component/ToastComponent";

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

export default function ChangePassword({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [showPass, setShowPass] = useState(false);

  const { callApi, loading } = useApi();

  const onSubmit = async (data: FormValues) => {


    let res = await callApi("patch", "/user/change-password", {
      data: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
    });

    if (res.success == true) {
      notify({
        message: res.message || "Password changed successfully",
        type: "success",
      });
      onClose();
    }
  };

  return (
    <div className="col-span-full">
      <div className="relative">
        <button
          type="button"
          onClick={() => onClose()}
          className="inline-flex relative right-5 py-4 underline items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition"
        >
          <ArrowLeft size={10} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* OLD PASSWORD */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
          />
          {errors.oldPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* NEW PASSWORD */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 6 characters required",
                },
                validate: (value, formValues) =>
                  value !== formValues.oldPassword ||
                  "New password must be different from old password",
              })}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
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

          {errors.newPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className=" cursor-pointer w-full md:w-auto px-8 py-3 border rounded-lg text-black hover:bg-black hover:text-white transition disabled:opacity-50"
        >
          {loading ? (
            <Image width={20} height={20} alt="Loading" src={Loader} />
          ) : (
            "Change Password"
          )}
        </button>
      </div>
    </div>
  );
}
