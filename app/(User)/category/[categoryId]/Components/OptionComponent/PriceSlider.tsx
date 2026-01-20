"use client";

import { UsePanel } from "@/context/Context";
import { useState } from "react";
import { formatIndianPrice } from "@/utils/FormatCurrency";

export function PriceSlider({ onClose }: { onClose: () => void }) {
  const formatPrice = (value: number | null) => {
    if (value === null) return "";
    return new Intl.NumberFormat("en-IN").format(value);
  };

  const { setMenProductFilter, menProductFilter } = UsePanel();

  const MIN = 2000;
  const MAX = 300000;
  const GAP = 2000;

  const [minPrice, setMinPrice] = useState(menProductFilter.minPrice || MIN);
  const [maxPrice, setMaxPrice] = useState(menProductFilter.maxPrice);

  const [isMinActive, setIsMinActive] = useState<boolean | null>(null);

  const minPercent = ((minPrice - MIN) / (MAX - MIN)) * 100;
  const maxPercent = ((maxPrice - MIN) / (MAX - MIN)) * 100;

  const handleChangeSlider = () => {
    setMenProductFilter((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
      priceLabel: `${minPrice} - ${maxPrice}`,
    }));
  };

  // Generate options from MIN to MAX with GAP
  const priceOptions = [];
  for (let i = MIN; i <= MAX; i += GAP) {
    priceOptions.push(i);
  }

  // Snap a value to nearest GAP step
  const snapToStep = (
    value: number,
    step: number,
    min: number,
    max: number,
  ) => {
    const snapped = Math.round((value - min) / step) * step + min;
    return Math.min(Math.max(snapped, min), max);
  };

  return (
    <div className="px-5 lg:px-3 py-4">
      <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-4">
        Price
      </h3>

      {/* INPUTS */}
      <div className="flex gap-2 mb-4">
        {/* MIN PRICE SELECT */}
        <select
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
        >
          {priceOptions.map((price) => (
            <option
              key={price}
              value={price}
              disabled={price >= maxPrice} // prevent min >= max
            >
              {formatPrice(price)}
            </option>
          ))}
        </select>

        {/* MAX PRICE SELECT */}
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
        >
          {priceOptions.map((price) => (
            <option
              key={price}
              value={price}
              disabled={price <= minPrice} // prevent max <= min
            >
              {formatPrice(price)}
            </option>
          ))}
        </select>
      </div>

      {/* SLIDER */}
      <div className="relative h-2 bg-gray-200 rounded mb-6 pointer-events-none">
        {/* ACTIVE RANGE */}
        <div
          className="absolute h-2 bg-black rounded"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* MIN SLIDER */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minPrice}
          step={GAP} // important for snapping
          onTouchStart={() => setIsMinActive(true)}
          onTouchEnd={() => {
            setIsMinActive(null);
            handleChangeSlider();
            onClose();
          }}
          onMouseDown={() => setIsMinActive(true)}
          onMouseUp={() => {
            setIsMinActive(null);
            handleChangeSlider();
            onClose();
          }}
          onChange={(e) => {
            const snapped = snapToStep(
              +e.target.value,
              GAP,
              MIN,
              maxPrice - GAP,
            );
            setMinPrice(snapped);
          }}
          className={`absolute w-full h-2 appearance-none bg-transparent accent-black pointer-events-auto ${
            isMinActive ? "z-20" : "z-10"
          }`}
        />

        {/* MAX SLIDER */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxPrice}
          step={GAP} // snap max as well
          onTouchStart={() => setIsMinActive(false)}
          onTouchEnd={() => {
            setIsMinActive(null);
            handleChangeSlider();
            onClose();
          }}
          onMouseDown={() => setIsMinActive(false)}
          onMouseUp={() => {
            setIsMinActive(null);
            handleChangeSlider();
            onClose();
          }}
          onChange={(e) => {
            const snapped = snapToStep(
              +e.target.value,
              GAP,
              minPrice + GAP,
              MAX,
            );
            setMaxPrice(snapped);
          }}
          className={`absolute w-full h-2 appearance-none bg-transparent accent-black pointer-events-auto ${
            isMinActive === false ? "z-20" : "z-10"
          }`}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>₹{MIN}</span>
        <span>₹{formatIndianPrice(MAX)}</span>
      </div>
    </div>
  );
}
