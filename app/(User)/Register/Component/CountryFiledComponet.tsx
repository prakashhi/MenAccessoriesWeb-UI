"use client";

import { useEffect } from "react";
import { CountryCode } from "@/app/utils/CountryCode";
import { CountryListWithState } from "@/app/utils/CountryListWithState";

const countryCodeByISO2 = new Map(
  CountryCode.map((c) => [c.code, c])
);

interface Props {
  register: any;
  watch: any;
  setValue: any;
  errors?: any;
}

export default function CountryField({
  register,
  watch,
  setValue,
  errors,
}: Props) {
  const selectedCountry = watch("country");

  // 🔹 Auto set dial code & country code label
  useEffect(() => {
    if (!selectedCountry) return;

    const country = CountryListWithState.find(
      (c) => c.name === selectedCountry
    );

    if (!country) return;

    const extra = countryCodeByISO2.get(country.iso2);

    if (extra) {
      setValue("countryCode", extra.dial_code); // +971
      setValue("countryCodeLabel", extra.code); // AE
    } else {
      setValue("countryCode", "");
      setValue("countryCodeLabel", "");
    }
  }, [selectedCountry, setValue]);

  // 🔹 States
  const states =
    CountryListWithState.find((c) => c.name === selectedCountry)?.states || [];

  return (
    <>
      {/* COUNTRY */}
      <div>
        <label className="text-sm font-medium text-gray-700">Country</label>

        <select
          className="w-full mt-1 px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70"
          {...register("country")}
        >
          <option value="">Select Country</option>

          {CountryListWithState.map((country) => {
            const extra = countryCodeByISO2.get(country.iso2);

            return (
              <option key={country.iso2} value={country.name}>
                {extra?.emoji ? `${extra.emoji} ` : ""}
                {country.name}
              </option>
            );
          })}
        </select>

        {errors?.country && (
          <p className="text-red-500 text-sm mt-1">
            {errors.country.message}
          </p>
        )}
      </div>

      {/* COUNTRY CODE + LABEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Country Code
          </label>
          <input
            readOnly
            className="w-full mt-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl"
            {...register("countryCode")}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Country Code Label
          </label>
          <input
            readOnly
            className="w-full mt-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl"
            {...register("countryCodeLabel")}
          />
        </div>
      </div>

      {/* STATE */}
      <div>
        <label className="text-sm font-medium text-gray-700">State</label>

        <select
          className="w-full mt-1 px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/70"
          {...register("state", {
            // required: states.length ? "State is required" : false,
          })}
          disabled={!states.length}
        >
          <option value="">
            {states.length ? "Select State" : "No states available"}
          </option>

          {states.map((state) => (
            <option key={state.state_code} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>

        {errors?.state && (
          <p className="text-red-500 text-sm mt-1">
            {errors.state.message}
          </p>
        )}
      </div>
    </>
  );
}
