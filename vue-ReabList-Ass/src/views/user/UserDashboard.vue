<template>
  <div id="dashboard-home" class="view-content">

    <div v-if="loading" class="dashboard-skeleton">
      <div class="skeleton-hero shimmer"></div>
      <div class="bento-grid">
        <div class="skeleton-card card-2 shimmer"></div>
        <div class="skeleton-card shimmer"></div>
        <div class="skeleton-card shimmer"></div>
        <div class="skeleton-card card-3 shimmer"></div>
        <div class="skeleton-card shimmer"></div>
      </div>
    </div>

    <div v-else>
      <div class="hero-wrap">
        <div class="hero-left">
          <div class="brand-pill">
            <span class="pulse-dot"></span>
            <span class="brand-name">REABLIST</span>
          </div>

          <h1 class="hero-title">ផ្ទាំងគ្រប់គ្រងភារកិច្ច</h1>
          <p class="hero-sub">ស្ថិតិភារកិច្ច Live ពេលវេលាពិត (API)</p>

          <div class="hero-actions">
            <button class="btn-submit-modern btn-hero" @click="$emit('create-task')">
              + បង្កើតភារកិច្ចថ្មី
            </button>
          </div>
        </div>

        <div class="hero-right">
          <div class="d-flex g-4">
            <div class="d-flex flex-row gap-2">
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
        </div>
      </div>

      <div class="bento-grid">
        <div class="reab-card card-2 efficiency-gradient">
          <div class="d-flex justify-content-between align-items-start gap-3">
            <div class="min-w-0">
              <p class="small fw-900 opacity-90 text-uppercase mb-2" style="letter-spacing: 1px">
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

        <div class="reab-card">
          <p class="small fw-900 text-muted text-uppercase mb-2" style="letter-spacing: 1px">
            ការងារដែលនៅសល់
          </p>
          <div class="stat-mini text-dark">{{ inProgressCount }}</div>
          <div class="d-flex align-items-center gap-2 small fw-800"
            :class="inProgressCount ? 'text-danger' : 'text-success'">
            <Flame v-if="inProgressCount" :size="16" />
            <CheckCircle v-else :size="16" />
            {{ inProgressCount ? "ត្រូវការយកចិត្តទុកដាក់" : "ល្អណាស់! គ្មានការងារកំពុងធ្វើ" }}
          </div>
        </div>

        <div class="reab-card">
          <p class="small fw-900 text-muted text-uppercase mb-2" style="letter-spacing: 1px">
            ភារកិច្ចបានបញ្ចប់
          </p>
          <div class="stat-mini text-success">{{ doneCount }}</div>
          <div class="d-flex align-items-center gap-2 text-muted small fw-800">
            <CalendarCheck :size="16" />
            សរុបរហូតមកដល់ពេលនេះ
          </div>
        </div>

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
            <ApexChart width="100%" height="100%" type="area" :options="chartOptions" :series="series" />
          </div>
        </div>

        <div class="reab-card">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h6 class="fw-900 mb-0">ពេលវេលាគម្រោង</h6>
          </div>
          <p class="x-small fw-800 text-muted mb-3">
            {{ currentCalendarHeader }}
          </p>

          <div class="calendar-grid">
            <div v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="day" class="cal-head">
              {{ day }}
            </div>
            <div v-for="p in calendarData.padding" :key="'p' + p" class="cal-date empty"></div>
            <div v-for="date in calendarData.days" :key="date" class="cal-date"
              :class="{ 'is-today': date === calendarData.today }">
              {{ date }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Download, Flame, CalendarCheck, CheckCircle } from "lucide-vue-next";
import ApexChart from "vue3-apexcharts";
import api from "@/API/api";

const tasks = ref([]);
const loading = ref(true);
const errorMsg = ref("");

function isTaskDone(t) {
  if (typeof t?.isCompleted === "boolean") return t.isCompleted;
  if (typeof t?.completed === "boolean") return t.completed;
  if (typeof t?.is_completed === "boolean") return t.is_completed;
  if (typeof t?.isCompleted === "number") return t.isCompleted === 1;
  const s = String(t?.status ?? "").toUpperCase();
  return ["DONE", "COMPLETED", "FINISHED"].includes(s);
}

async function fetchTasks() {
  loading.value = true;
  try {
    const res = await api.get("/notes");
    const payload = res.data?.data;
    const list = payload?.data || payload?.notes || payload?.results || payload?.items || payload || [];
    tasks.value = Array.isArray(list) ? list : [];
  } catch (e) {
    console.error("Dashboard fetch failed:", e);
    tasks.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(fetchTasks);

// Metrics 
const totalCount = computed(() => tasks.value.length);
const doneCount = computed(() => tasks.value.filter(isTaskDone).length);
const inProgressCount = computed(() => tasks.value.filter((t) => !isTaskDone(t)).length);
const efficiency = computed(() => totalCount.value ? Math.round((doneCount.value / totalCount.value) * 100) : 0);
const efficiencyStatus = computed(() => {
  const v = efficiency.value;
  if (v >= 80) return "ល្អបំផុត";
  if (v >= 50) return "ល្អ";
  if (v >= 20) return "ត្រូវកែលម្អ";
  return "ចាប់ផ្តើម";
});

// Chart Logic 
const daysKh = ["ចន្ទ", "អង្គារ", "ពុធ", "ព្រហ", "សុក្រ", "សៅរ៍", "អាទិត្យ"];
const last7Days = () => {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }).map((_, i) => {
    const dd = new Date(d); dd.setDate(d.getDate() - (6 - i));
    return dd;
  });
};

const series = computed(() => {
  const days = last7Days();
  const counts = days.map((day) => {
    const start = new Date(day); const end = new Date(day); end.setDate(end.getDate() + 1);
    return tasks.value.filter((t) => {
      const v = t?.createdAt ?? t?.created_at; if (!v) return false;
      const created = new Date(v); return created >= start && created < end;
    }).length;
  });
  return [{ name: "ភារកិច្ចថ្មី", data: counts }];
});

const chartOptions = computed(() => ({
  chart: { type: "area", toolbar: { show: false } },
  colors: ["#0d9488"],
  stroke: { curve: "smooth", width: 3 },
  xaxis: { categories: last7Days().map((d) => daysKh[d.getDay() === 0 ? 6 : d.getDay() - 1]) },
  yaxis: { show: false }, grid: { show: false }, dataLabels: { enabled: false },
}));

// Calendar Logic 
const now = new Date();
const currentCalendarHeader = computed(() => now.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "long" }));
const calendarData = computed(() => {
  const year = now.getFullYear(); const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { padding: firstDay, days: Array.from({ length: daysInMonth }, (_, i) => i + 1), today: now.getDate() };
});
</script>

<style scoped>
.shimmer {
  background: #f1f5f9;
  position: relative;
  overflow: hidden;
  border-radius: 28px;
}

.shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(13, 148, 136, 0.08), transparent);
  animation: shimmer-ani 1.5s infinite;
}

@keyframes shimmer-ani {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.skeleton-hero {
  height: 180px;
  margin-bottom: 22px;
}

.skeleton-card {
  height: 200px;
}

.fw-900 {
  font-weight: 900;
}

.fw-800 {
  font-weight: 800;
}

.hero-wrap {
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.1), rgba(6, 182, 212, 0.1));
  border: 1px solid rgba(13, 148, 136, 0.16);
  border-radius: 28px;
  padding: 22px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 16px 0;
  box-shadow: 0 22px 45px -35px rgba(13, 148, 136, 0.45);
}

.brand-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(13, 148, 136, 0.16);
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
  animation: pulse-ring 1.6s infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.6);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 12px rgba(13, 148, 136, 0);
  }

  100% {
    transform: scale(0.95);
  }
}

.brand-name {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #0d9488;
}

.hero-title {
  font-weight: 900;
  color: #0f172a;
  line-height: 1.2;
}

.hero-sub {
  color: #475569;
  font-weight: 800;
  font-size: 13px;
}

.hero-metric {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 18px;
  padding: 10px 12px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.metric-label {
  font-size: 10px;
  font-weight: 900;
  color: #64748b;
  text-transform: uppercase;
}

.metric-value {
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
}

.btn-submit-modern {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: #fff;
  border: none;
  padding: 18px;
  border-radius: 20px;
  font-weight: 800;
  box-shadow: 0 14px 28px -18px rgba(13, 148, 136, 0.5);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.card-2 {
  grid-column: span 2;
}

.card-3 {
  grid-column: span 3;
}

.reab-card {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 28px;
  padding: 30px;
  box-shadow: 0 20px 40px -12px rgba(13, 148, 136, 0.1);
  transition: transform 0.35s ease;
}

.efficiency-gradient {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: white;
  border: none;
}

.stat-val,
.stat-mini {
  font-size: 46px;
  font-weight: 900;
  letter-spacing: -2px;
}

.progress-container {
  height: 12px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 100px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: white;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
}

.cal-head {
  font-size: 10px;
  font-weight: 900;
  color: #1e293b;
  padding-bottom: 8px;
  opacity: 0.8;
}

.cal-date {
  font-size: 12px;
  font-weight: 800;
  color: #64748b;
  padding: 8px 0;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.is-today {
  background: #0d9488 !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4);
  font-weight: 900;
}

.chart-wrapper {
  height: 240px;
}

.badge-pill {
  font-size: 11px;
  font-weight: 900;
  padding: 6px 14px;
  background: #f1f5f9;
  border-radius: 999px;
  color: #64748b;
}

.error-msg {
  color: red;
  font-weight: 900;
  margin-top: 12px;
  text-align: center;
}

@media (max-width: 1100px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-2,
  .card-3 {
    grid-column: span 2;
  }
}

@media (max-width: 680px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }

  .card-2,
  .card-3 {
    grid-column: span 1;
  }
}
/* ================= HERO LEFT RESPONSIVE ================= */
@media (max-width: 640px) {
  .hero-wrap {
    flex-direction: column;
    text-align: center;
    padding: 18px;
  }

  .hero-left {
    width: 100%;
    align-items: center;
  }

  .brand-pill {
    margin: 0 auto 8px;
  }

  .hero-title {
    font-size: 22px;
    line-height: 1.25;
    margin-bottom: 6px;
  }

  .hero-sub {
    font-size: 12px;
    line-height: 1.4;
    margin-bottom: 12px;
  }

  .hero-actions {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .btn-hero {
    width: 100%;
    padding: 14px;
    font-size: 14px;
    border-radius: 16px;
  }
}
/* ================= HERO RIGHT RESPONSIVE ================= */
@media (max-width: 640px) {
  .hero-right {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .hero-right .d-flex.flex-row {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .hero-metric {
    width: 100%;
    padding: 14px;
    border-radius: 16px;
  }

  .metric-label {
    font-size: 11px;
  }

  .metric-value {
    font-size: 20px;
  }
}


</style>