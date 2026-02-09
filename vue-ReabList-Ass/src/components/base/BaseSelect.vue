<template>
  <div class="select-wrap" ref="wrap">
    <label v-if="label" class="label-modern">{{ label }}</label>

    <button
      type="button"
      class="select-trigger"
      :class="{ open: isOpen }"
      @click="toggle"
    >
      <span class="select-value">
        {{ selectedLabel }}
      </span>
      <span class="chev" :class="{ rotate: isOpen }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </button>

    <transition name="pop">
      <div v-if="isOpen" class="select-dropdown">
        <div class="dropdown-scroll">
          <button
            v-for="opt in options"
            :key="opt.value"
            type="button"
            class="select-option"
            :class="{ active: opt.value === modelValue }"
            @click="choose(opt.value)"
          >
            <span class="option-text">{{ opt.label }}</span>
            <span v-if="opt.value === modelValue" class="check-mark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  options: { type: Array, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const wrap = ref(null);

const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue);
  return found ? found.label : "ជ្រើសរើស...";
});

const toggle = () => (isOpen.value = !isOpen.value);
const choose = (val) => {
  emit("update:modelValue", val);
  isOpen.value = false;
};

const onClickOutside = (e) => {
  if (wrap.value && !wrap.value.contains(e.target)) isOpen.value = false;
};

onMounted(() => document.addEventListener("mousedown", onClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("mousedown", onClickOutside)
);
</script>

<style scoped>
.select-wrap {
  position: relative;
  font-family: "Inter", sans-serif;
  width: 100%;
}

.label-modern {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0d9488;
  letter-spacing: 1px;
  margin-bottom: 6px;
  display: block;
}

.select-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;

  font-size: 15px;
  font-weight: 500;
  color: #1e293b;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-trigger:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.select-trigger.open {
  border-color: #0d9488;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
}

.chev {
  color: #94a3b8;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
}

.chev.rotate {
  transform: rotate(180deg);
  color: #0d9488;
}

.select-dropdown {
  position: absolute;
  z-index: 1000;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;

  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 6px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.dropdown-scroll {
  max-height: 240px;
  overflow-y: auto;
}

.select-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  margin-bottom: 2px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;

  font-size: 14px;
  font-weight: 500;
  color: #475569;
  transition: all 0.15s ease;
}

.select-option:last-child {
  margin-bottom: 0;
}

.select-option:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.select-option.active {
  background: #f0fdfa;
  color: #0d9488;
  font-weight: 600;
}

.check-mark {
  color: #0d9488;
  display: flex;
  align-items: center;
}

/* Animation */
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>