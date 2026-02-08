<template>
  <BaseModal ref="modalRef" id="viewTaskModal" @close="close" title="ព័ត៌មានលម្អិត" maxWidth="850px">
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
                <Calendar class="meta-icon" :size="16" />
                <span>{{ task?.date || "—" }}</span>
              </div>
              <div class="meta-capsule">
                <Clock class="meta-icon" :size="16" />
                <span>{{ task?.time || "—" }}</span>
              </div>
            </div>
          </div>

          <div class="notes-area">
            <div class="block-label d-flex align-items-center gap-2">
              <StickyNote :size="14" /> កំណត់ចំណាំ
            </div>
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
            <div class="category-display">
              <div class="cat-icon-box">
                <Tag :size="18" />
              </div>
              <div class="category-text">{{ task?.category || "សិក្សា" }}</div>
            </div>
          </div>

          <div class="sidebar-block status-block" :class="{ completed: task?.isCompleted }">
            <div class="block-label">ស្ថានភាព</div>
            <div class="status-indicator-wrap">
              <div class="status-icon-box">
                <CheckCircle v-if="task?.isCompleted" :size="16" stroke-width="3" />
                <div v-else class="progress-dot"></div>
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
          <button type="button" class="btn-edit-modern" @click="editNow">
            <Edit2 :size="16" class="me-2" /> កែប្រែ
          </button>

          <button
            type="button"
            class="btn-done-modern"
            :disabled="task?.isCompleted"
            @click="markDone"
          >
            <Check v-if="!task?.isCompleted" :size="18" class="me-2" />
            {{ task?.isCompleted ? "បញ្ចប់រួចរាល់" : "សម្គាល់ថាបានបញ្ចប់" }}
          </button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // Add this
import { useRouter } from "vue-router"; // Add this for navigation after closing
import { useNoteStore } from "@/stores/note"; // Add this
import BaseModal from "@/components/base/BaseModal.vue";
import { watch } from "vue";

import { 
  Calendar, 
  Clock, 
  StickyNote, 
  Tag, 
  CheckCircle, 
  Edit2, 
  Check 
} from "lucide-vue-next";

// 1. Setup Route and Store
const route = useRoute();
const noteStore = useNoteStore();
const router = useRouter();

// 2. We will use the store's selectedNote instead of props
const task = computed(() => noteStore.selectedNote);

const emit = defineEmits(["mark-completed", "edit-task"]);
const modalRef = ref(null);

// 3. Auto-open modal when the page loads
onMounted(async () => {
  const taskId = route.params.id;
  
  // If notes aren't loaded (e.g. after a refresh), load them first
  if (noteStore.notes.length === 0) {
    await noteStore.fetchAllNotes();
  }

  if (taskId) {
    await noteStore.openNote(taskId);
    modalRef.value?.open();
  }
});

const open = () => modalRef.value?.open();

const close = () => {
  // 1. Close the UI modal
  if (modalRef.value) {
    modalRef.value.close();
  }

  // 2. Clear the data from the store
  noteStore.selectedNote = null;
  // 3. Navigate back to the main tasks page (optional, but keeps URL clean)
  if (route.params.id) {
    router.push({ name: "all-tasks" });
  }
};

defineExpose({ open, close });

const priorityClass = computed(() => {
  if (task.value?.priority === "ខ្ពស់") return "high";
  if (task.value?.priority === "មធ្យម") return "medium";
  return "low";
});

const markDone = async () => {
  if (!task.value) return;
  task.value.isCompleted = true; // reactive
  noteStore.toggleNoteCompleted(task.value.id);
};


const editNow = () => {
  emit("edit-task", task.value);
  close();
};


// Watch the route: if the ID disappears, close the modal automatically
watch(
  () => route.params.id,
  (newId) => {
    if (!newId && modalRef.value) {
      modalRef.value.close();
      noteStore.selectedNote = null;
    }
  }
);

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
  gap: 12px;
}

.meta-capsule {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #475569;
}

.meta-icon {
  color: #0d9488;
}

.notes-area {
  margin-top: 35px;
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
}

.block-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0d9488;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.category-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cat-icon-box {
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 8px;
  display: grid;
  place-items: center;
  color: #0d9488;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.category-text {
  font-size: 16px;
  font-weight: 800;
  color: #1e293b;
}

.status-block.completed {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
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
  background: white;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.progress-dot {
  width: 6px;
  height: 6px;
  background: #0d9488;
  border-radius: 50%;
}

/* Footer Actions */
.view-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-cancel-modern,
.btn-edit-modern,
.btn-done-modern {
  border-radius: 20px;
  font-weight: 900;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.btn-cancel-modern {
  background: #f8fafc;
  color: #0f172a;
  border: 2px solid #e2e8f0;
}

.btn-edit-modern {
  background: #fff;
  color: #0d9488;
  border: 2px solid rgba(13, 148, 136, 0.25);
}

.btn-done-modern {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  min-width: 200px;
  justify-content: center;
  box-shadow: 0 10px 20px -10px rgba(13, 148, 136, 0.5);
}

.btn-done-modern:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.me-2 { margin-right: 8px; }

@media (max-width: 768px) {
  .view-layout { grid-template-columns: 1fr; }
  .view-footer { flex-direction: column; gap: 15px; }
  .action-buttons { width: 100%; flex-direction: column; }
  .btn-done-modern { min-width: 100%; }
}
</style>