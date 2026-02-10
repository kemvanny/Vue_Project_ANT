<template>
  <div class="view-content">
    <!-- HERO HEADER -->
    <div class="category-hero">
      <div class="hero-left">
        <div class="brand-pill">
          <span class="pulse-dot"></span>
          <span class="brand-name">REABLIST</span>
        </div>

        <h1 class="hero-title">ភារកិច្ចដែលបានបញ្ចប់</h1>
        <p class="hero-sub">បញ្ជីភារកិច្ចដែលបានសម្គាល់ថាបញ្ចប់រួចរាល់</p>
      </div>

      <div class="hero-right">
        <div class="hero-stat">
          <div class="stat-label">សរុប</div>
          <div class="stat-value">{{ noteStore.notes.length }}</div>
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
      </div>
    </div>

    <!-- CONTENT -->
    <div v-if="loading" class="loading">
      <div class="loading-dot"></div>
      <div>កំពុងផ្ទុក...</div>
    </div>

    <div v-else>
      <!-- Empty state -->
      <div v-if="displayTasks.length === 0" class="empty-box">
        <div class="empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20 7h-9l-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
            />
          </svg>
        </div>

        <h3 class="empty-title">មិនមានភារកិច្ចបានបញ្ចប់ទេ</h3>
        <p class="empty-sub">ភារកិច្ចនៅតែ Pending ឬមិនទាន់បាន Toggle Completed</p>
      </div>

      <!-- ✅ Same UI as AllTasks -->
      <div v-else>
        <BaseTaskTable
          :tasks="displayTasks"
          :pageSize="pageSize"
          @update:pageSize="pageSize = $event"
          @view="openView"
          @edit="openEdit"
          @delete="deleteNote"
        />
      </div>
    </div>

    <!-- VIEW MODAL -->
    <TaskView
      ref="viewModalRef"
      v-if="noteStore.selectedNote"
      :task="noteStore.selectedNote"
      @edit-task="openEdit"
    />

    <!-- EDIT MODAL -->
    <TaskUpdate
      ref="editModalRef"
      v-if="noteStore.selectedNote"
      :task="noteStore.selectedNote"
      @updated="handleUpdated"
    />
  </div>
</template>

<script setup>
import api from "@/API/api";
import { computed, onMounted, ref, watch } from "vue";

import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseTaskTable from "@/components/base/BaseTaskTable.vue";

import { useNoteStore } from "@/stores/note";

import TaskView from "@/views/user/Task/TaskView.vue";
import TaskUpdate from "@/views/user/Task/TaskUpdate.vue";

const emit = defineEmits(["create-task"]);

const noteStore = useNoteStore();

// filters
const priorityFilter = ref("all");
const categoryFilter = ref("all");

// pagination
const pageSize = ref(8);
const currentPage = ref(1);

// modal refs
const viewModalRef = ref(null);
const editModalRef = ref(null);

// load
onMounted(async () => {
  if (!noteStore.notes.length) {
    await noteStore.fetchAllNotes();
  }
});

const loading = computed(() => noteStore.loading);

// counts
const completedCount = computed(() => noteStore.completed.length);
const pendingCount = computed(() => noteStore.pending.length);

// mapper (same as AllTasks)
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

// 🔥 base list = completed only
const filteredTasks = computed(() => noteStore.completed || []);

// filter locally
const displayTasks = computed(() => {
  let list = [...filteredTasks.value];

  // newest first
  list.sort((a, b) => {
    const aKey = `${a.date || ""} ${a.time || ""}`.trim();
    const bKey = `${b.date || ""} ${b.time || ""}`.trim();
    return bKey.localeCompare(aKey);
  });

  if (priorityFilter.value !== "all") {
    list = list.filter((t) => showPriority(t.priority) === priorityFilter.value);
  }

  if (categoryFilter.value !== "all") {
    list = list.filter((t) => showCategory(t.category) === categoryFilter.value);
  }

  return list;
});

// reset page on filter change
watch([priorityFilter, categoryFilter], () => {
  currentPage.value = 1;
});

// create
const createNew = () => emit("create-task");

// view
const openView = async (task) => {
  await noteStore.openNote(task.id);
  viewModalRef.value?.open();
};

// edit
const openEdit = async (task) => {
  await noteStore.openNote(task.id);
  editModalRef.value?.open();
};

// after update
const handleUpdated = async () => {
  await noteStore.fetchAllNotes();
};

// delete
const deleteNote = async (id) => {
  const ok = confirm("ចង់លុប Note នេះមែនទេ?");
  if (!ok) return;

  try {
    await api.delete(`/notes/${id}`);
    await noteStore.fetchAllNotes();
  } catch (err) {
    console.error("delete failed:", err.response?.data || err.message);
    alert("Delete failed!");
  }
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
</script>

<style scoped>
/* ======= HERO ======= */
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

/* ======= TOOLBAR ======= */
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: 40%;
}

@media (max-width: 900px) {
  .filters {
    grid-template-columns: 1fr;
    width: 100%;
  }
}

/* ======= LOADING ======= */
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

/* ======= EMPTY ======= */
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

/* Button match CreateTask */
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
</style>
