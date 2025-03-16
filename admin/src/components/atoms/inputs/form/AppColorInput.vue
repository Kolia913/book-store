<template>
  <div class="flex">
    <span
      v-if="label"
      class="text-gray-600 dark:text-gray-400 mr-2 text-sm"
      :class="{
        'opacity-80': disabled,
      }"
      >{{ label }}</span
    >
    <input
      v-model="model"
      :disabled="disabled ? disabled : false"
      class="border border-solid border-gray-200 dark:border-grey-300 w-10 px-0.5"
      :class="{
        'opacity-60': disabled,
      }"
      :type="type ? type : 'text'"
    />
  </div>
</template>
<script setup>
import { defineModel } from 'vue';

defineProps(['type', 'label', 'disabled']);

const model = defineModel();
</script>
