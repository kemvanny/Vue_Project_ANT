<template>
  <div id="dashboard-home" class="view-content">
    <!-- HERO -->
    <div class="hero-wrap">
      <div class="hero-left">
        <div class="brand-pill">
          <span class="pulse-dot"></span>
          <span class="brand-name">REABLIST</span>
        </div>

        <h1 class="hero-title">ផ្ទាំងគ្រប់គ្រងភារកិច្ច</h1>
        <p class="hero-sub">
          ស្ថិតិភារកិច្ច Live ពេលវេលាពិត (API)
        </p>

        <div class="hero-actions">
          <button class="btn-submit-modern btn-hero" @click="$emit('create-task')">
            + បង្កើតភារកិច្ចថ្មី
          </button>

          <button class="btn-ghost-modern btn-hero" @click="exportTasks">
            <Download :size="18" class="me-2" /> នាំចេញ (JSON)
          </button>
        </div>
      </div>

      <div class="hero-right">
        <div class="hero-metric">
          <div class="metric-label">សរុបភារកិច្ច</div>
          <div class="metric-value">{{ totalCount }}</div>
        </div>

        <div class="hero-metric">
          <div class="metric-label">កំពុងដំណើរការ</div>
          <div class="metric-value">{{ inProgressCount }}</div>
        </div>

        <div class="hero-metric">
          <div class="metric-label">បានបញ្ចប់</div>
          <div class="metric-value">{{ doneCount }}</div>
        </div>
      </div>
    </div>

    <!-- BENTO GRID -->
    <div class="bento-grid">
      <!-- Completion Efficiency -->
      <div class="reab-card card-2 efficiency-gradient">
        <div class="d-flex justify-content-between align-items-start gap-3">
          <div class="min-w-0">
            <p class="small fw-900 opacity-90 text-uppercase mb-2" style="letter-spacing: 1px;">
              ប្រសិទ្ធភាពការបំពេញ
            </p>
            <div class="stat-val">{{ efficiency }}%</div>
            <p class="x-small fw-800 opacity-85 mb-0">
              គោលដៅ៖ 100% • ស្ថានភាព៖ {{ efficiencyStatus }}
            </p>
          </div>

          <div class="pill-soft">
            <CheckCircle :size="16" /> Live
          </div>
        </div>

        <div class="progress-container mt-3">
          <div class="progress-bar" :style="{ width: efficiency + '%' }"></div>
        </div>

        <div class="mt-3 d-flex justify-content-between x-small fw-800 opacity-90">
          <span>បានបញ្ចប់: {{ doneCount }}</span>
          <span>សរុប: {{ totalCount }}</span>
        </div>
      </div>

      <!-- Remaining -->
      <div class="reab-card">
        <p class="small fw-900 text-muted text-uppercase mb-2" style="letter-spacing: 1px;">
          ការងារដែលនៅសល់
        </p>

        <div class="stat-mini text-dark">{{ inProgressCount }}</div>

        <div
          class="d-flex align-items-center gap-2 small fw-800"
          :class="inProgressCount ? 'text-danger' : 'text-success'"
        >
          <Flame v-if="inProgressCount" :size="16" />
          <CheckCircle v-else :size="16" />
          {{ inProgressCount ? "ត្រូវការយកចិត្តទុកដាក់" : "ល្អណាស់! គ្មានការងារកំពុងធ្វើ" }}
        </div>
      </div>

      <!-- Done -->
      <div class="reab-card">
        <p class="small fw-900 text-muted text-uppercase mb-2" style="letter-spacing: 1px;">
          ភារកិច្ចបានបញ្ចប់
        </p>

        <div class="stat-mini text-success">{{ doneCount }}</div>

        <div class="d-flex align-items-center gap-2 text-muted small fw-800">
          <CalendarCheck :size="16" />
          សរុបរហូតមកដល់ពេលនេះ
        </div>
      </div>

      <!-- Chart -->
      <div class="reab-card card-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 class="fw-900 mb-1">ទម្ងន់ការងារប្រចាំសប្ដាហ៍</h6>
            <p class="text-muted fw-700 mb-0 small">
              បង្ហាញចំនួនភារកិច្ចថ្មី (7 ថ្ងៃចុងក្រោយ)
            </p>
          </div>

          <span class="badge-pill">7 ថ្ងៃ</span>
        </div>

        <div class="chart-wrapper">
          <ApexChart
            width="100%"
            height="100%"
            type="area"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </div>

      <!-- System Status -->
      <div class="reab-card">
        <h6 class="fw-900 mb-3">ស្ថានភាពប្រព័ន្ធ</h6>

        <div class="d-flex flex-column gap-3">
          <div class="status-item">
            <div class="d-flex align-items-center gap-3">
              <Server :size="18" class="text-primary" />
              <div>
                <div class="small fw-900">API Storage</div>
                <div class="x-small fw-700 text-muted">កំពុងប្រើ API</div>
              </div>
            </div>
            <span class="status-pill ok">ដំណើរការ</span>
          </div>

          <div class="status-item">
            <div class="d-flex align-items-center gap-3">
              <ShieldCheck :size="18" class="text-warning" />
              <div>
                <div class="small fw-900">សុវត្ថិភាព</div>
                <div class="x-small fw-700 text-muted">Token/Auth (បើមាន)</div>
              </div>
            </div>
            <span class="status-pill warn">មធ្យម</span>
          </div>

          <div class="status-item">
            <div class="d-flex align-items-center gap-3">
              <CheckCircle :size="18" class="text-success" />
              <div>
                <div class="small fw-900">ស្ថិតិ Live</div>
                <div class="x-small fw-700 text-muted">Auto refresh ពេល reload</div>
              </div>
            </div>
            <span class="status-pill ok">Ready</span>
          </div>
        </div>
      </div>
    </div>

    <p v-if="errorMsg" style="color:red;font-weight:900;margin-top:12px;">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Download, Flame, CalendarCheck, Server, CheckCircle, ShieldCheck } from "lucide-vue-next";
import ApexChart from "vue3-apexcharts";
import api from "@/api/api";



const API_BASE_URL = "https://ant-g6-todolistit.linkpc.net/api/v1";
const ENDPOINT = "/notes";


const tasks = ref([]);
const loading = ref(false);
const errorMsg = ref("");

function isTaskDone(t) {
  if (typeof t?.isCompleted === "boolean") return t.isCompleted;
  if (typeof t?.completed === "boolean") return t.completed;
  if (typeof t?.is_completed === "boolean") return t.is_completed;
  if (typeof t?.isCompleted === "number") return t.isCompleted === 1;

  const s = String(t?.status ?? "").toUpperCase();
  if (["DONE", "COMPLETED", "FINISHED"].includes(s)) return true;

  return false;
}



async function fetchTasks() {
  loading.value = true;
  try {
    const res = await api.get("/notes");

    console.log("NOTES FULL RESPONSE:", res.data);

    // ✅ FIX: extract list correctly
    const payload = res.data?.data;

    const list =
      payload?.data ||          // data: { data: [] }
      payload?.notes ||         // data: { notes: [] }
      payload?.results ||       // data: { results: [] }
      payload?.items ||         // data: { items: [] }
      payload ||                // data: []
      [];

    tasks.value = Array.isArray(list) ? list : [];

    console.log("DASHBOARD NOTES LENGTH:", tasks.value.length);
  } catch (e) {
    console.error("Dashboard fetch failed:", e);
    tasks.value = [];
  } finally {
    loading.value = false;
  }
}




onMounted(fetchTasks);

// counts
const totalCount = computed(() => tasks.value.length);
const doneCount = computed(() => tasks.value.filter(isTaskDone).length);
const inProgressCount = computed(() => tasks.value.filter((t) => !isTaskDone(t)).length);

// efficiency
const efficiency = computed(() => {
  if (!totalCount.value) return 0;
  return Math.round((doneCount.value / totalCount.value) * 100);
});

const efficiencyStatus = computed(() => {
  const v = efficiency.value;
  if (v >= 80) return "ល្អបំផុត";
  if (v >= 50) return "ល្អ";
  if (v >= 20) return "ត្រូវកែលម្អ";
  return "ចាប់ផ្តើម";
});

// chart
const daysKh = ["ចន្ទ", "អង្គារ", "ពុធ", "ព្រហ", "សុក្រ", "សៅរ៍", "អាទិត្យ"];

const last7Days = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }).map((_, i) => {
    const dd = new Date(d);
    dd.setDate(d.getDate() - (6 - i));
    return dd;
  });
};

function getCreatedAt(t) {
  const v = t?.createdAt ?? t?.created_at ?? t?.created_date ?? t?.createdDate;
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

const series = computed(() => {
  const days = last7Days();
  const counts = days.map((day) => {
    const start = new Date(day);
    const end = new Date(day);
    end.setDate(end.getDate() + 1);

    return tasks.value.filter((t) => {
      const created = getCreatedAt(t);
      if (!created) return false;
      return created >= start && created < end;
    }).length;
  });

  return [{ name: "ភារកិច្ចថ្មី", data: counts }];
});

const chartOptions = computed(() => ({
  chart: { type: "area", toolbar: { show: false }, sparkline: { enabled: false } },
  colors: ["#0d9488"],
  stroke: { curve: "smooth", width: 3 },
  fill: {
    type: "gradient",
    gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: last7Days().map((d) => daysKh[d.getDay() === 0 ? 6 : d.getDay() - 1]),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { fontWeight: 700 } },
  },
  yaxis: { show: false },
  grid: { show: false },
}));

const exportTasks = () => {
  const blob = new Blob([JSON.stringify(tasks.value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reablist_tasks.json";
  a.click();
  URL.revokeObjectURL(url);
};
</script>




<style scoped>
.fw-900 { font-weight: 900; }
.fw-800 { font-weight: 800; }

/* HERO */
.hero-wrap {
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.10), rgba(6, 182, 212, 0.10));
  border: 1px solid rgba(13, 148, 136, 0.16);
  border-radius: 28px;
  padding: 22px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  box-shadow: 0 22px 45px -35px rgba(13, 148, 136, 0.45);
}

.hero-left { min-width: 0; }
.brand-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(13,148,136,0.16);
  padding: 8px 14px;
  border-radius: 999px;
  backdrop-filter: blur(10px);
  margin-bottom: 10px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #0d9488;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.35);
  animation: pulse-ring 1.6s infinite;
}
@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.6); }
  70% { transform: scale(1); box-shadow: 0 0 0 12px rgba(13, 148, 136, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
}

.brand-name { font-size: 11px; font-weight: 900; letter-spacing: 2px; color: #0d9488; }

.hero-title {
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 6px;
  line-height: 1.2;
}
.hero-sub { margin: 0; color: #475569; font-weight: 800; font-size: 13px; }

.hero-actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.hero-right {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  align-items: start;
}

.hero-metric {
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(226,232,240,0.9);
  border-radius: 18px;
  padding: 10px 12px;
  text-align: center;
  backdrop-filter: blur(10px);
}
.metric-label {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #64748b;
}
.metric-value {
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
  margin-top: 2px;
}

/* Buttons */
.btn-submit-modern {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  padding: 18px;
  border-radius: 20px;
  font-weight: 800;
  transition: transform .18s ease, box-shadow .18s ease;
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.5);
}
.btn-submit-modern:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 34px -18px rgba(13, 148, 136, 0.65);
}

.btn-ghost-modern {
  background: #fff;
  border: 2px solid rgba(13, 148, 136, 0.25);
  color: #0d9488;
  padding: 18px;
  border-radius: 20px;
  font-weight: 900;
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.btn-ghost-modern:hover {
  transform: translateY(-1px);
  border-color: rgba(13, 148, 136, 0.5);
  box-shadow: 0 18px 34px -18px rgba(13, 148, 136, 0.45);
}

.btn-hero { min-width: 210px; }

/* Bento */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 24px;
}
.card-2 { grid-column: span 2; }
.card-3 { grid-column: span 3; }

.reab-card {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 28px;
  padding: 30px;
  box-shadow: 0 20px 40px -12px rgba(13, 148, 136, 0.10);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.reab-card:hover { transform: translateY(-6px); }

/* Gradient card */
.efficiency-gradient {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: white;
  border: none;
}

/* Stats */
.stat-val {
  font-size: 46px;
  font-weight: 900;
  letter-spacing: -2px;
}
.stat-mini {
  font-size: 44px;
  font-weight: 900;
  letter-spacing: -2px;
}

/* Progress */
.progress-container {
  height: 12px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 100px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: white;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.45);
}

/* Small pill */
.pill-soft {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.22);
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12px;
}

/* Status list */
.status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
}

.status-pill {
  font-weight: 900;
  font-size: 11px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
}
.status-pill.ok { background: #f0fdfa; color: #0d9488; border-color: rgba(13,148,136,0.22); }
.status-pill.warn { background: #fffbeb; color: #d97706; border-color: rgba(217,119,6,0.22); }

.badge-pill {
  font-size: 11px;
  font-weight: 900;
  padding: 6px 14px;
  background: #f1f5f9;
  border-radius: 999px;
  color: #64748b;
}

.chart-wrapper { height: 240px; }

/* Responsive */
@media (max-width: 1100px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .card-2, .card-3 { grid-column: span 2; }
  .hero-wrap { flex-direction: column; }
}
@media (max-width: 680px) {
  .bento-grid { grid-template-columns: 1fr; }
  .card-2, .card-3 { grid-column: span 1; }
  .btn-hero { width: 100%; }
}
</style>
