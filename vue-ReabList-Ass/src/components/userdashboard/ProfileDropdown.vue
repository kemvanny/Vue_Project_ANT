<template>
  <div class="profile-dropdown-wrapper" v-if="profileData">
    <button
      class="profile-trigger"
      @click="toggleDropdown"
      :aria-expanded="dropdownOpen">
      <div class="user-details">
        <p class="user-display-name">{{ profileData.fullname }}</p>
        <p class="user-display-role">{{ profileData.role.name }}</p>
      </div>
      <div class="user-avatar-circle">
        <img
          v-if="profileData.avatar"
          :src="profileData.avatar"
          :alt="profileData.fullname"
          class="avatar-image" />
        <span v-else>{{ getInitials(profileData.fullname) }}</span>
      </div>
      <ChevronDown
        :size="18"
        class="dropdown-chevron"
        stroke-width="2.5"
        :class="{ 'chevron-open': dropdownOpen }" />
    </button>

    <Teleport to="body">
      <Transition
        name="dropdown-fade"
        @enter="onDropdownEnter"
        @leave="onDropdownLeave">
        <div
          v-show="dropdownOpen"
          class="dropdown-backdrop"
          @click="closeDropdown"></div>
      </Transition>

      <Transition name="dropdown-slide">
        <div
          v-show="dropdownOpen"
          class="dropdown-menu-wrapper"
          :style="dropdownPosition"
          @click.stop>
          <ul class="dropdown-list">
            <li class="dropdown-item">
              <a
                href="#"
                class="dropdown-link"
                data-route="/profile"
                @click="handleNavigation"
                >Profile Settings</a
              >
            </li>
            <li class="dropdown-item">
              <a
                href="#"
                class="dropdown-link"
                data-route="/profile/setting"
                @click="handleNavigation"
                >Settings</a
              >
            </li>
            <li class="dropdown-divider"></li>
            <li class="dropdown-item logout-item">
              <button class="btn-logout" @click="showLogoutModal = true">
                <i class="fas fa-sign-out-alt"></i> ចាកចេញ
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>

    <!-- Logout Confirmation Modal -->
    <Transition name="fade">
      <div
        v-if="showLogoutModal"
        class="modal-backdrop"
        @click="showLogoutModal = false">
        <div class="modal-card" @click.stop>
          <div class="modal-head">
            <h3>ចាកចេញ?</h3>
            <button @click="showLogoutModal = false" class="close-btn">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p>តើអ្នកប្រាកដថាចង់ចាកចេញពីគណនីរបស់អ្នកដែរឬទេ?</p>
          </div>
          <div class="modal-foot">
            <button class="btn-cancel" @click="showLogoutModal = false">
              បោះបង់
            </button>
            <button class="btn-confirm-logout" @click="handleLogout">
              បាទ/ចាស! ចាកចេញ
            </button>
          </div>
        </div>
      </div>
    </Transition>
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
import { useAuthStore } from "@/stores/authentication";

const router = useRouter();
const authStore = useAuthStore();

const profileData = ref(null);
const dropdownOpen = ref(false);
const showLogoutModal = ref(false);
const triggerRect = ref(null);
const backdropElement = ref(null);

const fetchProfileData = async () => {
  try {
    const response = await api.get("/auth/profile");
    if (response.data.result) {
      profileData.value = response.data.data;
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
};

const getInitials = (fullname) => {
  return fullname
    .split(" ")
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
  };
});

const toggleDropdown = () => {
  if (dropdownOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

const openDropdown = () => {
  const trigger = document.querySelector(".profile-trigger");
  if (trigger) {
    triggerRect.value = trigger.getBoundingClientRect();
  }
  dropdownOpen.value = true;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

const handleNavigation = (e) => {
  e.preventDefault();
  const href = e.target.getAttribute("data-route");
  if (href) {
    router.push(href);
  }
  closeDropdown();
};

const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    console.log("Logout successful");
    authStore.logout();
    showLogoutModal.value = false;
    closeDropdown();
    router.push("/login");
  } catch (err) {
    console.error("Logout error:", err);
    authStore.logout();
    showLogoutModal.value = false;
    closeDropdown();
    router.push("/login");
  }
};

const handleClickOutside = (e) => {
  const wrapper = document.querySelector(".profile-dropdown-wrapper");
  if (
    dropdownOpen.value &&
    wrapper &&
    !wrapper.contains(e.target) &&
    e.target.closest(".dropdown-menu-wrapper") === null
  ) {
    closeDropdown();
  }
};

const onDropdownEnter = (el) => {
  el.style.opacity = "0";
  el.offsetHeight;
  el.style.transition = "opacity 0.2s ease";
  el.style.opacity = "1";
};

const onDropdownLeave = (el) => {
  el.style.opacity = "1";
  el.style.transition = "opacity 0.2s ease";
  el.style.opacity = "0";
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
.profile-dropdown-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 28px;
  border-left: 1px solid #f1f5f9;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  border-radius: 8px;
  padding: 8px 12px;
}

.profile-trigger:hover {
  background-color: #f8fafc;
}

.user-details {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.user-display-name {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.user-display-role {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  margin-top: 2px;
}

.user-avatar-circle {
  width: 42px;
  height: 42px;
  background: #0d9488;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(13, 148, 136, 0.25);
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.dropdown-chevron {
  color: #94a3b8;
  margin-left: 4px;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.chevron-open {
  transform: rotate(180deg);
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

/* Dropdown Menu */
.dropdown-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.dropdown-menu-wrapper {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.12);
  min-width: 180px;
  z-index: 1001;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 6px 0;
}

.dropdown-item {
  margin: 0;
  padding: 0;
}

.dropdown-link {
  display: block;
  padding: 10px 14px;
  color: #1e293b;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.dropdown-link:hover {
  background-color: #f1f5f9;
  color: #0d9488;
}

.dropdown-link.logout {
  color: #dc2626;
}

.dropdown-link.logout:hover {
  background-color: #fee2e2;
}

.dropdown-divider {
  height: 1px;
  background-color: #e2e8f0;
  margin: 6px 0;
}

.logout-item {
  padding: 6px 8px;
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
  font-family: "Inter", "Kantumruy Pro", sans-serif;
}

.btn-logout:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-logout:active {
  transform: translateY(0);
}

.btn-logout i {
  font-size: 14px;
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-card {
  background: white;
  width: 90%;
  max-width: 400px;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1.5px solid #e2e8f0;
}

.modal-head h3 {
  margin: 0;
  color: #991b1b;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #cbd5e1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #64748b;
}

.modal-body {
  margin-bottom: 24px;
  color: #475569;
  font-size: 14px;
  line-height: 1.6;
}

.modal-body p {
  margin: 0;
}

.modal-foot {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.btn-cancel {
  flex: 1;
  padding: 12px 24px;
  background: transparent;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  color: #475569;
  transition: all 0.3s ease;
  font-family: "Inter", "Kantumruy Pro", sans-serif;
}

.btn-cancel:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.btn-confirm-logout {
  flex: 1;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
  font-family: "Inter", "Kantumruy Pro", sans-serif;
}

.btn-confirm-logout:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
}

.btn-confirm-logout:active {
  transform: translateY(0);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transitions */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
}

.dropdown-slide-enter-active,
.dropdown-slide-leave-active {
  transition: all 0.2s ease;
}

.dropdown-slide-enter-from,
.dropdown-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
