<template>
  <div class="account-settings">
    <div class="settings-section">
      <h3>ការកំណត់គណនី</h3>

      <!-- Account Information -->
      <div class="setting-card">
        <div class="setting-header">
          <i class="fas fa-info-circle"></i>
          <h4>ព័ត៌មានគណនី</h4>
        </div>
        <div class="setting-content">
          <div class="info-row">
            <span class="label">អ៊ីមែល:</span>
            <span class="value">{{ authStore.user?.email }}</span>
          </div>
          <div class="info-row">
            <span class="label">ឈ្មោះ:</span>
            <span class="value">{{ authStore.user?.fullname }}</span>
          </div>
          <div class="info-row">
            <span class="label">ថ្ងៃបង្កើត:</span>
            <span class="value">{{
              formatDate(authStore.user?.created_at)
            }}</span>
          </div>
          <div class="info-row">
            <span class="label">កែប្រែចុងក្រោយ:</span>
            <span class="value">{{
              formatDate(authStore.user?.updated_at)
            }}</span>
          </div>
        </div>
      </div>

      <!-- Change Email -->
      <div class="setting-card">
        <div class="setting-header">
          <i class="fas fa-envelope"></i>
          <h4>ផ្លាស់ប្តូរអ៊ីមែល</h4>
        </div>
        <div class="setting-content">
          <p class="description">ផ្លាស់ប្តូរអ៊ីមែលសម្រាប់ការចូល។</p>

          <div v-if="!showChangeEmail">
            <button
              class="btn btn-primary"
              @click="showChangeEmail = true"
              :disabled="authStore.profileLoading"
            >
              <i class="fas fa-edit"></i> ផ្លាស់ប្តូរអ៊ីមែល
            </button>
          </div>

          <div v-else>
            <div class="form-group">
              <label>អ៊ីមែលថ្មី:</label>
              <input
                v-model="newEmail"
                type="email"
                class="form-control"
                placeholder="បញ្ចូលអ៊ីមែលថ្មី"
              />
            </div>

            <div class="form-actions">
              <button
                class="btn btn-primary"
                @click="submitChangeEmail"
                :disabled="!newEmail || authStore.profileLoading"
              >
                {{ authStore.profileLoading ? "កំពុងផ្ញើ..." : "ផ្ញើលេខកូដ" }}
              </button>

              <button class="btn btn-secondary" @click="cancelChangeEmail">
                បោះបង់
              </button>
            </div>
          </div>

          <!-- Verify -->
          <div v-if="showVerifyEmail" class="verify-email-form">
            <p>លេខកូដបានផ្ញើទៅ {{ newEmail }}</p>

            <input
              v-model="verificationCode"
              type="text"
              class="form-control"
              placeholder="បញ្ចូលលេខកូដ"
            />

            <div class="form-actions">
              <button
                class="btn btn-primary"
                @click="submitVerifyEmail"
                :disabled="!verificationCode || authStore.profileLoading"
              >
                {{
                  authStore.profileLoading ? "កំពុងផ្ទៀងផ្ទាត់..." : "បញ្ជាក់"
                }}
              </button>

              <button class="btn btn-secondary" @click="cancelVerifyEmail">
                បោះបង់
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="setting-card">
        <div class="setting-header">
          <i class="fas fa-bell"></i>
          <h4>ការជូនដំណឹង</h4>
        </div>
        <div class="setting-content">
          <label>
            <input
              type="checkbox"
              v-model="settings.emailNotifications"
              @change="saveSettings"
            />
            ទទួលបានការជូនដំណឹង
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              v-model="settings.emailDigest"
              @change="saveSettings"
            />
            សង្ខេបប្រចាំសប្តាហ៍
          </label>
        </div>
      </div>

      <!-- Privacy -->
      <div class="setting-card">
        <div class="setting-header">
          <i class="fas fa-shield-alt"></i>
          <h4>ឯកជនភាព</h4>
        </div>
        <div class="setting-content">
          <label>
            <input
              type="checkbox"
              v-model="settings.profilePublic"
              @change="saveSettings"
            />
            បង្ហាញប្រវត្តិរូប
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              v-model="settings.allowMessages"
              @change="saveSettings"
            />
            អនុញ្ញាតសារ
          </label>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="setting-card danger-zone">
        <div class="setting-header">
          <i class="fas fa-exclamation-triangle"></i>
          <h4>តំបន់គ្រោះថ្នាក់</h4>
        </div>

        <div class="danger-action">
          <h5>ចាកចេញពីគ្រប់ឧបករណ៍</h5>
          <button class="btn btn-warning" @click="logoutAllSessions">
            Logout All
          </button>
        </div>

        <div class="danger-action">
          <h5>លុបគណនី</h5>
          <button class="btn btn-danger" @click="confirmDeleteAccount">
            លុបគណនី
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content delete-modal">
        <button class="modal-close" @click="showDeleteModal = false">×</button>

        <h4>បញ្ជាក់ការលុបគណនី</h4>
        <p>សូមបញ្ចូលអ៊ីមែលដើម្បីបញ្ជាក់:</p>

        <input
          v-model="deleteConfirmation.email"
          type="email"
          class="form-control"
          placeholder="បញ្ចូលអ៊ីមែល"
        />

        <div class="modal-actions">
          <button class="btn btn-secondary" @click="showDeleteModal = false">
            បោះបង់
          </button>

          <button
            class="btn btn-danger"
            :disabled="deleteConfirmation.email !== authStore.user?.email"
            @click="deleteAccountConfirmed"
          >
            លុបគណនី
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authentication";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const settings = ref({
  emailNotifications: true,
  emailDigest: true,
  profilePublic: false,
  allowMessages: true,
});

const showDeleteModal = ref(false);
const deleteConfirmation = ref({
  email: "",
});

const showChangeEmail = ref(false);
const showVerifyEmail = ref(false);
const newEmail = ref("");
const verificationCode = ref("");

const formatDate = (date) => {
  if (!date) return "មិនដាច់ដោយឡែក";
  const d = new Date(date);
  return new Intl.DateTimeFormat("km-KH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

const saveSettings = async () => {
  authStore.profileSuccess = "ការកំណត់បានរក្សាទុកបានជោគជ័យ!";
  setTimeout(() => {
    authStore.profileSuccess = null;
  }, 3000);
};

const submitChangeEmail = async () => {
  if (!newEmail.value || !newEmail.value.includes("@")) {
    authStore.profileError = "សូមបញ្ចូលអ៊ីមែលដែលមានសុពលភាព។";
    return;
  }

  const result = await authStore.changeEmail(newEmail.value);
  if (result) {
    showChangeEmail.value = false;
    showVerifyEmail.value = true;
  }
};

const cancelChangeEmail = () => {
  showChangeEmail.value = false;
  newEmail.value = "";
  verificationCode.value = "";
  showVerifyEmail.value = false;
};

const submitVerifyEmail = async () => {
  if (!verificationCode.value) {
    authStore.profileError = "សូមបញ្ចូលលេខកូដផ្ទៀងផ្ទាត់។";
    return;
  }

  const result = await authStore.verifyChangeEmail(verificationCode.value);
  if (result) {
    cancelChangeEmail();
  }
};

const cancelVerifyEmail = () => {
  showVerifyEmail.value = false;
  verificationCode.value = "";
};

const logoutAllSessions = async () => {
  if (confirm("តើអ្នកប្រាកដថាចង់ចាកចេញពីវគ្គសម្ភាសទាំងអស់ដែរឬទេ?")) {
    authStore.logout();
    await router.push("/login");
  }
};

const confirmDeleteAccount = () => {
  showDeleteModal.value = true;
};

const deleteAccountConfirmed = async () => {
  if (deleteConfirmation.value.email !== authStore.user?.email) {
    authStore.profileError = "អ៊ីមែលមិនត្រូវគ្នាទេ។";
    return;
  }

  const result = await authStore.deleteAccount();
  if (result) {
    showDeleteModal.value = false;
    await router.push("/");
  }
};

onMounted(() => {
  // Load user settings from localStorage or API
  const savedSettings = localStorage.getItem("accountSettings");
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings);
  }
});
</script>

<style scoped>
.account-settings {
  max-width: 1200px;
}

.settings-section h3 {
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #667eea;
}

.setting-card {
  width: 100%;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.setting-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.setting-card.danger-zone {
  background: #fff5f5;
  border-color: #dc3545;
}

.setting-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.setting-header i {
  font-size: 1.3rem;
  color: #667eea;
}

.setting-card.danger-zone .setting-header i {
  color: #dc3545;
}

.setting-header h4 {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.setting-content {
  padding-left: 35px;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 15px 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  color: #666;
  font-weight: 600;
  font-size: 0.9rem;
}

.info-row .value {
  color: #333;
  font-size: 0.9rem;
}

.setting-option {
  margin-bottom: 12px;
}

.change-email-form,
.verify-email-form {
  background: #e6ebff;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}

.verify-message {
  background: #e3f2fd;
  border: 1px solid #90caf9;
  color: #1976d2;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  color: #555;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.form-actions .btn {
  flex: 1;
  justify-content: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #555;
  font-size: 0.95rem;
  user-select: none;
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
}

.checkbox-label input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.danger-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #ffe6e6;
}

.danger-action:last-child {
  border-bottom: none;
}

.action-info h5 {
  color: #333;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.action-info p {
  color: #666;
  font-size: 0.85rem;
  margin: 0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.btn-warning {
  background: #ffc107;
  color: #333;
}

.btn-warning:hover:not(:disabled) {
  background: #ffb300;
  transform: translateY(-2px);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.text-danger {
  color: #dc3545;
}

.text-muted {
  color: #999;
  font-size: 0.85rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: #333;
}

.modal-content h4 {
  color: #dc3545;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-warning {
  background: #fff5f5;
  border: 1px solid #ffcccc;
  color: #dc3545;
  padding: 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.confirmation-steps {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.step {
  margin-bottom: 15px;
}

.step:last-child {
  margin-bottom: 0;
}

.step h5 {
  color: #333;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.step p {
  color: #666;
  font-size: 0.85rem;
  margin: 0 0 10px 0;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-actions {
  display: flex;
  gap: 10px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.modal-actions .btn {
  flex: 1;
  justify-content: center;
}

@media (max-width: 768px) {
  .danger-action {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .danger-action .btn {
    width: 100%;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-actions .btn {
    width: 100%;
  }
}
</style>
