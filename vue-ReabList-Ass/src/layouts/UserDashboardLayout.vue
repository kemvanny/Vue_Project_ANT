<template>
  <div class="app-container">
    <Sidebar />

    <main class="main-wrapper">
      <Navbar />

      <div class="content-padding">
        <router-view
          :key="refreshKey"
          @create-task="openCreate"
          @view-task="openView"
          @edit-task="openEdit"
        />
      </div>
    </main>

    <TaskCreate ref="createRef" />

    <TaskView
      v-if="activeTask"
      ref="viewModalRef"
      :task="activeTask"
      @mark-completed="onMarkCompleted"
      @edit-task="openEdit"
    />

    <TaskUpdate
      v-if="activeTask"
      ref="editModalRef"
      :task="activeTask"
      @updated="onTaskUpdated"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

import Sidebar from "@/components/userdashboard/Sidebar.vue";
import Navbar from "@/components/userdashboard/Navbar.vue";

import TaskCreate from "@/views/user/Task/TaskCreate.vue";
import TaskView from "@/views/user/Task/TaskView.vue";
import TaskUpdate from "@/views/user/Task/TaskUpdate.vue";

const createRef = ref(null);
const activeTask = ref(null);

const viewModalRef = ref(null);
const editModalRef = ref(null);

const refreshKey = ref(0);
const refreshList = () => {
  refreshKey.value += 1;
};

const openCreate = () => {
  createRef.value?.open();
};

const openView = (task) => {
  activeTask.value = task;
  viewModalRef.value?.open();
};

const openEdit = (task) => {
  activeTask.value = task;
  editModalRef.value?.open();
};

const onMarkCompleted = (task) => {
  const key = "reablist_tasks";
  const list = JSON.parse(localStorage.getItem(key) || "[]");

  const updated = list.map((t) =>
    t.id === task.id
      ? { ...t, isCompleted: true, updatedAt: new Date().toISOString() }
      : t
  );

  localStorage.setItem(key, JSON.stringify(updated));
  activeTask.value = { ...task, isCompleted: true };

  refreshList(); 
};

const onTaskUpdated = (updatedTask) => {
  activeTask.value = updatedTask;

  refreshList(); 
};
</script>
