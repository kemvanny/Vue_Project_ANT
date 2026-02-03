<template>
  <div class="task-row" @click="emit('view', task)">
    <!-- LEFT SWITCH -->
    <div class="left" @click.stop>
      <label class="switch">
        <input type="checkbox" v-model="actionsOpen" />
        <span class="track"></span>
      </label>
    </div>

    <!-- MAIN CONTENT -->
    <div class="content">
      <div class="title">
        {{ task.title || "មិនមានចំណងជើង" }}
      </div>

      <div class="sub">
        {{
          ((task.content || task.notes || "").trim())
            ? (task.content || task.notes)
            : "មិនមានកំណត់ចំណាំ"
        }}
      </div>

      <div class="meta">
        <span class="meta-pill">{{ task.date || "—" }}</span>

        <span class="meta-pill cat">
          {{ showCategory(task.category) }}
        </span>

        <span class="meta-pill status" :class="{ done: !!task.isCompleted }">
          {{ task.isCompleted ? "បានបញ្ចប់" : "កំពុងដំណើរការ" }}
        </span>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="right" @click.stop>
      <span class="priority-pill" :class="priorityClass(showPriority(task.priority))">
        {{ showPriority(task.priority) }}
      </span>

      <!-- actions appear when switch ON -->
      <div v-if="actionsOpen" class="actions">
        <button class="action-btn" @click="emit('edit', task)">✏️</button>
        <button class="action-btn danger" @click="emit('delete', task.id)">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  task: { type: Object, required: true },
});

const emit = defineEmits(["view", "edit", "delete"]);

const actionsOpen = ref(false);

// ===== mapping =====
const showPriority = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "HIGH" || val === "ខ្ពស់") return "ខ្ពស់";
  if (v === "MEDIUM" || val === "មធ្យម") return "មធ្យម";
  if (v === "LOW" || val === "ទាប") return "ទាប";
  return val || "មធ្យម";
};

const showCategory = (val) => {
  const v = String(val || "").toUpperCase();
  if (v === "PERSONAL" || val === "ផ្ទាល់ខ្លួន") return "ផ្ទាល់ខ្លួន";
  if (v === "WORK" || val === "ការងារ") return "ការងារ";
  if (v === "SCHOOL" || v === "STUDY" || val === "សិក្សា") return "សិក្សា";
  return val || "ទូទៅ";
};

const priorityClass = (p) => {
  if (p === "ខ្ពស់") return "high";
  if (p === "មធ្យម") return "medium";
  return "low";
};
</script>

<style scoped>
/* ===== Row Card ===== */
.task-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 26px;
  cursor: pointer;

  /* soft gradient match your site */
  background: linear-gradient(
    135deg,
    rgba(13, 148, 136, 0.12),
    rgba(6, 182, 212, 0.05)
  );

  border: 1px solid rgba(13, 148, 136, 0.16);
  box-shadow: 0 20px 45px -35px rgba(13, 148, 136, 0.35);
  transition: 0.18s;
}

.task-row:hover {
  transform: translateY(-1px);
  box-shadow: 0 28px 55px -40px rgba(13, 148, 136, 0.55);
}

/* left */
.left {
  width: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* switch like iOS */
.switch input {
  display: none;
}
.track {
  width: 46px;
  height: 26px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.35);
  border: 1px solid rgba(226, 232, 240, 0.95);
  display: inline-block;
  position: relative;
  transition: 0.2s;
}
.track::after {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  transition: 0.2s;
  box-shadow: 0 14px 28px -22px rgba(15, 23, 42, 0.4);
}
.switch input:checked + .track {
  background: rgba(13, 148, 136, 0.65);
}
.switch input:checked + .track::after {
  left: 22px;
}

/* center content */
.content {
  flex: 1;
  min-width: 0;
}

.title {
  font-weight: 1000;
  font-size: 18px;
  color: #0f172a;
  margin-bottom: 4px;
}

.sub {
  font-weight: 800;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* meta pills */
.meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-pill {
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(226, 232, 240, 0.95);
  color: #0f172a;
}

.meta-pill.cat {
  background: rgba(13, 148, 136, 0.10);
  border-color: rgba(13, 148, 136, 0.18);
  color: #0d9488;
}

.meta-pill.status {
  color: #ef4444;
}
.meta-pill.status.done {
  background: rgba(13, 148, 136, 0.12);
  border-color: rgba(13, 148, 136, 0.25);
  color: #0d9488;
}

/* right */
.right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.priority-pill {
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 1000;
  font-size: 12px;
}

.priority-pill.high {
  background: #fee2e2;
  color: #dc2626;
}
.priority-pill.medium {
  background: #fef3c7;
  color: #d97706;
}
.priority-pill.low {
  background: #dcfce7;
  color: #16a34a;
}

/* actions */
.actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid rgba(226, 232, 240, 0.95);
  background: rgba(255, 255, 255, 0.85);
  display: grid;
  place-items: center;
  cursor: pointer;
  font-weight: 900;
  transition: 0.15s;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 34px -26px rgba(15, 23, 42, 0.25);
}

.action-btn.danger {
  border-color: rgba(239, 68, 68, 0.25);
}
.action-btn.danger:hover {
  background: rgba(239, 68, 68, 0.08);
}
</style>
