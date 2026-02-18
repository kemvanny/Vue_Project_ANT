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
              :src="RegisterImage"
              alt="Sign Up 3D"
              class="img-fluid mb-4 floating-3d"
              :style="parallaxStyle(15)"
              style="
                max-height: 250px;
                filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
              "
            />
            <h3 class="fw-bold tracking-wide mb-2 text-shadow">
              ចាប់ផ្តើមជាមួយយើង
            </h3>
            <p class="text-white-50 small px-3">
              បង្កើតគណនីថ្មីដើម្បីគ្រប់គ្រងការងារ
              និងជីវិតរបស់អ្នកឱ្យកាន់តែប្រសើរ។
            </p>
          </div>
        </div>

        <div
          class="col-lg-7 bg-white-glass d-flex align-items-center position-relative"
        >
          <div class="card-body p-4 p-lg-5">
            <div class="mb-4 stagger-1">
              <h2 class="fw-bold text-teal mb-1">ចុះឈ្មោះគណនី</h2>
              <p class="text-muted">បំពេញព័ត៌មានខាងក្រោមដើម្បីបង្កើតគណនី។</p>
            </div>

            <form @submit.prevent="handleRegister" novalidate>
              <AuthInput
                label="ឈ្មោះពេញ"
                type="text"
                v-model="auth.fullName"
                placeholder="បញ្ចូលឈ្មោះពេញ"
                :error="errors.fullName"
                class="stagger-2 mb-2"
              />

              <AuthInput
                label="អ៊ីមែល"
                type="email"
                v-model="auth.email"
                placeholder="បញ្ចូលអ៊ីមែល"
                :error="errors.email"
                class="stagger-3 mb-2"
              />

              <div class="row g-2 stagger-4">
                <div class="col-md-6">
                  <AuthInput
                    label="ពាក្យសម្ងាត់"
                    type="password"
                    v-model="auth.password"
                    placeholder="លេខសម្ងាត់"
                    :error="errors.password"
                  />
                </div>
                <div class="col-md-6">
                  <AuthInput
                    label="បញ្ជាក់ពាក្យសម្ងាត់"
                    type="password"
                    v-model="auth.confirmPassword"
                    placeholder="បញ្ជាក់លេខសម្ងាត់"
                    :error="errors.confirmPassword"
                  />
                </div>
              </div>
              <transition name="shake">
                <div
                  v-if="auth.error"
                  class="alert alert-danger py-2 small mb-4 rounded-3 border-0 stagger-2 shadow-sm text-center"
                >
                  <i class="bi bi-exclamation-triangle-fill me-2"></i
                  >{{ auth.error }}
                </div>
              </transition>

              <div class="form-check mt-3 mb-3 stagger-5">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="auth.agreedTerms"
                  id="terms"
                />
                <label class="form-check-label text-muted small" for="terms">
                  ខ្ញុំយល់ព្រមតាម
                  <a href="#" class="text-teal fw-bold text-decoration-none"
                    >លក្ខខណ្ឌប្រើប្រាស់</a
                  >
                  និង
                  <a href="#" class="text-teal fw-bold text-decoration-none"
                    >គោលការណ៍ឯកជនភាព</a
                  >
                </label>
                <div v-if="errors.agreedTerms" class="text-danger small mt-1">
                  {{ errors.agreedTerms }}
                </div>
              </div>

              <AuthButton
                type="submit"
                :text="'បង្កើតគណនី'"
                :loadingText="'កំពុងបង្កើត...'"
                :loading="auth.loading"
                :disabled="auth.loading"
                class="stagger-6"
              />

              <div class="text-center mt-4 small text-muted stagger-7">
                មានគណនីរួចហើយមែនទេ?
                <router-link
                  to="/login"
                  class="fw-bold text-teal text-decoration-none ms-1 link-effect"
                >
                  ចូលប្រើប្រាស់
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authentication";
import { useRouter } from "vue-router";
import { z } from "zod";
import AuthButton from "../../components/AuthButton.vue";
import AuthInput from "../../components/AuthInput.vue";
import RegisterImage from "@/assets/images/auth/regiter.png";

const auth = useAuthStore();
const router = useRouter();

const mouseX = ref(0);
const mouseY = ref(0);
const parallaxStyle = (intensity) => {
  const x = mouseX.value * intensity;
  const y = mouseY.value * intensity;
  return { transform: `translate(${x}px, ${y}px)` };
};

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
      .min(1, "សូមបញ្ចូលអ៊ីមែល")
      .email("ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ"),
    password: z.string().min(8, "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ"),
    confirmPassword: z.string().min(1, "សូមបញ្ជាក់ពាក្យសម្ងាត់"),
    agreedTerms: z.literal(true, {
      errorMap: () => ({ message: "អ្នកត្រូវតែយល់ព្រមតាមលក្ខខណ្ឌ" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ",
    path: ["confirmPassword"],
  });

onMounted(() => {
  auth.clearMessages();
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

  /* Stack password fields on very small screens */
  .row.g-2 .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
