import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/API/api";
import { useAuthStore } from "./authentication";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref(null);
  const profileLoading = ref(false);
  const profileError = ref(null);
  const profileSuccess = ref(null);

  const extractData = (response) =>
    response.data.data || response.data.result || response.data;

  const clearMessages = () => {
    profileError.value = null;
    profileSuccess.value = null;
  };

  const getProfile = async () => {
    const authStore = useAuthStore();
    if (!authStore.token) return null;

    profileLoading.value = true;
    profileError.value = null;

    try {
      const response = await api.get("/auth/profile");
      if (response.status === 200 || response.data?.success) {
        const profileData = extractData(response);
        profile.value = profileData;
        authStore.user = profileData;
        return profileData;
      }
    } catch (err) {
      profileError.value =
        err.response?.data?.message || "បរាជ័យក្នុងការទាញយកទិន្នន័យ។";
      console.error("Get profile error:", err);
    } finally {
      profileLoading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    profileLoading.value = true;
    clearMessages();

    try {
      const payload = {
        fullname: profileData.fullname?.trim(),
      };

      const response = await api.put("/auth/profile", payload);
      if (response.status === 200 || response.data?.result) {
        const updated = extractData(response);
        profile.value = updated;
        useAuthStore().user = updated;
        profileSuccess.value = "ទម្រង់បានទ្វេឱ្យទាន់សមេយបានជោគជ័យ!";
        return true;
      }
    } catch (err) {
      profileError.value =
        err.response?.data?.message || "បរាជ័យក្នុងការទ្វេឱ្យទាន់សមេយទម្រង់។";
      console.error("Update profile error:", err);
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const uploadAvatar = async (file) => {
    profileLoading.value = true;
    clearMessages();

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await api.put("/auth/profile/avatar", formData);

      const updated = extractData(response);
      profile.value = updated;
      useAuthStore().user = updated;
      profileSuccess.value = "រូបភាពប្រូហ្វាល់បានផ្ទុកបានជោគជ័យ!";
      return true;
    } catch (err) {
      profileError.value =
        err.response?.data?.message || "បរាជ័យក្នុងការផ្ទុករូបភាព។";
      console.error("Upload avatar error:", err);
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const deleteAvatar = async () => {
    profileLoading.value = true;
    clearMessages();

    try {
      const response = await api.delete("/auth/profile/avatar");
      const updated = extractData(response);
      profile.value = updated;
      useAuthStore().user = updated;
      profileSuccess.value = "រូបភាពប្រូហ្វាល់បានលុបបានជោគជ័យ!";
      return true;
    } catch (err) {
      profileError.value =
        err.response?.data?.message || "បរាជ័យក្នុងការលុបរូបភាព។";
      console.error("Delete avatar error:", err);
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const changePassword = async (
    currentPassword,
    newPassword,
    confirmPassword,
  ) => {
    profileLoading.value = true;
    clearMessages();

    try {
      currentPassword = currentPassword?.trim();
      newPassword = newPassword?.trim();
      confirmPassword = confirmPassword?.trim();

      if (!currentPassword || !newPassword || !confirmPassword) {
        profileError.value = "សូមបំពេញព័ត៌មានទាំងអស់។";
        return false;
      }

      if (newPassword !== confirmPassword) {
        profileError.value = "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នា។";
        return false;
      }

      if (newPassword.length < 6) {
        profileError.value = "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 6 តួអក្សរ។";
        return false;
      }

      if (currentPassword === newPassword) {
        profileError.value =
          "ពាក្យសម្ងាត់ថ្មីមិនអាចដូចពាក្យសម្ងាត់បច្ចុប្បន្នបានទេ។";
        return false;
      }

      const response = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.status === 200 || response.status === 201) {
        profileSuccess.value = "ពាក្យសម្ងាត់បានផ្លាស់ប្តូរបានជោគជ័យ!";
        return true;
      }

      return false;
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      if (errorMessage === "Invalid email or password") {
        profileError.value = "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។";
      } else if (errorMessage === "Password is too weak") {
        profileError.value = "ពាក្យសម្ងាត់ខ្សោយពេក។";
      } else if (errorMessage === "Current password is incorrect") {
        profileError.value = "ពាក្យសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ។";
      } else {
        profileError.value = errorMessage || "ការប្តូរពាក្យសម្ងាត់បានបរាជ័យ។";
      }
      console.error("Change password error:", err);
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const changeEmail = async (newEmail, password) => {
    profileLoading.value = true;
    clearMessages();

    try {
      newEmail = newEmail?.trim();
      password = password?.trim();

      if (!newEmail || !password) {
        profileError.value = "សូមបំពេញអ៊ីមែលនិងពាក្យសម្ងាត់។";
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        profileError.value = "អ៊ីមែលមិនត្រឹមត្រូវ។";
        return false;
      }

      if (newEmail.toLowerCase() === profile.value?.email?.toLowerCase()) {
        profileError.value = "អ៊ីមែលថ្មីមិនអាចដូចអ៊ីមែលបច្ចុប្បន្នបានទេ។";
        return false;
      }

      const res = await api.post("/auth/change-email", {
        newEmail,
        password,
      });

      if (res.status === 201 || res.data?.success) {
        profileSuccess.value =
          "លេខកូដផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើទៅ " +
          newEmail +
          " រួចហើយ។ សូមពិនិត្យប្រអប់ទទួល (និង Spam)។";
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      if (errorMessage === "Email already exists") {
        profileError.value = "អ៊ីមែលនេះមានរួចហើយ។ សូមជ្រើសរើសអ៊ីមែលផ្សេង។";
      } else if (errorMessage === "Invalid email or password") {
        profileError.value = "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។";
      } else if (errorMessage === "Email not found") {
        profileError.value = "អ៊ីមែលមិនត្រូវបានរកឃើញ។";
      } else {
        profileError.value =
          errorMessage || "មានបញ្ហាក្នុងការស្នើសុំផ្លាស់ប្តូរអ៊ីមែល។";
      }
      console.error("Change email error:", err);
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const verifyChangeEmail = async (token, newEmail = null) => {
    profileLoading.value = true;
    clearMessages();

    try {
      if (!token) {
        profileError.value = "តំណផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ។";
        return false;
      }

      const payload = newEmail ? { token, newEmail } : { token };
      const res = await api.post("/auth/verify-change-email", payload);

      if (res.status === 200 && (res.data?.success || res.data?.data)) {
        const updatedData = extractData(res);

        if (updatedData && updatedData.email) {
          profile.value = { ...profile.value, ...updatedData };
          useAuthStore().user = { ...useAuthStore().user, ...updatedData };
          console.log("Email updated to:", updatedData.email);
        }

        await getProfile();

        profileSuccess.value = "អ៊ីមែលត្រូវបានផ្លាស់ប្តូរជោគជ័យ!";
        return true;
      }

      return false;
    } catch (err) {
      profileError.value =
        err.response?.data?.message ||
        "តំណផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ ឬផុតកំណត់ (១៥នាទី)។";
      console.error("Verify email change error:", err);
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  const deleteAccount = async (email = null, password = null) => {
    profileLoading.value = true;
    clearMessages();

    try {
      if (!email) {
        profileError.value = "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក។";
        return false;
      }

      if (!password) {
        profileError.value = "សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក។";
        return false;
      }

      email = email.trim();
      password = password.trim();

      if (email !== profile.value?.email?.trim()) {
        profileError.value = "អ៊ីមែលមិនត្រូវគ្នា។";
        return false;
      }

      const response = await api.post("/auth/delete-account", {
        password,
      });

      if (response.status === 200 || response.status === 201) {
        profileSuccess.value = "គណនីត្រូវបានលុបជោគជ័យ។";

        useAuthStore().logout();
        return true;
      }

      return false;
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      if (errorMessage === "Invalid email or password") {
        profileError.value = "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។";
      } else if (errorMessage === "Account not found") {
        profileError.value = "គណនីមិនត្រូវបានរកឃើញ។";
      } else if (errorMessage === "Cannot delete account") {
        profileError.value = "មិនអាចលុបគណនីបានទេ។";
      } else {
        profileError.value = errorMessage || "បរាជ័យក្នុងការលុបគណនី។";
      }
      console.error("Delete account error:", err);
      return false;
    } finally {
      profileLoading.value = false;
    }
  };

  return {
    profile,
    profileLoading,
    profileError,
    profileSuccess,
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
