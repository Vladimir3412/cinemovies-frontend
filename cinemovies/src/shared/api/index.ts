import axios from "axios";

export const tmdbClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_BACKEND,
  withCredentials: true,
});


