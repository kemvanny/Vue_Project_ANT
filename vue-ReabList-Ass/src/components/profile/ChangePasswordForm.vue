<template>
  <form @submit.prevent="submitForm">
    <div class="password-section">
      <h3>ផ្លាស់ប្តូរពាក្យសម្ងាត់</h3>

      <div class="password-info">
        <p>
          <i class="fas fa-lock-open"></i>
          ស្វាគមន៍ឡើងវិញ!
          សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ននិងពាក្យសម្ងាត់ថ្មីដែលចង់ផ្លាស់ប្តូរ។
        </p>
      </div>

      <!-- Error Alert -->
      <div v-if="profileStore.profileError" class="alert alert-danger">
        <i class="fas fa-exclamation-circle"></i>
        {{ profileStore.profileError }}
      </div>

      <div class="form-group">
        <label for="current-password" class="form-label">
          <i class="fas fa-key"></i> ពាក្យសម្ងាត់បច្ចុប្បន្ន
        </label>
        <div class="password-input-wrapper">
          <input
            v-model="formData.currentPassword"
            :type="showCurrentPassword ? 'text' : 'password'"
            id="current-password"
            class="form-control"
            placeholder="បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ននៃអ្នក"
            required
          />
          <button
            type="button"
            class="toggle-password"
            @click="showCurrentPassword = !showCurrentPassword"
          >
            <i
              :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            ></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="new-password" class="form-label">
          <i class="fas fa-lock"></i> ពាក្យសម្ងាត់ថ្មី
        </label>
        <div class="password-input-wrapper">
          <input
            v-model="formData.newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            id="new-password"
            class="form-control"
            placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នក"
            required
          />
          <button
            type="button"
            class="toggle-password"
            @click="showNewPassword = !showNewPassword"
          >
            <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <div class="password-strength">
          <span :class="['strength-bar', passwordStrength]"></span>
          <span class="strength-text">{{ strengthText }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="confirm-password" class="form-label">
          <i class="fas fa-lock-open"></i> បញ្ជាក់ពាក្យសម្ងាត់ថ្មី
        </label>
        <div class="password-input-wrapper">
          <input
            v-model="formData.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirm-password"
            class="form-control"
            :class="{ 'is-invalid': passwordMismatch }"
            placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មីរបស់អ្នក"
            required
          />
          <button
            type="button"
            class="toggle-password"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <i
              :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            ></i>
          </button>
        </div>
        <small v-if="passwordMismatch" class="text-danger">
          <i class="fas fa-times-circle"></i> ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។
        </small>
      </div>

      <div class="password-requirements">
        <h5>តម្រូវការពាក្យសម្ងាត់:</h5>
        <ul>
          <li :class="{ met: formData.newPassword.length >= 8 }">
            <i
              :class="
                formData.newPassword.length >= 8
                  ? 'fas fa-check'
                  : 'fas fa-times'
              "
            ></i>
            យ៉ាងហោចណាស់ 8 តួអក្សរ
          </li>
          <li :class="{ met: /[A-Z]/.test(formData.newPassword) }">
            <i
              :class="
                /[A-Z]/.test(formData.newPassword)
                  ? 'fas fa-check'
                  : 'fas fa-times'
              "
            ></i>
            មានអក្សរធំ (A-Z)
          </li>
          <li :class="{ met: /[a-z]/.test(formData.newPassword) }">
            <i
              :class="
                /[a-z]/.test(formData.newPassword)
                  ? 'fas fa-check'
                  : 'fas fa-times'
              "
            ></i>
            មានអក្សរតូច (a-z)
          </li>
          <li :class="{ met: /[0-9]/.test(formData.newPassword) }">
            <i
              :class="
                /[0-9]/.test(formData.newPassword)
                  ? 'fas fa-check'
                  : 'fas fa-times'
              "
            ></i>
            មានលេខ (0-9)
          </li>
        </ul>
      </div>
    </div>

    <div class="form-actions">
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="
          profileStore.profileLoading ||
          !formData.currentPassword ||
          !formData.newPassword ||
          !formData.confirmPassword ||
          passwordMismatch ||
          formData.newPassword.length < 8
        "
      >
        <i class="fas fa-check"></i>
        {{
          profileStore.profileLoading
            ? "កំពុងផ្លាស់ប្តូរ..."
            : "ផ្លាស់ប្តូរពាក្យសម្ងាត់"
        }}
      </button>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="modal-backdrop"
      @click="closeSuccessModal"
    >
      <div class="modal-card" @click.stop>
        <div class="success-icon-modal">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2 class="modal-title">ជោគជ័យ!</h2>
        <p class="modal-message">
          ពាក្យសម្ងាត់របស់អ្នកត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ។
        </p>
        <button class="btn-modal-ok" @click="closeSuccessModal">យល់ព្រម</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProfileStore } from "@/stores/profilestore";

const profileStore = useProfileStore();
const showSuccessModal = ref(false);

const formData = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordMismatch = computed(
  () =>
    formData.value.confirmPassword &&
    formData.value.newPassword !== formData.value.confirmPassword,
);

const passwordStrength = computed(() => {
  const pwd = formData.value.newPassword;
  let strength = 0;

  if (pwd.length >= 8) strength++;
  if (pwd.length >= 12) strength++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

  if (strength <= 1) return "weak";
  if (strength <= 3) return "medium";
  return "strong";
});

const strengthText = computed(() => {
  if (!formData.value.newPassword) return "";
  return {
    weak: "ខ្សោយ",
    medium: "មធ្យម",
    strong: "ខ្លាំង",
  }[passwordStrength.value];
});

const submitForm = async () => {
  // Clear previous messages
  profileStore.clearMessages();

  if (passwordMismatch.value) {
    profileStore.profileError = "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។";
    return;
  }

  const result = await profileStore.changePassword(
    formData.value.currentPassword,
    formData.value.newPassword,
    formData.value.confirmPassword,
  );

  if (result) {
    // Show success modal
    showSuccessModal.value = true;

    // Clear form
    formData.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};
</script>

<style scoped>
.password-section {
  max-width: 500px;
}

.password-section h3 {
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #667eea;
}

.password-info {
  background: #e6ebff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 25px;
  color: #667eea;
  font-size: 0.95rem;
}

.password-info p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.password-info i {
  font-size: 1.2rem;
}

/* Alert Styles */
.alert {
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  animation: slideIn 0.3s ease;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert i {
  font-size: 1.1rem;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  color: #555;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.95rem;
  display: block;
}

.form-label i {
  margin-right: 8px;
  color: #667eea;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  padding-right: 45px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control.is-invalid {
  border-color: #dc3545;
  background-color: #fff5f5;
}

.form-control.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px 8px;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #764ba2;
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  width: 100%;
  border-radius: 2px;
  background: #e0e0e0;
  display: block;
}

.strength-bar.weak {
  background: #dc3545;
}

.strength-bar.medium {
  background: #ffc107;
}

.strength-bar.strong {
  background: #28a745;
}

.strength-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
  min-width: 50px;
}

.text-danger {
  color: #dc3545;
  display: block;
  margin-top: 4px;
  font-size: 0.85rem;
}

.text-danger i {
  margin-right: 4px;
}

.password-requirements {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.password-requirements h5 {
  color: #333;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.password-requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.password-requirements li {
  color: #999;
  font-size: 0.9rem;
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.password-requirements li.met {
  color: #28a745;
}

.password-requirements i {
  width: 16px;
  text-align: center;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-card {
  background: white;
  border-radius: 16px;
  padding: 40px 30px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon-modal {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: scaleIn 0.5s ease;
}

.success-icon-modal i {
  font-size: 40px;
  color: white;
}

@keyframes scaleIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-title {
  color: #22c55e;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.modal-message {
  color: #555;
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.5;
}

.btn-modal-ok {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-modal-ok:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .password-requirements {
    font-size: 0.85rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .modal-card {
    padding: 30px 20px;
  }
}
</style>
