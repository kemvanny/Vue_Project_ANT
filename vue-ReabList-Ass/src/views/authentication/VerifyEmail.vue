<template>
  <div class="container">
    <div class="brand-section">
      <div class="circle circle-lg"></div>
      <div class="circle circle-md"></div>
      <div class="circle-left"></div>
      <div class="brand-content">
        <h1>VERIFY</h1>
        <h2>Confirm Email</h2>
        <p>
          Please ensure your email is correct before we send the secure
          verification code.
        </p>
      </div>
    </div>

    <div class="form-section">
      <div class="form-container">
        <div class="fade-in">
          <h1 class="fw-bold mb-2">Check Email</h1>
          <p class="subtitle">Is this the correct email for your account?</p>

          <div class="input-group mt-4">
            <label>Registration Email</label>
            <div
              class="email-wrapper"
              :class="{ 'is-editing': isEditing, 'has-error': errors.email }"
            >
              <input
                type="email"
                v-model="auth.email"
                :disabled="!isEditing"
                class="confirm-input"
                @keyup.enter="toggleEdit"
              />
              <button @click="toggleEdit" class="edit-btn">
                {{ isEditing ? "SAVE" : "CHANGE" }}
              </button>
            </div>
            <p v-if="errors.email" class="error-msg-small">
              {{ errors.email }}
            </p>
          </div>

          <button
            class="create-btn mt-4"
            :disabled="isEditing || auth.loading"
            @click="handleSendCode"
          >
            {{ auth.loading ? "Sending..." : "Yes, Send Code" }}
          </button>
        </div>

        <p v-if="auth.error" class="error-msg mt-3 text-center">
          {{ auth.error }}
        </p>
      </div>
      <div class="bottom-right-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "../../stores/authentication";
import { useRouter } from "vue-router";
import { z } from "zod";

const auth = useAuthStore();
const router = useRouter();
const isEditing = ref(false);

const errors = reactive({
  email: "",
});

const emailSchema = z
  .string()
  .min(1, "Email cannot be empty")
  .email("Invalid email format");

const toggleEdit = () => {
  if (isEditing.value) {
    const result = emailSchema.safeParse(auth.email);
    if (!result.success) {
      errors.email = result.error.errors[0].message;
      return;
    }
    errors.email = "";
  }
  isEditing.value = !isEditing.value;
};

const handleSendCode = async () => {
  errors.email = "";
  auth.clearMessages();

  const result = emailSchema.safeParse(auth.email);
  if (!result.success) {
    errors.email = result.error.errors[0].message;
    return;
  }

  const success = auth.sendOtp();
  if (success) {
    router.push("/verify-otp");
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

/* Brand Section (Left) */
.brand-section {
  flex: 1.15;
  /* background: #247a85; */
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
.email-wrapper {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #eee;
  padding: 5px 0;
  transition: border-color 0.3s ease;
}

.email-wrapper.is-editing {
  border-color: #3b82f6; /* Blue border when editing */
}

.email-wrapper.has-error {
  border-color: #ff4d4d; /* Red border on error */
}

.confirm-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #333;
  outline: none;
}

.confirm-input:disabled {
  color: #888;
}

.edit-btn {
  background: transparent;
  border: none;
  color: #3b82f6;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  padding-left: 10px;
}

.error-msg-small {
  color: #ff4d4d;
  font-size: 0.8rem;
  margin-top: 5px;
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

/* Form Section (Right) */
.form-section {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  position: relative;
  overflow: hidden;
}

.form-container {
  width: 100%;
  max-width: 350px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.circle {
  position: absolute;
  background-color: #1a636d;
  border-radius: 50%;
  opacity: 0.8;
  animation: float 6s ease-in-out infinite;
}

.circle-lg {
  width: 850px;
  height: 850px;
  background-color: #1a636d;
  top: -250px;
  left: -150px;
  animation-delay: 0s;
}

.circle-md {
  width: 350px;
  height: 350px;
  bottom: -80px;
  background-color: #1a636d;
  left: -100px;
  animation-delay: 1s;
}

.circle-sm {
  width: 280px;
  height: 280px;
  bottom: 50px;
  background-color: #1a636d;
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

/* Input Styles */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group label {
  color: #2f6f77;
  font-weight: 600;
  font-size: 0.78rem;
}

/* Email Specific Styling */
.email-wrapper {
  display: flex;
  background: #e8f3f5;
  border-radius: 7px;
  padding: 5px 10px;
  align-items: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.email-wrapper.is-editing {
  border-color: #247a85;
  background: white;
}

.confirm-input {
  border: none !important;
  background: transparent !important;
  flex: 1;
  padding: 10px;
  font-weight: 600;
  color: #333;
  font-size: 0.88rem;
}

.edit-btn {
  background: none;
  border: none;
  color: #247a85;
  font-weight: 800;
  font-size: 0.7rem;
  cursor: pointer;
  padding: 5px;
}

/* OTP Specific Styling */
.otp-input {
  letter-spacing: 12px;
  text-align: center;
  font-size: 1.5rem !important;
  font-weight: bold;
  color: #247a85;
  background: #e8f3f5;
  border: 2px solid transparent;
  border-radius: 7px;
  padding: 12px;
  width: 100%;
}

.otp-input:focus {
  background-color: #fff;
  border-color: #5596a0;
  outline: none;
}

/* Buttons */
.create-btn {
  width: 100%;
  padding: 12px;
  background: #247a85;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.create-btn:hover:not(:disabled) {
  background: #1a636d;
}

.create-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Links */
.resend-link {
  text-align: center;
  margin-top: 20px;
  font-size: 0.82rem;
}

.resend-link a {
  color: #247a85;
  font-weight: 600;
  text-decoration: none;
}

/* Decorative Circles & Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
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
}

.circle-md {
  width: 350px;
  height: 350px;
  bottom: -80px;
  left: -100px;
  animation-delay: 1s;
}

.circle-left {
  position: absolute;
  width: 280px;
  height: 280px;
  background: #1a636d;
  border-radius: 50%;
  bottom: 80px;
  right: 3%;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
  animation-delay: 2s;
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
}

/* Messaging & Utility */
.error-msg {
  color: #d32f2f;
  font-size: 0.72rem;
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsiveness */
@media (max-width: 900px) {
  .brand-section {
    display: none;
  }
  .form-section {
    padding: 16px;
  }
  .bottom-right-circle {
    display: none;
  }
}
</style>
