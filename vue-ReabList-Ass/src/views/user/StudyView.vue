<template>
  <div class="p-4">
    <TaskLedger 
      title="Study Dashboard" 
      subtitle="Track your school assignments and programming lessons." 
      initialStatus="all" 
      :showStatusFilter="false" 
    />
  </div>
</template>

<script setup>
import TaskLedger from '../../components/userdashboard/TaskLedger.vue';
</script>