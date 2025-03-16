<template>
  <div class="modal">
    <div class="modal__bck" @click="$emit('close')" />
    <div class="relative z-10 w-9/12">
      <FileManager
        :modalStatus="props.modalStatus"
        @sendPath="(e) => $emit('sendPath', e)"
        @close="$emit('close')"
      />
    </div>
  </div>
</template>
<script setup>
import FileManager from './FileManager.vue';

const props = defineProps(['modalStatus']);
</script>
