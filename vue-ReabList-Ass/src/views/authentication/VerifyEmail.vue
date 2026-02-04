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
              src="https://cdn3d.iconscout.com/3d/free/thumb/free-mail-2997198-2491684.png"
              alt="Email 3D"
              class="img-fluid mb-4 floating-3d"
              :style="parallaxStyle(15)"
              style="
                max-height: 250px;
                filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
              "
            />

            <h3 class="fw-bold tracking-wide mb-2 text-shadow">
              ផ្ទៀងផ្ទាត់អ៊ីមែល
            </h3>
            <p class="text-white-50 small px-3">
              យើងនឹងផ្ញើលេខកូដសុវត្ថិភាពទៅកាន់អ៊ីមែលរបស់អ្នក
              ដើម្បីបញ្ជាក់អត្តសញ្ញាណ។
            </p>
          </div>
        </div>

        <div
          class="col-lg-7 bg-white-glass d-flex align-items-center position-relative"
        >
          <div class="card-body p-4 p-lg-5">
            <div class="mb-4 stagger-1">
              <h2 class="fw-bold text-teal mb-1">ពិនិត្យអ៊ីមែល</h2>
              <p class="text-muted">
                តើនេះជាអ៊ីមែលត្រឹមត្រូវសម្រាប់គណនីរបស់អ្នកមែនទេ?
              </p>
            </div>

            <div class="mb-4 stagger-2">
              <label class="form-label fw-semibold text-teal mb-2"
                >អ៊ីមែលដែលបានចុះឈ្មោះ</label
              >

              <div class="d-flex gap-2 align-items-start">
                <div class="flex-grow-1">
                  <div class="input-group input-group-lg">
                    <span class="input-group-text bg-teal-light border-teal">
                      <i class="bi bi-envelope-check-fill text-teal"></i>
                    </span>
                    <input
                      type="email"
                      class="form-control border-teal"
                      :class="{ 'is-invalid': errors.email }"
                      v-model="auth.email"
                      :disabled="!isEditing"
                      placeholder="your@email.com"
                      @keyup.enter="toggleEdit"
                    />
                  </div>
                  <div v-if="errors.email" class="invalid-feedback d-block">
                    {{ errors.email }}
                  </div>
                </div>

                <button
                  type="button"
                  class="btn btn-outline-primary btn-lg px-4"
                  :class="
                    isEditing ? 'btn-outline-success' : 'btn-outline-primary'
                  "
                  @click="toggleEdit"
                >
                  <i
                    class="bi"
                    :class="isEditing ? 'bi-check-lg' : 'bi-pencil-square'"
                  ></i>
                  {{ isEditing ? "រក្សាទុក" : "ផ្លាស់ប្តូរ" }}
                </button>
              </div>

              <transition name="shake">
                <div
                  v-if="auth.error"
                  class="alert alert-danger py-2 small mt-3 rounded-3 border-0 shadow-sm text-center"
                >
                  <i class="bi bi-exclamation-triangle-fill me-2"></i
                  >{{ auth.error }}
                </div>
              </transition>
            </div>

            <AuthButton
              :text="'បាទ/ចាស ផ្ញើលេខកូដ'"
              :loadingText="'កំពុងផ្ញើ...'"
              :loading="auth.loading"
              :disabled="isEditing || auth.loading"
              @click="handleSendCode"
              class="stagger-3"
            />

            <div class="text-center mt-4 stagger-4">
              <router-link
                to="/register"
                class="fw-bold text-teal text-decoration-none ms-1 link-effect d-inline-flex align-items-center"
              >
                <i class="bi bi-arrow-left me-2"></i> ត្រឡប់ក្រោយ
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "../../stores/authentication";
import { useRouter } from "vue-router";
import { z } from "zod";
import AuthButton from "../../components/AuthButton.vue";

const auth = useAuthStore();
const router = useRouter();
const isEditing = ref(false);

// --- PARALLAX LOGIC ---
const mouseX = ref(0);
const mouseY = ref(0);

const parallaxStyle = (intensity) => {
  const x = mouseX.value * intensity;
  const y = mouseY.value * intensity;
  return { transform: `translate(${x}px, ${y}px)` };
};

const errors = reactive({
  email: "",
});

const emailSchema = z
  .string()
  .min(1, "សូមបញ្ចូលអ៊ីមែល")
  .email("ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ");

onMounted(() => {
  auth.clearMessages();
});

const toggleEdit = () => {
  if (isEditing.value) {
    // Validate on Save
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
.text-teal {
  color: #2d6a7a;
}

.bg-teal-light {
  background-color: #d8e8ea;
}

.border-teal {
  border-color: #b8d8e0 !important;
}

.input-group-text {
  border-right: none;
}

.form-control {
  border-left: none;
  background-color: #d8e8ea;
  color: #333;
}

.form-control:disabled {
  background-color: #f0f5f7;
  color: #2d6a7a;
  opacity: 1;
}

.form-control:focus {
  background-color: #cfe0e5;
  border-color: #5a9aad;
  box-shadow: none;
}

.btn-outline-primary {
  border-color: #5a9aad;
  color: #5a9aad;
}

.btn-outline-primary:hover {
  background-color: #5a9aad;
  border-color: #5a9aad;
  color: white;
}

.btn-outline-success {
  border-color: #28a745;
  color: #28a745;
}

.btn-outline-success:hover {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.invalid-feedback {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Shake animation for errors */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.shake-enter-active {
  animation: shake 0.5s;
}
</style>
