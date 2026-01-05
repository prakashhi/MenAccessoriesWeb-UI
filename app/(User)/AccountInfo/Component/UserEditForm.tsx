"use client";

import { useForm } from "react-hook-form";

import CountryField from "@/app/(User)/register/Component/CountryFiledComponent";
import API from "@/app/api";
import { notify } from "@/Component/ToastComponent";
import Loader from "@/public/svg/tube-spinner.svg";
import Image from "next/image";
import { setAuthData } from "@/utils/localStorageUtil";
import { UsePanel } from "@/context/Context";

type FormValues = {
  userFirstName: string;
  userLastName: string;
  contactNumber: string;
  email: string;
};

export default function UserEditForm({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      userFirstName: user.info.userFirstName,
      userLastName: user.info.userLastName,
      email: user.info.email,
      contactNumber: user.info.contactNumber,
    },
  });

  const { UserTrigger } = UsePanel();

  const onSubmit = async (data: FormValues) => {
    if (!isDirty) {
      notify({
        message: "No changes detected",
        type: "info",
      });
      return;
    }
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (!value) return;
      if (key === "profileImage") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      let res = await API.patch(`/user/${user.info.id}`, formData);

      if (res.status == 200) {
        notify({
          message: "User Edited Successfully",
          type: "success",
        });

        localStorage.removeItem("UserData");
        setAuthData(
          "UserData",
          JSON.stringify(res.data.data),
          24 * 60 * 60 * 1000
        );
        //localStorage.setItem("UserData", JSON.stringify(res.data.data));
        UserTrigger();
        onClose();
      }
    } catch (err: any) {
      let message = err.msg || err.message || "Something is Wrong";

      notify({
        message: message,
        type: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2"
      >
        {" "}
        <div>
          <label className="text-sm text-gray-500">First name</label>
          <input
            type="text"
            className="profile-input"
            placeholder="John Doe"
            {...register("userFirstName", { required: "Name is required" })}
          />
          {errors.userFirstName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.userFirstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm text-gray-500">Last name</label>
          <input
            type="text"
            className="profile-input"
            placeholder="John Doe"
            {...register("userLastName", { required: "Name is required" })}
          />
          {errors.userLastName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.userLastName.message}
            </p>
          )}
        </div>
        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            {...register("email", {
              required: "Email required",
              pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
            })}
            className="profile-input"
          />

          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* PHONE */}
        <div>
          <label className="text-sm text-gray-500">Phone</label>
          <input
            {...register("contactNumber", {
              pattern: {
                value: /^[6-9][0-9]{9}$/,
                message: "Enter valid Mobile No",
              },
            })}
            className="profile-input"
          />
          {errors.contactNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.contactNumber.message}
            </p>
          )}
        </div>
        {/* PIN CODE */}
        {/* <div>
          <label className="text-sm text-gray-500">Pin Code</label>
          <input
            {...register("pinCode", {
              pattern: {
                value: /^[A-Za-z0-9\s-]{3,10}$/,
                message: "Enter valid postal / zip code",
              },
            })}
            className="profile-input"
          />
          {errors.pinCode && (
            <p className="text-xs text-red-500 mt-1">
              {errors.pinCode.message}
            </p>
          )}
        </div> */}
        {/* ADDRESS */}
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-500">Address</label>
          <textarea
            rows={3}
            {...register("address")}
            className="profile-input"
          />
        </div>
        <div className="sm:col-span-2">
          <CountryField
            register={register}
            watch={watch}
            setValue={setValue}
            grid={{
              country: "col-span-6",
              state: "col-span-6",
              code: "col-span-6",
              label: "col-span-6",
            }}
          />
        </div>
        {/* ACTION BUTTONS */}
        <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer sm:w-auto px-4 py-2 border rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-4 py-2 cursor-pointer bg-black text-white rounded-md text-sm"
          >
            {isSubmitting ? (
              <Image width={20} height={20} alt="Loading" src={Loader} />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
