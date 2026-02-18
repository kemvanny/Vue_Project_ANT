<template>
  <div class="page-wrapper d-flex align-items-center justify-content-center">
    <div class="gradient-bg"></div>
    <router-link to="/" class="btn-home-floating shadow-lg animate-entrance">
      <i class="bi bi-house-door-fill icon-color"></i>
      <span class="home-text">ត្រឡប់ទៅដើម</span>
    </router-link>

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
              :src="LoginImage"
              alt="Todo 3D"
              class="img-fluid mb-4 floating-3d"
              :style="parallaxStyle(15)"
              style="
                max-height: 270px;
                filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
              "
            />
            <h3 class="fw-bold tracking-wide mb-2 text-shadow">
              កម្មវិធីគ្រប់គ្រងការងារ
            </h3>
            <p class="text-white-50 small px-3">
              រៀបចំផែនការជីវិតរបស់អ្នក ជាមួយបទពិសោធន៍ដ៏ល្អបំផុត។
            </p>
          </div>
        </div>

        <div
          class="col-lg-7 bg-white-glass d-flex align-items-center position-relative"
        >
          <div class="card-body p-4 p-lg-5">
            <div class="mb-5 stagger-1">
              <h2 class="fw-bold text-teal mb-1">ស្វាគមន៍ការត្រឡប់មកវិញ!</h2>
              <p class="text-muted">
                សូមបញ្ចូលព័ត៌មានរបស់អ្នក ដើម្បីចូលប្រើប្រាស់។
              </p>
            </div>

            <form @submit.prevent="handleLogin">
              <AuthInput
                label="អ៊ីមែល"
                type="email"
                v-model="form.email"
                placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                :error="errors.email"
                autofocus
                class="stagger-2"
              />

              <AuthInput
                label="ពាក្យសម្ងាត់"
                type="password"
                v-model="form.password"
                placeholder="បញ្ចូលពាក្យសម្ងាត់"
                :error="errors.password"
                class="stagger-3"
              />

              <transition name="shake">
                <div
                  v-if="auth.error"
                  class="alert alert-danger py-2 small mb-4 rounded-3 border-0 stagger-2 shadow-sm"
                >
                  <i class="bi bi-exclamation-triangle-fill me-2"></i
                  >{{ auth.error }}
                </div>
              </transition>

              <div
                class="d-flex justify-content-between align-items-center mb-4 small stagger-4"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.rememberMe"
                    id="rememberMe"
                  />
                  <label
                    class="form-check-label text-muted cursor-pointer"
                    for="rememberMe"
                    >ចងចាំខ្ញុំ</label
                  >
                </div>
                <router-link
                  to="/forget-password"
                  class="text-decoration-none text-teal fw-bold link-effect"
                >
                  ភ្លេចពាក្យសម្ងាត់?
                </router-link>
              </div>

              <AuthButton
                :type="'submit'"
                text="ចូលប្រើ"
                loading-text="កំពុងចូល..."
                :loading="auth.loading"
                class="stagger-5"
              />

              <div class="text-center mt-5 small text-muted stagger-6">
                មិនទាន់មានគណនីមែនទេ?
                <router-link
                  to="/register"
                  class="fw-bold text-teal text-decoration-none ms-1 link-effect"
                >
                  បង្កើតគណនីថ្មី
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- ── DEACTIVATED ACCOUNT MODAL ─────────────────────────── -->
    <transition name="modal-fade">
      <div
        v-if="auth.showDeactivatedModal"
        class="modal-overlay"
        @click.self="auth.showDeactivatedModal = false"
      >
        <div class="deactivated-modal">
          <div class="modal-icon-wrap">
            <i class="bi bi-shield-lock-fill modal-icon"></i>
          </div>
          <h5 class="modal-title-text">គណនីត្រូវបានបិទ</h5>
          <p class="modal-body-text">
            គណនីរបស់អ្នកត្រូវបានបិទដំណើរការដោយអ្នកគ្រប់គ្រង។<br />
            សូមទាក់ទងអ្នកគ្រប់គ្រងសម្រាប់ព័ត៌មានបន្ថែម។
          </p>
          <button
            class="modal-close-btn"
            @click="auth.showDeactivatedModal = false"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </transition>
    <!-- ────────────────────────────────────────────────────────── -->
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/authentication";
import { useRouter } from "vue-router";
import { z } from "zod";
import AuthInput from "@/components/AuthInput.vue";
import AuthButton from "@/components/AuthButton.vue";
import LoginImage from "@/assets/images/auth/login.png";

const auth = useAuthStore();
const router = useRouter();
const mouseX = ref(0);
const mouseY = ref(0);

const form = reactive({ email: "", password: "", rememberMe: false });
const errors = reactive({ email: "", password: "" });

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក")
    .email("ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ"),
  password: z.string().min(6, "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ ខ្ទង់"),
});

onMounted(() => {
  auth.clearMessages();
  auth.showDeactivatedModal = false;
  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    form.email = savedEmail;
    form.rememberMe = true;
  }
});

const parallaxStyle = (intensity) => {
  const x = mouseX.value * intensity;
  const y = mouseY.value * intensity;
  return { transform: `translate(${x}px, ${y}px)` };
};

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
.page-wrapper {
  min-height: 100vh;
  min-height: 100svh;
  width: 100%;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box;
}

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

  /* Headings */
  .mb-5 h2 {
    font-size: 1.4rem !important;
  }

  .mb-5 p {
    font-size: 0.875rem !important;
  }

  /* Spacing */
  .mb-5 {
    margin-bottom: 1.25rem !important;
  }

  .mb-4 {
    margin-bottom: 0.875rem !important;
  }

  .mt-5 {
    margin-top: 1.25rem !important;
  }

  /* Input labels */
  .modern-input-group label {
    font-size: 0.875rem !important;
  }

  /* Input fields */
  .input-group-lg > input {
    font-size: 0.95rem !important;
    padding: 0.625rem 0.875rem !important;
  }

  /* Submit button */
  .auth-button {
    padding: 0.625rem 1rem !important;
    font-size: 0.95rem !important;
  }

  /* Small text */
  .small {
    font-size: 0.8rem !important;
  }

  /* Deactivated modal */
  .deactivated-modal {
    padding: 1.5rem 1.25rem;
    margin: 0.75rem;
  }

  .modal-icon-wrap {
    width: 60px;
    height: 60px;
  }

  .modal-icon {
    font-size: 1.5rem;
  }

  .modal-title-text {
    font-size: 1.1rem;
  }

  .modal-body-text {
    font-size: 0.85rem;
  }
}

/* ── Home button (floating top-left) ─────────────────────────── */
.btn-home-floating {
  position: fixed;
  top: 25px;
  left: 25px;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: rgba(8, 61, 71, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-home-floating i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.home-text {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  transition:
    max-width 0.3s ease,
    margin 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-home-floating:hover {
  background: rgba(20, 184, 166, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-home-floating:hover i {
  transform: scale(1.1);
}

.btn-home-floating:hover .home-text {
  max-width: 150px;
  margin-left: 10px;
}

@media (max-width: 576px) {
  .btn-home-floating {
    top: 15px;
    left: 15px;
    padding: 10px;
  }

  .home-text {
    display: none;
  }
}

/* ── Deactivated Modal ───────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.deactivated-modal {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-pop {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.modal-icon {
  font-size: 2rem;
  color: #dc2626;
}

.modal-title-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.modal-body-text {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1.75rem;
}

.modal-close-btn {
  background: linear-gradient(135deg, #0f766e, #14b8a6);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.6rem 2.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.35);
}

.modal-close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.45);
}

/* ── Modal transition ────────────────────────────────────────── */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
