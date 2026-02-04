<template>
  <TaskLedger 
    title="Work Projects" 
    subtitle="Focus on your Inventory Management and development tasks." 
    initialStatus="all" 
    :showStatusFilter="false" 
  />
</template>

<script setup>
import TaskLedger from '../../components/userdashboard/TaskLedger.vue';
</script>