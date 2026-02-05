<template>
  <nav class="reab-navbar">
    <div class="navbar-container">
      <div class="search-area">
        <div class="search-box">
          <span class="icon">
            <span v-if="noteStore.loading" class="spinner"></span>
            <Search v-else :size="18" />
          </span>

          <input
            v-model="q"
            class="search-input"
            type="text"
            placeholder="ស្វែងរកតាមរយ:ចំណងជើង..."
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
              <div class="result-icon">📝</div>
              <div class="result-info">
                <p class="result-title">{{ item.title }}</p>
                <p class="result-note">
                  {{ item.content || "គ្មានការពិពណ៌នា" }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="no-results">រកមិនឃើញលទ្ធផលសម្រាប់ "{{ q }}"</div>
        </div>
      </div>

      <div v-if="showResults" class="overlay" @click="closeDropdown"></div>

      <div class="actions-area">
        <button class="mode-toggle">
          <Moon :size="20" />
        </button>
        <ProfileDropdown />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Search, Moon } from "lucide-vue-next";
import ProfileDropdown from "./ProfileDropdown.vue";
import { useNoteStore } from "@/stores/note";

const router = useRouter();
const noteStore = useNoteStore();

const q = ref("");
const showResults = ref(false);
let timeout = null;

onMounted(async () => {
  // ទាញទិន្នន័យទុកក្នុង Store ពេល Component ចាប់ផ្តើម
  if (noteStore.all.length === 0) {
    await noteStore.fetchAllNotes();
  }
});

const openDropdown = () => {
  if (q.value.trim()) {
    showResults.value = true;
  }
};

const closeDropdown = () => {
  showResults.value = false;
};

const goToDetail = (id) => {
  closeDropdown();
  q.value = "";
  router.push(`/dashboard/tasks/${id}`);
};

// Debounced Search Logic
watch(q, (newVal) => {
  clearTimeout(timeout);

  if (!newVal.trim()) {
    noteStore.clearSearch();
    showResults.value = false;
    return;
  }

  timeout = setTimeout(() => {
    noteStore.searchNotes(newVal);
    showResults.value = true;
  }, 300);
});
</script>

<style scoped>
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
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.search-area {
  position: relative;
  flex: 1;
  max-width: 500px;
  z-index: 1001; /* ធានាថាខ្ពស់ជាង Overlay */
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  padding: 10px 20px;
  transition: 0.2s;
}

.search-box:focus-within {
  border-color: #0d9488;
  background: #fff;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.08);
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-weight: 500;
  color: #1e293b;
  font-size: 15px;
}

.results-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1);
  max-height: 350px;
  overflow-y: auto;
  z-index: 1002; /* ខ្ពស់ជាងគេបង្អស់ */
}

.result-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  cursor: pointer;
  border-bottom: 1px solid #f8fafc;
}

.result-item:hover {
  background: #f1f5f9;
}

.result-icon {
  background: #f0fdfa;
  color: #0d9488;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 18px;
  flex-shrink: 0;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-title {
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-note {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no-results {
  padding: 24px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.01);
  z-index: 999; /* ទាបជាង Search Area */
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

.actions-area {
  display: flex;
  align-items: center;
  gap: 15px;
}

.mode-toggle {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
}
</style>