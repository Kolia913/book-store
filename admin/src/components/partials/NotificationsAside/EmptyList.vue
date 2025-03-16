<template>
  <div class="w-full flex flex-col justify-start items-center gap-5">
    <div
      class="w-12 h-12 flex justify-center items-center bg-grey-100 dark:bg-grey-dark-50 rounded-full"
    >
      <NoBellIcon class="w-6 h-6" :color="currentTheme === 'dark' ? '#A1A1AA' : undefined" />
    </div>
    <div class="flex flex-col justify-start items-center">
      <span class="font-semibold text-base text-black dark:text-white">No notifications</span>
      <span class="font-normal text-sm text-grey-300 dark:text-grey-200"
        >Please check again later.</span
      >
    </div>
  </div>
</template>
<script setup>
import NoBellIcon from '@/components/icons/NoBellIcon.vue';
import useSettingsStore from '@/stores/settings';
import { computed } from 'vue';

const settingsStore = useSettingsStore();

const currentTheme = computed(() => settingsStore.currentTheme);
</script>
