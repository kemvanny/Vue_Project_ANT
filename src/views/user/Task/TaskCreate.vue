<template>
  <!-- ================= ADD TASK MODAL ================= -->
  <BaseModal
    ref="modalRef"
    id="addTaskModal"
    title="បង្កើតភារកិច្ចថ្មី"
    maxWidth="700px"
    @close="close"
  >
    <form @submit.prevent="createTask">
      
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
          @blur="touched.content = true"
          :class="['input-modern', { 'input-error': errors.content }]"
          placeholder="សរសេរព័ត៌មានបន្ថែម..."
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
            :min="today"
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

      <!-- SUBMIT BUTTON -->
      <AuthButton
        :type="'submit'"
        text="បញ្ជូលភារកិច្ច"
        loading-text="កំពុងបញ្ជូល..."
        :loading="loading"
        class="btn-submit-modern mt-3"
      />
    </form>
  </BaseModal>

  <!-- ================= ALERT MODAL ================= -->
  <BaseModal
    ref="alertModalRef"
    id="alertModal"
    maxWidth="420px"
    :showHeader="false"
    @close="closeAlert"
  >
    <div class="modern-alert">
      <div class="alert-icon">⚠️</div>
      <h3 class="alert-title">មានបញ្ហា</h3>
      <p class="alert-message">{{ alertMessage }}</p>
      <button class="alert-btn" @click="closeAlert">យល់ព្រម</button>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import AuthButton from "@/components/AuthButton.vue";
import { useNoteStore } from "@/stores/note";

const router = useRouter();
const noteStore = useNoteStore();
const emit = defineEmits(["created"]);

const modalRef = ref(null);
const alertModalRef = ref(null);
const loading = ref(false);

const today = new Date().toISOString().slice(0, 10);

/* ================= FORM ================= */
const form = ref({
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

const alertMessage = ref("");

const showAlert = (message) => {
  alertMessage.value = message;
  alertModalRef.value?.open();
};

const closeAlert = () => {
  alertModalRef.value?.close();
};

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
      if (value < today) return "មិនអាចជ្រើសអតីតកាលបានទេ";
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

/* ================= REAL-TIME AFTER TOUCH ================= */
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

/* ================= CREATE TASK ================= */
const createTask = async () => {
  Object.keys(form.value).forEach((field) => {
    touched.value[field] = true;
    errors.value[field] = validateField(field, form.value[field]);
  });

  const hasError = Object.values(errors.value).some((e) => e);
  if (hasError) {
    showAlert("សូមបំពេញព័ត៌មានឲ្យបានត្រឹមត្រូវ");
    return;
  }

  loading.value = true;

  try {
    const priorityMap = { ខ្ពស់: "HIGH", មធ្យម: "MEDIUM", ទាប: "LOW" };
    const categoryMap = {
      ផ្ទាល់ខ្លួន: "PERSONAL",
      ការងារ: "WORK",
      សិក្សា: "SCHOOL",
    };

    const payload = {
      title: form.value.title,
      content: form.value.content,
      date: form.value.date,
      time: form.value.time,
      priority: priorityMap[form.value.priority] || "MEDIUM",
      category: categoryMap[form.value.category] || "WORK",
    };

    await noteStore.createNote(payload);

    modalRef.value?.close();
    emit("created");
    resetForm();

    if (router.currentRoute.value.path !== "/dashboard/tasks") {
      await router.push("/dashboard/tasks");
    }
  } catch (err) {
    showAlert(err?.response?.data?.message || "បង្កើតភារកិច្ចមិនជោគជ័យ");
  } finally {
    loading.value = false;
  }
};

/* ================= RESET ================= */
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
  touched.value = {
    title: false,
    content: false,
    date: false,
    time: false,
    category: false,
    priority: false,
  };
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
.modern-alert {
  text-align: center;
  padding: 30px 26px 26px;
}

.alert-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f43f5e, #fb7185);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  box-shadow: 0 16px 30px -12px rgba(244, 63, 94, 0.6);
}

.alert-title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #0f172a;
}

.alert-message {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 22px;
}

.alert-btn {
  width: 100%;
  border: none;
  padding: 14px;
  border-radius: 16px;
  font-weight: 800;
  font-size: 14px;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  color: white;
  cursor: pointer;
  transition: 0.25s;
}

.alert-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.6);
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
</style>
