<template>
  <div>
    <TaskView
      ref="viewRef"
      v-if="noteStore.selectedNote"
      :task="noteStore.selectedNote"
      @close="noteStore.closeModal()"
      @edit-task="noteStore.openNote(noteStore.selectedNote.id, 'edit')"
    />

    <TaskUpdate
      ref="editRef"
      v-if="noteStore.selectedNote"
      :task="noteStore.selectedNote"
      @updated="onUpdated"
      @close="noteStore.closeModal()"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useNoteStore } from "@/stores/note";

import TaskView from "@/views/user/Task/TaskView.vue";
import TaskUpdate from "@/views/user/Task/TaskUpdate.vue";

const noteStore = useNoteStore();

const viewRef = ref(null);
const editRef = ref(null);

const onUpdated = async () => {
  await noteStore.fetchAllNotes();
  noteStore.closeModal();
};

watch(
  () => noteStore.modalOpen,
  (open) => {
    if (!open) return;

    if (noteStore.modalType === "view") {
      viewRef.value?.open?.();
    }

    if (noteStore.modalType === "edit") {
      editRef.value?.open?.();
    }
  }
);
</script>
