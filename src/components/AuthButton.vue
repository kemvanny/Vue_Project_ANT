<template>
  <button
    class="create-btn"
    :class="{ small: size === 'small' }"
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
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
  size: {
    type: String,
    default: "large",
    validator: (value) => ["small", "large"].includes(value),
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

.create-btn.small {
  width: auto;
  padding: 5px 10px;
  font-size: 0.8rem;
}

.create-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #a0c4c9;
}

.create-btn:hover:not(:disabled) {
  background: #1a636d;
}
</style>
