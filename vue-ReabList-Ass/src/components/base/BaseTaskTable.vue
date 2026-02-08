<template>
  <div class="card-board">
    <div class="task-grid">
      <div v-for="t in paginated" :key="t.id" class="task-card">
        <div class="card-inner">
          <div class="card-header-row">
            <div class="status-tags">
              <span
                class="pill-tag"
                :class="priorityClass(showPriority(t.priority))"
              >
                {{ showPriority(t.priority) }}
              </span>
              <span
                class="pill-tag"
                :class="t.isCompleted ? 'status-done' : 'status-pending'"
              >
                {{ t.isCompleted ? "រួចរាល់" : "កំពុងរង់ចាំ" }}
              </span>
            </div>

            <div class="action-wrapper">
              <button class="menu-dots" @click.stop="toggleMenu(t.id)">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="12" cy="5" r="1.5"></circle>
                  <circle cx="12" cy="19" r="1.5"></circle>
                </svg>
              </button>

              <transition name="menu-pop">
                <div
                  v-if="openMenuId === t.id"
                  class="action-dropdown"
                  @click.stop
                >
                  <button
                    @click="$emit('view', t)"
                    class="dropdown-item done-item"
                  >
                    <i class="bi bi-eye"></i> មើលលម្អិត
                  </button>
                  <button @click="$emit('edit', t)" class="dropdown-item text-primary">
                    <i class="bi bi-pencil"></i> កែប្រែ
                  </button>
                  <div class="divider"></div>
                  <button
                    @click="$emit('delete', t.id)"
                    class="dropdown-item delete-item"
                  >
                    <i class="bi bi-trash"></i> លុបចេញ
                  </button>
                </div>
              </transition>
            </div>
          </div>

          <div class="card-content" @click="$emit('view', t)">
            <h4 class="item-title">{{ t.title || "គ្មានចំណងជើង" }}</h4>
            <p class="item-desc">
              {{ (t.content || t.notes || "គ្មានការពណ៌នា").trim() }}
            </p>
          </div>

          <div class="card-bottom">
            <span class="category-tag">{{ showCategory(t.category) }}</span>
<span class="item-date">
  {{ formatUserDateTime(t) }}
</span>

          </div>
        </div>
      </div>
    </div>

    <div class="board-pagination">
      <div class="page-summary">
        បង្ហាញ {{ paginated.length }} ក្នុងចំណោម {{ tasks.length }}
      </div>
      <div class="nav-controls">
        <button
          class="nav-btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <button class="nav-btn active">1</button>
        <button
          class="nav-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  tasks: { type: Array, default: () => [] },
  pageSize: { type: Number, default: 6 },
});

const currentPage = ref(1);
const openMenuId = ref(null);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.tasks.length / props.pageSize))
);
const paginated = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  return props.tasks.slice(start, start + props.pageSize);
});

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};
const closeMenus = () => {
  openMenuId.value = null;
};

onMounted(() => window.addEventListener("click", closeMenus));
onBeforeUnmount(() => window.removeEventListener("click", closeMenus));

const showPriority = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "HIGH" || val === "ខ្ពស់") return "HIGH";
  if (v === "LOW" || val === "ទាប") return "LOW";
  return "MED";
};
// ---- USER Date/Time (deadline/reminder) ----
const parseUserDateTime = (t) => {
  const dateStr = t?.date; // example: "2026-02-03"
  const timeStr = t?.time; // example: "09:30"

  if (!dateStr && !timeStr) return null;

  // if only date
  if (dateStr && !timeStr) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }

  // if date + time
  if (dateStr && timeStr) {
    const d = new Date(`${dateStr}T${timeStr}`);
    return isNaN(d.getTime()) ? null : d;
  }

  // if only time (rare case)
  return null;
};

const formatUserDateTime = (t) => {
  const d = parseUserDateTime(t);
  if (!d) return "—";

  const date = d.toLocaleDateString("km-KH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // show time only if user has time
  if (t?.time) {
    const time = d.toLocaleTimeString("km-KH", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} • ${time}`;
  }

  return date;
};


const showCategory = (val) => val || "ទូទៅ";

const priorityClass = (p) => {
  if (p === "HIGH") return "p-high";
  if (p === "LOW") return "p-low";
  return "p-med";
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css");

.card-board {
  font-family: "Kantumruy Pro", sans-serif;
  background: transparent;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.task-card {
  background: white;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0px 3px 5px rgba(205, 226, 225, 0.23);

}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
}

.card-inner {
  padding: 20px;
}

/* Header row layout */
.card-header-row {
  display: flex;
  justify-content: space-between; /* This pushes icon to right */
  align-items: center;
}

.status-tags {
  display: flex;
  gap: 8px;
}

.pill-tag {
  padding: 5px 14px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 800;
}

/* Priority & Status Colors */
.p-high {
  background: #fff1f2;
  color: #e11d48;
}
.p-med {
  background: #fffbeb;
  color: #d97706;
}
.p-low {
  background: #f0fdfa;
  color: #0d9488;
}
.status-done {
  background: #f0fdf4;
  color: #16a34a;
}
.status-pending {
  background: #fefce8;
  color: #ca8a04;
}

/* Action Button */
.menu-dots {
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.menu-dots:hover {
  background: #f8fafc;
  color: #64748b;
}

/* Content */
.item-title {
  margin: 20px 0 8px;
  font-weight: 700;
  color: #0f172a;
  font-size: 1.1rem;
}

.item-desc {
  color: #64748b;
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Bottom Row */
.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f8fafc;
}

.category-tag {
  background: #f0fdfa;
  color: #0d9488;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.item-date {
  font-size: 0.82rem;
  color: #94a3b8;
}

/* Dropdown Menu */
.action-wrapper {
  position: relative;
}
.action-dropdown {
  position: absolute;
  right: 0;
  top: 35px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
  padding: 8px;
  z-index: 50;
  min-width: 180px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: none;
  font-size: 0.88rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  color: #475569;
}

.dropdown-item i {
  font-size: 1.1rem;
}
.dropdown-item:hover {
  background: #f8fafc;
}
.done-item {
  color: #16a34a;
}
.delete-item {
  color: #e11d48;
}
.divider {
  height: 1px;
  background: #f1f5f9;
  margin: 6px 0;
}

/* Pagination Controls */
.board-pagination {
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn.active {
  background: #0d9488;
  color: white;
  border-color: #0d9488;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>