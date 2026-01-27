import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authentication";

// Authentication Views
import Register from "@/views/authentication/Register.vue";
import LogIn from "@/views/authentication/LogIn.vue";
import VerifyEmail from "@/views/authentication/VerifyEmail.vue";
import VerifyOTP from "@/views/authentication/VerifyOTP.vue";
import ForgetPassword from "@/views/authentication/ForgetPassword.vue";
import ResetPassword from "@/views/authentication/ResetPassword.vue";

// Page Views
import Homepage from "@/views/pages/Homepage.vue";
import AboutUs from "@/views/pages/AboutPage.vue";
import FeaturesPage from "@/views/pages/FeaturesPage.vue";

// Layout
import UserDashboardLayout from "@/layouts/UserDashboardLayout.vue";

// Dashboard Views
import UserDashboard from "@/views/user/UserDashboard.vue";
import AllTasks from "@/views/user/AllTasks.vue";
import Pending from "@/views/user/PendingWork.vue";
import Complete from "@/views/user/CompletedTasks.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "homepage",
      component: Homepage,
      meta: { requiresAuth: false },
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: AboutUs,
      meta: { requiresAuth: false },
    },
    {
      path: "/features",
      name: "features",
      component: FeaturesPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      name: "login",
      component: LogIn,
      meta: { requiresAuth: false },
    },
    {
      path: "/verify-email",
      name: "verify-email",
      component: VerifyEmail,
      meta: { requiresAuth: false },
    },
    {
      path: "/verify-OTP",
      name: "verify-OTP",
      component: VerifyOTP,
      meta: { requiresAuth: false },
    },
    {
      path: "/forget-password",
      name: "forget-password",
      component: ForgetPassword,
      meta: { requiresAuth: false },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
      meta: { requiresAuth: false },
    },
    {
      path: "/dashboard",
      component: UserDashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "", // localhost:5173/
          name: "Dashboard",
          component: UserDashboard,
          meta: { requiresAuth: true },
        },
        {
          path: "tasks", // localhost:5173/tasks
          name: "AllTasks",
          component: AllTasks,
          meta: { requiresAuth: true },
        },
        {
          path: "pending", // localhost:5173/pending
          name: "Pending",
          component: Pending,
          meta: { requiresAuth: true },
        },
        {
          path: "completed", // localhost:5173/completed
          name: "Completed",
          component: Complete,
          meta: { requiresAuth: true },
        },
        {
          path: "category/:name",
          name: "Category",
          component: () => import("@/views/user/CategoryView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;

  document.title = to.name ? `${to.name} - ReabList` : "ReabList";

  // Check authentication from store OR localStorage (for fresh page loads)
  const token = authStore.token || localStorage.getItem("token");
  const isAuthenticated = !!token;

  // If route requires authentication and user is not authenticated
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  }
  // If user is trying to access login/register while already authenticated
  // else if ((to.name === "login" || to.name === "register") && isAuthenticated) {
  //   next("/dashboard");
  // }
  // Allow navigation
  else {
    next();
  }
});

export default router;
