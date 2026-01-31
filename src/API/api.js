import axios from "axios";
import { useAuthStore } from "@/stores/authentication";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL ||
    "http://ant-g6-todolist.tt.linkpc.net/api/v1",
  
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
  },
});

// REQUEST: add token
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  console.log(
    `[API] ${config.method?.toUpperCase()} ${config.url}`,
    config.data,
  );
  return config;
});

// RESPONSE: handle 401
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response (${response.status}):`, response.data);
    return response;
  },
  (error) => {
    const authStore = useAuthStore();
    console.error(
      `[API] Error (${error.response?.status}):`,
      error.response?.data,
    );
    if (error.response?.status === 401) {
      authStore.logout();
    }
    return Promise.reject(error);
  },
);

export default api;
