import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/API/api";
import { useAuthStore } from "./authentication";

export const useProfileStore = defineStore("profile", () => {
  // ── State
  const profile = ref(null);
  const profileLoading = ref(false);
  const profileError = ref(null);
  const profileSuccess = ref(null);

  // ── Actions

  const getProfile = async () => {
    const authStore = useAuthStore();
    // Don't fetch if no token
    if (!authStore.token) {
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
        authStore.user = profileData;
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
    const authStore = useAuthStore();
    // Check if token exists
    if (!authStore.token) {
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
      console.log("Token exists:", !!authStore.token);

      const response = await api.put("/auth/profile", payload);

      console.log("Update profile response status:", response.status);
      console.log("Update profile response data:", response.data);

      if (response.status === 200 || response.data?.result) {
        const responseData =
          response.data.data || response.data.result || response.data;
        profile.value = responseData;
        authStore.user = responseData;
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
    const authStore = useAuthStore();
    // Check if token exists
    if (!authStore.token) {
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
        authStore.user = responseData;
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
    const authStore = useAuthStore();
    // Check if token exists
    if (!authStore.token) {
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
        authStore.user = responseData;
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
    const authStore = useAuthStore();
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

  const changeEmail = async (newEmail, password) => {
    const authStore = useAuthStore();
    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      // 1. Payload must match Postman: 'newEmail' and 'password'
      const payload = {
        newEmail: newEmail,
        password: password,
      };

      // The 'api' instance should already handle the Bearer token in headers
      const response = await api.post("/auth/change-email", payload);

      // Note: Postman shows 201 Created status
      if (response.status === 200 || response.status === 201) {
        profileSuccess.value =
          "សូមផ្ទៀងផ្ទាត់អ៊ីមែលថ្មីរបស់អ្នក ដើម្បីបញ្ចប់ការផ្លាស់ប្តូរ។";
        return true;
      }
    } catch (err) {
      profileError.value =
        err.response?.data?.message || "បរាជ័យក្នុងការផ្លាស់ប្តូរអ៊ីមែល។";
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const verifyChangeEmail = async (token) => {
    const authStore = useAuthStore();
    profileLoading.value = true;
    profileError.value = null;
    profileSuccess.value = null;

    try {
      // 2. Payload must match Postman: key should be 'token', not 'code'
      const payload = {
        token: token,
      };

      const response = await api.post("/auth/verify-change-email", payload);

      if (response.status === 200 || response.status === 201) {
        // Update local state with the new profile data
        profile.value = response.data.data || response.data;
        if (authStore.user) authStore.user.email = profile.value.email;

        profileSuccess.value = "អ៊ីមែលបានផ្លាស់ប្តូរដោយជោគជ័យ!";
        return true;
      }
    } catch (err) {
      profileError.value =
        err.response?.data?.message ||
        "លេខកូដផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ ឬផុតកំណត់។";
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const deleteAccount = async (email = null) => {
    const authStore = useAuthStore();
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
        authStore.logout();
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
    profile,
    profileLoading,
    profileError,
    profileSuccess,
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
