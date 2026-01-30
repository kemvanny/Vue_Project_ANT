<template>
  <div
    class="modal fade modal-glass"
    :id="id"
    ref="modalEl"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" :style="{ maxWidth }">
      <div class="modal-content modal-content-modern">
        <div class="modal-header-modern">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="pulse-dot-active"></span>
                <span class="label-modern m-0">ReabList</span>
              </div>

              <slot name="title">
                <h2 class="fw-800 mb-0">{{ title }}</h2>
              </slot>
              
            </div>

            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
        </div>

        <div class="modal-body modal-body-modern">
          <slot />
        </div>

        <div v-if="$slots.footer" class="pt-3">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, default: "" },
  maxWidth: { type: String, default: "650px" },
});

const modalEl = ref(null);
let instance = null;

onMounted(() => {
  if (modalEl.value) instance = Modal.getOrCreateInstance(modalEl.value);
});

const open = () => {
  if (!modalEl.value) return;
  instance = Modal.getOrCreateInstance(modalEl.value);
  instance.show();
};

const close = () => {
  if (!modalEl.value) return;
  instance = Modal.getOrCreateInstance(modalEl.value);
  instance.hide();
};

defineExpose({ open, close });
</script>

<style scoped>
.modal-content-modern {
  border: none;
  border-radius: 35px;
  background: #fff;
  padding: 40px;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.15);
}

.label-modern {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0d9488;
  letter-spacing: 1.2px;
}

.pulse-dot-active {
  width: 8px;
  height: 8px;
  background: #0d9488;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0 rgba(13, 148, 136, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(13, 148, 136, 0); }
  100% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
}
</style>
