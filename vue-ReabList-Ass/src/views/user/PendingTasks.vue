<template>
  <TaskLedger
    title="ភារកិច្ចមិនទាន់បញ្ចប់"
    subtitle="បញ្ជីភារកិច្ចដែលនៅសល់ និងត្រូវធ្វើបន្ត"
    :tasks="pendingTasks"
    @create-task="$emit('create-task')"
    @view-task="$emit('view-task', $event)"
  />
</template>

<script setup>
import { computed } from "vue";
import TaskLedger from "@/components/userdashboard/TaskLedger.vue";

defineEmits(["create-task", "view-task"]);

const STORAGE_KEY = "reablist_tasks";

const pendingTasks = computed(() => {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const tasks = Array.isArray(list) ? list : [];
  return tasks.filter((t) => !t.isCompleted); // ✅ pending only
});
</script>

