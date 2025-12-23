export const ImageShowUtil = (imgData?: string | null): string => {
  const fallback = "/Images/placeholder2.png";
  if (!imgData || typeof imgData !== "string") {
    return fallback; // fallback image
  }

  const parts = imgData.split("/");

  if (parts.length < 2) {
    return fallback;
  }

  return `${process.env.NEXT_PUBLIC_IMG_URL}${parts[1]}`;
};
