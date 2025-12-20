import axios from "axios";
import { showErrorOnce } from "./utils/apiErrorGuard";
import { getAuthData } from "./utils/localStorageUtil";

const Token = JSON.parse(getAuthData("Token"));

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // your backend URL
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${Token}`,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
  // withCredentials: true,
});

export default API;
