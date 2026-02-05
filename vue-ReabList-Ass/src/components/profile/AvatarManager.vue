<template>
  <div class="avatar-manager">
    <div class="avatar-section">
      <h3>រូបភាពប្រូហ្វាល់</h3>

      <div class="avatar-display">
        <div class="avatar-wrapper">
          <img
            v-if="avatarPreview || authStore.profile?.avatar"
            :src="avatarPreview || authStore.profile?.avatar"
            alt="Avatar"
            class="avatar-image"
          />
          <div v-else class="avatar-placeholder">
            <i class="fas fa-user"></i>
          </div>
        </div>
        <div class="avatar-info">
          <p class="avatar-name">{{ authStore.profile?.fullname }}</p>
          <p class="avatar-email">{{ authStore.profile?.email }}</p>
        </div>
      </div>

      <div class="upload-section">
        <label for="avatar-input" class="upload-label">
          <i class="fas fa-cloud-upload-alt"></i>
          ជ្រើសរើសរូបភាព ឬទាញដាក់វា នៅទីនេះ
        </label>
        <input
          id="avatar-input"
          ref="fileInput"
          type="file"
          accept="image/*"
          class="file-input"
          @change="onFileSelected"
        />
        <small class="text-muted"
          >ទ្រង់ទ្រាយដែលគាំទ្រ៖ JPG, PNG, GIF (ចូលរួច 5MB)</small
        >
      </div>

      <div v-if="avatarPreview" class="preview-actions">
        <button
          type="button"
          class="btn btn-success"
          :disabled="authStore.profileLoading"
          @click="uploadAvatar"
        >
          <i class="fas fa-upload"></i>
          {{ authStore.profileLoading ? "កំពុងផ្ទុក..." : "ផ្ទុករូបភាព" }}
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="authStore.profileLoading"
          @click="cancelUpload"
        >
          <i class="fas fa-times"></i>
          បោះបង់
        </button>
      </div>

      <div
        v-if="authStore.profile?.avatar && !avatarPreview"
        class="delete-section"
      >
        <button
          type="button"
          class="btn btn-danger"
          :disabled="authStore.profileLoading"
          @click="confirmDeleteAvatar"
        >
          <i class="fas fa-trash"></i>
          {{ authStore.profileLoading ? "កំពុងលុប..." : "លុបរូបភាព" }}
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="modal-content">
        <h4>ម៉ាថាប់ការលុប</h4>
        <p>តើអ្នកប្រាកដថាចង់លុបរូបភាពប្រូហ្វាល់របស់អ្នកដែរឬទេ?</p>
        <div class="modal-actions">
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteAvatarConfirmed"
          >
            លុប
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="showDeleteConfirm = false"
          >
            បោះបង់
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/stores/profilestore";

const authStore = useProfileStore();
const emit = defineEmits(["done"]);
const fileInput = ref(null);
const avatarPreview = ref(null);
const selectedFile = ref(null);
const showDeleteConfirm = ref(false);

const onFileSelected = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    authStore.profileError = "ទំហំឯកសារ​ធំលើស 5MB។ សូមជ្រើសរើសឯកសារតូចជាង។";
    return;
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    authStore.profileError = "សូមជ្រើសរើសឯកសាររូបភាពដែលមានសុពលភាព។";
    return;
  }

  selectedFile.value = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const uploadAvatar = async () => {
  if (!selectedFile.value) return;

  const result = await authStore.uploadAvatar(selectedFile.value);
  if (result) {
    avatarPreview.value = null;
    selectedFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = "";
    }
    emit("done");
    window.location.reload();
  }
};

const cancelUpload = () => {
  avatarPreview.value = null;
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const confirmDeleteAvatar = () => {
  showDeleteConfirm.value = true;
};

const deleteAvatarConfirmed = async () => {
  const result = await authStore.deleteAvatar();
  if (result) {
    showDeleteConfirm.value = false;
    emit("done");
  }
};
</script>

<style scoped>
.avatar-manager {
  max-width: 600px;
}

.avatar-section {
  text-align: center;
}

.avatar-section h3 {
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #667eea;
  text-align: left;
}

.avatar-display {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

.avatar-wrapper {
  flex-shrink: 0;
}

.avatar-image,
.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 3rem;
}

.avatar-info {
  text-align: left;
  flex: 1;
}

.avatar-name {
  color: #333;
  font-size: 1.2rem;
  font-weight: 700;
  /* margin: 0; */
}

.avatar-email {
  color: #999;
  font-size: 0.9rem;
  /* margin: 0; */
}

.upload-section {
  margin-bottom: 20px;
}

.upload-label {
  display: block;
  padding: 40px 20px;
  border: 2px dashed #667eea;
  border-radius: 8px;
  cursor: pointer;
  background: #f0f4ff;
  color: #667eea;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
}

.upload-label:hover {
  background: #e6ebff;
  border-color: #764ba2;
  color: #764ba2;
  transform: translateY(-2px);
}

.upload-label i {
  display: block;
  font-size: 2rem;
  margin-bottom: 10px;
}

.file-input {
  display: none;
}

.text-muted {
  display: block;
  color: #999;
  font-size: 0.85rem;
  margin-top: 8px;
}

.preview-actions,
.delete-section {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.preview-actions {
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(40, 167, 69, 0.4);
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

.delete-section {
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  margin-top: 20px;
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
  max-width: 400px;
  width: 90%;
}

.modal-content h4 {
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.modal-content p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  gap: 10px;
}

.modal-actions .btn {
  flex: 1;
}

@media (max-width: 768px) {
  .avatar-display {
    flex-direction: column;
    text-align: center;
  }

  .avatar-info {
    text-align: center;
  }

  .preview-actions,
  .delete-section {
    flex-direction: column;
  }

  .preview-actions .btn,
  .delete-section .btn {
    width: 100%;
  }
}
</style>
