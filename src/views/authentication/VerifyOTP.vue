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
              :src="VerifyOTPImage"
              alt="OTP Security"
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
              យើងបានផ្ញើលេខកូដសម្ងាត់ទៅកាន់អ៊ីមែលរបស់អ្នក។
              សូមពិនិត្យប្រអប់សាររបស់អ្នក។
            </p>
          </div>
        </div>

        <div
          class="col-lg-7 bg-white-glass d-flex align-items-center position-relative"
        >
          <div class="card-body p-4 p-lg-5">
            <div class="mb-4 stagger-1">
              <h1 class="fw-bold text-dark mb-2 display-6">ផ្ទៀងផ្ទាត់ OTP</h1>
              <p class="text-muted">
                បញ្ចូលលេខកូដដែលបានផ្ញើទៅកាន់
                <strong class="text-teal">{{ auth.email }}</strong>
              </p>
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

            <form @submit.prevent="handleVerify" class="stagger-3">
              <div class="mb-4">
                <label class="fw-bold text-teal mb-3 small text-uppercase ls-1"
                  >លេខកូដ ៦ ខ្ទង់</label
                >

                <div class="otp-container">
                  <input
                    v-for="(digit, index) in 6"
                    :key="index"
                    type="text"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    maxlength="1"
                    v-model="otpDigits[index]"
                    @input="handleInput($event, index)"
                    @keydown="handleKeyDown($event, index)"
                    @paste="handlePaste"
                    class="otp-box"
                    :class="{
                      active: activeIndex === index,
                      filled: otpDigits[index] !== '',
                    }"
                    :ref="
                      (el) => {
                        if (el) otpRefs[index] = el;
                      }
                    "
                    autocomplete="one-time-code"
                  />
                </div>
              </div>

              <input type="hidden" v-model="auth.otpCode" />

              <AuthButton
                :text="'ផ្ទៀងផ្ទាត់គណនី'"
                :loadingText="'កំពុងផ្ទៀងផ្ទាត់...'"
                :loading="auth.loading"
                :disabled="auth.loading || otpDigits.some((d) => !d)"
                @click="handleVerify"
                class="stagger-4 w-100 py-3 rounded-4 shadow-sm"
              />
            </form>

            <div class="text-center mt-5 small text-muted stagger-5">
              មិនបានទទួលលេខកូដមែនទេ?
              <a
                href="#"
                @click.prevent="handleResend"
                class="text-teal fw-bold text-decoration-none mx-1 link-effect"
              >
                ផ្ញើលេខកូដម្តងទៀត
              </a>
              <div class="mt-2">
                <span class="text-muted">ឬ</span>
                <a
                  href="#"
                  @click.prevent="router.push('/verify-email')"
                  class="text-secondary fw-bold text-decoration-none mx-1 link-effect"
                >
                  ផ្លាស់ប្តូរអ៊ីមែល
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { useAuthStore } from "../../stores/authentication";
import { useRouter } from "vue-router";
import AuthButton from "@/components/ui/AuthButton.vue";
import VerifyOTPImage from "@/assets/images/auth/verifyOTP.png";

const auth = useAuthStore();
const router = useRouter();

const mouseX = ref(0);
const mouseY = ref(0);

const parallaxStyle = (intensity) => {
  const x = mouseX.value * intensity;
  const y = mouseY.value * intensity;
  return { transform: `translate(${x}px, ${y}px)` };
};

const otpDigits = ref(Array(6).fill(""));
const otpRefs = ref([]);
const activeIndex = ref(0);

watch(
  otpDigits,
  (newDigits) => {
    auth.otpCode = newDigits.join("");
  },
  { deep: true },
);

onMounted(() => {
  nextTick(() => {
    otpRefs.value[0]?.focus();
  });
});

const handleInput = (e, index) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 1) value = value[0];

  otpDigits.value[index] = value;

  if (value && index < 5) {
    activeIndex.value = index + 1;
    nextTick(() => otpRefs.value[index + 1]?.focus());
  }
};

const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    if (!otpDigits.value[index] && index > 0) {
      e.preventDefault();
      activeIndex.value = index - 1;
      nextTick(() => otpRefs.value[index - 1]?.focus());
    }
  } else if (e.key === "ArrowLeft" && index > 0) {
    e.preventDefault();
    otpRefs.value[index - 1]?.focus();
  } else if (e.key === "ArrowRight" && index < 5) {
    e.preventDefault();
    otpRefs.value[index + 1]?.focus();
  } else if (!/[0-9]/.test(e.key) && e.key.length === 1) {
    e.preventDefault();
  }
};

const handlePaste = (e) => {
  e.preventDefault();
  const pasted = (e.clipboardData || window.clipboardData)
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, 6);

  if (pasted.length > 0) {
    const digits = pasted.split("");
    otpDigits.value = [...digits, ...Array(6 - digits.length).fill("")];

    const nextFocus = Math.min(digits.length, 5);
    activeIndex.value = nextFocus;
    nextTick(() => otpRefs.value[nextFocus]?.focus());
  }
};

const handleResend = async () => {
  auth.clearMessages();
  otpDigits.value = Array(6).fill("");
  activeIndex.value = 0;
  await auth.sendOtp();
  nextTick(() => otpRefs.value[0]?.focus());
};

const handleVerify = async () => {
  try {
    if (auth.clearMessages) auth.clearMessages();
    const success = await auth.verifyEmail();
    if (success) {
      if (auth.resetMode) {
        router.push("/reset-password");
      } else {
        auth.resetRegisterForm();
        router.push("/login");
      }
    }
  } catch (err) {
    console.error("Verification failed:", err);
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

  .mb-4 h1 {
    font-size: 1.5rem !important;
  }

  .mb-4 p {
    font-size: 0.875rem !important;
  }

  .mb-4 {
    margin-bottom: 0.875rem !important;
  }

  .mt-5 {
    margin-top: 1.25rem !important;
  }

  .small {
    font-size: 0.8rem !important;
  }

  /* Smaller OTP boxes on mobile */
  .otp-box {
    height: 52px !important;
    font-size: 1.4rem !important;
    max-width: 42px !important;
    border-radius: 10px !important;
  }

  .otp-container {
    gap: 6px !important;
  }
}

/* ── OTP input styles ────────────────────────────────────────── */
.otp-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.otp-box {
  width: 100%;
  max-width: 60px;
  height: 65px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #1a636d;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  caret-color: #247a85;
}

.otp-box:focus,
.otp-box.active {
  outline: none;
  border-color: #247a85;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(36, 122, 133, 0.15);
  transform: translateY(-2px);
}

.otp-box.filled {
  background: #e0f2f1;
  border-color: #80cbc4;
}
</style>
