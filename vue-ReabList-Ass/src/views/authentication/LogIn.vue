<template>
  <div
    class="page-wrapper d-flex align-items-center justify-content-center min-vh-100"
  >
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
              src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-5523307-4609476.png"
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

            <transition name="shake">
              <div
                v-if="auth.error"
                class="alert alert-danger py-2 small mb-4 rounded-3 border-0 stagger-2 shadow-sm"
              >
                <i class="bi bi-exclamation-triangle-fill me-2"></i
                >{{ auth.error }}
              </div>
            </transition>

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
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/authentication";
import { useRouter } from "vue-router";
import { z } from "zod";
import AuthInput from "@/components/AuthInput.vue";
import AuthButton from "@/components/AuthButton.vue";

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
  transition: max-width 0.3s ease, margin 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-home-floating:hover {
  background: rgba(20, 184, 166, 0.8); /* Teal background on hover */
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

/* For mobile: keep it simple */
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
</style>
