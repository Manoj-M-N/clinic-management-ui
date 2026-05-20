import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://clinic-backend-yw16.onrender.com",
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default adminApi;