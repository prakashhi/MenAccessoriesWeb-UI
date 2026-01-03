"use client";

import "@smastrom/react-rating/style.css";
import { Rating, StickerStar } from "@smastrom/react-rating";

export default function StarRating({ starNum }: { starNum: number }) {
  const style = {
    itemShapes: StickerStar,
    activeFillColor: "#1a1a1a", // luxury dark fill
    inactiveFillColor: "#e5e5e5", // soft gray for unfilled stars
  };

  return (
    <div className="flex items-center gap-2">
      <Rating
        style={{ width: "60px", height: "22px" }}
        spaceInside="small"
        value={starNum}
        readOnly
        items={5}
        itemStyles={style}
      />
    </div>
  );
}
