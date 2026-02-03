<template>
  <div class="d-flex">
    <aside id="reab-sidebar">
      <div class="logo-section">
        <div class="logo-box">
          <i class="fas fa-check-double"></i>
        </div>
        <span class="logo-text">ReabList</span>
      </div>

      <nav>
        <p class="nav-label">ផ្ទាំងគ្រប់គ្រងគោល</p>
        <router-link
          :to="{ name: 'Dashboard' }"
          class="reab-nav-link"
          active-class="active"
          exact
        >
          <pie-chart/> ផ្ទាំងព័ត៌មាន
        </router-link>

        <router-link
          :to="{ name: 'AllTasks' }"
          class="reab-nav-link"
          active-class="active"
        >
          <list/> ភារកិច្ចទាំងអស់
        </router-link>

        <router-link
          :to="{ name: 'Pending' }"
          class="reab-nav-link"
          active-class="active"
        >
          <hourglass/> ការងារកំពុងរង់ចាំ
        </router-link>

        <router-link
          :to="{ name: 'Completed' }"
          class="reab-nav-link"
          active-class="active"
        >
          <check-circle/> ភារកិច្ចដែលបានបញ្ចប់
        </router-link>

        <p class="nav-label">សកម្មភាពទូទៅ</p>
        <a
          href="#"
          class="reab-nav-link"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
        >
          <PlusCircle  /> បង្កើតភារកិច្ចថ្មី
        </a>

        <p class="nav-label">ប្រភេទភារកិច្ច</p>
        <router-link
          :to="{ name: 'Category', params: { name: 'Personal' } }"
          class="reab-nav-link"
          active-class="active"
        >
          <user/> ផ្ទាល់ខ្លួន
        </router-link>

        <router-link
          :to="{ name: 'Category', params: { name: 'Work' } }"
          class="reab-nav-link"
          active-class="active"
        >
          <clipboard/> ការងារ
        </router-link>

        <router-link
          :to="{ name: 'Category', params: { name: 'Study' } }"
          class="reab-nav-link"
          active-class="active"
        >
          <briefcase/> ការសិក្សា
        </router-link>
      </nav>

      <div class="mt-auto">
        <div class="status-card">
          <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
            <div class="pulse-status"></div>
            <p class="status-text">កំពុងដំណើរការ</p>
          </div>
          <button class="btn btn-primary btn-refresh">ធ្វើបច្ចុប្បន្នភាពទិន្នន័យ</button>
        </div>
        <button class="btn-logout" @click="handleLogout">
          <graduation-cap ></graduation-cap> ចាកចេញ
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-container {
  display: flex;
}

.main-wrapper {
  flex: 1;
}

.chart-wrapper {
  min-height: 220px;
  height: 240px;
}


#reab-sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1100;
  padding: 32px 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #0f172a;
  margin-bottom: 48px;
  padding-left: 8px;
}

.logo-box {
  width: 44px;
  height: 44px;
  background: #0d9488;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 16px -4px rgba(13, 148, 136, 0.4);
}

.logo-text {
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.5px;
}

.nav-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 800;
  color: #94A3B8;
  margin: 24px 0 12px 16px;
}

.reab-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #64748b;
  text-decoration: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 4px;
  transition: all 0.3s ease;
  position: relative; /* Required for the indicator bar positioning */
  transition: all 0.2s ease;
}

.reab-nav-link:hover {
  color: #0d9488;
  background: rgba(13, 148, 136, 0.05);
}

.reab-nav-link.active {
  background: rgba(13, 148, 136, 0.1); /* Subtle teal tint */
  color: #0d9488;
  box-shadow: none; /* Removed heavy shadow to match Figma */
}

.reab-nav-link.active::after {
  content: "";
  position: absolute;
  right: -24px; /* Aligns with the sidebar edge */
  top: 0;
  bottom: 0;
  width: 5px;
  background: #0d9488;
  border-radius: 4px 0 0 4px;
}
.status-card {
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  background: rgba(13, 148, 136, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.pulse-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

.status-text {
  font-size: 0.7rem;
  font-weight: 800;
  color: #10b981;
  margin-bottom: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-refresh {
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  font-weight: 800;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-logout {
  width: 100%;
  padding: 14px;
  background: white;
  border: 1.5px solid #fca5a5; /* Light red border */
  border-radius: 14px;
  color: #ef4444; /* High-contrast red */
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-logout:hover {
  background: #fef2f2; /* Subtle red background on hover */
  border-color: #ef4444;
}

.btn-logout i {
  font-size: 1.1rem;
}
</style>     