import axios from "axios";

const doctorApi = axios.create({
  baseURL: "http://localhost:1234",
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