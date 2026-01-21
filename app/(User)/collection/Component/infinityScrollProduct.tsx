"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { menProductData } from "@/Type/Types";
import { UsePanel } from "@/context/Context";
import { useParams } from "next/navigation";

import { menCategoryId } from "@/app/page";
import { usePathname } from "next/navigation";

const LIMIT = 40;

export function useInfiniteProductsOffset() {
  const params = useParams();
  const [products, setProducts] = useState<menProductData[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const { MenCategoryList, menProductFilter, setMenProductFilter } = UsePanel();

  const requestIdRef = useRef(0);
  const prevFilterRef = useRef(menProductFilter);
  const pathname = usePathname();

  // Function to reset everything when filters change
  const resetState = useCallback(() => {
    requestIdRef.current++;
    setProducts([]);
    setOffset(0);
    setHasMore(true);
    setLoading(false);
    prevFilterRef.current = menProductFilter;
  }, [menProductFilter]);

  useEffect(() => {
    //reset filter after pathChange
    setMenProductFilter((prev) => {
      if (!prev) {
        return {
          minPrice: 0,
          maxPrice: 0,
          priceLabel: "",
          categoryIds: [],
          materialIds: [],
          keyword: "",
        };
      }

      if (
        prev.minPrice === 0 &&
        prev.maxPrice === 0 &&
        prev.priceLabel === "" &&
        prev.categoryIds?.length === 0 &&
        prev.materialIds?.length === 0 &&
        prev.keyword === ""
      ) {
        return prev; // already reset
      }

      return {
        minPrice: 0,
        maxPrice: 0,
        priceLabel: "",
        categoryIds: [],
        materialIds: [],
        keyword: "",
      };
    });
  }, [pathname]);

  // Compare current filter with previous filter to detect changes
  const hasFilterChanged = useCallback(() => {
    return (
      JSON.stringify(menProductFilter) !== JSON.stringify(prevFilterRef.current)
    );
  }, [menProductFilter]);

  const fetchProducts = useCallback(async () => {
    if (loading) return;

    // Reset if filter has changed
    if (hasFilterChanged()) {
      resetState();
      // Don't fetch immediately - let the useEffect handle it
      return;
    }

    if (!hasMore) return;

    const requestId = ++requestIdRef.current;
    setLoading(true);

    const categoryIds =
      menProductFilter.categoryIds && menProductFilter.categoryIds?.length > 0
        ? menProductFilter.categoryIds
        : params.categoryId
        ? [`${params.categoryId}`]
        : menCategoryId;

        const { priceLabel, ...queryParams } = menProductFilter;

    const res = await MenCategoryList({
      ...queryParams,
      categoryIds,
      offset: offset,
      limit: LIMIT,
    });

    if (requestId !== requestIdRef.current) return;

    let data = res?.success && res.data ? res.data.data : [];
    let total = res.success && res.data ? res.data.total : 0;

    if (res.success) {
      setProducts((prev) => {
        // If offset is 0, replace the data
        if (offset === 0) {
          return data;
        }
        // Otherwise append to existing data
        return [...prev, ...data];
      });

      setTotalProduct(total);
    }

    // Update pagination state
    if (data.length < LIMIT) {
      setHasMore(false);
    } else {
      setOffset((prev) => prev + 1);
    }

    setLoading(false);
  }, [offset, loading, hasMore, hasFilterChanged, resetState]);

  // Effect to handle filter changes
  useEffect(() => {
    if (hasFilterChanged()) {
      resetState();

      // Fetch with new filter after reset
      const timer = setTimeout(() => {
        fetchProducts();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [menProductFilter, hasFilterChanged, resetState, fetchProducts]);

  // Effect to handle initial load and scroll
  useEffect(() => {
    if (
      !hasFilterChanged() &&
      offset === 0 &&
      products.length === 0 &&
      hasMore &&
      !loading
    ) {
      fetchProducts();
    }
  }, [
    offset,
    hasFilterChanged,
    products.length,
    hasMore,
    loading,
    fetchProducts,
  ]);

  return {
    products,
    fetchProducts,
    loading,
    hasMore,
    totalProduct,
    resetState,
  };
}
