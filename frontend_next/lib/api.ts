import axios from "axios";

const baseURL = typeof window === 'undefined'
  ? process.env.API_INTERNAL_URL
  : process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({ baseURL });

export default api;