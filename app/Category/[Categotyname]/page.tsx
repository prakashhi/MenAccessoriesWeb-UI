"use client";
import { useParams } from "next/navigation";

export default async function page() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <div>Casterofy{params?.Categotyname}</div>
    </>
  );
}
