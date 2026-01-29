<template>
  <div class="task-ledger-container p-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="task-ledger-title mb-1">{{ title }}</h1>
        <p class="text-muted small mb-0">{{ subtitle }}</p>
      </div>

      <button class="btn-register-solid" @click="$emit('create-task')">
        <i class="fas fa-plus me-2"></i>
        បង្កើតភារកិច្ចថ្មី
      </button>
    </div>

    <!-- Task List -->
    <div class="task-list-card">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-row"
        @click="$emit('view-task', task)"
      >
        <div class="flex-grow-1 ms-3">
          <div class="task-name">{{ task.name }}</div>
          <span class="task-meta">{{ task.date }}</span>
        </div>
      </div>

      <div v-if="tasks.length === 0" class="p-5 text-center text-muted small">
        មិនមានភារកិច្ចទេ
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: "បញ្ជីគ្រប់គ្រងភារកិច្ច" },
  subtitle: {
    type: String,
    default: "ប្រព័ន្ធសមកាលកម្មភារកិច្ចពេលវេលាពិតកំពុងដំណើរការ។",
  },
  tasks: Array,
});

defineEmits(["create-task", "view-task"]);
</script>

<style scoped>
/* Main Titles */
.task-ledger-title {
  color: #1a1a1a;
  letter-spacing: -0.5px;
  font-weight: 700;
  font-size: 1.75rem;
}

/* Status Filter Buttons */
.status-capsule-group {
  display: flex;
  border-radius: 50px;
  background-color: #f8fafc;
  padding: 4px;
}
.status-btn {
  border: none;
  background: transparent;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  transition: all 0.2s ease;
}
.status-btn.active {
  background: white;
  color: #1a1a1a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
/* Register Button (Outline Style) */
.btn-register-solid {
  background-color: transparent; /* Remove fill */
  color: #059669; /* Emerald text color */
  border: 2px solid #059669; /* Solid border instead of fill */
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
  background-color: #059669; /* Fills with color on hover */
  color: #ffffff; /* Text turns white */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
}

.btn-register-solid:active {
  transform: translateY(0px);
}

/* Priority Pills */
.priority-filter-bar {
  display: flex;
  gap: 12px;
  padding: 12px 18px;
}
.priority-pill {
  padding: 8px 22px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 50px;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.priority-pill.active {
  border-color: #0d9488;
  color: #0d9488;
  background-color: #f0fdfa;
}

/* Task Row Styling */
.task-list-card {
  background: white;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}
.task-row {
  display: flex;
  align-items: center;
  padding: 24px 30px;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s ease;
  cursor: pointer;
}
.task-row:hover {
  background-color: #fcfdfe;
}
.task-row:last-child {
  border-bottom: none;
}

.task-name {
  font-size: 1.1rem;
  color: #1e293b;
  font-weight: 400;
}
.task-completed-text {
  text-decoration: line-through;
  color: #94a3b8;
  opacity: 0.7;
}
.task-meta {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 400;
}
.priority-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 400;
  letter-spacing: 0.5px;
}

/* Icons & Checks */
.custom-check {
  width: 26px;
  height: 26px;
  border: 2.5px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.custom-check.is-checked {
  background-color: #10b981;
  border-color: #10b981;
  color: white;
}
.priority-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-high {
  background-color: #ef4444;
}
.dot-medium {
  background-color: #f59e0b;
}
.dot-low {
  background-color: #10b981;
}
</style>