type HoverImageProps = {
  imgData?: string | null;
  alt?: string;
  className?: string;
};

export const HoverImage = ({
  imgData,
  alt = "",
  className = "",
}: HoverImageProps) => {
  const fallback = "/Images/placeholder2.png";
  const baseUrl = process.env.NEXT_PUBLIC_IMG_URL ?? "";

  let images: string[] = [];

  if (typeof imgData === "string") {
    images = imgData
      .split("/")
      .map((i) => i.trim())
      .filter(Boolean)
      .map((i) => (i.startsWith("http") ? i : `${baseUrl}${i}`));
  }

  const mainImg = images[0] ?? fallback;
  const hoverImg = images[1] ?? mainImg;
  const hasHover = images.length > 1;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main Image */}
      <img
        src={mainImg}
        alt={alt}
        className={`
          w-full h-full object-cover
          transition-opacity duration-300
          ${hasHover ? "hover:opacity-0" : ""}
        `}
      />

      {/* Hover Image */}
      {hasHover && (
        <img
          src={hoverImg}
          alt={alt}
          className="
            absolute inset-0 w-full h-full object-cover
            opacity-0 transition-opacity duration-300
            hover:opacity-100
          "
        />
      )}
    </div>
  );
};
