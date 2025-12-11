import axios from "axios";


const API = axios.create({

  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
