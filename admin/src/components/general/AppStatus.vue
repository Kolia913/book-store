<template>
  <span class="block">
    <span 
      v-if="status"
      class="text-green-700 dark:text-green-600"
    >Так</span>
    <span 
      v-else
      class="text-red-600 dark:text-red-500"
    >Ні</span>
  </span>
</template>

<script setup>
  defineProps(['status']);
</script>