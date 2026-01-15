export function formatIndianPrice(amount: number): string {
  if (!amount && amount !== 0) return "0";

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PriceShowFunction(
  code: string,
  price: number,
  qty: number = 1,
  NumberTypeReturn: boolean = false
) {
  const basePrice = code && code.trim() !== "" ? Number(code) * 10 : price;

  if (NumberTypeReturn === true) {
    return basePrice * qty;
  } else {
    return formatIndianPrice(basePrice * qty);
  }
}
