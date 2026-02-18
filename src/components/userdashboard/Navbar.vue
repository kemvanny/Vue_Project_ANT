<template>
  <nav class="reab-navbar">
    <div class="navbar-container">
      <!-- Hamburger — mobile only ───────────────────────────────── -->
      <button
        class="hamburger-btn"
        @click="toggleSidebar"
        aria-label="Toggle sidebar"
      >
        <span class="hamburger-line" :class="{ open: isSidebarOpen }"></span>
        <span class="hamburger-line" :class="{ open: isSidebarOpen }"></span>
        <span class="hamburger-line" :class="{ open: isSidebarOpen }"></span>
      </button>

      <!-- Search ─ inline on desktop, overlay on mobile ─────────── -->
      <div class="search-area" :class="{ 'search-expanded': mobileSearchOpen }">
        <div class="search-box">
          <span class="icon">
            <span v-if="noteStore.loading" class="spinner"></span>
            <Search v-else :size="18" />
          </span>
          <input
            ref="searchInputRef"
            v-model="q"
            class="search-input"
            type="text"
            placeholder="ស្វែងរកតាមរយ:ចំណងជើង..."
            @focus="openDropdown"
          />
          <button
            v-if="mobileSearchOpen"
            class="search-close-btn"
            @click.stop="closeMobileSearch"
            aria-label="Close search"
          >
            <X :size="15" />
          </button>
        </div>

        <div v-if="showResults && q" class="results-dropdown">
          <div v-if="noteStore.searchResults.length">
            <div
              v-for="item in noteStore.searchResults"
              :key="item.id"
              class="result-item"
              @click="goToDetail(item.id)"
            >
              <div class="result-icon">
                <i class="bi bi-search fw-semibold"></i>
              </div>
              <p class="fw-semibold mb-0">{{ item.title }}</p>
            </div>
          </div>
          <div v-else class="no-results fw-semibold">
            រកមិនឃើញលទ្ធផលសម្រាប់ "{{ q }}"
          </div>
        </div>
      </div>

      <div v-if="showResults" class="overlay" @click="closeDropdown"></div>

      <!-- Actions ────────────────────────────────────────────────── -->
      <div class="actions-area">
        <button
          class="mobile-search-btn"
          :class="{ hidden: mobileSearchOpen }"
          @click="openMobileSearch"
          aria-label="Open search"
        >
          <Search :size="18" />
        </button>
        <ProfileDropdown />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useNoteStore } from "@/stores/note.js";
import { Search, X } from "lucide-vue-next";
import ProfileDropdown from "./ProfileDropdown.vue";
import { useSidebar } from "@/composable/Usesidebar";

const router = useRouter();
const noteStore = useNoteStore();

// ── Sidebar ──────────────────────────────────────────────────────
const { isSidebarOpen, toggleSidebar } = useSidebar();

// ── Search ───────────────────────────────────────────────────────
const q = ref("");
const showResults = ref(false);
const mobileSearchOpen = ref(false);
const searchInputRef = ref(null);
let timeout = null;

onMounted(async () => {
  if (noteStore.all.length === 0) await noteStore.fetchNotes();
});

const openDropdown = () => {
  if (q.value.trim()) showResults.value = true;
};
const closeDropdown = () => {
  showResults.value = false;
};

const openMobileSearch = async () => {
  mobileSearchOpen.value = true;
  await nextTick();
  searchInputRef.value?.focus();
};

const closeMobileSearch = () => {
  mobileSearchOpen.value = false;
  showResults.value = false;
  q.value = "";
  noteStore.clearSearch();
};

const goToDetail = (id) => {
  showResults.value = false;
  q.value = "";
  mobileSearchOpen.value = false;
  noteStore.clearSearch();
  router.push(`/dashboard/tasks/${id}`);
};

watch(q, (val) => {
  clearTimeout(timeout);
  if (!val.trim()) {
    noteStore.clearSearch();
    showResults.value = false;
    return;
  }
  timeout = setTimeout(() => {
    noteStore.searchNotes(val);
    showResults.value = true;
  }, 300);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.reab-navbar {
  font-family: "Inter", sans-serif;
  height: 65px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  padding: 0 28px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 900;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 14px;
}

/* Hamburger — hidden on desktop, shown on mobile ─────────────── */
.hamburger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 7px 6px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  transition: background 0.2s;
}
.hamburger-btn:hover {
  background: #f1f5f9;
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 2.5px;
  background: #475569;
  border-radius: 3px;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}
.hamburger-line:nth-child(1).open {
  transform: translateY(7.5px) rotate(45deg);
}
.hamburger-line:nth-child(2).open {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger-line:nth-child(3).open {
  transform: translateY(-7.5px) rotate(-45deg);
}

/* Search ─────────────────────────────────────────────────────── */
.search-area {
  position: relative;
  flex: 1;
  max-width: 500px;
  z-index: 901;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  padding: 9px 18px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background 0.2s;
}
.search-box:focus-within {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
  background: #fff;
}

.icon {
  color: #94a3b8;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-weight: 500;
  color: #1e293b;
  font-size: 14px;
}
.search-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.search-close-btn {
  background: #f1f5f9;
  border: none;
  color: #64748b;
  cursor: pointer;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.15s,
    color 0.15s;
}
.search-close-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.results-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.12);
  max-height: 350px;
  overflow-y: auto;
  z-index: 1002;
}
.result-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 18px;
  cursor: pointer;
  border-bottom: 1px solid #f8fafc;
  transition: background 0.15s;
}
.result-item:last-child {
  border-bottom: none;
}
.result-item:hover {
  background: #f1f5f9;
}
.result-icon {
  color: #94a3b8;
  font-size: 13px;
}
.no-results {
  width: 100%;
  padding: 20px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
}

.actions-area {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.mobile-search-btn {
  display: none;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
}
.mobile-search-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}
.mobile-search-btn.hidden {
  opacity: 0;
  pointer-events: none;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.01);
  z-index: 899;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #e2e8f0;
  border-top-color: #0d9488;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Mobile ≤ 900px ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .reab-navbar {
    padding: 0 16px;
    height: 60px;
    z-index: 950;
  }
  .navbar-container {
    gap: 10px;
  }
  .hamburger-btn {
    display: flex;
  }

  .search-area {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1050;
    max-width: 100%;
    padding: 10px 14px;
    background: #fff;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    animation: slideDown 0.2s ease;
  }
  .search-area.search-expanded {
    display: block;
  }
  .search-box {
    border-radius: 14px;
    padding: 10px 16px;
  }
  .search-input {
    font-size: 15px;
  }

  .results-dropdown {
    position: fixed;
    top: 62px;
    left: 10px;
    right: 10px;
    border-radius: 14px;
    max-height: 260px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  .overlay {
    background: rgba(0, 0, 0, 0.2);
    z-index: 1040;
  }
  .mobile-search-btn {
    display: flex;
  }
}

@media (max-width: 575px) {
  .reab-navbar {
    padding: 0 12px;
    height: 56px;
  }
  .hamburger-line {
    width: 20px;
  }
  .mobile-search-btn {
    width: 34px;
    height: 34px;
    align-items: center;
  }
  .search-area {
    padding: 8px 12px;
  }
  .results-dropdown {
    top: 57px;
    left: 8px;
    right: 8px;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
