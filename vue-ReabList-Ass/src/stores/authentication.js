import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/API/api";

export const useAuthStore = defineStore("auth", () => {
  // ── State
  const token = ref(localStorage.getItem("token") || null);
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
      console.log("Registration error:", err.response?.data);
      error.value =
        err.response?.data?.message ||
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

    // Prevent admin access with specific credentials
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

      console.log("Login response:", data);
      console.log("Full response data:", data.data);

      if (data.result || data.success || response.status === 200) {
        // Extract token from data.data object
        const tokenData = data.data;
        user.value = tokenData?.user || tokenData;
        token.value =
          tokenData?.token ||
          tokenData?.access_token ||
          data.token ||
          data.access_token;

        console.log("Token from data.data:", tokenData?.token);
        console.log("Token value set to:", token.value);

        // Store only token in localStorage for security
        if (token.value) {
          localStorage.setItem("token", token.value);
          console.log(
            "Token saved to localStorage:",
            localStorage.getItem("token"),
          );

          api.defaults.headers.common.Authorization = `Bearer ${token.value}`;
          successMessage.value = "ចូលបានជោគជ័យ!";
          return true;
        } else {
          error.value = "No token received from server";
          return false;
        }
      }
    } catch (err) {
      error.value =
        err.response?.data?.message || "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
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
      error.value = err.response?.data?.message || "បរាជ័យក្នុងការផ្ញើលេខកូដ។";
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

    try {
      const payload = {
        email: (emailAddress || resetEmail.value || email.value).trim(),
      };
      const response = await api.post("/otp/send", payload);

      if (response.data?.success || response.status === 200) {
        successMessage.value = "លេខកូដផ្ទៀងផ្ទាត់បានផ្ញើទៅអ៊ីមែលរបស់អ្នក!";
        resetEmail.value = payload.email;
        resetMode.value = true;
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      error.value = err.response?.data?.message || "បរាជ័យក្នុងការផ្ញើលេខកូដ។";
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

      console.log("Sending reset payload:", payload);

      const response = await api.post("/auth/reset-password", payload);
      console.log(response);

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
      console.error("RESET ERROR:", err.response?.data);

      error.value =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.errors?.password?.[0] ||
        "ការកំណត់ឡើងវិញបានបរាជ័យ។ តំណអាចមិនត្រឹមត្រូវ ឬផុតកំណត់.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  // ── Profile State
  const profile = ref(null);
  const profileLoading = ref(false);
  const profileError = ref(null);
  const profileSuccess = ref(null);

  // ── Profile Actions

  const getProfile = async () => {
    // Don't fetch if no token
    if (!token.value) {
      profileError.value = "No authentication token. Please log in.";
      return null;
    }

    profileLoading.value = true;
    profileError.value = null;

    try {
      const response = await api.get("/auth/profile");
      console.log("Profile response:", response.data);

      if (response.status === 200 || response.data?.success) {
        // Extract data from nested structure: response.data.data or response.data.result or response.data
        const profileData =
          response.data.data || response.data.result || response.data;
        profile.value = profileData;
        user.value = profileData;
        console.log("Profile loaded successfully:", profile.value);
        return profileData;
      } else {
        profileError.value = response.data?.message || "Failed to load profile";
        return null;
      }
    } catch (err) {
      console.error("Get profile error:", err);
      profileError.value =
        err.response?.data?.message ||
        err.message ||
        "បរាជ័យក្នុងការទាក់ទងទម្រង់។";
    } finally {
      profileLoading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    // Check if token exists
    if (!token.value) {
      profileError.value = "No authentication token. Please log in.";
      return false;
    }

    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      // Build payload - only include fields that the API accepts
      const payload = {};

      // Always include fullname (required field)
      if (profileData.fullname && profileData.fullname.trim()) {
        payload.fullname = profileData.fullname.trim();
      } else {
        profileError.value = "Full name is required";
        profileLoading.value = false;
        return false;
      }

      // Optional fields - only add if they have values
      // Note: API does NOT accept 'bio' field, so we exclude it
      if (profileData.phone && profileData.phone.trim()) {
        payload.phone = profileData.phone.trim();
      }

      if (profileData.address && profileData.address.trim()) {
        payload.address = profileData.address.trim();
      }

      if (profileData.date_of_birth && profileData.date_of_birth.trim()) {
        payload.date_of_birth = profileData.date_of_birth.trim();
      }

      console.log("Updating profile with payload:", payload);
      console.log("Token exists:", !!token.value);

      const response = await api.put("/auth/profile", payload);

      console.log("Update profile response status:", response.status);
      console.log("Update profile response data:", response.data);

      if (response.status === 200 || response.data?.result) {
        const responseData =
          response.data.data || response.data.result || response.data;
        profile.value = responseData;
        user.value = responseData;
        profileSuccess.value = "ទម្រង់បានធ្វើឱ្យទាន់សម័យបានជោគជ័យ!";
        console.log("Profile updated successfully:", profile.value);
        return true;
      } else {
        const errorMsg = response.data?.message || "Failed to update profile";
        profileError.value = errorMsg;
        console.warn("Update failed:", errorMsg);
        return false;
      }
    } catch (err) {
      console.error("Update profile error:", err);
      console.error("Error status:", err.response?.status);
      console.error("Error data:", err.response?.data);

      // Extract error message from API response
      let errorMessage = "បរាជ័យក្នុងការធ្វើឱ្យទាន់សម័យទម្រង់។";

      if (err.response?.data) {
        const errData = err.response.data;
        // Check for details array first (contains field-specific errors)
        if (
          errData.details &&
          Array.isArray(errData.details) &&
          errData.details.length > 0
        ) {
          errorMessage = errData.details[0];
        } else if (errData.message) {
          errorMessage = errData.message;
        } else if (errData.error) {
          errorMessage = errData.error;
        }
      }

      profileError.value = errorMessage;
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const uploadAvatar = async (file) => {
    // Check if token exists
    if (!token.value) {
      profileError.value = "No authentication token. Please log in.";
      return false;
    }

    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      console.log("Uploading avatar...");
      const response = await api.put("/auth/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload avatar response:", response.data);

      if (response.status === 200 || response.data?.success) {
        const responseData =
          response.data.data || response.data.result || response.data;
        profile.value = responseData;
        user.value = responseData;
        profileSuccess.value = "រូបភាពប្រូហ្វាល់បានផ្ទុកបានជោគជ័យ!";
        console.log("Avatar uploaded successfully");
        return true;
      } else {
        profileError.value =
          response.data?.message || "Failed to upload avatar";
        return false;
      }
    } catch (err) {
      console.error("Upload avatar error:", err);
      profileError.value =
        err.response?.data?.message ||
        err.message ||
        "បរាជ័យក្នុងការផ្ទុករូបភាព។";
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const deleteAvatar = async () => {
    // Check if token exists
    if (!token.value) {
      profileError.value = "No authentication token. Please log in.";
      return false;
    }

    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      const response = await api.delete("/auth/profile/avatar");
      console.log("Delete avatar response:", response.data);

      if (response.status === 200 || response.data?.success) {
        const responseData =
          response.data.data || response.data.result || response.data;
        profile.value = responseData;
        user.value = responseData;
        profileSuccess.value = "រូបភាពប្រូហ្វាល់បានលុបបានជោគជ័យ!";
        console.log("Avatar deleted successfully");
        return true;
      } else {
        profileError.value =
          response.data?.message || "Failed to delete avatar";
        return false;
      }
    } catch (err) {
      console.error("Delete avatar error:", err);
      profileError.value =
        err.response?.data?.message ||
        err.message ||
        "បរាជ័យក្នុងការលុបរូបភាព។";
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const changePassword = async (currentPassword, newPass, confirmPass) => {
    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      // Try multiple payload formats for compatibility
      const payload = {
        currentPassword: currentPassword,
        newPassword: newPass,
        confirmPassword: confirmPass,
      };

      console.log("Changing password with payload:", {
        currentPassword: currentPassword,
        newPassword: newPass,
      });

      const response = await api.put("/auth/change-password", payload);

      console.log("Change password response:", response);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (
        response.data?.success ||
        response.data?.result ||
        response.status === 200 ||
        response.status === 201
      ) {
        profileSuccess.value = "ពាក្យសម្ងាត់បានផ្លាស់ប្តូរបានជោគជ័យ!";
        profileLoading.value = false;
        return true;
      } else {
        profileError.value =
          response.data?.message || "បរាជ័យក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់។";
        profileLoading.value = false;
        return false;
      }
    } catch (err) {
      console.error("Change password error:", err);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);
      console.error("Error status:", err.response?.status);

      // Handle 400 Bad Request
      if (err.response?.status === 400) {
        const errorMsg =
          err.response?.data?.message || err.response?.data?.error;
        if (errorMsg && errorMsg.includes("current")) {
          profileError.value = "ពាក្យសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ។";
        } else if (errorMsg && errorMsg.includes("length")) {
          profileError.value =
            "ពាក្យសម្ងាត់ថ្មីត្រូវតែមានយ៉ាងហោចណាស់ ៨ តួអក្សរ។";
        } else if (errorMsg && errorMsg.includes("match")) {
          profileError.value = "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។";
        } else {
          profileError.value = errorMsg || "សូមបញ្ចូលទិន្នន័យត្រឹមត្រូវ។";
        }
      } else {
        profileError.value =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "បរាជ័យក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់។ សូលឺមព្យាយាម។";
      }
      profileLoading.value = false;
      return false;
    }
  };

  const changeEmail = async (newEmail) => {
    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      // Try multiple field name formats for compatibility
      const payload = {
        email: newEmail,
        newEmail: newEmail,
        new_email: newEmail,
      };

      console.log(
        "Sending change email request (verification code will be sent to Gmail):",
        { email: newEmail },
      );
      const response = await api.post("/auth/change-email", payload);

      console.log("Change email response:", response);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (
        response.data?.success ||
        response.data?.result ||
        response.status === 200 ||
        response.status === 201
      ) {
        profileSuccess.value =
          "លេខកូដផ្ទៀងផ្ទាត់បានផ្ញើទៅ " +
          newEmail +
          " សូមផ្ទៀងផ្ទាត់ប្រអប់ផ្ទេរឡើងវិញ។";
        profileLoading.value = false;
        return true;
      } else {
        profileError.value =
          response.data?.message ||
          "ការផ្លាស់ប្តូរអ៊ីមែលបានបរាជ័យ។ សូមព្យាយាមម្តងទៀត។";
        profileLoading.value = false;
        return false;
      }
    } catch (err) {
      console.error("Change email error:", err);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);
      console.error("Error status:", err.response?.status);

      // Check if email already exists
      if (
        err.response?.status === 409 ||
        err.response?.data?.message?.includes("already")
      ) {
        profileError.value = "អ៊ីមែលនេះគឺបានប្រើប្រាស់រួចហើយ។";
      } else if (err.response?.status === 400) {
        const errorMsg =
          err.response?.data?.message || err.response?.data?.error;
        if (errorMsg?.includes("format")) {
          profileError.value = "ទម្រង់អ៊ីមែលមិនឆ្លាក់ដែរ។";
        } else if (errorMsg?.includes("same")) {
          profileError.value = "អ៊ីមែលថ្មីត្រូវមានភាពខុសប្លែក។";
        } else {
          profileError.value = "អ៊ីមែលមិនឆ្លាក់ដែរ។ សូមព្យាយាមម្តងទៀត។";
        }
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        profileError.value =
          "មិនមានសិទ្ធិក្នុងការផ្លាស់ប្តូរអ៊ីមែល។ សូមលេងម្តងទៀត។";
      } else {
        profileError.value =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "បរាជ័យក្នុងការផ្លាស់ប្តូរអ៊ីមែល។ សូលឺមព្យាយាម។";
      }
      profileLoading.value = false;
      return false;
    }
  };

  const verifyChangeEmail = async (code) => {
    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      const payload = {
        code: code,
      };

      console.log(
        "Verifying email change with code received from Gmail:",
        code,
      );
      const response = await api.post("/auth/verify-change-email", payload);

      console.log("Verify change email response:", response);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (
        response.data?.success ||
        response.data?.result ||
        response.status === 200 ||
        response.status === 201
      ) {
        // Extract user data from nested response
        const userData =
          response.data.data || response.data.user || response.data;

        // Update user profile with new email
        if (userData) {
          profile.value = userData;
          user.value = userData;
          console.log("User profile updated with new email:", userData.email);
        }

        profileSuccess.value =
          "អ៊ីមែលបានផ្លាស់ប្តូរដោយជោគជ័យ! សូមចូលបានម្តងទៀត។";
        profileLoading.value = false;
        return true;
      } else {
        profileError.value =
          response.data?.message ||
          "ការផ្ទៀងផ្ទាត់បានបរាជ័យ។ សូមព្យាយាមម្តងទៀត។";
        profileLoading.value = false;
        return false;
      }
    } catch (err) {
      console.error("Verify change email error:", err);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);

      // Check if code is expired
      if (
        err.response?.status === 410 ||
        err.response?.data?.message?.includes("expired")
      ) {
        profileError.value =
          "លេខកូដផ្ទៀងផ្ទាត់បានផុតកំណត់។ សូមស្នើរលេខកូដថ្មី។";
      } else if (err.response?.status === 400) {
        profileError.value =
          "លេខកូដផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។";
      } else {
        profileError.value =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "លេខកូដផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ ឬផុតកំណត់។";
      }
      profileLoading.value = false;
      return false;
    }
  };

  const deleteAccount = async (email = null) => {
    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      const payload = email ? { email: email } : {};

      console.log("Sending delete account request with payload:", payload);
      const response = await api.post("/auth/delete-account", payload);

      console.log("Delete account response:", response);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (
        response.data?.success ||
        response.data?.result ||
        response.status === 200 ||
        response.status === 201
      ) {
        profileSuccess.value = "គណនីបានលុបដោយជោគជ័យ។ ផ្តល់ចូលម្តងទៀត...";
        logout();
        profileLoading.value = false;
        return true;
      } else {
        profileError.value =
          response.data?.message || "បរាជ័យក្នុងការលុបគណនី។ សូមព្យាយាមម្តងទៀត។";
        profileLoading.value = false;
        return false;
      }
    } catch (err) {
      console.error("Delete account error:", err);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);

      profileError.value =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "បរាជ័យក្នុងការលុបគណនី។ សូមព្យាយាម។";
      profileLoading.value = false;
      return false;
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
    resetEmail,
    newPassword,
    confirmNewPassword,
    passwordsMatch,
    newPasswordsMatch,
    canRegister,
    canLogin,
    canResetPassword,
    isAuthenticated,
    profile,
    profileLoading,
    profileError,
    profileSuccess,
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
    getProfile,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    changePassword,
    changeEmail,
    verifyChangeEmail,
    deleteAccount,
  };
});
