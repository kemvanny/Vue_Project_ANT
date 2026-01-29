<template>
  <form @submit.prevent="submitForm">
    <div class="form-section">
      <h3>ព័ត៌មានផ្ទាល់ខ្លួន</h3>
      <div class="form-grid">
        <div class="form-group">
          <label for="fullname" class="form-label">
            <i class="fas fa-user"></i> ឈ្មោះពេញលេញ
          </label>
          <input
            v-model="formData.fullname"
            id="fullname"
            type="text"
            class="form-control"
            placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
            required
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">
            <i class="fas fa-envelope"></i> អ៊ីមែល
          </label>
          <input
            :value="authStore.user?.email"
            id="email"
            type="email"
            class="form-control"
            disabled
          />
          <small class="text-muted">អ៊ីមែលមិនអាចផ្លាស់ប្តូរបានទេ។</small>
        </div>

        <!-- <div class="form-group">
          <label for="phone" class="form-label">
            <i class="fas fa-phone"></i> លេខទូរស័ព្ទ
          </label>
          <input
            v-model="formData.phone"
            id="phone"
            type="tel"
            class="form-control"
            placeholder="បញ្ចូលលេខទូរស័ព្ទរបស់អ្នក"
          />
        </div> -->

        <!-- <div class="form-group">
          <label for="dob" class="form-label">
            <i class="fas fa-calendar"></i> ថ្ងៃខែឆ្នាំកំណើត
          </label>
          <input
            v-model="formData.date_of_birth"
            id="dob"
            type="date"
            class="form-control"
          />
        </div> -->
      </div>

      <!-- <div class="form-group">
        <label for="address" class="form-label">
          <i class="fas fa-map-marker-alt"></i> អាសយដ្ឋាន
        </label>
        <textarea
          v-model="formData.address"
          id="address"
          class="form-control"
          placeholder="បញ្ចូលអាសយដ្ឋាននៃលម្អិតរបស់អ្នក"
          rows="3"
        ></textarea>
      </div> -->
    </div>

    <div class="form-actions">
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="authStore.profileLoading"
      >
        <i class="fas fa-save"></i>
        {{
          authStore.profileLoading
            ? "កំពុងរក្សាទុក..."
            : "រក្សាទុកការផ្លាស់ប្តូរ"
        }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProfileStore } from "@/stores/profilestore";

const authStore = useProfileStore();
const emit = defineEmits(["done", "reload"]);

const formData = ref({
  fullname: "",
  phone: "",
  address: "",
  date_of_birth: "",
});

const loadProfile = async () => {
  // If profile is not loaded, fetch it first
  if (!authStore.profile) {
    console.log("Profile not loaded, fetching from API...");
    await authStore.getProfile();
  }

  if (authStore.profile) {
    formData.value = {
      fullname: authStore.profile.fullname || "",
      phone: authStore.profile.phone || "",
      address: authStore.profile.address || "",
      date_of_birth: authStore.profile.date_of_birth || "",
    };
    console.log("Form loaded with profile data:", formData.value);
  } else {
    console.warn("No profile data available");
  }
};

const submitForm = async () => {
  const result = await authStore.updateProfile(formData.value);
  if (result) {
    await loadProfile();
    emit("done");
    emit("reload");
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
.form-section {
  margin-bottom: 30px;
}

.form-section h3 {
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #247a85;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  color: #555;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.form-label i {
  margin-right: 8px;
  color: #247a85;
}

.form-control {
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #247a85;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control:disabled {
  background-color: #f5f5f5;
  color: #999;
}

textarea.form-control {
  resize: vertical;
  min-height: 80px;
}

.text-muted {
  color: #999;
  font-size: 0.85rem;
  margin-top: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #247a85 0%, #196d78 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .form-section h3 {
    font-size: 1.1rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
