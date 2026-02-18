<template>
  <div>
    <!-- NAVBAR -->
    <div class="nav-wrapper" id="navbar">
      <nav class="nav-modern">

        <!-- Brand -->
        <router-link to="/" class="brand-area">
          <div class="brand-logo">
           <i class="bi bi-check2-circle"></i>
          </div>
          <span class="brand-name">
            <span class="brand-color">Reab</span><span class="brand-last-color">List</span>
          </span>
        </router-link>

        <!-- Desktop Links -->
        <div class="nav-links-pill desktop-only">
          <router-link :to="{ name: 'homepage' }" class="nav-link-item">
            <i class="bi bi-house-door"></i> ទំព័រដើម
          </router-link>
          <router-link :to="{ name: 'features' }" class="nav-link-item">
            <i class="bi bi-grid-1x2"></i> មុខងារ
          </router-link>
          <router-link :to="{ name: 'aboutUs' }" class="nav-link-item">
            <i class="bi bi-people"></i> អំពីយើង
          </router-link>
        </div>

        <!-- Desktop Actions -->
        <div class="nav-actions desktop-only">
          <router-link :to="{ name: 'login' }" class="btn-login">ចូលប្រើ</router-link>
          <router-link :to="{ name: 'register' }" class="btn-register">
            <span>ចុះឈ្មោះ</span>
            <i class="bi bi-arrow-right-short"></i>
          </router-link>
        </div>

        <!-- Hamburger -->
        <button class="hamburger" @click="menuOpen = true">
          <i class="bi bi-list"></i>
        </button>

      </nav>
    </div>

    <!-- MOBILE OVERLAY -->
    <div class="mobile-overlay" :class="{ 'is-active': menuOpen }" @click.self="menuOpen = false">
      <div class="offcanvas-menu">

        <div class="offcanvas-header">
          <strong>Menu</strong>
          <button class="close-btn" @click="menuOpen = false">
            ✕
          </button>
        </div>

        <div class="offcanvas-body">
          <router-link @click="menuOpen=false" :to="{name:'homepage'}" class="mobile-link">
            <i class="bi bi-house-door"></i> ទំព័រដើម
          </router-link>

          <router-link @click="menuOpen=false" :to="{name:'features'}" class="mobile-link">
            <i class="bi bi-grid-1x2"></i> មុខងារ
          </router-link>

          <router-link @click="menuOpen=false" :to="{name:'aboutUs'}" class="mobile-link">
            <i class="bi bi-people"></i> អំពីយើង
          </router-link>

          <hr class="divider" />

          <router-link @click="menuOpen=false" :to="{name:'login'}" class="mobile-link">
            <i class="bi bi-box-arrow-in-right"></i> ចូលប្រើ
          </router-link>

          <router-link
            @click="menuOpen=false"
            :to="{name:'register'}"
            class="mobile-link mobile-btn-reg"
          >
            <i class="bi bi-person-plus"></i> ចុះឈ្មោះ
          </router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>



<style scoped>
/* ================================
   Glass Navbar (Filter Only)
================================ */

/* ================================
   Hamburger
================================ */
.hamburger {
  display: none;
  background: rgba(13, 148, 136, 0.15);
  border: 1px solid rgba(13, 148, 136, 0.35);
  width: 44px;
  height: 44px;
  border-radius: 12px;
  cursor: pointer;
  color: #0d9488;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
}
.brand-last-color{
  color: rgb(15, 69, 69);
  /* space from one text to one text */
  letter-spacing: 1px;
}

/* ================================
   Responsive Behavior
================================ */
@media (max-width: 900px) {

  .desktop-only {
    display: none !important;
  }

  .hamburger {
    display: flex;
  }

  .brand-name {
    display: none;
  }
}

.nav-wrapper {
  position: fixed;
  top: 24px;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.nav-modern {
  backdrop-filter: blur(60px) saturate(80%);
  -webkit-backdrop-filter: blur(2px) saturate(80%);
  background: rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 14px 35px rgba(0, 0, 0, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25);
}

/* ================================
   Brand
================================ */
.brand-area {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding-left: 12px;
  margin-left: -10px;
}
.brand-color{
  color: var(--primary);
  letter-spacing: 1px;
}

.brand-logo {
  width: 46px;
  height: 46px;
  background: linear-gradient(145deg, #14b8a6, #0d9488);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.4rem;
  box-shadow:
    0 1px 2px rgba(13, 148, 136, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  transition: transform 0.35s ease;
}

.brand-area:hover .brand-logo {
  transform: scale(1.1);
}

.brand-name {
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: var(--text-main);
}

/* ================================
   Nav Links (UNCHANGED ACTIVE)
================================ */
.nav-links-pill {
  display: flex;
  gap: 6px;
}

.nav-link-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  font-size: 17px;
  font-weight: 700;
  color: var(--text-muted);
  text-decoration: none;
  transition: all 0.25s ease;
}

.nav-link-item i {
  font-size: 1.25rem;
}

.nav-link-item:hover {
  color: #0d9488;
  background: rgba(13, 148, 136, 0.08);
  border-radius: 10px;
  transition: 0.4s;

}

/* CLEAN CLEAN ACTIVE */
.nav-link-item {
  position: relative;
}

.nav-link-item.active {
  color: #0d9488;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(6px);
  font-weight: 800;
  padding: 12px 20px;
  border-top: 2px solid teal;
  border-bottom: 2px solid teal;
  border-radius: 12px;
}



/* ================================
  Actions
================================ */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-login {
  padding: 10px 32px;
  font-size: 16px;
  font-weight: 800;
  border-radius: 999px;
  color: #0d9488;
  text-decoration: none;
  background: rgba(13, 148, 136, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(13, 148, 136, 0.35);
  transition: all 0.25s ease;
}

.btn-login:hover {
  background: rgba(13, 148, 136, 0.2);
  transform: translateY(-2px);
}

.btn-register {
  padding: 10px 32px;
  font-size: 16px;
  font-weight: 800;
  border-radius: 999px;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  box-shadow: 0 3px 6px rgba(13, 148, 136, 0.55);
  transition: all 0.3s ease;
}

.btn-register:hover {
  transform: translateY(-3px) scale(1.05);
}

/* ================================
   Responsive
================================ */
@media (max-width: 900px) {
  .nav-links-pill {
    display: none;
  }
  .brand-name {
    display: none;
  }
}
/* ================================
   RESPONSIVE NAVIGATION (FINAL)
================================ */

/* Desktop default */
.hamburger {
  display: none;
}

/* ================================
   Tablet & Mobile (≤1024px)
================================ */
@media (max-width: 1024px) {

  /* Hide desktop nav */
  .desktop-only {
    display: none !important;
  }

  /* Show hamburger */
  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Navbar spacing */
  .nav-modern {
    padding: 12px 16px;
    margin: 0 8px;
  }

  /* Keep brand visible on tablet */
  .brand-name {
    display: inline-block !important;
    font-size: 1.1rem;
  }

  /* Offcanvas width for tablets */
  .offcanvas-menu {
    width: 320px;
  }
}

/* ================================
   Phones (≤768px)
================================ */
@media (max-width: 768px) {

  .nav-modern {
    padding: 10px 14px;
  }

  /* Offcanvas takes more space */
  .offcanvas-menu {
    width: 85%;
    max-width: 320px;
  }

  .mobile-link {
    font-size: 1rem;
    padding: 14px;
  }
}

/* ================================
   Small Phones (≤480px)
================================ */
@media (max-width: 480px) {

  /* Hide brand text */
  .brand-name {
    display: none !important;
  }

  /* Full-height smooth panel */
  .offcanvas-menu {
    width: 100%;
    max-width: none;
    border-radius: 0;
  }

  .offcanvas-header {
    margin-bottom: 24px;
  }

  .mobile-link {
    font-size: 1rem;
    padding: 14px 16px;
  }
}

.offcanvas-menu {
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-overlay {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

/* ================================
   MOBILE OVERLAY
================================ */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-overlay.is-active {
  opacity: 1;
  visibility: visible;
}

/* ================================
   OFFCANVAS MENU
================================ */
.offcanvas-menu {
  position: fixed;
  top: 0;
  right: -320px;
  width: 320px;
  height: 100%;
  background: #ffffff;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.15);
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-overlay.is-active .offcanvas-menu {
  right: 0;
}

/* ================================
   OFFCANVAS HEADER
================================ */
.offcanvas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  font-size: 1.2rem;
  font-weight: 800;
}

/* Close button */
.close-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  cursor: pointer;
  font-size: 1.2rem;
}

/* ================================
   OFFCANVAS BODY
================================ */
.offcanvas-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-main);
  font-weight: 700;
  transition: all 0.25s ease;
}

.mobile-link:hover {
  background: rgba(13, 148, 136, 0.1);
  color: #0d9488;
}

.mobile-btn-reg {
  justify-content: center;
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  color: white;
}

/* Divider */
.divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 10px 0;
}


</style>
