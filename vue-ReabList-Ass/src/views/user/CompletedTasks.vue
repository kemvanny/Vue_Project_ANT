<template>
  <TaskLedger
    title="ភារកិច្ចដែលបានបញ្ចប់"
    subtitle="បញ្ជីភារកិច្ចដែលបានសម្គាល់ថាបញ្ចប់រួចរាល់"
    :tasks="completedTasks"
    @create-task="$emit('create-task')"
    @view-task="$emit('view-task', $event)"
  />
</template>

<script setup>
import { computed } from "vue";
import TaskLedger from "@/components/userdashboard/TaskLedger.vue";

defineEmits(["create-task", "view-task"]);

const STORAGE_KEY = "reablist_tasks";

const completedTasks = computed(() => {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const tasks = Array.isArray(list) ? list : [];
  return tasks.filter((t) => t.isCompleted); // ✅ completed only
});
</script>
