<template>
  <div class="container">
    <div class="brand-section">
      <div class="circle circle-lg"></div>
      <div class="circle circle-md"></div>
      <div class="circle-left"></div>
      <div class="brand-content">
        <h1>VERIFY</h1>
        <h2>Security Code</h2>
        <p>We have sent a 6-digit code to your inbox. Please enter it below.</p>
      </div>
    </div>

    <div class="form-section">
      <div class="form-container">
        <div class="fade-in">
          <h1 class="fw-bold mb-2">Verify OTP</h1>
          <p class="subtitle">
            Enter the code sent to <strong>{{ auth.email }}</strong>
          </p>

          <form @submit.prevent="handleVerify" class="signup-form mt-4">
            <div class="input-group">
              <label>6-Digit Code</label>
              <div class="otp-container">
                <input
                  v-for="(digit, index) in 6"
                  :key="index"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="1"
                  v-model="otpDigits[index]"
                  @input="handleInput($event, index)"
                  @keydown="handleKeyDown($event, index)"
                  @paste="handlePaste"
                  class="otp-box"
                  :class="{
                    filled: otpDigits[index],
                    active: activeIndex === index,
                  }"
                  :ref="
                    (el) => {
                      if (el) otpRefs[index] = el;
                    }
                  "
                  autocomplete="one-time-code"
                />
              </div>
            </div>

            <!-- Hidden field synced with store -->
            <input type="hidden" v-model="auth.otpCode" />

            <button
              class="create-btn mt-5"
              :disabled="auth.loading || otpDigits.some((d) => !d)"
            >
              {{ auth.loading ? "Verifying..." : "Verify Account" }}
            </button>
          </form>

          <div class="resend-link mt-4 text-center">
            Didn't get it?
            <a href="#" @click.prevent="handleResend">Resend Code</a> or
            <a href="#" @click.prevent="router.push('/confirm-email')"
              >Change Email</a
            >
          </div>

          <p v-if="auth.error" class="error-msg mt-3 text-center">
            {{ auth.error }}
          </p>
        </div>

        <div class="bottom-right-circle"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { useAuthStore } from "../../stores/authentication";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const otpDigits = ref(Array(6).fill(""));
const otpRefs = ref([]);
const activeIndex = ref(0);

watch(
  otpDigits,
  (newDigits) => {
    auth.otpCode = newDigits.join("");
  },
  { deep: true },
);

onMounted(() => {
  nextTick(() => {
    otpRefs.value[0]?.focus();
  });
});

const handleInput = (e, index) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 1) value = value[0];

  otpDigits.value[index] = value;

  if (value && index < 5) {
    activeIndex.value = index + 1;
    nextTick(() => otpRefs.value[index + 1]?.focus());
  }
};

const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    if (!otpDigits.value[index] && index > 0) {
      e.preventDefault();
      activeIndex.value = index - 1;
      nextTick(() => otpRefs.value[index - 1]?.focus());
    }
  } else if (e.key === "ArrowLeft" && index > 0) {
    e.preventDefault();
    otpRefs.value[index - 1]?.focus();
  } else if (e.key === "ArrowRight" && index < 5) {
    e.preventDefault();
    otpRefs.value[index + 1]?.focus();
  } else if (!/[0-9]/.test(e.key) && e.key.length === 1) {
    e.preventDefault();
  }
};

const handlePaste = (e) => {
  e.preventDefault();
  const pasted = (e.clipboardData || window.clipboardData)
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, 6);

  if (pasted.length > 0) {
    const digits = pasted.split("");
    otpDigits.value = [...digits, ...Array(6 - digits.length).fill("")];

    const nextFocus = Math.min(digits.length, 5);
    activeIndex.value = nextFocus;
    nextTick(() => otpRefs.value[nextFocus]?.focus());
  }
};

const handleResend = async () => {
  auth.clearMessages();
  otpDigits.value = Array(6).fill("");
  activeIndex.value = 0;
  await auth.sendOtp();
  nextTick(() => otpRefs.value[0]?.focus());
};

const handleVerify = async () => {
  try {
    if (auth.clearMessages) auth.clearMessages();

    const success = await auth.verifyEmail();

    if (success) {
      auth.resetRegisterForm();
      router.push("/login");
    }
  } catch (err) {
    console.error("Verification failed:", err);
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

.otp-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 16px 0 24px;
}

.otp-box {
  width: 52px;
  height: 64px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #247a85;
  background: #f0f7f8;
  border: 2px solid #d1e5e8;
  border-radius: 12px;
  transition: all 0.18s ease;
  caret-color: #247a85;
}

.otp-box:focus {
  outline: none;
  border-color: #247a85;
  background: white;
  box-shadow: 0 0 0 4px rgba(36, 122, 133, 0.18);
}

.otp-box.filled {
  background: #e3f0f2;
  border-color: #a8e0e6;
  color: #1a636d;
}

.otp-box.active {
  border-color: #247a85;
  background: white;
}

/* Optional: make it look more "modern flat" */
.otp-box {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
}

/* Mobile adjustments */
@media (max-width: 500px) {
  .otp-box {
    width: 44px;
    height: 56px;
    font-size: 1.7rem;
  }
  .otp-container {
    gap: 8px;
  }
}

/* ──────────────────────────────────────────────
   Keep your existing button, label, error-msg, resend-link, etc. styles
──────────────────────────────────────────────── */

.create-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.input-group label {
  color: #2f6f77;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 8px;
  display: block;
}
</style>
