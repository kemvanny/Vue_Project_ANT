import { createRouter, createWebHistory } from "vue-router";

import Register from "@/view/authentication/Register.vue";
import LogIn from "@/view/authentication/LogIn.vue";

// import AdminDashboardLayout from "@/layouts/AdminDashboardLayout.vue";
import VerifyEmail from "@/view/authentication/VerifyEmail.vue";
import VerifyOTP from "@/view/authentication/VerifyOTP.vue";
import ForgetPassword from "@/view/authentication/ForgetPassword.vue";
import ResetPassword from "@/view/authentication/ResetPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",         
  linkExactActiveClass: "active",
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
      path: "/features",
      name: "features",
      component: FeaturesPage
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
    {
      path: "/dashboard",
      component: UserDashboardLayout,
      children: [
        {
          path: "", // localhost:5173/
          name: "Dashboard",
          component: UserDashboard,
        },
        {
          path: "tasks", // localhost:5173/tasks
          name: "AllTasks",
          component: AllTasks,
        },
        {
          path: "pending", // localhost:5173/pending
          name: "Pending",
          component: Pending,
        },
        {
          path: "completed", // localhost:5173/completed
          name: "Completed",
          component: Complete,
        },
        {
          path: "category/:name",
          name: "Category",
          component: () => import("@/views/user/CategoryView.vue"),
          props: true,
        },
      ],
    },
  ],
  
});


router.beforeEach((to, from, next) => {
  document.title = to.name ? `${to.name} - ReabList` : "ReabList";
  next();
});

export default router;
