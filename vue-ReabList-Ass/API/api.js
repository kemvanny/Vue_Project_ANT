import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL ||
    "http://ant-g6-todolist.tt.linkpc.net/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
