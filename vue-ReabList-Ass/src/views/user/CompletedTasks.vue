<template>
  <div class="p-4">

<TaskLedger 
  title="Completed Archive" 
  subtitle="Viewing history of all finished work." 
  initialStatus="completed" 
  :showStatusFilter="false" 
/>  </div>
</template>

<script setup>
import TaskLedger from '../../components/userdashboard/TaskLedger.vue';
</script>