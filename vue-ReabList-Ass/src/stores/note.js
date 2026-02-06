import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/API/api";

// --- HELPERS (KH MER CONVERSION) ---
const toKhPriority = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "HIGH" || v === "ខ្ពស់") return "ខ្ពស់";
  if (v === "MEDIUM" || v === "មធ្យម") return "មធ្យម";
  if (v === "LOW" || v === "ទាប") return "ទាប";
  return "មធ្យម";
};

const toKhCategory = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "PERSONAL" || v === "ផ្ទាល់ខ្លួន") return "ផ្ទាល់ខ្លួន";
  if (v === "WORK" || v === "ការងារ") return "ការងារ";
  if (v === "SCHOOL" || v === "STUDY" || v === "សិក្សា") return "សិក្សា";
  return "ទូទៅ";
};

// --- STORE DEFINITION ---
export const useNoteStore = defineStore("noteStore", () => {
  // --- STATE ---
  const notes = ref([]);
  const selectedNote = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const modalOpen = ref(false);
  const modalType = ref("view"); // "view" | "edit"
  const searchResults = ref([]); 

  // --- GETTERS ---
  const all = computed(() => notes.value);
  const pending = computed(() => notes.value.filter((n) => !n.isCompleted));
  const completed = computed(() => notes.value.filter((n) => !!n.isCompleted));

  // --- ACTIONS ---

  // Get a single note by ID
  const fetchNoteById = async (id) => {
    try {
      const res = await api.get(`/notes/${id}`);
      return res.data?.data ?? res.data;
    } catch (err) {
      console.error("FetchById Error:", err);
      return null;
    }
  };

  // Helper to fetch content for list view (if API doesn't provide it in list)
  const fetchNoteContent = async (id) => {
    try {
      const res = await api.get(`/notes/${id}`);
      const detail = res.data?.data ?? res.data;
      return detail?.content ?? detail?.notes ?? "";
    } catch {
      return "";
    }
  };

  // Fetch all notes and enrich with content/Khmer translations
  const fetchAllNotes = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get("/notes");
      const payload = res.data?.data || res.data;

      // Handle different API response structures
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.items)
        ? payload.items
        : [];

      // Enrich the data so the UI has everything it needs
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
      error.value = err?.response?.data?.message || "Error fetching notes";
    } finally {
      loading.value = false;
    }
  };

  // Search Logic
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

  const clearSearch = () => {
    searchResults.value = [];
  };

  // Open note for Modal
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
    selectedNote.value = null;
  };

  // --- RETURN ---
  // Ensure all these are returned so Components can access them
  return {
    notes,
    selectedNote,
    loading,
    error,
    modalOpen,
    modalType,
    searchResults,
    all,
    pending,
    completed,
    fetchNoteById,
    fetchAllNotes,
    searchNotes,
    clearSearch,
    openNote,
    closeModal,
  };
});