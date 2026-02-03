<template>
  <div class="telegram-widget">
    <!-- Floating Button -->
    <button class="tg-fab" @click="toggle">
      <i class="bi bi-telegram"></i>
    </button>

    <!-- Panel -->
    <transition name="slide-up">
      <div v-if="open" class="tg-panel">
        <div class="tg-header">
          <span>Bot Telegram រំលឹកការងារ</span>
          <button @click="toggle">✕</button>
        </div>

        <div class="tg-body">
          <p>
            ភ្ជាប់ Telegram របស់អ្នក ដើម្បីទទួលបានការរំលឹកការងារ ដោយផ្ទាល់នៅក្នុង Telegram។
          </p>

          <a
            :href="telegramLink"
            target="_blank"
            class="tg-connect-btn"
          >
            <i class="bi bi-telegram"></i>
            ភ្ជាប់ Telegram
          </a>

          <small class="text-muted">
            បន្ទាប់ពីចុច សូមចុច <b>Start</b> នៅក្នុង Telegram។
          </small>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const open = ref(false);
const toggle = () => (open.value = !open.value);

const userId = localStorage.getItem("user_id") || "guest";

const telegramLink = computed(() => {
  return `https://t.me/ReabList_bot?start=${userId}`;
});
</script>

<style scoped>
.telegram-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
}

/* Floating button */
.tg-fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #229ED9;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
}

/* Panel */
.tg-panel {
  position: absolute;
  bottom: 72px;
  right: 0;
  width: 320px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
  overflow: hidden;
}

.tg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #229ED9;
  color: #fff;
}

.tg-header button {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.tg-body {
  padding: 16px;
  text-align: center;
}

.tg-connect-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #229ED9;
  color: #fff;
  padding: 12px;
  border-radius: 10px;
  margin: 12px 0;
  text-decoration: none;
  font-weight: 600;
}

/* Animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
