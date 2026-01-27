<template>
  <div class="container">
    <div class="brand-section">
      <div class="circle circle-lg"></div>
      <div class="circle circle-md"></div>
      <div class="circle circle-sm"></div>
      <div class="circle-left"></div>

      <div class="brand-content">
        <h1>កំណត់ពាក្យសម្ងាត់ឡើងវិញ</h1>
        <h2>ការពារសុវត្ថិភាពគណនីរបស់អ្នក</h2>
        <p>
          អ្នកនៅសល់តែមួយជំហានទៀតប៉ុណ្ណោះ។ សូមជ្រើសរើសពាក្យសម្ងាត់ថ្មីដែលរឹងមាំ
          ដើម្បីចូលប្រើប្រាស់កន្លែងធ្វើការរបស់អ្នកឡើងវិញ។
        </p>
      </div>
    </div>

    <div class="form-section">
      <div class="form-container">
        <h1 class="fw-bold mb-2">បង្កើតពាក្យសម្ងាត់ថ្មី</h1>
        <p class="subtitle">
          សូមបញ្ចូលព័ត៌មានសម្ងាត់ថ្មីរបស់អ្នក ដើម្បីការពារសុវត្ថិភាពគណនី។
        </p>

        <p v-if="authStore.successMessage" class="success-msg text-center mb-3">
          {{ authStore.successMessage }}
        </p>
        <p v-if="authStore.error" class="error-msg text-center mb-3">
          {{ authStore.error }}
        </p>

        <form @submit.prevent="handleReset" class="signup-form" novalidate>
          <input type="hidden" v-model="authStore.otpCode" />

          <AuthInput
            label="ពាក្យសម្ងាត់ថ្មី"
            type="password"
            v-model="authStore.newPassword"
            placeholder="យ៉ាងហោចណាស់ ៨ តួអក្សរ"
            :error="errors.newPassword" />

          <AuthInput
            label="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
            type="password"
            v-model="authStore.confirmNewPassword"
            placeholder="វាយពាក្យសម្ងាត់ថ្មីម្តងទៀត"
            :error="errors.confirmNewPassword" />

          <AuthButton
            type="submit"
            :text="'ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់'"
            :loadingText="'Resetting...'"
            :loading="authStore.loading"
            :disabled="authStore.loading" />
        </form>

        <div class="back-to-login">
          <router-link to="/login">
            <i class="fas fa-arrow-left"></i>ត្រឡប់ទៅទំព័រចូលប្រើប្រាស់
          </router-link>
        </div>
      </div>
    </div>

    <div class="bottom-right-circle"></div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authentication";
import { z } from "zod";
import AuthInput from "../../components/AuthInput.vue";
import AuthButton from "../../components/AuthButton.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const errors = reactive({
  newPassword: "",
  confirmNewPassword: "",
});

const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ"),
    confirmNewPassword: z.string().min(1, "សូមបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក។"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

onMounted(() => {
  const token = route.query.token || route.params.token;

  if (token) {
    authStore.otpCode = token;
    authStore.clearMessages();
  } else {
    authStore.error =
      "និមិត្តសញ្ញាកំណត់ឡើងវិញមិនត្រឹមត្រូវ ឬបាត់។ សូមស្នើសុំតំណថ្មី";
  }
});

const handleReset = async () => {
  errors.newPassword = "";
  errors.confirmNewPassword = "";
  authStore.clearMessages();

  const result = resetSchema.safeParse({
    newPassword: authStore.newPassword,
    confirmNewPassword: authStore.confirmNewPassword,
  });

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      errors[field] = issue.message;
    });
    return;
  }

  const success = authStore.resetPassword();

  if (success) {
    router.push("/login");
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.container {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.error-msg-small {
  color: #ff4d4d;
  font-size: 0.75rem;
  margin-top: 4px;
}

.input-error {
  border: 1px solid #ff4d4d !important;
}

.success-msg {
  color: #28a745;
  background-color: #f0fff4;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #c6f6d5;
}

.back-to-login {
  margin-top: 20px;
  text-align: center;
}

.back-to-login a {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.brand-section {
  flex: 1.15;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 30px;
  overflow: hidden;
}

.brand-content {
  max-width: 420px;
  z-index: 10;
}

.brand-content h1 {
  font-size: clamp(3rem, 7vw, 4.8rem);
  font-weight: 800;
  margin-bottom: 4px;
}
.brand-content h2 {
  font-size: clamp(1.4rem, 3.8vw, 1.9rem);
  font-weight: 500;
  margin-bottom: 10px;
  color: #a8e0e6;
}
.brand-content p {
  font-size: 0.92rem;
  line-height: 1.45;
  opacity: 0.9;
}

.circle {
  position: absolute;
  background: #1a636d;
  border-radius: 50%;
  opacity: 0.6;
  animation: float 7s ease-in-out infinite;
}

.circle-lg {
  width: 850px;
  height: 850px;
  top: -250px;
  left: -150px;
  animation-delay: 0s;
}

.circle-md {
  width: 350px;
  height: 350px;
  bottom: -80px;
  left: -100px;
  animation-delay: 1s;
}

.circle-sm {
  width: 280px;
  height: 280px;
  bottom: 50px;
  right: 3%;
  animation-delay: 2s;
}
.circle-left {
  width: 280px;
  height: 280px;
  bottom: 80px;
  right: 3%;
  animation-delay: 2s;
}

.form-section {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 16px 16px;
  overflow: hidden;
  min-height: 0;
}

.form-container {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  overflow: hidden;
}

.form-container h1 {
  font-size: 2rem;
  margin-bottom: 4px;
  color: #111;
}
.subtitle {
  color: #555;
  font-size: 0.82rem;
  line-height: 1.35;
  margin-bottom: 6px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.input-group label {
  color: #2f6f77;
  font-weight: 600;
  font-size: 0.78rem;
}
.input-group input {
  width: 100%;
  padding: 9px 11px;
  background: #e8f3f5;
  border: 2px solid transparent;
  border-radius: 7px;
  font-size: 0.88rem;
}

.input-group input:focus {
  background-color: #fff;
  border-color: #5596a0;
  box-shadow: 0 4px 10px rgba(85, 150, 160, 0.1);
}

.create-btn {
  width: 100%;
  padding: 10px;
  background: #247a85;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 6px;
}

.create-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #a0c4c9;
}

.create-btn:hover:not(:disabled) {
  background: #1a636d;
}

.back-to-login {
  text-align: center;
  margin-top: 12px;
}

.back-to-login a {
  color: #247a85;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.back-to-login a:hover {
  color: #1a636d;
}

.or-divider {
  text-align: center;
  color: #777;
  font-size: 0.78rem;
  margin: 14px 0;
  position: relative;
}

.or-divider::before,
.or-divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 44%;
  height: 1px;
  background: #e0ecef;
  transform: translateY(-50%);
}
.or-divider::before {
  left: 0;
}
.or-divider::after {
  right: 0;
}

.help-section {
  text-align: center;
  margin-top: 8px;
}

.help-text {
  color: #555;
  font-size: 0.82rem;
  margin-bottom: 6px;
}

.contact-link {
  color: #247a85;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.85rem;
}

.contact-link:hover {
  text-decoration: underline;
}

.bottom-right-circle {
  position: fixed;
  width: 250px;
  height: 250px;
  background: #247a85;
  border-radius: 50%;
  bottom: -50px;
  right: -50px;
  z-index: 1;
  overflow: hidden;
}

@media (max-width: 900px) {
  .brand-section {
    display: none;
  }
  .form-section {
    padding: 16px 12px 12px;
  }
  .form-container {
    max-width: 100%;
  }
  .bottom-right-circle {
    display: none;
  }
}

.error-msg {
  color: #d32f2f;
  font-size: 0.82rem;
  margin-top: 2px;
  padding: 8px;
  background: #ffebee;
  border-radius: 5px;
}

.success-msg {
  color: #2e7d32;
  font-size: 0.82rem;
  margin-top: 2px;
  padding: 8px;
  background: #e8f5e9;
  border-radius: 5px;
}
</style>
