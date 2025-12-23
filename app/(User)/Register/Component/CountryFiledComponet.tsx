"use client";

import { useEffect, useMemo } from "react";
import { CountryCode } from "@/app/utils/CountryCode";
import { CountryListWithState } from "@/app/utils/CountryListWithState";

type GridConfig = {
  country?: string;
  state?: string;
  code?: string;
  label?: string;
};

type Props = {
  register: any;
  watch: any;
  setValue: any;
  errors?: any;

  /** Tailwind grid control */
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

  const countryObj = useMemo(() => {
    return CountryListWithState.find((c) => c.name === countryName);
  }, [countryName]);

  useEffect(() => {
    if (!countryObj) return;

    const extra = countryCodeMap.get(countryObj.iso2);

    setValue("countryCode", extra?.dial_code || "", {
      shouldDirty: true,
    });
    setValue("countryCodeLabel", extra?.code || "", {
      shouldDirty: true,
    });
  }, [countryObj, setValue]);

  const states = countryObj?.states || [];

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* COUNTRY */}
      <div className={grid.country || "col-span-12 sm:col-span-6"}>
        <label className="text-sm font-medium">Country</label>
        <select {...register("country")} className="profile-input">
          <option value="">Select Country</option>
          {CountryListWithState.map((c) => {
            const extra = countryCodeMap.get(c.iso2);
            return (
              <option key={c.iso2} value={c.name}>
                {extra?.emoji && `${extra.emoji} `}
                {c.name}
              </option>
            );
          })}
        </select>
        {errors?.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      {/* STATE */}
      <div className={grid.state || "col-span-12 sm:col-span-6"}>
        <label className="text-sm font-medium">State</label>
        <select
          {...register("state")}
          disabled={!states.length}
          className="profile-input"
        >
          <option value="">
            {states.length ? "Select State" : "No states"}
          </option>
          {states.map((s) => (
            <option key={s.state_code} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* COUNTRY CODE */}
      <div className={grid.code || "col-span-12 sm:col-span-6"}>
        <label className="text-sm font-medium">Country Code</label>
        <input
          readOnly
          {...register("countryCode")}
          className="profile-input"
        />
      </div>

      {/* COUNTRY LABEL */}
      <div className={grid.label || "col-span-12 sm:col-span-6"}>
        <label className="text-sm font-medium">Country Label</label>
        <input
          readOnly
          {...register("countryCodeLabel")}
          className="profile-input "
        />
      </div>
    </div>
  );
}
