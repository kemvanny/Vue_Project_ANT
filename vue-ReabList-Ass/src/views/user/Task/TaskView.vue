<template>
  <BaseModal ref="modalRef" id="viewTaskModal" title="ព័ត៌មានលម្អិត" maxWidth="850px">
    <div class="view-card-wrapper">
      
      <div class="view-header">
        <div class="brand-pill">
          <div class="pulse-dot"></div>
          <span class="brand-name">REABLIST</span>
        </div>
        <div class="priority-tag" :class="priorityClass">
          អាទិភាព: {{ task?.priority || "មធ្យម" }}
        </div>
      </div>

      <div class="view-layout">
        <div class="view-main">
          <div class="title-container">
            <h1 class="task-title-display">{{ task?.title || "Prepare Slides" }}</h1>
            <div class="metadata-row">
              <div class="meta-capsule">
                <span class="meta-icon">📅</span>
                {{ task?.date || "—" }}
              </div>
              <div class="meta-capsule">
                <span class="meta-icon">⏰</span>
                {{ task?.time || "—" }}
              </div>
            </div>
          </div>

          <div class="notes-area">
            <div class="block-label">កំណត់ចំណាំ</div>
            <div class="notes-paper">
<p v-if="((task?.content ?? task?.notes) || '').trim()">
  {{ (task?.content ?? task?.notes).trim() }}
</p>


              <div v-else class="empty-notes">មិនមានកំណត់ចំណាំបន្ថែម...</div>
            </div>
          </div>
        </div>

        <div class="view-sidebar">
          <div class="sidebar-block">
            <div class="block-label">ប្រភេទ</div>
            <div class="category-text">{{ task?.category || "សិក្សា" }}</div>
          </div>

          <div class="sidebar-block status-block" :class="{ completed: task?.isCompleted }">
            <div class="block-label">ស្ថានភាព</div>
            <div class="status-indicator-wrap">
              <div class="status-icon-box">
                <svg v-if="task?.isCompleted" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none"><path d="M20 6L9 17L4 12"/></svg>
                <span v-else class="progress-dot"></span>
              </div>
              <span>{{ task?.isCompleted ? "បានបញ្ចប់" : "កំពុងដំណើរការ" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
<div class="view-footer">
    <button type="button" class="btn-cancel-modern" @click="close">បិទ</button>

    <div class="action-buttons">
      <button type="button" class="btn-edit-modern" @click="editNow">កែប្រែ</button>

      <button
        type="button"
        class="btn-done-modern"
        :disabled="task?.isCompleted"
        @click="markDone"
      >
        {{ task?.isCompleted ? "បញ្ចប់រួចរាល់" : "សម្គាល់ថាបានបញ្ចប់" }}
      </button>
    </div>
  </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from "vue";
import BaseModal from "@/components/base/BaseModal.vue";
import api from "@/API/api";

const props = defineProps({
  task: { type: Object, required: true },
});

const emit = defineEmits(["mark-completed", "edit-task"]);
const modalRef = ref(null);

const open = () => modalRef.value?.open();
const close = () => modalRef.value?.close();
defineExpose({ open, close });

const priorityClass = computed(() => {
  if (props.task?.priority === "ខ្ពស់") return "high";
  if (props.task?.priority === "មធ្យម") return "medium";
  return "low";
});



const normalizeDate = (val) => {
  if (!val) return "";

  // already ok: 2026-02-06
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;

  // API format: 02/06/2026
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
    const [mm, dd, yyyy] = val.split("/");
    return `${yyyy}-${mm}-${dd}`;
  }

  // ISO format: 2026-02-06T00:00:00.000Z
  if (val.includes("T")) return val.split("T")[0];

  return val;
};

const normalizeTime = (val) => {
  if (!val) return "";

  // API: 17:52:00 -> 17:52
  if (/^\d{2}:\d{2}:\d{2}$/.test(val)) return val.slice(0, 5);

  // already ok: 17:52
  if (/^\d{2}:\d{2}$/.test(val)) return val;

  return val;
};


const markDone = () => {
  emit("mark-completed", props.task);
  close();
};

const editNow = () => {
  emit("edit-task", props.task);
  close();
};
</script>

<style scoped>
.view-card-wrapper {
  padding: 5px;
  color: #1e293b;
}

/* Header */
.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.brand-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f1f5f9;
  padding: 8px 16px;
  border-radius: 30px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #0d9488;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.4);
  animation: pulse-ring 1.5s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(13, 148, 136, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
}

.brand-name {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #0d9488;
}

.priority-tag {
  font-size: 12px;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 10px;
}
.priority-tag.high { background: #fee2e2; color: #dc2626; }
.priority-tag.medium { background: #fef3c7; color: #d97706; }
.priority-tag.low { background: #dcfce7; color: #16a34a; }

/* Layout */
.view-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 30px;
}

/* Main Content */
.task-title-display {
  font-size: 32px;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 15px;
  line-height: 1.2;
}

.metadata-row {
  display: flex;
  gap: 10px;
}

.meta-capsule {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #475569;
}

.notes-area {
  margin-top: 35px;
}

.section-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.notes-paper {
  background: #ffffff;
  border: 1.5px solid #f1f5f9;
  border-radius: 20px;
  padding: 20px;
  min-height: 180px;
  font-size: 16px;
  line-height: 1.6;
  color: #334155;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
}

.empty-notes {
  color: #cbd5e1;
  font-style: italic;
}

/* Sidebar */
.view-sidebar {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar-block {
  background: #f8fafc;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid transparent;
}

.block-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0d9488;
  letter-spacing: 1px;
  margin-bottom: 6px;
  display: block;
}

.category-text {
  font-size: 16px;
  font-weight: 800;
  color: #1e293b;
}

.status-block.completed {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.status-indicator-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
}

.status-icon-box {
  width: 24px;
  height: 24px;
  background: #ffffff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.progress-dot {
  width: 6px;
  height: 6px;
  background: #0d9488;
  border-radius: 50%;
}

/* ===== Footer layout ===== */
.view-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding-top: 8px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

/* ===== Modern button base ===== */
.btn-cancel-modern,
.btn-edit-modern,
.btn-done-modern {
  border: none;
  outline: none;
  border-radius: 20px;
  font-weight: 900;
  padding: 12px 18px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
  cursor: pointer;
  white-space: nowrap;
}

/* ===== Cancel button (soft gray) ===== */
.btn-cancel-modern {
  background: #f8fafc;
  color: #0f172a;
  border: 2px solid #e2e8f0;
}

.btn-cancel-modern:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px -18px rgba(15, 23, 42, 0.18);
}

/* ===== Edit button (outline teal) ===== */
.btn-edit-modern {
  background: #fff;
  color: #0d9488;
  border: 2px solid rgba(13, 148, 136, 0.25);
}

.btn-edit-modern:hover {
  transform: translateY(-1px);
  border-color: rgba(13, 148, 136, 0.5);
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.45);
}

/* ===== Done button (gradient like CreateTask) ===== */
.btn-done-modern {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  min-width: 220px;
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.5);
}

.btn-done-modern:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 18px 34px -18px rgba(13, 148, 136, 0.65);
}

.btn-done-modern:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

/* Responsive for mobile */
@media (max-width: 576px) {
  .view-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn-cancel-modern,
  .btn-edit-modern,
  .btn-done-modern {
    width: 100%;
  }

  .btn-done-modern {
    min-width: unset;
  }
}

</style>