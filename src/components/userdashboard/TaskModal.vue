<template>
  <div class="modal fade modal-glass" id="addTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 650px;">
      <div class="modal-content modal-content-modern">
        <div class="modal-header-modern">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="pulse-dot-active"></span>
                <span class="label-modern m-0">System Entry</span>
              </div>
              <h2 class="fw-800 mb-0">Create New Task</h2>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
        </div>
        <div class="modal-body modal-body-modern">
          <form @submit.prevent="handleSubmit">
            <div class="form-group-modern">
              <label class="label-modern">Task Title</label>
              <input v-model="form.title" type="text" class="input-modern" placeholder="e.g., Design System Architecture" required>
            </div>

            <div class="form-group-modern">
              <label class="label-modern">Context & Notes</label>
              <textarea v-model="form.notes" class="input-modern" rows="3" placeholder="Describe the objectives..."></textarea>
            </div>

            <div class="row g-4 mb-4">
              <div class="col-md-5">
                <label class="label-modern">Schedule Date</label>
                <input v-model="form.date" type="date" class="input-modern">
              </div>
              
              <div class="col-md-7">
                <label class="label-modern">Classification</label>
                <div class="category-toggle-group">
                  <label v-for="cat in ['Personal', 'Study', 'Work']" :key="cat" 
                         :class="['category-chip', { active: form.category === cat }]">
                    <input type="radio" v-model="form.category" :value="cat" class="category-radio">
                    {{ cat }}
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" class="btn-submit-modern">
              <PlusCircle :size="20" />
              <span class="ms-2">Register Task</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { PlusCircle } from 'lucide-vue-next';

const form = ref({
  title: '',
  notes: '',
  date: '',
  category: 'Personal'
  
});

const handleSubmit = () => {
  console.log("New Task Data:", form.value);


  // Close the modal using Bootstrap instance
  const modalElement = document.getElementById('addTaskModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  modal.hide();

  // Reset form
  form.value = { title: '', notes: '', date: '', category: 'Personal' };
};
</script>

<style scoped>
.modal-content-modern { border: none; border-radius: 35px; background: #ffffff; padding: 40px; box-shadow: 0 30px 60px -12px rgba(0,0,0,0.15); }
.modal-header-modern { margin-bottom: 30px; }
.form-group-modern { margin-bottom: 25px; }
.label-modern { display: block; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0d9488; margin-bottom: 10px; margin-left: 5px; }
.input-modern { width: 100%; background: #f8fafc; border: 2px solid transparent; border-radius: 18px; padding: 16px 22px; font-size: 15px; font-weight: 600; color: #1e293b; transition: all 0.3s ease; }
.input-modern:focus { outline: none; background: #ffffff; border-color: #0d9488; box-shadow: 0 10px 20px -5px rgba(13, 148, 136, 0.1); }
.category-toggle-group { display: flex; background: #f1f5f9; padding: 6px; border-radius: 16px; gap: 6px; }
.category-chip { flex: 1; padding: 10px; text-align: center; border-radius: 12px; cursor: pointer; font-weight: 700; font-size: 13px; color: #64748b; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.category-chip.active { background: #ffffff; color: #0d9488; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.category-radio { display: none; }
.btn-submit-modern { background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%); color: #ffffff; border: none; width: 100%; padding: 18px; border-radius: 20px; font-weight: 800; font-size: 16px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
.pulse-dot-active { width: 8px; height: 8px; background: #0d9488; border-radius: 50%; display: inline-block; }
</style>