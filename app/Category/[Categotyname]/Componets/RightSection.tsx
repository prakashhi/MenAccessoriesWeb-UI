import CardModel from "@/app/Component/ProductList/CardModel";
import { ProductData } from "@/app/Component/ProductList/ProductData";
import { useCallback, useEffect, useState } from "react";

export default function RightSection({ CategoryName }) {
  const filterDataOption = ["Sotrt"];
  const [categotyList, setCategotyList] = useState([]);

  const getData = useCallback(() => {
    let res = ProductData.filter((val) => val.category == CategoryName);
    setCategotyList(res);
  }, []);

  useEffect(() => {
    getData();
  }, []);

 
  return (
    <>
      <div className="">
        <div>
          <select name="" id="">
            <option value="">gdsahj</option>
          </select>
        </div>

        <div className="grid grid-cols-3    w-full">
          <CardModel DataObj={categotyList[0]?.products} />
        </div>
      </div>
    </>
  );
}
