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

    <TaskCreate ref="createRef"  @created="refreshList" />

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
import NoteModals from "@/components/base/NoteModals.vue";


import TaskCreate from "@/views/user/Task/TaskCreate.vue";
import TaskView from "@/views/user/Task/TaskView.vue";
import TaskUpdate from "@/views/user/Task/TaskUpdate.vue";


const createRef = ref(null);
const activeTask = ref(null);

const viewModalRef = ref(null);
const editModalRef = ref(null);

const refreshKey = ref(0);
const refreshList = () => {
  refreshKey.value++;
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
<style scoped>
/* ===== Layout Wrapper ===== */
.app-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* ===== GLOBAL BACKGROUND (Apply all pages) ===== */
.main-wrapper {
  flex: 1;
  min-width: 0;
  margin-left: 280px;
  width: calc(100% - 280px);

  /* ✅ change background layout here */
  background: #f8f9fa
}

/* content padding */
.content-padding {
  padding: 18px;
  min-height: 100vh;
}


/* ===============================
   Tablet: sidebar collapse
   (sidebar becomes 78px)
================================ */
@media (max-width: 900px) {
  .main-wrapper {
    margin-left: 78px;
    width: calc(100% - 78px);
  }

  .content-padding {
    padding: 14px;
  }
}

/* ===============================
   Mobile: sidebar hidden
================================ */
@media (max-width: 680px) {
  .main-wrapper {
    margin-left: 0;
    width: 100%;
  }

  .content-padding {
    padding: 12px;
  }
}
</style>

