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

  const meta = ref({
    currentPage: 1,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

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

  const fetchNotes = async (page = 1, perPage = 9) => {
  loading.value = true;
  try {
    const res = await api.get("/notes", {
      params: {
        _page: page,
        _per_page: perPage,
        sortBy: "updatedAt",
        sortDir: "DESC",
      },
    });

    const payload = res.data?.data || res.data;

    meta.value = payload.meta || {
      currentPage: page,
      totalPages: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    };

    const list = Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload?.notes)
      ? payload.notes
      : Array.isArray(payload)
      ? payload
      : [];

    notes.value = list.map((n) => ({
      ...n,
      priority: toKhPriority(n.priority),
      category: toKhCategory(n.category),
    }));
  } catch (err) {
    console.error("fetchNotes failed:", err);
  } finally {
    loading.value = false;
  }
};

/// --- CREATE NOTE ---
const createNote = async (payload) => {
  loading.value = true;
  try {
    const res = await api.post("/notes", payload);
    const created = res.data?.data ?? res.data;

    const khNote = {
      ...created,
      priority: toKhPriority(created.priority),
      category: toKhCategory(created.category),
      justCreated: true,
    };

    notes.value.unshift(khNote);

    return khNote;
  } catch (err) {
    console.error("Create note failed:", err);
    throw err;
  } finally {
    loading.value = false;
  }
};


  // --- UPDATE NOTE ---
  const updateNote = async (id, payload) => {
    loading.value = true;
    try {
      const res = await api.put(`/notes/${id}`, payload);
      const updated = res.data?.data ?? res.data;

      const khNote = {
        ...updated,
        priority: toKhPriority(updated.priority),
        category: toKhCategory(updated.category),
      };

      // Update the note locally
      const index = notes.value.findIndex((n) => n.id === id);
      if (index !== -1) notes.value[index] = khNote;

      // If selected note is open in modal, update it too
      if (selectedNote.value?.id === id) selectedNote.value = khNote;

      return khNote;
    } catch (err) {
      console.error("Update note failed:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- DELETE NOTE ---
  const deleteNote = async (id) => {
    loading.value = true;
    try {
      await api.delete(`/notes/${id}`);
      // Remove locally
      notes.value = notes.value.filter((n) => n.id !== id);

      // Close modal if deleted note is open
      if (selectedNote.value?.id === id) closeModal();
    } catch (err) {
      console.error("Delete note failed:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- SEARCH ---
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

  // --- MODAL ---
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

  // --- MARK NOTE AS COMPLETED ---
// --- MARK NOTE AS COMPLETED (TOGGLE) ---
const toggleNoteCompleted = async (id) => {
  loading.value = true;
  try {
    // Call your toggle endpoint
    const res = await api.put(`/notes/${id}/toggle-complete`);
    const updated = res.data?.data ?? res.data;

    // Update locally
    const index = notes.value.findIndex((n) => n.id === id);
    if (index !== -1) notes.value[index] = {
      ...updated,
      priority: toKhPriority(updated.priority),
      category: toKhCategory(updated.category),
    };

    // Update selectedNote if open in modal
    if (selectedNote.value?.id === id) {
      selectedNote.value = {
        ...updated,
        priority: toKhPriority(updated.priority),
        category: toKhCategory(updated.category),
      };
    }

    return updated;
  } catch (err) {
    console.error("Toggle complete failed:", err);
    throw err;
  } finally {
    loading.value = false;
  }
};



  const closeModal = () => {
    modalOpen.value = false;
    selectedNote.value = null;
  };

  // --- RETURN STATE & ACTIONS ---
  return {
    notes,
    selectedNote,
    loading,
    error,
    modalOpen,
    modalType,
    searchResults,
    meta,
    all,
    pending,
    completed,
    toggleNoteCompleted,
    createNote,
    fetchNoteById,
    fetchNotes,
    updateNote,
    deleteNote,
    searchNotes,
    clearSearch,
    openNote,
    closeModal,
  };
});
