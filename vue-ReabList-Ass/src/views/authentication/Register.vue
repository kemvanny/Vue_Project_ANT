<template>
  <div class="container">
    <div class="brand-section">
      <div class="circle circle-lg"></div>
      <div class="circle circle-md"></div>
      <div class="circle circle-sm"></div>
      <div class="circle-left"></div>

      <div class="brand-content">
        <h1>សូមស្វាគមន៍</h1>
        <h2>Your Handle Your Name</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
      </div>
    </div>

    <div class="form-section">
      <div class="form-container">
        <h1 class="fw-bold mb-2">ចុះឈ្មោះ</h1>
        <p class="subtitle">ចូលរួមជាមួយប្រព័ន្ធរបស់យើង ដោយបង្កើតគណនីថ្មី.</p>

        <p v-if="auth.error" class="error-msg text-center mb-2">
          {{ auth.error }}
        </p>

        <form @submit.prevent="handleRegister" class="signup-form" novalidate>
          <AuthInput
            label="ឈ្មោះពេញ"
            type="text"
            v-model="auth.fullName"
            placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក"
            :error="errors.fullName" />

          <AuthInput
            label="អ៊ីមែល"
            type="email"
            v-model="auth.email"
            placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
            :error="errors.email" />

          <AuthInput
            label="ពាក្យសម្ងាត់"
            type="password"
            v-model="auth.password"
            placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
            :error="errors.password" />

          <AuthInput
            label="បញ្ជាក់ពាក្យសម្ងាត់"
            type="password"
            v-model="auth.confirmPassword"
            placeholder="បញ្ជាក់ពាក្យសម្ងាត់របស់អ្នកម្តងទៀត"
            :error="errors.confirmPassword" />

          <div class="form-footer">
            <div class="checkbox-group">
              <input type="checkbox" v-model="auth.agreedTerms" id="terms" />
              <label for="terms">
                ខ្ញុំយល់ព្រមតាម <a href="#">លក្ខខណ្ឌប្រើប្រាស់</a> &
                <a href="#">និង គោលការណ៍ឯកជនភាព។</a>.
              </label>
            </div>
            <p v-if="errors.agreedTerms" class="error-msg-small">
              {{ errors.agreedTerms }}
            </p>
          </div>

          <AuthButton
            type="submit"
            :text="'បង្កើតគណនី'"
            :loadingText="'បង្កើតគណនី...'"
            :loading="auth.loading"
            :disabled="auth.loading" />
        </form>

        <div class="or-divider">ឬ</div>

        <p class="login-link">
          មានគណនីរួចហើយមែនទេ?
          <router-link to="/login">ចូលប្រើប្រាស់</router-link>
        </p>
      </div>

      <div class="bottom-right-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useAuthStore } from "@/stores/authentication";
import { useRouter } from "vue-router";
import { z } from "zod";
import AuthButton from "../../components/AuthButton.vue";
import AuthInput from "../../components/AuthInput.vue";

const auth = useAuthStore();
const router = useRouter();

const errors = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreedTerms: "",
});

const registerSchema = z
  .object({
    fullName: z.string().min(2, "ឈ្មោះត្រូវតែមានយ៉ាងហោចណាស់ 2 តួអក្សរ"),
    email: z
      .string()
      .min(1, "អ៊ីមែលត្រូវបានទាមទារ")
      .email("ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ"),
    password: z.string().min(8, "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ"),
    confirmPassword: z.string().min(1, "សូមបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក។"),
    agreedTerms: z.literal(true, {
      errorMap: () => ({ message: "អ្នកត្រូវតែទទួលយកលក្ខខណ្ឌ" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។",
    path: ["confirmPassword"],
  });

const handleRegister = async () => {
  Object.keys(errors).forEach((key) => (errors[key] = ""));
  auth.clearMessages();

  const validation = registerSchema.safeParse({
    fullName: auth.fullName,
    email: auth.email,
    password: auth.password,
    confirmPassword: auth.confirmPassword,
    agreedTerms: auth.agreedTerms,
  });

  if (!validation.success) {
    validation.error.issues.forEach((issue) => {
      const field = issue.path[0];
      errors[field] = issue.message;
    });
    return;
  }

  const success = await auth.register();
  if (success) {
    router.push("/verify-email");
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

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-msg.text-center {
  background: #fff0f0;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ffcaca;
  color: #d32f2f;
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

/* Left side */
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
  justify-content: center;
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
  gap: 5px;
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
  /* transform: scale(1.01); */
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

.form-footer {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.78rem;
  margin-top: 4px;
}

.form-footer a {
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
  overflow: hidden;
}

/* Mobile */
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
