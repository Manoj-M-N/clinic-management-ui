import axios from "axios";

const api = axios.create({
  baseURL: "https://clinic-backend-yw16.onrender.com",
});

export default api;