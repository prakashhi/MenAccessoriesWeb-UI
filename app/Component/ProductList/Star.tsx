// "use client";

import "@smastrom/react-rating/style.css";
import { Rating, StickerStar, ThinStar } from "@smastrom/react-rating";

export default function ({ starNum }: { starNum: number }) {
  const style = {
    itemShapes: StickerStar,
    // itemShapes: ThinStar,
    activeFillColor: "#1a1a1a",
    inactiveFillColor: "#ffff",
  };
  return (
    <>
      <Rating
        style={{ width: "90px" }}
        spaceInside={"small"}
        value={starNum}
        readOnly
        items={5}
        itemStyles={style}
      />
    </>
  );
}
