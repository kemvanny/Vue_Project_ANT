<template>
  <div class="task-ledger-container p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="task-ledger-title mb-1">{{ title }}</h1>
        <p class="text-muted small mb-0">{{ subtitle }}</p>
      </div>
      
      <div class="d-flex gap-3 align-items-center">
        <div v-if="showStatusFilter" class="status-capsule-group p-1 bg-white border">
          <button 
            v-for="status in ['all', 'pending', 'completed']" 
            :key="status"
            :class="['status-btn', { active: currentStatus === status }]"
            @click="currentStatus = status"
          >
            {{ status.charAt(0).toUpperCase() + status.slice(1) }}
          </button>
        </div>

        <button 
          class="btn-register-solid"
          data-bs-toggle="modal" 
          data-bs-target="#addTaskModal"
        >
          <i class="fas fa-plus me-2"></i> Register New Task
        </button>
      </div>
    </div>

    <div class="priority-filter-bar mb-4">
      <div 
        v-for="p in ['High', 'Medium', 'Low']" 
        :key="p"
        :class="['priority-pill', { active: selectedPriority === p }]"
        @click="selectedPriority = p"
      >
        {{ p }} Priority
      </div>
    </div>

    <div class="task-list-card">
      <div v-for="task in filteredTasks" 
           :key="task.id" 
           class="task-row"
           @click="selectTask(task)"
           data-bs-toggle="modal" 
           data-bs-target="#viewTaskModal">
        
        <div class="checkbox-wrapper" @click.stop="task.completed = !task.completed">
          <div :class="['custom-check', { 'is-checked': task.completed }]">
            <i v-if="task.completed" class="fas fa-check"></i>
          </div>
        </div>
        
        <div class="flex-grow-1 ms-3">
          <div :class="['task-name', { 'task-completed-text': task.completed }]">
            {{ task.name }}
          </div>
          <div class="d-flex align-items-center gap-3 mt-1">
            <span class="task-meta">
              <i class="far fa-calendar-alt me-1"></i> {{ task.date }}
            </span>
            <div class="d-flex align-items-center gap-2">
              <div :class="['priority-dot', getPriorityClass(task.priority)]"></div>
              <span class="priority-label text-uppercase">{{ task.priority }}</span>
            </div>
          </div>
        </div>
        
        <div class="ms-auto text-muted opacity-25">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
      
      <div v-if="filteredTasks.length === 0" class="p-5 text-center text-muted small">
        No tasks found for "{{ currentStatus }}" matching "{{ selectedPriority }}" priority.
      </div>
    </div>

    <TaskModal />
    <ViewTaskModal :task="activeTask" />
    <EditTaskModal :task="activeTask" />
    <DeleteConfirmModal :task="activeTask" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Component Imports
import TaskModal from './TaskModal.vue';
import ViewTaskModal from './ViewTaskModal.vue';
import EditTaskModal from './EditTaskModal.vue';
import DeleteConfirmModal from './DeleteConfirmModal.vue';

const props = defineProps({
  title: { type: String, default: 'Task Ledger' },
  subtitle: { type: String, default: 'Secure real-time task synchronization active.' },
  initialStatus: { type: String, default: 'all' },
  showStatusFilter: { type: Boolean, default: true }
});

// State Management
const currentStatus = ref(props.initialStatus);
const selectedPriority = ref('High');
const activeTask = ref({}); // Data passed to View, Edit, and Delete modals

// Mock Data
const tasks = ref([
  { id: 1, name: "Finish Client Presentation", date: "2026-02-15", priority: "high", completed: false },
  { id: 2, name: "Weekly Team Sync", date: "2026-01-20", priority: "low", completed: true }
]);

// Methods
const selectTask = (task) => {
  activeTask.value = task;
};

const getPriorityClass = (priority) => {
  const p = priority.toLowerCase();
  if (p === 'high') return 'dot-high';
  if (p === 'medium') return 'dot-medium';
  return 'dot-low';
};

// Computed Filter Logic
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesStatus = currentStatus.value === 'all' || 
      (currentStatus.value === 'pending' && !task.completed) || 
      (currentStatus.value === 'completed' && task.completed);
    
    const matchesPriority = task.priority.toLowerCase() === selectedPriority.value.toLowerCase();
    
    return matchesStatus && matchesPriority;
  });
});
</script>

<style scoped>
/* Main Titles */
.task-ledger-title { color: #1a1a1a; letter-spacing: -0.5px; font-weight: 700; font-size: 1.75rem; }

/* Status Filter Buttons */
.status-capsule-group { display: flex; border-radius: 50px; background-color: #f8fafc; padding: 4px; }
.status-btn { border: none; background: transparent; padding: 8px 20px; border-radius: 50px; font-size: 0.85rem; color: #64748b; font-weight: 600; transition: all 0.2s ease; }
.status-btn.active { background: white; color: #1a1a1a; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
/* Register Button (Outline Style) */
.btn-register-solid {
  background-color: transparent; /* Remove fill */
  color: #059669;               /* Emerald text color */
  border: 2px solid #059669;    /* Solid border instead of fill */
  padding: 10px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-register-solid:hover {
  background-color: #059669;    /* Fills with color on hover */
  color: #ffffff;               /* Text turns white */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
}

.btn-register-solid:active {
  transform: translateY(0px);
}

/* Priority Pills */
.priority-filter-bar { display: flex; gap: 12px; padding: 12px 18px; }
.priority-pill { padding: 8px 22px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 50px; font-size: 0.85rem; color: #64748b; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.priority-pill.active { border-color: #0d9488; color: #0d9488; background-color: #f0fdfa; }

/* Task Row Styling */
.task-list-card { background: white; border-radius: 24px; border: 1px solid #f1f5f9; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); overflow: hidden; }
.task-row { display: flex; align-items: center; padding: 24px 30px; border-bottom: 1px solid #f1f5f9; transition: background 0.2s ease; cursor: pointer; }
.task-row:hover { background-color: #fcfdfe; }
.task-row:last-child { border-bottom: none; }

.task-name { font-size: 1.1rem; color: #1e293b; font-weight: 400; }
.task-completed-text { text-decoration: line-through; color: #94a3b8; opacity: 0.7; }
.task-meta { font-size: 0.8rem; color: #94a3b8; font-weight: 400; }
.priority-label { font-size: 0.75rem; color: #64748b; font-weight: 400; letter-spacing: 0.5px; }

/* Icons & Checks */
.custom-check { width: 26px; height: 26px; border: 2.5px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.custom-check.is-checked { background-color: #10b981; border-color: #10b981; color: white; }
.priority-dot { width: 10px; height: 10px; border-radius: 50%; }
.dot-high { background-color: #ef4444; }
.dot-medium { background-color: #f59e0b; }
.dot-low { background-color: #10b981; }
</style>