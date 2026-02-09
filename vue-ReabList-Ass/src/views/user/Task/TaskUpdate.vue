<template>
  <BaseModal
    ref="modalRef"
    id="editTaskModal"
    title="កែប្រែភារកិច្ច"
    maxWidth="700px"
  >
    <form @submit.prevent="updateTask">
      <!-- TITLE -->
      <div class="mb-3">
        <label class="label-modern">ចំណងជើង Task</label>
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
          style="resize: none"
        ></textarea>
      </div>

      <div class="row g-3">
        <!-- DATE -->
        <div class="col-md-6">
          <label class="label-modern">កាលបរិច្ឆេទ</label>
          <input v-model="form.date" type="date" class="input-modern" />
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
    </form>

    <template #footer>
      <div class="update-footer">
        <button type="button" class="btn-cancel-modern" @click="close">
          បិទ
        </button>

        <AuthButton
          text="រក្សាទុក"
          loading-text="កំពុងរក្សាទុក..."
          :loading="loading"
          :disabled="hasErrors"
          class="btn-done-modern"
          @click="updateTask"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { z } from "zod";

import BaseModal from "@/components/base/BaseModal.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import AuthButton from "@/components/AuthButton.vue";
import api from "@/API/api";

/* ---------------- PROPS / EMITS ---------------- */
const props = defineProps({
  task: { type: Object, default: null },
});

const emit = defineEmits(["updated"]);

/* ---------------- STATE ---------------- */
const modalRef = ref(null);
const loading = ref(false);
const errors = ref({});

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
  content: "",
  date: "",
  time: "",
  category: "ការងារ",
  priority: "មធ្យម",
});

/* ---------------- ZOD SCHEMA ---------------- */
const taskSchema = z.object({
  title: z.string().min(1, "សូមបញ្ចូលចំណងជើង"),
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

watch(
  () => form.value.title,
  () => validateField("title")
);
watch(
  () => form.value.date,
  () => validateField("date")
);
watch(
  () => form.value.time,
  () => validateField("time")
);
watch(
  () => form.value.category,
  () => validateField("category")
);
watch(
  () => form.value.priority,
  () => validateField("priority")
);

const hasErrors = computed(() => Object.keys(errors.value).length > 0);

/* ---------------- NORMALIZE HELPERS ---------------- */
const normalizeDate = (v) => (v ? String(v).slice(0, 10) : "");
const normalizeTime = (v) => (v ? String(v).slice(0, 5) : "");

/* ---------------- WATCH TASK PROP ---------------- */
watch(
  () => props.task,
  (t) => {
    if (!t) return;

    form.value = {
      id: t.id,
      title: t.title ?? "",
      content: t.content ?? "",
      date: normalizeDate(t.date),
      time: normalizeTime(t.time),
      category: t.category ?? "ការងារ",
      priority: t.priority ?? "មធ្យម",
    };

    errors.value = {};
  },
  { immediate: true }
);

/* ---------------- SUBMIT ---------------- */
const updateTask = async () => {
  loading.value = true;

  const result = taskSchema.safeParse(form.value);
  if (!result.success) {
    result.error.issues.forEach((i) => {
      errors.value[i.path[0]] = i.message;
    });
    loading.value = false;
    return;
  }

  try {
    const priorityMap = { ខ្ពស់: "HIGH", មធ្យម: "MEDIUM", ទាប: "LOW" };
    const categoryMap = {
      ការងារ: "WORK",
      ផ្ទាល់ខ្លួន: "PERSONAL",
      សិក្សា: "SCHOOL",
    };

    await api.put(`/notes/${form.value.id}`, {
      title: form.value.title.trim(),
      content: form.value.content?.trim() || "",
      date: form.value.date,
      time: form.value.time,
      priority: priorityMap[form.value.priority],
      category: categoryMap[form.value.category],
    });

    emit("updated");
    close();
  } catch (err) {
    alert(err?.response?.data?.message || "Update failed");
  } finally {
    loading.value = false;
  }
};

/* ---------------- MODAL ---------------- */
const open = () => modalRef.value?.open();
const close = () => modalRef.value?.close();

defineExpose({ open, close });
</script>


<style scoped>
.error-text {
  color: #dc2626;
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
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
