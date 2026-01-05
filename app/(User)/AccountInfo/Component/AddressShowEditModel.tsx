"use client";

import { useEffect, useMemo } from "react";
import { CountryCode } from "@/utils/CountryCode";
import { CountryListWithState } from "@/utils/CountryListWithState";

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
};

const countryCodeMap = new Map(CountryCode.map((c) => [c.code, c]));

export default function CountryStateField({
  register,
  watch,
  setValue,
  errors,
  grid = {},
}: Props) {
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

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Country */}
      <div className={layout.country}>
        <label className="text-sm font-medium">Country</label>
        <select {...register("country")} className="profile-input">
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
          <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>
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
        <label className="text-sm font-medium">State</label>
        <select
          {...register("state")}
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
      </div>

      {/* Pin Code */}
      <div className={layout.pinCode}>
        <label className="text-sm font-medium">Pin Code</label>
        <input
          {...register("pinCode", {
            pattern: {
              value: /^[A-Za-z0-9\s-]{3,10}$/,
              message: "Enter valid postal / zip code",
            },
          })}
          className="profile-input"
        />
        {errors?.pinCode && (
          <p className="text-xs text-red-500 mt-1">{errors.pinCode.message}</p>
        )}
      </div>
    </div>
  );
}
