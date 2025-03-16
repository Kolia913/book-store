<template>
  <div
    class="bg-white dark:bg-grey-dark-100 border dark:border-grey-dark-border flex flex-col justify-start items-center rounded-lg"
  >
    <div
      v-if="title"
      class="w-full flex flex-row border-b justify-start items-center p-4 font-bold dark:border-grey-dark-border"
    >
      {{ title }}
    </div>
    <div class="w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineProps(['title']);
</script>
