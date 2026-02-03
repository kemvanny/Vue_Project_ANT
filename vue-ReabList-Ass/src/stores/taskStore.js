import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  getters: {
    totalCount: (state) => state.tasks.length,

    doneCount: (state) =>
      state.tasks.filter((t) => t.isCompleted === true).length,

    inProgressCount: (state) =>
      state.tasks.filter((t) => t.isCompleted === false).length,
  },

  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        const res = await axios.get(
          "https://ant-g6-todolistit.linkpc.net/api/v1/tasks"
        );

        // adjust response shape
        const data = res.data?.data ?? res.data;
        this.tasks = Array.isArray(data) ? data : [];
      } catch (err) {
        console.log("fetchTasks error:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});
