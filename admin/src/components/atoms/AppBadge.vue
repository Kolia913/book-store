<template>
  <div
    class="bg-primary-bg border dark:bg-primary-dark-bg border-primary-transparent dark:border-primary-dark-transparent text-primary-300 dark:text-primary-dark-300 rounded-lg text-center flex items-center justify-center"
  >
    <span class="text-xs">{{ count }}</span>
  </div>
</template>

<script setup>
defineProps(['count']);
</script>
