import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import api from "@/API/api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || null);
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  const email = ref("");
  const password = ref("");
  const rememberMe = ref(false);

  const fullName = ref("");
  const confirmPassword = ref("");
  const agreedTerms = ref(false);

  // --- New State for Verification ---
  const otpCode = ref("");
  const loading = ref(false);
  const error = ref(null);
  const successMessage = ref(null);

  if (token.value) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
  }

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

  // --- Existing Actions ---

  const register = async () => {
    if (!canRegister.value) return false; // Return false if validation fails

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
        // Store user data so it's available for the "Confirm Email" screen
        user.value = data.user || data.data?.user || data.data;

        // Note: We don't necessarily need to set the token yet if
        // the account is "unverified" in your backend.
        successMessage.value = "Registration successful!";
        return true; // This triggers the redirect in your component
      }
    } catch (err) {
      error.value = err.response?.data?.message || "Registration failed.";
      return false;
    } finally {
      loading.value = false;
    }
  };
  const login = async () => {
    if (!canLogin.value) return;
    loading.value = true;
    error.value = null;
    try {
      const payload = { email: email.value.trim(), password: password.value };
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
        return true;
      }
    } catch (err) {
      error.value = err.response?.data?.message || "Invalid email or password.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  // --- New Actions for Email Verification ---

  const sendOtp = async () => {
    loading.value = true;
    error.value = null;
    try {
      // POST /otp/send requires the email address
      const response = await api.post("/otp/send", {
        email: email.value.trim(),
      });
      if (response.data) {
        successMessage.value = "Verification code sent!";
        return true;
      }
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to send code.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const verifyEmail = async () => {
    if (otpCode.value.length < 6) {
      error.value = "Please enter a valid 6-digit code.";
      return false;
    }
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post("/otp/verify", {
        email: email.value.trim(),
        otp: otpCode.value,
      });
      if (response.data.success || response.data.result) {
        successMessage.value = "Email verified successfully!";
        return true;
      }
    } catch (err) {
      error.value = err.response?.data?.message || "Invalid verification code.";
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
  };

  const resetRegisterForm = () => {
    fullName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    agreedTerms.value = false;
    otpCode.value = "";
  };

  const resetLoginForm = () => {
    email.value = "";
    password.value = "";
  };

  return {
    token,
    user,
    email,
    password,
    rememberMe,
    fullName,
    confirmPassword,
    agreedTerms,
    otpCode,
    loading,
    error,
    successMessage,
    passwordsMatch,
    canRegister,
    canLogin,
    isAuthenticated,
    register,
    login,
    logout,
    sendOtp,
    verifyEmail,
    resetRegisterForm,
    resetLoginForm,
    clearMessages: () => {
      error.value = null;
      successMessage.value = null;
    },
  };
});
