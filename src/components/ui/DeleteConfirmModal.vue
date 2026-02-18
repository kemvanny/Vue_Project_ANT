<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="modal-backdrop">
        <div class="modal-card">
          <h3>{{ title }}</h3>
          <p>{{ message }}</p>

          <div class="actions">
            <button @click="$emit('cancel')">បោះបង់</button>
            <AuthButton :type="'submit'" text="លុប" loadingText="កំពុងលុប..." :loading="loading"
            variant="danger"  @click="$emit('confirm')" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import AuthButton from '@/components/ui/AuthButton.vue';
defineProps({
  open: Boolean,
  title: String,
  message: String,
  loading: Boolean,default: false,
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
}

.modal-card {
  width: 90%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 22px;
  padding: 26px;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.35);
  animation: pop 0.2s ease-out;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-card h3 {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 900;
  color: #b91c1c;
}

.modal-card p {
  margin: 0 0 22px;
  font-size: 14px;
  color: #475569;
  font-weight: 600;
  line-height: 1.6;
}

/* ACTION BUTTONS */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.actions button {
  padding: 12px 22px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  border: none;
}

/* Cancel */
.actions button:first-child {
  background: #f1f5f9;
  color: #334155;
}

.actions button:first-child:hover {
  background: #e2e8f0;
}

</style>
