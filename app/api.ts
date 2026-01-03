import axios from "axios";

import { getAuthData } from "@/utils/localStorageUtil";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    const token = getAuthData("Token");
    const authToken = JSON.parse(token);

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    if (config.responseType === "blob") {
      return config;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
