<template>
  <div>
    <!-- NAVBAR CONTAINER -->
    <div class="nav-container" id="mainNavContainer">
      <div class="nav-modern">
        <!-- BRAND -->
        <a class="brand-modern" href="#">
          <div class="brand-symbol">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          ReabList
        </a>

        <!-- DESKTOP MENU -->
        <div class="d-none d-lg-flex align-items-center">
          <ul class="d-flex list-unstyled m-0 p-0">
            <li>
              <a class="nav-link nav-link-modern active" href="#">ទំព័រដើម</a>
            </li>
            <li><a class="nav-link nav-link-modern" href="#">មុខងារ</a></li>
            <li><a class="nav-link nav-link-modern" href="#">អំពីយើង</a></li>
          </ul>
          <div class="ms-4 d-flex align-items-center gap-2">
            <a href="#" class="btn-login-modern">ចូលប្រើ</a>
            <a href="#" class="btn btn-signup-modern">ចុះឈ្មោះ</a>
          </div>
        </div>

        <!-- MOBILE TOGGLE -->
        <button
          class="navbar-toggler d-lg-none border-0 shadow-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>

    <!-- OFFCANVAS MENU -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title brand-modern" id="offcanvasNavbarLabel">
          <div class="brand-symbol">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          ReabList
        </h5>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <nav class="flex-grow-1">
          <a class="nav-link nav-link-modern active" href="#">ទំព័រដើម</a>
          <a class="nav-link nav-link-modern" href="#">មុខងារ</a>
          <a class="nav-link nav-link-modern" href="#">អំពីយើង</a>
        </nav>

        <div class="divider"></div>

        <div class="auth-section">
          <a href="#" class="btn-login-modern d-block">ចូលប្រើ</a>
          <a href="#" class="btn btn-signup-modern">ចុះឈ្មោះ</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- New Floating Glass Navbar Styles --- */
:root {
  --primary: #13707f;
  --primary-light: #1da1b5;
  --primary-glow: rgba(19, 112, 127, 0.3);
  --glass-bg: rgba(255, 255, 255, 0.75);
  --glass-border: rgba(255, 255, 255, 0.4);
  --text-main: #1a2b2e;
  --text-muted: #5a6e71;
  --font-khmer: "Kantumruy Pro", sans-serif;
  --font-latin: "Inter", sans-serif;
  --offcanvas-bg: #f8fafb;
}

body {
  background: linear-gradient(135deg, #f0f7f8 0%, #e0ebeb 100%);
  min-height: 200vh;
  font-family: var(--font-khmer);
  margin: 0;
}

/* --- Floating Navbar Container --- */
.nav-container {
  position: fixed;
  top: 24px;
  left: 0;
  right: 0;
  z-index: 1050;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.nav-modern {
  background: var(--glass-bg);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 10px 24px;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  width: 100%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-scrolled .nav-modern {
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px -10px rgba(19, 112, 127, 0.2);
}

/* --- Brand Styling --- */
.brand-modern {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-main) !important;
  font-weight: 800;
  font-size: 1.35rem;
  text-decoration: none;
  font-family: var(--font-latin);
  letter-spacing: -0.5px;
}

.brand-symbol {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary-light), var(--primary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 6px 15px var(--primary-glow);
  transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* --- Nav Links --- */
.nav-link-modern {
  color: var(--text-muted) !important;
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 20px !important;
  border-radius: 16px;
  transition: all 0.3s ease;
  margin: 4px 0;
  text-decoration: none;
  display: block;
}

.nav-link-modern:hover {
  color: var(--primary) !important;
  background: rgba(19, 112, 127, 0.06);
}

.nav-link-modern.active {
  color: var(--primary) !important;
  background: #e6f0f1 !important; /* Soft teal background from image */
}

/* --- Offcanvas Customization --- */
.offcanvas {
  border-top-left-radius: 32px !important;
  border-bottom-left-radius: 32px !important;
  background: var(--offcanvas-bg) !important;
  border: none !important;
  width: 85% !important;
  max-width: 360px !important;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1) !important;
}

.offcanvas-header {
  padding: 30px 24px 20px 24px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.offcanvas-body {
  padding: 10px 24px 30px 24px;
  display: flex;
  flex-direction: column;
}

.offcanvas-title {
  color: #b0bfc1 !important; /* Muted brand text color from image */
}

.offcanvas-title .brand-symbol {
  background: #d4e3e5; /* Muted symbol color from image */
  box-shadow: none;
}

.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 30px 0;
  width: 100%;
}

/* --- Auth Buttons --- */
.btn-login-modern {
  color: var(--text-muted);
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  padding: 12px;
  transition: 0.3s;
  text-align: center;
  margin-bottom: 10px;
}

.btn-signup-modern {
  background: var(--primary);
  color: white !important;
  border: none;
  padding: 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
  text-align: center;
  box-shadow: 0 8px 20px var(--primary-glow);
}

.btn-signup-modern:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* --- Mobile Toggle --- */
.navbar-toggler {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 8px;
}

@media (min-width: 992px) {
  .nav-link-modern {
    padding: 10px 20px !important;
    margin: 0 2px;
    font-size: 0.95rem;
  }
  .btn-signup-modern {
    padding: 12px 28px;
    font-size: 0.95rem;
    border-radius: 16px;
  }
}
</style>