<template>
  <div class="error-wrapper min-vh-100 d-flex align-items-center justify-content-center">

    <!-- Animated background text -->
    <div class="error-bg">
      <span v-for="n in 8" :key="n">404</span>
    </div>

    <!-- Card -->
    <div class="card shadow-lg border-0 text-center error-card">

      <img src="/src/assets/images/notfound.png" alt="រកមិនឃើញទំព័រ" class="img-fluid mb-4 floating-image"
        style="max-height: 220px;width: 900px;" />
      <h5 class="text-muted mb-3">រកមិនឃើញទំព័រនេះទេ</h5>

      <p class="text-secondary mb-4">
        សូមអភ័យទោស! ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមាននោះទេ​ សូមផ្លាស់ប្តូរទីតាំងថ្មី។
      </p>

      <router-link to="/" class="btn btn-teal px-4">
        ត្រឡប់ទៅទំព័រដើមវិញ
      </router-link>

    </div>

  </div>
</template>

<style scoped>
.error-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f766e, #14b8a6);
}

.error-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.error-bg span {
  position: absolute;
  font-size: 6rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.15);
  animation: jump 6s ease-in-out infinite;
}


.error-bg span:nth-child(1) {
  top: 10%;
  left: 15%;
  animation-delay: 0s;
}

.error-bg span:nth-child(2) {
  top: 30%;
  left: 60%;
  animation-delay: 1s;
}

.error-bg span:nth-child(3) {
  top: 60%;
  left: 25%;
  animation-delay: 2s;
}

.error-bg span:nth-child(4) {
  top: 75%;
  left: 70%;
  animation-delay: 3s;
}

.error-bg span:nth-child(5) {
  top: 45%;
  left: 45%;
  animation-delay: 4s;
}

.error-bg span:nth-child(6) {
  top: 20%;
  left: 80%;
  animation-delay: 5s;
}

.error-bg span:nth-child(7) {
  top: 80%;
  left: 10%;
  animation-delay: 2.5s;
}

.error-bg span:nth-child(8) {
  top: 55%;
  left: 85%;
  animation-delay: 1.5s;
}

@keyframes jump {

  0%,
  100% {
    transform: translateY(0);
    opacity: 0.15;
  }

  50% {
    transform: translateY(-40px);
    opacity: 0.3;
  }
}


.floating-image {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}


.error-card {
  position: relative;
  z-index: 2;
  max-width: 500px;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.98),
      rgba(255, 255, 255, 0.92));
  backdrop-filter: blur(10px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 4px 10px rgba(0, 0, 0, 0.08);
  animation: cardPop 0.6s ease-out;
  text-align: center;
}


@keyframes cardPop {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(20px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}


.error-badge {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #0f766e;
  background: rgba(15, 118, 110, 0.12);
}


.btn-teal {
  background-color: #0d9488;
  border-color: #0d9488;
  color: #fff;
  transition: all 0.25s ease;
}

.btn-teal:hover {
  background-color: #0f766e;
  border-color: #0f766e;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
