<template>
  <div>
    <v-select
      class="rounded-lg text-base dark:bg-grey-dark-50 bg-grey-bg border border-solid border-gray-200 dark:border-grey-300 w-full min-h-[38px]"
      :class="isDarkTheme ? 'dark-input' : 'light-input'"
      v-model="model"
      :options="options"
      :multiple="isMultiple ? isMultiple : false"
      :selectable="() => (max ? model.length < max : true)"
      :label="label"
      :reduce="(option) => option[`${dataKey}`]"
      @update:modelValue="emit('changeOption')"
    />
  </div>
</template>
<script setup>
import useSettingsStore from '@/stores/settings';
import { computed, defineModel } from 'vue';

const settingsStore = useSettingsStore();
defineProps(['options', 'label', 'dataKey', 'isMultiple', 'max']);
const emit = defineEmits('changeOption')

const model = defineModel();

const isDarkTheme = computed(() => {
  if (settingsStore.currentTheme !== undefined) {
    return settingsStore.currentTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
});
</script>
<style>
.vs__dropdown-toggle {
  border: 0px !important;
}
.light-input {
  --vs-controls-color: rgb(107 114 128);

  --vs-dropdown-bg: rgb(250 250 250);
  --vs-dropdown-color: rgb(250 250 250);
  --vs-dropdown-option-color: #000;

  --vs-selected-bg: #fff;
  --vs-selected-color: #000;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #eeeeee;
  --vs-dropdown-option--active-color: #000;
}

.dark-input {
  --vs-controls-color: rgb(113 113 122);

  --vs-dropdown-bg: rgb(41 41 44);
  --vs-dropdown-color: #fff;
  --vs-dropdown-option-color: #fff;

  --vs-selected-bg: rgb(41 41 44);
  --vs-selected-color: #fff;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: rgb(113 113 122);
  --vs-dropdown-option--active-color: #fff;
}
</style>
