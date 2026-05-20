import axios from "axios";

const doctorApi = axios.create({
  baseURL: "https://clinic-backend-yw16.onrender.com",
});

// 🔥 ADD THIS INTERCEPTOR
doctorApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("doctorToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default doctorApi;