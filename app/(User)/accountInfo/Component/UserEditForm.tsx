"use client";

import { useForm } from "react-hook-form";
import { parsePhoneNumber } from "awesome-phonenumber";
import { notify } from "@/Component/ToastComponent";
import Loader from "@/public/svg/tube-spinner.svg";
import Image from "next/image";
import { UsePanel } from "@/context/Context";
import { useMemo } from "react";
import { getUserFromStorage } from "@/context/utils";
import { CountryCode } from "@/utils/CountryCode";
import { CountryListWithState } from "@/utils/CountryListWithState";

type FormValues = {
  userFirstName: string;
  userLastName: string;
  contactNumber: string;
  email: string;
  country: string;
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
  const countryCodeMap = new Map(
    CountryCode.map((c) => [c.code, { ...c, dial_code: c.dial_code }]),
  );

  const countryName = watch("country");

  getUserFromStorage;

  const userData = useMemo(() => getUserFromStorage(), []);

  const { UserTrigger, EditUserDetail, userDataContext } = UsePanel();

  const countryObj = useMemo(
    () => CountryListWithState.find((c) => c.name === countryName),
    [countryName],
  );

  const onSubmit = async (data: FormValues) => {
    if (!isDirty) {
      notify({
        message: "No changes detected",
        type: "info",
      });
      return;
    }

    try {
      let res = await EditUserDetail(userData.id, data);

      if (res.success == true) {
        notify({
          message: "User Edited Successfully",
          type: "success",
        });

        // localStorage.removeItem("UserData");
        // setAuthData(
        //   "UserData",
        //   JSON.stringify(res.data.data),
        //   24 * 60 * 60 * 1000
        // );
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
          <div className="grid grid-cols-3 gap-3  ">
            {/* <select
              {...register("country", { required: "Country is required" })}
              className="profile-input col-span-1"
            >
              <option value="">Select Country</option>
              {CountryListWithState.map((c) => {
                const extra = countryCodeMap.get(c.iso2);
                return (
                  <option key={c.iso2} value={c.name}>
                    {extra?.emoji && `${extra.emoji} `} {c.name} (
                    {extra?.dial_code})
                  </option>
                );
              })}
            </select> */}
            <input
              {...register("contactNumber", {
                required: "ContactNumber is required",
                // validate: (value: string) => {
                //   const pn = parsePhoneNumber(value, {
                //     regionCode: countryObj?.iso2,
                //   });
                //   if ((pn.valid || pn.possible) && pn.typeIsMobile) {
                //     return true;
                //   }
                //   return "Please enter a valid mobile number";
                // },
                pattern: {
                  value: /^\+?[0-9]{7,15}$/,
                  message: "Enter a valid mobile number",
                },
              })}
              className="profile-input col-span-2"
            />
          </div>

          {errors.contactNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.contactNumber.message}
            </p>
          )}
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
