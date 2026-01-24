<template>
  <div class="p-4">

<TaskLedger 
  title="Pending Tasks" 
  subtitle="Focus on what needs to be done next." 
  initialStatus="pending" 
  :showStatusFilter="false" 
/>  </div>
</template>

<script setup>
import TaskLedger from '../../components/userdashboard/TaskLedger.vue';
</script>