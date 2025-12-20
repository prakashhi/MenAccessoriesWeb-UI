
  export const ImageShowUtil = (imgData?: string | null): string => {
    if (!imgData || typeof imgData !== "string") {
      return "/images/placeholder.webp"; // fallback image
    }

    const parts = imgData.split("/");

    if (parts.length < 2) {
      return "/images/placeholder.webp";
    }

    return `${process.env.NEXT_PUBLIC_IMG_URL}${parts[1]}`;
  };

