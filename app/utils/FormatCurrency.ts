export function formatIndianPrice(amount: number): string {
  if (!amount && amount !== 0) return "0";

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format((amount * 10))}
