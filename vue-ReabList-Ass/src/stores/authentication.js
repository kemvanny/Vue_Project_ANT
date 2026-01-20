// import { defineStore } from "pinia";
// import api from "../../API/api";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     user: null,
//     token: localStorage.getItem("token") || null,
//     loading: false,
//     error: null,
//   }),

//   getters: {
//     isAuthenticated: (state) => !!state.token,
//   },

//   actions: {
//     async login(payload) {
//       this.loading = true;
//       this.error = null;

//       try {
//         const res = await api.post("/auth/login", payload);

//         this.token = res.data.token;
//         this.user = res.data.user;

//         localStorage.setItem("token", this.token);

//         return res;
//       } catch (err) {
//         this.error = err.response?.data?.message || "Login failed";
//         throw err;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async register(payload) {
//       this.loading = true;
//       this.error = null;

//       try {
//         const res = await api.post("/auth/register", payload);
//         return res;
//       } catch (err) {
//         this.error = err.response?.data?.message || "Register failed";
//         throw err;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async fetchUser() {
//       try {
//         const res = await api.get("/auth/me");
//         this.user = res.data;
//       } catch (err) {
//         this.logout();
//       }
//     },

//     logout() {
//       this.user = null;
//       this.token = null;
//       localStorage.removeItem("token");
//     },
//   },
// });
