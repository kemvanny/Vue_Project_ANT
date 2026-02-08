import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/API/api";

export const useTaskStore = defineStore("taskStore", () => {
  // --- STATE ---
  const tasks = ref([]);
  const searchResults = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // --- ACTIONS ---

  // មុខងារទាញទិន្នន័យពី API
  const fetchTasks = async () => {
    loading.value = true;
    error.value = null;
    try {
      // ផ្អែកតាមរូបភាព Postman អ្នកគួរដាក់ params ខ្លះដើម្បីឱ្យ API បោះទិន្នន័យមកគ្រប់
      const res = await api.get(
        "/notes?_page=1&_per_page=20&search=0&sortBy=updatedAt&sortDir=DESC",
        {
          params: {
            _per_page: 1000, // ទាញយកមកឱ្យច្រើនដើម្បីងាយស្រួល Search ក្នុង Store
            sortBy: "updatedAt",
            sortDir: "DESC",
          },
        },
      );

      // ឆែកមើលទិន្នន័យក្នុង res.data.items ដូចដែលអ្នកបានកំណត់
      const data = res.data.items;
      console.log(data);
      

      if (Array.isArray(data)) {
        tasks.value = data;
      } else {
        tasks.value = [];
      }

      console.log("✅ ទិន្នន័យក្នុង Store:", tasks.value.length);
    } catch (err) {
      error.value = "មិនអាចទាញទិន្នន័យបានទេ";
      console.error("❌ API Error:", err);
    } finally {
      loading.value = false;
    }
  };

  // មុខងារ Search
  const searchTasks = (keyword) => {
    if (!keyword || keyword.trim() === "") {
      searchResults.value = [];
      return;
    }

    const q = keyword.toLowerCase().trim();

    // ចម្រាញ់រកទិន្នន័យ (Filter) ចេញពី tasks array
    searchResults.value = tasks.value.filter((task) => {
      const title = task.title ? String(task.title).toLowerCase() : "";
      return title.includes(q);
    });

    console.log(`🔍 ស្វែងរក "${q}" ឃើញ: ${searchResults.value.length} លទ្ធផល`);
  };

  // មុខងារសម្អាតការ Search
  const clearSearch = () => {
    searchResults.value = [];
  };

  // បោះ variables និង functions ចេញទៅក្រៅដើម្បីអាចប្រើបានក្នុង Components
  return {
    tasks,
    searchResults,
    loading,
    error,
    fetchTasks,
    searchTasks,
    clearSearch,
  };
});
