<template>
  <div class="p-4">
    <TaskLedger 
      title="Personal Tasks" 
      subtitle="Manage your private goals and daily personal activities." 
      initialStatus="all" 
      :showStatusFilter="false" 
    />
  </div>
</template>

<script setup>
import TaskLedger from '../../components/userdashboard/TaskLedger.vue';
</script>