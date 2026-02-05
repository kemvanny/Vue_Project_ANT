<template>
  <div class="modal fade" id="editTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 650px;">
      <div class="modal-content modal-content-modern">
        <div class="modal-header-modern mb-4">
          <div class="d-flex align-items-center gap-3">
            <div class="icon-box-teal">
              <i class="fas fa-edit"></i>
            </div>
            <div>
              <h2 class="fw-700 mb-0" style="color: #1e293b;">Update Task Details</h2>
              <p class="text-muted small mb-0">Modifying record #REAB-1</p>
            </div>
          </div>
        </div>

        <div class="modal-body p-0">
          <form @submit.prevent="handleUpdate">
            <div class="form-group-modern mb-4">
              <label class="label-modern">Task Title</label>
              <input v-model="localTask.name" type="text" class="input-modern" required>
            </div>

            <div class="row g-4 mb-4">
              <div class="col-md-6">
                <label class="label-modern">Date</label>
                <input v-model="localTask.date" type="date" class="input-modern">
              </div>
              <div class="col-md-6">
                <label class="label-modern">Classification</label>
                <select v-model="localTask.category" class="input-modern">
                  <option v-for="cat in ['Personal', 'Work', 'Study']" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group-modern mb-5">
              <label class="label-modern">Notes</label>
              <textarea v-model="localTask.notes" class="input-modern" rows="3"></textarea>
            </div>

            <div class="d-flex gap-3">
              <button type="button" class="btn-cancel w-100" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn-save w-100">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  task: { type: Object, default: () => ({}) }
});

const localTask = ref({ ...props.task });

// Sync local state when the prop changes
watch(() => props.task, (newVal) => {
  localTask.value = { ...newVal };
}, { deep: true });

const handleUpdate = () => {
  console.log("Updating task:", localTask.value);
  // Add your logic to save to database here
  const modal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
  modal.hide();
};
</script>

<style scoped>
.modal-content-modern { border: none; border-radius: 32px; padding: 40px; background: #ffffff; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); }
.icon-box-teal { background: #f0fdfa; color: #0d9488; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
.label-modern { display: block; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #0d9488; margin-bottom: 8px; letter-spacing: 0.5px; }
.input-modern { width: 100%; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 14px 20px; font-size: 0.95rem; color: #1e293b; transition: all 0.2s; }
.input-modern:focus { outline: none; border-color: #0d9488; background: #f0fdfa; }
.btn-cancel { background: #ffffff; color: #64748b; border: 2px solid #e2e8f0; padding: 14px; border-radius: 16px; font-weight: 600; transition: 0.2s; }
.btn-cancel:hover { background: #f1f5f9; }
.btn-save { background: #2563eb; color: #ffffff; border: none; padding: 14px; border-radius: 16px; font-weight: 600; transition: 0.2s; }
.btn-save:hover { background: #1d4ed8; transform: translateY(-2px); }
</style>