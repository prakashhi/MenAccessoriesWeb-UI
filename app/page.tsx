import Nav from "@/Component/NavBar/Nav";

import Header from "@/Component/Header/Header";
import Product from "@/Component/ProductList/Products";
import Footer from "@/Component/Footer/Footer";
import ImageCarousel from "@/Component/Header/Component/ImageCarousel";

 // export const menCategoryId = ["3e1ae7d6-97aa-4068-9fbe-7c64b73525c1"];
export const menCategoryId = [];
export const WhatsAppNumber = "9427599999";

export default function Home() {
  return (
    <>
      <Nav />
      <Header />
      <ImageCarousel />
      <Product />
      <Footer />
    </>
  );
}
