import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

import API from "./api";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async (
    method: "get" | "post" | "put" | "delete",
    url: string,
    config?: AxiosRequestConfig
  ) => {
    setError(null);

   
    try {
      let response;

      setLoading(true);
      switch (method) {
        case "get":
          response = await API.get(url, config);
          break;
        case "post":
          response = await API.post(url, config?.data, config);
          break;
        case "put":
          response = await API.put(url, config?.data, config);
          break;
        case "delete":
          response = await API.delete(url, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setData(response.data);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message;
      setError(errorMsg);
      setData(null);
      // ❗ DO NOT throw — avoids double toast
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, callApi };
}
