<template>
  <div class="d-flex">
    <!-- Overlay -->
    <div
      v-if="isSidebarOpen"
      class="sidebar-overlay"
      @click="closeSidebar"
    />

    <!-- Sidebar -->
    <aside id="reab-sidebar" :class="{ open: isSidebarOpen }">
      <!-- Logo -->
      <div class="logo-sticky">
        <div class="logo-section">
          <div class="logo-box">
            <i class="fas fa-check-double"></i>
          </div>
          <span class="logo-text">ReabList</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav>
        <p class="nav-label">ផ្ទាំងគ្រប់គ្រងគោល</p>

        <router-link
          :to="{ name: 'Dashboard' }"
          class="reab-nav-link"
          active-class="active"
          exact
        >
          <i class="fas fa-chart-pie"></i>
          <span>Dashboard</span>
        </router-link>

        <router-link
          :to="{ name: 'AllTasks' }"
          class="reab-nav-link"
          active-class="active"
        >
          <i class="fas fa-list-ul"></i>
          <span>ភារកិច្ចទាំងអស់</span>
        </router-link>

        <p class="nav-label">សកម្មភាពទូទៅ</p>
        <!-- <a
          href="#"
          class="reab-nav-link"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
        >
          <PlusCircle :size="18" />
          <span>បង្កើតភារកិច្ចថ្មី</span>
        </a> -->

        <div class="reab-nav-link" @click="openCreateTask">
          <PlusCircle :size="18" />
          <span>បង្កើតភារកិច្ចថ្មី</span>
        </div>


        <p class="nav-label">ប្រភេទភារកិច្ច</p>

        <router-link
          :to="{ name: 'Category', params: { name: 'Personal' } }"
          class="reab-nav-link"
          active-class="active"
        >
          <i class="fas fa-user"></i>
          <span>ផ្ទាល់ខ្លួន</span>
        </router-link>

        <router-link
          :to="{ name: 'Category', params: { name: 'Work' } }"
          class="reab-nav-link"
          active-class="active"
        >
          <i class="fas fa-briefcase"></i>
          <span>ការងារ</span>
        </router-link>

        <router-link
          :to="{ name: 'Category', params: { name: 'Study' } }"
          class="reab-nav-link"
          active-class="active"
        >
          <i class="fas fa-graduation-cap"></i>
          <span>ការសិក្សា</span>
        </router-link>
      </nav>

      <!-- Footer -->
      <div class="mt-auto">
        <div class="status-card">
          <div
            class="d-flex align-items-center justify-content-center gap-2 mb-2"
          >
            <div class="pulse-status"></div>
            <p class="status-text">កំពុងដំណើរការ</p>
          </div>
          <button class="btn btn-primary btn-refresh">
            ធ្វើបច្ចុប្បន្នភាពទិន្នន័យ
          </button>
        </div>

        <button class="btn-logout" @click="handleLogout">
          <i class="fas fa-sign-out-alt me-2"></i>
          ចាកចេញ
        </button>
        
      </div>
    </aside>
    <TaskCreate ref="taskCreateRef" />
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/API/api";
import { useAuthStore } from "@/stores/authentication";
import { PlusCircle } from "lucide-vue-next";
import TaskCreate from "@/views/user/Task/TaskCreate.vue"; // <-- adjust path

const sidebar = inject("sidebar");
const isSidebarOpen = sidebar?.isSidebarOpen;
const closeSidebar = sidebar?.closeSidebar;

const router = useRouter();
const authStore = useAuthStore();

const taskCreateRef = ref(null);

const openCreateTask = () => {
  closeSidebar?.();
  taskCreateRef.value?.open(); // ✅ this will call defineExpose({ open })
};

const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    authStore.logout();
    router.push("/login");
  }
};
</script>


<style scoped>
#reab-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  width: 280px;
  height: 100vh;
  padding: 32px 24px;

  display: flex;
  flex-direction: column;

  background: #ffffffe6;
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(226, 232, 240, 0.8);

  z-index: 1100;
  transform: translateX(0);
  transition: transform 0.3s ease;

  overflow-y: auto;
  overscroll-behavior: contain;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

#reab-sidebar::-webkit-scrollbar {
  display: none;
}


/* Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
}

/* Mobile */
@media (max-width: 900px) {
  #reab-sidebar {
    transform: translateX(-100%);
  }

  #reab-sidebar.open {
    transform: translateX(0);
  }
}

/* Logo */
.logo-sticky {
  position: sticky;
  top: 0;
  z-index: 20;

  /* backdrop-filter: blur(20px); */
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
  padding-left: 8px;
}

.logo-box {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #0d9488;
  border-radius: 14px;
  color: #fff;
  box-shadow: 0 8px 16px -4px rgba(13, 148, 136, 0.4);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

/* Navigation */
.nav-label {
  margin: 24px 0 12px 16px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #64748b;
}

.reab-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 12px 16px;
  margin-bottom: 4px;

  font-size: 14px;
  font-weight: 700;
  text-decoration: none;

  color: #64748b;
  border-radius: 14px;
  position: relative;
  transition: all 0.2s ease;
}

.reab-nav-link:hover {
  background: rgba(13, 148, 136, 0.05);
  color: #0d9488;
}

.reab-nav-link.active {
  background: rgba(13, 148, 136, 0.1);
  color: #0d9488;
}

.reab-nav-link.active::after {
  content: "";
  position: absolute;
  top: 0;
  right: -24px;
  bottom: 0;
  width: 5px;
  background: #0d9488;
  border-radius: 4px 0 0 4px;
}

/* Status */
.status-card {
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  background: rgba(13, 148, 136, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
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
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #10b981;
}

/* Buttons */
.btn-refresh {
  width: 100%;
  padding: 0.5rem 0;
  font-weight: 800;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-logout {
  width: 100%;
  margin-top: 12px;
  padding: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  background: #fff;
  border: 1.5px solid #fca5a5;
  border-radius: 14px;
  color: #ef4444;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: #fef2f2;
  border-color: #ef4444;
}

.btn-logout i {
  font-size: 1.1rem;
}
</style>
