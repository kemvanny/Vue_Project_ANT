<template>
  <div class="modal fade" id="deleteTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 450px;">
      <div class="modal-content border-0 text-center" style="border-radius: 28px; padding: 40px;">
        <div class="icon-circle-delete mb-4 mx-auto">
          <i class="far fa-trash-alt"></i>
        </div>
        <h3 class="fw-700 mb-2" style="color: #1e293b;">Are you sure?</h3>
        <p class="text-muted small mb-4">
          This action will permanently remove <br>
          <strong>"{{ task.name }}"</strong>
        </p>
        <div class="d-flex gap-2">
          <button class="btn-cancel-simple w-100" data-bs-dismiss="modal">No, Keep it</button>
          <button class="btn-confirm-delete w-100" @click="confirmDelete">Yes, Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: { type: Object, default: () => ({}) }
});

const confirmDelete = () => {
  console.log("Deleting task ID:", props.task.id);
  // Add logic to remove from task array
  const modal = bootstrap.Modal.getInstance(document.getElementById('deleteTaskModal'));
  modal.hide();
};
</script>

<style scoped>
.icon-circle-delete { background: #fff1f2; color: #e11d48; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; }
.btn-cancel-simple { background: #f1f5f9; color: #475569; border: none; padding: 12px; border-radius: 14px; font-weight: 600; }
.btn-confirm-delete { background: #e11d48; color: #ffffff; border: none; padding: 12px; border-radius: 14px; font-weight: 600; }
.btn-confirm-delete:hover { background: #be123c; }
</style>