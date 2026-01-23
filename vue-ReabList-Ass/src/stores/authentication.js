import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/API/api";

export const useAuthStore = defineStore("auth", () => {
  // ── State
  const token = ref(localStorage.getItem("token") || null);
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  const email = ref("");
  const password = ref("");
  const rememberMe = ref(false);

  const fullName = ref("");
  const confirmPassword = ref("");
  const agreedTerms = ref(false);

  // OTP & Reset
  const otpCode = ref("");
  const resetEmail = ref("");
  const newPassword = ref("");
  const confirmNewPassword = ref("");

  const loading = ref(false);
  const error = ref(null);
  const successMessage = ref(null);

  if (token.value) {
    api.defaults.headers.common.Authorization = `Bearer ${token.value}`;
  }

  const clearMessages = () => {
    error.value = null;
    successMessage.value = null;
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

  const resetForgotPasswordForm = () => {
    resetEmail.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
    otpCode.value = "";
  };

  // ── Computed
  const passwordsMatch = computed(
    () => password.value === confirmPassword.value,
  );
  const newPasswordsMatch = computed(
    () => newPassword.value === confirmNewPassword.value,
  );
  const isAuthenticated = computed(() => !!token.value && !!user.value);

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

  const canResetPassword = computed(() => {
    return (
      otpCode.value.trim().length > 0 &&
      newPassword.value.length >= 8 &&
      newPasswordsMatch.value &&
      !loading.value
    );
  });

  // ── Actions

  const register = async () => {
    if (!canRegister.value) return false;
    loading.value = true;
    clearMessages();

    try {
      const payload = {
        fullname: fullName.value.trim(),
        email: email.value.trim(),
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      const response = await api.post("/auth/register", payload);
      const data = response.data;

      if (data.success || data.result || data.status === 201) {
        user.value = data.user || data.data?.user || data.data;
        successMessage.value =
          "Registration successful! Please verify your email.";
        return true;
      }
    } catch (err) {
      console.log("Registration error:", err.response?.data);
      error.value =
        err.response?.data?.message || "Registration failed. Please try again.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const login = async () => {
    if (!canLogin.value) return false;
    loading.value = true;
    clearMessages();

    try {
      const payload = {
        email: email.value.trim(),
        password: password.value,
      };

      const response = await api.post("/auth/login", payload);
      const data = response.data;

      if (data.success || data.result || data.status === 200) {
        user.value = data.user || data.data?.user || data.data;
        token.value = data.token || data.access_token;

        localStorage.setItem("user", JSON.stringify(user.value));
        localStorage.setItem("token", token.value);

        api.defaults.headers.common.Authorization = `Bearer ${token.value}`;

        successMessage.value = "Login successful!";
        return true;
      }
    } catch (err) {
      error.value = err.response?.data?.message || "Invalid email or password.";
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
    delete api.defaults.headers.common.Authorization;
    clearMessages();
  };

  // ── OTP
  const sendOtp = async () => {
    loading.value = true;
    clearMessages();

    try {
      const response = await api.post("/otp/send", {
        email: email.value.trim(),
      });

      if (response.data?.success || response.status === 200) {
        successMessage.value = "Verification code sent to your email!";
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
    if (otpCode.value.length !== 6 || !/^\d{6}$/.test(otpCode.value)) {
      error.value = "Please enter a valid 6-digit code.";
      return false;
    }

    loading.value = true;
    clearMessages();

    try {
      const payload = {
        email: email.value.trim(),
        code: otpCode.value.trim(),
      };

      const response = await api.post("/otp/verify", payload);

      if (
        response.data?.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        successMessage.value = "Email verified successfully!";
        return true;
      }
    } catch (err) {
      error.value = err.response?.data?.message || "Invalid or expired code.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  // ── Password Reset
  const forgotPassword = async (emailAddress = null) => {
    loading.value = true;
    clearMessages();

    try {
      const payload = {
        email: (emailAddress || resetEmail.value || email.value).trim(),
      };
      const response = await api.post("/auth/forget-password", payload);

      if (response.data?.success || response.status === 200) {
        successMessage.value = "Password reset link sent to your email!";
        resetEmail.value = payload.email;
        return true;
      }
    } catch (err) {
      console.error(err);
      error.value = err.response?.data?.message || "Failed to send reset link.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const captureResetToken = (route) => {
    const tokenFromUrl = route.params.token || route.query.token;
    const emailFromUrl = route.query.email;

    if (tokenFromUrl) {
      otpCode.value = tokenFromUrl;
    }
    if (emailFromUrl) {
      resetEmail.value = emailFromUrl;
    }

    console.log("Captured reset data:", {
      token: otpCode.value,
      email: resetEmail.value,
    });
  };

  const resetPassword = async () => {
    if (!canResetPassword.value) {
      error.value =
        "Please enter a valid password (min 8 characters) and ensure passwords match.";
      return false;
    }

    loading.value = true;
    clearMessages();

    try {
      const payload = {
        token: otpCode.value.trim(),
        newPassword: newPassword.value,
      };

      console.log("Sending reset payload:", payload);

      const response = await api.post("/auth/reset-password", payload);
      console.log(response);

      if (response.data?.success || response.status === 200) {
        successMessage.value =
          "Password reset successfully! Redirecting to login...";

        token.value = null;
        user.value = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete api.defaults.headers.common.Authorization;

        resetForgotPasswordForm();

        return true;
      }
    } catch (err) {
      console.error("RESET ERROR:", err.response?.data);

      error.value =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.errors?.password?.[0] ||
        "Reset failed. The link may be invalid or expired.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  // ── Export
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
    resetEmail,
    newPassword,
    confirmNewPassword,

    passwordsMatch,
    newPasswordsMatch,
    canRegister,
    canLogin,
    canResetPassword,
    isAuthenticated,

    register,
    login,
    logout,
    sendOtp,
    verifyEmail,
    forgotPassword,
    resetPassword,
    captureResetToken,
    resetRegisterForm,
    resetLoginForm,
    resetForgotPasswordForm,
    clearMessages,
  };
});
