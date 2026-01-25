<template>
  <div id="dashboard-home" class="view-content">
    <div class="d-flex justify-content-between align-items-end mb-5">
      <div>
        <p class="small text-primary fw-800 text-uppercase mb-1" style="letter-spacing: 2px;">Real-time Productivity</p>
        <h1 class="fw-800 mb-0">Task Dashboard</h1>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-dark rounded-4 px-4 py-2.5 fw-700 small">
          <Download :size="18" class="me-2" /> Export Tasks
        </button>
      </div>
    </div>

    <div class="bento-grid">
      <div class="reab-card card-2 efficiency-gradient">
        <p class="small fw-800 opacity-75 text-uppercase" style="letter-spacing: 1px;">Completion Efficiency</p>
        <div class="stat-val mb-3">50%</div>
        <div class="progress-container">
          <div class="progress-bar" style="width: 50%;"></div>
        </div>
        <div class="d-flex justify-content-between mt-3 x-small opacity-75 fw-800 uppercase" style="letter-spacing: 1px;">
          <span>Goal: 100%</span>
          <span>Status: Healthy</span>
        </div>
      </div>

      <div class="reab-card">
        <p class="small fw-800 text-muted text-uppercase" style="letter-spacing: 1px;">Remaining Work</p>
        <div class="stat-val my-2 text-dark">1</div>
        <div class="d-flex align-items-center gap-2 text-danger small fw-700">
          <Flame :size="16" /> High Priority
        </div>
      </div>

      <div class="reab-card">
        <p class="small fw-800 text-muted text-uppercase" style="letter-spacing: 1px;">Tasks Done</p>
        <div class="stat-val my-2 text-success">1</div>
        <div class="d-flex align-items-center gap-2 text-muted small fw-600">
          <CalendarCheck :size="16" /> Lifetime Total
        </div>
      </div>
<div class="reab-card card-3">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h6 class="fw-800">Task Performance Load</h6>
    <span class="badge-pill">Weekly Cycle</span>
  </div>
  <div class="chart-wrapper">
    <apexchart
      width="100%"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</div>

      <div class="reab-card">
        <h6 class="fw-800 mb-4">System Status</h6>
        <div class="d-flex flex-column gap-3">
          <div class="status-item">
            <div class="d-flex align-items-center gap-3">
              <Server :size="18" class="text-primary" />
              <span class="small fw-800">Cloud Sync</span>
            </div>
            <CheckCircle :size="16" class="text-success" />
          </div>
          <div class="status-item">
            <div class="d-flex align-items-center gap-3">
              <ShieldCheck :size="18" class="text-warning" />
              <span class="small fw-800">Security</span>
            </div>
            <CheckCircle :size="16" class="text-success" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Download, Flame, CalendarCheck, Server, CheckCircle, ShieldCheck } from 'lucide-vue-next';
import VueApexCharts from "vue3-apexcharts"; // Import the library

const apexchart = VueApexCharts;

// Chart configuration
const chartOptions = {
  chart: {
    type: 'area',
    toolbar: { show: false },
    sparkline: { enabled: false },
  },
  colors: ['#0d9488'], // Matches your teal theme
  stroke: { curve: 'smooth', width: 3 },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 100]
    }
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { show: false },
  grid: { show: false }
};

const series = [{
  name: 'Task Load',
  data: [30, 40, 35, 50, 49, 60, 70]
}];
</script>

<style scoped>
.fw-800 { font-weight: 800; }


.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 24px;
}

.card-2 { grid-column: span 2; }
.card-3 { grid-column: span 3; }

/* Premium Card Styling */
.reab-card {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 28px;
  padding: 30px;
  box-shadow: 0 20px 40px -12px rgba(13, 148, 136, 0.1);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.reab-card:hover {
  transform: translateY(-8px);
}

.efficiency-gradient {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: white;
  border: none;
}

.stat-val {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -2px;
}

/* Progress Bar */
.progress-container {
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: white;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

/* System Status Items */
.status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
}

.badge-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 6px 16px;
  background: #f1f5f9;
  border-radius: 100px;
  color: #64748b;
}

.chart-wrapper {
  height: 240px;
}
</style>