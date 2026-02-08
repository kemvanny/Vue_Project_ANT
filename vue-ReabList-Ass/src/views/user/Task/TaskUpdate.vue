<template>
  <BaseModal
    ref="modalRef"
    id="editTaskModal"
    title="កែប្រែភារកិច្ច"
    maxWidth="700px"
  >
    <form @submit.prevent="updateTask">
      <div class="mb-3">
        <label class="label-modern">ចំណងជើង Task</label>
        <input v-model.trim="form.title" class="input-modern" required />
      </div>

      <div class="mb-3">
        <label class="label-modern">កំណត់ចំណាំ</label>

        <textarea
          v-model.trim="form.content"
          class="input-modern"
          rows="3"
          placeholder="សរសេរព័ត៌មានបន្ថែម..."
          style="resize: none"
        ></textarea>
      </div>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="label-modern">កាលបរិច្ឆេទ</label>
          <input
            v-model="form.date"
            type="date"
            class="input-modern"
            required
          />
        </div>

        <div class="col-md-6">
          <label class="label-modern">ម៉ោង</label>
          <input
            v-model="form.time"
            type="time"
            class="input-modern"
            required
          />
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
import api from "@/API/api";

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
  content: "",
  date: "",
  time: "",
  category: "ការងារ",
  priority: "មធ្យម",
});

const normalizeDate = (value) => {
  if (!value) return "";

  // already YYYY-MM-DD
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value))
    return value;

  // ISO datetime like 2026-02-02T00:00:00.000Z
  if (typeof value === "string" && value.includes("T")) {
    const maybe = value.slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(maybe)) return maybe;
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const normalizeTime = (value) => {
  if (!value) return "";

  // HH:mm:ss -> HH:mm
  if (typeof value === "string" && /^\d{2}:\d{2}:\d{2}$/.test(value))
    return value.slice(0, 5);

  // already HH:mm
  if (typeof value === "string" && /^\d{2}:\d{2}$/.test(value)) return value;

  // ISO datetime -> extract HH:mm
  if (typeof value === "string" && value.includes("T")) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) {
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }
  }

  return "";
};

const toHHmm = (value) => {
  if (!value) return "";

  // "HH:mm:ss" -> "HH:mm"
  if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return value.slice(0, 5);

  // already "HH:mm"
  if (/^\d{2}:\d{2}$/.test(value)) return value;

  // "hh:mm AM/PM" -> "HH:mm"
  const m = String(value).match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (m) {
    let hh = parseInt(m[1], 10);
    const mm = m[2];
    const ap = m[3].toUpperCase();

    if (ap === "PM" && hh !== 12) hh += 12;
    if (ap === "AM" && hh === 12) hh = 0;

    return `${String(hh).padStart(2, "0")}:${mm}`;
  }

  return "";
};


watch(
  () => props.task,
  (t) => {
    if (!t) return;

    form.value.id = t.id ?? null;
    form.value.title = t.title ?? "";

    form.value.content = t.content ?? t.notes ?? "";

    form.value.date = normalizeDate(t.date);
    form.value.time = normalizeTime(t.time);

    form.value.category = t.category ?? "ការងារ";
    form.value.priority = t.priority ?? "មធ្យម";

    error.value = "";
  },
  { immediate: true }
);

const updateTask = async () => {
  error.value = "";

  if (!form.value.title?.trim()) {
    error.value = "សូមបញ្ចូលចំណងជើង";
    return;
  }

  if (!form.value.id) {
    error.value = "មិនអាចរក Task ID បានទេ";
    return;
  }

  try {
    const priorityMap = { ខ្ពស់: "HIGH", មធ្យម: "MEDIUM", ទាប: "LOW" };
    const categoryMap = { ផ្ទាល់ខ្លួន: "PERSONAL", ការងារ: "WORK", សិក្សា: "SCHOOL" };

    const body = {
      title: form.value.title.trim(),
      content: form.value.content?.trim() || "",
      date: form.value.date,              // YYYY-MM-DD
      time: toHHmm(form.value.time),     
      priority: priorityMap[form.value.priority] || "MEDIUM",
      category: categoryMap[form.value.category] || "PERSONAL",
    };

    console.log("UPDATE BODY:", body);

    await api.put(`/notes/${form.value.id}`, body);

    emit("updated");
    close();
  } catch (err) {
    console.log("UPDATE ERROR:", err.response?.data || err.message);
    error.value = err.response?.data?.message || "Invalid Input";
  }
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
