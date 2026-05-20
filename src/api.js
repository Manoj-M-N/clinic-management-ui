import axios from "axios";

const api = axios.create({
  baseURL: "https://clinic-backend.onrender.com",
});

export default api;