<template>
  <div class="profile-dashboard">
    <!-- Header -->
    <div class="page-header">
      <h1>ព័ត៍មានគណនី</h1>
      <p class="subtitle">Manage your account Settings and Preferences</p>
    </div>

    <!-- Messages -->
    <div
      v-if="authStore.profileSuccess"
      class="alert alert-success alert-dismissible fade show"
    >
      <i class="fas fa-check-circle"></i>
      {{ authStore.profileSuccess }}
      <button
        type="button"
        class="btn-close"
        @click="authStore.profileSuccess = null"
      ></button>
    </div>
    <div
      v-if="authStore.profileError"
      class="alert alert-danger alert-dismissible fade show"
    >
      <i class="fas fa-exclamation-circle"></i>
      {{ authStore.profileError }}
      <button
        type="button"
        class="btn-close"
        @click="authStore.profileError = null"
      ></button>
    </div>

    <!-- Profile Card Section -->
    <div class="profile-section">
      <div class="profile-card">
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <img
              v-if="authStore.profile?.avatar"
              :src="authStore.profile?.avatar"
              alt="Profile"
              class="profile-avatar"
            />
            <div v-else class="avatar-placeholder">
              <i class="fas fa-user"></i>
            </div>
          </div>
        </div>
        <div class="profile-info">
          <h2 class="profile-name">
            {{ authStore.profile?.fullname || "User" }}
          </h2>
          <p class="profile-email">{{ authStore.profile?.email }}</p>
          <div class="profile-meta">
            <span class="status-badge">
              <i class="fas fa-check-circle"></i>
              Activated
            </span>
            <span class="role-badge">
              <i class="fas fa-user-tag"></i>
              USER
            </span>
          </div>
        </div>
        <div class="profile-actions">
          <button
            class="btn btn-primary"
            @click="activeModal = 'editProfile'"
            :disabled="authStore.profileLoading"
          >
            <i class="fas fa-edit"></i>
            Edit Profile
          </button>
          <button
            class="btn btn-secondary"
            @click="activeModal = 'changeAvatar'"
            :disabled="authStore.profileLoading"
          >
            <i class="fas fa-image"></i>
            Change Image
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="statistics-section">
      <h3 class="section-title">សង្ខេបសកម្មភាព</h3>
      <div class="stats-grid">
        <div class="stat-card stat-card-1">
          <div class="stat-number">{{ stats.totalTasks }}</div>
          <div class="stat-label">ការបង្កើតភារកិច្ច</div>
        </div>
        <div class="stat-card stat-card-2">
          <div class="stat-number">{{ stats.completedTasks }}</div>
          <div class="stat-label">បានបញ្ចប់សកម្មភាព</div>
        </div>
        <div class="stat-card stat-card-3">
          <div class="stat-number">{{ stats.completionRate }}%</div>
          <div class="stat-label">ប្រសិទ្ធិភាព</div>
        </div>
      </div>
    </div>

    <!-- Preferences Section -->
    <div class="preferences-section">
      <h3 class="section-title">កំណត់ត្រាថ្មី</h3>
      <div class="preferences-list">
        <div class="preference-item">
          <input
            type="checkbox"
            id="notif-email"
            v-model="preferences.emailNotifications"
            class="preference-checkbox"
            @change="savePreferences"
          />
          <label for="notif-email" class="preference-label">
            <i class="fas fa-envelope"></i>
            <span>ការផ្ញើដំណឹងដោយលម្អិតតាមរយៈ</span>
          </label>
        </div>
        <div class="preference-item">
          <input
            type="checkbox"
            id="notif-push"
            v-model="preferences.pushNotifications"
            class="preference-checkbox"
            @change="savePreferences"
          />
          <label for="notif-push" class="preference-label">
            <i class="fas fa-bell"></i>
            <span>ការផ្ញើដំណឹងចូលក្នុងកម្មវិធី</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div
      v-if="activeModal === 'editProfile'"
      class="modal-overlay"
      @click.self="activeModal = null"
    >
      <div class="modal-content">
        <button class="modal-close" @click="activeModal = null">
          <i class="fas fa-times"></i>
        </button>
        <UpdateProfileForm
          @done="
            activeModal = null;
            loadProfile();
          "
        />
      </div>
    </div>

    <!-- Change Avatar Modal -->
    <div
      v-if="activeModal === 'changeAvatar'"
      class="modal-overlay"
      @click.self="activeModal = null"
    >
      <div class="modal-content">
        <button class="modal-close" @click="activeModal = null">
          <i class="fas fa-times"></i>
        </button>
        <AvatarManager
          @done="
            activeModal = null;
            loadProfile();
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProfileStore } from "@/stores/profilestore";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm.vue";
import AvatarManager from "@/components/profile/AvatarManager.vue";

const authStore = useProfileStore();
const activeModal = ref(null);

const stats = ref({
  totalTasks: 142,
  completedTasks: 128,
  completionRate: 90,
});

const preferences = ref({
  emailNotifications: true,
  pushNotifications: true,
});

const loadProfile = async () => {
  try {
    const result = await authStore.getProfile();
    if (!result) {
      console.warn("Failed to load profile:", authStore.profileError);
    } else {
      console.log("Profile loaded successfully:", result);
    }
  } catch (error) {
    console.error("Error loading profile:", error);
    authStore.profileError = "Failed to load profile data";
  }
};

const savePreferences = () => {
  localStorage.setItem("profilePreferences", JSON.stringify(preferences.value));
  authStore.profileSuccess = "Preferences saved successfully!";
  setTimeout(() => {
    authStore.profileSuccess = null;
  }, 3000);
};

onMounted(async () => {
  await loadProfile();
  const saved = localStorage.getItem("profilePreferences");
  if (saved) {
    preferences.value = JSON.parse(saved);
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profile-dashboard {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 30px;
}

/* Header */
.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 2rem;
  color: #333;
  font-weight: 700;
  margin-bottom: 5px;
}

.page-header .subtitle {
  color: #666;
  font-size: 0.95rem;
}

/* Alerts */
.alert {
  margin-bottom: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideDown 0.3s ease-out;
  border: none;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  margin-left: auto;
}

.btn-close:hover {
  opacity: 1;
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

/* Profile Section */
.profile-section {
  margin-bottom: 40px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 30px;
}

.avatar-section {
  flex-shrink: 0;
}

.avatar-wrapper {
  position: relative;
}

.profile-avatar,
.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #48a0c4;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #48a0c4;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.5rem;
  color: #333;
  font-weight: 700;
  margin-bottom: 5px;
}

.profile-email {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 12px;
}

.profile-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.status-badge,
.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #555;
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 20px;
}

.status-badge i,
.role-badge i {
  color: #48a0c4;
  font-size: 0.8rem;
}

.profile-actions {
  display: flex;
  gap: 12px;
  margin-left: auto;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #4da6bd;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #3d8fa6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(77, 166, 189, 0.3);
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  border: 2px solid #e0e0e0;
}

.btn-secondary:hover:not(:disabled) {
  background: #e8e8e8;
  border-color: #48a0c4;
  color: #48a0c4;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Statistics Section */
.statistics-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.stat-card {
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.stat-card-1 {
  background: linear-gradient(135deg, #b3dfe8 0%, #a0d4e1 100%);
}

.stat-card-2 {
  background: linear-gradient(135deg, #b0d4e8 0%, #9dc8e3 100%);
}

.stat-card-3 {
  background: linear-gradient(135deg, #b8e0c5 0%, #a5d8b8 100%);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.85rem;
  color: #555;
  font-weight: 600;
}

/* Preferences Section */
.preferences-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.preferences-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.preference-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.preference-item:last-child {
  border-bottom: none;
}

.preference-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #4da6bd;
  flex-shrink: 0;
}

.preference-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #555;
  font-weight: 500;
  flex: 1;
}

.preference-label i {
  color: #48a0c4;
  font-size: 1.1rem;
}

.preference-label span {
  font-size: 0.95rem;
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
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 30px;
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
  z-index: 10;
}

.modal-close:hover {
  color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-dashboard {
    padding: 20px;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .profile-card {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 20px;
  }

  .profile-actions {
    width: 100%;
    flex-direction: column;
    margin-left: 0;
  }

  .profile-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .preferences-section {
    padding: 20px;
  }

  .modal-content {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .profile-dashboard {
    padding: 15px;
  }

  .profile-avatar,
  .avatar-placeholder {
    width: 100px;
    height: 100px;
  }

  .profile-name {
    font-size: 1.2rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }
}
</style>
