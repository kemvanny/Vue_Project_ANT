<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <SidebarDashboard></SidebarDashboard>
    <!-- Main area -->
    <div class="flex-grow-1 min-vh-100 bg-light">
      <!-- Navbar -->
      <NavbarDashboard></NavbarDashboard>
    </div>
  </div>
</template>


<script setup>
import NavbarDashboard from '@/components/admindasboard/NavbarDashboard.vue';
import SidebarDashboard from '@/components/admindasboard/SidebarDashboard.vue';

</script>

