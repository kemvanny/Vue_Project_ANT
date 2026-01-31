<!-- <template>
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
          authStore.profileLoading ||
          !formData.currentPassword ||
          !formData.newPassword ||
          !formData.confirmPassword ||
          passwordMismatch ||
          formData.newPassword.length < 8
        "
      >
        <i class="fas fa-check"></i>
        {{
          authStore.profileLoading
            ? "កំពុងផ្លាស់ប្តូរ..."
            : "ផ្លាស់ប្តូរពាក្យសម្ងាត់"
        }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authentication";

const authStore = useAuthStore();

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
  if (passwordMismatch.value) {
    authStore.profileError = "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។";
    return;
  }

  const result = await authStore.changePassword(
    formData.value.currentPassword,
    formData.value.newPassword,
    formData.value.confirmPassword,
  );

  if (result) {
    formData.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }
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

@media (max-width: 768px) {
  .password-requirements {
    font-size: 0.85rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style> -->
