<template>
  <div class="view-content">
    <div class="category-hero">
      <div class="hero-left">
        <div class="brand-pill">
          <span class="pulse-dot"></span>
          <span class="brand-name">REABLIST</span>
        </div>

        <h1 class="hero-title">
          ប្រភេទ៖ <span class="hero-accent">{{ categoryLabel }}</span>
        </h1>

        <p class="hero-sub">
          បញ្ជីភារកិច្ចទាំងអស់នៅក្នុងប្រភេទនេះ
        </p>
      </div>

      <div class="hero-right">
        <div class="hero-stat">
          <div class="stat-label">សរុប</div>
          <div class="stat-value">{{ filteredTasks.length }}</div>
        </div>

        <div class="hero-stat">
          <div class="stat-label">កំពុងធ្វើ</div>
          <div class="stat-value">{{ inProgressCount }}</div>
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
      <div class="chips">
        <button class="chip" :class="{ active: filter === 'all' }" @click="filter = 'all'">
          ទាំងអស់
        </button>
        <button class="chip" :class="{ active: filter === 'progress' }" @click="filter = 'progress'">
          កំពុងដំណើរការ
        </button>
        <button class="chip" :class="{ active: filter === 'done' }" @click="filter = 'done'">
          បានបញ្ចប់
        </button>
      </div>
    </div>

    <BaseSkeleton v-if="loading" :count="4" />

    <div v-else>
      <div v-if="displayTasks.length === 0" class="empty-box">
        <div class="empty-icon">🗂️</div>
        <h3 class="empty-title">មិនមានភារកិច្ចសម្រាប់បង្ហាញទេ</h3>
        <p class="empty-sub">
          សូមបង្កើតភារកិច្ចថ្មី ឬប្តូរតម្រង។
        </p>

        <button class="btn-submit-modern empty-btn" @click="createNew">
          បង្កើតភារកិច្ច
        </button>
      </div>

      <div v-else>
        <BaseTaskTable title="Category Tasks" :tasks="displayTasks" :pageSize="pageSize"
          @update:pageSize="pageSize = $event" @view="openView" @edit="openEdit" @delete="deleteNote" />
      </div>
    </div>

    <TaskView ref="viewModalRef" v-if="noteStore.selectedNote" :task="noteStore.selectedNote" @edit-task="openEdit" />
    <TaskUpdate ref="editModalRef" v-if="noteStore.selectedNote" :task="noteStore.selectedNote"
      @updated="handleUpdated" />
    <DeleteConfirmModal :open="showDeleteModal" title="លុបភារកិច្ច?" message="តើអ្នកប្រាកដថាចង់លុបភារកិច្ចនេះមែនទេ?"
      @confirm="confirmDelete" @cancel="cancelDelete" />

  </div>
</template>

<script setup>
import api from "@/API/api";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BaseSkeleton from "@/components/ui/BaseSkeleton.vue";
import BaseTaskTable from "@/components/ui/BaseTaskTable.vue";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal.vue";

import TaskView from "@/views/user/Task/TaskView.vue";
import TaskUpdate from "@/views/user/Task/TaskUpdate.vue";
import { useNoteStore } from "@/stores/note";

const route = useRoute();
const noteStore = useNoteStore();
const emit = defineEmits(["create-task"]);

const filter = ref("all");
const pageSize = ref(8);
const showDeleteModal = ref(false);
const deleteId = ref(null);
const viewModalRef = ref(null);
const editModalRef = ref(null);

const normalizeCategory = (val) => {
  const v = String(val || "").trim().toLowerCase();
  if (["personal", "ផ្ទាល់ខ្លួន"].includes(v)) return "personal";
  if (["work", "ការងារ"].includes(v)) return "work";
  if (["study", "school", "សិក្សា"].includes(v)) return "study";
  return v;
};

const categoryParam = computed(() => route.params.name ?? "");
const categoryKey = computed(() => normalizeCategory(categoryParam.value));

const categoryLabel = computed(() => {
  if (categoryKey.value === "personal") return "ផ្ទាល់ខ្លួន";
  if (categoryKey.value === "work") return "ការងារ";
  if (categoryKey.value === "study") return "សិក្សា";
  return String(categoryParam.value || "ទូទៅ");
});

const loading = computed(() => noteStore.loading);

onMounted(async () => {
  await noteStore.fetchAllNotes();
});

const filteredTasks = computed(() => {
  return (noteStore.notes || []).filter(
    (t) => normalizeCategory(t.category) === categoryKey.value
  );
});

const completedCount = computed(() => filteredTasks.value.filter((t) => !!t.isCompleted).length);
const inProgressCount = computed(() => filteredTasks.value.filter((t) => !t.isCompleted).length);

const displayTasks = computed(() => {
  let list = [...filteredTasks.value];
  if (filter.value === "progress") list = list.filter((t) => !t.isCompleted);
  if (filter.value === "done") list = list.filter((t) => !!t.isCompleted);
  list.sort((a, b) => {
    const aKey = `${a.date || ""} ${a.time || ""}`.trim();
    const bKey = `${b.date || ""} ${b.time || ""}`.trim();
    return bKey.localeCompare(aKey);
  });
  return list;
});

const createNew = () => emit("create-task");
const openView = async (task) => { await noteStore.openNote(task.id); viewModalRef.value?.open(); };
const openEdit = async (task) => { await noteStore.openNote(task.id); editModalRef.value?.open(); };
const handleUpdated = async () => { await noteStore.fetchAllNotes(); };
const deleteNote = (id) => { deleteId.value = id; showDeleteModal.value = true; };

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

const cancelDelete = () => { showDeleteModal.value = false; deleteId.value = null; };

watch(categoryParam, async () => {
  filter.value = "all";
  if (!noteStore.notes.length) await noteStore.fetchAllNotes();
});
</script>

<style scoped>
.category-hero {
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.12), rgba(6, 182, 212, 0.1));
  border: 1px solid rgba(13, 148, 136, 0.18);
  border-radius: 26px;
  padding: 22px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
  box-shadow: 0 22px 45px -35px rgba(13, 148, 136, 0.45);
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
  line-height: 1.2;
}

.hero-accent {
  color: #0d9488;
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

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  border: 2px solid rgba(13, 148, 136, 0.18);
  background: #fff;
  border-radius: 999px;
  padding: 10px 12px;
  font-weight: 900;
  font-size: 12px;
  cursor: pointer;
  transition: transform .18s ease;
}

.chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 34px -28px rgba(13, 148, 136, 0.35);
}

.chip.active {
  border-color: rgba(13, 148, 136, 0.55);
  background: rgba(13, 148, 136, 0.08);
  color: #0d9488;
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
  font-size: 44px;
  margin-bottom: 10px;
}

.empty-title {
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 8px;
}

.empty-sub {
  color: #64748b;
  font-weight: 700;
  margin: 0 0 16px;
}

.empty-btn {
  width: auto;
  padding: 14px 26px;
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
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.5);
}

@media (max-width: 1100px) {
  .category-hero {
    flex-direction: column;
  }
}

@media (max-width: 680px) {
  .hero-right {
    grid-template-columns: 1fr;
  }

  .hero-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>