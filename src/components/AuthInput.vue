<template>
  <div class="mb-4 stagger-2 modern-input-group">
    <label>{{ label }}</label>
    <div
      class="input-group input-group-lg modern-input"
      :class="{ 'input-wrapper': type === 'password' }"
    >
      <input
        :type="computedType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ 'input-error': error, 'input-disabled': disabled }"
        :required="required"
        :autofocus="autofocus"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-password"
        @click="showPassword = !showPassword"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
      >
        <i
          class="bi"
          :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
        ></i>
      </button>
    </div>
    <p v-if="error" class="error-msg-small">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "AuthInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
      validator: (value) =>
        ["text", "email", "password", "tel", "number"].includes(value),
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    computedType() {
      if (this.type === "password") {
        return this.showPassword ? "text" : "password";
      }
      return this.type;
    },
  },
};
</script>

<style scoped>
.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n + 3),
.input-group:not(.has-validation)
  > .form-floating:not(:last-child)
  > .form-control,
.input-group:not(.has-validation)
  > .form-floating:not(:last-child)
  > .form-select,
.input-group:not(.has-validation)
  > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(
    .form-floating
  ) {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.input-group {
  margin-bottom: 5px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #2d6a7a;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 10px 1rem;
  border: 1px solid #b8d8e0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #d8e8ea;
  color: #333;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  font-family: inherit;
}

.input-group input::placeholder {
  color: #7aa5b3;
  opacity: 0.8;
}

.input-group input:focus {
  outline: none;
  border-color: #5a9aad;
  background-color: #cfe0e5;
  box-shadow: 0 0 0 3px rgba(90, 154, 173, 0.1);
}

.input-group input.input-error {
  border-color: #dc3545;
  background-color: #ffe5e5;
}

.input-group input.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.input-group input:disabled,
.input-group input.input-disabled {
  background-color: #f0f5f7;
  color: #2d6a7a;
  cursor: not-allowed;
  opacity: 1;
  border-color: #b8d8e0;
}

.input-wrapper .toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #5a9aad;
  font-size: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.input-wrapper .toggle-password:hover {
  color: #2d6a7a;
}

.error-msg-small {
  font-size: 0.8125rem;
  color: #dc3545;
  margin-top: 0.375rem;
  margin-bottom: 0;
}
</style>
