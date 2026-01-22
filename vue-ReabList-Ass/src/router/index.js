import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD
import Register from "@/components/authentication/Register.vue";
import LogIn from "@/components/authentication/LogIn.vue";
import Homepage from "@/views/pages/Homepage.vue";
import AboutUs from "@/views/pages/AboutPage.vue";
=======
// import HomeView from "../views/HomeView.vue";
import Register from "@/components/authentication/Register.vue";
import LogIn from "@/components/authentication/LogIn.vue";

// import AdminDashboardLayout from "@/layouts/AdminDashboardLayout.vue";
import VerifyEmail from "@/components/authentication/VerifyEmail.vue";
import VerifyOTP from "@/components/authentication/VerifyOTP.vue";
import ForgetPassword from "@/components/authentication/ForgetPassword.vue";
import ResetPassword from "@/components/authentication/ResetPassword.vue";

>>>>>>> 56f6bb45625932c318cdcbd5b1af3ba5f2357ed5
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
    {
      path: "/verify-email",
      name: "verify-email",
      component: VerifyEmail,
    },
    {
      path: "/verify-OTP",
      name: "verify-OTP",
      component: VerifyOTP,
    },
    {
      path: "/forget-password",
      name: "forget-password",
      component: ForgetPassword,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
    },
    // {
    //   path: "/",
    //   component: AdminDashboardLayout,
    // },
  ],
});

export default router;
