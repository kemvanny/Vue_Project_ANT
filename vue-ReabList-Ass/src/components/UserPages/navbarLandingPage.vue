<template>
  <div>
    <div class="nav-wrapper" id="navbar">
      <nav class="nav-modern">
        <!-- Brand -->
        <a href="#" class="brand-area">
          <div class="brand-logo">
            <i class="bi bi-check-lg"></i>
          </div>
          <span class="brand-name"><span class="brand-color">Reab</span>List</span>
        </a>

        <!-- Navigation Links -->
        <div class="nav-links-pill">
          <router-link :to="{name: 'homepage'}" class="nav-link-item">
            <i class="bi bi-house-door"></i>
            ទំព័រដើម
          </router-link>
          <router-link :to="{name: 'features'}" class="nav-link-item">
            <i class="bi bi-grid-1x2"></i>
            មុខងារ
          </router-link>
          <router-link :to="{name: 'aboutUs'}" class="nav-link-item">
            <i class="bi bi-people"></i>
            អំពីយើង
          </router-link>
        </div>

        <!-- Auth Actions -->
        <div class="nav-actions">
          <router-link :to="{name: 'login'}" class="btn-login">ចូលប្រើ</router-link>
          <router-link :to="{name: 'register'}" class="btn-register">
            <span>ចុះឈ្មោះ</span>
            <i class="bi bi-arrow-right-short"></i>
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* ================================
   Glass Navbar (Filter Only)
================================ */
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
  gap: 12px;
  text-decoration: none;
  padding-left: 12px;
}
.brand-color{
  color: var(--primary);
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
    0 10px 25px rgba(13, 148, 136, 0.55),
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
</style>
