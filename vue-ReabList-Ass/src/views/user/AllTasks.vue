<template>
  <div class="view-content">
    <!-- HERO HEADER -->
    <div class="category-hero">
      <div class="hero-left">
        <div class="brand-pill">
          <span class="pulse-dot"></span>
          <span class="brand-name">REABLIST</span>
        </div>

        <h1 class="hero-title">{{ title }}</h1>
        <p class="hero-sub">បញ្ជីភារកិច្ចទាំងអស់</p>
      </div>

      <div class="hero-right">
        <div class="hero-stat">
          <div class="stat-label">សរុប</div>
          <div class="stat-value">{{ noteStore.meta?.totalItems || noteStore.notes.length }}</div>
        </div>

        <div class="hero-stat">
          <div class="stat-label">កំពុងធ្វើ</div>
          <div class="stat-value">{{ pendingCount }}</div>
        </div>

        <div class="hero-stat">
          <div class="stat-label">បានបញ្ចប់</div>
          <div class="stat-value">{{ completedCount }}</div>
        </div>

        <button class="btn-submit-modern btn-create" @click="createNew">
          + បង្កើតភារកិច្ចថ្មី
        </button>
      </div>
    </div>

    <!-- TOOLBAR -->
    <div class="toolbar">
      <div class="filters">
        <BaseSelect v-model="priorityFilter" :options="priorityOptions" />
        <BaseSelect v-model="categoryFilter" :options="categoryOptions" />
        <BaseSelect v-model="statusFilter" :options="statusOptions" />
      </div>
    </div>
    <!-- CONTENT -->
    <div v-if="loading" class="loading">
      <div class="loading-dot"></div>
      <div>កំពុងផ្ទុក...</div>
    </div>
    <div v-else>
      <div v-if="displayTasks.length === 0" class="empty-box">
        <div class="empty-icon">🗂️</div>
        <h3 class="empty-title">មិនមានភារកិច្ចសម្រាប់បង្ហាញទេ</h3>
        <p class="empty-sub">សូមបង្កើតភារកិច្ចថ្មី ឬប្តូរតម្រង។</p>
      </div>
      <div v-else>
        <BaseTaskTable
          title="All Tasks"
          :tasks="paginatedTasks"
          :pageSize="pageSize"
          @update:pageSize="pageSize = $event"
          @view="openView"
          @edit="openEdit"
          @delete="deleteNote"
        />
      </div>
    </div>

    <TaskView
      ref="viewModalRef"
      v-if="noteStore.selectedNote"
      :task="noteStore.selectedNote"
      @edit-task="openEdit"
    />

    <TaskUpdate
      ref="editModalRef"
      v-if="noteStore.selectedNote"
      :task="noteStore.selectedNote"
      @updated="handleUpdated"
    />
    <DeleteConfirmModal
      :open="showDeleteModal"
      title="លុបភារកិច្ច?"
      message="តើអ្នកប្រាកដថាចង់លុបភារកិច្ចនេះមែនទេ?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

  </div>
</template>

<script setup>
import api from "@/API/api";
import { computed, onMounted, ref, watch } from "vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseTaskTable from "@/components/base/BaseTaskTable.vue";
import DeleteConfirmModal from "@/components/Base/DeleteConfirmModal.vue";


import { useNoteStore } from "@/stores/note";

import TaskView from "@/views/user/Task/TaskView.vue";
import TaskUpdate from "@/views/user/Task/TaskUpdate.vue";

const props = defineProps({
  title: { type: String, default: "ភារកិច្ចទាំងអស់" },
});

const emit = defineEmits(["create-task"]);

const noteStore = useNoteStore();

// dropdown filters
const priorityFilter = ref("all");
const categoryFilter = ref("all");
const statusFilter = ref("all");

// pagination
const pageSize = ref(8);
const currentPage = ref(1);

// modal refs
const viewModalRef = ref(null);
const editModalRef = ref(null);

// delete modal state
const showDeleteModal = ref(false);
const deleteId = ref(null);

// load
onMounted(async () => {
  await noteStore.fetchAllNotes();
});

watch(
  () => noteStore.notes.length,
  () => {
    currentPage.value = 1; // 🔥 reset to first page
  }
);


const loading = computed(() => noteStore.loading);
const tasks = computed(() => noteStore.notes || []);

const completedCount = computed(() => noteStore.completed.length);
const pendingCount = computed(() => noteStore.pending.length);

// mapper
const showPriority = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "HIGH" || val === "ខ្ពស់") return "ខ្ពស់";
  if (v === "MEDIUM" || val === "មធ្យម") return "មធ្យម";
  if (v === "LOW" || val === "ទាប") return "ទាប";
  return val || "មធ្យម";
};

const showCategory = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "PERSONAL" || val === "ផ្ទាល់ខ្លួន") return "ផ្ទាល់ខ្លួន";
  if (v === "WORK" || val === "ការងារ") return "ការងារ";
  if (v === "SCHOOL" || v === "STUDY" || val === "សិក្សា") return "សិក្សា";
  return val || "ទូទៅ";
};

const displayTasks = computed(() => {
  let list = [...tasks.value];

  //  newest first
  list.sort((a, b) => {
    const aKey = `${a.date || ""} ${a.time || ""}`.trim();
    const bKey = `${b.date || ""} ${b.time || ""}`.trim();
    return bKey.localeCompare(aKey);
  });

  if (statusFilter.value === "done") list = list.filter((t) => !!t.isCompleted);
  if (statusFilter.value === "pending")
    list = list.filter((t) => !t.isCompleted);

  if (priorityFilter.value !== "all") {
    list = list.filter(
      (t) => showPriority(t.priority) === priorityFilter.value
    );
  }

  if (categoryFilter.value !== "all") {
    list = list.filter(
      (t) => showCategory(t.category) === categoryFilter.value
    );
  }

  return list;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(displayTasks.value.length / pageSize.value))
);

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return displayTasks.value.slice(start, start + pageSize.value);
});

const goPrev = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goNext = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

watch([priorityFilter, categoryFilter, statusFilter], () => {
  currentPage.value = 1;
});

const priorityClass = (p) => {
  if (p === "ខ្ពស់") return "high";
  if (p === "មធ្យម") return "medium";
  return "low";
};

// create
const createNew = () => emit("create-task");

//  OPEN VIEW
const openView = async (task) => {
  await noteStore.openNote(task.id);
  viewModalRef.value?.open();
};

//  EDIT (click pencil)

const openEdit = async (task) => {
  await noteStore.openNote(task.id);
  editModalRef.value?.open();
};

//  VIEW MODAL -> EDIT MODAL
const fromViewToEdit = async (task) => {
  // close view
  viewModalRef.value?.close();

  // open edit
  await noteStore.openNote(task.id);
  editModalRef.value?.open();
};

// MARK DONE FROM VIEW MODAL
const markCompletedFromView = async (task) => {
  try {
    await api.put(`/notes/${task.id}/toggle-complete`);
    await noteStore.fetchAllNotes();
  } catch (err) {
    console.error("toggle failed:", err.response?.data || err.message);
    alert("Toggle complete failed!");
  }
};

// after update
const handleUpdated = async () => {
  await noteStore.fetchAllNotes();
};

// delete
// when user clicks delete
const deleteNote = (id) => {
  deleteId.value = id;
  showDeleteModal.value = true;
};

// confirm delete from modal
const confirmDelete = async () => {
  try {
    await api.delete(`/notes/${deleteId.value}`);
    await noteStore.fetchAllNotes();
  } catch (err) {
    console.error("delete failed:", err.response?.data || err.message);
  } finally {
    showDeleteModal.value = false;
    deleteId.value = null;
  }
};

// cancel delete
const cancelDelete = () => {
  showDeleteModal.value = false;
  deleteId.value = null;
};




// dropdown options
const priorityOptions = [
  { value: "all", label: "អាទិភាព" },
  { value: "ខ្ពស់", label: "ខ្ពស់" },
  { value: "មធ្យម", label: "មធ្យម" },
  { value: "ទាប", label: "ទាប" },
];

const categoryOptions = [
  { value: "all", label: "ប្រភេទ" },
  { value: "ផ្ទាល់ខ្លួន", label: "ផ្ទាល់ខ្លួន" },
  { value: "ការងារ", label: "ការងារ" },
  { value: "សិក្សា", label: "សិក្សា" },
];

const statusOptions = [
  { value: "all", label: "ភារកិច្ច" },
  { value: "done", label: "បានបញ្ចប់" },
  { value: "pending", label: "កំពុងដំណើរការ" },
];
</script>


<style scoped>
/* ======= HERO ======= */

/* ===== Modern Card Grid ===== */
.task-list-modern {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 1100px) {
  .task-grid-modern {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .task-grid-modern {
    grid-template-columns: 1fr;
  }
}

/* pagination footer */
.pager-modern {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.pager-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.category-hero {
  background: linear-gradient(
    135deg,
    rgba(13, 148, 136, 0.12),
    rgba(6, 182, 212, 0.1)
  );
  border: 1px solid rgba(13, 148, 136, 0.18);
  border-radius: 26px;
  padding: 22px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
  box-shadow: 0 3px 5px rgba(131, 160, 157, 0.255);
}

.hero-left {
  min-width: 0;
}

.brand-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(13, 148, 136, 0.16);
  padding: 8px 14px;
  border-radius: 999px;
  margin-bottom: 10px;
  backdrop-filter: blur(10px);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #0d9488;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.35);
  animation: pulse-ring 1.6s infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.6);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 12px rgba(13, 148, 136, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(13, 148, 136, 0);
  }
}

.brand-name {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #0d9488;
}

.hero-title {
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 6px;
  line-height: 1.2;
}

.hero-sub {
  margin: 0;
  color: #475569;
  font-weight: 700;
  font-size: 13px;
}

.hero-right {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  gap: 10px;
}

.hero-stat {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 18px;
  padding: 10px 12px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-label {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #64748b;
}

.stat-value {
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
  margin-top: 2px;
}

.btn-create {
  grid-column: 1 / -1;
  padding: 14px 16px;
}

.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 40%;
}
@media (max-width: 900px) {
  .filters {
    grid-template-columns: 1fr;
    width: 100%;
  }
}

.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #64748b;
  font-weight: 800;
  margin-top: 10px;
}
.loading-dot {
  width: 10px;
  height: 10px;
  background: #0d9488;
  border-radius: 50%;
  animation: bounce 0.9s infinite alternate;
}
@keyframes bounce {
  from {
    transform: translateY(0);
    opacity: 0.6;
  }
  to {
    transform: translateY(-6px);
    opacity: 1;
  }
}

.empty-box {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 26px;
  padding: 44px 28px;
  text-align: center;
  box-shadow: 0 22px 45px -35px rgba(2, 132, 199, 0.25);
}
.empty-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 12px;
  border-radius: 22px;
  display: grid;
  place-items: center;
  background: rgba(13, 148, 136, 0.1);
  border: 1px solid rgba(13, 148, 136, 0.18);
  color: #0d9488;
}
.empty-title {
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 8px;
}
.empty-sub {
  color: #64748b;
  font-weight: 700;
  margin: 0;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
@media (max-width: 1100px) {
  .category-hero {
    flex-direction: column;
  }
  .task-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 680px) {
  .task-grid {
    grid-template-columns: 1fr;
  }
}

.task-card {
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 22px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
  animation: popIn 0.22s ease-out both;
}
@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.task-card:hover {
  transform: translateY(-2px);
  border-color: rgba(13, 148, 136, 0.25);
  box-shadow: 0 18px 34px -28px rgba(13, 148, 136, 0.45);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.task-title {
  font-weight: 900;
  color: #0f172a;
}
.task-sub {
  margin-top: 4px;
  font-weight: 800;
  color: #64748b;
  font-size: 13px;
}

.card-mid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
}
.meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.meta-badge {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  color: #334155;
}

.pill {
  font-weight: 900;
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;
}
.pill.high {
  background: #fee2e2;
  color: #dc2626;
}
.pill.medium {
  background: #fef3c7;
  color: #d97706;
}
.pill.low {
  background: #dcfce7;
  color: #16a34a;
}

.status {
  font-weight: 900;
  font-size: 11px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  color: #ef4444;
  background: #fff;
}
.status.done {
  color: #0d9488;
  border-color: rgba(13, 148, 136, 0.25);
  background: #f0fdfa;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
}
.category-chip {
  background: rgba(13, 148, 136, 0.1);
  color: #0d9488;
  border: 1px solid rgba(13, 148, 136, 0.18);
  padding: 7px 10px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12px;
}
.open-hint {
  color: #94a3b8;
  font-weight: 900;
  font-size: 12px;
}

.btn-submit-modern {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  width: 100%;
  padding: 18px;
  border-radius: 20px;
  font-weight: 800;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.5);
}
.btn-submit-modern:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 34px -18px rgba(13, 148, 136, 0.65);
}

.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-weight: 900;
  transition: 0.15s;
}
.icon-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px -22px rgba(15, 23, 42, 0.25);
}
.icon-btn.danger {
  border-color: rgba(239, 68, 68, 0.25);
}
.icon-btn.danger:hover {
  background: rgba(239, 68, 68, 0.08);
}
</style>
