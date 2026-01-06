"use client";

import { useEffect, useMemo } from "react";
import { CountryCode } from "@/utils/CountryCode";
import { CountryListWithState } from "@/utils/CountryListWithState";
import { ArrowLeft } from "lucide-react";
import Loader from "@/public/svg/tube-spinner.svg";
import Image from "next/image";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/Context";

import { FormValueAddressCreate } from "./CreateEditConfigAddressForm";

import { getUserFromStorage } from "@/context/utils";
import { notify } from "@/Component/ToastComponent";

type GridConfig = {
  country?: string;
  state?: string;
  code?: string;
  pinCode?: string;
};

type Props = {
  register: any;
  watch: any;
  setValue: any;
  errors?: any;
  grid?: GridConfig;
  onClose: () => void;
  typeOperation: "Create" | "Edit";
  isSubmitting: any;
  handleSubmit: any;
};

const countryCodeMap = new Map(CountryCode.map((c) => [c.code, c]));

export default function AddressShowEditModel({
  register,
  watch,
  setValue,
  errors,
  grid = {},
  typeOperation,
  onClose,
  isSubmitting,
  handleSubmit,
}: Props) {
  const { CreateUserAddress, UserTrigger } = UsePanel();
  const userData = useMemo(() => getUserFromStorage(), []);
  const countryName = watch("country");

  const countryObj = useMemo(
    () => CountryListWithState.find((c) => c.name === countryName),
    [countryName]
  );

  useEffect(() => {
    if (!countryObj) {
      setValue("state", "");
      setValue("countryCode", "");
      return;
    }

    const extra = countryCodeMap.get(countryObj.iso2);

    setValue("countryCode", extra?.dial_code || "", { shouldDirty: true });
    setValue("countryCodeLabel", extra?.code || "", { shouldDirty: true });
    setValue("state", "", { shouldDirty: true });
  }, [countryObj, setValue]);

  const states = countryObj?.states || [];

  const layout = {
    country: "col-span-12 md:col-span-6",
    code: "col-span-12 md:col-span-6",
    state: "col-span-12 md:col-span-6",
    pinCode: "col-span-12 md:col-span-6",
    ...grid,
  };

  const onSubmit = async (value: FormValueAddressCreate) => {
    if (typeOperation === "Create") {
      console.log(value);

      try {
        let res = await CreateUserAddress(value, userData.id);
        console.log("res", res);
        if (res.success == true) {
          notify({
            message: "Address Created Successfully",
            type: "success",
          });

          UserTrigger();
          onClose();
        }
      } catch (err: any) {
        notify({
          message: err.message,
          type: "warning",
        });
      }
    }
  };

  return (
    <>
      {typeOperation == "Create" && (
        <div className="flex gap-5 flex-col">
          <h3 className="text-xl font-semibold ">Add Address</h3>

          <button
            onClick={onClose}
            className="flex w-20 items-center pb-3 cursor-pointer gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4">
        {/* Email */}
        <div className={layout.pinCode}>
          <label className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^\S+@\S+$/,
                message: "Invalid email",
              },
            })}
            className="profile-input"
          />
          {errors?.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Contact Number */}
        <div className={layout.pinCode}>
          <label className="text-sm font-medium">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("contactNumber", {
              required: "Contact-Number required",
              pattern: {
                value: /^[6-9][0-9]{9}$/,
                message: "Enter valid Mobile No",
              },
            })}
            className="profile-input"
          />
          {errors?.contactNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        {/* AddressLine1 */}
        <div className={layout.pinCode}>
          <label className="text-sm text-gray-500">
            Address 1 <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            {...register("addressLine1", {
              required: "Address is required",
            })}
            className="profile-input"
          />

          {errors?.addressLine1 && (
            <p className="text-xs text-red-500 mt-1">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        {/* AddressLine2 */}
        <div className={layout.pinCode}>
          <label className="text-sm text-gray-500">Address 2</label>
          <textarea
            rows={3}
            {...register("addressLine2")}
            className="profile-input"
          />
        </div>

        {/* Country */}
        <div className={layout.country}>
          <label className="text-sm font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            {...register("country", { required: "Country is required" })}
            className="profile-input"
          >
            <option value="">Select Country</option>
            {CountryListWithState.map((c) => {
              const extra = countryCodeMap.get(c.iso2);
              return (
                <option key={c.iso2} value={c.name}>
                  {extra?.emoji && `${extra.emoji} `} {c.name}
                </option>
              );
            })}
          </select>
          {errors?.country && (
            <p className="text-xs text-red-500 mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Country Code */}
        <div className={layout.code}>
          <label className="text-sm font-medium">Country Code</label>
          <input
            readOnly
            {...register("countryCode")}
            className="profile-input"
          />
        </div>

        {/* State */}
        <div className={layout.state}>
          <label className="text-sm font-medium">
            State <span className="text-red-500">*</span>
          </label>
          <select
            {...register("state", { required: "State is required" })}
            disabled={!states.length}
            className="profile-input disabled:opacity-60"
          >
            <option value="">
              {states.length ? "Select State" : "No states available"}
            </option>
            {states.map((s) => (
              <option key={s.state_code} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors?.state && (
            <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>
          )}
        </div>

        {/* city */}
        <div className={layout.pinCode}>
          <label className="text-sm font-medium">
            City <span className="text-red-500">*</span>
          </label>
          <input
            {...register("city", {
              required: "City is required",
            })}
            className="profile-input"
          />
          {errors?.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* Pin Code */}
        <div className={layout.pinCode}>
          <label className="text-sm font-medium">
            Pin Code <span className="text-red-500">*</span>
          </label>
          <input
            {...register("pinCode", {
              required: "PinCode is required",
              pattern: {
                value: /^[A-Za-z0-9\s-]{3,10}$/,
                message: "Enter valid postal / zip code",
              },
            })}
            className="profile-input"
          />
          {errors?.pinCode && (
            <p className="text-xs text-red-500 mt-1">
              {errors.pinCode.message}
            </p>
          )}
        </div>
      </div>

      {typeOperation == "Create" && (
        <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <Button
            onPress={onClose}
            type="button"
            className="w-full cursor-pointer sm:w-auto px-4 py-2 border rounded-md text-sm"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-4 py-2 cursor-pointer bg-black text-white rounded-md text-sm"
          >
            {isSubmitting ? (
              <Image width={20} height={20} alt="Loading" src={Loader} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      )}
    </>
  );
}
