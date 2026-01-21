import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import Register from "@/components/authentication/Register.vue";
import LogIn from "@/components/authentication/LogIn.vue";

// import AdminDashboardLayout from "@/layouts/AdminDashboardLayout.vue";
import VerifyEmail from "@/components/authentication/VerifyEmail.vue";
import VerifyOTP from "@/components/authentication/VerifyOTP.vue";
import ForgetPassword from "@/components/authentication/ForgetPassword.vue";
import ResetPassword from "@/components/authentication/ResetPassword.vue";

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
