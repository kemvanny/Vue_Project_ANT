<template>
  <BaseModal
    ref="modalRef"
    id="addTaskModal"
    title="បង្កើតភារកិច្ចថ្មី"
    maxWidth="700px"
  >
    <form @submit.prevent="createTask">
      <!-- TITLE -->
      <div class="mb-3">
        <label class="label-modern">ចំណងជើង</label>
        <input v-model.trim="form.title" class="input-modern" />
        <p v-if="errors.title" class="error-text">{{ errors.title }}</p>
      </div>

      <!-- CONTENT -->
      <div class="mb-3">
        <label class="label-modern">កំណត់ចំណាំ (optional)</label>
        <textarea
          v-model.trim="form.content"
          class="input-modern"
          rows="3"
          placeholder="សរសេរព័ត៌មានបន្ថែម..."
        ></textarea>
        <p v-if="errors.content" class="error-text">{{ errors.content }}</p>
      </div>

      <div class="row g-3 mb-4">
        <!-- DATE -->
        <div class="col-md-6">
          <label class="label-modern">កាលបរិច្ឆេទ</label>
          <input
            v-model="form.date"
            type="date"
            class="input-modern"
            :min="today"
          />
          <p v-if="errors.date" class="error-text">{{ errors.date }}</p>
        </div>

        <!-- TIME -->
        <div class="col-md-6">
          <label class="label-modern">ម៉ោង</label>
          <input v-model="form.time" type="time" class="input-modern" />
          <p v-if="errors.time" class="error-text">{{ errors.time }}</p>
        </div>

        <!-- CATEGORY -->
        <div class="col-md-6">
          <BaseSelect
            label="ប្រភេទ"
            v-model="form.category"
            :options="categoryOptions"
          />
          <p v-if="errors.category" class="error-text">{{ errors.category }}</p>
        </div>

        <!-- PRIORITY -->
        <div class="col-md-6">
          <BaseSelect
            label="អាទិភាព"
            v-model="form.priority"
            :options="priorityOptions"
            :showDots="true"
          />
          <p v-if="errors.priority" class="error-text">{{ errors.priority }}</p>
        </div>
      </div>

      <AuthButton
        type="submit"
        text="បញ្ជូលភារកិច្ច"
        loading-text="កំពុងបញ្ជូល..."
        :loading="loading"
        :disabled="hasErrors"
        class="btn-submit-modern mt-3"
      />
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";

import BaseModal from "@/components/base/BaseModal.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import AuthButton from "@/components/AuthButton.vue";
import { useNoteStore } from "@/stores/note";

/* ---------------- BASIC SETUP ---------------- */
const router = useRouter();
const noteStore = useNoteStore();
const emit = defineEmits(["created"]);

const modalRef = ref(null);
const loading = ref(false);
const errors = ref({});

const today = new Date().toISOString().slice(0, 10);

/* ---------------- OPTIONS ---------------- */
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

/* ---------------- FORM ---------------- */
const form = ref({
  title: "",
  content: "",
  date: "",
  time: "",
  category: "ការងារ",
  priority: "មធ្យម",
});

/* ---------------- ZOD SCHEMA ---------------- */
const taskSchema = z.object({
  title: z.string().min(1, "សូមបញ្ចូលចំណងជើង"),
  content: z.string().optional(),
  date: z.string().min(1, "សូមជ្រើសកាលបរិច្ឆេទ"),
  time: z.string().min(1, "សូមជ្រើសម៉ោង"),
  category: z.enum(["ការងារ", "ផ្ទាល់ខ្លួន", "សិក្សា"], {
    errorMap: () => ({ message: "សូមជ្រើសប្រភេទ" }),
  }),
  priority: z.enum(["ខ្ពស់", "មធ្យម", "ទាប"], {
    errorMap: () => ({ message: "សូមជ្រើសអាទិភាព" }),
  }),
});

/* ---------------- REAL-TIME VALIDATION ---------------- */
const validateField = (field) => {
  const partial = taskSchema.pick({ [field]: true });
  const result = partial.safeParse({ [field]: form.value[field] });

  if (!result.success) {
    errors.value[field] = result.error.issues[0].message;
  } else {
    delete errors.value[field];
  }
};

watch(() => form.value.title, () => validateField("title"));
watch(() => form.value.content, () => validateField("content"));
watch(() => form.value.time, () => validateField("time"));
watch(() => form.value.category, () => validateField("category"));
watch(() => form.value.priority, () => validateField("priority"));

watch(() => form.value.date, (val) => {
  if (!val) {
    errors.value.date = "សូមជ្រើសកាលបរិច្ឆេទ";
  } else if (val < today) {
    errors.value.date = "មិនអាចជ្រើសរើសកាលបរិច្ឆេទនៅអតីតកាលបានទេ";
  } else {
    delete errors.value.date;
  }
});

/* ---------------- COMPUTED ---------------- */
const hasErrors = computed(() => Object.keys(errors.value).length > 0);

/* ---------------- SUBMIT ---------------- */
const createTask = async () => {
  loading.value = true;

  const result = taskSchema.safeParse(form.value);

  if (!result.success || hasErrors.value) {
    result.error?.issues.forEach((i) => {
      errors.value[i.path[0]] = i.message;
    });
    loading.value = false;
    return;
  }

  try {
    const payload = {
      title: form.value.title,
      content: form.value.content,
      date: form.value.date,
      time: form.value.time,
      priority:
        { ខ្ពស់: "HIGH", មធ្យម: "MEDIUM", ទាប: "LOW" }[form.value.priority],
      category:
        { ការងារ: "WORK", ផ្ទាល់ខ្លួន: "PERSONAL", សិក្សា: "SCHOOL" }[
          form.value.category
        ],
    };

    await noteStore.createNote(payload);

    modalRef.value?.close();
    resetForm();
    emit("created");

    if (router.currentRoute.value.path !== "/dashboard/tasks") {
      await router.push("/dashboard/tasks");
    }
  } catch (err) {
    alert("Create Task failed");
  } finally {
    loading.value = false;
  }
};

/* ---------------- MODAL HELPERS ---------------- */
const resetForm = () => {
  form.value = {
    title: "",
    content: "",
    date: "",
    time: "",
    category: "ការងារ",
    priority: "មធ្យម",
  };
  errors.value = {};
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

.error-text {
  color: #dc2626;
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
}
</style>
