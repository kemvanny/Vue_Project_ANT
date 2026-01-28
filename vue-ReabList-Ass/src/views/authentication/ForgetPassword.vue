<template>
  <div class="page-wrapper d-flex align-items-center justify-content-center min-vh-100">
    <div class="gradient-bg"></div>

    <div class="animation-area">
      <ul class="box-area">
        <li v-for="n in 15" :key="n"></li>
      </ul>
    </div>

    <div class="shape shape-1" :style="parallaxStyle(25)"></div>
    <div class="shape shape-2" :style="parallaxStyle(-25)"></div>

    <div class="card glass-card border-0 shadow-2xl rounded-5 overflow-hidden animate-entrance">
      <div class="row g-0 h-100">

        <div class="col-lg-5 d-none d-lg-flex flex-column align-items-center justify-content-center bg-gradient-teal text-white p-5 position-relative overflow-hidden">
          <div class="glow-circle" :style="parallaxStyle(-10)"></div>
          <div class="z-2 text-center content-wrapper">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-5795916-4841573.png" 
              alt="Forgot Password 3D"
              class="img-fluid mb-4 floating-3d" 
              :style="parallaxStyle(15)"
              style="max-height: 250px; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3));">

            <h3 class="fw-bold tracking-wide mb-2 text-shadow">ភ្លេចពាក្យសម្ងាត់?</h3>
            <p class="text-white-50 small px-3">
              កុំបារម្ភ! យើងនៅទីនេះដើម្បីជួយអ្នកទទួលបានគណនីរបស់អ្នកមកវិញ។
            </p>
          </div>
        </div>

        <div class="col-lg-7 bg-white-glass d-flex align-items-center position-relative">
          <div class="card-body p-4 p-lg-5">
            
            <div class="mb-4 stagger-1">
              <h2 class="fw-bold text-teal mb-1">កំណត់ពាក្យសម្ងាត់</h2>
              <p class="text-muted">បញ្ចូលអ៊ីមែលដើម្បីទទួលតំណភ្ជាប់។</p>
            </div>

            <transition name="shake">
              <div v-if="authStore.successMessage" class="alert alert-success py-2 small mb-4 rounded-3 border-0 stagger-2 shadow-sm text-center">
                <i class="bi bi-check-circle-fill me-2"></i>{{ authStore.successMessage }}
              </div>
            </transition>

            <transition name="shake">
              <div v-if="authStore.error" class="alert alert-danger py-2 small mb-4 rounded-3 border-0 stagger-2 shadow-sm">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ authStore.error }}
              </div>
            </transition>

            <form 
              v-if="!authStore.successMessage"
              @submit.prevent="handleForgotPassword"
              novalidate
            >
              <AuthInput 
                label="អាសយដ្ឋានអ៊ីមែល" 
                type="email" 
                v-model="authStore.resetEmail" 
                placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                :error="errors.email" 
                autofocus 
                class="stagger-2"
              />

              <AuthButton 
                type="submit" 
                :text="'ផ្ញើតំណភ្ជាប់កំណត់ឡើងវិញ'" 
                :loadingText="'កំពុងផ្ញើ...'" 
                :loading="authStore.loading"
                :disabled="authStore.loading"
                class="stagger-3 mt-3" 
              />
            </form>

            <div class="text-center mt-4 stagger-4">
              <a href="#" @click.prevent="goBackToLogin" class="fw-bold text-teal text-decoration-none ms-1 link-effect d-inline-flex align-items-center">
                <i class="bi bi-arrow-left me-2"></i> ត្រឡប់ទៅទំព័រចូលប្រើប្រាស់
              </a>
            </div>

            <div class="text-center mt-5 small text-muted stagger-5">
              ត្រូវការជំនួយបន្ថែមមែនទេ?
              <a href="#" class="text-teal text-decoration-none fw-bold ms-1 link-effect">ទាក់ទងផ្នែកគាំទ្រ</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authentication";
import { z } from "zod";
import AuthInput from "../../components/AuthInput.vue";
import AuthButton from "../../components/AuthButton.vue";
import { ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const mouseX = ref(0);
const mouseY = ref(0);

const parallaxStyle = (intensity) => {
  const x = mouseX.value * intensity;
  const y = mouseY.value * intensity;
  return { transform: `translate(${x}px, ${y}px)` };
};
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
    const success = await authStore.forgotPassword();
    if (success) {
      router.push("/verify-otp");
    }
  } catch (err) {
    console.error("Forgot password request failed:", err);
  }
};

const goBackToLogin = () => {
  authStore.clearMessages();
  authStore.resetForgotPasswordForm();
  router.push({ name: "login" });
};

onUnmounted(() => {
  authStore.loading = false;
});
</script>

