<template>
  <div>
    <Transition name="overlay-fade">
      <div v-if="isSidebarOpen" class="sidebar-overlay" @click="closeSidebar" />
    </Transition>

    <aside id="reab-sidebar" :class="{ open: isSidebarOpen }">
      <!-- Logo -->
      <div class="logo-sticky">
        <div class="logo-section">
          <a href="#" class="brand-area">
            <div class="brand-logo">
              <i class="bi bi-check2-circle"></i>
            </div>
            <span class="brand-name">
              <span class="brand-color">Reab</span
              ><span class="brand-last-color">List</span>
            </span>
          </a>
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
          @click="handleNavClick"
        >
          <i class="fas fa-chart-pie"></i>
          <span>ផ្ទាំងគ្រប់គ្រង</span>
        </router-link>

        <router-link
          :to="{ name: 'AllTasks' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-list-ul"></i>
          <span>ភារកិច្ចទាំងអស់</span>
        </router-link>

        <p class="nav-label">សកម្មភាពទូទៅ</p>

        <a href="#" class="reab-nav-link" @click.prevent="openCreateTask">
          <PlusCircle :size="18" />
          <span>បង្កើតភារកិច្ចថ្មី</span>
        </a>

        <p class="nav-label">ប្រភេទភារកិច្ច</p>

        <router-link
          :to="{ name: 'Category', params: { name: 'Personal' } }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-user"></i>
          <span>ផ្ទាល់ខ្លួន</span>
        </router-link>

        <router-link
          :to="{ name: 'Category', params: { name: 'Work' } }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-briefcase"></i>
          <span>ការងារ</span>
        </router-link>

        <router-link
          :to="{ name: 'Category', params: { name: 'Study' } }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-graduation-cap"></i>
          <span>ការសិក្សា</span>
        </router-link>
      </nav>

      <!-- Footer -->
      <div class="mt-auto">
        <button class="btn-logout" @click="openLogoutModal">
          <i class="fas fa-sign-out-alt me-2"></i>
          ចាកចេញ
        </button>
      </div>
      
    </aside>

    <TaskCreate ref="taskCreateRef" />

    <!-- Logout Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showLogoutModal"
          class="modal-backdrop"
          @click.self="closeLogoutModal"
        >
          <div class="modal-card" @click.stop>
            <div class="modal-head">
              <h3>ចាកចេញ?</h3>
              <button @click="closeLogoutModal" class="close-btn" type="button">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <p>តើអ្នកប្រាកដថាចង់ចាកចេញពីគណនីរបស់អ្នកដែរឬទេ?</p>
            </div>
            <div class="modal-foot">
              <button
                class="btn-cancel"
                @click="closeLogoutModal"
                type="button"
              >
                បោះបង់
              </button>
              <button
                class="btn-confirm-logout"
                @click="handleLogout"
                :disabled="isLoggingOut"
                type="button"
              >
                <i class="bi bi-box-arrow-right fw-bold"></i>
                {{ isLoggingOut ? "កំពុងចាកចេញ..." : "ចាកចេញ" }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/API/api";
import { useAuthStore } from "@/stores/authentication";
import { PlusCircle } from "lucide-vue-next";
import TaskCreate from "@/views/user/Task/TaskCreate.vue"; // <-- adjust path
import { useSidebar } from "@/composable/Usesidebar";

// ── Sidebar state — same singleton as Navbar ─────────────────────
const { isSidebarOpen, closeSidebar } = useSidebar();

const router = useRouter();
const authStore = useAuthStore();

const taskCreateRef = ref(null);
const showLogoutModal = ref(false);
const isLoggingOut = ref(false);

const handleNavClick = () => {
  if (window.innerWidth <= 900) closeSidebar();
};

const openCreateTask = () => {
  closeSidebar?.();
  taskCreateRef.value?.open(); 
};
const openLogoutModal = () => {
  showLogoutModal.value = true;
};

const handleLogout = async () => {
  if (isLoggingOut.value) return;
  isLoggingOut.value = true;
  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    authStore.logout();
    showLogoutModal.value = false;
    isLoggingOut.value = false;
    router.push("/login");
  }
};
</script>

<style scoped>
/* Sidebar shell ─────────────────────────────────────────────────── */
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
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s ease;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
#reab-sidebar::-webkit-scrollbar {
  display: none;
}

/* Mobile: hidden off-screen, slides in on .open ────────────────── */
@media (max-width: 900px) {
  #reab-sidebar {
    transform: translateX(-100%);
    box-shadow: none;
  }
  #reab-sidebar.open {
    transform: translateX(0);
    box-shadow: 8px 0 32px rgba(0, 0, 0, 0.18);
  }
}

/* Overlay ──────────────────────────────────────────────────────── */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
  z-index: 1000;
}
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* Brand ─────────────────────────────────────────────────────────── */
.logo-sticky {
  position: sticky;
  top: 0;
  z-index: 20;
}
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  padding-left: 8px;
}
.brand-area {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding-left: 12px;
  margin-left: -10px;
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
.brand-color {
  color: var(--primary);
  letter-spacing: 1px;
}
.brand-last-color {
  color: rgb(15, 69, 69);
  letter-spacing: 1px;
}

/* Nav ───────────────────────────────────────────────────────────── */
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
  font-size: 15px;
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

/* Logout ────────────────────────────────────────────────────────── */
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

/* Logout modal ──────────────────────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 18px;
}
.modal-card {
  width: 90%;
  max-width: 480px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 25px 80px rgba(15, 23, 42, 0.28);
  border: 1px solid rgba(15, 23, 42, 0.08);
  overflow: hidden;
  position: relative;
  animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(16px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-head h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #b91c1c;
}
.close-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  color: #94a3b8;
  font-size: 28px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    color 0.2s;
}
.close-btn:hover {
  background: #f1f5f9;
  color: #475569;
}
.modal-body {
  padding: 18px 22px;
  color: #475569;
  font-size: 15px;
  line-height: 1.7;
}
.modal-body p {
  margin: 0;
}
.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  padding: 18px 22px 22px;
}
.btn-cancel {
  width: 120px;
  height: 48px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}
.btn-confirm-logout {
  width: 140px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #fff;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.25);
}
.btn-confirm-logout:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 35px rgba(239, 68, 68, 0.32);
}
.btn-confirm-logout:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
