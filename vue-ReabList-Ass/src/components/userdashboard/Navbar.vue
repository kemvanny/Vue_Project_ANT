<template>
  <nav class="reab-navbar">
    <div class="navbar-container">
      <div class="search-area">
        <div class="search-input-group">
          <Search :size="19" class="search-icon" stroke-width="2" />
          <input
            type="text"
            placeholder="Search tasks, descriptions, or tags..."
            class="header-search"
          />
        </div>
      </div>

      <div class="actions-area">
        <button class="mode-toggle">
          <Moon :size="20" stroke-width="2" />
        </button>

        <ProfileDropdown />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Search, Moon } from "lucide-vue-next";
import ProfileDropdown from "./ProfileDropdown.vue";
</script>

<style scoped>
/* Importing a clean font similar to your reference */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.reab-navbar {
  font-family: "Inter", sans-serif;
  height: 85px;
  background-color: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  overflow: visible;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: visible;
}

/* --- Search Section --- */
.search-input-group {
  display: flex;
  align-items: center;
  background-color: #f8fafc;
  padding: 12px 20px;
  border-radius: 16px;
  width: 420px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.search-input-group:focus-within {
  background-color: #ffffff;
  border-color: #0d9488;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.05);
}

.search-icon {
  color: #94a3b8;
  margin-right: 14px;
}

.header-search {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  color: #334155; /* Soft black/gray */
}

.header-search::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

/* --- User Section --- */
.actions-area {
  display: flex;
  align-items: center;
  gap: 30px;
  overflow: visible;
  position: relative;
}

.mode-toggle {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-toggle:hover {
  background: #f8fafc;
  color: #0f172a;
}

/* Profile Dropdown Container */
.profile-dropdown-container {
  position: relative;
  z-index: 1001;
}

.user-profile-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 28px;
  border-left: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-profile-wrapper:hover {
  background-color: #f8fafc;
  border-radius: 8px;
  padding-left: 20px;
  padding-right: 8px;
  margin-left: 8px;
}

.user-details {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.user-display-name {
  margin: 0;
  font-size: 15px;
  font-weight: 700; /* Bold but not "heavy" */
  color: #1e293b; /* Deep Slate Black */
  line-height: 1.2;
}

.user-display-role {
  margin: 0;
  font-size: 16px;
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
}
</style>
