"use client";

import { useEffect, useState, useCallback, useRef } from "react";

import { menProductData } from "@/Type/Types";
import { UsePanel } from "@/context/Context";

const LIMIT = 40;

export function useInfiniteProductsOffset() {
  const [products, setProducts] = useState<menProductData[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { MenCategoryList, menProductFilter } = UsePanel();

  const requestIdRef = useRef(0);

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    const requestId = ++requestIdRef.current;

    setLoading(true);

    const finalFilter = {
      ...menProductFilter,
      categoryIds:
        menProductFilter.categoryIds && menProductFilter.categoryIds.length > 0
          ? menProductFilter.categoryIds
          : ["3e1ae7d6-97aa-4068-9fbe-7c64b73525c1"],
    };

    console.log("finalFilter", finalFilter);
    const res = await MenCategoryList({
      ...finalFilter,
      offset: offset,
      limit: LIMIT,
    });

    if (requestId !== requestIdRef.current) return;

    let data = res?.success ? res.data.data : [];
     console.log("DataFilter",data)

    if (res.success && hasMore == true) {
      setProducts((prev) => [...prev, ...data]);
    }

    // 👇 important logic
    if (data.length < LIMIT) {
      setHasMore(false);
    } else {
      setOffset((prev) => prev + 1);
    }

    setLoading(false);
  }, [offset, loading, hasMore]);

  // reset when filter changes
  useEffect(() => {
    requestIdRef.current++;
    setProducts([]);
    setOffset(0);
    setHasMore(true);
  }, [menProductFilter]);

  useEffect(() => {
    fetchProducts();
  }, [menProductFilter]);

  return { products, fetchProducts, loading, hasMore };
}
