import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/API/api";

// --- HELPERS (ទុកនៅខាងក្រៅ Store) ---
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

// --- STORE DEFINITION ---
export const useNoteStore = defineStore("noteStore", () => {
  // ✅ STATE (ប្រើ ref)
  const notes = ref([]);
  const selectedNote = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const modalOpen = ref(false);
  const modalType = ref("view"); // "view" | "edit"
  const searchResults = ref([]); 

  // ✅ GETTERS (ប្រើ computed) 
  const all = computed(() => notes.value);
  const pending = computed(() => notes.value.filter((n) => !n.isCompleted));
  const completed = computed(() => notes.value.filter((n) => !!n.isCompleted));

  // ✅ ACTIONS (ប្រើ function)
  
  const fetchNoteById = async (id) => {
    const res = await api.get(`/notes/${id}`);
    return res.data?.data ?? res.data;
  };

  const fetchNoteContent = async (id) => {
    try {
      const res = await api.get(`/notes/${id}`);
      const detail = res.data?.data ?? res.data;
      return detail?.content ?? detail?.notes ?? "";
    } catch {
      return "";
    }
  };

  const fetchAllNotes = async () => {
    loading.value = true;
    error.value = null;

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

      // ប្រើ Promise.all ដូចដើមដើម្បីទាញយក Content បន្ថែម
      const enriched = await Promise.all(
        list.map(async (t) => {
          const content = await fetchNoteContent(t.id);
          return {
            ...t,
            content,
            notes: content,
            priority: toKhPriority(t.priority),
            category: toKhCategory(t.category),
          };
        })
      );

      notes.value = enriched;
    } catch (err) {
      error.value = err?.response?.data?.message || err.message;
    } finally {
      loading.value = false;
    }
  };

  // ✅ LOGIC សម្រាប់ SEARCH
  const searchNotes = (keyword) => {
    if (!keyword || keyword.trim() === "") {
      searchResults.value = [];
      return;
    }
    const q = keyword.toLowerCase().trim();
    searchResults.value = notes.value.filter((n) => {
      const title = n.title ? String(n.title).toLowerCase() : "";
      return title.includes(q);
    });
  };

  const clearSearch = () => { searchResults.value = []; };
  ///=============================

  const openNote = async (id, type = "view") => {
    loading.value = true;
    modalType.value = type;

    try {
      const detail = await fetchNoteById(id);
      const text = detail?.content ?? detail?.notes ?? "";

      selectedNote.value = {
        ...detail,
        content: text,
        notes: text,
        priority: toKhPriority(detail?.priority),
        category: toKhCategory(detail?.category),
      };

      modalOpen.value = true;
    } catch (err) {
      console.error("Open note failed:", err);
    } finally {
      loading.value = false;
    }
  };

  const closeModal = () => {
    modalOpen.value = false;
    modalType.value = "view";
  };

  // ✅ RETURN ទាំងអស់ដើម្បីអាចយកទៅប្រើក្នុង Components
  return {
    // State
    notes,
    selectedNote,
    loading,
    error,
    modalOpen,
    modalType,
    // Getters
    all,
    pending,
    completed,
    searchResults, 
    // Actions
    fetchNoteById,
    fetchNoteContent,
    fetchAllNotes,
    openNote,
    closeModal,
    searchNotes,
    clearSearch,
    
  };
});