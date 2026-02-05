<template>
  <div class="settings-container">
    <header class="settings-header-top">
      <div class="header-content">
        <div>
          <h1>ការកំណត់គណនី</h1>
          <p>គ្រប់គ្រងព័ត៌មានផ្ទាល់ខ្លួន និងសុវត្ថិភាពគណនីរបស់អ្នក។</p>
        </div>
      </div>
    </header>

    <div class="settings-grid">
      <section class="settings-card">
        <div class="card-header">
          <div class="icon-box"><i class="fas fa-user"></i></div>
          <div>
            <h3>ព័ត៌មានគណនី</h3>
            <p>ព័ត៌មានមូលដ្ឋានដែលបានភ្ជាប់ជាមួយគណនី។</p>
          </div>
        </div>

        <div class="card-body info-grid">
          <div class="data-row">
            <span class="data-label">ឈ្មោះពេញ</span>
            <span class="data-value">{{
              profileStore.profile?.fullname || "—"
            }}</span>
          </div>
          <div class="data-row">
            <span class="data-label">អាសយដ្ឋានអ៊ីមែល</span>
            <span class="data-value">{{
              profileStore.profile?.email || "—"
            }}</span>
          </div>
          <div class="data-row">
            <span class="data-label">កាលបរិច្ឆេទចូលរួម</span>
            <span class="data-value">{{
              formatDate(profileStore.profile?.created_at)
            }}</span>
          </div>
        </div>
      </section>

      <!-- Change Email Section -->
      <section class="settings-card">
        <div class="card-header">
          <div class="icon-box"><i class="fas fa-envelope"></i></div>
          <div>
            <h3>ផ្លាស់ប្តូរអ៊ីមែល</h3>
            <p>ប្រើសម្រាប់ផ្ទៀងផ្ទាត់ និងការជូនដំណឹងផ្សេងៗ។</p>
          </div>
        </div>

        <div class="card-body">
          <div v-if="!isEmailChangePending">
            <button class="btn-outline" @click="showChangeEmailModal = true">
              <i class="fas fa-pen"></i> កែប្រែអ៊ីមែល
            </button>
          </div>

          <div v-else class="text-center py-6">
            <i class="fas fa-envelope-open-text fa-3x text-primary mb-4"></i>
            <h4>សូមពិនិត្យប្រអប់ទទួល</h4>
            <p>
              យើងបានផ្ញើតំណផ្ទៀងផ្ទាត់ទៅ <strong>{{ pendingEmail }}</strong>
            </p>
            <p class="text-muted small mt-3">
              • សូមពិនិត្យ Spam / Junk បើមិនឃើញ<br />• តំណមានសុពលភាព ១៥ នាទី
            </p>
            <button
              class="btn-ghost mt-4"
              @click="isEmailChangePending = false"
            >
              បានផ្លាស់ប្តូររួចហើយ / បោះបង់
            </button>
          </div>
        </div>
      </section>

      <!-- Change Password Section -->
      <section class="settings-card">
        <div class="card-header">
          <div class="icon-box"><i class="fas fa-lock"></i></div>
          <div>
            <h3>ផ្លាស់ប្តូរពាក្យសម្ងាត់</h3>
            <p>ធានាសុវត្ថិភាពគណនីរបស់អ្នកដោយរក្សាដាក់ពាក្យសម្ងាត់ដែលរឹងមាំ។</p>
          </div>
        </div>

        <div class="card-body">
          <button class="btn-outline" @click="showChangePasswordModal = true">
            <i class="fas fa-key"></i> ផ្លាស់ប្តូរពាក្យសម្ងាត់
          </button>
        </div>
      </section>

      <!-- Privacy Settings -->
      <section class="settings-card">
        <div class="card-header">
          <div class="icon-box"><i class="fas fa-sliders-h"></i></div>
          <div>
            <h3>ការកំណត់ឯកជនភាព និងការជូនដំណឹង</h3>
          </div>
        </div>
        <div class="card-body">
          <div class="switch-row">
            <div class="switch-info">
              <span class="switch-title">ទទួលបានការជូនដំណឹងតាមអ៊ីមែល</span>
              <span class="switch-desc"
                >យើងនឹងផ្ញើសាររំលឹកអំពីសកម្មភាពថ្មីៗ។</span
              >
            </div>
            <label class="toggle-switch">
              <input
                type="checkbox"
                v-model="settings.emailNotifications"
                @change="saveSettings"
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="divider"></div>

          <div class="switch-row">
            <div class="switch-info">
              <span class="switch-title">បង្ហាញប្រវត្តិរូបជាសាធារណៈ</span>
              <span class="switch-desc"
                >អនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ផ្សេងទៀតស្វែងរកអ្នកឃើញ។</span
              >
            </div>
            <label class="toggle-switch">
              <input
                type="checkbox"
                v-model="settings.profilePublic"
                @change="saveSettings"
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Danger Zone: Delete Account -->
      <section class="settings-card danger-card">
        <div class="card-header">
          <div class="icon-box red-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <h3>តំបន់ប្រឈឹម</h3>
            <p>សកម្មភាពដែលមិនអាចត្រឡប់វិញបាន។ សូមប្រុងប្រយ័ត្ន។</p>
          </div>
        </div>

        <div class="card-body">
          <div class="danger-item">
            <div>
              <h4>លុបគណនី</h4>
              <p class="text-muted">
                នេះនឹងលុបគណនីរបស់អ្នកជាអចិន្ត្រៃយ៍
                និងទិន្នន័យទាំងអស់ដែលទាក់ទងនឹងវា។
                សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
              </p>
            </div>
            <button class="btn-danger" @click="showDeleteModal = true">
              <i class="fas fa-trash-alt"></i> លុបគណនី
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Change Email Modal -->
    <div
      v-if="showChangeEmailModal"
      class="modal-backdrop"
      @click.self="showChangeEmailModal = false"
    >
      <div class="modal-card">
        <div class="modal-head">
          <h3>ផ្លាស់ប្តូរអ៊ីមែល</h3>
          <button class="close-btn" @click="showChangeEmailModal = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>អ៊ីមែលថ្មី</label>
            <input
              v-model.trim="newEmail"
              type="email"
              placeholder="បញ្ចូលអ៊ីមែលថ្មី"
              class="form-input"
            />
          </div>
          <div class="input-group">
            <label>ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
            <div class="password-input-wrapper">
              <input
                v-model="emailChangePassword"
                :type="showEmailChangePassword ? 'text' : 'password'"
                placeholder="បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន"
                class="form-input"
              />
              <button
                type="button"
                class="toggle-password-btn"
                @click="showEmailChangePassword = !showEmailChangePassword"
              >
                <i
                  :class="
                    showEmailChangePassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                  "
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn-ghost" @click="cancelChangeEmail">បោះបង់</button>
          <button
            class="btn-primary"
            @click="submitChangeEmail"
            :disabled="
              profileStore.profileLoading || !newEmail || !emailChangePassword
            "
          >
            {{
              profileStore.profileLoading ? "កំពុងផ្ញើ..." : "ស្នើផ្លាស់ប្តូរ"
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div
      v-if="showChangePasswordModal"
      class="modal-backdrop"
      @click.self="showChangePasswordModal = false"
    >
      <div class="modal-card">
        <div class="modal-head">
          <h3>ផ្លាស់ប្តូរពាក្យសម្ងាត់</h3>
          <button class="close-btn" @click="showChangePasswordModal = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
            <div class="password-input-wrapper">
              <input
                v-model="passwordForm.currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                placeholder="បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន"
                class="form-input"
              />
              <button
                type="button"
                class="toggle-password-btn"
                @click="showCurrentPassword = !showCurrentPassword"
              >
                <i
                  :class="
                    showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                  "
                ></i>
              </button>
            </div>
          </div>

          <div class="input-group">
            <label>ពាក្យសម្ងាត់ថ្មី</label>
            <div class="password-input-wrapper">
              <input
                v-model="passwordForm.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
                class="form-input"
              />
              <button
                type="button"
                class="toggle-password-btn"
                @click="showNewPassword = !showNewPassword"
              >
                <i
                  :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                ></i>
              </button>
            </div>
          </div>

          <div class="input-group">
            <label>បញ្ជាក់ពាក្យសម្ងាត់ថ្មី</label>
            <div class="password-input-wrapper">
              <input
                v-model="passwordForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :class="{ 'is-invalid': passwordMismatch() }"
                placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                class="form-input"
              />
              <button
                type="button"
                class="toggle-password-btn"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i
                  :class="
                    showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                  "
                ></i>
              </button>
            </div>
            <small v-if="passwordMismatch()" class="text-danger">
              <i class="fas fa-times-circle"></i> ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។
            </small>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn-ghost" @click="cancelChangePassword">
            បោះបង់
          </button>
          <button
            class="btn-primary"
            @click="submitChangePassword"
            :disabled="
              profileStore.profileLoading ||
              passwordMismatch() ||
              !isPasswordFormValid()
            "
          >
            {{
              profileStore.profileLoading
                ? "កំពុងផ្លាស់ប្តូរ..."
                : "រក្សាទុកពាក្យសម្ងាត់ថ្មី"
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- Email Change Success Modal -->
    <div
      v-if="showEmailSuccessModal"
      class="modal-backdrop"
      @click.self="closeEmailSuccessModal"
    >
      <div class="modal-card">
        <div class="modal-head">
          <h3 class="success-title">ជោគជ័យ!</h3>
          <button class="close-btn" @click="closeEmailSuccessModal">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="success-icon-modal mb-4">
            <i class="fas fa-check-circle"></i>
          </div>
          <p class="success-message">
            <strong>អ៊ីមែលត្រូវបានផ្លាស់ប្តូរជោគជ័យ!</strong>
          </p>
          <p class="text-muted">
            អ៊ីមែលរបស់អ្នកគឺ: <strong>{{ profileStore.profile?.email }}</strong>
          </p>
          <p class="text-muted small mt-2">
            អ្នកអាចប្រើអ៊ីមែលថ្មីនេះដើម្បីចូលទៅកាន់គណនីរបស់អ្នកឥឡូវនេះ។
          </p>
        </div>
        <div class="modal-foot">
          <button
            class="btn-primary"
            @click="closeEmailSuccessModal"
            style="width: 100%"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>

    <!-- Password Change Success Modal -->
    <div
      v-if="showPasswordSuccessModal"
      class="modal-backdrop"
      @click.self="closePasswordSuccessModal"
    >
      <div class="modal-card">
        <div class="modal-head">
          <h3 class="success-title">ជោគជ័យ!</h3>
          <button class="close-btn" @click="closePasswordSuccessModal">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="success-icon-modal mb-4">
            <i class="fas fa-check-circle"></i>
          </div>
          <p class="success-message">
            <strong>ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្តូរជោគជ័យ!</strong>
          </p>
          <p class="text-muted">
            ពាក្យសម្ងាត់របស់អ្នកត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ។
          </p>
        </div>
        <div class="modal-foot">
          <button
            class="btn-primary"
            @click="closePasswordSuccessModal"
            style="width: 100%"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>

    <!-- Email Change Request Success Modal -->
    <div
      v-if="showEmailRequestModal"
      class="modal-backdrop"
      @click.self="closeEmailRequestModal"
    >
      <div class="modal-card">
        <div class="modal-head">
          <h3 class="success-title">ផ្ញើជោគជ័យ!</h3>
          <button class="close-btn" @click="closeEmailRequestModal">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="success-icon-modal mb-4">
            <i class="fas fa-envelope-open-text"></i>
          </div>
          <p class="success-message">
            <strong>លេខកូដផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើ!</strong>
          </p>
          <p class="text-muted">
            យើងបានផ្ញើលេខកូដផ្ទៀងផ្ទាត់ទៅ <strong>{{ pendingEmail }}</strong>
          </p>
          <p class="text-muted small mt-2">
            សូមពិនិត្យប្រអប់ទទួលរបស់អ្នក (រួមទាំង Spam/Junk)។
          </p>
        </div>
        <div class="modal-foot">
          <button
            class="btn-primary"
            @click="closeEmailRequestModal"
            style="width: 100%"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div
      v-if="showDeleteModal"
      class="modal-backdrop"
      @click.self="showDeleteModal = false"
    >
      <div class="modal-card">
        <div class="modal-head">
          <h3>បញ្ជាក់ការលុបគណនី</h3>
          <button class="close-btn" @click="showDeleteModal = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <p>
            <strong>បញ្ជាក់: </strong>តើអ្នកពិតជាចង់លុបគណនីរបស់អ្នកឬទេ?
            សកម្មភាពនេះនឹង:
          </p>
          <ul style="margin-left: 20px; margin-top: 12px">
            <li>លុបទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកទាំងអស់</li>
            <li>លុបការកំណត់គណនីរបស់អ្នក</li>
            <li>មិនអាចត្រឡប់មកវិញបានទេ</li>
          </ul>
          <div class="input-group mt-4">
            <label>សូមបញ្ចូលអ៊ីមែលរបស់អ្នកដើម្បីបញ្ជាក់</label>
            <input
              v-model.trim="deleteConfirmEmail"
              type="email"
              placeholder="អ៊ីមែលរបស់អ្នក"
              class="form-input"
            />
          </div>
          <div class="input-group">
            <label>សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នកដើម្បីបញ្ជាក់</label>
            <div class="password-input-wrapper">
              <input
                v-model="deleteConfirmPassword"
                :type="showDeletePassword ? 'text' : 'password'"
                placeholder="ពាក្យសម្ងាត់របស់អ្នក"
                class="form-input"
              />
              <button
                type="button"
                class="toggle-password-btn"
                @click="showDeletePassword = !showDeletePassword"
              >
                <i
                  :class="
                    showDeletePassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                  "
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn-ghost" @click="showDeleteModal = false">
            បោះបង់
          </button>
          <button
            class="btn-danger"
            @click="confirmDeleteAccount"
            :disabled="
              profileStore.profileLoading ||
              deleteConfirmEmail !== profileStore.profile?.email ||
              !deleteConfirmPassword
            "
          >
            {{
              profileStore.profileLoading ? "កំពុងលុប..." : "លុបគណនីរបស់ខ្ញុំ"
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div
      v-if="profileStore.profileError"
      class="modal-backdrop"
      @click.self="profileStore.profileError = null"
    >
      <div class="modal-card">
        <div class="modal-head">
          <h3 class="error-title">កំហុស!</h3>
          <button class="close-btn" @click="profileStore.profileError = null">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="error-icon-modal mb-4">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <p class="error-message">
            <strong>{{ profileStore.profileError }}</strong>
          </p>
        </div>
        <div class="modal-foot">
          <button
            class="btn-primary"
            @click="profileStore.profileError = null"
            style="width: 100%"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="profileStore.profileSuccess"
      class="modal-backdrop"
      @click.self="profileStore.profileSuccess = null"
    >
      <div class="modal-card">
        <div class="modal-head">
          <h3 class="success-title">ជោគជ័យ!</h3>
          <button class="close-btn" @click="profileStore.profileSuccess = null">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="success-icon-modal mb-4">
            <i class="fas fa-check-circle"></i>
          </div>
          <p class="success-message">
            <strong>{{ profileStore.profileSuccess }}</strong>
          </p>
        </div>
        <div class="modal-foot">
          <button
            class="btn-primary"
            @click="profileStore.profileSuccess = null"
            style="width: 100%"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProfileStore } from "@/stores/profilestore";
import { useRoute, useRouter } from "vue-router";

const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();

// Modal states
const showChangeEmailModal = ref(false);
const showChangePasswordModal = ref(false);
const showPasswordSuccessModal = ref(false);
const showEmailRequestModal = ref(false);
const showEmailSuccessModal = ref(false);
const showDeleteModal = ref(false);

// Email change state
const newEmail = ref("");
const emailChangePassword = ref("");
const showEmailChangePassword = ref(false);
const isEmailChangePending = ref(false);
const pendingEmail = ref("");

// Password change state
const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Delete account state
const deleteConfirmEmail = ref("");
const deleteConfirmPassword = ref("");
const showDeletePassword = ref(false);

// Settings state
const settings = ref({
  emailNotifications: true,
  profilePublic: false,
});

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("km-KH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const passwordMismatch = () => {
  if (!passwordForm.value.confirmPassword) return false;
  return passwordForm.value.newPassword !== passwordForm.value.confirmPassword;
};

const isPasswordFormValid = () => {
  return (
    passwordForm.value.currentPassword &&
    passwordForm.value.newPassword &&
    passwordForm.value.confirmPassword &&
    !passwordMismatch()
  );
};

// Email change handlers
const submitChangeEmail = async () => {
  profileStore.clearMessages();

  if (!newEmail.value || !emailChangePassword.value) {
    profileStore.profileError = "សូមបំពេញព័ត៌មានទាំងអស់។";
    return;
  }

  const success = await profileStore.changeEmail(
    newEmail.value,
    emailChangePassword.value,
  );

  if (success) {
    showEmailRequestModal.value = true;
    pendingEmail.value = newEmail.value;
    isEmailChangePending.value = true;
    showChangeEmailModal.value = false;
    newEmail.value = "";
    emailChangePassword.value = "";
  }
};

const cancelChangeEmail = () => {
  showChangeEmailModal.value = false;
  newEmail.value = "";
  emailChangePassword.value = "";
  profileStore.profileError = null;
};

const closeEmailSuccessModal = async () => {
  showEmailSuccessModal.value = false;
  router.replace({ query: {} });
  await profileStore.getProfile();
};

const closeEmailRequestModal = () => {
  showEmailRequestModal.value = false;
};

// Password change handlers
const submitChangePassword = async () => {
  profileStore.clearMessages();

  if (!isPasswordFormValid()) {
    profileStore.profileError = "សូមបំពេញព័ត៌មានត្រឹមត្រូវ។";
    return;
  }

  const success = await profileStore.changePassword(
    passwordForm.value.currentPassword,
    passwordForm.value.newPassword,
    passwordForm.value.confirmPassword,
  );

  if (success) {
    showPasswordSuccessModal.value = true;
    showChangePasswordModal.value = false;
    cancelChangePassword();
  }
};

const cancelChangePassword = () => {
  showChangePasswordModal.value = false;
  passwordForm.value = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  profileStore.profileError = null;
};

const closePasswordSuccessModal = () => {
  showPasswordSuccessModal.value = false;
};

// Delete account handler
const confirmDeleteAccount = async () => {
  if (deleteConfirmEmail.value !== profileStore.profile?.email) {
    profileStore.profileError = "អ៊ីមែលមិនត្រឹមត្រូវ។";
    return;
  }

  if (!deleteConfirmPassword.value) {
    profileStore.profileError = "សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក។";
    return;
  }

  const success = await profileStore.deleteAccount(
    deleteConfirmEmail.value,
    deleteConfirmPassword.value,
  );

  if (success) {
    showDeleteModal.value = false;
    router.push("/login");
  }
};

const saveSettings = () => {
  // console.log("Settings saved:", settings.value);
};

onMounted(async () => {
  await profileStore.getProfile();

  const emailChanged = route.query.emailChanged;

  if (emailChanged === "success") {
    showEmailSuccessModal.value = true;
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.settings-container {
  font-family: "Inter", "Kantumruy Pro", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 24px;
  /* background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
  min-height: 100vh;
}

.settings-header-top {
  margin-bottom: 40px;
}

.settings-header-top h1 {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #0d9488 0%, #036058 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.settings-header-top p {
  color: #64748b;
  font-size: 0.95rem;
}

.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 600;
  animation: slideIn 0.3s ease;
  position: relative;
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

.alert-error {
  background: #fee;
  color: #c00;
  border-left: 4px solid #c00;
}

.alert-success {
  background: #efe;
  color: #0d9488;
  border-left: 4px solid #0d9488;
}

.close-alert {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.close-alert:hover {
  opacity: 1;
}

.settings-grid {
  display: grid;
  gap: 24px;
}

.settings-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.settings-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.danger-card {
  border: 2px solid #fee;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-bottom: 1.5px solid #f1f5f9;
}

.icon-box {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #0d9488 0%, #018a7f 100%);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-box i {
  font-size: 20px;
  color: white;
}

.red-icon {
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
}

.card-header h3 {
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.card-header p {
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
}

.card-body {
  padding: 24px;
}

.info-grid {
  display: grid;
  gap: 16px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: #f8fafc;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.data-row:hover {
  background: #f1f5f9;
}

.data-label {
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

.data-value {
  color: #0f172a;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
}

.form-container {
  display: grid;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  color: #475569;
  font-size: 14px;
  font-weight: 600;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.is-invalid {
  border-color: #ef4444;
  background: #fef2f2;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-password-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #0d9488;
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
  transition: color 0.3s ease;
}

.toggle-password-btn:hover {
  color: #02ad83;
}

.action-group {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn-primary,
.btn-outline,
.btn-danger,
.btn-ghost {
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #0d9488 0%, #018a7f 100%);
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

.btn-outline {
  background: white;
  border: 1.5px solid #0d9488;
  color: #0d9488;
  justify-content: center;
  text-align: center;
}

.btn-outline:hover {
  background: #0d9488;
  color: white;
}

.btn-danger {
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 101, 101, 0.4);
}

.btn-ghost {
  background: transparent;
  color: #64748b;
  border: 1.5px solid #e2e8f0;
}

.btn-ghost:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.switch-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.switch-title {
  color: #0f172a;
  font-size: 15px;
  font-weight: 600;
}

.switch-desc {
  color: #64748b;
  font-size: 13px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.4s;
  border-radius: 28px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: linear-gradient(135deg, #0d9488 0%, #018a7f 100%);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.danger-item h4 {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.text-muted {
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(6px);
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
  width: 90%;
  max-width: 450px;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
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

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1.5px solid #e2e8f0;
}

.modal-head h3 {
  margin: 0;
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.modal-head h3.success-title {
  color: #15803d;
}

.modal-head h3.error-title {
  color: #dc2626;
}

.error-icon-modal {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease;
}

.error-icon-modal i {
  font-size: 60px;
  color: white;
}

.success-icon-modal {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease;
}

.success-icon-modal i {
  font-size: 60px;
  color: white;
}

/* Fix button text alignment - update all button styles */
.btn-primary,
.btn-outline,
.btn-danger,
.btn-ghost {
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center; /* Add this to center text */
  gap: 8px;
  text-align: center; /* Add this as well */
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #cbd5e1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #64748b;
}

.modal-body {
  margin-bottom: 24px;
  color: #475569;
  font-size: 14px;
  line-height: 1.6;
}

.modal-body p {
  margin: 0 0 12px 0;
}

.modal-body strong {
  color: #0f172a;
  font-weight: 700;
}

.modal-body p.success-message {
  color: #15803d;
  font-size: 16px;
  text-align: center;
}

.modal-foot {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.modal-foot button {
  flex: 1;
}

.divider {
  height: 1.5px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 24px 0;
}

.text-danger {
  color: #ef4444;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}

.text-danger i {
  font-size: 14px;
}

.text-center {
  text-align: center;
}

.py-6 {
  padding-top: 24px;
  padding-bottom: 24px;
}

.text-primary {
  color: #0d9488;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-2 {
  margin-top: 8px;
}

.mt-3 {
  margin-top: 12px;
}

.mt-4 {
  margin-top: 16px;
}

.small {
  font-size: 13px;
}

.fa-3x {
  font-size: 48px;
}

@media (max-width: 768px) {
  .settings-container {
    padding: 30px 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .settings-grid {
    gap: 20px;
  }

  .card-header {
    padding: 20px;
  }

  .card-body {
    padding: 20px;
  }

  .danger-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .btn-danger {
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  .action-group {
    flex-direction: column;
  }

  .action-group button {
    width: 100%;
  }

  .modal-card {
    max-width: 90%;
    padding: 20px;
  }

  .switch-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .toggle-switch {
    margin-left: 0;
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .settings-header-top h1 {
    font-size: 24px;
  }

  .card-header {
    gap: 12px;
  }

  .icon-box {
    width: 40px;
    height: 40px;
    font-size: 18px;
    color: white;
  }

  .card-header h3 {
    font-size: 16px;
  }

  .card-header p {
    font-size: 12px;
  }

  .btn-primary,
  .btn-outline,
  .btn-danger,
  .btn-ghost {
    padding: 10px 16px;
    font-size: 13px;
  }

  .data-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .data-value {
    text-align: left;
    width: 100%;
  }
}
</style>
