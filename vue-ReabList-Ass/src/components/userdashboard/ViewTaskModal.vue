<template>
  <div class="modal fade" id="viewTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 600px;">
      <div class="modal-content modal-content-custom">
        
        <div class="d-flex justify-content-between align-items-center mb-4">
          <span :class="['priority-badge', getPriorityClass(task.priority)]">
            {{ task.priority }} Priority
          </span>
          <div class="d-flex gap-2">
            <button class="btn-icon-delete" data-bs-toggle="modal" data-bs-target="#deleteTaskModal">
              <i class="far fa-trash-alt"></i>
            </button>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
          </div>
        </div>

        <h2 class="task-display-name mb-4">{{ task.name }}</h2>

        <div class="row g-3 mb-4">
          <div class="col-6">
            <div class="meta-card">
              <label class="meta-label">Date</label>
              <div class="meta-value">{{ task.date }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="meta-card">
              <label class="meta-label">Ref-ID</label>
              <div class="meta-value">#RED-01</div>
            </div>
          </div>
        </div>

        <div class="meta-card mb-5">
          <label class="meta-label">Note</label>
          <p class="meta-value mb-0">Focus on the data visualizations part.</p>
        </div>

        <div class="d-flex gap-3">
          <button class="btn-action-dark w-100" data-bs-toggle="modal" data-bs-target="#editTaskModal">
            <i class="fas fa-edit me-2"></i> Edited Tasks
          </button>
          <button class="btn-action-teal w-100" data-bs-dismiss="modal">
            <i class="fas fa-check me-2"></i> Mark Completed
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: { type: Object, default: () => ({}) }
});

const getPriorityClass = (priority) => {
  const p = priority?.toLowerCase();
  if (p === 'high') return 'badge-high';
  if (p === 'medium') return 'badge-medium';
  return 'badge-low';
};

const handleComplete = () => {
  // Logic to mark as complete
  console.log("Task marked as completed:", props.task.id);
};
</script>

<style scoped>
.modal-content-custom {
  border: none;
  border-radius: 32px;
  padding: 40px;
  background: #ffffff;
}

.priority-badge {
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.8rem;
}

.badge-high { background: #eff6ff; color: #2563eb; }
.badge-medium { background: #fffbeb; color: #d97706; }
.badge-low { background: #f0fdf4; color: #16a34a; }

.btn-icon-delete {
  background: #fff1f2;
  color: #e11d48;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-display-name {
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 400; /* Normal weight as requested */
}

.meta-card {
  background: #f8fafc;
  padding: 16px;
  border-radius: 16px;
}

.meta-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0d9488;
  margin-bottom: 4px;
}

.meta-value {
  color: #64748b;
  font-size: 0.9rem;
}

.btn-action-dark {
  background: #1e293b;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
}

.btn-action-teal {
  background: #0d9488;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
}
</style>