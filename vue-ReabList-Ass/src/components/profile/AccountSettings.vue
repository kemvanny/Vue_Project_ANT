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

    <!-- Error Alert -->
    <div v-if="authStore.profileError" class="alert alert-error">
      <i class="fas fa-exclamation-circle"></i>
      {{ authStore.profileError }}
      <button @click="authStore.profileError = null" class="close-alert">
        &times;
      </button>
    </div>

    <!-- Success Alert -->
    <div v-if="authStore.profileSuccess" class="alert alert-success">
      <i class="fas fa-check-circle"></i>
      {{ authStore.profileSuccess }}
      <button @click="authStore.profileSuccess = null" class="close-alert">
        &times;
      </button>
    </div>

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
            <span class="data-value">{{ authStore.profile?.fullname }}</span>
          </div>
          <div class="data-row">
            <span class="data-label">អាសយដ្ឋានអ៊ីមែល</span>
            <span class="data-value">{{ authStore.profile?.email }}</span>
          </div>
          <div class="data-row">
            <span class="data-label">កាលបរិច្ឆេទចូលរួម</span>
            <span class="data-value">{{
              formatDate(authStore.profile?.created_at)
            }}</span>
          </div>
        </div>
      </section>

      <section class="settings-card">
        <div class="card-header">
          <div class="icon-box"><i class="fas fa-envelope"></i></div>
          <div>
            <h3>ផ្លាស់ប្តូរអ៊ីមែល</h3>
            <p>ប្រើសម្រាប់ផ្ទៀងផ្ទាត់ និងការជូនដំណឹងផ្សេងៗ។</p>
          </div>
        </div>

        <div class="card-body">
          <div v-if="!showChangeEmail && !showVerifyEmail">
            <button class="btn-outline" @click="showChangeEmail = true">
              <i class="fas fa-pen"></i> កែប្រែអ៊ីមែល
            </button>
          </div>

          <div v-if="showChangeEmail" class="form-container">
            <div class="input-group">
              <label>អ៊ីមែលថ្មី</label>
              <input
                v-model="newEmail"
                type="email"
                placeholder="បញ្ចូលអុីមែល"
                class="form-input"
              />
            </div>
            <br />
            <div class="action-group">
              <button
                class="btn-primary"
                @click="submitChangeEmail"
                :disabled="authStore.profileLoading"
              >
                {{
                  authStore.profileLoading
                    ? "កំពុងផ្ញើ..."
                    : "ផ្ញើលេខកូដផ្ទៀងផ្ទាត់"
                }}
              </button>
              <button class="btn-ghost" @click="cancelChangeEmail">
                បោះបង់
              </button>
            </div>
          </div>

          <div v-if="showVerifyEmail" class="form-container verify-box">
            <p class="helper-text">
              លេខកូដបានផ្ញើទៅកាន់ <strong>{{ newEmail }}</strong>
            </p>
            <input
              v-model="verificationCode"
              type="text"
              placeholder="បញ្ចូលលេខ ៦ ខ្ទង់"
              class="form-input code-input"
            />
            <div class="action-group">
              <button
                class="btn-primary"
                @click="submitVerifyEmail"
                :disabled="authStore.profileLoading"
              >
                បញ្ជាក់លេខកូដ
              </button>
              <button
                class="btn-outline"
                @click="resendEmailCode"
                :disabled="authStore.profileLoading"
              >
                <i class="fas fa-redo"></i> ផ្ញើលេខកូដឡើងវិញ
              </button>
              <button class="btn-ghost" @click="cancelVerifyEmail">
                បោះបង់
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-card">
        <div class="card-header">
          <div class="icon-box"><i class="fas fa-lock"></i></div>
          <div>
            <h3>ផ្លាស់ប្តូរពាក្យសម្ងាត់</h3>
            <p>ធានាសុវត្ថិភាពគណនីរបស់អ្នកដោយរក្សាដាក់ពាក្យសម្ងាត់ដែលរឹងមាំ។</p>
          </div>
        </div>

        <div class="card-body">
          <div v-if="!showChangePassword">
            <button class="btn-outline" @click="showChangePassword = true">
              <i class="fas fa-key"></i> ផ្លាស់ប្តូរពាក្យសម្ងាត់
            </button>
          </div>

          <div v-if="showChangePassword" class="form-container">
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
            <br />

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
              <div class="password-strength">
                <span
                  :class="[
                    'strength-bar',
                    getPasswordStrength(passwordForm.newPassword),
                  ]"
                ></span>
                <span class="strength-text">{{
                  getPasswordStrengthText(passwordForm.newPassword)
                }}</span>
              </div>
            </div>
            <br />

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
            <br />

            <div class="action-group">
              <button
                class="btn-primary"
                @click="submitChangePassword"
                :disabled="authStore.profileLoading || passwordMismatch()"
              >
                {{
                  authStore.profileLoading
                    ? "កំពុងផ្លាស់ប្តូរ..."
                    : "រក្សាទុកពាក្យសម្ងាត់ថ្មី"
                }}
              </button>
              <button class="btn-ghost" @click="cancelChangePassword">
                បោះបង់
              </button>
            </div>
          </div>
        </div>
      </section>

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

      <section class="settings-card danger-card">
        <div class="card-header">
          <div class="icon-box red-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <h3>តំបន់គ្រោះថ្នាក់</h3>
            <p>សកម្មភាពទាំងនេះមិនអាចត្រឡប់ថយក្រោយវិញបានទេ។</p>
          </div>
        </div>
        <div class="card-body danger-grid">
          <div class="danger-item">
            <div class="danger-text">
              <strong>លុបគណនីរបស់អ្នក</strong>
              <p>ទិន្នន័យរបស់អ្នកនឹងត្រូវលុបចោលជាអចិន្ត្រៃយ៍។</p>
            </div>
            <button class="btn-danger" @click="confirmDeleteAccount">
              លុបគណនី
            </button>
          </div>
        </div>
      </section>
    </div>

    <Transition name="fade">
      <div v-if="showLogoutModal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-head">
            <h3>ចាកចេញពីគ្រប់វគ្គ?</h3>
            <button @click="showLogoutModal = false" class="close-btn">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p>
              តើអ្នកប្រាកដថាចង់ចាកចេញពីវគ្គសម្ភាសទាំងអស់?
              អ្នកនឹងត្រូវចូលបានម្តងទៀត។
            </p>
          </div>
          <div class="modal-foot">
            <button class="btn-ghost" @click="showLogoutModal = false">
              បោះបង់
            </button>
            <button class="btn-danger" @click="confirmLogoutAll">
              បាទ/ចាស! ចាកចេញ
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showDeleteModal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-head">
            <h3>លុបគណនី?</h3>
            <button @click="showDeleteModal = false" class="close-btn">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p>
              ដើម្បីបញ្ជាក់ថាអ្នកពិតជាចង់លុប សូមបញ្ចូលអ៊ីមែល
              <strong>{{ authStore.profile?.email }}</strong> ខាងក្រោម៖
            </p>
            <input
              v-model="deleteConfirmation.email"
              type="email"
              class="form-input"
              placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
            />
          </div>
          <div class="modal-foot">
            <button class="btn-ghost" @click="showDeleteModal = false">
              បោះបង់
            </button>
            <button
              class="btn-danger"
              :disabled="
                deleteConfirmation.email !== authStore.profile?.email ||
                authStore.profileLoading
              "
              @click="deleteAccountConfirmed"
            >
              {{ authStore.profileLoading ? "កំពុងលុប..." : "លុបឥឡូវនេះ" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Email Change Confirmation Modal -->
    <Transition name="fade">
      <div
        v-if="showEmailChangeConfirmModal"
        class="modal-backdrop"
        @click="showEmailChangeConfirmModal = false"
      >
        <div class="modal-card" @click.stop>
          <div class="modal-head">
            <h3>ផ្លាស់ប្តូរអ៊ីមែល?</h3>
            <button
              @click="showEmailChangeConfirmModal = false"
              class="close-btn"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p>
              ពិតដែលឬទេដែលចង់ផ្លាស់ប្តូរអ៊ីមែលរបស់អ្នកទៅ
              <strong>{{ newEmail }}</strong
              >?
            </p>
            <p class="helper-text">
              <i class="fas fa-info-circle"></i>
              លេខកូដផ្ទៀងផ្ទាត់នឹងត្រូវផ្ញើឱ្យលឿនៗ។
            </p>
          </div>
          <div class="modal-foot">
            <button
              class="btn-ghost"
              @click="showEmailChangeConfirmModal = false"
            >
              បោះបង់
            </button>
            <button
              class="btn-primary"
              @click="confirmEmailChange"
              :disabled="authStore.profileLoading"
            >
              {{
                authStore.profileLoading
                  ? "កំពុងផ្ញើ..."
                  : "បាទ/ចាស! ផ្លាស់ប្តូរ"
              }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Email Verification Confirmation Modal -->
    <Transition name="fade">
      <div
        v-if="showEmailVerifyConfirmModal"
        class="modal-backdrop"
        @click="showEmailVerifyConfirmModal = false"
      >
        <div class="modal-card" @click.stop>
          <div class="modal-head">
            <h3>បញ្ជាក់ផ្លាស់ប្តូរអ៊ីមែល?</h3>
            <button
              @click="showEmailVerifyConfirmModal = false"
              class="close-btn"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p>
              ផ្លាស់ប្តូរលេខកូដ <strong>{{ verificationCode }}</strong> ដែរឬទេ?
            </p>
            <p class="helper-text">
              <i class="fas fa-info-circle"></i> សូមធានាថាលេខកូដត្រឹមត្រូវ។
            </p>
          </div>
          <div class="modal-foot">
            <button
              class="btn-ghost"
              @click="showEmailVerifyConfirmModal = false"
            >
              បោះបង់
            </button>
            <button
              class="btn-primary"
              @click="confirmEmailVerify"
              :disabled="authStore.profileLoading"
            >
              {{
                authStore.profileLoading
                  ? "កំពុងផ្ទៀងផ្ទាត់..."
                  : "បាទ/ចាស! បញ្ជាក់"
              }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Password Change Confirmation Modal -->
    <Transition name="fade">
      <div
        v-if="showPasswordConfirmModal"
        class="modal-backdrop"
        @click="showPasswordConfirmModal = false"
      >
        <div class="modal-card" @click.stop>
          <div class="modal-head">
            <h3>ផ្លាស់ប្តូរពាក្យសម្ងាត់?</h3>
            <button @click="showPasswordConfirmModal = false" class="close-btn">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p>តើអ្នកប្រាកដថាចង់ផ្លាស់ប្តូរពាក្យសម្ងាត់របស់អ្នកដែរឬទេ?</p>
            <p class="helper-text">
              <i class="fas fa-lock"></i> ធានាថាពាក្យសម្ងាត់ថ្មីមានការពារលម្អិត។
            </p>
          </div>
          <div class="modal-foot">
            <button class="btn-ghost" @click="showPasswordConfirmModal = false">
              បោះបង់
            </button>
            <button
              class="btn-primary"
              @click="confirmPasswordChange"
              :disabled="authStore.profileLoading || passwordMismatch()"
            >
              {{
                authStore.profileLoading
                  ? "កំពុងផ្លាស់ប្តូរ..."
                  : "បាទ/ចាស! ផ្លាស់ប្តូរ"
              }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Settings Save Confirmation Modal -->
    <Transition name="fade">
      <div
        v-if="showSettingsSaveModal"
        class="modal-backdrop"
        @click="showSettingsSaveModal = false"
      >
        <div class="modal-card" @click.stop>
          <div class="modal-head">
            <h3>រក្សាទុកការកំណត់?</h3>
            <button @click="showSettingsSaveModal = false" class="close-btn">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p>អ្នកប្រាកដថាចង់រក្សាទុកការកំណត់ឯកជនភាពនេះដែរឬទេ?</p>
          </div>
          <div class="modal-foot">
            <button class="btn-ghost" @click="showSettingsSaveModal = false">
              បោះបង់
            </button>
            <button class="btn-primary" @click="confirmSettingsSave">
              រក្សាទុក
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Password Change Result Modal -->
    <Transition name="fade">
      <div
        v-if="showPasswordChangeModal"
        class="modal-backdrop"
        @click="showPasswordChangeModal = false"
      >
        <div class="modal-card" @click.stop>
          <div class="modal-head">
            <h3
              :class="{
                'success-title': passwordChangeResult.success,
                'error-title': !passwordChangeResult.success,
              }"
            >
              {{ passwordChangeResult.success ? "✓ ជោគជ័យ" : "✕ មានបញ្ហា" }}
            </h3>
            <button @click="showPasswordChangeModal = false" class="close-btn">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p
              :class="{
                'success-message': passwordChangeResult.success,
                'error-message': !passwordChangeResult.success,
              }"
            >
              {{ passwordChangeResult.message }}
            </p>
          </div>
          <div class="modal-foot">
            <button
              :class="
                passwordChangeResult.success ? 'btn-primary' : 'btn-danger'
              "
              @click="showPasswordChangeModal = false"
            >
              {{ passwordChangeResult.success ? "ល្អ!" : "ព្យាយាមម្តងទៀត" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useProfileStore } from "@/stores/profilestore";
import { useRouter } from "vue-router";

const authStore = useProfileStore();
const router = useRouter();

const settings = ref({
  emailNotifications: true,
  emailDigest: true,
  profilePublic: false,
  allowMessages: true,
});

const showDeleteModal = ref(false);
const showLogoutModal = ref(false);
const showPasswordChangeModal = ref(false);
const showEmailChangeConfirmModal = ref(false);
const showEmailVerifyConfirmModal = ref(false);
const showPasswordConfirmModal = ref(false);
const showSettingsSaveModal = ref(false);
const passwordChangeResult = ref({
  success: false,
  message: "",
});
const deleteConfirmation = ref({
  email: "",
});

const showChangeEmail = ref(false);
const showVerifyEmail = ref(false);
const newEmail = ref("");
const verificationCode = ref("");

const showChangePassword = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const formatDate = (date) => {
  if (!date) return "មិនដាច់ដោយឡែក";
  const d = new Date(date);
  return new Intl.DateTimeFormat("km-KH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

const passwordMismatch = () => {
  return (
    passwordForm.value.newPassword &&
    passwordForm.value.confirmPassword &&
    passwordForm.value.newPassword !== passwordForm.value.confirmPassword
  );
};

const getPasswordStrength = (password) => {
  if (!password) return "weak";
  if (password.length >= 12) return "strong";
  if (password.length >= 8) return "medium";
  return "weak";
};

const getPasswordStrengthText = (password) => {
  if (!password) return "";
  const strength = getPasswordStrength(password);
  if (strength === "strong") return "រឹងមាំ";
  if (strength === "medium") return "មធ្យម";
  return "ខ្សោយ";
};

const saveSettings = async () => {
  showSettingsSaveModal.value = true;
};

const confirmSettingsSave = () => {
  showSettingsSaveModal.value = false;
  authStore.profileSuccess = "ការកំណត់បានរក្សាទុកបានជោគជ័យ!";
  setTimeout(() => {
    authStore.profileSuccess = null;
  }, 3000);
};

const submitChangePassword = async () => {
  authStore.profileError = null;

  // Validation: Current password
  if (
    !passwordForm.value.currentPassword ||
    passwordForm.value.currentPassword.trim() === ""
  ) {
    authStore.profileError = "សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន។";
    console.warn("Validation error: Current password is empty");
    return;
  }

  // Validation: New password length
  if (
    !passwordForm.value.newPassword ||
    passwordForm.value.newPassword.length < 8
  ) {
    authStore.profileError = "ពាក្យសម្ងាត់ថ្មីត្រូវតែមានយ៉ាងហោចណាស់ ៨ តួអក្សរ។";
    console.warn("Validation error: New password too short");
    return;
  }

  // Validation: Password mismatch
  if (passwordMismatch()) {
    authStore.profileError = "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។";
    console.warn("Validation error: Passwords don't match");
    return;
  }

  // Validation: Same as current password
  if (passwordForm.value.currentPassword === passwordForm.value.newPassword) {
    authStore.profileError =
      "ពាក្យសម្ងាត់ថ្មីត្រូវមានភាពខុសប្លែកពីពាក្យសម្ងាត់បច្ចុប្បន្ន។";
    console.warn("Validation error: New password same as current");
    return;
  }

  console.log("Password validation passed, showing confirmation modal");
  // Show confirmation modal instead of calling API directly
  showPasswordConfirmModal.value = true;
};

const confirmPasswordChange = async () => {
  showPasswordConfirmModal.value = false;
  authStore.profileError = null;

  try {
    console.log("Confirming password change with values:", {
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword,
      confirmPassword: passwordForm.value.confirmPassword,
    });

    const result = await authStore.changePassword(
      passwordForm.value.currentPassword,
      passwordForm.value.newPassword,
      passwordForm.value.confirmPassword,
    );

    console.log("Password change result:", result);

    if (result) {
      passwordChangeResult.value = {
        success: true,
        message: "ពាក្យសម្ងាត់បានផ្លាស់ប្តូរបានជោគជ័យ!",
      };
      showPasswordChangeModal.value = true;
      cancelChangePassword();
    } else {
      passwordChangeResult.value = {
        success: false,
        message:
          authStore.profileError || "មានបញ្ហាក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់។",
      };
      showPasswordChangeModal.value = true;
    }
  } catch (error) {
    console.error("Exception in password change:", error);
    passwordChangeResult.value = {
      success: false,
      message: error.message || "មានបញ្ហាក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់។",
    };
    showPasswordChangeModal.value = true;
  }
};

const cancelChangePassword = () => {
  showChangePassword.value = false;
  passwordForm.value = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  showCurrentPassword.value = false;
  showNewPassword.value = false;
  showConfirmPassword.value = false;
};

const submitChangeEmail = async () => {
  authStore.profileError = null;

  // Validation: Email is required
  if (!newEmail.value || newEmail.value.trim() === "") {
    authStore.profileError = "សូមបញ្ចូលអ៊ីមែលថ្មី។";
    console.warn("Email is empty");
    return;
  }

  // Validation: Valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail.value)) {
    authStore.profileError = "សូមបញ្ចូលអ៊ីមែលដែលមានលក្ខណៈពិសេស។";
    console.warn("Invalid email format:", newEmail.value);
    return;
  }

  // Validation: Email should not be the same as current
  if (newEmail.value === authStore.profile?.email) {
    authStore.profileError =
      "អ៊ីមែលថ្មីត្រូវមានភាពខុសប្លែកពីអ៊ីមែលបច្ចុប្បន្ន។";
    console.warn("New email same as current:", newEmail.value);
    return;
  }

  console.log("Email validation passed, showing confirmation modal");
  // Show confirmation modal
  showEmailChangeConfirmModal.value = true;
};

const confirmEmailChange = async () => {
  showEmailChangeConfirmModal.value = false;
  authStore.profileError = null;
  authStore.profileSuccess = null;

  console.log("Confirming email change to:", newEmail.value);
  console.log("Current email:", authStore.profile?.email);

  const result = await authStore.changeEmail(newEmail.value);

  if (result) {
    console.log("Email change request sent successfully");
    showChangeEmail.value = false;
    showVerifyEmail.value = true;
    verificationCode.value = "";
    console.log("Now showing verification code input");
  } else {
    console.log("Email change request failed. Error:", authStore.profileError);
    showChangeEmail.value = false;
  }
};

const cancelChangeEmail = () => {
  showChangeEmail.value = false;
  showVerifyEmail.value = false;
  newEmail.value = "";
  verificationCode.value = "";
  authStore.profileError = null;
  authStore.profileSuccess = null;
  console.log("Email change cancelled");
};

const submitVerifyEmail = async () => {
  authStore.profileError = null;

  if (!verificationCode.value || verificationCode.value.trim().length === 0) {
    authStore.profileError = "សូមបញ្ចូលលេខកូដផ្ទៀងផ្ទាត់។";
    console.warn("Verification code is empty");
    return;
  }

  // Show confirmation modal
  showEmailVerifyConfirmModal.value = true;
};

const confirmEmailVerify = async () => {
  showEmailVerifyConfirmModal.value = false;
  authStore.profileError = null;
  authStore.profileSuccess = null;

  console.log("Attempting to verify email with code:", verificationCode.value);
  const result = await authStore.verifyChangeEmail(verificationCode.value);

  if (result) {
    console.log("Email verification successful");
    console.log("Updated user email:", authStore.profile?.email);

    // Reset form and close all dialogs
    showVerifyEmail.value = false;
    showChangeEmail.value = false;
    newEmail.value = "";
    verificationCode.value = "";

    // Show success message
    authStore.profileSuccess = "អ៊ីមែលបានផ្លាស់ប្តូរដោយជោគជ័យ!";

    // Auto-dismiss success message
    setTimeout(() => {
      authStore.profileSuccess = null;
    }, 3000);
  } else {
    console.log("Email verification failed. Error:", authStore.profileError);
    showVerifyEmail.value = false;
  }
};

const cancelVerifyEmail = () => {
  showVerifyEmail.value = false;
  showChangeEmail.value = false;
  newEmail.value = "";
  verificationCode.value = "";
  authStore.profileError = null;
  authStore.profileSuccess = null;
  console.log("Email verification cancelled");
};

const resendEmailCode = async () => {
  authStore.profileError = null;
  authStore.profileSuccess = null;

  if (!newEmail.value || newEmail.value.trim() === "") {
    authStore.profileError = "អ៊ីមែលគឺខ្វះ។";
    console.warn("Email is empty");
    return;
  }

  console.log("Resending verification code to:", newEmail.value);
  const result = await authStore.changeEmail(newEmail.value);
  if (result) {
    verificationCode.value = "";
    console.log("Verification code resent successfully");
    // The success message is already set in changeEmail
  } else {
    console.log("Resend failed. Error:", authStore.profileError);
  }
};

const confirmLogoutAll = async () => {
  showLogoutModal.value = false;
  const { useAuthStore } = await import("@/stores/authentication");
  const authStoreInstance = useAuthStore();
  authStoreInstance.logout();
  await router.push("/login");
};

const confirmDeleteAccount = () => {
  showDeleteModal.value = true;
};

const deleteAccountConfirmed = async () => {
  authStore.profileError = null;

  if (deleteConfirmation.value.email !== authStore.profile?.email) {
    authStore.profileError =
      "អ៊ីមែលមិនត្រូវគ្នាទេ។ សូមប្រាកដថាអ៊ីមែលត្រឹមត្រូវ។";
    console.warn(
      "Email mismatch. Expected:",
      authStore.profile?.email,
      "Got:",
      deleteConfirmation.value.email,
    );
    return;
  }

  console.log("Attempting to delete account for:", authStore.profile?.email);
  const result = await authStore.deleteAccount(deleteConfirmation.value.email);
  if (result) {
    console.log("Account deleted successfully");
    authStore.profileSuccess = "គណនីបានលុបដោយជោគជ័យ។ បង្វែរទៅរៀងរាល់ដង...";
    deleteConfirmation.value.email = "";
    setTimeout(async () => {
      showDeleteModal.value = false;
      await router.push("/");
    }, 2000);
  } else {
    console.log("Account deletion failed. Error:", authStore.profileError);
  }
};

onMounted(() => {
  // Load user settings from localStorage or API
  const savedSettings = localStorage.getItem("accountSettings");
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings);
  }
});

// Auto-dismiss error and success messages after timeout
watch(
  () => authStore.profileError,
  (newVal) => {
    if (newVal) {
      const timeout = setTimeout(() => {
        authStore.profileError = null;
      }, 5000);
      return () => clearTimeout(timeout);
    }
  },
);

watch(
  () => authStore.profileSuccess,
  (newVal) => {
    if (newVal) {
      const timeout = setTimeout(() => {
        authStore.profileSuccess = null;
      }, 4000);
      return () => clearTimeout(timeout);
    }
  },
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.settings-container {
  font-family: "Inter", "Kantumruy Pro", sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #1e293b;
}

.settings-header-top {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.settings-header-top h1 {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.settings-header-top p {
  color: #64748b;
  font-size: 15px;
  margin: 0;
  font-weight: 500;
}

.btn-logout {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-family: "Inter", "Kantumruy Pro", sans-serif;
}

.btn-logout:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
}

.btn-logout:active {
  transform: translateY(0);
}

/* Alert Messages */
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
  border-left: 4px solid;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.alert-error {
  background: #fef2f2;
  color: #991b1b;
  border-left-color: #ef4444;
  border-right: 1px solid #fecaca;
}

.alert-error i {
  color: #ef4444;
  font-size: 16px;
}

.alert-success {
  background: #f0fdf4;
  color: #15803d;
  border-left-color: #22c55e;
  border-right: 1px solid #bbf7d0;
}

.alert-success i {
  color: #22c55e;
  font-size: 16px;
}

.close-alert {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
  margin-left: auto;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  padding: 0;
}

.close-alert:hover {
  opacity: 1;
}

.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Card Styling */
.settings-card {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.settings-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding: 28px;
  display: flex;
  align-items: flex-start;
  gap: 18px;
  border-bottom: 1.5px solid #f1f5f9;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
}

.icon-box {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #6366f1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.settings-card:hover .icon-box {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  transform: scale(1.05);
}

.red-icon {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #ef4444;
}

.settings-card:hover .red-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.3px;
}

.card-header p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.card-body {
  padding: 28px;
}

/* Info Grid */
.info-grid {
  display: grid;
  gap: 16px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1.5px solid #f1f5f9;
  transition: all 0.3s ease;
}

.data-row:hover {
  padding-left: 8px;
  background: #f8fafc;
  border-radius: 6px;
}

.data-row:last-child {
  border-bottom: none;
}

.data-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 700;
  letter-spacing: 0.2px;
  min-width: 120px;
}

.data-value {
  font-size: 14px;
  color: #0f172a;
  font-weight: 700;
  text-align: right;
}

/* Inputs & Forms */
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #f8fafc;
  color: #0f172a;
  font-family: "Inter", "Kantumruy Pro", sans-serif;
}

.form-input::placeholder {
  color: #94a3b8;
}

.form-input:hover {
  border-color: #cbd5e1;
  background: #ffffff;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.form-input.is-invalid {
  border-color: #ef4444;
  background: #fef2f2;
}

.form-input.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.input-group {
  margin-bottom: 12px;
}

.input-group label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1e293b;
  letter-spacing: 0.3px;
}

.form-container {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.action-group {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.password-input-wrapper .form-input {
  padding-right: 44px;
  width: 100%;
}

.toggle-password-btn {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.toggle-password-btn:hover {
  color: #475569;
  transform: scale(1.1);
}

.toggle-password-btn:active {
  transform: scale(0.95);
}

.password-strength {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.strength-bar {
  height: 6px;
  width: 80px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
}

.strength-bar::after {
  content: "";
  display: block;
  height: 100%;
  border-radius: 3px;
  transition:
    width 0.3s ease,
    background 0.3s ease;
}

.strength-bar.weak::after {
  width: 30%;
  background: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}

.strength-bar.medium::after {
  width: 65%;
  background: #f59e0b;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.3);
}

.strength-bar.strong::after {
  width: 100%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.strength-text {
  color: #64748b;
  font-weight: 500;
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
  font-family: "Inter", "Kantumruy Pro", sans-serif;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  color: #475569;
  transition: all 0.3s ease;
  font-size: 14px;
  font-family: "Inter", "Kantumruy Pro", sans-serif;
}

.btn-outline:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-outline:active {
  transform: translateY(0);
}

.btn-ghost {
  background: transparent;
  border: none;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  font-family: "Inter", "Kantumruy Pro", sans-serif;
}

.btn-ghost:hover {
  background: #f1f5f9;
  color: #475569;
}

.btn-ghost:active {
  background: #e2e8f0;
}

/* Toggles */
.switch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  transition: all 0.3s ease;
}

.switch-row:hover {
  padding-left: 8px;
}

.switch-info {
  flex: 1;
}

.switch-title {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
  letter-spacing: -0.2px;
}

.switch-desc {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.toggle-switch {
  position: relative;
  width: 52px;
  height: 28px;
  margin-left: 16px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
  transition: all 0.4s ease;
  border-radius: 28px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  top: 3px;
  background-color: white;
  transition: all 0.4s ease;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input:checked + .slider {
  background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
  box-shadow:
    inset 0 2px 4px rgba(99, 102, 241, 0.2),
    0 2px 8px rgba(99, 102, 241, 0.2);
}

input:checked + .slider:before {
  transform: translateX(24px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

/* Danger Zone */
.danger-card {
  border-color: #fecaca;
  border-width: 2px;
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
}

.danger-card:hover {
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.15);
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1.5px solid #fee2e2;
  gap: 16px;
}

.danger-item:last-child {
  border-bottom: none;
}

.danger-text {
  flex: 1;
}

.danger-text strong {
  display: block;
  font-size: 15px;
  color: #b91c1c;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: -0.2px;
}

.danger-text p {
  font-size: 13px;
  color: #991b1b;
  margin: 0;
  font-weight: 500;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
  white-space: nowrap;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
}

.btn-danger:active {
  transform: translateY(0);
}

.btn-danger-outline {
  border: 2px solid #fecaca;
  background: transparent;
  color: #dc2626;
  padding: 10px 22px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-danger-outline:hover {
  background: #fef2f2;
  border-color: #ef4444;
  transform: translateY(-1px);
}

.btn-danger-outline:active {
  transform: translateY(0);
}

/* Modal */
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
  color: #991b1b;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.modal-head h3.success-title {
  color: #15803d;
}

.modal-head h3.error-title {
  color: #991b1b;
}

.modal-body p.success-message {
  color: #15803d;
  background: #f0fdf4;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #22c55e;
}

.modal-body p.error-message {
  color: #991b1b;
  background: #fef2f2;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #ef4444;
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

.modal-foot {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.modal-foot button {
  flex: 1;
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

.helper-text {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 12px;
  display: block;
  padding: 10px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid #6366f1;
}

.helper-text strong {
  color: #0f172a;
  font-weight: 700;
}

.code-input {
  letter-spacing: 4px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
}

.verify-box {
  padding: 20px;
  background: #f8fafc;
  border-radius: 10px;
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

  .btn-logout {
    width: 100%;
    justify-content: center;
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

  .btn-danger,
  .btn-danger-outline {
    width: 100%;
    text-align: center;
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
  .btn-danger-outline {
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
