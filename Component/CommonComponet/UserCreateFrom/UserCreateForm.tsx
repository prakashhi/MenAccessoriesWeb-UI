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

export default function UserCreateForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditUserObjType>();

  const router = useRouter();
  const { loading } = useApi();

  const onSubmit: SubmitHandler<EditUserObjType> = async (info) => {
    const formData = new FormData();

    try {
      const res = await API.post("/signup", formData);

      notify({
        message: res.data.msg || "Registration is successful!",
        type: "success",
      });

      onClose();
      router.push("/login");
    } catch (err: any) {
      notify({
        message: err?.response?.data?.msg || "Something is Wrong!",
        type: "error",
      });
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="md"
      placement="center"
      classNames={{
        backdrop: "bg-black/70 backdrop-blur-sm backdrop-saturate-150",
        base: "mx-4 sm:mx-0 max-w-md ",
        wrapper: "overflow-hidden",
      }}
    >
      <ModalContent>
        <ModalBody className="p-0">
          <ModalHeader className="absolute top-4 right-5 p-0 z-10">
            <button
              onClick={onClose}
              className="text-gray-500 cursor-pointer hover:text-black   transition text-xl"
              aria-label="Close"
            >
              ×
            </button>
          </ModalHeader>
          {/* ORIGINAL UI — UNCHANGED */}
          <div className="w-full backdrop-blur-xl bg-white shadow-2xl rounded-3xl p-8 space-y-8">
            {/* BRAND */}
            <div className="text-center">
              <h1 className="text-4xl font-serif tracking-widest text-black">
                RockRoars
              </h1>
            </div>

            {/* FORM */}
            <form className="space-y-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
              {/* FirstName */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
                  {...register("userFirstName", {
                    required: "First name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                />
                {errors.userFirstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userFirstName.message}
                  </p>
                )}
              </div>

              {/* LastName */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
                  {...register("userLastName", {
                    required: "Last name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                />
                {errors.userLastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userLastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-3 bg-white/60 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70 transition"
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

              {/* Mobile */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Mobile No
                </label>
                <input
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

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 bg-black text-white rounded-xl"
              >
                {loading ? (
                  <Image width={20} height={20} src={Loader} alt="loading" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
