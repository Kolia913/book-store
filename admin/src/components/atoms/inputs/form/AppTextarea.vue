<template>
  <div>
    <span
      v-if="label"
      class="text-gray-600 dark:text-gray-400 block mb-2 text-sm"
      :class="{
        'opacity-80': disabled,
      }"
      >{{ label }}</span
    >
    <textarea
      :disabled="disabled ? disabled : false"
      v-model="model"
      class="min-h-[120px] rounded-lg px-2 text-base py-1.5 bg-grey-bg dark:bg-grey-dark-50 border border-solid border-gray-200 dark:border-grey-300 w-full focus:border-gray-500 focus:dark:border-white active:border-gray-500 active:dark:border-white"
      :class="{
        'opacity-60': disabled,
      }"
    ></textarea>
  </div>
</template>
<script setup>
defineProps(['label', 'disabled']);
import { defineModel } from 'vue';
const model = defineModel();
</script>
