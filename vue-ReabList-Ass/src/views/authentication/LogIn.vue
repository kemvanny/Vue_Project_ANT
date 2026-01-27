<template>
  <div class="container">
    <!-- Left Section -->
    <div class="brand-section">
      <div class="circle circle-lg"></div>
      <div class="circle circle-md"></div>
      <div class="circle circle-sm"></div>
      <div class="circle-left"></div>

      <div class="brand-content">
        <h1>WELCOME BACK</h1>
        <h2>Your Handle Your Name</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
      </div>
    </div>

    <!-- Right Section (Form) -->
    <div class="form-section">
      <div class="form-container">
        <h1 class="fw-bold mb-2">ចូលប្រើប្រាស់</h1>
        <p class="subtitle">សូមបញ្ចូលព័ត៌មានរបស់អ្នក ដើម្បីចូលប្រើគណនី</p>

        <p
          v-if="auth.error"
          class="error-msg"
          style="text-align: center; margin-bottom: 8px">
          {{ auth.error }}
        </p>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="signup-form">
          <!-- Email -->
          <AuthInput
            label="អ៊ីមែល"
            type="email"
            v-model="form.email"
            placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
            :error="errors.email"
            autofocus />

          <!-- Password -->
          <AuthInput
            label="ពាក្យសម្ងាត់"
            type="password"
            v-model="form.password"
            placeholder="បញ្ចូលពាក្យសម្ងាត់"
            :error="errors.password" />

          <!-- Footer -->
          <div class="form-footer-login">
            <div class="remember-me">
              <input type="checkbox" v-model="form.rememberMe" />
              <label>ចងចាំខ្ញុំ</label>
            </div>

            <router-link to="/forget-password" class="forgot-link">
              ភ្លេចពាក្យសម្ងាត់?
            </router-link>
          </div>

          <!-- Button -->
          <AuthButton
            :type="'submit'"
            text="ចូលប្រើ"
            loading-text="កំពុងចូល..."
            :loading="auth.loading" />
        </form>

        <div class="or-divider">ឬ</div>

        <p class="login-link">
          មិនទាន់មានគណនីមែនទេ?
          <router-link to="/register">បង្កើតគណនីថ្មី</router-link>
        </p>
      </div>

      <div class="bottom-right-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useAuthStore } from "../../stores/authentication";
import { useRouter } from "vue-router";
import { z } from "zod";
import AuthInput from "../../components/AuthInput.vue";
import AuthButton from "../../components/AuthButton.vue";

const auth = useAuthStore();
const router = useRouter();

const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const errors = reactive({
  email: "",
  password: "",
});

const loginSchema = z.object({
  email: z.string().min(1, "អ៊ីមែលត្រូវបានទាមទារ").email("អ៊ីមែលមិនត្រឹមត្រូវ"),
  password: z.string().min(6, "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 6 តួអក្សរ"),
});

onMounted(() => {
  auth.clearMessages();
});

const handleLogin = async () => {
  errors.email = "";
  errors.password = "";

  const result = loginSchema.safeParse(form);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      errors[issue.path[0]] = issue.message;
    });
    return;
  }

  auth.email = form.email;
  auth.password = form.password;
  auth.rememberMe = form.rememberMe;

  const success = await auth.login();
  if (success) router.push("/dashboard");
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

.circle {
  position: absolute;
  background: #1a636d;
  border-radius: 50%;
  opacity: 0.6;
  animation: float 7s ease-in-out infinite;
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

/* Right side – Form centered */
.form-section {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 16px 16px;
  overflow: hidden;
  position: relative;
  min-height: 0;
}

.form-container {
  width: 100%;
  max-width: 380px;
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
  padding: 12px 14px;
  background: white;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.input-group input::placeholder {
  color: #9ca3af;
}

.input-group input:focus {
  background-color: #fff;
  border-color: #247a85;
  box-shadow: 0 0 0 3px rgba(36, 122, 133, 0.1);
  outline: none;
}

.input-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 11px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #247a85;
  font-size: 0.95rem;
  cursor: pointer;
}

/* ─── MODIFIED FOOTER FOR LOGIN ─── */
.form-footer-login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  margin-top: 4px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #555;
}

.forgot-link {
  color: #247a85;
  font-weight: 600;
  text-decoration: none;
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
}

.create-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #a0c4c9;
}

.create-btn:hover:not(:disabled) {
  background: #1a636d;
}

.or-divider {
  text-align: center;
  color: #777;
  font-size: 0.78rem;
  margin: 10px 0;
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

.social-icons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 6px 0;
}
.social-icons a {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f0f7f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.15rem;
}

.login-link {
  text-align: center;
  font-size: 0.82rem;
  margin-top: 10px;
}
.login-link a {
  color: #247a85;
  font-weight: 600;
  text-decoration: none;
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
  /* overflow: hidden; */
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
  font-size: 0.72rem;
  margin-top: 2px;
}
</style>
