<template>
  <div class="app-container">
    <Sidebar />

    <main class="main-wrapper">
      <Navbar />

      <div class="content-padding">
        <router-view />
      </div>
    </main>
    <TaskModal />
  </div>
</template>
<script setup>
// Use @/ to start looking from the 'src' folder
import Sidebar from "@/components/userdashboard/Sidebar.vue";
import Navbar from "@/components/userdashboard/Navbar.vue";
import TaskModal from "@/components/userdashboard/TaskModal.vue";
import TaskLedger from "@/components/userdashboard/TaskLedger.vue";
</script>


<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.main-wrapper {
  flex-grow: 1;
  /* Match this to your sidebar width exactly */
  margin-left: 280px;
  background-color: #f8fafc; /* light gray to see the contrast */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-padding {
  padding: 2rem;
}

/* Ensure the sidebar doesn't overlap on mobile/small screens without a media query */
@media (max-width: 768px) {
  .main-wrapper {
    margin-left: 0;
  }
}
</style>