<template>
  <BaseModal ref="modalRef" id="editTaskModal" title="កែប្រែភារកិច្ច" maxWidth="700px">
    <form @submit.prevent="updateTask">
      <div class="mb-3">
        <label class="label-modern">ចំណងជើង Task</label>
        <input v-model.trim="form.title" class="input-modern" required />
      </div>

      <div class="mb-3">
        <label class="label-modern">កំណត់ចំណាំ</label>

        <!-- ✅ textarea MUST NOT self-close -->
        <textarea
          v-model.trim="form.notes"
          class="input-modern"
          rows="3"
          placeholder="សរសេរព័ត៌មានបន្ថែម..."
          style="resize: none"
        ></textarea>
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

      <p v-if="error" class="text-danger mt-3 mb-0">{{ error }}</p>
    </form>

    <!-- ✅ footer slot MUST be outside form -->
    <template #footer>
<div class="update-footer">
    <button type="button" class="btn-cancel-modern" @click="close">
      បិទ
    </button>

    <button type="button" class="btn-done-modern" @click="updateTask">
      រក្សាទុក
    </button>
  </div>
    </template>
    
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

const props = defineProps({
  task: { type: Object, default: null },
});

const emit = defineEmits(["updated"]);

const modalRef = ref(null);
const error = ref("");

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
  id: null,
  title: "",
  notes: "",
  date: "",
  time: "",
  category: "ការងារ",
  priority: "មធ្យម",
});

watch(
  () => props.task,
  (t) => {
    if (!t) return;

    form.value = {
      id: t.id ?? null,
      title: t.title ?? "",
      notes: t.notes ?? "",
      date: t.date ?? "",
      time: t.time ?? "",
      category: t.category ?? "ការងារ",
      priority: t.priority ?? "មធ្យម",
    };

    error.value = "";
  },
  { immediate: true }
);

const updateTask = () => {
  error.value = "";

  if (!form.value.title?.trim()) {
    error.value = "សូមបញ្ចូលចំណងជើង";
    return;
  }
  if (!form.value.id) {
    error.value = "មិនអាចរក Task ID បានទេ";
    return;
  }

  const key = "reablist_tasks";
  const list = JSON.parse(localStorage.getItem(key) || "[]");

  const updatedTask = {
    ...props.task,
    ...form.value,
    updatedAt: new Date().toISOString(),
  };

  const newList = list.map((t) => (t.id === form.value.id ? updatedTask : t));
  localStorage.setItem(key, JSON.stringify(newList));

  emit("updated", updatedTask);
  close();
};

const open = () => modalRef.value?.open();
const close = () => modalRef.value?.close();

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

/* ===== Footer layout ===== */
.update-footer {
  display: flex;
  gap: 12px;
  width: 100%;
}

/* ===== Cancel button ===== */
.btn-cancel-modern {
  width: 50%;
  background: #f8fafc;
  color: #0f172a;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  font-weight: 900;
  padding: 14px 18px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.btn-cancel-modern:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px -18px rgba(15, 23, 42, 0.18);
}

/* ===== Save button (gradient like CreateTask) ===== */
.btn-done-modern {
  width: 50%;
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 900;
  padding: 14px 18px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
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



</style>
