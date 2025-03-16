<template>
  <div>
    <span 
      v-if="label" 
      class="text-gray-600 dark:text-gray-400 block mb-2 text-sm"
    >{{ label }}</span>
    <input
      v-model="model"
      v-maska
      data-maska="##-##-####"
      class="rounded-lg px-2 text-base py-1.5 bg-grey-bg dark:bg-grey-dark-50 border border-solid border-gray-200 dark:border-grey-300 w-full"
      :type="'text'"
    />
  </div>
</template>
<script setup>
import { defineModel } from 'vue';

defineProps(['label']);

const model = defineModel();
</script>
