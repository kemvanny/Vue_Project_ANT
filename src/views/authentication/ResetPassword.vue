<template>
  <div
    class="page-wrapper d-flex align-items-center justify-content-center min-vh-100"
  >
    <div class="gradient-bg"></div>

    <div class="animation-area">
      <ul class="box-area">
        <li v-for="n in 15" :key="n"></li>
      </ul>
    </div>

    <div class="shape shape-1" :style="parallaxStyle(25)"></div>
    <div class="shape shape-2" :style="parallaxStyle(-25)"></div>

    <div
      class="card glass-card border-0 shadow-2xl rounded-5 overflow-hidden animate-entrance"
    >
      <div class="row g-0 h-100">
        <div
          class="col-lg-5 d-none d-lg-flex flex-column align-items-center justify-content-center bg-gradient-teal text-white p-5 position-relative overflow-hidden"
        >
          <div class="glow-circle" :style="parallaxStyle(-10)"></div>
          <div class="z-2 text-center content-wrapper">
            <img
              :src="ResetPasswordImage"
              alt="Security 3D"
              class="img-fluid mb-4 floating-3d"
              :style="parallaxStyle(15)"
              style="
                max-height: 250px;
                filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
              "
            />

            <h3 class="fw-bold tracking-wide mb-2 text-shadow">
              សុវត្ថិភាពគណនី
            </h3>
            <p class="text-white-50 small px-3">
              ការពារគណនីរបស់អ្នកដោយប្រើពាក្យសម្ងាត់ដែលរឹងមាំនិងមានសុវត្ថិភាព។
            </p>
          </div>
        </div>

        <div
          class="col-lg-7 bg-white-glass d-flex align-items-center position-relative"
        >
          <div class="card-body p-4 p-lg-5">
            <div class="mb-4 stagger-1">
              <h2 class="fw-bold text-teal mb-1">បង្កើតពាក្យសម្ងាត់ថ្មី</h2>
              <p class="text-muted">
                សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នកខាងក្រោម។
              </p>
            </div>

            <transition name="shake">
              <div
                v-if="authStore.successMessage"
                class="alert alert-success py-2 small mb-4 rounded-3 border-0 stagger-2 shadow-sm text-center"
              >
                <i class="bi bi-check-circle-fill me-2"></i
                >{{ authStore.successMessage }}
              </div>
            </transition>

            <form @submit.prevent="handleReset" novalidate>
              <input type="hidden" v-model="authStore.otpCode" />

              <AuthInput
                label="ពាក្យសម្ងាត់ថ្មី"
                type="password"
                v-model="authStore.newPassword"
                placeholder="យ៉ាងហោចណាស់ ៨ តួអក្សរ"
                :error="errors.newPassword"
                class="stagger-3 mb-2"
              />

              <AuthInput
                label="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                type="password"
                v-model="authStore.confirmNewPassword"
                placeholder="វាយពាក្យសម្ងាត់ថ្មីម្តងទៀត"
                :error="errors.confirmNewPassword"
                class="stagger-4 mb-3"
              />
              <transition name="shake">
                <div
                  v-if="authStore.error"
                  class="alert alert-danger py-2 small mb-4 rounded-3 border-0 stagger-2 shadow-sm text-center"
                >
                  <i class="bi bi-exclamation-triangle-fill me-2"></i
                  >{{ authStore.error }}
                </div>
              </transition>

              <AuthButton
                type="submit"
                :text="'ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់'"
                :loadingText="'កំពុងផ្លាស់ប្តូរ...'"
                :loading="authStore.loading"
                :disabled="authStore.loading"
                class="stagger-5"
              />
            </form>

            <div class="text-center mt-4 stagger-6">
              <div
                class="fw-bold text-teal text-decoration-none ms-1 link-effect d-inline-flex align-items-center"
              >
                តំណភ្ជាប់នេះនឹងផុតកំណត់ក្នុងរយៈពេល ១ ម៉ោង
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authentication";
import { z } from "zod";
import AuthInput from "../../components/AuthInput.vue";
import AuthButton from "../../components/AuthButton.vue";
import ResetPasswordImage from "@/assets/images/auth/resetpassword.png";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const mouseX = ref(0);
const mouseY = ref(0);

const parallaxStyle = (intensity) => {
  const x = mouseX.value * intensity;
  const y = mouseY.value * intensity;
  return { transform: `translate(${x}px, ${y}px)` };
};

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
    message: "ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ",
    path: ["confirmNewPassword"],
  });

onMounted(() => {
  const token = route.query.token || route.params.token;

  if (token) {
    authStore.otpCode = token;
    authStore.clearMessages();
  } else if (!authStore.resetMode) {
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
/* ── Base page wrapper — always full viewport, always centered ── */
.page-wrapper {
  min-height: 100vh;
  min-height: 100svh;
  width: 100%;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box;
}

/* ── Tablet (576px – 991px) ───────────────────────────────────── */
@media (max-width: 991px) {
  .page-wrapper {
    padding: 1.5rem 1rem;
    overflow-x: hidden;
  }

  .animation-area,
  .box-area {
    display: none !important;
  }

  .shape,
  .shape-1,
  .shape-2 {
    display: none !important;
  }

  .card {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    border-radius: 1.25rem !important;
  }

  .card-body {
    padding: 2rem !important;
  }
}

/* ── Mobile (≤ 575px) ─────────────────────────────────────────── */
@media (max-width: 575px) {
  .page-wrapper {
    padding: 1rem 0.75rem;
  }

  .card {
    width: 100%;
    max-width: 100%;
    margin: 0;
    border-radius: 1rem !important;
  }

  .card-body {
    padding: 1.5rem 1.25rem !important;
  }

  .mb-4 h2 {
    font-size: 1.4rem !important;
  }

  .mb-4 p {
    font-size: 0.875rem !important;
  }

  .mb-4 {
    margin-bottom: 0.875rem !important;
  }

  .mt-4 {
    margin-top: 1rem !important;
  }

  .small {
    font-size: 0.8rem !important;
  }
}
</style>
