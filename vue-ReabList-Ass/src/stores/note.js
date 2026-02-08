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
  const meta = ref({});


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

const fetchAllNotes = async () => {
  loading.value = true;
  try {
    console.log("🚀 fetchAllNotes CALLED");

    const res = await api.get("/notes");
    console.log("📦 RAW API RESPONSE:", res.data);

    const payload = res.data?.data || res.data;
    console.log("📦 PAYLOAD:", payload);

    // ✅ handle paginated response
    meta.value = payload.meta || {};

    const list = Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload?.notes)
      ? payload.notes
      : Array.isArray(payload)
      ? payload
      : [];

    console.log("✅ FINAL NOTES LIST:", list);

    notes.value = list;
  } catch (err) {
    console.error("❌ fetchAllNotes failed:", err);
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