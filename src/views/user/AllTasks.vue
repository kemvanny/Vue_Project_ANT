<template>
  <div class="view-content">
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
          <div class="stat-value">{{ totalCount }}</div>
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

    <div class="toolbar">
      <div class="filters">
        <BaseSelect v-model="priorityFilter" :options="priorityOptions" />
        <BaseSelect v-model="categoryFilter" :options="categoryOptions" />
        <BaseSelect v-model="statusFilter" :options="statusOptions" />
      </div>
    </div>
    <BaseSkeleton v-if="noteStore.loading" :count="5" />
    <div v-else>
      <div v-if="displayTasks.length === 0" class="empty-box">
        <div class="empty-icon">🗂️</div>
        <h3 class="empty-title">មិនមានភារកិច្ចសម្រាប់បង្ហាញទេ</h3>
        <p class="empty-sub">សូមបង្កើតភារកិច្ចថ្មី ឬប្តូរតម្រង។</p>
      </div>

      <div v-else>
        <BaseTaskTable title="All Tasks" :tasks="displayTasks" :pageSize="pageSize" @update:pageSize="pageSize = $event"
          @view="openView" @edit="openEdit" @delete="deleteNote" />

        <div v-if="noteStore.meta.totalPages > 1" class="pagination-modern">
          <button class="page-btn" @click="prevPage" :disabled="!noteStore.meta?.hasPreviousPage">
            ← ថយក្រោយ
          </button>
          <span class="page-info">
            Page {{ noteStore.meta?.currentPage || 1 }} / {{ noteStore.meta?.totalPages || 1 }}
          </span>
          <button class="page-btn" @click="nextPage" :disabled="!noteStore.meta?.hasNextPage">
            បន្ទាប់ →
          </button>
        </div>
      </div>
    </div>

    <TaskView ref="viewModalRef" v-if="noteStore.selectedNote" :task="noteStore.selectedNote" @edit-task="openEdit" />
    <TaskUpdate ref="editModalRef" v-if="noteStore.selectedNote" :task="noteStore.selectedNote"
      @updated="handleUpdated" />
    <DeleteConfirmModal :open="showDeleteModal" title="លុបភារកិច្ច?" message="តើអ្នកប្រាកដថាចង់លុបភារកិច្ចនេះមែនទេ?"
      :loading="actionLoading" @confirm="confirmDelete" @cancel="cancelDelete" />
  </div>
</template>

<script setup>
import api from "@/API/api";
import { computed, onMounted, ref, watch } from "vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseTaskTable from "@/components/base/BaseTaskTable.vue";
import DeleteConfirmModal from "@/components/base/DeleteConfirmModal.vue";
import { useNoteStore } from "@/stores/note";
import TaskView from "@/views/user/Task/TaskView.vue";
import TaskUpdate from "@/views/user/Task/TaskUpdate.vue";
import BaseSkeleton from "@/components/base/BaseSkeleton.vue";

const props = defineProps({
  title: { type: String, default: "ភារកិច្ចទាំងអស់" },
});

const emit = defineEmits(["create-task"]);
const noteStore = useNoteStore();

const priorityFilter = ref("all");
const categoryFilter = ref("all");
const statusFilter = ref("all");
const pageSize = ref(8);
const currentPage = ref(1);
const viewModalRef = ref(null);
const editModalRef = ref(null);
const showDeleteModal = ref(false);
const deleteId = ref(null);
const actionLoading = ref(false);

const performAction = async (actionFn) => {
  actionLoading.value = true;
  viewModalRef.value?.close();
  editModalRef.value?.close();
  try { await actionFn(); } finally { actionLoading.value = false; }
};

onMounted(async () => { await noteStore.fetchNotes(); });
watch(() => noteStore.notes.length, () => { currentPage.value = 1; });

const tasks = computed(() => noteStore.notes || []);
const completedCount = computed(() => noteStore.completed.length);
const pendingCount = computed(() => noteStore.pending.length);
const totalCount = computed(() => noteStore.notes.length);

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
  list.sort((a, b) => {
    if (a.justCreated) return -1;
    if (b.justCreated) return 1;
    const aKey = `${a.date || ""} ${a.time || ""}`.trim();
    const bKey = `${b.date || ""} ${b.time || ""}`.trim();
    return bKey.localeCompare(aKey);
  });
  if (statusFilter.value === "done") list = list.filter((t) => !!t.isCompleted);
  if (statusFilter.value === "pending") list = list.filter((t) => !t.isCompleted);
  if (priorityFilter.value !== "all") list = list.filter((t) => showPriority(t.priority) === priorityFilter.value);
  if (categoryFilter.value !== "all") list = list.filter((t) => showCategory(t.category) === categoryFilter.value);
  return list;
});

const prevPage = async () => { if (noteStore.meta.hasPreviousPage) await noteStore.fetchNotes(noteStore.meta.currentPage - 1); };
const nextPage = async () => { if (noteStore.meta.hasNextPage) await noteStore.fetchNotes(noteStore.meta.currentPage + 1); };
watch([priorityFilter, categoryFilter, statusFilter], () => { currentPage.value = 1; });
const createNew = () => { emit("create-task"); };
const openView = async (task) => { await noteStore.openNote(task.id); viewModalRef.value?.open(); };
const openEdit = async (task) => { await noteStore.openNote(task.id); editModalRef.value?.open(); };
const handleUpdated = async () => { await noteStore.fetchNotes(); };
const deleteNote = (id) => { deleteId.value = id; showDeleteModal.value = true; };
const confirmDelete = async () => {
  await performAction(async () => {
    await api.delete(`/notes/${deleteId.value}`);
    await noteStore.fetchNotes();
    showDeleteModal.value = false; deleteId.value = null;
  });
};
const cancelDelete = () => { showDeleteModal.value = false; deleteId.value = null; };

const priorityOptions = [{ value: "all", label: "អាទិភាព" }, { value: "ខ្ពស់", label: "ខ្ពស់" }, { value: "មធ្យម", label: "មធ្យម" }, { value: "ទាប", label: "ទាប" }];
const categoryOptions = [{ value: "all", label: "ប្រភេទ" }, { value: "ផ្ទាល់ខ្លួន", label: "ផ្ទាល់ខ្លួន" }, { value: "ការងារ", label: "ការងារ" }, { value: "សិក្សា", label: "សិក្សា" }];
const statusOptions = [{ value: "all", label: "ភារកិច្ច" }, { value: "done", label: "បានបញ្ចប់" }, { value: "pending", label: "កំពុងដំណើរការ" }];
</script>

<style scoped>
/* ===== SKELETON ANIMATION (Optimized) ===== */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.skeleton-card {
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 22px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.skeleton-line {
  background: #f1f5f9;
  border-radius: 4px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
}

.skeleton-line.title {
  width: 70%;
  height: 20px;
}

.skeleton-line.sub {
  width: 40%;
  height: 14px;
}

.skeleton-footer {
  display: flex;
  gap: 10px;
  margin-top: 24px;
}

.skeleton-pill {
  width: 70px;
  height: 28px;
  background: #f1f5f9;
  border-radius: 999px;
  position: relative;
  overflow: hidden;
}

/* Shimmer Animation with Teal hint */
.skeleton-line::after,
.skeleton-pill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(19, 112, 127, 0.08) 50%,
      rgba(255, 255, 255, 0) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

.action-loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0d9488;
  animation: bounce 0.6s infinite alternate;
  margin-bottom: 10px;
}

@keyframes bounce {
  to {
    transform: translateY(-15px);
  }
}

.view-content {
  font-family: 'Inter', sans-serif;
}

.pagination-modern {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 25px;
}

.page-btn {
  background-color: #0d9488;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:disabled {
  background-color: #c7c7c7;
  cursor: not-allowed;
}

.category-hero {
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.12), rgba(6, 182, 212, 0.1));
  border: 1px solid rgba(13, 148, 136, 0.18);
  border-radius: 26px;
  padding: 22px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;

  box-shadow: 0 3px 5px rgba(131, 160, 157, 0.255);
  margin-top: 1.2rem;
}

.hero-left {
  min-width: 0;

}

.brand-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.7);
  padding: 8px 14px;
  border-radius: 999px;
  margin-bottom: 10px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #0d9488;
  border-radius: 50%;
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
}

.hero-sub {
  color: #475569;
  font-weight: 700;
  font-size: 13px;
}

.hero-right {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.hero-stat {
  background: rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  padding: 10px 12px;
  text-align: center;
}

.stat-value {
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
}

.btn-submit-modern {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  width: 100%;
  padding: 18px;
  border-radius: 20px;
  font-weight: 800;
  cursor: pointer;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 40%;
}

.empty-box {
  background: #fff;
  border-radius: 26px;
  padding: 44px 28px;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.btn-create {
  grid-column: 1 / -1;
  padding: 14px 16px;
}

@media (max-width: 1100px) {
  .skeleton-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .category-hero {
    flex-direction: column;
  }
}

@media (max-width: 680px) {
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
}
</style>