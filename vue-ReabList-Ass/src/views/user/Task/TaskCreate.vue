<template>
  <BaseModal ref="modalRef" id="addTaskModal" title="បង្កើតភារកិច្ចថ្មី" maxWidth="700px">
    <form @submit.prevent="createTask">
      <div class="mb-3">
        <label class="label-modern">ចំណងជើង Task</label>
        <input v-model.trim="form.title" class="input-modern" required />
      </div>
      <!-- Notes / Content -->
      <div class="mb-3">
        <label class="label-modern">កំណត់ចំណាំ</label>
        <textarea
          v-model.trim="form.notes"
          class="input-modern"
          rows="3"
          placeholder="សរសេរព័ត៌មានបន្ថែម..."
        />
      </div>


      <div class="row g-3">
        <div class="col-md-6">
          <label class="label-modern">កាលបរិច្ឆេទ</label>
          <input v-model="form.date" type="date" class="input-modern" required />
        </div>

        <div class="col-md-6">
          <label class="label-modern">ម៉ោង</label>
          <input v-model="form.time" type="time" class="input-modern" required />
        </div>

        <div class="col-md-6">
          <BaseSelect
            label="ប្រភេទ"
            v-model="form.category"
            :options="categoryOptions"
          />
        </div>

        <div class="col-md-6">
          <BaseSelect
            label="អាទិភាព"
            v-model="form.priority"
            :options="priorityOptions"
            :showDots="true"
          />
        </div>
      </div>

      <button class="btn-submit-modern mt-3">
        បញ្ជូលភារកិច្ច
      </button>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from "vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

const modalRef = ref(null);

const categoryOptions = [
  { value: "ការងារ", label: "ការងារ" },
  { value: "ផ្ទាល់ខ្លួន", label: "ផ្ទាល់ខ្លួន" },
  { value: "សិក្សា", label: "សិក្សា" },

];

const priorityOptions = [
  { value: "ខ្ពស់", label: "ខ្ពស់" },
  { value: "មធ្យម", label: "មធ្យម" },
  { value: "ទាប", label: "ទាប" },
];

const form = ref({
  title: "",
  notes: "",
  date: "",
  time: "",
  category: "ការងារ",
  priority: "មធ្យម",
});

const resetForm = () => {
  form.value = {
    title: "",
    notes: "",
    date: "",
    time: "",
    category: "ការងារ",
    priority: "មធ្យម",
  };
};

const createTask = () => {
  const key = "reablist_tasks";
  const newTask = {
    id: Date.now(),
    ...form.value,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const old = JSON.parse(localStorage.getItem(key) || "[]");
  old.unshift(newTask);
  localStorage.setItem(key, JSON.stringify(old));

  modalRef.value?.close();
};

const open = () => {
  resetForm();
  modalRef.value?.open();
};

const close = () => {
  modalRef.value?.close();
};

defineExpose({ open, close });
</script>

<style scoped>
.input-modern {
  width: 100%;
  background: #f8fafc;
  border: 2px solid transparent;
  border-radius: 18px;
  padding: 14px 20px;
  font-weight: 700;
  transition: 0.3s;
}
.input-modern:focus {
  border-color: #0d9488;
  outline: none;
  background: #fff;
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.5);
}
.label-modern {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0d9488;
  letter-spacing: 1px;
  margin-bottom: 6px;
  display: block;
}
.btn-submit-modern {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  width: 100%;
  padding: 18px;
  border-radius: 20px;
  font-weight: 800;
}
</style>
