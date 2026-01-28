<template>
  <div class="profile-dropdown-wrapper" v-if="profileData">
    <button
      class="profile-trigger"
      @click="toggleDropdown"
      :aria-expanded="dropdownOpen"
    >
      <div class="user-details">
        <p class="user-display-name">{{ profileData.fullname }}</p>
        <p class="user-display-role">{{ profileData.role.name }}</p>
      </div>
      <div class="user-avatar-circle">
        <img
          v-if="profileData.avatar"
          :src="profileData.avatar"
          :alt="profileData.fullname"
          class="avatar-image"
        />
        <span v-else>{{ getInitials(profileData.fullname) }}</span>
      </div>
      <ChevronDown
        :size="18"
        class="dropdown-chevron"
        stroke-width="2.5"
        :class="{ 'chevron-open': dropdownOpen }"
      />
    </button>

    <Teleport to="body">
      <Transition
        name="dropdown-fade"
        @enter="onDropdownEnter"
        @leave="onDropdownLeave"
      >
        <div
          v-show="dropdownOpen"
          class="dropdown-backdrop"
          @click="closeDropdown"
        ></div>
      </Transition>

      <Transition name="dropdown-slide">
        <div
          v-show="dropdownOpen"
          class="dropdown-menu-wrapper"
          :style="dropdownPosition"
          @click.stop
        >
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
                data-route="/account"
                @click="handleNavigation"
                >Account</a
              >
            </li>
            <li class="dropdown-item">
              <a
                href="#"
                class="dropdown-link"
                data-route="/settings"
                @click="handleNavigation"
                >Settings</a
              >
            </li>
            <li class="dropdown-divider"></li>
            <li class="dropdown-item">
              <a href="#" class="dropdown-link logout" @click="handleLogout"
                >Logout</a
              >
            </li>
          </ul>
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
import { useAuthStore } from "@/stores/authentication";

const router = useRouter();
const authStore = useAuthStore();

const profileData = ref(null);
const dropdownOpen = ref(false);
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

const handleLogout = async (e) => {
  e.preventDefault();
  try {
    await api.post("/auth/logout");
    console.log("Logout successful");
    authStore.logout();
    router.push("/login");
  } catch (err) {
    console.error("Logout error:", err);
    authStore.logout();
    router.push("/login");
  } finally {
    closeDropdown();
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
