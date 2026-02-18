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
  const fetchTasks = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get(
        "/notes?_page=1&_per_page=10&search=0&sortBy=updatedAt&sortDir=DESC",
        {
          params: {
            _per_page: 1000, 
            sortBy: "updatedAt",
            sortDir: "DESC",
          },
        },
      );

      const data = res.data.items;
      
      if (Array.isArray(data)) {
        tasks.value = data;
      } else {
        tasks.value = [];
      }

    } catch (err) {
      error.value = "មិនអាចទាញទិន្នន័យបានទេ";
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

    searchResults.value = tasks.value.filter((task) => {
      const title = task.title ? String(task.title).toLowerCase() : "";
      return title.includes(q);
    });

  };

  const clearSearch = () => {
    searchResults.value = [];
  };

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
