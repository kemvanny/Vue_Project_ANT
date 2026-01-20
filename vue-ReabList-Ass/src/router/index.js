import AdminDashboardLayout from '@/layouts/AdminDashboardLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AdminDashboardLayout,
    },
    
  ],
})

export default router
