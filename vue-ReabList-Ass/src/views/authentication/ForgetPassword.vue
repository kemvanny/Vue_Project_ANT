<template>
  <div
    class="page-wrapper d-flex align-items-center justify-content-center min-vh-100"
    @mousemove="handleMouseMove"
  >
    <div class="gradient-bg"></div>

    <div class="animation-area">
      <ul class="box-area">
        <li v-for="n in 15" :key="n"></li>
      </ul>
    </div>

    <div class="shape shape-1" :style="parallaxStyle(0.05)"></div>
    <div class="shape shape-2" :style="parallaxStyle(-0.05)"></div>

    <div
      class="card glass-card border-0 shadow-2xl rounded-5 overflow-hidden animate-entrance"
    >
      <div class="row g-0 h-100">
        <!-- Left decorative side (visible on lg+) -->
        <div
          class="col-lg-5 d-none d-lg-flex flex-column align-items-center justify-content-center bg-gradient-teal text-white p-5 position-relative overflow-hidden"
        >
          <div class="glow-circle" :style="parallaxStyle(-0.02)"></div>
          <div class="z-2 text-center content-wrapper">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-5795916-4841573.png"
              alt="Forgot Password Illustration"
              class="img-fluid mb-4 floating-3d"
              style="
                max-height: 250px;
                filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
              "
            />
            <h3 class="fw-bold tracking-wide mb-2 text-shadow">
              ភ្លេចពាក្យសម្ងាត់?
            </h3>
            <p class="text-white-50 small px-3">
              កុំបារម្ភ! យើងនៅទីនេះដើម្បីជួយអ្នកទទួលបានគណនីរបស់អ្នកមកវិញ។
            </p>
          </div>
        </div>

        <!-- Right form side -->
        <div
          class="col-lg-7 bg-white-glass d-flex align-items-center position-relative"
        >
          <div class="card-body p-4 p-lg-5">
            <div class="mb-4 stagger-1">
              <h2 class="fw-bold text-teal mb-1">កំណត់ពាក្យសម្ងាត់ឡើងវិញ</h2>
              <p class="text-muted">បញ្ចូលអ៊ីមែលដើម្បីទទួលតំណភ្ជាប់។</p>
            </div>

            <form @submit.prevent="handleForgotPassword" novalidate>
              <AuthInput
                label="អាសយដ្ឋានអ៊ីមែល"
                type="email"
                v-model="authStore.resetEmail"
                placeholder="ឧ. example@gmail.com"
                :error="errors.email"
                autofocus
                required
                class="stagger-2"
              />
              <transition name="shake">
                <div
                  v-if="authStore.error"
                  class="alert alert-danger py-2 small mb-4 rounded-3 border-0 shadow-sm"
                  role="alert"
                >
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>
                  {{ authStore.error }}
                </div>
              </transition>

              <AuthButton
                type="submit"
                :text="'ផ្ញើតំណភ្ជាប់កំណត់ឡើងវិញ'"
                :loading-text="'កំពុងផ្ញើ...'"
                :loading="authStore.loading"
                :disabled="authStore.loading || !authStore.resetEmail.trim()"
                class="stagger-3 mt-4 w-100"
              />
            </form>

            <div class="text-center mt-4 stagger-4">
              <a
                href="#"
                @click.prevent="goBackToLogin"
                class="fw-bold text-teal text-decoration-none link-effect d-inline-flex align-items-center"
              >
                <i class="bi bi-arrow-left me-2"></i>
                ត្រឡប់ទៅទំព័រចូលប្រើប្រាស់
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <transition name="fade">
      <div
        v-if="showSuccessModal"
        class="modal-overlay d-flex align-items-center justify-content-center"
        @click.self="closeSuccessModal"
      >
        <div
          class="card glass-card border-0 p-5 text-center shadow-xl animate-pop"
          style="max-width: 460px; width: 90%"
        >
          <div class="success-icon-container mb-4 mx-auto">
            <div class="success-pulse"></div>
            <i class="bi bi-envelope-check-fill text-teal display-3"></i>
          </div>

          <h3 class="fw-bold text-teal mb-3">ផ្ញើជោគជ័យ!</h3>
          <p class="text-muted mb-4">
            យើងបានផ្ញើតំណភ្ជាប់សម្រាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញទៅ<br />
            <strong class="text-dark">{{ authStore.resetEmail.trim() }}</strong
            ><br />
            <!-- <small class="text-muted d-block mt-2">
              (សូមពិនិត្យប្រអប់សំបុត្រ ឬថត Spam/Junk បើមិនឃើញនៅ Inbox)
            </small> -->
          </p>

          <button
            @click="closeSuccessModal"
            class="btn btn-teal-gradient w-100 rounded-pill py-3 fw-bold shadow-sm"
            autofocus
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authentication";
import { z } from "zod";
import AuthInput from "../../components/AuthInput.vue";
import AuthButton from "../../components/AuthButton.vue";

const router = useRouter();
const authStore = useAuthStore();

const mouseX = ref(0);
const mouseY = ref(0);
const showSuccessModal = ref(false);

const errors = reactive({ email: "" });

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "សូមបញ្ចូលអ៊ីមែល")
    .email("អ៊ីមែលមិនត្រឹមត្រូវ"),
});

// ─── Parallax ────────────────────────────────────────
const handleMouseMove = (e) => {
  mouseX.value = (e.clientX - window.innerWidth / 2) / window.innerWidth;
  mouseY.value = (e.clientY - window.innerHeight / 2) / window.innerHeight;
};

const parallaxStyle = (intensity) => ({
  transform: `translate(${mouseX.value * intensity * 100}px, ${mouseY.value * intensity * 100}px)`,
});

// ─── Submit ──────────────────────────────────────────
const handleForgotPassword = async () => {
  // Reset local and store errors
  errors.email = "";
  if (authStore.clearMessages) {
    authStore.clearMessages();
  } else {
    authStore.error = null;
  }

  // Zod Validation
  const result = schema.safeParse({ email: authStore.resetEmail });

  if (!result.success) {
    errors.email = result.error.issues[0]?.message || "មានបញ្ហាជាមួយអ៊ីមែល";
    return;
  }

  try {
    // Await the store action
    const success = await authStore.forgotPassword();

    // Only show modal if the store explicitly returns true
    if (success) {
      showSuccessModal.value = true;
    }
  } catch (err) {
    // This catches unexpected runtime crashes
    console.error("Critical component error:", err);
    authStore.error = "មានបញ្ហាបច្ចេកទេស។ សូមព្យាយាមម្ដងទៀត។";
  }
};

const goBackToLogin = () => {
  showSuccessModal.value = false;
  authStore.clearMessages?.();
  authStore.resetEmail = "";
  router.push({ name: "login" });
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  authStore.clearMessages?.();
  authStore.resetEmail = "";
  // router.push("/verify-OTP");
};
</script>

<style scoped>
/* ─── Modal & Animation ──────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
  z-index: 9999;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-pop {
  animation: popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.82) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.success-icon-container {
  position: relative;
  width: 90px;
  height: 90px;
}

.success-pulse {
  position: absolute;
  inset: 0;
  background: rgba(0, 176, 155, 0.18);
  border-radius: 50%;
  animation: pulse-ring 2s infinite ease-out;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.6);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.btn-teal-gradient {
  background: linear-gradient(135deg, #00b09b, #96c93d);
  border: none;
  color: white;
  transition: all 0.2s;
}

.btn-teal-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 176, 155, 0.35);
}
</style>
