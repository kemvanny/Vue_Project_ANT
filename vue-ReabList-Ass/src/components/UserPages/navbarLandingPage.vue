<template>
  <!-- Floating Navbar Container -->
  <div class="nav-container">
    <nav class="navbar navbar-expand-lg nav-modern">
      <div class="container-fluid p-0">
        <!-- BRAND -->
        <a class="brand-modern" href="#">
          <div class="brand-symbol">✓</div>
          ReabList
        </a>

        <!-- MOBILE TOGGLE -->
        <button
          class="navbar-toggler border-0 shadow-none"
          data-bs-toggle="collapse"
          data-bs-target="#reabNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- MENU ITEMS -->
        <div
          class="collapse navbar-collapse d-lg-flex justify-content-between align-items-center"
          id="reabNav"
        >
          <ul class="navbar-nav gap-2 m-auto">
            <li class="nav-item">
              <router-link class="nav-link nav-link-modern" :to="{ name: 'homepage' }">Homepage</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-link-modern" :to="{ name: 'features' }">Features</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-link-modern" :to="{ name: 'aboutUs' }">About Us</router-link>
            </li>
          </ul>

          <!-- AUTH BUTTONS -->
          <div class="d-flex align-items-center gap-2 mt-4 mt-lg-0">
            <router-link :to="{ name: 'login' }" class="btn-login-modern">Login</router-link>
            <router-link :to="{ name: 'register' }" class="btn btn-signup-modern">Sign Up</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* --- New Floating Glass Navbar Styles --- */
.nav-container {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 1050;
  padding: 0 15px;
}

.nav-modern {
  background: var(--glass-bg);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 28px;
  padding: 15px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition: all 0.4s ease;
  max-width: 1300px;
  margin: 0 auto;
}

.nav-modern:hover {
  box-shadow: 0 12px 32px rgba(19, 112, 127, 0.15);
  transform: translateY(-2px);
}

.brand-modern {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-main) !important;
  font-weight: 800;
  font-size: 1.5rem;
  text-decoration: none;
}

.brand-symbol {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1491a2, #0f5c69);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-size: 18px;
  box-shadow: 0 8px 20px rgba(19, 112, 127, 0.25);
  transition: 0.3s;
}

.brand-modern:hover .brand-symbol {
  transform: rotate(-8deg) scale(1.05);
}

.nav-link-modern {
  display: flex;
  align-items: center;
  color: var(--text-muted) !important;
  font-weight: 600;
  font-size: 1rem;
  padding: 8px 16px !important;
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link-modern:hover {
  color: var(--primary) !important;
  background: rgba(19, 112, 127, 0.08);
}

.nav-link-modern.active {
  color: var(--primary) !important;
  background: rgba(19, 112, 127, 0.12);
}

.btn-login-modern {
  color: var(--text-muted);
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  padding: 8px 18px;
  transition: 0.2s;
}

.btn-login-modern:hover {
  color: var(--text-main);
}

.btn-signup-modern {
  background: var(--primary);
  color: white !important;
  border: none;
  padding: 10px 24px;
  border-radius: 18px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(19, 112, 127, 0.2);
}

.btn-signup-modern:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(19, 112, 127, 0.25);
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

/* Scroll Reveal Base Classes */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s ease-out;
}

.reveal-right {
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.8s ease-out;
}

.reveal-left.active,
.reveal-right.active {
  opacity: 1;
  transform: translateX(0);
}
</style>