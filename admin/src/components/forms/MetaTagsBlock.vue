<template>
  <span
    class="text-lg font-semibold pt-4 border-b border-gray-200 dark:border-grey-300 leading-loose"
    >Мета теги для СЕО</span
  >
  <AppPlainInput v-model="model.h1" type="text" label="H1" />
  <AppPlainInput v-model="model.title" type="text" label="Title" />
  <AppTextarea v-model="model.description" label="Description" />
</template>
<script setup>
import { defineModel } from 'vue';
import AppTextarea from '@/components/atoms/inputs/form/AppTextarea.vue';
import AppPlainInput from '@/components/atoms/inputs/form/AppPlainInput.vue';

const model = defineModel();
</script>
