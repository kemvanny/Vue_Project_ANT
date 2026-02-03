<template>
  <div>
    <!-- overlay for mobile -->
  <div
    v-if="sidebarOpen"
    class="sidebar-overlay"
    @click="sidebarOpen = false"
  ></div>

  <!-- sidebar -->
  <aside id="reab-sidebar" :class="{ open: sidebarOpen }">
    <div class="logo-section">
      <div class="logo-box">
        <i class="fas fa-check-double"></i>
      </div>
      <span class="logo-text">ReabList</span>

      <!-- close btn on mobile -->
      <button class="sidebar-close" @click="sidebarOpen = false">✕</button>
    </div>

    <nav>
      <p class="nav-label">ផ្ទាំងគ្រប់គ្រងគោល</p>

      <router-link
        :to="{ name: 'Dashboard' }"
        class="reab-nav-link"
        active-class="active"
        exact
      >
        <i class="fas fa-chart-pie"></i> <span>Dashboard</span>
      </router-link>

      <router-link
        :to="{ name: 'AllTasks' }"
        class="reab-nav-link"
        active-class="active"
      >
        <i class="fas fa-list-ul"></i> <span>ភារកិច្ចទាំងអស់</span>
      </router-link>

      <router-link
        :to="{ name: 'Pending' }"
        class="reab-nav-link"
        active-class="active"
      >
        <i class="fas fa-hourglass-half"></i> <span>ការងារកំពុងរង់ចាំ</span>
      </router-link>

      <router-link
        :to="{ name: 'Completed' }"
        class="reab-nav-link"
        active-class="active"
      >
        <i class="fas fa-circle-check"></i> <span>ភារកិច្ចដែលបានបញ្ចប់</span>
      </router-link>

      <p class="nav-label">សកម្មភាពទូទៅ</p>

      <a href="#" class="reab-nav-link" data-bs-toggle="modal" data-bs-target="#addTaskModal">
        <i class="fas fa-plus-circle"></i> <span>បង្កើតភារកិច្ចថ្មី</span>
      </a>

      <p class="nav-label">ប្រភេទភារកិច្ច</p>

      <router-link
        :to="{ name: 'Category', params: { name: 'Personal' } }"
        class="reab-nav-link"
        active-class="active"
      >
        <i class="fas fa-user"></i> <span>ផ្ទាល់ខ្លួន</span>
      </router-link>

      <router-link
        :to="{ name: 'Category', params: { name: 'Work' } }"
        class="reab-nav-link"
        active-class="active"
      >
        <i class="fas fa-briefcase"></i> <span>ការងារ</span>
      </router-link>

      <router-link
        :to="{ name: 'Category', params: { name: 'Study' } }"
        class="reab-nav-link"
        active-class="active"
      >
        <i class="fas fa-graduation-cap"></i> <span>ការសិក្សា</span>
      </router-link>
    </nav>

    <div class="mt-auto">
      <div class="status-card">
        <div class="status-row">
          <div class="pulse-status"></div>
          <p class="status-text">កំពុងដំណើរការ</p>
        </div>

        <button class="btn btn-primary btn-refresh">
          ធ្វើបច្ចុប្បន្នភាពទិន្នន័យ
        </button>
      </div>

      <button class="btn-logout" @click="handleLogout">
        <i class="fas fa-sign-out-alt me-2"></i> <span>ចាកចេញ</span>
      </button>
    </div>
  </aside>

  <!-- hamburger btn (mobile only) -->
  <button class="sidebar-toggle" @click="sidebarOpen = true">
    <i class="fas fa-bars"></i>
  </button>
  </div>

</template>

<script setup>
import { ref } from "vue";

const sidebarOpen = ref(false);

const handleLogout = () => {
  alert("logout"); // replace later
};
</script>

<style scoped>
/* Sidebar desktop */
#reab-sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1100;
  padding: 32px 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, width 0.25s ease;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #0f172a;
  margin-bottom: 48px;
  padding-left: 8px;
  position: relative;
}

.logo-box {
  width: 44px;
  height: 44px;
  background: #0d9488;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 16px -4px rgba(13, 148, 136, 0.4);
}

.logo-text {
  font-weight: 800;
  font-size: 1.5rem;
}

.nav-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 800;
  color: #64748b;
  margin: 24px 0 12px 16px;
}

.reab-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #64748b;
  text-decoration: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  position: relative;
}

.reab-nav-link:hover {
  color: #0d9488;
  background: rgba(13, 148, 136, 0.05);
}

.reab-nav-link.active {
  background: rgba(13, 148, 136, 0.1);
  color: #0d9488;
}

.reab-nav-link.active::after {
  content: "";
  position: absolute;
  right: -24px;
  top: 0;
  bottom: 0;
  width: 5px;
  background: #0d9488;
  border-radius: 4px 0 0 4px;
}

/* status */
.status-card {
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  background: rgba(13, 148, 136, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.pulse-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

.status-text {
  font-size: 0.7rem;
  font-weight: 800;
  color: #10b981;
  margin: 0;
  text-transform: uppercase;
}

.btn-refresh {
  width: 100%;
  border-radius: 0.5rem;
  font-weight: 800;
}

.btn-logout {
  width: 100%;
  padding: 14px;
  background: white;
  border: 1.5px solid #fca5a5;
  border-radius: 14px;
  color: #ef4444;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 14px;
}

/* hamburger */
.sidebar-toggle {
  display: none;
  position: fixed;
  left: 14px;
  top: 14px;
  z-index: 1200;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  box-shadow: 0 14px 28px -22px rgba(15, 23, 42, 0.25);
}

.sidebar-close {
  display: none;
}

.sidebar-overlay {
  display: none;
}

/* Tablet collapse */
@media (max-width: 900px) {
  #reab-sidebar {
    width: 78px;
    padding: 22px 14px;
  }

  .logo-text,
  .reab-nav-link span,
  .nav-label,
  .status-card,
  .btn-refresh,
  .btn-logout span {
    display: none;
  }

  .reab-nav-link {
    justify-content: center;
    padding: 12px;
  }

  .reab-nav-link.active::after {
    right: -14px;
  }
}

/* Mobile slide */
@media (max-width: 680px) {
  .sidebar-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  #reab-sidebar {
    width: 280px;
    transform: translateX(-110%);
    padding: 28px 20px;
  }

  #reab-sidebar.open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45);
    z-index: 1050;
  }

  .sidebar-close {
    display: inline-flex;
    position: absolute;
    right: 0;
    top: 0;
    width: 36px;
    height: 36px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background: white;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }
}
</style>
