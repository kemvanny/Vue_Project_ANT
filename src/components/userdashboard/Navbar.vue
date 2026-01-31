<template>
  <nav class="reab-navbar">
    <div class="navbar-container">
      <div class="search-area">
     <div class="search-box">
        <span class="icon">🔎</span>
        <input
          v-model.trim="q"
          class="search-input"
          type="text"
          placeholder="ស្វែងរក (ចំណងជើង / កំណត់ចំណាំ)..."
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
import { Search, Moon, ChevronDown } from 'lucide-vue-next';
import ProfileDropdown from "./ProfileDropdown.vue";
</script>

<style scoped>
/* Importing a clean font similar to your reference */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.reab-navbar {
  font-family: 'Inter', sans-serif;
  height: 85px;
  background-color: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}


/* --- Search Section --- */

.search-box{
  flex:1;
  min-width:480px;
  display:flex;
  align-items:center;
  gap:10px;
  background:#f8fafc;
  border:2px solid transparent;
  border-radius:18px;
  padding:12px 14px;
  transition:.2s;
}
.search-box:focus-within{
  border-color:#0d9488;
  background:#fff;
  box-shadow:0 14px 28px -18px rgba(13,148,136,.5);
}
.search-input{
  width:100%;
  border:none;
  outline:none;
  background:transparent;
  font-weight:800;
  color:#0f172a;
}
.icon{ opacity:.75; }

.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{
  border:none;
  border-radius:999px;
  padding:10px 14px;
  background:#f1f5f9;
  font-weight:900;
  color:#334155;
  transition:.18s;
}
.chip:hover{ transform:translateY(-1px); }
.chip.active{
  background:linear-gradient(135deg,#0d9488 0%,#06b6d4 100%);
  color:#fff;
  box-shadow:0 14px 28px -18px rgba(13,148,136,.5);
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

.user-profile-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 28px;
  border-left: 1px solid #f1f5f9;
  cursor: pointer;
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
}

.dropdown-chevron {
  color: #94a3b8;
  margin-left: 4px;
}
</style>