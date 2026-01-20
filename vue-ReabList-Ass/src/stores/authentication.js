import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import api from "../../API/api"; // ← your axios instance with baseURL etc.

export const useAuthStore = defineStore("auth", () => {
  // ─── PERSISTED STATE ────────────────────────────────────────
  const token = ref(localStorage.getItem("token") || null);
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  // ─── SHARED FORM FIELDS ─────────────────────────────────────
  const email = ref("");
  const password = ref("");
  const rememberMe = ref(false); // can be used later for refresh token strategy

  // ─── REGISTRATION-SPECIFIC FIELDS ───────────────────────────
  const fullName = ref("");
  const confirmPassword = ref("");
  const agreedTerms = ref(false);

  // ─── STATUS & FEEDBACK ──────────────────────────────────────
  const loading = ref(false);
  const error = ref(null);
  const successMessage = ref(null);

  // Auto-attach token to every request if present
  if (token.value) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
  }

  // ─── COMPUTED VALIDATION ────────────────────────────────────
  const passwordsMatch = computed(
    () => password.value === confirmPassword.value,
  );

  const canRegister = computed(() => {
    return (
      fullName.value.trim().length >= 2 &&
      email.value.includes("@") &&
      password.value.length >= 8 &&
      passwordsMatch.value &&
      agreedTerms.value &&
      !loading.value
    );
  });

  const canLogin = computed(() => {
    return (
      email.value.includes("@") && password.value.length >= 6 && !loading.value
    );
  });

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  // ─── CORE ACTIONS ───────────────────────────────────────────

  const register = async () => {
    if (!canRegister.value) return;

    loading.value = true;
    error.value = null;
    successMessage.value = null;

    try {
      const payload = {
        fullname: fullName.value.trim(),
        email: email.value.trim(),
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      const response = await api.post("/auth/register", payload);

      const data = response.data;

      if (data.success || data.result) {
        user.value = data.user || data.data?.user || data.data;
        token.value = data.token || data.access_token;

        // Persist
        localStorage.setItem("user", JSON.stringify(user.value));
        if (token.value) {
          localStorage.setItem("token", token.value);
          axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        }

        successMessage.value = "Account created successfully!";
        resetRegisterForm();
        return true; // success → can redirect
      }
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";
      console.error("Register failed:", err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const login = async () => {
    if (!canLogin.value) return;

    loading.value = true;
    error.value = null;
    successMessage.value = null;

    try {
      const payload = {
        email: email.value.trim(),
        password: password.value,
        // rememberMe: rememberMe.value   ← send if your backend supports it
      };

      const response = await api.post("/auth/login", payload);

      const data = response.data;

      if (data.success || data.result) {
        user.value = data.user || data.data?.user || data.data;
        token.value = data.token || data.access_token;

        localStorage.setItem("user", JSON.stringify(user.value));
        if (token.value) {
          localStorage.setItem("token", token.value);
          axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        }

        successMessage.value = "Logged in successfully!";
        resetLoginForm();
        return true; // success → redirect to dashboard
      }
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid email or password.";
      console.error("Login failed:", err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common.Authorization;
    error.value = null;
    successMessage.value = "You have been logged out.";
    // Optional: router.push('/login') if you have access to router here
  };

  // ─── FORM RESET HELPERS ─────────────────────────────────────

  const resetRegisterForm = () => {
    fullName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    agreedTerms.value = false;
  };

  const resetLoginForm = () => {
    email.value = "";
    password.value = "";
    // rememberMe stays as user left it
  };

  const clearMessages = () => {
    error.value = null;
    successMessage.value = null;
  };

  // ─── EXPOSED API ────────────────────────────────────────────
  return {
    // State
    token,
    user,
    email,
    password,
    rememberMe,
    fullName,
    confirmPassword,
    agreedTerms,
    loading,
    error,
    successMessage,
    // Computed
    passwordsMatch,
    canRegister,
    canLogin,
    isAuthenticated,
    // Actions
    register,
    login,
    logout,
    clearMessages,
    // Helpers
    resetRegisterForm,
    resetLoginForm,
  };
});
