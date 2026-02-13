<template>
  <BaseModal
    ref="modalRef"
    id="editTaskModal"
    title="កែប្រែភារកិច្ច"
    maxWidth="700px"
    @close="close"
  >
    <form @submit.prevent="updateTask">
      
      <!-- TITLE -->
      <div class="mb-3">
        <label class="label-modern">ចំណងជើង Task</label>
        <input
          v-model.trim="form.title"
          @blur="touched.title = true"
          :class="['input-modern', { 'input-error': errors.title }]"
        />
        <small v-if="errors.title" class="error-text">
          {{ errors.title }}
        </small>
      </div>

      <!-- CONTENT -->
      <div class="mb-3">
        <label class="label-modern">កំណត់ចំណាំ</label>
        <textarea
          v-model.trim="form.content"
          rows="3"
          style="resize: none"
          @blur="touched.content = true"
          :class="['input-modern', { 'input-error': errors.content }]"
        ></textarea>
        <small v-if="errors.content" class="error-text">
          {{ errors.content }}
        </small>
      </div>

      <div class="row g-3">
        <!-- DATE -->
        <div class="col-md-6">
          <label class="label-modern">កាលបរិច្ឆេទ</label>
          <input
            v-model="form.date"
            type="date"
            @blur="touched.date = true"
            :class="['input-modern', { 'input-error': errors.date }]"
          />
          <small v-if="errors.date" class="error-text">
            {{ errors.date }}
          </small>
        </div>

        <!-- TIME -->
        <div class="col-md-6">
          <label class="label-modern">ម៉ោង</label>
          <input
            v-model="form.time"
            type="time"
            @blur="touched.time = true"
            :class="['input-modern', { 'input-error': errors.time }]"
          />
          <small v-if="errors.time" class="error-text">
            {{ errors.time }}
          </small>
        </div>

        <!-- CATEGORY -->
        <div class="col-md-6">
          <BaseSelect
            label="ប្រភេទ"
            v-model="form.category"
            :options="categoryOptions"
            @blur="touched.category = true"
          />
          <small v-if="errors.category" class="error-text">
            {{ errors.category }}
          </small>
        </div>

        <!-- PRIORITY -->
        <div class="col-md-6">
          <BaseSelect
            label="អាទិភាព"
            v-model="form.priority"
            :options="priorityOptions"
            :showDots="true"
            @blur="touched.priority = true"
          />
          <small v-if="errors.priority" class="error-text">
            {{ errors.priority }}
          </small>
        </div>
      </div>
    </form>

    <template #footer>
      <div class="update-footer">
        <button type="button" class="btn-cancel-modern" @click="close">
          បិទ
        </button>

        <AuthButton
          :type="'submit'"
          text="រក្សាទុក"
          loading-text="កំពុងរក្សាទុក..."
          :loading="loading"
          class="btn-done-modern"
          @click="updateTask"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import AuthButton from "@/components/AuthButton.vue";
import api from "@/API/api";

const props = defineProps({
  task: { type: Object, default: null },
});

const emit = defineEmits(["updated"]);

const modalRef = ref(null);
const loading = ref(false);

/* ================= FORM ================= */
const form = ref({
  id: null,
  title: "",
  content: "",
  date: "",
  time: "",
  category: "ការងារ",
  priority: "មធ្យម",
});

/* ================= ERRORS ================= */
const errors = ref({});
const touched = ref({
  title: false,
  content: false,
  date: false,
  time: false,
  category: false,
  priority: false,
});

/* ================= OPTIONS ================= */
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

/* ================= VALIDATION ================= */
const validateField = (field, value) => {
  switch (field) {
    case "title":
      if (!value.trim()) return "សូមបញ្ចូលចំណងជើង";
      if (value.length < 3) return "ចំណងជើងត្រូវមានយ៉ាងតិច 3 អក្សរ";
      return "";

    case "content":
      if (!value.trim()) return "សូមបញ្ចូលពណ៌នា";
      return "";

    case "date":
      if (!value) return "សូមជ្រើសកាលបរិច្ឆេទ";
      return "";

    case "time":
      if (!value) return "សូមជ្រើសម៉ោង";
      return "";

    case "category":
      if (!value) return "សូមជ្រើសប្រភេទ";
      return "";

    case "priority":
      if (!value) return "សូមជ្រើសអាទិភាព";
      return "";

    default:
      return "";
  }
};

/* ================= WATCH REAL-TIME ================= */
watch(
  () => form.value,
  (val) => {
    Object.keys(val).forEach((field) => {
      if (touched.value[field]) {
        errors.value[field] = validateField(field, val[field]);
      }
    });
  },
  { deep: true }
);

/* ================= LOAD TASK ================= */
watch(
  () => props.task,
  (t) => {
    if (!t) return;

    form.value = {
      id: t.id ?? null,
      title: t.title ?? "",
      content: t.content ?? "",
      date: t.date ?? "",
      time: t.time ?? "",
      category: t.category ?? "ការងារ",
      priority: t.priority ?? "មធ្យម",
    };

    errors.value = {};
    Object.keys(touched.value).forEach((k) => (touched.value[k] = false));
  },
  { immediate: true }
);

/* ================= UPDATE TASK ================= */
const updateTask = async () => {
  Object.keys(form.value).forEach((field) => {
    touched.value[field] = true;
    errors.value[field] = validateField(field, form.value[field]);
  });

  const hasError = Object.values(errors.value).some((e) => e);
  if (hasError) return;

  loading.value = true;

  try {
    const priorityMap = { ខ្ពស់: "HIGH", មធ្យម: "MEDIUM", ទាប: "LOW" };
    const categoryMap = {
      ផ្ទាល់ខ្លួន: "PERSONAL",
      ការងារ: "WORK",
      សិក្សា: "SCHOOL",
    };

    const body = {
      title: form.value.title.trim(),
      content: form.value.content.trim(),
      date: form.value.date,
      time: form.value.time,
      priority: priorityMap[form.value.priority] || "MEDIUM",
      category: categoryMap[form.value.category] || "WORK",
    };

    await api.put(`/notes/${form.value.id}`, body);

    emit("updated");
    close();
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

const open = () => modalRef.value?.open();
const close = () => modalRef.value?.close();

defineExpose({ open, close });
</script>


<style scoped>
.input-error {
  border: 1px solid #ff4d4f !important;
  background: #fff1f0;
}

.error-text {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}
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
</style>
