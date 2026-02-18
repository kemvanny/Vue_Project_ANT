// composables/useSidebar.js
// ─────────────────────────────────────────────────────────────────
// Shared singleton sidebar state.
// Import this in BOTH Navbar.vue and Sidebar.vue.
// No provide/inject or layout changes needed.
// ─────────────────────────────────────────────────────────────────
import { ref } from "vue";

const isSidebarOpen = ref(false);

export function useSidebar() {
  const openSidebar   = () => { isSidebarOpen.value = true;  };
  const closeSidebar  = () => { isSidebarOpen.value = false; };
  const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value; };

  return { isSidebarOpen, openSidebar, closeSidebar, toggleSidebar };
}