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
              src="../../assets/images/verifyEmail.png"
              alt="Email 3D"
              class="img-fluid mb-4 floating-3d"
              :style="parallaxStyle(15)"
              style="
                max-height: 250px;
                filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
              "
            />

            <h3 class="fw-bold tracking-wide mb-2 text-shadow">
              បញ្ជាក់ការផ្លាស់ប្តូរអ៊ីមែល
            </h3>
            <p class="text-white-50 small px-3">
              សូមបញ្ជាក់ការផ្លាស់ប្តូរអ៊ីមែលរបស់អ្នកដោយចុចលើប៊ូតុងខាងក្រោម។
            </p>
          </div>
        </div>

        <div
          class="col-lg-7 bg-white-glass d-flex align-items-center position-relative"
        >
          <div class="card-body p-4 p-lg-5">
            <!-- Success State -->
            <div v-if="verificationSuccess" class="text-center stagger-1">
              <div class="success-icon mb-4">
                <i class="fas fa-check-circle"></i>
              </div>
              <h2 class="fw-bold text-teal mb-3">ជោគជ័យ!</h2>
              <p class="text-muted mb-4">
                អ៊ីមែលរបស់អ្នកត្រូវបានផ្លាស់ប្តូរទៅជា
                <strong>{{ newEmail }}</strong>
              </p>
              <div class="alert alert-success">
                <i class="fas fa-info"></i>
                អ្នកអាចប្រើអ៊ីមែលថ្មីនេះដើម្បីចូលទៅកាន់គណនីរបស់អ្នកឥឡូវនេះ។
              </div>
              <p class="text-muted small mb-4">កំពុងបញ្ជូនអ្នកទៅការកំណត់...</p>
              <AuthButton
                text="ទៅកាន់ការកំណត់"
                @click="redirectToSettings"
                class="mt-3"
                :loading="profileStore.profileLoading"
                :disabled="profileStore.profileLoading"
              />
            </div>

            <!-- Error State -->
            <div v-else-if="verificationError" class="text-center stagger-1">
              <div class="error-icon mb-4">
                <i class="fas fa-times-circle"></i>
              </div>
              <h2 class="fw-bold text-danger mb-3">បរាជ័យ</h2>
              <p class="text-muted mb-4">{{ verificationError }}</p>
              <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                តំណភ្ជាប់នេះប្រហែលជាផុតកំណត់ ឬត្រូវបានប្រើរួចហើយ។
              </div>
              <router-link
                to="/profile/setting"
                class="btn-outline d-inline-flex align-items-center gap-2"
              >
                <i class="bi bi-arrow-left"></i>
                ត្រឡប់ទៅការកំណត់
              </router-link>
            </div>

            <!-- Loading/Verifying State -->
            <div v-else-if="isVerifying" class="text-center">
              <div class="verifying-state stagger-3">
                <div class="spinner-border text-teal mb-3" role="status">
                  <span class="visually-hidden">កំពុងផ្ទៀងផ្ទាត់...</span>
                </div>
                <p class="text-muted">កំពុងផ្ទៀងផ្ទាត់...</p>
              </div>
            </div>

            <!-- Initial State - Show Confirm Button -->
            <div v-else class="text-center">
              <div class="mb-4 stagger-1">
                <h2 class="fw-bold text-teal mb-1">
                  បញ្ជាក់ការផ្លាស់ប្តូរអ៊ីមែល
                </h2>
                <p class="text-muted">
                  តើអ្នកពិតជាចង់ផ្លាស់ប្តូរអ៊ីមែលទៅ
                  <strong>{{ newEmail }}</strong> ដែរឬទេ?
                </p>
              </div>

              <div class="mb-4 stagger-2">
                <div class="alert alert-info">
                  <i class="fas fa-info-circle"></i>
                  តំណភ្ជាប់នេះនឹងផុតកំណត់ក្នុងរយៈពេល 15 នាទី។
                </div>
              </div>

              <AuthButton
                :text="'បាទ/ចាស បញ្ជាក់ការផ្លាស់ប្តូរ'"
                :loadingText="'កំពុងបញ្ជាក់...'"
                :loading="profileStore.profileLoading"
                :disabled="profileStore.profileLoading"
                @click="confirmEmailChange"
                class="stagger-3"
              />

              <div class="text-center mt-4 stagger-4">
                <router-link
                  to="/profile/setting"
                  class="fw-bold text-teal text-decoration-none ms-1 link-effect d-inline-flex align-items-center"
                >
                  <i class="bi bi-arrow-left me-2"></i> ត្រឡប់ក្រោយទៅការកំណត់
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProfileStore } from "@/stores/profilestore";
import { useAuthStore } from "@/stores/authentication";
import { useRouter, useRoute } from "vue-router";
import AuthButton from "@/components/ui/AuthButton.vue";

const profileStore = useProfileStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const newEmail = ref("");
const token = ref("");
const isVerifying = ref(false);
const verificationSuccess = ref(false);
const verificationError = ref(null);

const mouseX = ref(0);
const mouseY = ref(0);

const parallaxStyle = (intensity) => {
  const x = mouseX.value * intensity;
  const y = mouseY.value * intensity;
  return { transform: `translate(${x}px, ${y}px)` };
};

onMounted(async () => {
  token.value = route.query.token;
  newEmail.value = route.query.email || "អ៊ីមែលថ្មី";

  if (!token.value) {
    verificationError.value = "តំណភ្ជាប់ផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ។";
    setTimeout(() => {
      router.push("/profile/setting");
    }, 3000);
    return;
  }

  await confirmEmailChange();
});

const confirmEmailChange = async () => {
  if (!token.value) {
    verificationError.value = "តំណភ្ជាប់មិនត្រឹមត្រូវ។";
    return;
  }

  isVerifying.value = true;

  try {
    const success = profileStore.verifyChangeEmail(token.value, newEmail.value);

    if (success) {
      verificationSuccess.value = true;

      verificationError.value = null;

      setTimeout(async () => {
        profileStore.getProfile();
        console.log("Profile after redirect:", profileStore.profile);

        router.push({
          name: "ProfileSetting",
          query: { emailChanged: "success" },
        });
      }, 3000);
    } else {
      verificationError.value =
        profileStore.profileError || "ការផ្ទៀងផ្ទាត់បានបរាជ័យ។";
    }
  } catch (error) {
    console.error("Email verification error:", error);
    verificationError.value = "មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់។ សូមព្យាយាមម្តងទៀត។";
  } finally {
    isVerifying.value = false;
  }
};

const redirectToSettings = () => {
  router.push({
    name: "ProfileSetting",
    query: { emailChanged: "success" },
  });
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.page-wrapper {
  font-family: "Inter", "Kantumruy Pro", sans-serif;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c); */
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  z-index: -2;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animation-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.box-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.box-area li {
  position: absolute;
  display: block;
  list-style: none;
  width: 25px;
  height: 25px;
  background: rgba(255, 255, 255, 0.1);
  animation: animate 20s linear infinite;
  bottom: -150px;
}

.box-area li:nth-child(1) {
  left: 86%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.box-area li:nth-child(2) {
  left: 12%;
  width: 30px;
  height: 30px;
  animation-delay: 1.5s;
  animation-duration: 10s;
}

.box-area li:nth-child(3) {
  left: 70%;
  width: 100px;
  height: 100px;
  animation-delay: 5.5s;
}

.box-area li:nth-child(4) {
  left: 42%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 15s;
}

.box-area li:nth-child(5) {
  left: 65%;
  width: 40px;
  height: 40px;
  animation-delay: 0s;
}

.box-area li:nth-child(6) {
  left: 15%;
  width: 110px;
  height: 110px;
  animation-delay: 3.5s;
}

@keyframes animate {
  0% {
    transform: translateY(0vh);
    opacity: 1;
  }
  100% {
    transform: translateY(108vh);
    opacity: 0;
  }
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -150px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: -100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.bg-white-glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.animate-entrance {
  animation: entrance 0.8s ease-out;
}

@keyframes entrance {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-3d {
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.glow-circle {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 70%
  );
  filter: blur(20px);
}

.content-wrapper {
  position: relative;
  z-index: 2;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.tracking-wide {
  letter-spacing: 0.025em;
}

.stagger-1 {
  animation: fadeInUp 3s ease-out;
}

.stagger-2 {
  animation: fadeInUp 3s ease-out 1s both;
}

.stagger-3 {
  animation: fadeInUp 3s ease-out 1s both;
}

.stagger-4 {
  animation: fadeInUp 3s ease-out 1s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-teal {
  color: #14b8a6 !important;
}

.text-danger {
  color: #dc2626 !important;
}

.bg-gradient-teal {
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
}

.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 600;
  animation: slideIn 0.3s ease;
  border-left: 4px solid;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.alert-info {
  background: #f0f9ff;
  color: #0369a1;
  border-left-color: #0ea5e9;
}

.alert-info i {
  color: #0ea5e9;
}

.alert-success {
  background: #f0fdf4;
  color: #15803d;
  border-left-color: #22c55e;
}

.alert-success i {
  color: #22c55e;
}

.alert-error {
  background: #fef2f2;
  color: #991b1b;
  border-left-color: #ef4444;
}

.alert-error i {
  color: #ef4444;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease;
}

.success-icon i {
  font-size: 40px;
  color: white;
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease;
}

.error-icon i {
  font-size: 40px;
  color: white;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.verifying-state {
  padding: 40px 0;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.3em;
}

.btn-primary,
.btn-outline {
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(20, 184, 166, 0.4);
}

.btn-outline {
  background: transparent;
  border: 1.5px solid #14b8a6;
  color: #14b8a6;
}

.btn-outline:hover {
  background: #f0fdfa;
  transform: translateY(-1px);
}

.link-effect {
  transition: all 0.3s ease;
  position: relative;
}

.link-effect:hover {
  transform: translateX(-2px);
}

.link-effect::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #14b8a6;
  transition: width 0.3s ease;
}

.link-effect:hover::after {
  width: 100%;
}

.d-flex {
  display: flex !important;
}

.align-items-center {
  align-items: center !important;
}

.justify-content-center {
  justify-content: center !important;
}

.min-vh-100 {
  min-height: 100vh !important;
}

.text-center {
  text-align: center !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 20px;
  }

  .card {
    margin: 0;
  }

  .col-lg-5 {
    display: none !important;
  }

  .col-lg-7 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .card-body {
    padding: 30px 20px;
  }

  .shape-1,
  .shape-2 {
    display: none;
  }
}
</style>
