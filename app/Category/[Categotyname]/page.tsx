"use client";
import Nav from "@/app/Component/NavBar/Nav";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <Nav />
      <div>Casterofy{params?.Categotyname}</div>
    </>
  );
}
