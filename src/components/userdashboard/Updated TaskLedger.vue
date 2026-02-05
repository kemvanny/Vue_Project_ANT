<template>
  <div class="task-ledger-container p-4">
    <TaskModal />
    <ViewTaskModal :task="activeTask" @edit-request="showEditModal" @delete-request="showDeleteModal" />
    <EditTaskModal :task="activeTask" />
    <DeleteConfirmModal :task="activeTask" />
  </div>
</template>

<script setup>
// ... existing imports ...
import EditTaskModal from './EditTaskModal.vue';
import DeleteConfirmModal from './DeleteConfirmModal.vue';

const showEditModal = () => {
  bootstrap.Modal.getOrCreateInstance(document.getElementById('editTaskModal')).show();
};

const showDeleteModal = () => {
  bootstrap.Modal.getOrCreateInstance(document.getElementById('deleteTaskModal')).show();
};
</script>