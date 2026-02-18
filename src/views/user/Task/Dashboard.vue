<script setup>
import { ref, computed } from 'vue';
import Navbar from '@/components/layout/Navbar.vue';

const tasks = ref([]); 

const searchFilter = ref('');

const handleSearchUpdate = (val) => {
  searchFilter.value = val.toLowerCase();
};

const filteredTasks = computed(() => {
  if (!searchFilter.value) return tasks.value;
  
  return tasks.value.filter(task => {
    const titleMatch = task.title?.toLowerCase().includes(searchFilter.value);
    const noteMatch = (task.content || task.notes)?.toLowerCase().includes(searchFilter.value);
    return titleMatch || noteMatch;
  });
});
</script>

<template>
  <div>
    <Navbar @update:search="handleSearchUpdate" />

    <div class="content">
      <div v-for="item in filteredTasks" :key="item.id">
        {{ item.title }}
      </div>
      
      <p v-if="filteredTasks.length === 0">រកមិនឃើញភារកិច្ចដែលអ្នកស្វែងរកទេ</p>
    </div>
  </div>
</template>