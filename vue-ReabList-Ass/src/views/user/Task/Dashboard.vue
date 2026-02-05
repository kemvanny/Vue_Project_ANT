<script setup>
import { ref, computed } from 'vue';
import Navbar from '@/components/layout/Navbar.vue';

// 1. Your raw list of tasks from API
const tasks = ref([]); 

// 2. The search string sent from Navbar
const searchFilter = ref('');

// 3. Logic to receive the search string
const handleSearchUpdate = (val) => {
  searchFilter.value = val.toLowerCase();
};

// 4. THE MAGIC: This filtered list updates automatically
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