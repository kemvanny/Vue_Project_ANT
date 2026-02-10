<template>
  <div class="modal fade modal-glass" :id="id" ref="modalEl" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" :style="{ maxWidth }">
      <div class="modal-content modal-content-modern">
        <!-- HEADER -->
        <div class="modal-header-modern">
          <div class="header-row">
            <div class="header-left">
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="pulse-dot-active"></span>
                <span class="label-modern m-0">ReabList</span>
              </div>

              <slot name="title">
                <h2 class="fw-800 mb-0">{{ title }}</h2>
              </slot>
            </div>

            <button type="button" class=" btn-close btn-close-modern" @click="$emit('close')"></button>
          </div>
        </div>

        <!-- BODY -->
        <div class="modal-body modal-body-modern">
          <slot />
        </div>

        <!-- FOOTER -->
        <div v-if="$slots.footer" class="pt-3">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, default: "" },
  maxWidth: { type: String, default: "650px" },
  closeModal: { type: Boolean, default: true },
});

const modalEl = ref(null);
let instance = null;

onMounted(() => {
  if (modalEl.value) instance = Modal.getOrCreateInstance(modalEl.value);
});

onBeforeUnmount(() => {
  if (instance) {
    instance.hide();
    instance = null;
  }
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
/* ====== Modal overlay glass ====== */
.modal-glass {
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(6px);
}

/* ====== Modal content ====== */
.modal-content-modern {
  border: none;
  border-radius: 35px;
  background: rgba(255, 255, 255, 0.95);
  padding: 34px 34px 26px;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(14px);
}

/* ====== Header ====== */
.modal-header-modern {
  border: none;
  padding: 0;
  margin-bottom: 14px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
}

.header-left {
  min-width: 0;
}

.fw-800 {
  font-weight: 900;
  color: #0f172a;
  line-height: 1.2;
}

/* ====== Label ====== */
.label-modern {
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  color: #0d9488;
  letter-spacing: 1.2px;
}

/* ====== Pulse dot ====== */
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
  0% {
    box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(13, 148, 136, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(13, 148, 136, 0);
  }
}

/* ====== Body ====== */
.modal-body-modern {
  padding: 0;
}

/* ====== Close button ====== */
.btn-close-modern {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background-color: rgba(248, 250, 252, 0.85);
  border: 1px solid rgba(226, 232, 240, 0.9);
  opacity: 1;
  transition: 0.15s;
}

.btn-close-modern:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 30px -26px rgba(15, 23, 42, 0.35);
}
</style>
