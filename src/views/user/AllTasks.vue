<template>
  <div class="view-content">
    <!-- HERO HEADER -->
    <div class="category-hero">
      <div class="hero-left">
        <div class="brand-pill">
          <span class="pulse-dot"></span>
          <span class="brand-name">REABLIST</span>
        </div>

        <h1 class="hero-title">
          {{ title }}
        </h1>

        <p class="hero-sub">
          បញ្ជីភារកិច្ចទាំងអស់ (Offline - LocalStorage)
        </p>
      </div>

      <div class="hero-right">
        <div class="hero-stat">
          <div class="stat-label">សរុប</div>
          <div class="stat-value">{{ filteredTasks.length }}</div>
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


      <!-- Dropdown Filters -->
<div class="filters">
  <BaseSelect
 
    v-model="priorityFilter"
    :options="priorityOptions"
  />

  <BaseSelect
 
    v-model="categoryFilter"
    :options="categoryOptions"
  />

  <BaseSelect
   
    v-model="statusFilter"
    :options="statusOptions"
  />
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
    <path d="M20 7h-9l-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
  </svg>
</div>

        <h3 class="empty-title">មិនមានភារកិច្ចសម្រាប់បង្ហាញទេ</h3>
        <p class="empty-sub">
          សូមបង្កើតភារកិច្ចថ្មី ឬប្តូរតម្រង/ពាក្យស្វែងរក។
        </p>


      </div>

      <!-- Grid -->
      <div v-else class="task-grid">
        <div
          v-for="t in displayTasks"
          :key="t.id"
          class="task-card"
          @click="viewTask(t)"
        >
          <div class="card-top">
            <div class="title-wrap">
              <div class="task-title text-truncate">
                {{ t.title || "មិនមានចំណងជើង" }}
              </div>
              <div class="task-sub text-truncate">
                {{ t.notes?.trim() ? t.notes : "មិនមានកំណត់ចំណាំ" }}
              </div>
            </div>

            <span class="pill" :class="priorityClass(t.priority)">
              {{ t.priority || "មធ្យម" }}
            </span>
          </div>

          <div class="card-mid">
            <div class="meta">
              <span class="meta-badge">📅 {{ t.date || "—" }}</span>
              <span class="meta-badge">⏰ {{ t.time || "—" }}</span>
            </div>

            <span class="status" :class="{ done: t.isCompleted }">
              {{ t.isCompleted ? "បានបញ្ចប់" : "កំពុងដំណើរការ" }}
            </span>
          </div>

          <div class="card-bottom">
            <span class="category-chip">
              {{ t.category || "ទូទៅ" }}
            </span>

            <span class="open-hint">ចុចដើម្បីមើល →</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import BaseSelect from "@/components/base/BaseSelect.vue";


const props = defineProps({
  title: { type: String, default: "ភារកិច្ចទាំងអស់" },
  tasks: { type: Array, default: () => [] },
});

const emit = defineEmits(["create-task", "view-task"]);

const loading = ref(true);

// local search + filters
const q = ref("");
const priorityFilter = ref("all"); // all | ខ្ពស់ | មធ្យម | ទាប
const categoryFilter = ref("all"); // all | ផ្ទាល់ខ្លួន | ការងារ | សិក្សា | ទូទៅ
const statusFilter = ref("all"); // all | done | pending

// tasks source
const tasks = ref([]);

const key = "reablist_tasks";

const loadTasks = () => {
  // if parent provides tasks, use it
  if (props.tasks && props.tasks.length) {
    tasks.value = props.tasks;
    return;
  }

  // fallback to localStorage
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  tasks.value = Array.isArray(list) ? list : [];
};

const filteredTasks = computed(() => tasks.value || []);

const completedCount = computed(() =>
  filteredTasks.value.filter((t) => !!t.isCompleted).length
);

const pendingCount = computed(() =>
  filteredTasks.value.filter((t) => !t.isCompleted).length
);

const displayTasks = computed(() => {
  const text = q.value.toLowerCase();

  let list = filteredTasks.value;

  // Search
  if (text) {
    list = list.filter((t) => {
      const hay = `${t.title || ""} ${t.notes || ""}`.toLowerCase();
      return hay.includes(text);
    });
  }

  // Status filter
  if (statusFilter.value === "done") {
    list = list.filter((t) => !!t.isCompleted);
  } else if (statusFilter.value === "pending") {
    list = list.filter((t) => !t.isCompleted);
  }

  // Priority filter
  if (priorityFilter.value !== "all") {
    list = list.filter((t) => (t.priority || "មធ្យម") === priorityFilter.value);
  }

  // Category filter
  if (categoryFilter.value !== "all") {
    list = list.filter((t) => (t.category || "ទូទៅ") === categoryFilter.value);
  }

  return list;
});

const priorityClass = (p) => {
  if (p === "ខ្ពស់") return "high";
  if (p === "មធ្យម") return "medium";
  return "low";
};

const createNew = () => emit("create-task");
const viewTask = (task) => emit("view-task", task);

onMounted(() => {
  loadTasks();
  loading.value = false;
});

// reload if props.tasks changes
watch(
  () => props.tasks,
  () => loadTasks(),
  { deep: true }
);

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
  border: 1px solid rgba(226, 232, 240,  0.9);
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

.search-wrap {
  flex: 1;
  min-width: 240px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 2px solid transparent;
  border-radius: 18px;
  padding: 12px 14px;
  transition: box-shadow 0.18s ease, border-color 0.18s ease,
    transform 0.18s ease;
}

.search-wrap:hover {
  transform: translateY(-1px);
  border-color: rgba(13, 148, 136, 0.22);
  box-shadow: 0 18px 34px -28px rgba(13, 148, 136, 0.45);
}

.search-ic {
  font-size: 14px;
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  font-weight: 800;
  color: #0f172a;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-select {
  background: #fff;
  border: 2px solid rgba(13, 148, 136, 0.18);
  border-radius: 14px;
  padding: 10px 14px;
  font-weight: 900;
  font-size: 12px;
  color: #0f172a;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.filter-select:hover {
  transform: translateY(-1px);
  border-color: rgba(13, 148, 136, 0.45);
  box-shadow: 0 18px 34px -28px rgba(13, 148, 136, 0.35);
}

.filter-select:focus {
  outline: none;
  border-color: #0d9488;
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

/* ======= GRID ======= */
.task-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
@media (max-width: 1100px) {
  .category-hero {
    flex-direction: column;
  }
  .hero-right {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

/* ======= CARD ======= */
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

/* Priority pill */
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

/* Status */
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
.empty-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 12px;
  border-radius: 22px;
  display: grid;
  place-items: center;
  background: rgba(13, 148, 136, 0.10);
  border: 1px solid rgba(13, 148, 136, 0.18);
  color: #0d9488;
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
  }
}


</style>
