import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-analyzer-backend-dzz9.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
