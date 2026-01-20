
export const ImageShowUtil = (imgData?: string | null): string => {
  const fallback = "/Images/placeholder2.png";

  if (!imgData || typeof imgData !== "string") {
    return fallback;
  }

  // Remove empty segments caused by leading/trailing slashes
  const images = imgData
    .split("/")
    .map((img) => img.trim())
    .filter(Boolean);

  // No valid images
  if (images.length === 0) {
    return fallback;
  }

  // Always use the first image
  const firstImage = images[0];

  return `${process.env.NEXT_PUBLIC_IMG_URL}${firstImage}`;
};
export const hasCountryCode = (number: string) => {
  // starts with + and has 1–3 digit country code
  return /^\+\d{1,3}/.test(number);
};


