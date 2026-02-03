import { defineStore } from "pinia";
import api from "@/API/api";

// convert API enums to Khmer labels
const toKhPriority = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "HIGH" || val === "ខ្ពស់") return "ខ្ពស់";
  if (v === "MEDIUM" || val === "មធ្យម") return "មធ្យម";
  if (v === "LOW" || val === "ទាប") return "ទាប";
  return val || "មធ្យម";
};

const toKhCategory = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "PERSONAL" || val === "ផ្ទាល់ខ្លួន") return "ផ្ទាល់ខ្លួន";
  if (v === "WORK" || val === "ការងារ") return "ការងារ";
  if (v === "SCHOOL" || v === "STUDY" || val === "សិក្សា") return "សិក្សា";
  return val || "ទូទៅ";
};

export const useNoteStore = defineStore("noteStore", {
  state: () => ({
    notes: [],
    selectedNote: null,
    loading: false,
    error: null,

    // ✅ modal controller (fix click card not open)
    modalOpen: false,
    modalType: "view", // "view" | "edit"
  }),

  getters: {
    all: (s) => s.notes,
    pending: (s) => s.notes.filter((n) => !n.isCompleted),
    completed: (s) => s.notes.filter((n) => !!n.isCompleted),
  },

  actions: {
    async fetchNoteById(id) {
      const res = await api.get(`/notes/${id}`);
      return res.data?.data ?? res.data;
    },

    async fetchNoteContent(id) {
      try {
        const res = await api.get(`/notes/${id}`);
        const detail = res.data?.data ?? res.data;
        return detail?.content ?? detail?.notes ?? "";
      } catch {
        return "";
      }
    },

    async fetchAllNotes() {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get("/notes");
        const payload = res.data?.data;

        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.items)
          ? payload.items
          : [];

        const enriched = await Promise.all(
          list.map(async (t) => {
            const content = await this.fetchNoteContent(t.id);
            return {
              ...t,
              content,
              notes: content,
              priority: toKhPriority(t.priority),
              category: toKhCategory(t.category),
            };
          })
        );

        this.notes = enriched;
      } catch (err) {
        this.error = err?.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    // ✅ one function to open view/edit modal from any page
    async openNote(id, type = "view") {
      this.loading = true;
      this.modalType = type;

      try {
        const detail = await this.fetchNoteById(id);
        const text = detail?.content ?? detail?.notes ?? "";

        this.selectedNote = {
          ...detail,
          content: text,
          notes: text,
          priority: toKhPriority(detail?.priority),
          category: toKhCategory(detail?.category),
        };

        // 🔥 this is the key fix
        this.modalOpen = true;
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.modalOpen = false;
      this.modalType = "view";
    },
  },
});
