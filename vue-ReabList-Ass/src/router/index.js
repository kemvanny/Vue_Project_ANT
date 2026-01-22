import { createRouter, createWebHistory } from "vue-router";
import Register from "@/components/authentication/Register.vue";
import LogIn from "@/components/authentication/LogIn.vue";
import Homepage from "@/views/pages/Homepage.vue";
import AboutUs from "@/views/pages/AboutPage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: Homepage
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: AboutUs
    },
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
