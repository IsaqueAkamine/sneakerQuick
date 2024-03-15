import axios from "axios";

const baseUrl = "https://stockx-api.p.rapidapi.com";

const api = axios.create({
  baseURL: baseUrl,
  // timeout: 10000,
  headers: {
    "X-RapidAPI-Key": process.env.EXPO_PUBLIC_RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.EXPO_PUBLIC_RAPIDAPI_HOST,
  },
});

export default api;
