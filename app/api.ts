// import axios from "axios";
// import { showErrorOnce } from "./utils/apiErrorGuard";
// import { getAuthData } from "./utils/localStorageUtil";

// const Token = JSON.parse(getAuthData("Token"));

// const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // your backend URL
//   headers: {
//     "Content-Type": "application/json",
//     // Authorization: `Bearer ${Token}`,
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
//   },
//   // withCredentials: true,
// });

// export default API;

import axios from "axios";
import { showErrorOnce } from "./utils/apiErrorGuard";
import { getAuthData } from "./utils/localStorageUtil";

const token = getAuthData("Token");

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

 console.log("token",token)

// 🔐 Request Interceptor
API.interceptors.request.use(
  (config) => {
    const authToken = token ? JSON.parse(token) : process.env.NEXT_PUBLIC_TOKEN;

    //const authToken = token && JSON.parse(token);

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    // ✅ IMPORTANT: Detect FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]; // let axios set it
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ❗ Response Error Guard
API.interceptors.response.use(
  (res) => res,
  (error) => {
    // showErrorOnce(error, "Something is Wrong");
    return Promise.reject(error);
  }
);

export default API;
