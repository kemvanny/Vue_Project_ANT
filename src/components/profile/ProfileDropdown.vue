<template>
  <div class="profile-dropdown-wrapper" v-if="profileData">
    <button class="profile-trigger" @click="toggleDropdown" :aria-expanded="dropdownOpen" type="button">
      <div class="user-details">
        <p class="user-display-name">{{ profileData.fullname }}</p>
        <p class="user-display-role">{{ profileData.role?.name }}</p>
      </div>

      <div class="user-avatar-circle">
        <img v-if="profileData.avatar" :src="profileData.avatar" :alt="profileData.fullname" class="avatar-image" />
        <span v-else>{{ getInitials(profileData.fullname) }}</span>
      </div>

      <ChevronDown :size="18" class="dropdown-chevron" stroke-width="2.5" :class="{ 'chevron-open': dropdownOpen }" />
    </button>

    <Teleport to="body">
      <Transition name="dropdown-fade">
        <div v-show="dropdownOpen" class="dropdown-backdrop" @click="closeDropdown"></div>
      </Transition>

      <Transition name="dropdown-slide">
        <div v-show="dropdownOpen" class="dropdown-menu-wrapper" :style="dropdownPosition" @click.stop>
          <div class="dropdown-card">
            <div class="dropdown-header">
              <div class="header-avatar">
                <img v-if="profileData.avatar" :src="profileData.avatar" :alt="profileData.fullname" />
                <span v-else>{{ getInitials(profileData.fullname) }}</span>
              </div>

              <div class="header-info">
                <p class="header-name">{{ profileData.fullname }}</p>
                <span class="header-role">{{ profileData.role?.name }}</span>
              </div>
            </div>

            <ul class="dropdown-actions">
              <li class="dropdown-action" data-route="/profile" @click="handleNavigation">
                <i class="bi bi-person"></i>
                <span>ព័ត៌មានគណនី</span>
              </li>

              <li class="dropdown-action" data-route="/profile/setting" @click="handleNavigation">
                <i class="bi bi-gear"></i>
                <span>ការកំណត់</span>
              </li>
            </ul>

            <div class="dropdown-footer">
              <button class="logout-btn" type="button" @click="openLogoutModal">
                <i class="bi bi-box-arrow-right"></i>
                ចាកចេញ
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showLogoutModal" class="modal-backdrop" @click.self="closeLogoutModal">
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

            <div class="modal-foot d-flex justify-content-end a;lign-items-center">
              <button class="btn-cancel" @click="closeLogoutModal" type="button">
                បោះបង់
              </button>
              <button class="btn-confirm-logout" @click="handleLogout" :disabled="isLoggingOut" type="button">
                <i class="bi bi-box-arrow-right fw-bold"></i>
                {{ isLoggingOut ? "កំពុងចាកចេញ..." : "ចាកចេញ" }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>

  <div class="profile-dropdown-wrapper" v-else>
    <p class="loading-text">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { ChevronDown } from "lucide-vue-next";
import api from "@/API/api";
import { useProfileStore } from "@/stores/profilestore";
import { useAuthStore } from "@/stores/authentication";

const router = useRouter();
const profileStore = useProfileStore();
const authStore = useAuthStore();

const profileData = ref(null);
const dropdownOpen = ref(false);
const showLogoutModal = ref(false);
const isLoggingOut = ref(false);
const triggerRect = ref(null);

const fetchProfileData = async () => {
  try {
    const response = await api.get("/auth/profile");
    if (response.data?.result) {
      profileData.value = response.data.data;
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
};

const getInitials = (fullname = "") => {
  return fullname
    .split(" ")
    .filter(Boolean)
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const dropdownPosition = computed(() => {
  if (!triggerRect.value) return {};
  return {
    position: "fixed",
    top: `${triggerRect.value.bottom + 10}px`,
    right: `${window.innerWidth - triggerRect.value.right}px`,
    zIndex: 1001,
  };
});

const toggleDropdown = () => {
  dropdownOpen.value ? closeDropdown() : openDropdown();
};

const openDropdown = () => {
  const trigger = document.querySelector(".profile-trigger");
  if (trigger) triggerRect.value = trigger.getBoundingClientRect();
  dropdownOpen.value = true;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

const openLogoutModal = () => {
  showLogoutModal.value = true;
  closeDropdown();
};

const closeLogoutModal = () => {
  if (!isLoggingOut.value) showLogoutModal.value = false;
};

const handleNavigation = (e) => {
  const href = e.currentTarget?.dataset?.route;
  if (href) router.push(href);
  closeDropdown();
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

const handleClickOutside = (e) => {
  const trigger = document.querySelector(".profile-trigger");
  const menu = document.querySelector(".dropdown-menu-wrapper");

  if (!dropdownOpen.value) return;

  const clickedTrigger = trigger && trigger.contains(e.target);
  const clickedMenu = menu && menu.contains(e.target);

  if (!clickedTrigger && !clickedMenu) closeDropdown();
};

onMounted(() => {
  fetchProfileData();
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css");

body:has(.modal-backdrop) .dropdown-menu-wrapper {
  pointer-events: none;
  opacity: 0.4;
}

.profile-dropdown-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 28px;
  border-left: 1px solid #eef2f7;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 14px;
  transition: background 0.2s ease;
}

.profile-trigger:hover {
  background: #f4f8f7;
}

.user-details {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.user-display-name {
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.1;
}

.user-display-role {
  font-size: 12px;
  color: #64748b;
  margin: 0;
  margin-top: 2px;
}

.user-avatar-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-chevron {
  color: #94a3b8;
  transition: transform 0.2s ease;
  margin-left: 2px;
}

.chevron-open {
  transform: rotate(180deg);
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.dropdown-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.dropdown-menu-wrapper {
  z-index: 1001;
}

.dropdown-card {
  width: 280px;
  padding: 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow:
    0 18px 55px rgba(15, 23, 42, 0.14),
    0 6px 18px rgba(15, 23, 42, 0.08);
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 14px;
  background: linear-gradient(180deg, #f8fafc, #f1f5f9);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.header-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  color: white;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.header-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.header-name {
  font-size: 14px;
  font-weight: 800;
  margin: 0;
  color: #0f172a;
  line-height: 1.1;
}

.header-role {
  font-size: 12px;
  color: #64748b;
  margin-top: 3px;
}

.dropdown-actions {
  list-style: none;
  margin: 10px 0;
  padding: 0;
}

.dropdown-action {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

.dropdown-action i {
  font-size: 16px;
  color: #0d9488;
}

.dropdown-action:hover {
  background: rgba(13, 148, 136, 0.08);
  transform: translateX(2px);
}

.dropdown-footer {
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.logout-btn {
  width: 100%;
  padding: 11px;
  border-radius: 14px;
  border: 1px solid rgba(239, 68, 68, 0.22);
  background: linear-gradient(180deg, #fee2e2, #fecaca);
  color: #b91c1c;
  font-weight: 800;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(239, 68, 68, 0.18);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
}

.dropdown-slide-enter-active,
.dropdown-slide-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.dropdown-slide-enter-from,
.dropdown-slide-leave-to {
  transform: translateY(-6px);
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000 !important;
  padding: 18px;
}

.modal-card {
  width: 90%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 80px rgba(15, 23, 42, 0.28);
  border: 1px solid rgba(15, 23, 42, 0.08);
  overflow: hidden;
  z-index: 3001 !important;
  position: relative;
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
  letter-spacing: -0.2px;
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
    background 0.2s ease,
    color 0.2s ease;
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
  min-width: auto;
  height: 48px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #ffffff;
  color: #0f172a;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}

.btn-confirm-logout {
  width: 140px;
  min-width: auto;
  height: 48px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #ffffff;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
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

@media (max-width: 575px) {
  .modal-card {
    width: 100%;
  }
  .user-display-name{
    display: none;
  }
  .user-display-role{
    display: none;
  }
}
</style>
