import axios from "axios";
import { showErrorOnce } from "./utils/apiErrorGuard";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // your backend URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
  // withCredentials: true,
});


export default API;
