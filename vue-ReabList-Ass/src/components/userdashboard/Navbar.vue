<template>
  <nav class="reab-navbar">
    <div class="navbar-container">
      <!-- Left -->
      <div class="left-area">
        <button class="hamburger" type="button" @click="toggleSidebar">
          <i class="fas fa-bars"></i>
        </button>

        <div class="search-box">
          <span class="icon">
            <span v-if="noteStore.loading" class="spinner"></span>
            <Search v-else :size="18" />
          </span>

          <input
            v-model="q"
            class="search-input"
            type="text"
            placeholder="ស្វែងរកតាមរយៈចំណងជើង..."
            @focus="openDropdown"
          />
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
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="result-info">
                <p class="result-title">{{ item.title }}</p>
                <p class="result-note">
                  {{ item.content || "គ្មានការពិពណ៌នា" }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="no-results">
            រកមិនឃើញលទ្ធផលសម្រាប់ "{{ q }}"
          </div>
        </div>
      </div>

      <!-- Right -->
      <div class="actions-area">
        <button class="mode-toggle">
          <Moon :size="18" />
        </button>
        <ProfileDropdown />
      </div>
    </div>

    <div v-if="showResults" class="overlay" @click="closeDropdown" />
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { useNoteStore } from "@/stores/note";
import { Search, Moon } from "lucide-vue-next";
import ProfileDropdown from "./ProfileDropdown.vue";

const router = useRouter();
const noteStore = useNoteStore();

const sidebar = inject("sidebar");
const toggleSidebar = () => sidebar?.toggleSidebar();

const q = ref("");
const showResults = ref(false);
let timeout = null;

onMounted(async () => {
  if (!noteStore.all.length) {
    await noteStore.fetchAllNotes();
  }
});

const openDropdown = () => {
  if (q.value.trim()) showResults.value = true;
};

const closeDropdown = () => {
  showResults.value = false;
};

const goToDetail = (id) => {
  showResults.value = false;
  q.value = "";
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
/* Navbar */
.reab-navbar {
  position: fixed;
  top: 0;
  left: 280px;
  width: calc(100% - 280px);
  height: 85px;
  background: #fff;
  border-bottom: 1px solid #f1f5f9;
  z-index: 2000;
}

.navbar-container {
  height: 100%;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Left */
.left-area {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  position: relative;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

/* Search */
.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 420px;
  width: 100%;
  padding: 10px 16px;
  border-radius: 999px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
}

.results-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  max-height: 350px;
  overflow-y: auto;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  z-index: 3000;
}

/* Right */
.actions-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mode-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  cursor: pointer;
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1500;
}

/* Spinner */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #e2e8f0;
  border-top-color: #0d9488;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Tablet & Mobile */
@media (max-width: 900px) {
  .reab-navbar {
    left: 0;
    width: 100%;
  }

  .hamburger {
    display: inline-flex;
  }
}

/* Phone */
@media (max-width: 640px) {
  .reab-navbar {
    height: 64px;
  }

  .navbar-container {
    padding: 0 12px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 8px;
  }

  .search-box {
    padding: 8px 12px;
  }

  .search-input {
    width: 0;
    opacity: 0;
    pointer-events: none;
    transition: 0.25s ease;
  }

  .search-box:focus-within .search-input {
    width: 100%;
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
