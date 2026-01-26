<template>
  <div class="container">
    <div class="brand-section">
      <div class="circle circle-lg"></div>
      <div class="circle circle-md"></div>
      <div class="circle circle-sm"></div>
      <div class="circle-left"></div>

      <div class="brand-content">
        <h1>FORGOT PASSWORD</h1>
        <h2>We've Got You Covered</h2>
        <p>
          Enter your email address and we'll send you a secure link to reset
          your password. You'll be back in your account in no time.
        </p>
      </div>
    </div>

    <div class="form-section">
      <div class="form-container">
        <h1 class="fw-bold mb-2">Forgot Password?</h1>
        <p class="subtitle">
          No worries! Enter your email and we'll send you reset instructions.
        </p>

        <p v-if="authStore.successMessage" class="success-msg text-center mb-2">
          {{ authStore.successMessage }}
        </p>

        <p v-if="authStore.error" class="error-msg text-center mb-2">
          {{ authStore.error }}
        </p>

        <form
          v-if="!authStore.successMessage"
          @submit.prevent="handleForgotPassword"
          class="signup-form"
          novalidate
        >
          <div class="input-group">
            <label>Email Address</label>
            <input
              type="email"
              v-model="authStore.resetEmail"
              placeholder="Enter your email"
              :class="{ 'input-error': errors.email }"
              autofocus
            />
            <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
          </div>

          <button
            type="submit"
            class="create-btn"
            :disabled="authStore.loading"
          >
            {{ authStore.loading ? "Sending..." : "Send Reset Link" }}
          </button>
        </form>

        <div class="back-to-login">
          <router-link to="/login">
            <i class="fas fa-arrow-left"></i> Back to Login
          </router-link>
        </div>
      </div>

      <div class="bottom-right-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authentication";
import { z } from "zod";

const router = useRouter();
const authStore = useAuthStore();

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const errors = reactive({
  email: "",
});

const handleForgotPassword = async () => {
  errors.email = "";
  authStore.clearMessages();

  const result = forgotPasswordSchema.safeParse({
    email: authStore.resetEmail,
  });

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      if (issue.path[0] === "email") {
        errors.email = issue.message;
      }
    });
    return;
  }

  try {
    await authStore.forgotPassword();
  } catch (err) {
    console.error("Forgot password request failed:", err);
  }
};

const goBackToLogin = () => {
  authStore.clearMessages();
  authStore.resetForgotPasswordForm();
  router.push({ name: "Login" });
};

onUnmounted(() => {
  authStore.loading = false;
});
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

.input-error {
  border-color: #ff4d4d !important;
}

.success-msg {
  color: #28a745;
  font-size: 0.9rem;
  background: #e8f5e9;
  padding: 10px;
  border-radius: 4px;
}

.error-msg {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 4px;
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
  position: absolute;
  width: 200px;
  height: 200px;
  background: #247a85;
  border-radius: 50%;
  bottom: 0px;
  right: 0px;
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
