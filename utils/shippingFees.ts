export type ShippingOrder = {
  order_value: number;
  charge: number;
  Countries?: string; // present only for the embedded Dubai section
};

export type ShippingGroup = {
  Countries: string;
  orders: ShippingOrder[];
};

export const ShippingCharge: ShippingGroup[] = [

  {
    Countries: "India",
    orders: [
      {
        order_value: 50000,
        charge: 950,
      },
      {
        order_value: 100000,
        charge: 1950,
      },
      {
        order_value: 200000,
        charge: 2500,
      },
      {
        order_value: 500000,
        charge: 3000,
      }
    ],
  },
  {
    Countries: "USA/CANADA/UK/ OTHER EUROPEAN COUNTRIES",
    orders: [
      {
        order_value: 35000,
        charge: 5450,
      },
      {
        order_value: 50000,
        charge: 7250,
      },
      {
        order_value: 75000,
        charge: 8950,
      },
      {
        order_value: 100000,
        charge: 9850,
      },
      {
        order_value: 150000,
        charge: 12500,
      },
      {
        order_value: 200000,
        charge: 15500,
      },
      {
        order_value: 300000,
        charge: 18500,
      },
      {
        order_value: 400000,
        charge: 22500,
      },
      {
        order_value: 500000,
        charge: 24500,
      },
    ],
  },

  {
    Countries: "Australia/ New Zealand",
    orders: [
      {
        order_value: 35000,
        charge: 5450,
      },
      {
        order_value: 50000,
        charge: 7250,
      },
      {
        order_value: 75000,
        charge: 8950,
      },
      {
        order_value: 100000,
        charge: 9850,
      },
      {
        order_value: 150000,
        charge: 12500,
      },
      {
        order_value: 200000,
        charge: 15500,
      },
      {
        order_value: 300000,
        charge: 18500,
      },
      {
        order_value: 400000,
        charge: 22500,
      },
      {
        order_value: 500000,
        charge: 24500,
      },
    ],
  },

  {
    Countries: "Singapore / Malasia / Sri Lanka",
    orders: [
      {
        order_value: 35000,
        charge: 4250,
      },
      {
        order_value: 50000,
        charge: 5650,
      },
      {
        order_value: 75000,
        charge: 7200,
      },
      {
        order_value: 100000,
        charge: 8450,
      },
      {
        order_value: 150000,
        charge: 9850,
      },
      {
        order_value: 200000,
        charge: 12250,
      },
      {
        order_value: 300000,
        charge: 14500,
      },
      {
        order_value: 400000,
        charge: 17800,
      },
      {
        order_value: 500000,
        charge: 19500,
      },
      {
        Countries: "Dubai",
        order_value: 35000,
        charge: 4950,
      },
      {
        order_value: 50000,
        charge: 6500,
      },
      {
        order_value: 75000,
        charge: 8000,
      },
      {
        order_value: 100000,
        charge: 8800,
      },
      {
        order_value: 150000,
        charge: 11100,
      },
      {
        order_value: 200000,
        charge: 13800,
      },
      {
        order_value: 300000,
        charge: 16500,
      },
      {
        order_value: 400000,
        charge: 20000,
      },
      {
        order_value: 500000,
        charge: 21800,
      },
    ],
  },
  {
    Countries: "MAURITIUS",
    orders: [
      {
        order_value: 35000,
        charge: 6250,
      },
      {
        order_value: 50000,
        charge: 8350,
      },
      {
        order_value: 75000,
        charge: 10200,
      },
      {
        order_value: 100000,
        charge: 11250,
      },
      {
        order_value: 150000,
        charge: 14200,
      },
      {
        order_value: 200000,
        charge: 17550,
      },
      {
        order_value: 300000,
        charge: 20950,
      },
      {
        order_value: 400000,
        charge: 25550,
      },
      {
        order_value: 500000,
        charge: 27500,
      },
    ],
  },

  {
    Countries: "Rest Of the World",
    orders: [
      {
        order_value: 35000,
        charge: 5450,
      },
      {
        order_value: 50000,
        charge: 7250,
      },
      {
        order_value: 75000,
        charge: 8950,
      },
      {
        order_value: 100000,
        charge: 9850,
      },
      {
        order_value: 150000,
        charge: 12500,
      },
      {
        order_value: 200000,
        charge: 15500,
      },
      {
        order_value: 300000,
        charge: 18500,
      },
      {
        order_value: 400000,
        charge: 22500,
      },
      {
        order_value: 500000,
        charge: 24500,
      },
    ],
  },
];

export function calculateShippingCharge(
  subtotal: number,
  countryName: string
): number {
  const normalized = (countryName || "").trim().toLowerCase();

  if (!Number.isFinite(subtotal) || subtotal <= 0) return 0;

  function isDubai(): boolean {
    return ["dubai", "uae", "united arab emirates"].some(
      (k) => normalized === k
    );
  }

  function isAusNz(): boolean {
    return ["australia", "new zealand"].some((k) => normalized === k);
  }

  function isSingMalSri(): boolean {
    return ["singapore", "malaysia", "malasia", "sri lanka"].some(
      (k) => normalized === k
    );
  }

  function isUsCaUkEu(): boolean {
    const euCountries = [
      "germany",
      "france",
      "italy",
      "spain",
      "netherlands",
      "belgium",
      "sweden",
      "norway",
      "denmark",
      "finland",
      "ireland",
      "poland",
      "austria",
      "switzerland",
      "portugal",
      "czech",
      "greece",
      "hungary",
      "portugal",
      "romania",
      "croatia",
      "bulgaria",
      "slovakia",
      "lithuania",
      "slovenia",
      "latvia",
      "estonia",
      "luxembourg",
      "malta",
      "cyprus",
    ];
    return (
      [
        "usa",
        "united states",
        "united states of america",
        "canada",
        "uk",
        "united kingdom",
      ].some((k) => normalized === k) ||
      euCountries.some((k) => normalized === k)
    );
  }

  function isMauritius(): boolean {
    return ["mauritius"].some((k) => normalized === k);
  }

  function isIndia(): boolean {
    return ["india", "bharat"].some((k) => normalized === k);
  }

  function calculateDomesticIndia(sub: number): number {
    if (sub < 50000) return 950;
    if (sub < 100000) return 1950;
    if (sub < 200000) return 2500;

    // added by me because i don't get the shiping charges for above 200000
    return 3000 ;
  }

  if (isIndia()) {
    return calculateDomesticIndia(subtotal);
  }

  // Select the appropriate table (international)
  let table: ShippingOrder[] | undefined;

  // Special case: Dubai nested inside Singapore/Malasia/Sri Lanka group
  if (isDubai()) {
    const group = ShippingCharge.find((g) =>
      g.Countries.toLowerCase().includes("singapore")
    );
    if (group && Array.isArray(group.orders)) {
      // In provided data, Dubai entries start where an inner object includes Countries === 'Dubai'
      const startIdx = group.orders.findIndex((o) =>
        Boolean(o.Countries && o.Countries.toLowerCase().includes("dubai"))
      );
      if (startIdx !== -1) {
        table = group.orders.slice(startIdx);
      }
    }
  }

  if (!table && isAusNz()) {
    const g = ShippingCharge.find((g) =>
      g.Countries.toLowerCase().includes("australia")
    );
    if (g && Array.isArray(g.orders)) table = g.orders;
  }

  if (!table && isSingMalSri()) {
    const g = ShippingCharge.find((g) =>
      g.Countries.toLowerCase().includes("singapore")
    );
    if (g && Array.isArray(g.orders)) {
      // Exclude nested Dubai marker if present
      const cut = g.orders.findIndex((o) => Boolean(o.Countries));
      table = cut === -1 ? g.orders : g.orders.slice(0, cut);
    }
  }

  if (!table && isUsCaUkEu()) {
    const g = ShippingCharge.find((g) =>
      g.Countries.toLowerCase().includes("european")
    );
    if (g && Array.isArray(g.orders)) table = g.orders;
  }

  if (!table && isMauritius()) {
    const g = ShippingCharge.find((g) =>
      g.Countries.toLowerCase().includes("mauritius")
    );
    if (g && Array.isArray(g.orders)) table = g.orders;
  }

  // Check for Pakistan and return 0 (not supported)
  if (normalized === "pakistan") {
    return 0;
  }

  if (!table) {
    const g = ShippingCharge.find((g) =>
      g.Countries.toLowerCase().includes("rest of the world")
    );
    if (g && Array.isArray(g.orders)) table = g.orders;
  }

  if (!table || table.length === 0) return 0;

  // Pick the bracket with the highest min_order_value <= subtotal
  const sorted = [...table].sort((a, b) => a.order_value - b.order_value);
  let selected = sorted[0];
  for (const bracket of sorted) {
    if (subtotal >= bracket.order_value) selected = bracket;
    else break;
  }
  return selected.charge;
}