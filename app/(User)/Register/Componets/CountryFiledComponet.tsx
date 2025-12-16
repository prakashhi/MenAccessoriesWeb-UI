"use client";

import { useEffect } from "react";
import { CountryCode } from "@/app/utils/CountryCode";
import { CountryListWithState } from "@/app/utils/CountryListWithState";

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

  // 🔹 Auto set country code & label
  useEffect(() => {
    if (!selectedCountry) return;

    const countryCodeData = CountryCode.find((c) => c.name === selectedCountry);

    if (countryCodeData) {
      setValue("countryCode", countryCodeData.dial_code);
      setValue("countryCodeLabel", countryCodeData.code);
    } else {
      setValue("countryCode", "");
      setValue("countryCodeLabel", "");
    }
  }, [selectedCountry, setValue]);

  // 🔹 Get states of selected country
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
          {CountryListWithState.map((country) => (
            <option key={country.iso2} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        {errors?.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* COUNTRY CODE */}
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

        {/* COUNTRY CODE LABEL */}
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
            required: states.length ? "State is required" : false,
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
          <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
        )}
      </div>
    </>
  );
}
