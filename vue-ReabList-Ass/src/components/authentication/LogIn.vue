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
        <h1 class="fw-bold mb-2">Log In</h1>
        <p class="subtitle">
          Please enter your credentials to access your account.
        </p>

        <p
          v-if="auth.error"
          class="error-msg"
          style="text-align: center; margin-bottom: 8px"
        >
          {{ auth.error }}
        </p>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="signup-form">
          <!-- Email -->
          <div class="input-group">
            <label>Email</label>
            <input
              type="email"
              v-model="form.email"
              placeholder="Enter Your email"
              autofocus
            />
            <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="input-group">
            <label>Password</label>
            <div class="input-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Enter Your password"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <i
                  :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                ></i>
              </button>
            </div>
            <p v-if="errors.password" class="error-msg">
              {{ errors.password }}
            </p>
          </div>

          <div class="form-footer-login">
            <div class="remember-me">
              <input type="checkbox" v-model="form.rememberMe" id="remember" />
              <label for="remember">Remember me</label>
            </div>
            <router-link to="/forget-password" class="forgot-link">
              Forgot password?
            </router-link>
          </div>

          <button class="create-btn" :disabled="auth.loading">
            {{ auth.loading ? "Signing in..." : "Sign In" }}
          </button>
        </form>

        <div class="or-divider">or</div>

        <div class="social-icons">
          <a href="#"><i class="fab fa-google"></i></a>
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-apple"></i></a>
        </div>

        <p class="login-link">
          Don't have an account?
          <router-link to="/register">Create one</router-link>
        </p>
      </div>

      <div class="bottom-right-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "../../stores/authentication";
import { useRouter } from "vue-router";
import { z } from "zod";

// --- Auth store ---
const auth = useAuthStore();
const router = useRouter();

const showPassword = ref(false);

const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const errors = reactive({
  email: "",
  password: "",
});

onMounted(() => {
  auth.clearMessages();
});

const handleLogin = async () => {
  errors.email = "";
  errors.password = "";

  const result = loginSchema.safeParse({
    email: form.email,
    password: form.password,
  });

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field === "email") {
        errors.email = issue.message;
      } else if (field === "password") {
        errors.password = issue.message;
      }
    });
    return;
  }

  try {
    auth.email = form.email;
    auth.password = form.password;
    auth.rememberMe = form.rememberMe;

    const success = await auth.login();
    if (success) {
      router.push("/dashboard");
    }
  } catch (err) {
    console.error("Login failed:", err);
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

/* Right side – no inner scroll by default */
.form-section {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 16px 16px; /* very compact top padding */
  overflow: hidden; /* ← No inner scroll either */
  min-height: 0; /* allows shrinking */
  overflow: hidden;
}

.form-container {
  width: 100%;
  max-width: 350px; /* narrower = less height needed */
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
  justify-content: flex-start;
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
  font-size: 0.72rem;
  margin-top: 2px;
}
</style>
