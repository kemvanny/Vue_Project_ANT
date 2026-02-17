<template>
  <div>
    <NavbarLandingPage />

    <div>
      <section class="hero">
        <div class="hero-bg" ref="heroBg">
          <span class="bg-circle circle-1"></span>
          <span class="bg-circle circle-2"></span>
          <span class="bg-circle circle-3"></span>
          <span class="bg-circle circle-4"></span>
          <div class="hero-noise"></div>
        </div>

        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <span class="hero-badge">រៀបចំជីវិតឱ្យមានរបៀបរៀបរយ</span>
              <h1 class="fw-bold mb-4">
                គ្រប់គ្រងរាល់កិច្ចការ<br /><span style="color: var(--primary)"
                  >ដោយភាពជឿជាក់</span
                >
              </h1>
              <p class="text-body mb-5">
                ឈប់ខ្វាយខ្វល់ពីរឿងដែលត្រូវធ្វើច្រើនលើសលប់។ ReabList
                ជួយអ្នករៀបចំផែនការ បែងចែកអាទិភាព
                និងសម្រេចគោលដៅធំៗរបស់អ្នកតាមរយៈជំហានតូចៗជារៀងរាល់ថ្ងៃ
              </p>
              <div class="btn-group-wrap d-flex flex-wrap gap-3 mb-5">
                <router-link
                  :to="{ name: 'login' }"
                  class="btn btn-signup-modern py-3 px-5 fs-5"
                  >ចាប់ផ្តើមប្រើដោយឥតគិតថ្លៃ</router-link
                >
              </div>
              <div class="d-flex align-items-center gap-3 reveal">
                <div class="d-flex">
                  <img
                    src="https://i.pravatar.cc/40?img=1"
                    class="rounded-circle border border-white"
                    style="margin-right: -10px"
                  />
                  <img
                    src="https://i.pravatar.cc/40?img=2"
                    class="rounded-circle border border-white"
                    style="margin-right: -10px"
                  />
                  <img
                    src="https://i.pravatar.cc/40?img=3"
                    class="rounded-circle border border-white"
                  />
                </div>
                <span class="small fw-semibold text-muted"
                  >ចូលរួមជាមួយអ្នកប្រើប្រាស់ជាង ១ម៉ឺននាក់</span
                >
              </div>
            </div>
            <div class="col-lg-6 mt-5 mt-lg-0">
              <div class="floating-img-wrap">
                <img
                  :src="BannerImage"
                  alt="ផលិតភាព"
                  class="img-fluid floating-img"
                />
                <div
                  class="stats-card position-absolute bottom-0 start-0 m-4 shadow-lg d-none d-sm-block"
                  style="width: 280px; transform: translateY(30%)"
                >
                  <div class="d-flex justify-content-between mb-3">
                    <span class="fw-bold">កិច្ចការប្រចាំថ្ងៃ</span>
                    <span class="fw-bold" style="color: var(--accent)"
                      >92%</span
                    >
                  </div>
                  <div
                    class="progress"
                    style="
                      height: 8px;
                      background: rgba(255, 255, 255, 0.1);
                      border-radius: 10px;
                    "
                  >
                    <div
                      class="progress-bar"
                      style="
                        width: 92%;
                        background-color: var(--accent);
                        border-radius: 10px;
                      "
                    ></div>
                  </div>
                  <p class="small mt-3 mb-0 opacity-75">
                    អ្នកជិតសម្រេចគោលដៅប្រចាំថ្ងៃហើយ! បន្តព្យាយាមទៀត។
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 my-5">
        <div class="container">
          <div class="text-center mb-5 pb-3 reveal">
            <h2 class="display-5 mb-4 fw-semibold text-feeling">
              សាមញ្ញ តែមានប្រសិទ្ធភាព
            </h2>
            <p class="mx-auto" style="max-width: 600px">
              រាល់មុខងារទាំងអស់របស់ ReabList
              ត្រូវបានសម្រិតសម្រាំងដើម្បីជួយអ្នកកាត់បន្ថយភាពស្មុគស្មាញ
              បង្កើនការផ្ដោតអារម្មណ៍ និងផ្តល់ឱ្យអ្នកនូវ "ខួរក្បាលទីពីរ"
              សម្រាប់គ្រប់គ្រងកិច្ចការរបស់អ្នក
            </p>
          </div>
          <div class="row g-4">
            <div class="col-md-4 reveal" style="transition-delay: 0.1s">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: var(--primary-light);
                    color: var(--primary);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <zap />
                </div>
                <h4 class="title-feeling">ផ្ដោតលើអ្វីដែលសំខាន់</h4>
                <p>
                  បែងចែកកិច្ចការសំខាន់ៗឱ្យបានច្បាស់លាស់
                  ដើម្បីផ្ដោតកម្លាំងចំគោលដៅ និងបង្កើនលទ្ធផលការងារ
                </p>
              </div>
            </div>
            <div class="col-md-4 reveal" style="transition-delay: 0.2s">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: #fff7ed;
                    color: #ea580c;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <repeat />
                </div>
                <h4 class="title-feeling">សាងទម្លាប់ល្អជារៀងរាល់ថ្ងៃ</h4>
                <p>
                  តាមដានវឌ្ឍនភាពជារៀងរាល់ថ្ងៃ
                  ដើម្បីកសាងទម្លាប់ដែលនាំអ្នកទៅរកភាពជោគជ័យយូរអង្វែង
                </p>
              </div>
            </div>
            <div class="col-md-4 reveal" style="transition-delay: 0.3s">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: #f0fdf4;
                    color: #16a34a;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <users />
                </div>
                <h4 class="title-feeling">នៅក្បែរអ្នកគ្រប់ពេលវេលា</h4>
                <p>
                  ចូលប្រើទិន្នន័យរបស់អ្នកបានគ្រប់ពេល មិនថាលើទូរស័ព្ទ ឬកុំព្យូទ័រ
                  ដោយសុវត្ថិភាព និងរហ័ស
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="benefits-section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 mb-5 mb-lg-0 reveal-left">
              <h2 class="display-4 mb-4">
                ហេតុអ្វី ReabList ជា
                <span style="color: var(--primary)">ដៃគូដ៏ល្អបំផុត?</span>
              </h2>
              <p class="mb-5">
                យើងជឿថា កម្មវិធីល្អគឺជាកម្មវិធីដែលមិនត្រូវការការរៀនច្រើន។
                ReabList រចនាឡើងដើម្បីឱ្យអ្នក "បើកភ្លាម ប្រើបានភ្លាម"
                ដោយផ្ដោតលើភាពសាមញ្ញ និងប្រសិទ្ធភាព។
              </p>

              <div class="benefit-item">
                <shield-check class="text-primary" />
                <div>
                  <h6 class="mb-1 fw-bold">សុវត្ថិភាពខ្ពស់</h6>
                  <p class="small mb-0">
                    រាល់ទិន្នន័យ និងគម្រោងផ្ទាល់ខ្លួនរបស់អ្នក
                    ត្រូវបានការពារដោយការសម្ងាត់បំផុត
                  </p>
                </div>
              </div>
              <div class="benefit-item">
                <smartphone class="text-primary" />
                <div>
                  <h6 class="mb-1 fw-bold">ភ្ជាប់ទំនាក់ទំនងគ្រប់ឧបករណ៍</h6>
                  <p class="small mb-0">
                    Sync ទិន្នន័យដោយស្វ័យប្រវត្តិ ឱ្យអ្នកធ្វើការបានគ្រប់ទីកន្លែង
                    និងគ្រប់ពេលវេលា
                  </p>
                </div>
              </div>
              <div class="benefit-item">
                <smile class="text-primary" />
                <div>
                  <h6 class="mb-1 fw-bold">បទពិសោធន៍ដ៏សាមញ្ញ</h6>
                  <p class="small mb-0">
                    រចនាបទបែប Minimalist ងាយស្រួលយល់ និងងាយស្រួលប្រើ
                    ចាប់ផ្ដើមបានភ្លាមៗ
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-7 text-center reveal-right">
              <img
                :src="WhyChooseUsImage"
                alt="គំរូកម្មវិធី"
                class="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 bg-white overflow-hidden">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0 reveal-left">
              <h2 class="display-5 fw-bold mb-4">
                រៀបចំថ្ងៃថ្មីជាមួយ<br />
                <span style="color: var(--accent)">ផែនការ</span>
                ដ៏ច្បាស់លាស់
              </h2>
              <p class="lead text-muted mb-5">
                ReabList មិនមែនគ្រាន់តែជាបញ្ជីកិច្ចការធម្មតានោះទេ
                តែវាជាជំនួយការឆ្លាតវៃដែលជួយអ្នក កាត់បន្ថយភាពតានតឹងពីការងារ
                និងបង្វែររាល់ក្ដីស្រមៃឱ្យទៅជាលទ្ធផលពិតប្រាកដ
              </p>

              <div
                class="p-4 border-start border-4 border-teal rounded-3"
                style="background: var(--primary-light)"
              >
                <p class="m-0 fst-italic">
                  "បេសកកម្មរបស់យើងគឺជួយឱ្យរាល់ថ្ងៃរបស់អ្នកមានសណ្ដាប់ធ្នាប់
                  និងពោរពេញដោយផលិតភាព ដើម្បីសម្រេចរាល់គោលដៅដែលអ្នកប្រាថ្នា"
                </p>
              </div>
            </div>

            <div class="col-lg-6 ps-lg-5 reveal-right">
              <div class="about-img-stack">
                <div
                  class="floating-badge"
                  style="
                    position: absolute;
                    top: 15%;
                    left: -20px;
                    background: var(--accent);
                    color: white;
                    padding: 0.8rem 1.2rem;
                    border-radius: 15px;
                    z-index: 3;
                    box-shadow: 0 10px 20px rgba(247, 164, 35, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    animation: float 4s infinite;
                  "
                >
                  <trending-up />
                  <span class="fw-bold">ជោគជ័យគ្រប់ជំហាន</span>
                </div>
                <img
                  :src="TableImage"
                  class="img-main ms-auto"
                  alt="កន្លែងធ្វើការ"
                />
                <img
                  :src="PhoneImage"
                  class="img-sub"
                  alt="ការបង្ហាញកម្មវិធី"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import NavbarLandingPage from "@/components/UserPages/navbarLandingPage.vue";
import Footer from "@/components/UserPages/Footer.vue";

import { onMounted, onBeforeUnmount, ref } from "vue";
import BannerImage from "@/assets/images/homepage/banner.png";
import WhyChooseUsImage from "@/assets/images/homepage/whychooseus.png";
import PhoneImage from "@/assets/images/homepage/phone.png";
import TableImage from "@/assets/images/homepage/table_img.png";
const heroBg = ref(null);
let handler = null;

onMounted(() => {
  handler = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    heroBg.value?.querySelectorAll(".bg-circle").forEach((blob, i) => {
      const speed = (i + 1) * 0.3;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  };

  window.addEventListener("mousemove", handler);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handler);
});
</script>

<style scoped>
.text-feeling {
  color: #333333;
}

.title-feeling {
  color: var(--primary);
  margin-bottom: 1.3rem;
  font-weight: 600;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 200px 0 120px;
  background:
    radial-gradient(
      1200px circle at 10% 10%,
      rgba(109, 213, 250, 0.3),
      transparent 40%
    ),
    radial-gradient(
      1000px circle at 90% 20%,
      rgba(137, 247, 254, 0.35),
      transparent 45%
    ),
    linear-gradient(135deg, #f8feff 0%, #eafaff 50%, #f6fbff 100%);
}

.hero .container {
  position: relative;
  z-index: 3;
}

/* background wrapper */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* blobs */
.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.65;
  animation: floatSlow 14s ease-in-out infinite;
}

/* sync with theme */
.circle-1 {
  width: 300px;
  height: 300px;
  background: color-mix(in srgb, var(--primary) 70%, white);
  top: -120px;
  left: -120px;
}

.circle-2 {
  width: 460px;
  height: 460px;
  background: color-mix(in srgb, var(--accent) 70%, white);
  top: 15%;
  right: -180px;
  animation-delay: 2s;
}

.circle-3 {
  width: 220px;
  height: 220px;
  background: color-mix(in srgb, var(--primary) 50%, #7de2d1);
  bottom: 15%;
  left: 12%;
  animation-delay: 4s;
}

.circle-4 {
  width: 180px;
  height: 180px;
  background: color-mix(in srgb, var(--accent) 50%, #89f7fe);
  bottom: -80px;
  right: 30%;
  animation-delay: 6s;
}

/* glass layer */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  background: rgba(255, 255, 255, 0.35);
  z-index: 2;
}

/* noise */
.hero-noise {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
}

/* animation */
@keyframes floatSlow {
  0% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(30px, -40px) scale(1.06);
  }

  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* glow behind hero image */
.floating-img-wrap::before {
  content: "";
  position: absolute;
  inset: -20px;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--primary) 35%, transparent),
    transparent 70%
  );
  filter: blur(40px);
  z-index: -1;
}

template {
  color: var(--body);
  background-color: white;
  overflow-x: hidden;
}

/* Hero */
/* .hero {
  padding: 200px 0 120px;
  background: radial-gradient(circle at top right, #bafffc 0%, #ecfaff 60%);
} */

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.3;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.2s;
}

.hero p {
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.4s;
}

.hero .btn-group-wrap {
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.6s;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  animation: fadeInScale 0.8s forwards;
}

.floating-img-wrap {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.btn-signup-modern {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  color: white !important;
  border: none;
  padding: 10px 24px;
  border-radius: 18px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(19, 112, 127, 0.2);
}

.floating-img {
  border-radius: 24px;
  box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.15);
}

.stats-card {
  background: var(--dark);
  border-radius: 24px;
  padding: 2rem;
  color: white;
  animation: float-delayed 5s ease-in-out infinite;
}

/* --- Animation Keyframes --- */
@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes float-delayed {
  0% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-15px) translateX(10px);
  }

  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Feature Cards */
.feature-card {
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  background: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  box-shadow: 1px 5px 8px rgba(240, 240, 240, 0.795);
}

.feature-card:hover {
  border-color: var(--primary-light);
  box-shadow: 0 30px 60px rgba(19, 112, 127, 0.12);
  transform: translateY(-12px);
}

/* Benefits Section */
.benefits-section {
  background: #f1f5f9;
  border-radius: 60px;
  padding: 100px 0;
  margin: 0 20px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.benefit-item:hover {
  transform: translateX(10px);
}

/* About Section */
.about-img-stack {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
}

.img-main {
  width: 80%;
  border-radius: 30px;
  z-index: 1;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  height: 400px;
}

.img-sub {
  width: 50%;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  border: 8px solid white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  height: 250px;
  animation: float-delayed 7s infinite;
}

.border-teal {
  border-color: var(--primary) !important;
}

@media (max-width: 991px) {
  .hero {
    padding: 160px 0 60px;
    text-align: center;
  }

  .hero p {
    margin: 0 auto 2.5rem;
  }

  .benefits-section {
    margin: 0;
    border-radius: 0;
    padding: 60px 0;
  }

  .about-img-stack {
    height: 400px;
    margin-top: 3rem;
  }

  .nav-modern {
    padding: 10px 16px;
    border-radius: 20px;
  }

  .navbar-collapse {
    background: white;
    margin-top: 15px;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
  }
}
</style>
