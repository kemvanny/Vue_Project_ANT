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
import Homepage from "@/views/pages/landing/Homepage.vue";
import AboutUs from "@/views/pages/landing/AboutPage.vue";
import FeaturesPage from "@/views/pages/landing/FeaturesPage.vue";
import NotFount from "@/views/pages/notfound/NotFound.vue";

// Layout
import UserDashboardLayout from "@/layouts/UserDashboardLayout.vue";

// Dashboard Views
import AllTasks from "@/views/user/TaskWorkFlow/AllTasks.vue";
import UserDashboard from "@/views/user/TaskWorkFlow/UserDashboard.vue";
import Pending from "@/views/user/TaskWorkFlow/PendingTasks.vue";
import Complete from "@/views/user/TaskWorkFlow/CompletedTasks.vue";
import ProfileDashboard from "@/views/user/TaskWorkFlow/ProfileDashboard.vue";
import createTask from "@/views/user/Task/TaskCreate.vue";

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
      path: "/reset-password/:token?",
      name: "reset-password",
      component: ResetPassword,
      meta: { requiresAuth: false },
    },
    {
      path: "/verify-change-email",
      name: "VerifyEmailChange",
      component: () => import("@/views/authentication/VerifyEmailChange.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/dashboard",
      component: UserDashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "", 
          name: "Dashboard",
          component: UserDashboard,
        },
        {
          path: "tasks", 
          name: "AllTasks",
          component: AllTasks,
        },
        {
          path: "pending", 
          name: "Pending",
          component: Pending,
        },
        {
          path: "completed",
          name: "Completed",
          component: Complete,
        },
        {
          path: "createTask",
          name: "createTask",
          component: createTask,
        },
        {
          path: "category/:name",
          name: "Category",
          component: () => import("@/views/user/TaskWorkFlow/CategoryView.vue"),
          props: true,
        },
        {
          path: "/dashboard/tasks/:id", 
          name: "task-detail",
          component: () => import("../views/user/Task/TaskView.vue"), 
        },

        {
          path: "/profile",
          name: "Profile",
          component: ProfileDashboard,
          meta: { requiresAuth: true },
        },
        {
          path: "/profile/setting",
          name: "ProfileSetting",
          component: () => import("@/components/profile/AccountSettings.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    { path: "/:catchAll(.*)", component: NotFount },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;

  document.title = to.name ? `${to.name} - ReabList` : "ReabList";

  const token = authStore.token || localStorage.getItem("token");
  const isAuthenticated = !!token;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (
    isAuthenticated &&
    (to.name === "homepage" ||
      to.name === "login" ||
      to.name === "register" ||
      to.name === "verify-email" ||
      to.name === "verify-OTP" ||
      to.name === "forget-password" ||
      to.name === "reset-password")
  ) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
