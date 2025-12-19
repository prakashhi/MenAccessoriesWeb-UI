import { useState } from "react";
import { AxiosRequestConfig } from "axios";

import API from "./api";
import { notify } from "./(User)/Component/ToastComponent";
import { showErrorOnce } from "./utils/apiErrorGuard";

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
    method: "get" | "post" | "put" | "delete" | "patch",
    url: string,
    config?: AxiosRequestConfig
  ) => {
    setLoading(true);
    setError(null);

    console.log(config);

    try {
      let response;

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
        case "patch":
          response = await API.patch(url, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      setData(response.data);

      return response.data;
    } catch (err: any) {
      let errorMsg;
      errorMsg = err.response?.data?.message || err.message;

      setError(errorMsg);
        console.log(err.response.data)

      notify({
        message: errorMsg,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, callApi };
}
