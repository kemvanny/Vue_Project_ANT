import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Register from "@/components/authentication/Register.vue";
import LogIn from "@/components/authentication/LogIn.vue";

import AdminDashboardLayout from "@/layouts/AdminDashboardLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: LogIn,
    },
    
  ],
});

export default router;
