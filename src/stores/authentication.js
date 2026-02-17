import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/API/api";

export const useAuthStore = defineStore("auth", () => {
  // ── State
  const getStoredToken = () => {
    return (
      localStorage.getItem("token") || sessionStorage.getItem("token") || null
    );
  };

  const token = ref(getStoredToken());
  const user = ref(null);

  const email = ref("");
  const password = ref("");
  const rememberMe = ref(false);

  const fullName = ref("");
  const confirmPassword = ref("");
  const agreedTerms = ref(false);

  // OTP & Reset
  const otpCode = ref("");
  const resetMode = ref(false);
  const resetEmail = ref("");
  const newPassword = ref("");
  const confirmNewPassword = ref("");

  const loading = ref(false);
  const error = ref(null);
  const successMessage = ref(null);

  const showDeactivatedModal = ref(false);

  if (token.value) {
    api.defaults.headers.common.Authorization = `Bearer ${token.value}`;
    rememberMe.value = !!localStorage.getItem("token");
    if (localStorage.getItem("rememberedEmail")) {
      email.value = localStorage.getItem("rememberedEmail");
    }
  }

  const clearMessages = () => {
    error.value = null;
    successMessage.value = null;
  };

  const translateError = (message) => {
    if (!message) return message;

    const translations = {
      "Invalid email or password.": "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។",
      "Invalid email or password": "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។",
      "Email already exists": "អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ។",
      "Email is already in use.": "អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ។",
      "Email is already in use": "អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ។",
      "Email not found": "រកមិនឃើញអ៊ីមែលនេះទេ។",
      "Invalid email": "អ៊ីមែលមិនត្រឹមត្រូវ។",
      "Password is too weak": "ពាក្យសម្ងាត់ខ្សោយពេក។",
      "Account not verified": "គណនីមិនទាន់បានផ្ទៀងផ្ទាត់។",
      "Token expired": "តំណផុតកំណត់។",
      "Invalid token": "តំណមិនត្រឹមត្រូវ។",
      "OTP expired": "លេខកូដផ្ទៀងផ្ទាត់ផុតកំណត់។",
      "Invalid OTP": "លេខកូដផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ។",
      "Server error": "មានបញ្ហាជាមួយម៉ាស៊ីនបម្រើ។",
      "Network error": "មានបញ្ហាបណ្តាញ។",
      "Account is deactivated.": "គណនីរបស់អ្នកត្រូវបានបិទដំណើរការ។",
      "Account deactivated": "គណនីរបស់អ្នកត្រូវបានបិទដំណើរការ។",
      "User is deactivated": "គណនីរបស់អ្នកត្រូវបានបិទដំណើរការ។",
    };

    return translations[message] || message;
  };

  const resetRegisterForm = () => {
    fullName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    agreedTerms.value = false;
    if (!resetMode.value) {
      otpCode.value = "";
    }
    resetMode.value = false;
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
  const isAuthenticated = computed(() => !!token.value);

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
          "ការចុះឈ្មោះទទួលបានជោគជ័យ! សូមផ្ទៀងផ្ទាត់អ៊ីមែលរបស់អ្នក។";
        return true;
      }
    } catch (err) {
      error.value =
        translateError(err.response?.data?.message) ||
        translateError(err.response?.data?.error) ||
        translateError(err.response?.data?.errors?.email?.[0]) ||
        "ការចុះឈ្មោះបានបរាជ័យ។ សូមព្យាយាមម្តងទៀត";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const login = async () => {
    if (!canLogin.value) return false;
    loading.value = true;
    clearMessages();
    showDeactivatedModal.value = false;

    if (
      email.value.trim() === "antadmin.tdl@gmail.com" &&
      password.value === "AntAdmin@!99"
    ) {
      error.value = "ការចូលប្រើប្រាស់មិនត្រូវបានផ្តល់ឱ្យ។";
      loading.value = false;
      return false;
    }

    try {
      const payload = {
        email: email.value.trim(),
        password: password.value,
      };

      const response = await api.post("/auth/login", payload);
      const data = response.data;

      if (data.result || data.success || response.status === 200) {
        const tokenData = data.data;
        const loggedInUser = tokenData?.user || tokenData;
        const receivedToken =
          tokenData?.token ||
          tokenData?.access_token ||
          data.token ||
          data.access_token;

        if (loggedInUser?.status === "DEACTIVATED") {
          showDeactivatedModal.value = true;
          loading.value = false;
          return false;
        }
        // ─────────────────────────────────────────────────────────

        if (!receivedToken) {
          error.value = "No token received from server";
          return false;
        }

        user.value = loggedInUser;
        token.value = receivedToken;

        if (rememberMe.value) {
          localStorage.setItem("token", receivedToken);
          localStorage.setItem("rememberedEmail", email.value);
        } else {
          sessionStorage.setItem("token", receivedToken);
          localStorage.removeItem("rememberedEmail");
        }

        api.defaults.headers.common.Authorization = `Bearer ${receivedToken}`;
        successMessage.value = "ចូលបានជោគជ័យ!";
        return true;
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message;
      if (
        err.response?.status === 403 ||
        serverMessage === "Account is deactivated." ||
        serverMessage === "Account deactivated" ||
        serverMessage === "User is deactivated"
      ) {
        showDeactivatedModal.value = true;
        return false;
      }

      error.value =
        translateError(serverMessage) || "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("rememberedEmail");
    sessionStorage.removeItem("token");
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
        successMessage.value = "លេខកូដផ្ទៀងផ្ទាត់បានផ្ញើទៅអ៊ីមែលរបស់អ្នក!";
        return true;
      }
    } catch (err) {
      error.value =
        translateError(err.response?.data?.message) ||
        "បរាជ័យក្នុងការផ្ញើលេខកូដ។";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const verifyEmail = async () => {
    if (otpCode.value.length !== 6 || !/^\d{6}$/.test(otpCode.value)) {
      error.value = "សូមបញ្ចូលលេខកូដ 6 ខ្ទង់ដែលមានសុពលភាព។";
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
        successMessage.value = "អ៊ីមែលបានផ្ទៀងផ្ទាត់ដោយជោគជ័យ!";
        return true;
      }
    } catch (err) {
      error.value =
        err.response?.data?.message || "លេខកូដមិនត្រឹមត្រូវ ឬផុតកំណត់។";
      return false;
    } finally {
      loading.value = false;
    }
  };

  // ── Password Reset
  const forgotPassword = async (emailAddress = null) => {
    loading.value = true;
    clearMessages();

    const emailToUse = (
      emailAddress ||
      resetEmail.value ||
      email.value
    )?.trim();
    const payload = { email: emailToUse };

    try {
      const response = await api.post("/auth/forget-password", payload);

      if (
        response.data?.success ||
        response.data?.result ||
        response.status === 200
      ) {
        resetEmail.value = payload.email;
        return true;
      }

      return false;
    } catch (err) {
      if (err.response?.data?.details === "Email already verified.") {
        resetEmail.value = payload.email;
        return true;
      }

      error.value =
        translateError(err.response?.data?.message) ||
        "មានបញ្ហាជាមួយម៉ាស៊ីនបម្រើ";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const captureResetToken = (route) => {
    const tokenFromUrl = route.params.token || route.query.token;
    const emailFromUrl = route.query.email;

    if (tokenFromUrl) otpCode.value = tokenFromUrl;
    if (emailFromUrl) resetEmail.value = emailFromUrl;
  };

  const resetPassword = async () => {
    if (!canResetPassword.value) {
      error.value =
        "សូមបញ្ចូលពាក្យសម្ងាត់ដែលមានសុពលភាព (យ៉ាងហោចណាស់ 8 តួអក្សរ) ហើយត្រូវប្រាកដថាពាក្យសម្ងាត់ត្រូវគ្នា។";
      return false;
    }

    loading.value = true;
    clearMessages();

    try {
      const payload = {
        token: otpCode.value.trim(),
        newPassword: newPassword.value,
      };

      const response = await api.post("/auth/reset-password", payload);

      if (response.data?.success || response.status === 200) {
        successMessage.value =
          "កំណត់ពាក្យសម្ងាត់ឡើងវិញដោយជោគជ័យ! បញ្ជូនបន្តទៅការចូល...";

        token.value = null;
        user.value = null;
        localStorage.removeItem("token");
        delete api.defaults.headers.common.Authorization;

        resetForgotPasswordForm();
        return true;
      }
    } catch (err) {
      error.value =
        translateError(err.response?.data?.message) ||
        translateError(err.response?.data?.error) ||
        translateError(err.response?.data?.errors?.password?.[0]) ||
        "ការកំណត់ឡើងវិញបានបរាជ័យ។ តំណអាចមិនត្រឹមត្រូវ ឬផុតកំណត់.";
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
    resetMode,
    loading,
    error,
    successMessage,
    showDeactivatedModal,
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
