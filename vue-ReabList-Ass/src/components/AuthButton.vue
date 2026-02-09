<template>
  <button
    class="create-btn"
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')">
    {{ loading ? loadingText : text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  loadingText: {
    type: String,
    default: "Loading...",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
});

defineEmits(["click"]);
</script>

<style scoped>
.create-btn {
  width: 100%;
  padding: 10px;
  background: #247a85;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}

.create-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #a0c4c9;
}

.create-btn:hover:not(:disabled) {
  background: #1a636d;
}
.btn-submit-modern {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  width: 100%;
  padding: 18px;
  border-radius: 20px;
  font-weight: 800;
}
.btn-submit-modern:hover:not(:disabled){
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
}
.btn-done-modern {
  width: 50%;
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 900;
  padding: 14px 18px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.5);
}

.btn-done-modern:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 18px 34px -18px rgba(13, 148, 136, 0.65);
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
}

.btn-done-modern:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
